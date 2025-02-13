import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

// Singleton do PrismaClient
const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, title, color, hoverColor, logo, alt, padding } = req.body as {
        name: string;
        title: string;
        color: string;
        hoverColor: string;
        logo: string;
        alt: string;
        padding: string;
      };

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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2002') {
        return res.status(400).json({
          success: false,
          error: 'Já existe uma tecnologia com esse nome'
        });
      }

      return res.status(500).json({ 
        success: false, 
        error: errorMessage
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}