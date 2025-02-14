import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { title, categoryId } = req.body;

      if (!title || !categoryId) {
        return res.status(400).json({
          success: false,
          error: 'title e categoryId são obrigatórios'
        });
      }

      // Verificar se a categoria existe
      const categoryCheck = await pool.query(
        'SELECT * FROM category WHERE id = $1',
        [categoryId]
      );

      if (categoryCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }

      // Criar o item (usando a coluna id que é gerada automaticamente)
      const itemResult = await pool.query(
        'INSERT INTO "Item" (title, "categoryId") VALUES ($1, $2) RETURNING *',
        [title, categoryId]
      );

      // Obter o id recém-criado do item
      const newItemId = itemResult.rows[0].id;

      // Criar o exemplo associado, utilizando o id gerado no item
      const exampleResult = await pool.query(
        'INSERT INTO "Example" (title, description, code, explanation, "itemId") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, '', '', '', newItemId]
      );

      return res.status(201).json({
        success: true,
        data: {
          ...itemResult.rows[0],
          example: exampleResult.rows[0]
        }
      });

    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
