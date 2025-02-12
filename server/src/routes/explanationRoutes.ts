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
         orderBy: {
           createdAt: 'desc' // Ordena as categorias pela data de criação, mais novas primeiro
         },
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
     id: category.id,
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

    // Buscar o exemplo pelo itemId
    const example = await prisma.example.findFirst({
      where: { 
        item: {
          itemId: id
        }
      }
    });

    if (!example) {
      return res.status(404).json({
        success: false,
        error: 'Exemplo não encontrado'
      });
    }

    const updated = await prisma.example.update({
      where: { id: example.id }, // Usar o id do exemplo encontrado
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

    // Buscar o exemplo pelo itemId
    const example = await prisma.example.findFirst({
      where: { 
        item: {
          itemId: id
        }
      }
    });

    if (!example) {
      return res.status(404).json({
        success: false,
        error: 'Exemplo não encontrado'
      });
    }

    const updated = await prisma.example.update({
      where: { id: example.id }, // Usar o id do exemplo encontrado
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

    // Corrigir a validação dos campos obrigatórios (removendo o ! antes do logo)
    if (!name || !title || !color || !hoverColor || !logo || !alt || !padding) {
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

// Rota para adicionar um tópico a uma categoria
router.post('/topics', async (req, res) => {
  try {
    const { categoryId, title } = req.body;
    
    console.log('Recebendo requisição para criar tópico:', req.body);

    // Validar dados obrigatórios
    if (!categoryId || !title) {
      return res.status(400).json({
        success: false,
        error: 'categoryId e title são obrigatórios'
      });
    }

    // Verificar se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Categoria não encontrada'
      });
    }

    // Criar o tópico
    const item = await prisma.item.create({
      data: {
        title,
        categoryId
      }
    });

    // Criar um exemplo vazio associado ao tópico
    const example = await prisma.example.create({
      data: {
        title: title,
        description: '',
        code: '',
        explanation: '',
        itemId: item.itemId
      }
    });

    console.log('Tópico criado com sucesso:', { item, example });
    return res.status(201).json({ 
      success: true, 
      data: {
        ...item,
        example
      }
    });

  } catch (error) {
    console.error('Erro ao criar tópico:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar tópico',
      details: error.message
    });
  }
});

// Rota para criar uma nova categoria
router.post('/categories', async (req, res) => {
  try {
    const { category, technologyId } = req.body;
    
    console.log('Recebendo requisição para criar categoria:', req.body);

    if (!category || !technologyId) {
      return res.status(400).json({
        success: false,
        error: 'Nome da categoria e ID da tecnologia são obrigatórios'
      });
    }

    const technology = await prisma.technology.findUnique({
      where: { name: technologyId }
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        error: 'Tecnologia não encontrada'
      });
    }

    // Criar apenas a categoria, sem criar itens
    const newCategory = await prisma.category.create({
      data: {
        name: category,
        technologyId: technology.id
      }
    });

    console.log('Categoria criada com sucesso:', newCategory);
    return res.status(201).json({ 
      success: true, 
      data: newCategory 
    });

  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar categoria',
      details: error.message
    });
  }
});

// Rota para criar um novo item em uma categoria
router.post('/items', async (req, res) => {
  try {
    const { itemId, title, categoryId } = req.body;
    
    console.log('Recebendo requisição para criar item:', req.body);

    // Validar dados obrigatórios
    if (!itemId || !title || !categoryId) {
      return res.status(400).json({
        success: false,
        error: 'itemId, title e categoryId são obrigatórios'
      });
    }

    // Verificar se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Categoria não encontrada'
      });
    }

    // Criar o item
    const item = await prisma.item.create({
      data: {
        itemId,
        title,
        categoryId,
      }
    });

    // Criar um exemplo vazio associado ao item
    const example = await prisma.example.create({
      data: {
        title,
        description: '',
        code: '',
        explanation: '',
        itemId: item.id,
        technologyId: category.technologyId
      }
    });

    console.log('Item criado com sucesso:', { item, example });
    return res.status(201).json({ 
      success: true, 
      data: {
        ...item,
        example
      }
    });

  } catch (error) {
    console.error('Erro ao criar item:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar item',
      details: error.message
    });
  }
});

export default router;