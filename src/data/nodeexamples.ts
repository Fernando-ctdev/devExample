export interface Example {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export interface ExampleCategory {
  category: string;
  items: {
    id: string;
    title: string;
  }[];
}

export const topics: ExampleCategory[] = [
  {
    category: "Fundamentos Node.js",
    items: [
      { id: "modulosNode", title: "Módulos e require/import" },
      { id: "npm", title: "NPM e Pacotes" },
      { id: "processEnv", title: "Variáveis de Ambiente" },
      { id: "global", title: "Objeto Global" },
      { id: "buffer", title: "Buffer e Streams" },
    ],
  },
  {
    category: "Sistema de Arquivos",
    items: [
      { id: "fsSync", title: "Operações Síncronas" },
      { id: "fsAsync", title: "Operações Assíncronas" },
      { id: "path", title: "Manipulação path" },
      { id: "streams", title: "Streams de Arquivos" },
      { id: "watchFiles", title: "Monitoramento de Arquivos" },
    ],
  },
  {
    category: "Rede e HTTP",
    items: [
      { id: "http", title: "Servidor HTTP Básico" },
      { id: "express", title: "Express.js Framework" },
      { id: "middleware", title: "Middlewares" },
      { id: "rotas", title: "Roteamento" },
      { id: "staticFiles", title: "Arquivos Estáticos" },
      { id: "templating", title: "Template Engines" },
    ],
  },
  {
    category: "Banco de Dados",
    items: [
      { id: "postgre", title: "PostgreSQL" },
      { id: "mongodb", title: "MongoDB com Mongoose" },
      { id: "sql", title: "SQL com Sequelize" },
      { id: "redis", title: "Cache com Redis" },
      { id: "migrations", title: "Migrations e Seeds" },
    ],
  },
  {
    category: "Segurança e Autenticação",
    items: [
      { id: "jwt", title: "JWT (JSON Web Tokens)" },
      { id: "bcrypt", title: "Hashing de Senhas" },
      { id: "cors", title: "CORS" },
      { id: "helmet", title: "Helmet e Headers" },
      { id: "validation", title: "Validação de Dados" },
    ],
  },
  {
    category: "Testes e Debug",
    items: [
      { id: "jest", title: "Testes com Jest" },
      { id: "supertest", title: "Testes de API" },
      { id: "debug", title: "Debugging" },
      { id: "logging", title: "Logging com Winston" },
    ],
  },
  {
    category: "Performance e Deploy",
    items: [
      { id: "cluster", title: "Cluster e PM2" },
      { id: "docker", title: "Containerização com Docker" },
      { id: "cache", title: "Estratégias de Cache" },
      { id: "cicd", title: "CI/CD" },
      { id: "monitoring", title: "Monitoramento" },
    ],
  },
  {
    category: "Recursos Avançados",
    items: [
      { id: "events", title: "Event Emitter" },
      { id: "workers", title: "Worker Threads" },
      { id: "websockets", title: "WebSockets" },
      { id: "graphql", title: "GraphQL" },
      { id: "microservices", title: "Microserviços" },
    ],
  },
  {
    category: "Framework NestJS",
    items: [
      { id: "nestjsintro", title: "Introdução ao NestJS" },
      { id: "nestjsestrutura", title: "Estrutura de Projeto" },
      { id: "nestjsmodulos", title: "Módulos no NestJS" },
      { id: "nestjsrotas", title: "Rotas e Controladores" },
      { id: "nestjsparametros", title: "Parâmetros de Rota" },
      { id: "nestjsrespostas", title: "Resposta de Requisição" },
      { id: "nestjsservicos", title: "Serviços no NestJS" },
      { id: "nestjsinjecao", title: "Injeção de Dependências" },
      { id: "nestjsmiddlewares", title: "Middlewares no NestJS" },
      { id: "nestjspipes", title: "Pipes e Validação" },
      { id: "nestjsguards", title: "Guards e Segurança" },
      { id: "nestjsinterceptors", title: "Interceptors no NestJS" },
    ],
  },
];

export const examplesnode: Record<string, Example> = {
  modulosNode: {
    title: "Módulos e require/import",
    description: "Como criar e utilizar módulos em Node.js",
    code: `
// Importando módulos built-in
const fs = require('fs');
const path = require('path');

// Módulo ES6 (com package.json type: "module")
import fs from 'fs';
import path from 'path';

// Criando um módulo
// arquivo: matematica.js
const somar = (a, b) => a + b;
const multiplicar = (a, b) => a * b;

module.exports = {
  somar,
  multiplicar
};

// Importando módulo local
const matematica = require('./matematica');
console.log(matematica.somar(2, 3));
// retorno: 5

// Importando apenas funções específicas
const { somar, multiplicar } = require('./matematica');
console.log(multiplicar(4, 2));
// retorno: 8`,
    explanation: `
//Sistemas de Módulos:
- CommonJS (require/module.exports): Sistema padrão do Node.js
- ES Modules (import/export): Sistema moderno (necessita configuração)
- Os módulos permitem organizar código em arquivos separados
- Cada módulo tem seu próprio escopo
- module.exports define o que será exposto
- require() carrega módulos síncronamente`,
  },

  npm: {
    title: "NPM e Gerenciamento de Pacotes",
    description: "Gerenciando dependências com NPM (Node Package Manager)",
    code: `
// Iniciar um projeto
// npm init -y

// package.json básico
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}`,
    explanation: `
//NPM (Node Package Manager):
- Gerencia dependências do projeto
- Executa scripts definidos no package.json
- Controla versões dos pacotes
- Gerencia dependências de desenvolvimento
- Permite publicar pacotes
- Executa auditoria de segurança

// Comandos NPM comuns
npm install express 
- Instala dependência        
npm install -D nodemon 
- Instala dependências de desenvolvimento   
npm run dev  
- Executa script               
npm update   
- Atualiza pacotes               
npm list
- Lista dependências                    
npm audit
- Verifica vulnerabilidades                   `,
  },

  processEnv: {
    title: "Variáveis de Ambiente",
    description: "Trabalhando com variáveis de ambiente no Node.js",
    code: `
// Arquivo .env
PORT=3000
DATABASE_URL=mongodb://localhost/myapp
API_KEY=chave123

// Usando dotenv para carregar variáveis
require('dotenv').config();

// Acessando variáveis de ambiente
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Verificando ambiente
const isProduction = process.env.NODE_ENV === 'production';

// Configuração baseada no ambiente
if (isProduction) {
  console.log('Rodando em produção');
} else {
  console.log('Rodando em desenvolvimento');
}

// Argumentos da linha de comando
console.log(process.argv);
// retorno: ['node', 'script.js', 'arg1', 'arg2']`,
    explanation: `
//Variáveis de Ambiente:
- Armazenam configurações sensíveis
- Variam entre ambientes (dev/prod)
- Acessíveis via process.env
- Geralmente definidas em arquivo .env
- Não devem ser versionadas (git)
- Podem ser definidas no sistema operacional`,
  },
  global: {
    title: "Objeto Global",
    description: "Trabalhando com o objeto global no Node.js",
    code: `
// Objeto global no Node.js
console.log(global); // Objeto global do Node.js

// Variáveis e funções globais comuns
console.log(__dirname);  // Diretório do arquivo atual
console.log(__filename); // Caminho completo do arquivo atual
console.log(process.env); // Variáveis de ambiente
console.log(process.argv); // Argumentos da linha de comando

// Definindo variável global
global.config = {
  apiKey: 'abc123',
  baseUrl: 'http://api.exemplo.com'
};

// Acessando variável global de qualquer lugar
console.log(global.config.apiKey);
// ou simplesmente
console.log(config.apiKey);

// Funções de tempo global
setTimeout(() => {
  console.log('Executado após 2 segundos');
}, 2000);

setInterval(() => {
  console.log('Executa a cada 1 segundo');
}, 1000);

// clearTimeout e clearInterval
const timer = setTimeout(() => {}, 1000);
clearTimeout(timer);

const interval = setInterval(() => {}, 1000);
clearInterval(interval);

// Process events
process.on('exit', (code) => {
  console.log('Processo terminando com código:', code);
});

process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
  process.exit(1);
});`,
    explanation: `
//Objeto Global:
- Equivalente ao 'window' do browser
- Disponível em todo o código
- Contém funções e objetos úteis
- Acessível sem importação

//Variáveis Globais:
- __dirname: diretório atual
- __filename: arquivo atual
- process: informações do processo
- require: importação de módulos
- module: módulo atual
- exports: exportações`,
  },

  buffer: {
    title: "Buffer e Streams",
    description: "Manipulação de dados binários em Node.js",
    code: `
// Criando Buffers
const buf1 = Buffer.from('Hello');
// retorno: <Buffer 48 65 6c 6c 6f>

const buf2 = Buffer.alloc(5);
buf2.write('World');
// retorno: <Buffer 57 6f 72 6c 64>

// Convertendo Buffer para String
console.log(buf1.toString());
// retorno: 'Hello'

// Concatenando Buffers
const bufTotal = Buffer.concat([buf1, buf2]);
console.log(bufTotal.toString());
// retorno: 'HelloWorld'

// Streams básicos
const fs = require('fs');

// Stream de leitura
const readStream = fs.createReadStream('arquivo.txt');
readStream.on('data', (chunk) => {
  console.log('Recebido:', chunk);
});

// Stream de escrita
const writeStream = fs.createWriteStream('saida.txt');
writeStream.write('Dados');
writeStream.end();`,
    explanation: `
//Buffer:
- Armazena dados binários
- Útil para manipular arquivos
- Usado em operações de I/O
- Base para Streams

//Streams:
- Processam dados em partes
- Eficientes para grandes arquivos
- Tipos: Readable, Writable, Duplex
- Eventos: data, end, error, finish`,
  },

  fsSync: {
    title: "Operações Síncronas com Sistema de Arquivos",
    description: "Manipulação síncrona de arquivos usando o módulo fs do Node.js",
    code: `
// Importando módulo
const fs = require('fs');

// Leitura de arquivo
const conteudo = fs.readFileSync('arquivo.txt', 'utf8');
console.log(conteudo);
// retorno: conteúdo do arquivo

// Escrita em arquivo
fs.writeFileSync('novo.txt', 'Olá Mundo!');
// cria/sobrescreve arquivo com o conteúdo

// Verificar se arquivo existe
const existe = fs.existsSync('arquivo.txt');
// retorno: true ou false

// Informações do arquivo
const stats = fs.statSync('arquivo.txt');
console.log(stats.size);      // tamanho em bytes
console.log(stats.isFile());  // se é arquivo
console.log(stats.isDirectory()); // se é diretório

// Criar e remover diretório
fs.mkdirSync('novapasta');
fs.rmdirSync('novapasta');

// Listar conteúdo do diretório
const arquivos = fs.readdirSync('.');
console.log(arquivos);
// retorno: array com nomes dos arquivos`,
    explanation: `
//Operações Síncronas:
- Bloqueiam a execução até completar
- Mais simples de entender e debugar
- Ideais para scripts simples
- Não recomendadas para aplicações em produção
- Úteis para configuração inicial
- Manipulam arquivos e diretórios diretamente`,
  },

  fsAsync: {
    title: "Operações Assíncronas com Sistema de Arquivos",
    description: "Manipulação assíncrona de arquivos usando fs/promises",
    code: `
// Importando módulo
const fs = require('fs/promises');

// Leitura assíncrona
async function lerArquivo() {
  try {
    const conteudo = await fs.readFile('arquivo.txt', 'utf8');
    console.log(conteudo);
  } catch (erro) {
    console.error('Erro na leitura:', erro);
  }
}

// Escrita assíncrona
async function escreverArquivo() {
  try {
    await fs.writeFile('arquivo.txt', 'Novo conteúdo');
    console.log('Arquivo escrito com sucesso');
  } catch (erro) {
    console.error('Erro na escrita:', erro);
  }
}

// Copiando arquivo
async function copiarArquivo() {
  try {
    await fs.copyFile('origem.txt', 'destino.txt');
    console.log('Arquivo copiado');
  } catch (erro) {
    console.error('Erro na cópia:', erro);
  }
}

// Movendo/Renomeando arquivo
async function moverArquivo() {
  try {
    await fs.rename('antigo.txt', 'novo.txt');
    console.log('Arquivo movido/renomeado');
  } catch (erro) {
    console.error('Erro ao mover:', erro);
  }
}`,
    explanation: `
//Operações Assíncronas:
- Não bloqueiam a execução
- Usam Promises e async/await
- Melhor performance em produção
- Requerem tratamento de erros
- Permitem operações paralelas
- Ideais para aplicações web`,
  },

  path: {
    title: "Manipulação de Caminhos",
    description: "Trabalhando com caminhos de arquivos usando o módulo path",
    code: `
// Importando módulo
const path = require('path');

// Juntando caminhos
const caminho = path.join('/pasta', 'subpasta', 'arquivo.txt');
console.log(caminho);
// retorno: /pasta/subpasta/arquivo.txt

// Resolvendo caminho absoluto
const absoluto = path.resolve('arquivo.txt');
console.log(absoluto);
// retorno: /caminho/completo/arquivo.txt

// Extraindo informações
const arquivo = 'pasta/arquivo.txt';
console.log(path.dirname(arquivo));  // pasta
console.log(path.basename(arquivo)); // arquivo.txt
console.log(path.extname(arquivo));  // .txt

// Normalizando caminhos
const normalizado = path.normalize('/pasta//sub/./arquivo.txt');
console.log(normalizado);
// retorno: /pasta/sub/arquivo.txt`,
    explanation: `
//Módulo path:
- Manipula caminhos de forma segura
- Funciona em diferentes sistemas operacionais
- Resolve caminhos relativos e absolutos
- Extrai componentes de caminhos
- Normaliza caminhos inconsistentes
- Essencial para portabilidade`,
  },

  streams: {
    title: "Streams de Arquivos",
    description: "Processamento eficiente de arquivos grandes usando streams",
    code: `
const fs = require('fs');

// Stream de leitura
const readStream = fs.createReadStream('grande.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Recebido:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Leitura finalizada');
});

// Stream de escrita
const writeStream = fs.createWriteStream('saida.txt');

writeStream.write('Início\\n');
writeStream.write('Meio\\n');
writeStream.end('Fim');

// Pipe - conectando streams
const arquivoEntrada = fs.createReadStream('entrada.txt');
const arquivoSaida = fs.createWriteStream('copia.txt');

arquivoEntrada.pipe(arquivoSaida);`,
    explanation: `
//Streams:
- Processam dados em partes (chunks)
- Ideais para arquivos grandes
- Consomem menos memória
- Permitem processamento em tempo real
- Podem ser encadeados com pipe()
- Eventos controlam o fluxo de dados`,
  },
  watchFiles: {
    title: "Monitoramento de Arquivos",
    description: "Monitorando alterações em arquivos e diretórios com fs.watch",
    code: `
// Importando módulo
const fs = require('fs');

// Monitorando um arquivo específico
fs.watch('arquivo.txt', (eventType, filename) => {
  console.log('Evento:', eventType);
  console.log('Arquivo:', filename);
  // retorno: Evento: change
  // retorno: Arquivo: arquivo.txt
});

// Monitorando diretório
fs.watch('./pasta', { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(\`\${eventType} detectado em: \${filename}\`);
    // retorno: change detectado em: teste.txt
    // retorno: rename detectado em: novo.txt
  }
});

// Usando FSWatcher para mais controle
const watcher = fs.watch('./pasta');

watcher.on('change', (eventType, filename) => {
  console.log(\`Arquivo \${filename} foi \${eventType}\`);
});

watcher.on('error', (error) => {
  console.error('Erro no monitoramento:', error);
});

// Para parar o monitoramento
// watcher.close();

// Exemplo prático: Auto-reload de configurações
let config = require('./config.json');

fs.watch('./config.json', (eventType) => {
  if (eventType === 'change') {
    // Limpa cache do require
    delete require.cache[require.resolve('./config.json')];
    // Recarrega configuração
    config = require('./config.json');
    console.log('Configuração atualizada');
  }
});`,
    explanation: `
//Monitoramento de Arquivos:
- Detecta mudanças em tempo real
- Eventos: change (modificação) e rename (criação/deleção)
- Opção recursive para subdiretórios
- Útil para hot-reload
- Pode monitorar arquivos ou diretórios
- Importante tratar erros de monitoramento

//Casos de uso comuns:
- Auto-reload de configurações
- Compilação automática
- Logs em tempo real
- Backup automático
- Sincronização de arquivos`,
  },

  http: {
    title: "Servidor HTTP Básico",
    description: "Criando um servidor HTTP básico com o módulo http do Node.js",
    code: `
// Servidor HTTP básico
const http = require('http');

const server = http.createServer((req, res) => {
  // Definindo headers
  res.setHeader('Content-Type', 'application/json');
  
  // Obtendo informações da requisição
  const { method, url } = req;
  
  // Roteamento básico
  if (url === '/api/users' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      users: [
        { id: 1, name: 'João' },
        { id: 2, name: 'Maria' }
      ]
    }));
  } else if (url === '/api/users' && method === 'POST') {
    // Lendo dados do body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const user = JSON.parse(body);
      res.statusCode = 201;
      res.end(JSON.stringify(user));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
});`,
    explanation: `
//Servidor HTTP:
- Módulo http para criar servidor
- Manipula requisições (req) e respostas (res)
- Suporta diferentes métodos HTTP (GET, POST, etc.)
- Permite definir headers e status code
- Processa body de requisições
- Define portas de escuta`,
  },

  express: {
    title: "Express.js Framework",
    description: "Criando APIs com Express, o framework web mais popular do Node.js",
    code: `
const express = require('express');
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Rotas
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' }
  ]);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  // Aqui viria lógica de persistência
  res.status(201).json(user);
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciando servidor
app.listen(3000, () => {
  console.log('Servidor Express rodando na porta 3000');
});`,
    explanation: `
//Express.js:
- Framework web minimalista
- Sistema de middleware
- Roteamento simplificado
- Tratamento de erros
- Suporte a templates
- Integração fácil com middlewares`,
  },

  middleware: {
    title: "Middlewares",
    description: "Utilizando middlewares para processar requisições em Node.js",
    code: `
const express = require('express');
const app = express();

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  // Aqui viria validação do token
  next();
};

// Middleware de validação
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }
  
  next();
};

// Usando middleware em rotas específicas
app.post('/api/users', authMiddleware, validateUser, (req, res) => {
  // Rota protegida e validada
  res.status(201).json(req.body);
});

// Middleware de erro
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Erro interno' });
});`,
    explanation: `
//Middlewares:
- Funções que processam requisições
- Executam em sequência
- Podem modificar req/res
- Controlam fluxo da requisição
- Podem ser globais ou por rota
- Essenciais para autenticação e validação`,
  },

  rotas: {
    title: "Roteamento",
    description: "Sistema de roteamento do Express para organizar endpoints da API",
    code: `
const express = require('express');
const router = express.Router();

// Rotas de usuários
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários' });
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`Usuário \${id}\` });
});

// Rotas de produtos
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  res.json({ message: 'Lista de produtos' });
});

// Usando os routers
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Parâmetros de rota
router.get('/posts/:id/comments/:commentId', (req, res) => {
  const { id, commentId } = req.params;
  res.json({ postId: id, commentId });
});

// Query parameters
router.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});`,
    explanation: `
//Roteamento:
- Organiza endpoints da API
- Agrupa rotas relacionadas
- Suporta parâmetros dinâmicos
- Processa query parameters
- Permite middlewares específicos
- Facilita manutenção do código`,
  },

  staticFiles: {
    title: "Arquivos Estáticos",
    description: "Servindo arquivos estáticos com Express",
    code: `
const express = require('express');
const path = require('path');
const app = express();

// Servindo arquivos da pasta 'public'
app.use(express.static('public'));

// Servindo com caminho virtual
app.use('/assets', express.static('public'));

// Múltiplos diretórios
app.use(express.static('images'));
app.use(express.static('files'));

// Configurações avançadas
app.use('/static', express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1d',
  redirect: false
}));

// Exemplo de estrutura
// public/
//   ├── css/
//   │   └── style.css
//   ├── js/
//   │   └── app.js
//   └── images/
//       └── logo.png

// Acessando arquivos:
// http://localhost:3000/css/style.css
// http://localhost:3000/assets/js/app.js`,
    explanation: `
//Servindo Arquivos Estáticos:
- express.static() serve arquivos diretamente
- Útil para CSS, JavaScript, imagens
- Suporta múltiplos diretórios
- Permite configurar cache e segurança
- Pode usar caminhos virtuais
- Otimiza entrega de conteúdo estático

//Configurações Importantes:
- maxAge: Controla cache no navegador
- etag: Validação de cache
- index: Arquivo padrão do diretório
- dotfiles: Tratamento de arquivos ocultos`,
  },

  templating: {
    title: "Template Engines",
    description: "Usando template engines para gerar HTML dinâmico",
    code: `
const express = require('express');
const app = express();

// Configurando EJS como template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Rota que renderiza template
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Minha App',
    users: ['João', 'Maria', 'Pedro']
  });
});

// views/index.ejs
\`\`\`
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
  <ul>
    <% users.forEach(user => { %>
      <li><%= user %></li>
    <% }); %>
  </ul>
</body>
</html>
\`\`\`

// Partials (reutilização de código)
// views/header.ejs
\`\`\`
<header>
  <h1><%= title %></h1>
  <nav><!-- ... --></nav>
</header>
\`\`\`

// Usando partial
\`\`\`
<%- include('header') %>
<main>
  <!-- conteúdo -->
</main>
\`\`\``,
    explanation: `
//Template Engines:
- Geram HTML dinamicamente
- Permitem lógica no template
- Suportam dados dinâmicos
- Reutilizam código com partials
- Separam lógica da apresentação
- Facilitam manutenção

//Recursos Principais:
- Interpolação de variáveis
- Estruturas de controle
- Includes e partials
- Layouts compartilhados
- Helpers customizados

//EJS vs Outras Engines:
- EJS: Sintaxe próxima ao JavaScript
- Pug: Sintaxe minimalista
- Handlebars: Lógica mais simples
- Nunjucks: Recursos avançados`,
  },
  postgre: {
    title: "PostgreSQL com node-postgres",
    description: "Trabalhando com PostgreSQL em Node.js usando a biblioteca 'pg'",
    code: `
const { Pool } = require('pg');

// Configuração da conexão
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'nome_do_banco',
  password: 'sua_senha',
  port: 5432,
  // Configurações adicionais
  max: 20, // máximo de conexões
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Classe para gerenciar conexões
class DatabaseService {
  // Query simples
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Tempo de execução:', duration, 'ms');
    return res;
  }

  // Transações
  async transacao(callback) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

const db = new DatabaseService();

// Exemplos de uso
async function exemplosSQL() {
  // Criando tabela
  await db.query(\`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      idade INTEGER,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  // Inserindo dados
  const novoUsuario = await db.query(
    'INSERT INTO usuarios (nome, email, idade) VALUES ($1, $2, $3) RETURNING *',
    ['João Silva', 'joao@email.com', 25]
  );

  // Select com WHERE
  const usuarios = await db.query(
    'SELECT * FROM usuarios WHERE idade > $1',
    [18]
  );

  // Join com outra tabela
  const resultado = await db.query(\`
    SELECT u.nome, p.titulo
    FROM usuarios u
    LEFT JOIN posts p ON p.usuario_id = u.id
    WHERE u.id = $1
  \`, [1]);

  // Exemplo de transação
  await db.transacao(async (client) => {
    // Atualiza saldo de duas contas
    await client.query(
      'UPDATE contas SET saldo = saldo - $1 WHERE id = $2',
      [100, 1]
    );
    await client.query(
      'UPDATE contas SET saldo = saldo + $1 WHERE id = $2',
      [100, 2]
    );
  });

  // Query com subselect
  const usuariosAtivos = await db.query(\`
    SELECT u.*, 
           (SELECT COUNT(*) FROM posts p WHERE p.usuario_id = u.id) as total_posts
    FROM usuarios u
    WHERE u.ativo = true
  \`);

  // Ordenação e paginação
  const paginado = await db.query(\`
    SELECT * FROM usuarios
    ORDER BY criado_em DESC
    LIMIT $1 OFFSET $2
  \`, [10, 0]); // 10 registros, primeira página
}`,
    explanation: `
//PostgreSQL com node-postgres:
- Pool de conexões para melhor performance
- Queries parametrizadas previnem SQL injection
- Suporte a transações ACID
- Tipagem forte do PostgreSQL

//Recursos Principais:
- Queries assíncronas com async/await
- Parâmetros nomeados ou posicionais
- Transações automáticas
- Pool de conexões gerenciado
- Logs de performance

//Boas Práticas:
- Use sempre parâmetros ($1, $2, etc)
- Gerencie conexões com pool
- Implemente tratamento de erros
- Use transações quando necessário
- Libere recursos corretamente

//Tipos de Queries:
- CRUD básico
- JOINs e subqueries
- Agregações (GROUP BY)
- Ordenação e paginação
- Full Text Search`,
  },

  mongodb: {
    title: "MongoDB com Mongoose",
    description: "Conectando e manipulando MongoDB usando Mongoose ODM",
    code: `
const mongoose = require('mongoose');

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost/minhaapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definindo Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Criando modelo
const User = mongoose.model('User', userSchema);

// Criando usuário
async function createUser() {
  try {
    const user = await User.create({
      name: 'João Silva',
      email: 'joao@email.com',
      age: 25
    });
    console.log('Usuário criado:', user);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Buscando usuários
async function findUsers() {
  // Encontrar todos
  const users = await User.find();
  
  // Busca com filtros
  const adultos = await User.find({ age: { $gte: 18 } });
  
  // Busca específica
  const joao = await User.findOne({ email: 'joao@email.com' });
}

// Atualizando usuário
async function updateUser(id) {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { age: 26 } },
    { new: true }
  );
}

// Removendo usuário
async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}`,
    explanation: `
//Mongoose:
- ODM (Object Document Mapper) para MongoDB
- Define estrutura com Schemas
- Suporta validações e middlewares
- Gerencia relacionamentos
- Fornece interface intuitiva para queries
- Trabalha com Promises/async-await

//Operações Principais:
- Create: .create() ou new Model()
- Read: .find(), .findOne(), .findById()
- Update: .updateOne(), .findByIdAndUpdate()
- Delete: .deleteOne(), .findByIdAndDelete()`,
  },

  sql: {
    title: "SQL com Sequelize",
    description: "Usando Sequelize ORM para bancos SQL (MySQL, PostgreSQL, etc)",
    code: `
const { Sequelize, DataTypes } = require('sequelize');

// Conectando ao banco
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres' // ou 'mysql', 'mariadb', 'sqlite'
});

// Definindo modelo
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  age: DataTypes.INTEGER
});

// Sincronizando modelo com banco
await User.sync();

// CRUD Operations
async function exemplosCRUD() {
  // Create
  const user = await User.create({
    name: 'Maria',
    email: 'maria@email.com',
    age: 30
  });

  // Read
  const users = await User.findAll({
    where: {
      age: {
        [Op.gte]: 18 // maior ou igual a 18
      }
    }
  });

  // Update
  await User.update(
    { age: 31 },
    { where: { email: 'maria@email.com' }}
  );

  // Delete
  await User.destroy({
    where: { id: 1 }
  });
}`,
    explanation: `
//Sequelize:
- ORM para bancos SQL
- Suporta múltiplos bancos
- Migrations automáticas
- Validações e hooks
- Relacionamentos robustos
- Queries complexas

//Funcionalidades:
- Models definem estrutura
- Operadores para queries
- Transações automáticas
- Eager e Lazy loading
- Timestamps automáticos`,
  },

  redis: {
    title: "Cache com Redis",
    description: "Implementando cache com Redis",
    code: `
const Redis = require('ioredis');
const redis = new Redis();

// Funções de cache básicas
async function exemploCache() {
  // Salvando valor
  await redis.set('chave', 'valor');
  await redis.set('user:1', JSON.stringify({ name: 'João' }));
  
  // Definindo expiração
  await redis.set('token', '123456', 'EX', 3600); // 1 hora
  
  // Obtendo valor
  const valor = await redis.get('chave');
  const user = JSON.parse(await redis.get('user:1'));
  
  // Verificando existência
  const exists = await redis.exists('chave');
  
  // Deletando chave
  await redis.del('chave');
}

// Cache de consulta ao banco
async function getUserWithCache(id) {
  const cacheKey = \`user:\${id}\`;
  
  // Tenta obter do cache
  let userData = await redis.get(cacheKey);
  
  if (userData) {
    return JSON.parse(userData);
  }
  
  // Se não existe no cache, busca no banco
  const user = await User.findById(id);
  
  // Salva no cache
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  
  return user;
}`,
    explanation: `
//Redis:
- Armazenamento chave-valor em memória
- Alta performance
- Estruturas de dados diversas
- Expiração automática
- Pub/Sub para mensagens
- Perfeito para cache

//Casos de Uso:
- Cache de consultas
- Sessões de usuário
- Rate limiting
- Filas de tarefas
- Contadores em tempo real`,
  },

  migrations: {
    title: "Migrations e Seeds",
    description: "Gerenciando estrutura do banco e dados iniciais",
    code: `
// Migration com Sequelize
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};

// Seed para dados iniciais
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@sistema.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};`,
    explanation: `
//Migrations:
- Controle de versão do banco
- Alterações rastreáveis
- Rollback possível
- Execução em equipe
- Histórico de mudanças

//Seeds:
- Dados iniciais do sistema
- Dados para testes
- Ambiente de desenvolvimento
- População de tabelas base
- Dados de exemplo`,
  },

  jwt: {
    title: "JWT (JSON Web Tokens)",
    description: "Implementando autenticação com JSON Web Tokens",
    code: `
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    // Obtém token do header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Verifica token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Login e geração de token
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Verifica usuário no banco
    const user = await User.findOne({ email });
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      secretKey,
      { expiresIn: '24h' }
    );

    // Retorna token e dados do usuário
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
}

// Exemplo de rota protegida
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// Refresh token
function refreshToken(req, res) {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      secretKey,
      { expiresIn: '24h' }
    );
    res.json({ token: newToken });
  } catch {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
}`,
    explanation: `
//JWT (JSON Web Tokens):
- Token seguro para autenticação
- Carrega informações do usuário
- Stateless (não requer armazenamento)
- Pode ser validado independentemente

//Estrutura do Token:
- Header: Algoritmo e tipo
- Payload: Dados do usuário
- Signature: Garante integridade

//Boas Práticas:
- Use variáveis de ambiente para secrets
- Implemente refresh tokens
- Armazene apenas dados necessários
- Configure tempo de expiração
- Use HTTPS sempre`,
  },

  bcrypt: {
    title: "Hashing de Senhas com Bcrypt",
    description: "Implementando hash seguro de senhas usando bcrypt",
    code: `
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

// Classe de serviço para usuários
class UserService {
  // Hash de senha para novo usuário
  async createUser(userData) {
    try {
      // Gera hash da senha
      const hashedPassword = await bcrypt.hash(
        userData.password, 
        SALT_ROUNDS
      );

      // Cria usuário com senha hasheada
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });

      return user;
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }

  // Verificação de senha
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Atualização de senha
  async updatePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica senha atual
    const isValid = await this.verifyPassword(
      oldPassword, 
      user.password
    );

    if (!isValid) {
      throw new Error('Senha atual incorreta');
    }

    // Gera hash da nova senha
    const hashedPassword = await bcrypt.hash(
      newPassword, 
      SALT_ROUNDS
    );

    // Atualiza senha
    user.password = hashedPassword;
    await user.save();

    return true;
  }

  // Reset de senha
  async resetPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email não encontrado');
    }

    // Gera senha temporária
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(
      tempPassword, 
      SALT_ROUNDS
    );

    user.password = hashedPassword;
    await user.save();

    // Aqui enviaria email com senha temporária
    return tempPassword;
  }
}`,
    explanation: `
//Bcrypt:
- Algoritmo específico para senhas
- Salt automático contra rainbow tables
- Função lenta (propositalmente)
- Seguro contra ataques de força bruta

//Características:
- Salt rounds definem complexidade
- Hash único para cada senha
- Processo assíncrono
- Verificação segura

//Boas Práticas:
- Nunca armazene senhas em texto puro
- Use salt rounds apropriados
- Implemente política de senhas
- Ofereça reset seguro
- Evite senhas padrão`,
  },

  cors: {
    title: "CORS (Cross-Origin Resource Sharing)",
    description: "Configurando CORS para segurança de APIs",
    code: `
const cors = require('cors');
const express = require('express');
const app = express();

// Configuração básica
app.use(cors());

// Configuração personalizada
const corsOptions = {
  origin: ['http://localhost:3000', 'https://meuapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
  maxAge: 3600
};

app.use(cors(corsOptions));

// Configuração por rota
app.get('/api/public', cors(), (req, res) => {
  res.json({ message: 'Acesso público' });
});

// CORS dinâmico
const dynamicCors = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  credentials: true
};

app.use(cors(dynamicCors));

// Preflight personalizado
app.options('/api/special', cors(corsOptions));

// Tratando erros de CORS
app.use((err, req, res, next) => {
  if (err.message.includes('CORS')) {
    res.status(403).json({
      error: 'Acesso não permitido para esta origem'
    });
  } else {
    next(err);
  }
});`,
    explanation: `
//CORS:
- Mecanismo de segurança do navegador
- Controla acessos entre origens
- Previne requisições maliciosas
- Essencial para APIs públicas

//Configurações:
- origin: Origens permitidas
- methods: Métodos HTTP
- headers: Headers permitidos
- credentials: Cookies e auth
- preflight: OPTIONS automático

//Cenários de Uso:
- APIs públicas
- Desenvolvimento local
- Múltiplos frontends
- Microsserviços
- APIs com autenticação`,
  },

  helmet: {
    title: "Helmet e Headers de Segurança",
    description: "Protegendo aplicações Express com Helmet",
    code: `
const helmet = require('helmet');
const express = require('express');
const app = express();

// Configuração básica
app.use(helmet());

// Configuração personalizada
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.exemplo.com"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true
}));

// Headers personalizados
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 
    'geolocation=(), camera=(), microphone=()');
  next();
});

// Configuração para SPA
const SPA_CONFIG = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.exemplo.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    }
  }
});

app.use(SPA_CONFIG);`,
    explanation: `
//Helmet:
- Conjuntos de middlewares de segurança
- Configura headers HTTP de proteção
- Previne ataques comuns
- Boas práticas por padrão

//Headers Principais:
- Content-Security-Policy: Controla recursos
- CORS headers: Controle de origem
- HSTS: Força HTTPS
- XSS Protection: Previne XSS
- Frame Options: Previne clickjacking

//Proteções:
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME-type sniffing
- Cross-site injections
- Ataques de navegador`,
  },
  validation: {
    title: "Validação de Dados",
    description: "Implementando validação de dados com Joi e express-validator",
    code: `
// Usando Joi
const Joi = require('joi');

// Schema de validação com Joi
const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nome deve ter no mínimo 3 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres',
      'any.required': 'Nome é obrigatório'
    }),
    
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
    
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .required()
    .messages({
      'string.pattern.base': 'Senha deve conter maiúscula, minúscula, número e caractere especial',
      'string.min': 'Senha deve ter no mínimo 8 caracteres'
    }),
    
  age: Joi.number()
    .integer()
    .min(18)
    .messages({
      'number.min': 'Idade mínima é 18 anos'
    })
});

// Middleware de validação com Joi
const validateUser = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    res.status(400).json({ errors });
  }
};

// Usando express-validator
const { body, validationResult } = require('express-validator');

// Regras de validação
const validateUserRules = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
    
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
    
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage('Senha deve atender aos requisitos mínimos'),
    
  body('age')
    .optional()
    .isInt({ min: 18 })
    .withMessage('Idade mínima é 18 anos'),
    
  // Validação customizada
  body('email').custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
  })
];

// Middleware de verificação de erros
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Exemplo de uso em rota
app.post('/users', 
  validateUserRules,
  checkValidationResult,
  async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Validação de Query Parameters
const validateSearchParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número maior que 0'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser entre 1 e 100'),
    
  query('sort')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Ordenação deve ser asc ou desc')
];`,
    explanation: `
//Validação de Dados:
- Garante integridade dos dados
- Previne dados maliciosos
- Melhora experiência do usuário
- Reduz erros no banco de dados

//Joi:
- Schema-based validation
- Mensagens customizáveis
- Validações complexas
- Conversão de tipos automática

//Express-validator:
- Middleware de validação
- Sanitização de dados
- Validações assíncronas
- Validações customizadas

//Boas Práticas:
- Valide dados na entrada
- Use sanitização
- Personalize mensagens de erro
- Considere validações assíncronas
- Trate campos opcionais`,
  },
  jest: {
    title: "Testes com Jest",
    description: "Implementando testes unitários e de integração com Jest",
    code: `
// userService.js
const UserService = {
  async createUser(data) {
    const user = await User.create(data);
    return user;
  },
  
  async findUserById(id) {
    return await User.findById(id);
  }
};

// userService.test.js
describe('UserService', () => {
  // Configuração antes dos testes
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });

  // Limpeza após cada teste
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Teste unitário
  test('deve criar um novo usuário', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const user = await UserService.createUser(userData);

    expect(user).toHaveProperty('_id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  // Teste com mock
  test('deve lançar erro quando email já existe', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com' });

    await expect(
      UserService.createUser({ email: 'test@example.com' })
    ).rejects.toThrow('Email já existe');
  });

  // Teste com matcher customizado
  expect.extend({
    toBeValidUser(received) {
      const pass = received.name && received.email;
      return {
        pass,
        message: () => 'Usuário deve ter nome e email'
      };
    }
  });

  // Teste assíncrono com matcher customizado
  test('deve retornar usuário válido', async () => {
    const user = await UserService.findUserById(1);
    expect(user).toBeValidUser();
  });
});

// Testando controllers
describe('UserController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  test('deve criar usuário com sucesso', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com'
    };

    await UserController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: req.body.name,
        email: req.body.email
      })
    );
  });
});`,
    explanation: `
Jest:
- Framework de teste completo
- Fácil configuração
- Mocking built-in
- Cobertura de código
- Assertions expressivas

Tipos de Testes:
- Unitários: Funções isoladas
- Integração: Múltiplos componentes
- Mock: Simulação de dependências
- Matchers: Validações específicas

Boas Práticas:
- Use beforeAll/afterAll
- Limpe dados entre testes
- Isole testes unitários
- Mock dependências externas
- Teste casos de erro`,
  },

  supertest: {
    title: "Testes de API com Supertest",
    description: "Testando endpoints HTTP com Supertest",
    code: `
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Teste GET endpoint
  describe('GET /api/users', () => {
    test('deve retornar lista de usuários', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });

    test('deve suportar paginação', async () => {
      const res = await request(app)
        .get('/api/users')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(res.body.users).toHaveLength(10);
      expect(res.body).toHaveProperty('totalPages');
    });
  });

  // Teste POST endpoint
  describe('POST /api/users', () => {
    test('deve criar novo usuário', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const res = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(res.body).toMatchObject({
        name: userData.name,
        email: userData.email
      });
    });

    test('deve validar dados obrigatórios', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({})
        .expect(400);

      expect(res.body.errors).toBeDefined();
    });
  });

  // Teste com autenticação
  describe('Rotas autenticadas', () => {
    let token;

    beforeAll(async () => {
      // Login para obter token
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      token = res.body.token;
    });

    test('deve acessar rota protegida', async () => {
      await request(app)
        .get('/api/profile')
        .set('Authorization', \`Bearer \${token}\`)
        .expect(200);
    });

    test('deve rejeitar token inválido', async () => {
      await request(app)
        .get('/api/profile')
        .set('Authorization', 'Bearer invalid')
        .expect(401);
    });
  });
});`,
    explanation: `
Supertest:
- Testes de endpoints HTTP
- Integração com Express
- Assertions HTTP
- Suporte a cookies/headers
- Validação de respostas

Cenários de Teste:
- CRUD operations
- Autenticação/Autorização
- Validação de dados
- Paginação/Filtros
- Uploads/Downloads

Estrutura de Testes:
- Organização por rotas
- Setup/Teardown
- Dados de teste
- Verificação de respostas
- Status codes corretos`,
  },

  debug: {
    title: "Debugging em Node.js",
    description: "Técnicas e ferramentas para debug em Node.js",
    code: `
// Debug com console
console.log('Dado:', data);
console.error('Erro:', error);
console.warn('Aviso:', warning);
console.table(arrayData);
console.time('operacao');
// código...
console.timeEnd('operacao');

// Debug com inspector
// Execute: node --inspect app.js
debugger;
async function processData(data) {
  debugger;  // Ponto de parada
  const result = await someOperation(data);
  return result;
}

// Debug com Debug module
const debug = require('debug')('app:server');
const debugDb = require('debug')('app:db');

debug('Servidor iniciado na porta %d', 3000);
debugDb('Conectado ao banco de dados');

// Error handling avançado
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware de erro global
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : 'Erro interno'
    });
  }
});

// Performance profiling
const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    debug(\`\${entry.name}: \${entry.duration}ms\`);
  });
});
obs.observe({ entryTypes: ['measure'] });

performance.mark('A');
// código para medir
performance.mark('B');
performance.measure('Operação', 'A', 'B');`,
    explanation: `
Técnicas de Debug:
- Console methods
- Node Inspector
- Debug module
- Error handling
- Performance profiling

Ferramentas:
- Chrome DevTools
- VS Code Debugger
- Postman/Insomnia
- Morgan (HTTP logging)
- Debug npm package

Boas Práticas:
- Use debug ao invés de console
- Estruture logs por módulos
- Capture stack traces
- Diferencie ambientes
- Monitore performance`,
  },

  logging: {
    title: "Logging com Winston",
    description: "Implementando logs estruturados com Winston",
    code: `
const winston = require('winston');
const { format } = winston;

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'api' },
  transports: [
    // Arquivo de erro
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Todos os logs
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Logs em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

// Exemplos de uso
logger.info('Servidor iniciado', {
  port: 3000,
  env: process.env.NODE_ENV
});

logger.error('Erro na conexão', {
  error: err.message,
  stack: err.stack
});

logger.warn('Recurso depreciado', {
  resource: 'oldEndpoint',
  suggestion: 'Use newEndpoint'
});

// Middleware de logging
app.use((req, res, next) => {
  logger.info('Requisição recebida', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Log de erros
process.on('uncaughtException', (err) => {
  logger.error('Erro não tratado', {
    error: err.message,
    stack: err.stack
  });
  process.exit(1);
});

// Logs personalizados
const requestLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/requests.log',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});`,
    explanation: `
//Winston:
- Logger multi-transport
- Níveis de log customizáveis
- Formatos flexíveis
- Rotação de arquivos
- Múltiplos destinos

//Níveis de Log:
- error: Erros críticos
- warn: Avisos importantes
- info: Informações gerais
- debug: Debug detalhado
- silly: Dados verbosos

//Configurações:
- Formato dos logs
- Destino (arquivo/console)
- Rotação de arquivos
- Metadata adicional
- Colorização em dev

//Boas Práticas:
- Estruture logs em JSON
- Use diferentes transportes
- Configure por ambiente
- Inclua metadata útil
- Mantenha rotação de logs`,
  },
  cluster: {
    title: "Cluster e PM2",
    description: "Escalando aplicações Node.js com Cluster e PM2",
    code: `
// Usando módulo Cluster nativo
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');

if (cluster.isPrimary) {
  // Processo principal
  console.log(\`Master \${process.pid} iniciando\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} morreu\`);
    // Reinicia worker morto
    cluster.fork();
  });
} else {
  // Processos worker
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(\`Worker \${process.pid} respondendo\`);
  });

  app.listen(3000);
  console.log(\`Worker \${process.pid} iniciado\`);
}

// Configuração PM2 (ecosystem.config.js)
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    instances: "max",
    exec_mode: "cluster",
    watch: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    max_memory_restart: "1G",
    error_file: "logs/error.log",
    out_file: "logs/out.log",
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    
    // Monitoramento
    monitor: true,
    max_restarts: 10,
    min_uptime: "10s",

    // Graceful shutdown
    kill_timeout: 3000,
    wait_ready: true,
  }]
}`,
    explanation: `
//Cluster:
- Aproveita múltiplos CPUs
- Distribui carga entre workers
- Aumenta disponibilidade
- Reinicia processos mortos

//PM2:
- Gerenciador de processos
- Balanceamento de carga
- Monitoramento em tempo real
- Logs centralizados
- Deploy zero-downtime

//Benefícios:
- Melhor performance
- Alta disponibilidade
- Recuperação automática
- Monitoramento fácil
- Gestão simplificada`,
  },

  docker: {
    title: "Containerização com Docker",
    description: "Containerizando aplicações Node.js com Docker",
    code: `
// Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

// docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/app
    depends_on:
      - mongo
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
        max_attempts: 3
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge

// .dockerignore
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
README.md
.env
*.log
logs/

// Script de build e deploy
docker build -t minhaapp:latest .
docker-compose up -d --scale app=3`,
    explanation: `
//Docker:
- Containers isolados
- Ambiente consistente
- Fácil escalabilidade
- Deploy simplificado
- Gerenciamento de recursos

//Boas Práticas:
- Imagens leves (alpine)
- Multi-stage builds
- Cache de camadas
- Configuração via env
- Health checks

//Compose:
- Múltiplos serviços
- Redes isoladas
- Volumes persistentes
- Escalabilidade
- Dependências`,
  },

  cache: {
    title: "Estratégias de Cache",
    description: "Implementando diferentes níveis de cache",
    code: `
const Redis = require('ioredis');
const redis = new Redis();
const mcache = require('memory-cache');

// Cache em memória
function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = 'cache:' + req.originalUrl;
    const cachedResponse = mcache.get(key);

    if (cachedResponse) {
      return res.send(cachedResponse);
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
}

// Cache Redis
async function cacheData(key, data, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(data));
}

async function getCachedData(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

// Exemplo de uso
app.get('/users', cacheMiddleware(300), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Cache em camadas
async function getUser(id) {
  // Verifica cache em memória
  const memCache = mcache.get(\`user:\${id}\`);
  if (memCache) return memCache;

  // Verifica Redis
  const redisCache = await getCachedData(\`user:\${id}\`);
  if (redisCache) {
    // Atualiza cache em memória
    mcache.put(\`user:\${id}\`, redisCache, 60 * 1000);
    return redisCache;
  }

  // Busca no banco
  const user = await User.findById(id);
  if (user) {
    // Atualiza ambos os caches
    mcache.put(\`user:\${id}\`, user, 60 * 1000);
    await cacheData(\`user:\${id}\`, user, 3600);
  }

  return user;
}

// Cache condicional (ETags)
app.get('/api/data', async (req, res) => {
  const data = await getData();
  const etag = generateETag(data);

  if (req.header('If-None-Match') === etag) {
    return res.status(304).send();
  }

  res.setHeader('ETag', etag);
  res.json(data);
});`,
    explanation: `
//Níveis de Cache:
- Memória (mais rápido)
- Redis (distribuído)
- HTTP (cliente)
- CDN (edge)

//Estratégias:
- Cache em camadas
- TTL variável
- Cache condicional
- Cache invalidation
- Cache warming

//Considerações:
- Consistência vs Performance
- Memória vs Persistência
- Invalidação estratégica
- Monitoramento
- Fallbacks`,
  },

  cicd: {
    title: "CI/CD (Integração e Entrega Contínua)",
    description: "Configurando pipeline de CI/CD com GitHub Actions",
    code: `
# .github/workflows/main.yml
name: Node.js CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
      redis:
        image: redis:latest
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run tests with coverage
      run: npm run test:coverage

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3

    - name: Build Docker image
      run: docker build -t myapp:{{ github.sha }} .

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: {{ secrets.DOCKER_USERNAME }}
        password: {{ secrets.DOCKER_PASSWORD }}

    - name: Push Docker image
      run: |
        docker tag myapp:{{ github.sha }} myorg/myapp:latest
        docker push myorg/myapp:latest

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Deploy to staging
      uses: digitalocean/action-doctl@v2
      with:
        token: {{ secrets.DIGITALOCEAN_TOKEN }}
    
    - run: doctl kubernetes cluster kubeconfig save {{ secrets.CLUSTER_NAME }}
    
    - name: Update deployment
      run: |
        kubectl set image deployment/myapp-staging \
          myapp=myorg/myapp:latest
        kubectl rollout status deployment/myapp-staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      uses: digitalocean/action-doctl@v2
      with:
        token: {{ secrets.DIGITALOCEAN_TOKEN }}
    
    - run: doctl kubernetes cluster kubeconfig save {{ secrets.CLUSTER_NAME }}
    
    - name: Update deployment
      run: |
        kubectl set image deployment/myapp-production \
          myapp=myorg/myapp:latest
        kubectl rollout status deployment/myapp-production

# scripts/deploy.sh
#!/bin/bash
set -e

echo "Iniciando deploy..."

# Variáveis de ambiente
export NODE_ENV=production
export $(cat .env.production | xargs)

# Backup do banco
echo "Realizando backup..."
mongodump --uri $MONGO_URI --archive=backup.gz --gzip

# Deploy
echo "Atualizando aplicação..."
pm2 deploy ecosystem.config.js production

# Migrations
echo "Executando migrations..."
npm run migrate:up

echo "Deploy concluído com sucesso!"`,
    explanation: `
//CI/CD Pipeline:
- Integração Contínua (CI)
  * Testes automatizados
  * Análise de código
  * Build do projeto
  * Relatórios de cobertura

- Entrega Contínua (CD)
  * Build de imagem Docker
  * Deploy automático
  * Ambientes separados
  * Rollback automático

//Etapas Comuns:
- Lint e testes
- Build e empacotamento
- Deploy em staging
- Testes de integração
- Deploy em produção

//Boas Práticas:
- Secrets seguras
- Ambientes isolados
- Rollback plan
- Monitoramento
- Notificações`,
  },

  monitoring: {
    title: "Monitoramento",
    description: "Monitoramento de aplicação Node.js em produção",
    code: `
// Monitoramento básico com Express
const responseTime = require('response-time');
const Prometheus = require('prom-client');

// Métricas Prometheus
const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Contadores personalizados
const httpRequestsTotal = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new Prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP',
  labelNames: ['method', 'route', 'status']
});

// Middleware de métricas
app.use(responseTime((req, res, time) => {
  httpRequestsTotal.inc({
    method: req.method,
    route: req.route?.path || req.path,
    status: res.statusCode
  });
  
  httpRequestDuration.observe(
    {
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    },
    time / 1000
  );
}));

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  const metrics = await Prometheus.register.metrics();
  res.send(metrics);
});

// Health check
app.get('/health', async (req, res) => {
  try {
    // Verifica conexão com banco
    await mongoose.connection.db.admin().ping();
    
    // Verifica Redis
    await redis.ping();

    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Monitoramento de eventos
process.on('uncaughtException', (error) => {
  console.error('Erro não tratado:', error);
  // Notifica serviço de monitoramento
  notifyError(error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise não tratada:', reason);
  // Notifica serviço de monitoramento
  notifyError(reason);
});

// Métricas de memória
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: \`\${Math.round(used.rss / 1024 / 1024)}MB\`,
    heapTotal: \`\${Math.round(used.heapTotal / 1024 / 1024)}MB\`,
    heapUsed: \`\${Math.round(used.heapUsed / 1024 / 1024)}MB\`,
    external: \`\${Math.round(used.external / 1024 / 1024)}MB\`
  });
}, 30000);`,
    explanation: `
//Métricas Importantes:
- Uso de recursos (CPU, memória)
- Latência de requisições
- Taxa de erros
- Throughput
- Health status

//Ferramentas:
- Prometheus/Grafana
- New Relic
- Datadog
- PM2 Monitoring
- Elasticsearch

//Aspectos Monitorados:
- Performance
- Disponibilidade
- Erros e exceções
- Recursos do sistema
- Métricas de negócio`,
  },

  events: {
    title: "Event Emitter",
    description: "Trabalhando com eventos personalizados em Node.js",
    code: `
const EventEmitter = require('events');

// Criando emissor de eventos personalizado
class OrderEmitter extends EventEmitter {}

const orderEvents = new OrderEmitter();

// Ouvindo eventos
orderEvents.on('orderCreated', (order) => {
  console.log('Novo pedido criado:', order.id);
  // Enviar email de confirmação
});

orderEvents.on('orderPaid', (order) => {
  console.log('Pagamento confirmado:', order.id);
  // Iniciar processo de envio
});

orderEvents.on('orderShipped', (order) => {
  console.log('Pedido enviado:', order.id);
  // Notificar cliente
});

// Ouvindo uma única vez
orderEvents.once('specialEvent', (data) => {
  console.log('Este listener só executa uma vez');
});

// Emissor com erro
orderEvents.on('error', (error) => {
  console.error('Erro no processamento:', error);
});

// Exemplo de uso
async function processOrder(orderData) {
  try {
    // Criar pedido
    const order = await Order.create(orderData);
    orderEvents.emit('orderCreated', order);

    // Processar pagamento
    await processPayment(order);
    orderEvents.emit('orderPaid', order);

    // Enviar pedido
    await shipOrder(order);
    orderEvents.emit('orderShipped', order);
  } catch (error) {
    orderEvents.emit('error', error);
  }
}`,
    explanation: `
//Event Emitter:
- Sistema de eventos assíncronos
- Padrão Observer
- Comunicação desacoplada
- Múltiplos listeners
- Tratamento de erros

//Usos Comuns:
- Notificações
- Logging
- Webhooks
- Processamento async
- Fluxos complexos`,
  },

  workers: {
    title: "Worker Threads",
    description: "Processamento paralelo com Worker Threads",
    code: `
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Código do thread principal
  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: data
      });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(\`Worker parou com código \${code}\`));
        }
      });
    });
  }

  // Pool de Workers
  class WorkerPool {
    constructor(numWorkers, workerScript) {
      this.workers = [];
      this.activeWorkers = 0;
      this.tasks = [];

      for (let i = 0; i < numWorkers; i++) {
        this.workers.push(new Worker(workerScript));
      }
    }

    runTask(data) {
      return new Promise((resolve, reject) => {
        const task = { data, resolve, reject };

        if (this.activeWorkers < this.workers.length) {
          this.runWorkerTask(task);
        } else {
          this.tasks.push(task);
        }
      });
    }

    runWorkerTask(task) {
      const worker = this.workers[this.activeWorkers++];
      
      worker.postMessage(task.data);

      worker.once('message', (result) => {
        task.resolve(result);
        this.activeWorkers--;
        
        if (this.tasks.length > 0) {
          this.runWorkerTask(this.tasks.shift());
        }
      });

      worker.once('error', task.reject);
    }
  }

  // Uso do pool
  const pool = new WorkerPool(4, './worker.js');
  
  // Exemplo de uso
  async function processArray() {
    const tasks = [1, 2, 3, 4, 5];
    const results = await Promise.all(
      tasks.map(task => pool.runTask(task))
    );
    console.log('Resultados:', results);
  }

} else {
  // Código do worker
  parentPort.on('message', (data) => {
    // Processamento intensivo
    const result = heavyComputation(data);
    parentPort.postMessage(result);
  });

  function heavyComputation(data) {
    // Simulação de processamento pesado
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(data * i);
    }
    return result;
  }
}`,
    explanation: `
//Worker Threads:
- Processamento paralelo real
- Compartilhamento de memória
- Ideal para CPU intensivo
- Pool de workers
- Comunicação bidirecional

//Quando Usar:
- Cálculos complexos
- Processamento de imagens
- Parse de arquivos grandes
- Machine Learning
- Criptografia`,
  },

  websockets: {
    title: "WebSockets",
    description: "Comunicação bidirecional em tempo real com WebSocket",
    code: `
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Gerenciando conexões
const clients = new Map();

server.on('connection', (ws, req) => {
  const id = Math.random().toString(36).substring(7);
  const metadata = { id };
  
  clients.set(ws, metadata);

  // Enviando mensagem de boas-vindas
  ws.send(JSON.stringify({
    type: 'welcome',
    message: \`Bem-vindo! Seu ID é \${id}\`
  }));

  // Recebendo mensagens
  ws.on('message', (messageData) => {
    const message = JSON.parse(messageData);
    
    switch (message.type) {
      case 'chat':
        broadcast({
          type: 'chat',
          userId: metadata.id,
          message: message.content
        });
        break;

      case 'typing':
        broadcast({
          type: 'typing',
          userId: metadata.id
        }, ws); // Excluir remetente
        break;
    }
  });

  // Tratando desconexão
  ws.on('close', () => {
    clients.delete(ws);
    broadcast({
      type: 'userLeft',
      userId: metadata.id
    });
  });
});

// Função de broadcast
function broadcast(message, exclude) {
  const data = JSON.stringify(message);
  [...clients.keys()].forEach((client) => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Exemplo de cliente
const clientExample = \`
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Conectado ao servidor');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'welcome':
      console.log(data.message);
      break;
    case 'chat':
      displayMessage(data);
      break;
    case 'typing':
      showTypingIndicator(data.userId);
      break;
  }
};

ws.onclose = () => {
  console.log('Desconectado');
};

// Enviando mensagens
function sendMessage(content) {
  ws.send(JSON.stringify({
    type: 'chat',
    content
  }));
}

function sendTyping() {
  ws.send(JSON.stringify({
    type: 'typing'
  }));
}\``,
    explanation: `
WebSocket:
- Comunicação full-duplex
- Conexão persistente
- Baixa latência
- Ideal para tempo real
- Suporte a broadcast

//Casos de Uso:
- Chat em tempo real
- Jogos online
- Dashboards ao vivo
- Notificações push
- Colaboração em tempo real

//Considerações:
- Gerenciamento de conexões
- Reconexão automática
- Heartbeat
- Escalabilidade
- Fallback para polling`,
  },

  graphql: {
    title: "GraphQL",
    description: "Implementando API GraphQL com Apollo Server",
    code: `
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Schema GraphQL
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    createComment(content: String!, authorId: ID!, postId: ID!): Comment!
  }

  type Subscription {
    newPost: Post!
    newComment(postId: ID!): Comment!
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    posts: async () => await Post.find(),
    post: async (_, { id }) => await Post.findById(id)
  },

  User: {
    posts: async (parent) => await Post.find({ authorId: parent.id })
  },

  Post: {
    author: async (parent) => await User.findById(parent.authorId),
    comments: async (parent) => await Comment.find({ postId: parent.id })
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      await user.save();
      return user;
    },

    createPost: async (_, { title, content, authorId }) => {
      const post = new Post({ title, content, authorId });
      await post.save();
      pubsub.publish('NEW_POST', { newPost: post });
      return post;
    }
  },

  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator(['NEW_POST'])
    },
    newComment: {
      subscribe: (_, { postId }) => 
        pubsub.asyncIterator([\`NEW_COMMENT.\${postId}\`])
    }
  }
};

// Configuração do Apollo Server
async function startApolloServer() {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Contexto com auth
      const token = req.headers.authorization || '';
      const user = await getUserFromToken(token);
      return { user };
    },
    formatError: (error) => {
      // Formatação de erros
      console.error(error);
      return new Error('Erro interno');
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  return app;
}`,
    explanation: `
//GraphQL:
- Query language para APIs
- Requisições precisas
- Resolução eficiente
- Schema tipado
- Introspection

//Componentes:
- Types: Define estrutura
- Queries: Consultas
- Mutations: Modificações
- Subscriptions: Tempo real
- Resolvers: Implementação

//Vantagens:
- Evita over/under fetching
- Documentação automática
- Tipagem forte
- Performance otimizada
- Flexibilidade para clientes`,
  },

  microservices: {
    title: "Microserviços",
    description: "Implementando arquitetura de microserviços com Node.js",
    code: `
// Service Registry com Eureka
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'user-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: 3000,
    statusPageUrl: 'http://localhost:3000/info',
    healthCheckUrl: 'http://localhost:3000/health'
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});

// API Gateway
const gateway = require('fast-gateway');

const server = gateway({
  routes: [{
    prefix: '/users',
    target: 'http://localhost:3001'
  }, {
    prefix: '/orders',
    target: 'http://localhost:3002'
  }]
});

// Comunicação entre serviços com RabbitMQ
const amqp = require('amqplib');

async function setupMessageQueue() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  // Setup das filas
  await channel.assertQueue('order_created');
  await channel.assertQueue('payment_processed');

  return channel;
}

// Serviço de Pedidos
class OrderService {
  async createOrder(orderData) {
    const order = await Order.create(orderData);
    
    // Publica evento
    channel.sendToQueue(
      'order_created',
      Buffer.from(JSON.stringify(order))
    );

    return order;
  }

  // Consumidor de eventos
  async setupConsumers() {
    channel.consume('payment_processed', async (data) => {
      const payment = JSON.parse(data.content);
      await this.updateOrderStatus(payment.orderId, 'paid');
      channel.ack(data);
    });
  }
}

// Circuit Breaker
const CircuitBreaker = require('opossum');

const breaker = new CircuitBreaker(async function() {
  const response = await axios.get('http://payment-service/status');
  return response.data;
}, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});

breaker.fallback(() => ({ status: 'unavailable' }));

// Descoberta de Serviço
async function callUserService(userId) {
  const instances = await serviceRegistry.getInstances('user-service');
  const instance = instances[Math.floor(Math.random() * instances.length)];
  return axios.get(\`http://\${instance.host}:\${instance.port}/users/\${userId}\`);
}

// Health Check
app.get('/health', async (req, res) => {
  const health = {
    status: 'UP',
    timestamp: new Date(),
    service: 'order-service',
    dependencies: {
      database: await checkDatabase(),
      messageQueue: await checkMessageQueue(),
      paymentService: await breaker.fire()
    }
  };

  const isHealthy = Object.values(health.dependencies)
    .every(dep => dep.status === 'UP');

  res.status(isHealthy ? 200 : 503).json(health);
});

// Tracing distribuído
const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider();
const exporter = new JaegerExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const tracer = opentelemetry.trace.getTracer('order-service');`,
    explanation: `
//Microserviços:
- Serviços independentes
- Comunicação via API/mensagens
- Banco de dados próprio
- Escalabilidade independente
- Deploy isolado

//Componentes:
- API Gateway
- Service Registry
- Message Broker
- Circuit Breaker
- Tracing distribuído

//Padrões:
- Event Sourcing
- CQRS
- Saga Pattern
- Bulkhead
- Service Mesh

//Considerações:
- Resiliência
- Service Discovery
- Load Balancing
- Monitoramento
- Distributed Tracing`,
  },
  "nestjsintro": {
        "title": "Introdução ao NestJS",
        "description": "Framework Node.js para construção de aplicações back-end eficientes e escaláveis",
        "code": `// Instalação do NestJS CLI
npm install -g @nestjs/cli

// Criação de novo projeto
nest new projeto-exemplo

// Estrutura básica de uma aplicação
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}`,
        "explanation": `O NestJS é um framework progressivo para construção de aplicações server-side com Node.js. Ele utiliza TypeScript como linguagem principal e se inspira em padrões de arquitetura como Angular.

Principais características:
- Arquitetura modular baseada em decorators
- Suporte nativo a Injeção de Dependências
- Baseado em módulos reutilizáveis
- Alto desempenho e escalabilidade
- Fortemente tipado com TypeScript

No exemplo de código, mostramos:
1. Instalação do NestJS CLI
2. Criação de um novo projeto
3. Definição de um módulo básico usando decorators
`
    },
    "nestjsestrutura": {
        "title": "Estrutura de Projeto",
        "description": "Organização de diretórios e arquivos em um projeto NestJS",
        "code": `projeto-exemplo/
├── src/
│   ├── main.ts          # Ponto de entrada da aplicação
│   ├── app.module.ts    # Módulo raiz da aplicação
│   ├── app.controller.ts # Controlador principal
│   ├── app.service.ts   # Serviço principal
│   └── modules/         # Diretório para módulos específicos
│       └── usuarios/
│           ├── usuarios.module.ts
│           ├── usuarios.controller.ts
│           └── usuarios.service.ts
├── test/                # Diretórios de testes
├── nest-cli.json        # Configurações do NestJS
└── tsconfig.json        # Configurações do TypeScript`,
        "explanation": `A estrutura de um projeto NestJS segue uma organização modular e bem definida:

Principais componentes:
- src/main.ts: Ponto de entrada da aplicação
- src/app.module.ts: Módulo raiz que importa todos os outros
- Diretório modules/: Agrupa módulos específicos da aplicação

Cada módulo geralmente contém:
1. Módulo (.module.ts)
2. Controlador (.controller.ts)
3. Serviço (.service.ts)

Benefícios desta estrutura:
- Organização clara
- Separação de responsabilidades
- Facilidade de manutenção e escalabilidade
`
    },
    "nestjsmodulos": {
        "title": "Módulos no NestJS",
        "description": "Criação e configuração de módulos no NestJS",
        "code": `import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],  // Controladores do módulo
  providers: [UsuariosService],       // Serviços/Providers
  imports: [],                         // Módulos importados
  exports: [UsuariosService]           // Serviços exportados
})
export class UsuariosModule {}

// Exemplo de módulo raiz
@Module({
  imports: [UsuariosModule, OutroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`
        ,
        "explanation": `Módulos no NestJS são classes decoradas com @Module() que organizam componentes relacionados.

Principais elementos de um módulo:
- controllers: Controladores associados ao módulo
- providers: Serviços e injetáveis 
- imports: Outros módulos necessários
- exports: Serviços disponibilizados para outros módulos

Características importantes:
1. Encapsulam um conjunto coeso de funcionalidades
2. Permitem organização modular da aplicação
3. Facilitam a injeção de dependências
4. Promovem baixo acoplamento entre componentes`
    },
    "nestjsrotas": {
        "title": "Rotas e Controladores",
        "description": "Definição de rotas e controladores no NestJS",
        "code": `import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')  // Prefixo de rota
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService
  ) {}

  // Rota GET /usuarios
  @Get()
  listarTodos() {
    return this.usuariosService.listarTodos();
  }

  // Rota POST /usuarios
  @Post()
  criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return this.usuariosService.criar(dadosUsuario);
  }

  // Rota GET /usuarios/:id
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id);
  }
}`,
        "explanation": `Controladores no NestJS gerenciam rotas e requisições HTTP.

Principais decorators de rota:
- @Controller(): Define o prefixo base para rotas
- @Get(): Manipula requisições GET
- @Post(): Manipula requisições POST
- @Put(): Manipula requisições PUT
- @Delete(): Manipula requisições DELETE

Características:
1. Utilizam decorators para definir rotas
2. Injetam serviços via construtor
3. Podem usar decorators para capturar parâmetros:
   - @Body(): Corpo da requisição
   - @Param(): Parâmetros de rota
   - @Query(): Parâmetros de consulta`
    },
    "nestjsparametros": {
        "title": "Parâmetros de Rota",
        "description": "Manipulação de parâmetros em rotas NestJS",
        "code": `import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('produtos')
export class ProdutosController {
  // Parâmetro de rota simples
  @Get(':id')
  buscarProduto(@Param('id') id: string) {
    return { mensagem: Buscando produto S{id} };
  }

  // Múltiplos parâmetros
  @Get('categoria/:categoria/marca/:marca')
  buscarPorCategoriaEMarca(
    @Param('categoria') categoria: string,
    @Param('marca') marca: string
  ) {
    return { 
      categoria, 
      marca 
    };
  }

  // Parâmetros de consulta
  @Get()
  listarProdutos(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10
  ) {
    return {
      pagina,
      limite,
      produtos: []
    };
  }
}`,
        "explanation": `Parâmetros de rota permitem capturar valores dinâmicos em URLs.

Tipos de parâmetros:
1. Parâmetros de Rota (@Param)
   - Capturados diretamente na URL
   - Definidos no path do decorator

2. Parâmetros de Consulta (@Query)
   - Opcionais
   - Passados após ? na URL (ex: /produtos?pagina=2&limite=10)
   - Podem ter valores padrão

Características:
- Conversão automática de tipos
- Validação pode ser adicionada com Pipes
- Flexibilidade na definição de rotas dinâmicas`
    },
    "nestjsrespostas": {
        "title": "Resposta de Requisição",
        "description": "Formatação e envio de respostas HTTP",
        "code": `import { 
  Controller, 
  Get, 
  Post, 
  Res, 
  HttpStatus, 
  HttpException 
} from '@nestjs/common';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  // Resposta simples
  @Get()
  listarusuarios() {
    return { usuarios: [] };
  }

  // Usando Response do Express
  @Get('detalhes')
  obterDetalhes(@Res() res: Response) {
    res.status(200).json({
      mensagem: 'Detalhes obtidos com sucesso'
    });
  }

  // Lançando exceções HTTP
  @Post()
  criarUsuario() {
    try {
      // Lógica de criação
      throw new Error('Usuário já existe');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Erro ao criar usuário',
        detalhes: error.message
      }, HttpStatus.CONFLICT);
    }
  }
}`,
        "explanation": `Respostas de requisição no NestJS podem ser manipuladas de várias formas:

Métodos de Resposta:
1. Retorno direto de objetos
   - NestJS converte automaticamente para JSON
   - Status padrão 200 OK

2. Uso do objeto Response do Express
   - Controle total sobre cabeçalhos e status
   - Método @Res() para injetar resposta

3. Tratamento de Exceções
   - HttpException para erros personalizados
   - Permite definir status e mensagens específicas

Boas Práticas:
- Use retornos simples quando possível
- Utilize HttpException para erros esperados
- Padronize formatos de resposta`
    },
    "nestjsservicos": {
        "title": "Serviços no NestJS",
        "description": "Criação e uso de serviços para lógica de negócio",
        "code": `import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
  ];

  listarTodos() {
    return this.usuarios;
  }

  buscarPorId(id: number) {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  criar(dadosUsuario) {
    const novoUsuario = {
      id: this.usuarios.length + 1,
      ...dadosUsuario
    };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }
}

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService
  ) {}

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarTodos();
  }
}`,
        "explanation": `Serviços no NestJS encapsulam a lógica de negócio:

Características principais:
1. Decorador @Injectable()
   - Permite injeção de dependência
   - Registra a classe como um provider

2. Separação de Responsabilidades
   - Lógica de negócio isolada dos controladores
   - Facilita manutenção e testes

3. Injeção de Dependência
   - Serviços são injetados via construtor
   - Promove baixo acoplamento
   - Facilita substituição e mock de dependências

Boas Práticas:
- Mantenha serviços focados em uma responsabilidade
- Use para manipulação de dados
- Separe lógicas complexas em métodos distintos`
    },
    "nestjsinjecao": {
        "title": "Injeção de Dependências",
        "description": "Gerenciamento de dependências no NestJS",
        "code": `import { Injectable, Inject } from '@nestjs/common';

// Serviço de Usuários
@Injectable()
export class UsuariosService {
  constructor(
    @Inject('REPOSITORIO_USUARIOS') 
    private repositorio: RepositorioUsuarios
  ) {}

  listarTodos() {
    return this.repositorio.encontrarTodos();
  }
}

// Módulo de Usuários
@Module({
  providers: [
    UsuariosService,
    {
      provide: 'REPOSITORIO_USUARIOS',
      useClass: RepositorioPostgres
    },
    // Valor constante
    {
      provide: 'CONFIG_BD',
      useValue: {
        host: 'localhost',
        porta: 5432
      }
    },
    // Fábrica
    {
      provide: 'SERVICO_AUTENTICACAO',
      useFactory: (configService) => {
        return new ServicoAutenticacao(configService);
      },
      inject: [ConfigService]
    }
  ]
})
export class UsuariosModule {}`,
        explanation: `Injeção de Dependências no NestJS:

Tipos de Injeção:
1. Injeção por Construtor
   - Método padrão de injeção
   - Decorador @Injectable()
   - Resolve dependências automaticamente

2. Injeção Personalizada
   - @Inject() para tokens customizados
   - Permite injetar valores, classes ou fábricas

3. Formas de Registro de Providers:
   - useClass: Instancia uma classe
   - useValue: Injeta um valor constante
   - useFactory: Cria instâncias dinamicamente

Vantagens:
- Desacoplamento de componentes
- Facilidade de substituição de dependências
- Inversão de controle
- Simplificação de testes`
    },
"nestjsmiddlewares": {
        "title": "Middlewares no NestJS",
        "description": "Implementação de middlewares para processamento de requisições",
        "code": `import { 
  Injectable, 
  NestMiddleware 
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware Global
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Requisição recebida:', {
      metodo: req.method,
      url: req.originalUrl,
      timestamp: new Date()
    });
    next();
  }
}

// Configuração no Módulo
@Module({
  // ...
})
export class AppModule implements NestModuleMiddleware {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('usuarios') // Aplicar apenas em rotas específicas
      // Ou para todos os controladores
      // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}`,
        "explanation": `Middlewares no NestJS são funções que processam requisições antes dos controladores:

Características Principais:
1. Implementam a interface NestMiddleware
2. Podem modificar objetos de requisição e resposta
3. Podem interromper o ciclo de requisição
4. Executados em ordem de declaração

Tipos de Middlewares:
- Globais: Afetam todas as rotas
- Específicos: Aplicados em rotas ou controladores selecionados

Casos de Uso Comuns:
- Logging
- Autenticação
- Tratamento de CORS
- Validação de requisições`
    },
    "nestjspipes": {
        "title": "Pipes e Validação",
        "description": "Validação de dados e transformação com Pipes",
        "code": `import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { 
  IsString, 
  IsEmail, 
  MinLength, 
  MaxLength 
} from 'class-validator';

// DTO (Data Transfer Object) com validações
export class CriarUsuarioDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}

@Controller('usuarios')
export class UsuariosController {
  // Validação global
  @Post()
  @UsePipes(new ValidationPipe())
  criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return { 
      mensagem: 'Usuário criado', 
      dados: dadosUsuario 
    };
  }

  // Pipe de transformação
  @Get(':id')
  buscarUsuario(
    @Param('id', ParseIntPipe) id: number
  ) {
    return { id };
  }
}

// Pipe personalizado
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    return typeof value === 'string' 
      ? value.trim() 
      : value;
  }
}`,
        "explanation": `Pipes no NestJS têm duas funções principais:

Tipos de Pipes:
1. Validação
   - Verificam se os dados atendem a critérios específicos
   - Usam bibliotecas como class-validator
   - Podem rejeitar requisições inválidas

2. Transformação
   - Modificam dados de entrada
   - Convertem tipos
   - Executam pré-processamento

Características:
- Podem ser aplicados globalmente
- Específicos para rotas ou parâmetros
- Suportam validações declarativas
- Melhoram segurança e consistência dos dados

Bibliotecas Comuns:
- class-validator para validações
- class-transformer para transformações`
    },
    "nestjsguards": {
        "title": "Guards e Segurança",
        "description": "Implementação de proteção de rotas",
        "code": `import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  UnauthorizedException 
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Guard de Autenticação
@Injectable()
export class AutenticacaoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      // Lógica de validação de token
      const usuarioValido = this.validarToken(token);
      return usuarioValido;
    } catch (erro) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private validarToken(token: string): boolean {
    // Implementação de validação de token
    return token.startsWith('Bearer ');
  }
}

// Guard de Papel/Permissão
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'roles', 
      context.getHandler()
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    // Verifica se o usuário tem a role necessária
    return roles.some(role => usuario.roles.includes(role));
  }
}

// Uso nos controladores
@Controller('admin')
@UseGuards(AutenticacaoGuard, RolesGuard)
export class AdminController {
  @Post()
  @Roles('ADMIN')
  criarRecurso() {
    // Apenas administradores podem acessar
  }
}`,
        "explanation": `Guards no NestJS controlam o acesso a rotas e recursos:

Características Principais:
1. Implementam CanActivate
2. Executados antes de controladores/rotas
3. Podem bloquear ou permitir acesso

Tipos de Guards:
- Autenticação: Verificam identidade do usuário
- Autorização: Controlam permissões de acesso
- Baseados em papéis ou tokens

Funcionalidades:
- Interceptam requisições
- Validam credenciais
- Verificam permissões
- Lançam exceções de não autorizado

Boas Práticas:
- Separar lógica de autenticação
- Usar decorators para definir permissões
- Implementar validações robustas`
    },
    "nestjsinterceptors": {
        "title": "Interceptors no NestJS",
        "description": "Manipulação de requisições e respostas",
        "code": `import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Interceptor de Logging
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    const now = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        console.log(Processamento levou S{Date.now() - now}ms);
      })
    );
  }
}

// Interceptor de Transformação de Resposta
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        sucesso: true,
        dados: data,
        timestamp: new Date()
      }))
    );
  }
}

// Uso no Controlador
@Controller('usuarios')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsuariosController {
  @Get()
  listarUsuarios() {
    return [
      { id: 1, nome: 'João' },
      { id: 2, nome: 'Maria' }
    ];
  }
}

// Interceptor Global
app.useGlobalInterceptors(new LoggingInterceptor());`,
        "explanation": `Interceptors no NestJS modificam o fluxo de requisições e respostas:

Características Principais:
1. Baseados em Observables (RxJS)
2. Executam antes e depois do tratamento de rotas
3. Podem modificar requisições e respostas

Casos de Uso Comuns:
- Logging de requisições
- Transformação de dados
- Tratamento de erros
- Medição de tempo de execução
- Caching

Tipos de Operações:
- Pré-processamento: Antes do controlador
- Pós-processamento: Após o controlador
- Manipulação de fluxo de dados

Benefícios:
- Separação de preocupações
- Código mais limpo e modular
- Flexibilidade na manipulação de requisições`
    }
    
};
