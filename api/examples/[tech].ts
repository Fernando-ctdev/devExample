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
            include: {
              items: {
                include: {
                  example: true
                }
              }
            }
          }
        }
      });

      if (!technology) {
        return res.status(404).json({ success: false, error: 'Tecnologia não encontrada' });
      }

      const examples = {};
      technology.categories.forEach(category => {
        category.items.forEach(item => {
          if (item.example) {
            examples[item.itemId] = {
              id: item.example.id,
              title: item.example.title,
              description: item.example.description,
              code: item.example.code,
              explanation: item.example.explanation,
              itemId: item.itemId,
              categoryId: category.id
            };
          }
        });
      });

      return res.json({ success: true, data: examples });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Erro ao buscar exemplos' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}