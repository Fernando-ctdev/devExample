import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { categoryId, title } = req.body as { categoryId: string; title: string };

      if (!categoryId || !title) {
        return res.status(400).json({
          success: false,
          error: 'categoryId e title são obrigatórios'
        });
      }

      // Verifica se a categoria existe
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }

      // Gerar um novo valor de id para ser usado em id e itemId
      const newId = uuidv4();

      // Criar o item com os campos obrigatórios
      const item = await prisma.item.create({
        data: {
          id: newId,
          itemId: newId,
          title,
          categoryId
        }
      });

      // Criar um exemplo vazio associado ao item
      const example = await prisma.example.create({
        data: {
          title,
          description: '',
          code: '',
          explanation: '',
          itemId: item.itemId
        }
      });

      return res.status(201).json({
        success: true,
        data: {
          ...item,
          example
        }
      });

    } catch (error: any) {
      console.error('Erro ao criar tópico:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar tópico',
        details: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
