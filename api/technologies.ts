import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Requisição recebida em /api/technologies');
      
      const technologies = await prisma.technology.findMany({
        include: {
          categories: {
            include: {
              items: {
                include: {
                  example: {
                    select: {
                      id: true,
                      title: true,
                      description: true,
                      code: true,
                      explanation: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Transformar os dados para o formato esperado pelo frontend
      const formattedTechnologies = technologies.map(tech => ({
        id: tech.id,
        name: tech.name,
        title: tech.title,
        color: tech.color,
        hoverColor: tech.hoverColor,
        logo: tech.logo,
        alt: tech.alt,
        padding: tech.padding,
        createdAt: tech.createdAt,
        updatedAt: tech.updatedAt,
        categories: tech.categories.map(category => ({
          id: category.id,
          name: category.name,
          items: category.items.map(item => ({
            id: item.id,
            itemId: item.itemId,
            title: item.title,
            example: item.example
          }))
        }))
      }));
      
      return res.json(formattedTechnologies);
    }    if (req.method === 'POST') {
      const { name, title, color, hoverColor, logo, alt, padding } = req.body;
      
      // Apenas name é obrigatório, os outros têm valores padrão
      if (!name) {
        return res.status(400).json({
          success: false,
          error: 'Nome da tecnologia é obrigatório'
        });
      }

      const newTechnology = await prisma.technology.create({
        data: {
          name: name.toLowerCase(),
          title: title || `${name.charAt(0).toUpperCase() + name.slice(1)} examples`,
          color: color || '#8B5CF6',
          hoverColor: hoverColor || '#7C3AED',
          logo: logo || '',
          alt: alt || `${name.charAt(0).toUpperCase() + name.slice(1)} logo`,
          padding: padding || 'px-8 py-3'
        }
      });
      
      return res.status(201).json({ 
        success: true, 
        data: newTechnology 
      });
    }

    return res.status(405).json({ error: 'Método não permitido' });
    
  } catch (error: unknown) {
    console.error('Erro detalhado:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  } finally {
    await prisma.$disconnect();
  }
}
