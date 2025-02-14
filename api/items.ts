import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';
import { v4 as uuidv4 } from 'uuid';

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

      // Gerar um id para o item; usamos esse mesmo valor como itemId
      const newId = uuidv4();

      // Inserir o item com o id gerado e utilizando newId também para itemId
      const itemResult = await pool.query(
        'INSERT INTO item (id, title, "categoryId", "itemId") VALUES ($1, $2, $3, $4) RETURNING *',
        [newId, title, categoryId, newId]
      );

      // Criar o exemplo associado utilizando o mesmo valor newId na coluna "itemId"
      const exampleResult = await pool.query(
        'INSERT INTO example (title, description, code, explanation, "itemId") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, '', '', '', newId]
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
