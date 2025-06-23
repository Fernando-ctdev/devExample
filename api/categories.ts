import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { category, technologyId } = req.body as { category: string; technologyId: string };

      console.log('Recebendo requisição para criar categoria:', req.body);

      // Validação mais robusta
      if (!category?.trim() || !technologyId?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Nome da categoria e ID da tecnologia são obrigatórios e não podem estar vazios'
        });
      }

      // Buscar a tecnologia pelo nome (technologyId vem como nome)
      const technology = await prisma.technology.findUnique({
        where: { name: technologyId.trim() }
      });

      if (!technology) {
        return res.status(404).json({
          success: false,
          error: 'Tecnologia não encontrada'
        });
      }

      // Verificar se já existe uma categoria com esse nome para esta tecnologia
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: category.trim(),
          technologyId: technology.id
        }
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          error: 'Já existe uma categoria com este nome para esta tecnologia'
        });
      }

      // Criar apenas a categoria, sem criar itens
      const newCategory = await prisma.category.create({
        data: {
          name: category.trim(),
          technologyId: technology.id
        }
      });

      console.log('Categoria criada com sucesso:', newCategory);
      return res.status(201).json({
        success: true,
        data: newCategory
      });
    } catch (error: unknown) {      console.error('Erro ao criar categoria:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar categoria',
        details: errorMessage
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
