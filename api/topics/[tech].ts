import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

      const topics = technology.categories.map(category => ({
        id: category.id,
        category: category.name,
        items: category.items.map(item => ({
          id: item.itemId,
          title: item.title
        }))
      }));

      return res.json({ success: true, data: topics });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Erro ao buscar tópicos' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}