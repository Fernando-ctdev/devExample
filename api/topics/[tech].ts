import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../utils/neon';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      const { rows } = await pool.query(`
        WITH tech_data AS (
          SELECT id 
          FROM technology 
          WHERE name = $1
        )
        SELECT 
          c.id,
          c.name as category,
          json_agg(
            json_build_object(
              'id', i.itemId,
              'title', i.title
            )
          ) as items
        FROM tech_data
        JOIN category c ON c.technologyId = tech_data.id
        JOIN item i ON i.categoryId = c.id
        GROUP BY c.id, c.name
        ORDER BY c.created_at DESC
      `, [tech]);

      if (rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Tecnologia não encontrada' 
        });
      }

      return res.json({ 
        success: true, 
        data: rows 
      });
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}