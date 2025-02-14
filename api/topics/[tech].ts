import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      const { rows } = await pool.query(`
        SELECT 
          c.id,
          c.name as category,
          COALESCE(
            json_agg(
              json_build_object(
                'id', i.itemId,
                'title', i.title
              )
            ) FILTER (WHERE i.id IS NOT NULL),
            '[]'
          ) as items
        FROM technology t
        JOIN category c ON c.technologyId = t.id
        LEFT JOIN item i ON i.categoryId = c.id
        WHERE t.name = $1
        GROUP BY c.id, c.name
        ORDER BY c.created_at DESC
      `, [tech]);

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
