import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      if (!tech) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetro tech é obrigatório'
        });
      }

      // Buscar a tecnologia com suas categorias e itens
      const technology = await prisma.technology.findUnique({
        where: { name: tech },
        include: {
          categories: {
            include: {              items: {
                select: {
                  id: true,
                  itemId: true,
                  title: true
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!technology) {
        return res.status(404).json({
          success: false,
          error: 'Tecnologia não encontrada'
        });
      }      // Formatar os dados para o formato esperado
      const formattedCategories = technology.categories.map(category => ({
        id: category.id,
        name: category.name,
        technologyId: technology.name,
        category: category.name,
        items: category.items.map(item => ({
          id: item.itemId,
          itemId: item.itemId,
          title: item.title
        }))
      }));

      return res.json({
        success: true,
        data: formattedCategories
      });
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ 
        success: false, 
        error: errorMessage 
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
