import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ExampleData {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  itemId: string;
  categoryId: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'GET') {
    try {
      const techParam = req.query.tech as string;

      if (!techParam?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetro tech é obrigatório'
        });
      }

      const tech = await prisma.technology.findUnique({
        where: { name: techParam.trim() },
        include: {
          categories: {
            include: {
              items: {
                select: {
                  itemId: true,
                  title: true,
                  example: true,
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

      const examples: Record<string, ExampleData> = {};

      // Itera sobre as categorias e itens e constrói o objeto de exemplos
      tech.categories.forEach(category => {
        category.items.forEach(item => {
          if (item.example && item.itemId) {
            examples[item.itemId] = {
              id: item.example.id,
              title: item.example.title,
              description: item.example.description,
              code: item.example.code,
              explanation: item.example.explanation,
              itemId: item.example.id, 
              categoryId: category.id
            };
          }
        });
      });

      console.log('Exemplos sendo enviados:', examples);
      return res.json({ success: true, data: examples });
    } catch (error: unknown) {
      console.error('Erro ao buscar exemplos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res
        .status(500)
        .json({ success: false, error: 'Erro ao buscar exemplos', details: errorMessage });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
