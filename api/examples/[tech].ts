import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      const { rows } = await pool.query(`
        WITH tech_data AS (
          SELECT "id" 
          FROM "technology" 
          WHERE "name" = $1
        )
        SELECT 
          i."itemId" as "itemId",
          json_build_object(
            'id', e."id",
            'title', e."title",
            'description', e."description",
            'code', e."code",
            'explanation', e."explanation",
            'itemId', e."itemId",
            'categoryId', c."id"
          ) as example_data
        FROM tech_data
        JOIN "category" c ON c."technologyId" = tech_data.id
        JOIN "item" i ON i."categoryId" = c."id"
        JOIN "example" e ON e."itemId" = i."itemId"
      `, [tech]);

      // Usando o alias "itemId" para acessar a chave retornada
      const examples = rows.reduce((acc: any, row) => {
        acc[row.itemId] = row.example_data;
        return acc;
      }, {});

      return res.json({ success: true, data: examples });
    } catch (error: unknown) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
