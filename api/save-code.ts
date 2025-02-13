import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './lib/neon';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, code } = req.body;

      // Verificar se o exemplo existe
      const exampleCheck = await pool.query(
        'SELECT * FROM example WHERE id = $1',
        [id]
      );

      if (exampleCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Exemplo não encontrado'
        });
      }

      // Atualizar o código
      const result = await pool.query(
        'UPDATE example SET code = $1 WHERE id = $2 RETURNING *',
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