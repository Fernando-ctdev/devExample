import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './lib/neon.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('🟢 Nova requisição recebida em /api/technologies');

  if (req.method === 'GET') {
    try {
      console.log('🔍 Testando conexão...');
      const { rows } = await pool.query('SELECT 1');
      console.log('✅ Conexão com o banco bem-sucedida!');

      return res.json({ success: true, message: 'Conexão OK!' });
    } catch (error) {
      console.error('❌ Erro na conexão:', error);
      return res.status(500).json({ error: 'Erro ao conectar no banco' });
    }
  }
}
