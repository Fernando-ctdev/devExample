import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const techParam = req.query.tech as string;

      const tech = await prisma.technology.findUnique({
        where: { name: techParam },
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

      if (!tech) {
        return res
          .status(404)
          .json({ success: false, error: 'Tecnologia não encontrada' });
      }

      const examples: Record<string, any> = {};

      // Itera sobre as categorias e itens e adiciona os exemplos quando existentes
      tech.categories.forEach(category => {
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

      console.log('Exemplos sendo enviados:', examples);
      return res.json({ success: true, data: examples });
    } catch (error: unknown) {
      console.error('Erro ao buscar exemplos:', error);
      return res
        .status(500)
        .json({ success: false, error: 'Erro ao buscar exemplos' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}