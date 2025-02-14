import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tech = req.query.tech as string;

      // A query abaixo busca as categorias, itens e exemplos relacionados à tecnologia
      const { rows } = await pool.query(`
        SELECT 
          c.id AS categoryid,
          i."itemId" AS itemid,
          e.id AS exampleid,
          e.title AS example_title,
          e.description AS example_description,
          e.code AS example_code,
          e.explanation AS example_explanation
        FROM technology t
        JOIN category c ON c."technologyId" = t.id
        JOIN item i ON i."categoryId" = c.id
        JOIN example e ON e."itemId" = i."itemId"
        WHERE t.name = $1
      `, [tech]);

      // Estruturar os dados no formato esperado pelo frontend
      const examples: Record<string, any> = {};
      rows.forEach(row => {
        examples[row.itemid] = {
          id: row.exampleid,
          title: row.example_title,
          description: row.example_description,
          code: row.example_code,
          explanation: row.example_explanation,
          itemId: row.itemid,
          categoryId: row.categoryid
        };
      });

      console.log('Exemplos sendo enviados:', examples);
      return res.json({ success: true, data: examples });
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  }
  return res.status(405).json({ error: 'Método não permitido' });
}
