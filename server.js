import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Função helper para importar dinamicamente os handlers TypeScript
const importHandler = async (path) => {
  try {
    const module = await import(path);
    return module.default;
  } catch (error) {
    console.error(`Erro ao importar ${path}:`, error);
    throw error;
  }
};

// Middleware para simular VercelRequest/Response
const createApiHandler = (handlerPath) => async (req, res) => {
  try {
    const handler = await importHandler(handlerPath);
    
    // Simular VercelRequest
    const vercelReq = {
      method: req.method,
      body: req.body,
      query: { ...req.query, ...req.params },
      headers: req.headers
    };

    // Simular VercelResponse com métodos encadeados
    let statusCode = 200;
    const vercelRes = {
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => {
            res.status(statusCode).json(data);
            return vercelRes;
          },
          send: (data) => {
            res.status(statusCode).send(data);
            return vercelRes;
          }
        };
      },
      json: (data) => {
        res.status(statusCode).json(data);
        return vercelRes;
      },
      send: (data) => {
        res.status(statusCode).send(data);
        return vercelRes;
      }
    };

    await handler(vercelReq, vercelRes);
  } catch (error) {
    console.error('API Handler error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
};

// Rotas da API
app.get('/api/technologies', createApiHandler('./api/technologies.ts'));
app.post('/api/technologies', createApiHandler('./api/technologies.ts'));
app.post('/api/categories', createApiHandler('./api/categories.ts'));
app.post('/api/items', createApiHandler('./api/items.ts'));
app.post('/api/save-code', createApiHandler('./api/save-code.ts'));
app.post('/api/save-explanation', createApiHandler('./api/save-explanation.ts'));
app.get('/api/topics/:tech', createApiHandler('./api/topics/[tech].ts'));
app.get('/api/examples/:tech', createApiHandler('./api/examples/[tech].ts'));

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${PORT}`);
  console.log(`📊 Teste: http://localhost:${PORT}/api/test`);
});

export default app;