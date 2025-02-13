import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

// Singleton do PrismaClient
const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, code } = req.body as { id: string; code: string };

      const example = await prisma.example.findUnique({
        where: { id }
      });

      if (!example) {
        return res.status(404).json({
          success: false,
          error: 'Exemplo não encontrado'
        });
      }

      const updated = await prisma.example.update({
        where: { id },
        data: { code }
      });

      return res.json({
        success: true,
        data: updated
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}