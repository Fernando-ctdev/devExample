import { Request, Response } from 'express';
import pool from '../config/database';
import { Explanation } from '../types/types';

export const saveExplanation = async (req: Request, res: Response) => {
  try {
    const { tech, tech_id, explanation }: Explanation = req.body;
    
    const query = `
      INSERT INTO explanations (tech, tech_id, explanation)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [tech, tech_id, explanation]);
    
    res.json({
      success: true,
      message: 'Explicação salva com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao salvar explicação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao salvar explicação'
    });
  }
};

export const getExplanation = async (req: Request, res: Response) => {
  try {
    const { tech_id } = req.params;
    const result = await pool.query('SELECT * FROM explanations WHERE tech_id = $1', [tech_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Explicação não encontrada'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar explicação'
    });
  }
};
