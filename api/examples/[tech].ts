import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../db';

interface ExampleOutput {
  [key: string]: {
    id: string;
    title: string;
    description: string;
    code: string;
    explanation: string;
    itemId: string;
    categoryId: string;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;
      const examples: ExampleOutput = {};

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

      technology.categories.forEach((category) => {
        category.items.forEach((item) => {
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}