import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      // Primeiro verifica se a tecnologia existe
      const techExists = await pool.query(
        'SELECT id FROM technology WHERE name = $1',
        [tech]
      );

      if (techExists.rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Tecnologia não encontrada' 
        });
      }

      // Se a tecnologia existe, busca suas categorias (mesmo que não tenha nenhuma)
      const { rows } = await pool.query(`
        WITH tech_data AS (
          SELECT id 
          FROM technology 
          WHERE name = $1
        )
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
        FROM tech_data
        LEFT JOIN category c ON c.technologyId = tech_data.id
        LEFT JOIN item i ON i.categoryId = c.id
        GROUP BY c.id, c.name
        ORDER BY c.created_at DESC
      `, [tech]);

      // Retorna array vazio se não houver categorias
      return res.json({ 
        success: true, 
        data: rows || [] 
      });
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
