import pool from './lib/neon';

console.log('Arquivo technologies.ts carregado corretamente.');
console.log('Tentando importar neon.ts...');

export default async function handler(req, res) {
  console.log('Requisição recebida em /api/technologies');
  try {
    const { rows } = await pool.query('SELECT 1'); // Testa conexão com o banco
    console.log('Conexão com o banco bem-sucedida.');
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
    res.status(500).json({ error: 'Erro ao conectar no banco' });
  }
}
