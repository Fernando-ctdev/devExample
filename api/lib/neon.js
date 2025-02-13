import pkg from 'pg';

const { Pool } = pkg;

console.log('🟢 Iniciando conexão com o banco...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT 1')
  .then(() => console.log('✅ Conexão com o banco bem-sucedida!'))
  .catch((err) => console.error('❌ Erro ao conectar no banco:', err));

export default pool;
