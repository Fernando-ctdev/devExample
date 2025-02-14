import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, code } = req.body;

      // Verificar se o exemplo existe utilizando a coluna "itemId" ao invés de "id"
      const exampleCheck = await pool.query(
        'SELECT * FROM "example" WHERE "itemId" = $1',
        [id]
      );

      if (exampleCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Exemplo não encontrado'
        });
      }

      // Atualizar o código, também utilizando "itemId"
      const result = await pool.query(
        'UPDATE "example" SET "code" = $1 WHERE "itemId" = $2 RETURNING *',
        [code, id]
      );

      return res.json({
        success: true,
        data: result.rows[0]
      });

    } catch (error: unknown) {
      console.error('Erro ao salvar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
