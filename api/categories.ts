import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './lib/neon.js';

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

      // Verificar se a tecnologia existe
      const techResult = await pool.query(
        'SELECT id FROM technology WHERE name = $1',
        [technologyId]
      );

      if (techResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Tecnologia não encontrada'
        });
      }

      // Criar nova categoria
      const result = await pool.query(
        'INSERT INTO category (name, technologyId) VALUES ($1, $2) RETURNING *',
        [category, techResult.rows[0].id]
      );

      return res.status(201).json({ 
        success: true, 
        data: result.rows[0]
      });

    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage,
        details: errorMessage
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}