import { PrismaClient } from '@prisma/client';
import { saveConsolidatedStatistics } from './utils/session-based-statistics';

const prisma = new PrismaClient();

export interface StudySessionData {
  eventId: string;
  studyDuration: number; // em minutos
  breakDuration: number; // em minutos
  startTime?: string; // ISO string
}

export interface StudySessionUpdate {
  endTime?: string;
  actualStudyTime?: number;
  actualBreakTime?: number;
  completed?: boolean;
  paused?: boolean;
  pausedAt?: string;
  resumedAt?: string;
  totalPauseTime?: number;
}

export interface StudySessionResponse {
  id: string;
  eventId: string;
  startTime: string;
  endTime?: string;
  studyDuration: number;
  breakDuration: number;
  actualStudyTime: number;
  actualBreakTime: number;
  completed: boolean;
  paused: boolean;
  totalPauseTime: number;
  event: {
    id: string;
    title: string;
    type: string;
  };
}

// GET /api/study-sessions - Listar sessões
// POST /api/study-sessions - Criar sessão
// PUT /api/study-sessions - Atualizar sessão
// DELETE /api/study-sessions - Deletar sessão
export default async function handler(req: any, res: any) {
  try {
    switch (req.method) {
      case 'GET':
        return await getStudySessions(req, res);
      case 'POST':
        return await createStudySession(req, res);
      case 'PUT':
        return await updateStudySession(req, res);
      case 'DELETE':
        return await deleteStudySession(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Study Sessions API Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

async function getStudySessions(req: any, res: any) {
  const { 
    eventId,
    startDate,
    endDate,
    completed,
    limit = '50',
    offset = '0'
  } = req.query;

  const where: Record<string, any> = {};

  if (eventId) {
    where.eventId = eventId;
  }

  if (startDate && endDate) {
    where.startTime = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  if (completed !== undefined) {
    where.completed = completed === 'true';
  }

  const sessions = await prisma.studySession.findMany({
    where,
    include: {
      event: {
        select: {
          id: true,
          title: true,
          type: true
        }
      }
    },
    orderBy: {
      startTime: 'desc'
    },
    take: parseInt(limit as string),
    skip: parseInt(offset as string)
  });

  return res.status(200).json(sessions);
}

async function createStudySession(req: any, res: any) {
  const sessionData: StudySessionData = req.body;

  if (!sessionData.eventId || !sessionData.studyDuration || !sessionData.breakDuration) {
    return res.status(400).json({ 
      error: 'EventId, studyDuration e breakDuration são obrigatórios' 
    });
  }

  // Verificar se o evento existe
  const event = await prisma.studyEvent.findUnique({
    where: { id: sessionData.eventId }
  });

  if (!event) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }

  const session = await prisma.studySession.create({
    data: {
      eventId: sessionData.eventId,
      startTime: sessionData.startTime ? new Date(sessionData.startTime) : new Date(),
      studyDuration: sessionData.studyDuration,
      breakDuration: sessionData.breakDuration,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          type: true
        }
      }
    }
  });

  return res.status(201).json(session);
}

async function updateStudySession(req: any, res: any) {
  const { id } = req.query;
  const sessionData: StudySessionUpdate = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID da sessão é obrigatório' });
  }

  const updateData: Record<string, any> = {};

  if (sessionData.endTime) updateData.endTime = new Date(sessionData.endTime);
  if (sessionData.actualStudyTime !== undefined) updateData.actualStudyTime = sessionData.actualStudyTime;
  if (sessionData.actualBreakTime !== undefined) updateData.actualBreakTime = sessionData.actualBreakTime;
  if (sessionData.completed !== undefined) updateData.completed = sessionData.completed;
  if (sessionData.paused !== undefined) updateData.paused = sessionData.paused;
  if (sessionData.pausedAt) updateData.pausedAt = new Date(sessionData.pausedAt);
  if (sessionData.resumedAt) updateData.resumedAt = new Date(sessionData.resumedAt);
  if (sessionData.totalPauseTime !== undefined) updateData.totalPauseTime = sessionData.totalPauseTime;

  const session = await prisma.studySession.update({
    where: { id: id as string },
    data: updateData,
    include: {
      event: {
        select: {
          id: true,
          title: true,
          type: true
        }
      }
    }
  });

  // Se a sessão foi concluída, salvar as estatísticas consolidadas
  if (sessionData.completed && sessionData.actualStudyTime !== undefined) {
    try {
      await saveConsolidatedStatistics({
        eventId: session.eventId,
        actualStudyTime: sessionData.actualStudyTime,
        sessionDate: sessionData.endTime ? new Date(sessionData.endTime) : new Date(),
        completed: sessionData.completed
      });
    } catch (error) {
      console.error('Erro ao salvar estatísticas consolidadas:', error);
      // Não falhar a atualização da sessão por erro nas estatísticas
    }
  }

  return res.status(200).json(session);
}

async function deleteStudySession(req: any, res: any) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID da sessão é obrigatório' });
  }

  await prisma.studySession.delete({
    where: { id: id as string }
  });

  return res.status(204).end();
}
