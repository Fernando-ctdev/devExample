import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import explanationRoutes from './routes/explanationRoutes';

config();

const app = express();
const PORT = 3000; // Força a porta 3000 para o backend

// Configurar CORS corretamente
app.use(cors({
  origin: ['http://localhost:5173'], // Permite apenas o frontend na 5173
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger middleware melhorado
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

app.use('/api', explanationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Erro interno do servidor',
    details: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
