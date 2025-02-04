import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config: PoolConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '4713',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_DATABASE || 'tech_explanations',
  // Adicionando configurações de timeout e retry
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20
};

const pool = new Pool(config);

// Melhor tratamento de erros na conexão
pool.on('error', (err) => {
  console.error('Erro inesperado no pool do banco:', err);
  process.exit(-1);
});

// Teste inicial de conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.stack);
    process.exit(-1);
  }
  console.log('Conectado ao banco de dados PostgreSQL');
  release();
});

export default pool;
