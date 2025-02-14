import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    console.log('Requisição recebida em /api/technologies');
    try {
      const { rows } = await pool.query(`
        SELECT t.*, 
          array_agg(json_build_object(
            'id', c.id,
            'name', c.name,
            'items', (
              SELECT json_agg(json_build_object(
                'id', i.id,
                'itemId', i."itemId",
                'title', i.title,
                'example', (
                  SELECT json_build_object(
                    'id', e.id,
                    'title', e.title,
                    'description', e.description,
                    'code', e.code,
                    'explanation', e.explanation
                  )
                  FROM example e
                  WHERE e."itemId" = i."itemId"
                )
              ))
              FROM item i
              WHERE i."categoryId" = c.id
            )
          )) as categories
        FROM technology t
        LEFT JOIN category c ON c."technologyId" = t.id
        GROUP BY t.id`);      
      
      return res.json(rows);
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  }
}
