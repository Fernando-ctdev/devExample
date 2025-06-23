import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { id, code, itemId } = req.body;
      
      if (!id || code === undefined) {
        return res.status(400).json({
          success: false,
          error: 'ID e código são obrigatórios'
        });
      }

      console.log('Request save-code:', { id, itemId, codeLength: code?.length });

      // Buscar o exemplo utilizando "id"
      const example = await prisma.example.findUnique({
        where: { id }
      });

      if (!example) {
        return res.status(404).json({
          success: false,
          error: 'Exemplo não encontrado'
        });
      }

      // Atualizar o código utilizando "id"
      const updatedExample = await prisma.example.update({
        where: { id },
        data: { code }
      });

      return res.json({
        success: true,
        data: updatedExample
      });
    } catch (error: unknown) {
      console.error('Erro ao salvar código:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    } finally {
      await prisma.$disconnect();
    }
  }
  return res.status(405).json({ error: 'Método não permitido' });
}
