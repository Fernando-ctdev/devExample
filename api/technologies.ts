import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './lib/neon';

console.log('🔄 Arquivo technologies.ts carregado.');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('🟢 Nova requisição recebida em /api/technologies');

  if (req.method === 'GET') {
    try {
      console.log('🔍 Tentando conexão com o banco...');
      const { rows } = await pool.query('SELECT 1');
      console.log('✅ Conexão com o banco bem-sucedida!');

      console.log('🔍 Buscando tecnologias...');
      const { rows: technologies } = await pool.query(`
        SELECT t.*, 
          array_agg(json_build_object(
            'id', c.id,
            'name', c.name,
            'items', (
              SELECT json_agg(json_build_object(
                'id', i.id,
                'itemId', i.itemId,
                'title', i.title,
                'example', (
                  SELECT json_build_object(
                    'id', e.id,
                    'title', e.title,
                    'description', e.description,
                    'code', e.code,
                    'explanation', e.explanation
                  )
                  FROM example e
                  WHERE e.itemId = i.itemId
                )
              ))
              FROM item i
              WHERE i.categoryId = c.id
            )
          )) as categories
        FROM technology t
        LEFT JOIN category c ON c.technologyId = t.id
        GROUP BY t.id
      `);

      console.log(`✅ ${technologies.length} tecnologias encontradas.`);
      
      return res.json(technologies);
    } catch (error: unknown) {
      console.error('❌ Erro ao buscar tecnologias:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  }

  console.log('⚠️ Método não permitido');
  return res.status(405).json({ error: 'Método não permitido' });
}
