import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    console.log('Requisição recebida em /api/technologies');
    try {
      const result = await pool.query(`
        WITH category_data AS (
          SELECT 
            c.id as category_id,
            c.name as category_name,
            c."technologyId",
            COALESCE(
              json_agg(
                json_build_object(
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
                )
              ) FILTER (WHERE i.id IS NOT NULL),
              '[]'
            ) as items
          FROM category c
          LEFT JOIN item i ON i."categoryId" = c.id
          GROUP BY c.id, c.name, c."technologyId"
        )
        SELECT t.*, 
          array_agg(
            json_build_object(
              'id', cd.category_id,
              'name', cd.category_name,
              'items', cd.items
            )
          ) FILTER (WHERE cd.category_id IS NOT NULL) as categories
        FROM technology t
        LEFT JOIN category_data cd ON cd."technologyId" = t.id
        GROUP BY t.id
      `);
      
      return res.json(result.rows);
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, title, color, hoverColor, logo, alt, padding } = req.body;
      if (!name || !title || !color || !hoverColor || !logo || !alt || !padding) {
        return res.status(400).json({
          success: false,
          error: 'Todos os campos são obrigatórios'
        });
      }
      const techResult = await pool.query(
        `INSERT INTO technology (name, title, color, "hoverColor", logo, alt, padding)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name.toLowerCase(), title, color, hoverColor, logo, alt, padding]
      );
      return res.status(201).json({ success: true, data: techResult.rows[0] });
    } catch (error: unknown) {
      console.error('Erro ao criar tecnologia:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
