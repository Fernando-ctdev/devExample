import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Category, Item } from '../../src/types/types';
import { PrismaClient } from '@prisma/client';

// Singleton do PrismaClient
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      const technology = await prisma.technology.findUnique({
        where: { name: tech },
        include: {
          categories: {
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              items: true
            }
          }
        }
      });

      if (!technology) {
        return res.status(404).json({ success: false, error: 'Tecnologia não encontrada' });
      }

      const topics = technology.categories.map((category: Category) => ({
        id: category.id,
        category: category.name,
        items: category.items.map((item: Item) => ({
          id: item.itemId,
          title: item.title
        }))
      }));

      return res.json({ success: true, data: topics });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}