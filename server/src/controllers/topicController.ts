import { Request, Response } from 'express';
import pool from '../config/database';

export const getTopicsByTech = async (req: Request, res: Response) => {
  try {
    const { tech } = req.params;
    const result = await pool.query(`
      SELECT t.* FROM topics t
      JOIN technologies tech ON t.tech_id = tech.id
      WHERE tech.name = $1
    `, [tech]);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar tópicos' });
  }
};
