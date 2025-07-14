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
    
    // Otimização: Buscar apenas os dados necessários com select específicos
    const technologies = await prisma.technology.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        color: true,
        hoverColor: true,
        logo: true,
        alt: true,
        padding: true,
        createdAt: true,
        updatedAt: true,
        categories: {
          select: {
            id: true,
            name: true,
            items: {
              select: {
                id: true,
                itemId: true,
                title: true,
                example: {
                  select: {
                    id: true,
                    title: true,
                    description: true,
                    code: true,
                    explanation: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' }
            }
          },
          orderBy: { createdAt: 'desc' }
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

    // Otimização: Buscar apenas os dados necessários
    const technology = await prisma.technology.findUnique({
      where: { name: tech.trim() },
      select: {
        id: true,
        name: true,
        categories: {
          select: {
            id: true,
            name: true,
            items: {
              select: {
                itemId: true,
                title: true
              },
              orderBy: { createdAt: 'desc' }
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

    // Otimização: Buscar apenas os dados necessários
    const tech = await prisma.technology.findUnique({
      where: { name: techParam.trim() },
      select: {
        id: true,
        name: true,
        categories: {
          select: {
            id: true,
            name: true,
            items: {
              select: {
                itemId: true,
                title: true,
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

// ====================== ROTAS DE CERTIFICADOS ======================

// GET /api/certificates - Buscar todos os certificados
app.get('/api/certificates', async (req, res) => {
  try {
    // Otimização: Buscar apenas os dados necessários
    const certificates = await prisma.certificate.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        issuer: true,
        issueDate: true,
        expiryDate: true,
        credentialId: true,
        link: true,
        imageUrl: true,
        skills: true,
        technologyId: true,
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      },
      orderBy: {
        issueDate: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: certificates
    });
  } catch (error) {
    handleError(res, error, 'Erro ao buscar certificados');
  }
});

// POST /api/certificates - Criar novo certificado
app.post('/api/certificates', async (req, res) => {
  try {
    const {
      title,
      description,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      link,
      imageUrl,
      skills,
      technologyId
    } = req.body;

    // Validações básicas
    if (!title || !issuer || !issueDate || !link) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: title, issuer, issueDate, link'
      });
    }

    const certificate = await prisma.certificate.create({
      data: {
        title,
        description,
        issuer,
        issueDate: new Date(issueDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        link,
        imageUrl,
        skills: skills || [],
        technologyId: technologyId || null
      },
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    handleError(res, error, 'Erro ao criar certificado');
  }
});

// PUT /api/certificates/:id - Atualizar certificado
app.put('/api/certificates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      link,
      imageUrl,
      skills,
      technologyId
    } = req.body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        issuer,
        issueDate: issueDate ? new Date(issueDate) : undefined,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        link,
        imageUrl,
        skills: skills || [],
        technologyId: technologyId || null
      },
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    handleError(res, error, 'Erro ao atualizar certificado');
  }
});

// DELETE /api/certificates/:id - Deletar certificado
app.delete('/api/certificates/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.certificate.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Certificado deletado com sucesso'
    });
  } catch (error) {
    handleError(res, error, 'Erro ao deletar certificado');
  }
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

// GET /api/categories - Buscar categorias por tecnologia
app.get('/api/categories', async (req, res) => {
  try {
    const { technologyId } = req.query;

    if (!technologyId?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'technologyId é obrigatório'
      });
    }

    console.log('Buscando categorias para tecnologia:', technologyId);

    // Verificar se a tecnologia existe
    const technology = await prisma.technology.findUnique({
      where: { id: technologyId.trim() }
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        error: 'Tecnologia não encontrada'
      });
    }

    // Buscar categorias da tecnologia
    const categories = await prisma.category.findMany({
      where: { technologyId: technologyId.trim() },
      orderBy: { createdAt: 'desc' }
    });

    console.log('Categorias encontradas:', categories);
    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    handleError(res, error, 'Erro ao buscar categorias');
  }
});

// GET /api/items - Buscar itens por categoria
app.get('/api/items', async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'categoryId é obrigatório'
      });
    }

    console.log('Buscando itens para categoria:', categoryId);

    // Verificar se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId.trim() }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Categoria não encontrada'
      });
    }

    // Buscar itens da categoria
    const items = await prisma.item.findMany({
      where: { categoryId: categoryId.trim() },
      select: {
        id: true,
        itemId: true,
        title: true,
        categoryId: true
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('Itens encontrados:', items);
    res.json({
      success: true,
      data: items
    });

  } catch (error) {
    handleError(res, error, 'Erro ao buscar itens');
  }
});

// ==========================================
// ROTAS PARA EVENTOS DE ESTUDO
// ==========================================

// GET /api/study-events - Listar eventos de estudo
app.get('/api/study-events', async (req, res) => {
  try {
    const { 
      month,
      year,
      technologyId,
      completed,
      limit = '50',
      offset = '0'
    } = req.query;

    const where = {};

    // Filtrar por mês/ano
    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      where.date = {
        gte: startDate,
        lte: endDate
      };
    }

    // Filtrar por tecnologia
    if (technologyId) {
      where.technologyId = technologyId;
    }

    // Filtrar por status de conclusão
    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    const events = await prisma.studyEvent.findMany({
      where,
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        },
        item: {
          select: {
            id: true,
            title: true
          }
        },
        studySessions: {
          select: {
            id: true,
            actualStudyTime: true,
            completed: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    handleError(res, error, 'Erro ao buscar eventos de estudo');
  }
});

// POST /api/study-events - Criar evento de estudo
app.post('/api/study-events', async (req, res) => {
  try {
    const { title, description, type, date, completed, technologyId, categoryId, itemId } = req.body;

    if (!title || !date) {
      return res.status(400).json({ 
        success: false,
        error: 'Título e data são obrigatórios' 
      });
    }

    const event = await prisma.studyEvent.create({
      data: {
        title: title.trim(),
        description: description?.trim(),
        type: type || 'STUDY',
        date: new Date(date),
        completed: completed || false,
        technologyId: technologyId || null,
        categoryId: categoryId || null,
        itemId: itemId || null,
      },
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        },
        item: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    handleError(res, error, 'Erro ao criar evento de estudo');
  }
});

// PUT /api/study-events/:id - Atualizar evento de estudo
app.put('/api/study-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, date, completed, technologyId, categoryId, itemId } = req.body;

    if (!id) {
      return res.status(400).json({ 
        success: false,
        error: 'ID do evento é obrigatório' 
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (type !== undefined) updateData.type = type;
    if (date !== undefined) updateData.date = new Date(date);
    if (completed !== undefined) updateData.completed = completed;
    if (technologyId !== undefined) updateData.technologyId = technologyId || null;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (itemId !== undefined) updateData.itemId = itemId || null;

    const event = await prisma.studyEvent.update({
      where: { id },
      data: updateData,
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        },
        item: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    handleError(res, error, 'Erro ao atualizar evento de estudo');
  }
});

// DELETE /api/study-events/:id - Deletar evento de estudo
app.delete('/api/study-events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        success: false,
        error: 'ID do evento é obrigatório' 
      });
    }

    await prisma.studyEvent.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Evento de estudo deletado com sucesso'
    });
  } catch (error) {
    handleError(res, error, 'Erro ao deletar evento de estudo');
  }
});

// ==========================================
// ROTAS PARA SESSÕES DE ESTUDO
// ==========================================

// GET /api/study-sessions - Listar sessões de estudo
app.get('/api/study-sessions', async (req, res) => {
  try {
    const { 
      eventId,
      startDate,
      endDate,
      completed,
      limit = '50',
      offset = '0'
    } = req.query;

    const where = {};

    if (eventId) {
      where.eventId = eventId;
    }

    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    const sessions = await prisma.studySession.findMany({
      where,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            technology: {
              select: {
                id: true,
                name: true,
                title: true
              }
            },
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    handleError(res, error, 'Erro ao buscar sessões de estudo');
  }
});

// POST /api/study-sessions - Criar sessão de estudo
app.post('/api/study-sessions', async (req, res) => {
  try {
    const { eventId, studyDuration, breakDuration, startTime } = req.body;

    if (!eventId || !studyDuration || !breakDuration) {
      return res.status(400).json({ 
        success: false,
        error: 'EventId, studyDuration e breakDuration são obrigatórios' 
      });
    }

    // Verificar se o evento existe
    const event = await prisma.studyEvent.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ 
        success: false,
        error: 'Evento não encontrado' 
      });
    }

    const session = await prisma.studySession.create({
      data: {
        eventId,
        startTime: startTime ? new Date(startTime) : new Date(),
        studyDuration,
        breakDuration,
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            type: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    handleError(res, error, 'Erro ao criar sessão de estudo');
  }
});

// PUT /api/study-sessions/:id - Atualizar sessão de estudo
app.put('/api/study-sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      endTime, 
      actualStudyTime, 
      actualBreakTime, 
      completed, 
      paused, 
      pausedAt, 
      resumedAt, 
      totalPauseTime 
    } = req.body;

    if (!id) {
      return res.status(400).json({ 
        success: false,
        error: 'ID da sessão é obrigatório' 
      });
    }

    const updateData = {};
    if (endTime !== undefined) updateData.endTime = new Date(endTime);
    if (actualStudyTime !== undefined) updateData.actualStudyTime = actualStudyTime;
    if (actualBreakTime !== undefined) updateData.actualBreakTime = actualBreakTime;
    if (completed !== undefined) updateData.completed = completed;
    if (paused !== undefined) updateData.paused = paused;
    if (pausedAt !== undefined) updateData.pausedAt = new Date(pausedAt);
    if (resumedAt !== undefined) updateData.resumedAt = new Date(resumedAt);
    if (totalPauseTime !== undefined) updateData.totalPauseTime = totalPauseTime;

    // Calcular totalStudyTime automaticamente se actualStudyTime foi fornecido
    if (actualStudyTime !== undefined) {
      // Se temos o tempo real de estudo em segundos, usamos ele diretamente como totalStudyTime
      updateData.totalStudyTime = actualStudyTime;
    }

    const session = await prisma.studySession.update({
      where: { id },
      data: updateData,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            type: true
          }
        }
      }
    });

    // Se a sessão foi concluída, atualizar as estatísticas
    if (completed && updateData.totalStudyTime) {
      await updateStudyStatistics(session.eventId, updateData.totalStudyTime);
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    handleError(res, error, 'Erro ao atualizar sessão de estudo');
  }
});

// DELETE /api/study-sessions/:id - Deletar sessão de estudo
app.delete('/api/study-sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        success: false,
        error: 'ID da sessão é obrigatório' 
      });
    }

    await prisma.studySession.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Sessão de estudo deletada com sucesso'
    });
  } catch (error) {
    handleError(res, error, 'Erro ao deletar sessão de estudo');
  }
});

// ==========================================
// ROTAS PARA ESTATÍSTICAS DE ESTUDO
// ==========================================

// GET /api/study-statistics - Obter estatísticas de estudo
app.get('/api/study-statistics', async (req, res) => {
  try {
    const { 
      type = 'dashboard',
      startDate,
      endDate,
      technologyId,
      categoryId,
      limit = '50',
      offset = '0'
    } = req.query;

    if (type === 'dashboard') {
      return await getDashboardStatistics(req, res);
    } else {
      return await getDetailedStatistics(req, res);
    }
  } catch (error) {
    handleError(res, error, 'Erro ao buscar estatísticas de estudo');
  }
});

// Função auxiliar para estatísticas do dashboard
async function getDashboardStatistics(req, res) {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      error: 'startDate e endDate são obrigatórios'
    });
  }

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  endDateTime.setHours(23, 59, 59, 999);

  console.log('📊 getDashboardStatistics - Período solicitado:', {
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString()
  });

  // Otimização: Executar consultas em paralelo e buscar apenas dados necessários
  const [studySessions, uniqueEventsCount, completedEventsData, techSessionsData] = await Promise.all([
    // Sessões de estudo no período
    prisma.studySession.findMany({
      where: {
        startTime: {
          gte: startDateTime,
          lte: endDateTime
        }
      },
      select: {
        totalStudyTime: true,
        startTime: true,
        completed: true,
        eventId: true
      }
    }),

    // Contar eventos únicos diretamente no banco
    prisma.studySession.groupBy({
      by: ['eventId'],
      where: {
        startTime: {
          gte: startDateTime,
          lte: endDateTime
        }
      },
      _count: {
        eventId: true
      }
    }),

    // Eventos concluídos (verificando o campo completed da tabela study_event)
    prisma.studyEvent.findMany({
      where: {
        date: {
          gte: startDateTime,
          lte: endDateTime
        },
        completed: true
      },
      select: {
        id: true
      }
    }),

    // Estatísticas por tecnologia (otimizado)
    prisma.studySession.findMany({
      where: {
        startTime: {
          gte: startDateTime,
          lte: endDateTime
        },
        event: {
          technologyId: { not: null }
        }
      },
      select: {
        totalStudyTime: true,
        event: {
          select: {
            technology: {
              select: {
                id: true,
                name: true,
                title: true
              }
            }
          }
        }
      }
    })
  ]);

  const totalSessions = studySessions.length;
  const totalStudyTimeSeconds = studySessions.reduce((sum, session) => {
    return sum + (session.totalStudyTime || 0);
  }, 0);
  const totalStudyTimeMinutes = Math.floor(totalStudyTimeSeconds / 60);

  console.log('📊 Totais calculados:', {
    totalSessions,
    totalStudyTimeSeconds,
    totalStudyTimeMinutes
  });

  const totalEvents = uniqueEventsCount.length;
  const completedEvents = completedEventsData.length;

  // Progresso do período solicitado (otimizado com uma única consulta)
  const weeklyProgressData = await prisma.$queryRaw`
    SELECT 
      DATE("startTime") as date,
      COUNT(*) as sessions_count,
      COALESCE(SUM("totalStudyTime"), 0) as total_time
    FROM "study_session" 
    WHERE "startTime" >= ${startDateTime} AND "startTime" <= ${endDateTime}
    GROUP BY DATE("startTime")
    ORDER BY DATE("startTime")
  `;

  const weeklyProgress = [];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const currentDate = new Date(startDateTime);
  const finalDate = new Date(endDateTime);
  
  while (currentDate <= finalDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const dayData = weeklyProgressData.find(d => d.date.toISOString().split('T')[0] === dateKey);
    
    weeklyProgress.push({
      day: dayNames[currentDate.getDay()],
      horas: dayData ? Number(dayData.total_time) / 3600 : 0,
      estudos: dayData ? Number(dayData.sessions_count) : 0
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Estatísticas por tecnologia (processamento otimizado)
  const techStatsMap = new Map();
  techSessionsData.forEach(session => {
    const tech = session.event?.technology;
    if (tech && session.totalStudyTime) {
      const existing = techStatsMap.get(tech.id) || { name: tech.title || tech.name, totalTime: 0 };
      existing.totalTime += session.totalStudyTime;
      techStatsMap.set(tech.id, existing);
    }
  });

  const technologiesData = Array.from(techStatsMap.values())
    .sort((a, b) => b.totalTime - a.totalTime)
    .slice(0, 6)
    .map(tech => ({
      name: tech.name,
      value: Math.round((tech.totalTime / 3600) * 10) / 10
    }));

  // Atividade mensal (otimizada com uma única consulta)
  const monthlyActivityData = await prisma.$queryRaw`
    SELECT 
      DATE("startTime") as date,
      COUNT(*) as session_count
    FROM "study_session" 
    WHERE "startTime" >= ${startDateTime} AND "startTime" <= ${endDateTime}
    GROUP BY DATE("startTime")
  `;

  const monthlyActivity = monthlyActivityData.map(row => {
    const date = new Date(row.date);
    return {
      date: row.date.toISOString().split('T')[0],
      count: Math.min(Number(row.session_count), 4),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  });

  // Calcular sequência atual (otimizada)
  const streakData = await prisma.$queryRaw`
    SELECT DISTINCT DATE("startTime") as study_date
    FROM "study_session" 
    WHERE "startTime" >= ${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
    ORDER BY study_date DESC
  `;

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (const row of streakData) {
    const studyDate = new Date(row.study_date);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - currentStreak);
    
    if (studyDate.toDateString() === expectedDate.toDateString()) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calcular metas do período
  let totalGoals = 0;
  let completedGoals = 0;

  // Função para obter semana do ano (mesma lógica do frontend)
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return {
      year: d.getFullYear(),
      week: 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    };
  };

  // Para debug, vou calcular a semana do dia atual também
  const currentDay = new Date();
  const currentWeek = getWeekNumber(currentDay);
  console.log('📅 Comparação de semanas:', {
    today: currentDay.toISOString(),
    currentWeekCalc: currentWeek,
    dashboardPeriodStart: startDateTime.toISOString(),
    dashboardWeekCalc: getWeekNumber(startDateTime)
  });

  // Se for período semanal, buscar metas da semana específica
  if (req.query.type === 'dashboard') {
    const daysDiff = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
    
    console.log('🗓️ Analisando período:', {
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      daysDiff,
      isWeeklyPeriod: daysDiff <= 7
    });
    
    try {
      if (daysDiff <= 7) { 
        // Para períodos semanais, usar a semana atual
        const { year, week } = getWeekNumber(new Date());
        
        console.log('� Buscando metas semanais com:', { weekYear: year, weekNumber: week });
        
        const weeklyGoals = await prisma.weeklyGoal.findMany({
          where: {
            weekYear: year,
            weekNumber: week,
          }
        });

        totalGoals = weeklyGoals.length;
        completedGoals = weeklyGoals.filter(goal => goal.completed).length;
        
        console.log('🎯 Metas semanais encontradas:', {
          year,
          week,
          totalGoals,
          completedGoals
        });
      } else {
        // Para períodos maiores (mês, ano), buscar todas as semanas dentro do período
        console.log('🔍 Buscando metas para período maior que uma semana');
        
        // Calcular todas as semanas que estão dentro do período
        const weeksInPeriod = [];
        const currentDate = new Date(startDateTime);
        
        while (currentDate <= endDateTime) {
          const weekInfo = getWeekNumber(currentDate);
          const weekKey = `${weekInfo.year}-${weekInfo.week}`;
          
          if (!weeksInPeriod.find(w => `${w.year}-${w.week}` === weekKey)) {
            weeksInPeriod.push(weekInfo);
          }
          
          currentDate.setDate(currentDate.getDate() + 7); // Avançar uma semana
        }
        
        console.log('� Semanas no período:', weeksInPeriod);
        
        // Buscar metas de todas as semanas do período
        const allGoalsInPeriod = await prisma.weeklyGoal.findMany({
          where: {
            OR: weeksInPeriod.map(week => ({
              weekYear: week.year,
              weekNumber: week.week
            }))
          }
        });

        totalGoals = allGoalsInPeriod.length;
        completedGoals = allGoalsInPeriod.filter(goal => goal.completed).length;
        
        console.log('🎯 Metas do período encontradas:', {
          periodsSearched: weeksInPeriod.length,
          totalGoals,
          completedGoals,
          goals: allGoalsInPeriod.map(g => ({ 
            title: g.title, 
            completed: g.completed, 
            weekYear: g.weekYear, 
            weekNumber: g.weekNumber 
          }))
        });
      }
    } catch (error) {
      console.warn('Erro ao buscar metas (tabela pode não existir ainda):', error.message);
      // Se a tabela não existir ainda, usar valores padrão
      totalGoals = 0;
      completedGoals = 0;
    }
  }

  const response = {
    totalStudyTime: totalStudyTimeMinutes,
    totalSessions: totalSessions,
    totalEvents: totalEvents,
    completedEvents: completedEvents,
    currentStreak: currentStreak,
    totalGoals: totalGoals,
    completedGoals: completedGoals,
    weeklyProgress: weeklyProgress,
    technologiesData: technologiesData,
    monthlyActivity: monthlyActivity
  };

  res.json({
    success: true,
    data: response
  });
}

// Função auxiliar para estatísticas detalhadas
async function getDetailedStatistics(req, res) {
  const { 
    startDate,
    endDate,
    technologyId,
    categoryId,
    limit = '50',
    offset = '0'
  } = req.query;

  const where = {};

  if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  if (technologyId) {
    where.technologyId = technologyId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const statistics = await prisma.studyStatistics.findMany({
    where,
    include: {
      technology: {
        select: {
          id: true,
          name: true,
          title: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: parseInt(limit),
    skip: parseInt(offset)
  });

  res.json({
    success: true,
    data: statistics
  });
}

// Função auxiliar para atualizar estatísticas
async function updateStudyStatistics(eventId, studyTime) {
  // Buscar o evento para obter as informações de tecnologia e categoria
  const event = await prisma.studyEvent.findUnique({
    where: { id: eventId },
    include: {
      technology: true,
      category: true
    }
  });

  if (!event) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Atualizar estatísticas gerais do dia
  await prisma.studyStatistics.upsert({
    where: {
      date_technologyId_categoryId: {
        date: today,
        technologyId: null,
        categoryId: null
      }
    },
    update: {
      totalStudyTime: {
        increment: studyTime
      },
      totalSessions: {
        increment: 1
      }
    },
    create: {
      date: today,
      totalStudyTime: studyTime,
      totalSessions: 1,
      completedEvents: 0
    }
  });

  // Atualizar estatísticas por tecnologia
  if (event.technologyId) {
    await prisma.studyStatistics.upsert({
      where: {
        date_technologyId_categoryId: {
          date: today,
          technologyId: event.technologyId,
          categoryId: null
        }
      },
      update: {
        totalStudyTime: {
          increment: studyTime
        },
        totalSessions: {
          increment: 1
        }
      },
      create: {
        date: today,
        technologyId: event.technologyId,
        totalStudyTime: studyTime,
        totalSessions: 1,
        completedEvents: 0
      }
    });
  }

  // Atualizar estatísticas por categoria
  if (event.categoryId) {
    await prisma.studyStatistics.upsert({
      where: {
        date_technologyId_categoryId: {
          date: today,
          technologyId: event.technologyId,
          categoryId: event.categoryId
        }
      },
      update: {
        totalStudyTime: {
          increment: studyTime
        },
        totalSessions: {
          increment: 1
        }
      },
      create: {
        date: today,
        technologyId: event.technologyId,
        categoryId: event.categoryId,
        totalStudyTime: studyTime,
        totalSessions: 1,
        completedEvents: 0
      }
    });
  }
}

// ===== WEEKLY GOALS API =====

// GET /api/weekly-goals - Obter metas de uma semana específica
app.get('/api/weekly-goals', async (req, res) => {
  try {
    const { weekYear, weekNumber } = req.query;

    if (!weekYear || !weekNumber) {
      return res.status(400).json({
        success: false,
        error: 'weekYear e weekNumber são obrigatórios'
      });
    }

    const goals = await prisma.weeklyGoal.findMany({
      where: {
        weekYear: parseInt(weekYear),
        weekNumber: parseInt(weekNumber),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.error('Erro ao buscar metas semanais:', error);
    handleError(res, error, 'Erro ao buscar metas semanais');
  }
});

// POST /api/weekly-goals - Criar nova meta semanal
app.post('/api/weekly-goals', async (req, res) => {
  try {
    const { title, description, weekYear, weekNumber } = req.body;

    if (!title || !weekYear || !weekNumber) {
      return res.status(400).json({
        success: false,
        error: 'title, weekYear e weekNumber são obrigatórios'
      });
    }

    const goal = await prisma.weeklyGoal.create({
      data: {
        title,
        description,
        weekYear: parseInt(weekYear),
        weekNumber: parseInt(weekNumber),
      },
    });

    res.json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error('Erro ao criar meta semanal:', error);
    handleError(res, error, 'Erro ao criar meta semanal');
  }
});

// PUT /api/weekly-goals - Atualizar meta semanal
app.put('/api/weekly-goals', async (req, res) => {
  try {
    const { id, title, description, completed } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) {
      updateData.completed = completed;
      updateData.completedAt = completed ? new Date() : null;
    }

    const goal = await prisma.weeklyGoal.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error('Erro ao atualizar meta semanal:', error);
    handleError(res, error, 'Erro ao atualizar meta semanal');
  }
});

// DELETE /api/weekly-goals - Remover meta semanal
app.delete('/api/weekly-goals', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    await prisma.weeklyGoal.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Meta removida com sucesso',
    });
  } catch (error) {
    console.error('Erro ao remover meta semanal:', error);
    handleError(res, error, 'Erro ao remover meta semanal');
  }
});
