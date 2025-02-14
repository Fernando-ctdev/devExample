import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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

      // Itera sobre as categorias e itens; usamos (item as any).itemId para garantir que o campo seja lido
      tech.categories.forEach(category => {
        category.items.forEach(item => {
          // Força a leitura do itemId (se por algum motivo ele não estiver no tipo)
          const idFromItem = (item as any).itemId;
          if (item.example && idFromItem) {
            examples[idFromItem] = {
              id: item.example.id,
              title: item.example.title,
              description: item.example.description,
              code: item.example.code,
              explanation: item.example.explanation,
              itemId: idFromItem,     // aqui garantimos que itemId está definido
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
