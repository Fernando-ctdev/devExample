import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { itemId, title, categoryId } = req.body;

      if (!itemId || !title || !categoryId) {
        return res.status(400).json({
          success: false,
          error: 'itemId, title e categoryId são obrigatórios'
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

      // Criar o item
      const itemResult = await pool.query(
        'INSERT INTO item (itemId, title, categoryId) VALUES ($1, $2, $3) RETURNING *',
        [itemId, title, categoryId]
      );

      // Criar o exemplo associado
      const exampleResult = await pool.query(
        'INSERT INTO example (title, description, code, explanation, itemId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, '', '', '', itemId]
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