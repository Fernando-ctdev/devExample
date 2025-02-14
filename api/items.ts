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

      console.log('Recebendo requisição para criar tópico:', req.body);

      // Verificar se a categoria existe e obter o technologyId
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }
      
      const technologyId = category.technologyId;

      // Gerar um novo id para o item, que será usado também em itemId
      const newId = uuidv4();

      // Criar o item com os campos necessários
      const item = await prisma.item.create({
        data: {
          id: newId,
          itemId: newId,
          title,
          categoryId
        }
      });

      // Criar um exemplo vazio associado, passando também technologyId
      const example = await prisma.example.create({
        data: {
          id: uuidv4(),
          title,
          description: '',
          code: '',
          explanation: '',
          itemId: item.itemId,
          technologyId
        }
      });

      console.log('Tópico criado com sucesso:', { item, example });
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
