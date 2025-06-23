# DevExample - Exemplos de Código para Desenvolvedores

Um aplicativo web para explorar exemplos de código em diferentes tecnologias, incluindo JavaScript, TypeScript, GoLang, NodeJS e SQL.

## 🚀 Tecnologias utilizadas no projeto

- React 18
- TypeScript
- Tailwind CSS
- Prism.js
- Lucide React
- PostgreSQL
- Prisma ORM

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/devexample.git
cd devexample
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Configure DATABASE_URL e outras variáveis necessárias
```

4. Execute as migrações do banco:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

6. Acesse o aplicativo em:
```
http://localhost:5173
```

## 🎯 Funcionalidades

- ✅ Exemplos de código em múltiplas tecnologias
- ✅ Sintaxe destacada com Prism.js
- ✅ Busca por exemplos específicos
- ✅ Interface responsiva e moderna
- ✅ Navegação entre exemplos
- ✅ Copiar código com um clique
- ✅ Explicações detalhadas para cada exemplo
- ✅ Edição inline de código e explicações
- ✅ Tema claro/escuro
- ✅ Criação dinâmica de tecnologias
- ✅ Sistema de categorias e tópicos

## 🏗️ Arquitetura do Projeto

```
src/
├── components/
│   ├── home/                # Componentes específicos da Home
│   │   ├── TechnologyGrid.tsx
│   │   ├── SearchHeader.tsx
│   │   ├── TopicSection.tsx
│   │   └── ModalContainer.tsx
│   ├── Home.tsx            # Página principal refatorada
│   ├── ExampleView.tsx     # Visualização de exemplos
│   ├── LandingPage.tsx     # Página de landing
│   └── LoginModal.tsx      # Modal de login
├── constants/              # Constantes centralizadas
│   ├── technologies.ts     # Dados das tecnologias
│   └── colors.ts           # Gradientes e cores
├── types/                  # Definições TypeScript
│   └── types.ts           # Todas as interfaces
├── assets/                 # Recursos estáticos
└── styles/                # Estilos globais
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run lint` - Executa o linter
- `npm run preview` - Visualiza o build de produção

## 🚀 Melhorias Implementadas

### ✅ Refatoração Completa
- Consolidação de interfaces TypeScript em arquivo central
- Separação de componentes grandes em componentes menores
- Centralização de dados em arquivos de constantes
- Limpeza de código duplicado

### ✅ Arquitetura Modular
- Componentes reutilizáveis e bem organizados
- Separação clara de responsabilidades
- Melhor manutenibilidade do código

### ✅ Performance
- Remoção de re-renderizações desnecessárias
- Otimização de imports
- Limpeza de dependências não utilizadas

### ✅ Configuração
- Consolidação de configurações TypeScript
- Limpeza de scripts inválidos no package.json
- Remoção de configurações desnecessárias

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

**Maicon Fernando**
- GitHub: [@Fernando-ctdev](https://github.com/Fernando-ctdev)