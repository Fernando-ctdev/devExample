import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  // Primeira conexão para criar o banco
  const mainPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '4713',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'postgres'
  });

  try {
    // Desconectar todos os clientes do banco tech_explanations
    await mainPool.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = 'tech_explanations'
      AND pid <> pg_backend_pid();
    `);

    // Criar banco de dados sem usar transação
    const client = await mainPool.connect();
    try {
      await client.query('DROP DATABASE IF EXISTS tech_explanations');
      await client.query('CREATE DATABASE tech_explanations');
    } finally {
      client.release();
    }
    
    await mainPool.end();

    // Nova conexão com o banco tech_explanations
    const dbPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '4713',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: 'tech_explanations'
    });

    // Ler e executar o script SQL para criar as tabelas
    const sqlPath = path.join(__dirname, '..', 'models', 'init.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    // Executar comandos de criação de tabelas em uma única transação
    await dbPool.query(sqlScript);

    console.log('✅ Banco de dados e tabelas criados com sucesso!');
    await dbPool.end();
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error);
    process.exit(1);
  }
}

setupDatabase();
