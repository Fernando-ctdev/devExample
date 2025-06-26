import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { categoryId } = req.query;

      if (!categoryId || typeof categoryId !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'CategoryId é obrigatório'
        });
      }

      // Buscar itens da categoria específica
      const items = await prisma.item.findMany({
        where: {
          categoryId: categoryId
        },
        orderBy: {
          title: 'asc'
        }
      });

      return res.status(200).json({
        success: true,
        data: items
      });

    } catch (error: unknown) {
      console.error('Erro ao buscar itens:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar itens',
        details: errorMessage
      });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
    try {
      const { categoryId, title } = req.body as { categoryId: string; title: string };

      // Validação mais robusta
      if (!categoryId?.trim() || !title?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'categoryId e title são obrigatórios e não podem estar vazios'
        });
      }

      console.log('Recebendo requisição para criar tópico:', req.body);

      // Verificar se a categoria existe e obter o technologyId
      const category = await prisma.category.findUnique({
        where: { id: categoryId.trim() },
        include: { technology: true }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }
      
      const technologyId = category.technologyId;

      // Verificar se já existe um item com este título na categoria
      const existingItem = await prisma.item.findFirst({
        where: {
          title: title.trim(),
          categoryId: categoryId.trim()
        }
      });

      if (existingItem) {
        return res.status(409).json({
          success: false,
          error: 'Já existe um tópico com este título nesta categoria'
        });
      }

      // Gerar um novo id para o item, que será usado também em itemId
      const newId = uuidv4();

      // Criar o item com os campos necessários
      const item = await prisma.item.create({
        data: {
          id: newId,
          itemId: newId,
          title: title.trim(),
          categoryId: categoryId.trim()
        }
      });

      // Criar um exemplo vazio associado, passando também technologyId
      const example = await prisma.example.create({
        data: {
          id: uuidv4(),
          title: title.trim(),
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

    } catch (error: unknown) {
      console.error('Erro ao criar tópico:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar tópico',
        details: errorMessage
      });
    } finally {
      await prisma.$disconnect();
    }
  }  if (req.method === 'DELETE') {
    try {
      // Extrair itemId da URL (formato: /api/items/:itemId)
      const { itemId } = req.query as { itemId: string };

      if (!itemId?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'itemId é obrigatório'
        });
      }

      console.log('Recebendo requisição para deletar item:', itemId);

      // Verificar se o item existe (usando id, que é a chave primária)
      const existingItem = await prisma.item.findUnique({
        where: { id: itemId.trim() }
      });

      if (!existingItem) {
        return res.status(404).json({
          success: false,
          error: 'Item não encontrado'
        });
      }

      // Deletar exemplos associados primeiro (usando o id do item como itemId no exemplo)
      await prisma.example.deleteMany({
        where: { itemId: existingItem.id }
      });

      // Deletar o item usando id (chave primária)
      await prisma.item.delete({
        where: { id: itemId.trim() }
      });

      console.log('Item deletado com sucesso:', itemId);
      return res.status(200).json({
        success: true,
        message: 'Item deletado com sucesso'
      });

    } catch (error: unknown) {
      console.error('Erro ao deletar item:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: 'Erro ao deletar item',
        details: errorMessage
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
