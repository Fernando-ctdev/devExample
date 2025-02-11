import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { itemId, title, categoryId } = req.body;

      if (!itemId || !title || !categoryId) {
        return res.status(400).json({
          success: false,
          error: 'itemId, title e categoryId são obrigatórios'
        });
      }

      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }

      const item = await prisma.item.create({
        data: {
          itemId,
          title,
          categoryId,
        }
      });

      const example = await prisma.example.create({
        data: {
          title,
          description: '',
          code: '',
          explanation: '',
          itemId: item.id,
          technologyId: category.technologyId
        }
      });

      return res.status(201).json({ 
        success: true, 
        data: {
          ...item,
          example
        }
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar item',
        details: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}