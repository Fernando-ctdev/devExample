import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    console.log('Requisição recebida em /api/technologies');
    try {
      const { rows } = await pool.query(`
        SELECT t.*, 
          COALESCE(
            array_remove(
              array_agg(
                json_build_object(
                  'id', c.id,
                  'name', c.name,
                  'items', COALESCE(
                    (
                      SELECT json_agg(
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
                      )
                      FROM item i
                      WHERE i."categoryId" = c.id
                    ), '[]'::json
                  )
                )
              ), null
            ), '[]'::json
          ) as categories
        FROM technology t
        LEFT JOIN category c ON c."technologyId" = t.id
        GROUP BY t.id
      `);
      
      return res.json(rows);
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  } else if (req.method === 'POST') {
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
