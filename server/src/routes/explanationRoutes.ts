import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota para obter todas as tecnologias com suas categorias e exemplos
router.get('/technologies', async (req, res) => {
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
   res.json(technologies);
 } catch (error) {
   res.status(500).json({ error: 'Erro ao buscar tecnologias' });
 }
});

// Rota para obter tópicos de uma tecnologia específica 
router.get('/topics/:tech', async (req, res) => {
 try {
   const tech = await prisma.technology.findUnique({
     where: { name: req.params.tech },
     include: {
       categories: {
         include: {
           items: true
         }
       }
     }
   });

   if (!tech) {
     return res.status(404).json({ success: false, error: 'Tecnologia não encontrada' });
   }

   const topics = tech.categories.map(category => ({
     category: category.name,
     items: category.items.map(item => ({
       id: item.itemId,
       title: item.title
     }))
   }));

   res.json({ success: true, data: topics });
 } catch (error) {
   res.status(500).json({ success: false, error: 'Erro ao buscar tópicos' });
 }
});

// Rota para obter exemplos de uma tecnologia específica
router.get('/examples/:tech', async (req, res) => {
 try {
   const tech = await prisma.technology.findUnique({
     where: { name: req.params.tech },
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

   if (!tech) {
     return res.status(404).json({ success: false, error: 'Tecnologia não encontrada' });
   }

   // Transformar para o formato que o frontend espera
   const examples = {};
   tech.categories.forEach(category => {
     category.items.forEach(item => {
       if (item.example) {
         examples[item.itemId] = {
           id: item.example.id, // Adicionando o ID do exemplo
           title: item.example.title,
           description: item.example.description,
           code: item.example.code,
           explanation: item.example.explanation,
           itemId: item.itemId, // Adicionando o itemId também
           categoryId: category.id // Opcional: também podemos incluir o categoryId se necessário
         };
       }
     });
   });

   console.log('Exemplos sendo enviados:', examples); // Debug
   res.json({ success: true, data: examples });
 } catch (error) {
   console.error('Erro ao buscar exemplos:', error);
   res.status(500).json({ success: false, error: 'Erro ao buscar exemplos' });
 }
});

// POST /api/save-code
router.post('/save-code', async (req, res) => {
  try {
    const { id, code } = req.body;
    console.log('Request save-code:', { id, codeLength: code?.length });

    // Aqui está a mudança principal - buscar pelo ID do exemplo diretamente
    const example = await prisma.example.findUnique({
      where: { id }
    });

    if (!example) {
      return res.status(404).json({
        success: false,
        error: 'Exemplo não encontrado'
      });
    }

    const updated = await prisma.example.update({
      where: { id },
      data: { code }
    });

    return res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error('Erro ao salvar:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/save-explanation
router.post('/save-explanation', async (req, res) => {
  try {
    const { id, explanation } = req.body;
    console.log('Request save-explanation:', { id, explanationLength: explanation?.length });

    // Buscar e atualizar diretamente pelo ID do exemplo, igual ao save-code
    const example = await prisma.example.findUnique({
      where: { id }
    });

    if (!example) {
      return res.status(404).json({
        success: false,
        error: 'Exemplo não encontrado'
      });
    }

    const updated = await prisma.example.update({
      where: { id },
      data: { explanation }
    });

    return res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error('Erro ao salvar explicação:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Adicionar a rota de criar tecnologia ao arquivo existente
router.post('/technologies', async (req, res) => {
  try {
    const { name, title, color, hoverColor, logo, alt, padding } = req.body;
    
    console.log('Recebendo requisição para criar tecnologia:', req.body);

    // Validar dados obrigatórios
    if (!name || !title || !color || !hoverColor || logo || !alt || !padding) {
      console.log('Campos faltando:', { name, title, color, hoverColor, logo, alt, padding });
      return res.status(400).json({
        success: false,
        error: 'Todos os campos são obrigatórios'
      });
    }

    // Criar a tecnologia
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
    return res.status(200).json({ 
      success: true, 
      data: technology 
    });
  } catch (error) {
    console.error('Erro detalhado ao criar tecnologia:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
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
});

export default router;