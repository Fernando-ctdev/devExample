import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

// Singleton do PrismaClient
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[${new Date().toISOString()}] - Nova requisição: ${req.method}`);

  if (req.method === 'GET') {
    try {
      console.log('Buscando todas as tecnologias...');
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
      console.log('Tecnologias buscadas com sucesso:', technologies.length);
      return res.json(technologies);
    } catch (error: unknown) {
      console.error('Erro ao buscar tecnologias:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ error: errorMessage });
    }
  }

  if (req.method === 'POST') {
    try {
      console.log('Recebendo dados do POST:', req.body);

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
        console.warn('Dados inválidos recebidos:', req.body);
        return res.status(400).json({
          success: false,
          error: 'Todos os campos são obrigatórios'
        });
      }

      console.log(`Criando tecnologia: ${name}`);
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

      console.log('Tecnologia criada com sucesso:', technology);
      return res.status(200).json({ success: true, data: technology });

    } catch (error: unknown) {
      console.error('Erro ao criar tecnologia:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2002') {
        return res.status(400).json({
          success: false,
          error: 'Já existe uma tecnologia com esse nome'
        });
      }

      return res.status(500).json({ success: false, error: errorMessage });
    }
  }

  console.warn('Método não permitido:', req.method);
  return res.status(405).json({ error: 'Método não permitido' });
}
