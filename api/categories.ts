import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { category, technologyId } = req.body as { category: string; technologyId: string };

      console.log('Recebendo requisição para criar categoria:', req.body);

      if (!category || !technologyId) {
        return res.status(400).json({
          success: false,
          error: 'Nome da categoria e ID da tecnologia são obrigatórios'
        });
      }

      // Buscar a tecnologia pelo nome (technologyId vem como nome)
      const technology = await prisma.technology.findUnique({
        where: { name: technologyId }
      });

      if (!technology) {
        return res.status(404).json({
          success: false,
          error: 'Tecnologia não encontrada'
        });
      }

      // Criar apenas a categoria, sem criar itens
      const newCategory = await prisma.category.create({
        data: {
          name: category,
          technologyId: technology.id
        }
      });

      console.log('Categoria criada com sucesso:', newCategory);
      return res.status(201).json({
        success: true,
        data: newCategory
      });
    } catch (error: any) {
      console.error('Erro ao criar categoria:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar categoria',
        details: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
