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
    category: "Fundamentos SQL",
    items: [
      { id: "selectBasico", title: "SELECT Básico" },
      { id: "where", title: "Filtros com WHERE" },
      { id: "orderBy", title: "Ordenação (ORDER BY)" },
      { id: "groupBy", title: "Agrupamento (GROUP BY)" },
      { id: "having", title: "Filtros de Grupo (HAVING)" },
      { id: "distinct", title: "Valores Únicos (DISTINCT)" },
    ],
  },
  {
    category: "Manipulação de Dados",
    items: [
      { id: "insert", title: "Inserção (INSERT)" },
      { id: "update", title: "Atualização (UPDATE)" },
      { id: "delete", title: "Exclusão (DELETE)" },
      { id: "merge", title: "Merge de Dados (MERGE)" },
      { id: "truncate", title: "Limpar Tabela (TRUNCATE)" },
    ],
  },
  {
    category: "Joins e Relacionamentos",
    items: [
      { id: "innerJoin", title: "INNER JOIN" },
      { id: "leftJoin", title: "LEFT JOIN" },
      { id: "rightJoin", title: "RIGHT JOIN" },
      { id: "fullJoin", title: "FULL JOIN" },
      { id: "selfJoin", title: "SELF JOIN" },
    ],
  },
  {
    category: "Funções SQL",
    items: [
      { id: "agregacao", title: "Funções de Agregação" },
      { id: "string", title: "Funções de String" },
      { id: "data", title: "Funções de Data" },
      { id: "numericas", title: "Funções Numéricas" },
      { id: "condicional", title: "Funções Condicionais" },
    ],
  },
  {
    category: "Subqueries e Views",
    items: [
      { id: "subqueries", title: "Subqueries" },
      { id: "views", title: "Views" },
      { id: "cte", title: "Common Table Expressions" },
      { id: "tempTables", title: "Tabelas Temporárias" },
    ],
  },
  {
    category: "DDL (Data Definition Language)",
    items: [
      { id: "createTable", title: "CREATE TABLE" },
      { id: "alterTable", title: "ALTER TABLE" },
      { id: "constraints", title: "Constraints" },
      { id: "indexes", title: "Índices" },
      { id: "sequences", title: "Sequences" },
    ],
  },
  {
    category: "Controle de Transações",
    items: [
      { id: "transaction", title: "Transações" },
      { id: "commit", title: "COMMIT e ROLLBACK" },
      { id: "savepoint", title: "SAVEPOINT" },
      { id: "isolation", title: "Níveis de Isolamento" },
    ],
  },
  {
    category: "Performance e Otimização",
    items: [
      { id: "explain", title: "EXPLAIN PLAN" },
      { id: "indexing", title: "Estratégias de Indexação" },
      { id: "partition", title: "Particionamento" },
      { id: "optimization", title: "Otimização de Queries" },
    ],
  }
];

export const examplessql: Record<string, Example> = {
  selectBasico: {
    title: "SELECT Básico",
    description: "Consultas básicas com SELECT em SQL",
    code: `
-- Selecionar todas as colunas
SELECT * FROM usuarios;
-- retorno: todas as colunas e registros da tabela usuarios

-- Selecionar colunas específicas
SELECT nome, email FROM usuarios;
-- retorno: apenas nome e email dos usuários

-- Selecionar com alias (apelido)
SELECT 
    nome AS nome_usuario,
    email AS email_contato
FROM usuarios;
-- retorno: colunas renomeadas com alias

-- Selecionar com expressões
SELECT
    nome,
    preco,
    preco * 0.9 AS preco_com_desconto
FROM produtos;
-- retorno: nome, preço e preço com 10% de desconto

-- Concatenar colunas
SELECT 
    nome || ' - ' || email AS info_usuario
FROM usuarios;
-- retorno: "João - joao@email.com"

-- Limitar resultados
SELECT * FROM produtos
LIMIT 10;
-- retorno: primeiros 10 registros`,
    explanation: `
SELECT:
- Recupera dados de tabelas
- Pode selecionar todas (*) ou algumas colunas
- Permite renomear colunas (alias)
- Suporta expressões matemáticas
- Pode concatenar valores
- Limita quantidade de registros`,
  },

  where: {
    title: "Filtros com WHERE",
    description: "Filtrando resultados com a cláusula WHERE",
    code: `
-- Filtro com igualdade
SELECT * FROM usuarios
WHERE idade = 25;
-- retorno: usuários com 25 anos

-- Filtro com maior/menor
SELECT * FROM produtos
WHERE preco >= 100;
-- retorno: produtos com preço maior ou igual a 100

-- Múltiplas condições (AND)
SELECT * FROM usuarios
WHERE idade >= 18 
AND cidade = 'São Paulo';
-- retorno: usuários maiores de idade de São Paulo

-- Múltiplas condições (OR)
SELECT * FROM produtos
WHERE categoria = 'Eletrônicos'
OR preco > 1000;
-- retorno: produtos eletrônicos ou caros

-- Filtro com LIKE
SELECT * FROM usuarios
WHERE nome LIKE 'Jo%';
-- retorno: usuários com nome começando com "Jo"

-- Filtro com IN
SELECT * FROM produtos
WHERE categoria IN ('Eletrônicos', 'Informática');
-- retorno: produtos das categorias listadas`,
    explanation: `
WHERE:
- Filtra registros por condições
- Operadores: =, >, <, >=, <=, <>
- Condições: AND, OR, NOT
- LIKE para padrões de texto
- IN para listas de valores
- BETWEEN para intervalos`,
  },

  orderBy: {
    title: "Ordenação (ORDER BY)",
    description: "Ordenando resultados com ORDER BY",
    code: `
-- Ordem crescente (padrão)
SELECT * FROM produtos
ORDER BY preco;
-- retorno: produtos ordenados por preço (menor para maior)

-- Ordem decrescente
SELECT * FROM usuarios
ORDER BY idade DESC;
-- retorno: usuários ordenados por idade (maior para menor)

-- Múltiplas colunas
SELECT * FROM pedidos
ORDER BY data DESC, valor ASC;
-- retorno: pedidos por data decrescente e valor crescente

-- Ordenar por expressão
SELECT nome, preco, quantidade
FROM produtos
ORDER BY preco * quantidade DESC;
-- retorno: ordenado pelo valor total (preço * quantidade)

-- Ordenar com NULLS
SELECT * FROM usuarios
ORDER BY email NULLS LAST;
-- retorno: emails nulos aparecem por último

-- Ordenar por posição da coluna
SELECT nome, idade, cidade
FROM usuarios
ORDER BY 2 DESC;  -- ordena pela segunda coluna (idade)
-- retorno: ordenado pela idade decrescente`,
    explanation: `
ORDER BY:
- Define ordem dos resultados
- ASC (crescente) é padrão
- DESC para ordem decrescente
- Aceita múltiplas colunas
- Pode ordenar por expressões
- Controla posição de NULL`,
  },

  groupBy: {
    title: "Agrupamento (GROUP BY)",
    description: "Agrupando resultados com GROUP BY",
    code: `
-- Agrupamento simples
SELECT cidade, COUNT(*) as total
FROM usuarios
GROUP BY cidade;
-- retorno: quantidade de usuários por cidade

-- Múltiplas colunas
SELECT categoria, marca, COUNT(*)
FROM produtos
GROUP BY categoria, marca;
-- retorno: quantidade de produtos por categoria e marca

-- Com função de agregação
SELECT departamento,
       AVG(salario) as media_salario,
       MAX(salario) as maior_salario,
       MIN(salario) as menor_salario
FROM funcionarios
GROUP BY departamento;
-- retorno: estatísticas salariais por departamento

-- Com filtro antes do agrupamento
SELECT categoria,
       SUM(valor) as total_vendas
FROM vendas
WHERE data >= '2024-01-01'
GROUP BY categoria;
-- retorno: total de vendas por categoria em 2024`,
    explanation: `
GROUP BY:
- Agrupa registros similares
- Usado com funções de agregação
- COUNT, SUM, AVG, MAX, MIN
- WHERE filtra antes do grupo
- HAVING filtra após o grupo
- Múltiplas colunas possíveis`,
  },
  having: {
    title: "Filtros de Grupo (HAVING)",
    description: "Filtrando grupos com a cláusula HAVING",
    code: `
-- Filtro básico com HAVING
SELECT cidade, COUNT(*) as total_usuarios
FROM usuarios
GROUP BY cidade
HAVING COUNT(*) > 100;
-- retorno: cidades com mais de 100 usuários

-- Comparando com média
SELECT departamento, AVG(salario) as media
FROM funcionarios
GROUP BY departamento
HAVING AVG(salario) > 5000;
-- retorno: departamentos com média salarial > 5000

-- Múltiplas condições
SELECT categoria, SUM(vendas) as total
FROM produtos
GROUP BY categoria
HAVING SUM(vendas) > 1000 
AND COUNT(*) >= 5;
-- retorno: categorias com vendas > 1000 e 5+ produtos

-- Combinando WHERE e HAVING
SELECT marca, COUNT(*) as total
FROM produtos
WHERE preco > 100
GROUP BY marca
HAVING COUNT(*) > 10;
-- retorno: marcas com mais de 10 produtos caros`,
    explanation: `
HAVING:
- Filtra grupos (não registros)
- Usado após GROUP BY
- Trabalha com agregações
- Diferente do WHERE
- Pode usar funções agregadas
- Executa após agrupamento`,
  },

  distinct: {
    title: "Valores Únicos (DISTINCT)",
    description: "Selecionando valores únicos com DISTINCT",
    code: `
-- DISTINCT simples
SELECT DISTINCT cidade
FROM usuarios;
-- retorno: lista de cidades sem repetição

-- Múltiplas colunas
SELECT DISTINCT marca, categoria
FROM produtos;
-- retorno: combinações únicas de marca/categoria

-- Com ordenação
SELECT DISTINCT idade
FROM usuarios
ORDER BY idade DESC;
-- retorno: idades únicas em ordem decrescente

-- Em funções agregadas
SELECT COUNT(DISTINCT cidade) as total_cidades
FROM usuarios;
-- retorno: número de cidades diferentes

-- Combinando com WHERE
SELECT DISTINCT categoria
FROM produtos
WHERE preco > 1000;
-- retorno: categorias de produtos caros`,
    explanation: `
DISTINCT:
- Remove duplicatas
- Pode usar várias colunas
- Afeta todas as colunas
- Útil em agregações
- Impacta performance
- Considera NULL como valor`,
  },

  innerJoin: {
    title: "INNER JOIN",
    description: "Combinando registros com correspondência em ambas as tabelas",
    code: `
-- INNER JOIN básico
SELECT pedidos.id, clientes.nome
FROM pedidos
INNER JOIN clientes 
ON pedidos.cliente_id = clientes.id;
-- retorno: pedidos com informações dos clientes

-- Múltiplos JOINS
SELECT 
    pedidos.id,
    clientes.nome,
    produtos.descricao
FROM pedidos
INNER JOIN clientes 
    ON pedidos.cliente_id = clientes.id
INNER JOIN produtos 
    ON pedidos.produto_id = produtos.id;
-- retorno: pedidos com cliente e produto

-- Com alias para tabelas
SELECT 
    p.data,
    c.nome as cliente,
    v.nome as vendedor
FROM pedidos p
INNER JOIN clientes c 
    ON p.cliente_id = c.id
INNER JOIN vendedores v 
    ON p.vendedor_id = v.id;
-- retorno: data do pedido, nome do cliente e vendedor`,
    explanation: `
INNER JOIN:
- Retorna apenas correspondências
- Exige chave de ligação
- Pode usar múltiplos joins
- Aceita alias para tabelas
- Comum em relacionamentos
- Elimina registros sem par`,
  },

  leftJoin: {
    title: "LEFT JOIN",
    description: "Retorna todos os registros da tabela da esquerda",
    code: `
-- LEFT JOIN básico
SELECT clientes.nome, pedidos.id
FROM clientes
LEFT JOIN pedidos 
    ON clientes.id = pedidos.cliente_id;
-- retorno: todos clientes, mesmo sem pedidos

-- Com filtro após JOIN
SELECT 
    c.nome,
    COUNT(p.id) as total_pedidos
FROM clientes c
LEFT JOIN pedidos p 
    ON c.id = p.cliente_id
WHERE p.data >= '2024-01-01'
GROUP BY c.nome;
-- retorno: contagem de pedidos por cliente em 2024

-- Múltiplos LEFT JOINS
SELECT 
    c.nome,
    p.id as pedido,
    e.status as entrega
FROM clientes c
LEFT JOIN pedidos p 
    ON c.id = p.cliente_id
LEFT JOIN entregas e 
    ON p.id = e.pedido_id;
-- retorno: clientes, pedidos e status de entrega`,
    explanation: `
LEFT JOIN:
- Mantém todos registros da esquerda
- Traz NULL para não correspondentes
- Útil para encontrar ausências
- Ordem das tabelas importa
- Pode combinar com WHERE
- Comum em relatórios`,
  },

  rightJoin: {
    title: "RIGHT JOIN",
    description: "Retorna todos os registros da tabela da direita",
    code: `
-- RIGHT JOIN básico
SELECT pedidos.id, vendedores.nome
FROM pedidos
RIGHT JOIN vendedores 
    ON pedidos.vendedor_id = vendedores.id;
-- retorno: todos vendedores, mesmo sem pedidos

-- Com condições adicionais
SELECT 
    p.id as pedido,
    v.nome as vendedor,
    v.departamento
FROM pedidos p
RIGHT JOIN vendedores v 
    ON p.vendedor_id = v.id
WHERE v.departamento = 'Comercial';
-- retorno: vendedores do comercial e seus pedidos

-- Verificando dados ausentes
SELECT 
    p.id,
    v.nome
FROM pedidos p
RIGHT JOIN vendedores v 
    ON p.vendedor_id = v.id
WHERE p.id IS NULL;
-- retorno: vendedores sem pedidos`,
    explanation: `
RIGHT JOIN:
- Mantém todos registros da direita
- Oposto do LEFT JOIN
- Menos comum que LEFT JOIN
- Pode ser reescrito como LEFT
- Útil em análises específicas
- Traz NULL para não correspondentes`,
  },

  fullJoin: {
    title: "FULL JOIN",
    description: "Retorna todos os registros de ambas as tabelas",
    code: `
-- FULL JOIN básico
SELECT 
    clientes.nome,
    pedidos.id
FROM clientes
FULL JOIN pedidos 
    ON clientes.id = pedidos.cliente_id;
-- retorno: todos clientes e todos pedidos

-- Encontrando registros sem correspondência
SELECT 
    c.nome as cliente,
    p.id as pedido
FROM clientes c
FULL JOIN pedidos p 
    ON c.id = p.cliente_id
WHERE c.id IS NULL OR p.id IS NULL;
-- retorno: clientes sem pedidos e pedidos sem cliente

-- Com múltiplas tabelas
SELECT 
    c.nome,
    p.id as pedido,
    e.status
FROM clientes c
FULL JOIN pedidos p 
    ON c.id = p.cliente_id
FULL JOIN entregas e 
    ON p.id = e.pedido_id;
-- retorno: todas as relações possíveis`,
    explanation: `
FULL JOIN:
- Combina LEFT e RIGHT JOIN
- Retorna todos os registros
- Útil para validação de dados
- Identifica inconsistências
- Menos comum em produção
- Pode impactar performance`,
  },

  selfJoin: {
    title: "SELF JOIN",
    description: "Juntando uma tabela com ela mesma",
    code: `
-- SELF JOIN básico
SELECT 
    e1.nome as funcionario,
    e2.nome as supervisor
FROM funcionarios e1
LEFT JOIN funcionarios e2 
    ON e1.supervisor_id = e2.id;
-- retorno: funcionários e seus supervisores

-- Encontrando hierarquia
SELECT 
    e1.nome as funcionario,
    e2.nome as gerente,
    e3.nome as diretor
FROM funcionarios e1
LEFT JOIN funcionarios e2 
    ON e1.gerente_id = e2.id
LEFT JOIN funcionarios e3 
    ON e2.gerente_id = e3.id;
-- retorno: hierarquia completa

-- Comparando registros da mesma tabela
SELECT 
    p1.nome as produto1,
    p2.nome as produto2
FROM produtos p1
INNER JOIN produtos p2 
    ON p1.categoria = p2.categoria
WHERE p1.id < p2.id;
-- retorno: pares de produtos da mesma categoria`,
    explanation: `
SELF JOIN:
- Junta tabela com ela mesma
- Usa alias diferentes
- Comum em hierarquias
- Útil para comparações
- Requer aliases claros
- Bom para estruturas em árvore`,
  }
}