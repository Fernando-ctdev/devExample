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

      // Verificar se a categoria existe e recuperar o technologyId
      const categoryCheck = await pool.query(
        'SELECT * FROM "Category" WHERE id = $1',
        [categoryId]
      );
      if (categoryCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Categoria não encontrada'
        });
      }
      const technologyId = categoryCheck.rows[0].technologyId;

      // Gerar um id para o item e usar esse mesmo valor para "itemId"
      const newId = uuidv4();

      // Inserir o item; "updatedAt" é setado com now()
      const itemResult = await pool.query(
        'INSERT INTO "Item" (id, title, "categoryId", "itemId", "updatedAt") VALUES ($1, $2, $3, $4, now()) RETURNING *',
        [newId, title, categoryId, newId]
      );

      // Gerar um id para o registro de exemplo
      const newExampleId = uuidv4();

      // Inserir o exemplo, utilizando o valor do item para "itemId" e passando technologyId
      const exampleResult = await pool.query(
        'INSERT INTO "Example" (id, title, description, code, explanation, "itemId", "technologyId", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, now()) RETURNING *',
        [newExampleId, title, '', '', '', newId, technologyId]
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
