import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET /api/technologies
  if (req.method === 'GET') {
    try {
      const technologies = await prisma.technology.findMany({
        include: {
          categories: {
            include: {
              items: {
                include: {
                  example: true
                }
              }
            }
          }
        }
      });
      return res.json(technologies);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tecnologias' });
    }
  }

  // POST /api/technologies
  if (req.method === 'POST') {
    try {
      const { name, title, color, hoverColor, logo, alt, padding } = req.body;

      if (!name || !title || !color || !hoverColor || !logo || !alt || !padding) {
        return res.status(400).json({
          success: false,
          error: 'Todos os campos são obrigatórios'
        });
      }

      const technology = await prisma.technology.create({
        data: {
          name: name.toLowerCase(),
          title,
          color,
          hoverColor,
          logo,
          alt,
          padding
        }
      });

      return res.status(200).json({ 
        success: true, 
        data: technology 
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          success: false,
          error: 'Já existe uma tecnologia com esse nome'
        });
      }

      return res.status(500).json({ 
        success: false, 
        error: 'Erro ao criar tecnologia',
        details: error.message 
      });
    }
  }

  // Método não permitido
  return res.status(405).json({ error: 'Método não permitido' });
}