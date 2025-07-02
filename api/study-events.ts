import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export interface StudyEventData {
  id?: string;
  title: string;
  description?: string;
  type: 'STUDY' | 'PROJECT' | 'REVIEW' | 'MEETING' | 'WORKSHOP' | 'PRESENTATION' | 'PLANNING' | 'DEADLINE';
  date: string; // ISO string
  completed?: boolean;
  technologyId?: string;
  categoryId?: string;
  itemId?: string;
}

export interface StudyEventResponse {
  id: string;
  title: string;
  description?: string;
  type: string;
  date: string;
  completed: boolean;
  technologyId?: string;
  categoryId?: string;
  itemId?: string;
  technology?: {
    id: string;
    name: string;
    title: string;
  };
  category?: {
    id: string;
    name: string;
  };
  item?: {
    id: string;
    title: string;
  };
  studySessions?: {
    id: string;
    actualStudyTime: number;
    completed: boolean;
  }[];
}

// GET /api/study-events - Listar eventos
// POST /api/study-events - Criar evento
// PUT /api/study-events - Atualizar evento
// DELETE /api/study-events - Deletar evento
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await getStudyEvents(req, res);
      case 'POST':
        return await createStudyEvent(req, res);
      case 'PUT':
        return await updateStudyEvent(req, res);
      case 'DELETE':
        return await deleteStudyEvent(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Study Events API Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

async function getStudyEvents(req: NextApiRequest, res: NextApiResponse) {
  const { 
    month,
    year,
    technologyId,
    completed,
    limit = '50',
    offset = '0'
  } = req.query;

  const where: any = {};

  // Filtrar por mês/ano
  if (month && year) {
    const startDate = new Date(parseInt(year as string), parseInt(month as string) - 1, 1);
    const endDate = new Date(parseInt(year as string), parseInt(month as string), 0);
    where.date = {
      gte: startDate,
      lte: endDate
    };
  }

  // Filtrar por tecnologia
  if (technologyId) {
    where.technologyId = technologyId;
  }

  // Filtrar por status de conclusão
  if (completed !== undefined) {
    where.completed = completed === 'true';
  }

  const events = await prisma.studyEvent.findMany({
    where,
    include: {
      technology: {
        select: {
          id: true,
          name: true,
          title: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      },
      item: {
        select: {
          id: true,
          title: true
        }
      },
      studySessions: {
        select: {
          id: true,
          actualStudyTime: true,
          completed: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    },
    take: parseInt(limit as string),
    skip: parseInt(offset as string)
  });

  return res.status(200).json(events);
}

async function createStudyEvent(req: NextApiRequest, res: NextApiResponse) {
  const eventData: StudyEventData = req.body;

  if (!eventData.title || !eventData.date) {
    return res.status(400).json({ 
      error: 'Título e data são obrigatórios' 
    });
  }

  const event = await prisma.studyEvent.create({
    data: {
      title: eventData.title,
      description: eventData.description,
      type: eventData.type || 'STUDY',
      date: new Date(eventData.date),
      completed: eventData.completed || false,
      technologyId: eventData.technologyId,
      categoryId: eventData.categoryId,
      itemId: eventData.itemId,
    },
    include: {
      technology: {
        select: {
          id: true,
          name: true,
          title: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      },
      item: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });

  return res.status(201).json(event);
}

async function updateStudyEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const eventData: StudyEventData = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID do evento é obrigatório' });
  }

  const event = await prisma.studyEvent.update({
    where: { id: id as string },
    data: {
      ...(eventData.title && { title: eventData.title }),
      ...(eventData.description !== undefined && { description: eventData.description }),
      ...(eventData.type && { type: eventData.type }),
      ...(eventData.date && { date: new Date(eventData.date) }),
      ...(eventData.completed !== undefined && { completed: eventData.completed }),
      ...(eventData.technologyId !== undefined && { technologyId: eventData.technologyId }),
      ...(eventData.categoryId !== undefined && { categoryId: eventData.categoryId }),
      ...(eventData.itemId !== undefined && { itemId: eventData.itemId }),
    },
    include: {
      technology: {
        select: {
          id: true,
          name: true,
          title: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      },
      item: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });

  return res.status(200).json(event);
}

async function deleteStudyEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID do evento é obrigatório' });
  }

  await prisma.studyEvent.delete({
    where: { id: id as string }
  });

  return res.status(204).end();
}
