import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { category, technologyId } = req.body;

      if (!category || !technologyId) {
        return res.status(400).json({
          success: false,
          error: 'Nome da categoria e ID da tecnologia são obrigatórios'
        });
      }

      const technology = await prisma.technology.findUnique({
        where: { name: technologyId }
      });

      if (!technology) {
        return res.status(404).json({
          success: false,
          error: 'Tecnologia não encontrada'
        });
      }

      const newCategory = await prisma.category.create({
        data: {
          name: category,
          technologyId: technology.id
        }
      });

      return res.status(201).json({ 
        success: true, 
        data: newCategory 
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar categoria',
        details: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}