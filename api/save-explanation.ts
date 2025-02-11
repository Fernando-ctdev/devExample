import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, explanation } = req.body;

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
        data: { explanation }
      });

      return res.json({
        success: true,
        data: updated
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}