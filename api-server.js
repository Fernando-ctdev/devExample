import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Helper function para tratamento de erros
const handleError = (res, error, message = 'Erro interno') => {
  console.error(message, error);
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  res.status(500).json({
    success: false,
    error: message,
    details: errorMessage
  });
};

// GET /api/technologies
app.get('/api/technologies', async (req, res) => {
  try {
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
    
    res.json(formattedTechnologies);
  } catch (error) {
    handleError(res, error, 'Erro ao buscar tecnologias');
  }
});

// POST /api/technologies
app.post('/api/technologies', async (req, res) => {
  try {
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
      res.status(201).json({ 
      success: true, 
      data: newTechnology 
    });
  } catch (error) {
    handleError(res, error, 'Erro ao criar tecnologia');
  }
});

// DELETE /api/technologies/:id
app.delete('/api/technologies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID da tecnologia é obrigatório'
      });
    }

    // Verificar se a tecnologia existe
    const existingTechnology = await prisma.technology.findUnique({
      where: { id }
    });

    if (!existingTechnology) {
      return res.status(404).json({
        success: false,
        error: 'Tecnologia não encontrada'
      });
    }

    // Excluir a tecnologia (isso também excluirá categorias e itens relacionados devido ao cascade)
    await prisma.technology.delete({
      where: { id }
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Tecnologia excluída com sucesso'
    });
  } catch (error) {
    handleError(res, error, 'Erro ao excluir tecnologia');
  }
});

// GET /api/topics/:tech
app.get('/api/topics/:tech', async (req, res) => {
  try {
    const tech = req.params.tech;

    if (!tech?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro tech é obrigatório'
      });
    }

    const technology = await prisma.technology.findUnique({
      where: { name: tech.trim() },
      include: {
        categories: {
          include: {
            items: {
              select: {
                itemId: true,
                title: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        error: 'Tecnologia não encontrada'
      });
    }

    const formattedCategories = technology.categories.map(category => ({
      id: category.id,
      category: category.name,
      items: category.items.map(item => ({
        id: item.itemId,
        title: item.title
      }))
    }));

    res.json({
      success: true,
      data: formattedCategories
    });
  } catch (error) {
    handleError(res, error, 'Erro ao buscar tópicos');
  }
});

// GET /api/examples/:tech  
app.get('/api/examples/:tech', async (req, res) => {
  try {
    const techParam = req.params.tech;

    if (!techParam?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro tech é obrigatório'
      });
    }

    const tech = await prisma.technology.findUnique({
      where: { name: techParam.trim() },
      include: {
        categories: {
          include: {
            items: {
              select: {
                itemId: true,
                title: true,
                example: true,
              }
            }
          }
        }
      }
    });

    if (!tech) {
      return res.status(404).json({ 
        success: false, 
        error: 'Tecnologia não encontrada' 
      });
    }

    const examples = {};

    tech.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.example && item.itemId) {
          examples[item.itemId] = {
            id: item.example.id,
            title: item.example.title,
            description: item.example.description,
            code: item.example.code,
            explanation: item.example.explanation,
            itemId: item.example.id, 
            categoryId: category.id
          };
        }
      });
    });

    console.log('Exemplos sendo enviados:', examples);
    res.json({ success: true, data: examples });
  } catch (error) {
    handleError(res, error, 'Erro ao buscar exemplos');
  }
});

// Outras rotas da API...
app.post('/api/categories', async (req, res) => {
  try {
    const { category, technologyId } = req.body;

    if (!category?.trim() || !technologyId?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Nome da categoria e ID da tecnologia são obrigatórios'
      });
    }

    const technology = await prisma.technology.findUnique({
      where: { name: technologyId.trim() }
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        error: 'Tecnologia não encontrada'
      });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: category.trim(),
        technologyId: technology.id
      }
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        error: 'Já existe uma categoria com este nome para esta tecnologia'
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: category.trim(),
        technologyId: technology.id
      }
    });

    res.status(201).json({
      success: true,
      data: newCategory
    });
  } catch (error) {
    handleError(res, error, 'Erro ao criar categoria');
  }
});

// POST /api/items - Criar novo tópico
app.post('/api/items', async (req, res) => {
  try {
    const { categoryId, title } = req.body;

    // Validação mais robusta
    if (!categoryId?.trim() || !title?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'categoryId e title são obrigatórios e não podem estar vazios'
      });
    }

    console.log('Recebendo requisição para criar tópico:', req.body);

    // Verificar se a categoria existe e obter o technologyId
    const category = await prisma.category.findUnique({
      where: { id: categoryId.trim() },
      include: { technology: true }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Categoria não encontrada'
      });
    }
    
    const technologyId = category.technologyId;

    // Verificar se já existe um item com este título na categoria
    const existingItem = await prisma.item.findFirst({
      where: {
        title: title.trim(),
        categoryId: categoryId.trim()
      }
    });

    if (existingItem) {
      return res.status(409).json({
        success: false,
        error: 'Já existe um tópico com este título nesta categoria'
      });
    }

    // Gerar um novo id para o item, que será usado também em itemId
    const { v4: uuidv4 } = await import('uuid');
    const newId = uuidv4();

    // Criar o item com os campos necessários
    const item = await prisma.item.create({
      data: {
        id: newId,
        itemId: newId,
        title: title.trim(),
        categoryId: categoryId.trim()
      }
    });

    // Criar um exemplo vazio associado, passando também technologyId
    const example = await prisma.example.create({
      data: {
        id: uuidv4(),
        title: title.trim(),
        description: '',
        code: '',
        explanation: '',
        itemId: item.itemId,
        technologyId
      }
    });

    console.log('Tópico criado com sucesso:', { item, example });
    res.status(201).json({
      success: true,
      data: {
        ...item,
        example
      }
    });

  } catch (error) {
    handleError(res, error, 'Erro ao criar tópico');
  }
});

// DELETE /api/items/:id - Deletar tópico
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'ID do item é obrigatório'
      });
    }

    console.log('Recebendo requisição para deletar tópico:', id);

    // Verificar se o item existe
    const item = await prisma.item.findUnique({
      where: { id: id.trim() }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Tópico não encontrado'
      });
    }

    // Deletar exemplos associados primeiro (devido às relações de FK)
    await prisma.example.deleteMany({
      where: { itemId: item.itemId }
    });

    // Deletar o item
    await prisma.item.delete({
      where: { id: id.trim() }
    });

    console.log('Tópico deletado com sucesso:', id);
    res.json({
      success: true,
      message: 'Tópico deletado com sucesso'
    });

  } catch (error) {
    handleError(res, error, 'Erro ao deletar tópico');
  }
});

// Rota de teste
// DELETE /api/categories/:categoryId - Deletar categoria
app.delete('/api/categories/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'categoryId é obrigatório'
      });
    }

    console.log('Recebendo requisição para deletar categoria:', categoryId);

    // Verificar se a categoria existe
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId.trim() },
      include: {
        items: {
          include: {
            example: true
          }
        }
      }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: 'Categoria não encontrada'
      });
    }

    // Deletar exemplos associados aos itens da categoria
    for (const item of existingCategory.items) {
      if (item.example) {
        await prisma.example.delete({
          where: { id: item.example.id }
        });
      }
    }

    // Deletar itens da categoria
    await prisma.item.deleteMany({
      where: { categoryId: categoryId.trim() }
    });

    // Deletar a categoria
    await prisma.category.delete({
      where: { id: categoryId.trim() }
    });

    console.log('Categoria deletada com sucesso:', categoryId);
    return res.status(200).json({
      success: true,
      message: 'Categoria deletada com sucesso'
    });

  } catch (error) {
    handleError(res, error, 'Erro ao deletar categoria');
  }
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API funcionando!', 
    timestamp: new Date().toISOString(),
    prisma: 'conectado'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${PORT}`);
  console.log(`📊 Teste da API: http://localhost:${PORT}/api/test`);
  console.log(`🔧 Tecnologias: http://localhost:${PORT}/api/technologies`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Fechando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

// POST /api/save-code - Salvar código de exemplo
app.post('/api/save-code', async (req, res) => {
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
  } catch (error) {
    handleError(res, error, 'Erro ao salvar código');
  }
});

// POST /api/save-explanation - Salvar explicação de exemplo
app.post('/api/save-explanation', async (req, res) => {
  try {
    const { id, explanation } = req.body;
    
    if (!id || explanation === undefined) {
      return res.status(400).json({
        success: false,
        error: 'ID e explicação são obrigatórios'
      });
    }

    console.log('Request save-explanation:', { id, explanationLength: explanation?.length });

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

    // Atualizar a explicação utilizando "id"
    const updatedExample = await prisma.example.update({
      where: { id },
      data: { explanation }
    });

    return res.json({
      success: true,
      data: updatedExample
    });

  } catch (error) {
    handleError(res, error, 'Erro ao salvar explicação');
  }
});
