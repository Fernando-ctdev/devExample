import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, explanation } = req.body;
      console.log('Request save-explanation:', { id, explanationLength: explanation?.length });

      // Buscar o exemplo utilizando "itemId"
      const exampleCheck = await pool.query(`
        SELECT * FROM example
        WHERE "id" = $1
      `, [id]);

      if (exampleCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Exemplo não encontrado'
        });
      }

      // Atualizar o explanation utilizando "itemId"
      const result = await pool.query(`
        UPDATE example
        SET explanation = $1
        WHERE "id" = $2
        RETURNING *
      `, [explanation, id]);

      return res.json({
        success: true,
        data: result.rows[0]
      });

    } catch (error: unknown) {
      console.error('Erro ao salvar explicação:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }
  
  return res.status(405).json({ error: 'Método não permitido' });
}
