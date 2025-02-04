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

export const examples: Record<string, Example> = {
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

  insert: {
    title: "Inserção (INSERT)",
    description: "Inserindo dados em tabelas SQL",
    code: `
-- INSERT básico
INSERT INTO usuarios (nome, email, idade)
VALUES ('João', 'joao@email.com', 25);
-- retorno: 1 registro inserido

-- Múltiplos registros
INSERT INTO produtos (nome, preco, categoria)
VALUES 
    ('Produto 1', 99.90, 'Eletrônicos'),
    ('Produto 2', 45.50, 'Acessórios'),
    ('Produto 3', 150.00, 'Eletrônicos');
-- retorno: 3 registros inseridos

-- INSERT com SELECT
INSERT INTO usuarios_backup
SELECT * FROM usuarios
WHERE data_cadastro < '2024-01-01';
-- retorno: n registros inseridos

-- INSERT ignorando duplicados
INSERT IGNORE INTO categorias (nome)
VALUES ('Eletrônicos'), ('Acessórios');
-- retorno: insere apenas registros não duplicados

-- INSERT com valores padrão
INSERT INTO usuarios (nome, email)
VALUES ('Maria', 'maria@email.com');
-- retorno: 1 registro inserido com valores default`,
    explanation: `
INSERT:
- Adiciona novos registros
- Aceita valores múltiplos
- Pode copiar de outra tabela
- Permite valores padrão
- Valida constraints
- Retorna número de inserções`,
  },

  update: {
    title: "Atualização (UPDATE)",
    description: "Atualizando dados em tabelas SQL",
    code: `
-- UPDATE básico
UPDATE usuarios
SET status = 'ativo'
WHERE id = 1;
-- retorno: 1 registro atualizado

-- Múltiplas colunas
UPDATE produtos
SET 
    preco = preco * 1.1,
    ultima_atualizacao = CURRENT_TIMESTAMP
WHERE categoria = 'Eletrônicos';
-- retorno: n registros atualizados

-- UPDATE com JOIN
UPDATE pedidos p
INNER JOIN usuarios u ON p.usuario_id = u.id
SET p.status = 'VIP'
WHERE u.tipo = 'premium';
-- retorno: atualiza status dos pedidos VIP

-- UPDATE com subquery
UPDATE produtos
SET preco = preco * 1.2
WHERE id IN (
    SELECT produto_id 
    FROM vendas 
    GROUP BY produto_id
    HAVING COUNT(*) > 100
);
-- retorno: aumenta preço dos mais vendidos`,
    explanation: `
UPDATE:
- Modifica registros existentes
- Pode usar WHERE
- Atualiza múltiplas colunas
- Permite JOINs
- Aceita subqueries
- Cuidado com WHERE`,
  },

  delete: {
    title: "Exclusão (DELETE)",
    description: "Removendo registros de tabelas SQL",
    code: `
-- DELETE básico
DELETE FROM usuarios
WHERE status = 'inativo';
-- retorno: n registros deletados

-- DELETE com JOIN
DELETE p
FROM pedidos p
INNER JOIN usuarios u ON p.usuario_id = u.id
WHERE u.status = 'cancelado';
-- retorno: deleta pedidos de usuários cancelados

-- DELETE com subquery
DELETE FROM produtos
WHERE id IN (
    SELECT produto_id
    FROM vendas
    GROUP BY produto_id
    HAVING COUNT(*) = 0
);
-- retorno: deleta produtos sem vendas

-- DELETE limitado
DELETE FROM logs
WHERE data < '2024-01-01'
LIMIT 1000;
-- retorno: deleta 1000 registros antigos`,
    explanation: `
DELETE:
- Remove registros
- Permite WHERE
- Aceita JOINs
- Pode ser limitado
- Mantém estrutura
- Usa índices`,
  },

  merge: {
    title: "Merge de Dados (MERGE/UPSERT)",
    description: "Inserindo ou atualizando registros condicionalmente",
    code: `
-- MERGE básico (sintaxe varia por SGBD)
MERGE INTO produtos p
USING produtos_temp t
ON (p.id = t.id)
WHEN MATCHED THEN
    UPDATE SET 
        p.preco = t.preco,
        p.nome = t.nome
WHEN NOT MATCHED THEN
    INSERT (id, nome, preco)
    VALUES (t.id, t.nome, t.preco);
-- retorno: registros atualizados/inseridos

-- INSERT ... ON DUPLICATE KEY (MySQL)
INSERT INTO produtos (id, nome, preco)
VALUES (1, 'Produto', 99.90)
ON DUPLICATE KEY UPDATE
    nome = VALUES(nome),
    preco = VALUES(preco);
-- retorno: insere ou atualiza

-- UPSERT (PostgreSQL)
INSERT INTO produtos (id, nome, preco)
VALUES (1, 'Produto', 99.90)
ON CONFLICT (id) DO UPDATE
SET nome = EXCLUDED.nome,
    preco = EXCLUDED.preco;
-- retorno: insere ou atualiza`,
    explanation: `
MERGE/UPSERT:
- Combina INSERT e UPDATE
- Evita duplicatas
- Atualiza existentes
- Insere novos
- Sintaxe varia por SGBD
- Atomicidade garantida`,
  },

  truncate: {
    title: "Limpeza de Tabela (TRUNCATE)",
    description: "Removendo todos os registros de uma tabela",
    code: `
-- TRUNCATE básico
TRUNCATE TABLE logs;
-- retorno: remove todos os registros

-- TRUNCATE com RESTART IDENTITY
TRUNCATE TABLE pedidos
RESTART IDENTITY;
-- retorno: limpa e reseta sequência

-- TRUNCATE múltiplas tabelas
TRUNCATE TABLE 
    tabela1,
    tabela2,
    tabela3;
-- retorno: limpa várias tabelas

-- TRUNCATE com CASCADE
TRUNCATE TABLE usuarios CASCADE;
-- retorno: limpa tabela e dependentes`,
    explanation: `
TRUNCATE:
- Mais rápido que DELETE
- Remove todos registros
- Reseta sequências
- Não dispara triggers
- Não pode usar WHERE
- Não pode desfazer`,
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
  },

  agregacao: {
    title: "Funções de Agregação",
    description: "Funções para cálculos e agregações de dados",
    code: `
-- COUNT - Contagem
SELECT COUNT(*) FROM usuarios;
-- retorno: total de registros

SELECT COUNT(DISTINCT cidade) FROM usuarios;
-- retorno: número de cidades diferentes

-- SUM - Soma
SELECT SUM(valor) FROM vendas;
-- retorno: valor total das vendas

SELECT produto_id, SUM(quantidade) as total
FROM vendas
GROUP BY produto_id;
-- retorno: quantidade vendida por produto

-- AVG - Média
SELECT AVG(preco) FROM produtos;
-- retorno: preço médio dos produtos

SELECT categoria, AVG(preco) as media
FROM produtos
GROUP BY categoria;
-- retorno: preço médio por categoria

-- MAX/MIN - Valor máximo/mínimo
SELECT 
    MAX(preco) as mais_caro,
    MIN(preco) as mais_barato
FROM produtos;
-- retorno: produto mais caro e mais barato`,
    explanation: `
Funções Agregação:
- COUNT: Conta registros
- SUM: Soma valores
- AVG: Calcula média
- MAX: Valor máximo
- MIN: Valor mínimo
- GROUP BY: Agrupa resultados`,
  },

  string: {
    title: "Funções de String",
    description: "Manipulando e formatando strings",
    code: `
-- CONCAT - Concatenação
SELECT CONCAT(nome, ' ', sobrenome) FROM usuarios;
-- retorno: 'João Silva'

-- UPPER/LOWER - Maiúsculo/Minúsculo
SELECT 
    UPPER(nome) as maiusculo,
    LOWER(email) as minusculo
FROM usuarios;
-- retorno: 'JOÃO', 'joao@email.com'

-- SUBSTRING - Parte da string
SELECT SUBSTRING(descricao, 1, 100) FROM produtos;
-- retorno: primeiros 100 caracteres

-- LENGTH - Tamanho da string
SELECT nome, LENGTH(nome) as tamanho
FROM usuarios;
-- retorno: nome e quantidade de caracteres

-- TRIM - Remove espaços
SELECT TRIM(' texto com espaços ');
-- retorno: 'texto com espaços'

-- REPLACE - Substitui texto
SELECT REPLACE(descricao, 'antigo', 'novo')
FROM produtos;
-- retorno: texto com substituição`,
    explanation: `
Funções String:
- CONCAT: Une strings
- UPPER/LOWER: Muda caso
- SUBSTRING: Extrai parte
- LENGTH: Conta caracteres
- TRIM: Remove espaços
- REPLACE: Substitui texto`,
  },

  data: {
    title: "Funções de Data",
    description: "Manipulando datas e horários",
    code: `
-- Data e hora atual
SELECT 
    CURRENT_DATE,     -- data atual
    CURRENT_TIME,     -- hora atual
    CURRENT_TIMESTAMP -- data e hora atual
-- retorno: '2024-01-15', '14:30:00', '2024-01-15 14:30:00'

-- Extrair partes da data
SELECT 
    EXTRACT(YEAR FROM data) as ano,
    EXTRACT(MONTH FROM data) as mes,
    EXTRACT(DAY FROM data) as dia
FROM pedidos;
-- retorno: 2024, 1, 15

-- Adicionar/Subtrair intervalos
SELECT 
    data,
    data + INTERVAL '1 day' as amanha,
    data - INTERVAL '1 month' as mes_anterior
FROM pedidos;
-- retorno: datas calculadas

-- Diferença entre datas
SELECT 
    data_inicio,
    data_fim,
    data_fim - data_inicio as dias
FROM projetos;
-- retorno: diferença em dias

-- Formatar data
SELECT TO_CHAR(data, 'DD/MM/YYYY') 
FROM pedidos;
-- retorno: '15/01/2024'`,
    explanation: `
Funções Data:
- CURRENT_DATE: Data atual
- EXTRACT: Extrai componentes
- INTERVAL: Calcula períodos
- Diferença entre datas
- Formatação de datas
- Timezone`,
  },

  numericas: {
    title: "Funções Numéricas",
    description: "Operações e formatações numéricas",
    code: `
-- Arredondamento
SELECT 
    ROUND(valor, 2),      -- 2 decimais
    CEIL(valor),          -- próximo inteiro
    FLOOR(valor),         -- inteiro anterior
    TRUNC(valor, 2)       -- trunca 2 decimais
FROM vendas;
-- retorno: valores formatados

-- Operações matemáticas
SELECT 
    ABS(valor),           -- valor absoluto
    POWER(numero, 2),     -- potência
    SQRT(numero),         -- raiz quadrada
    MOD(numero, 2)        -- resto divisão
FROM calculos;
-- retorno: resultados calculados

-- Formatação
SELECT 
    TO_CHAR(valor, '999G999D99'),
    TO_CHAR(valor, 'FM999999.00')
FROM financeiro;
-- retorno: valores formatados

-- Conversões
SELECT 
    CAST(texto AS numeric),
    valor::integer
FROM dados;
-- retorno: valores convertidos`,
    explanation: `
Funções Numéricas:
- ROUND: Arredonda valor
- CEIL/FLOOR: Próximo/anterior
- ABS: Valor absoluto
- POWER: Potência
- Formatação numérica
- Conversões`,
  },

  condicional: {
    title: "Funções Condicionais",
    description: "Lógica condicional em consultas",
    code: `
-- CASE simples
SELECT 
    nome,
    CASE status
        WHEN 'A' THEN 'Ativo'
        WHEN 'I' THEN 'Inativo'
        ELSE 'Desconhecido'
    END as status_desc
FROM usuarios;
-- retorno: status descritivo

-- CASE com condições
SELECT 
    nome,
    CASE 
        WHEN idade < 18 THEN 'Menor'
        WHEN idade < 60 THEN 'Adulto'
        ELSE 'Idoso'
    END as faixa_etaria
FROM usuarios;
-- retorno: classificação por idade

-- COALESCE - Primeiro não nulo
SELECT 
    COALESCE(apelido, nome) as nome_exibicao,
    COALESCE(telefone2, telefone1) as contato
FROM usuarios;
-- retorno: primeiro valor não nulo

-- NULLIF - Retorna nulo se igual
SELECT 
    NULLIF(valor1, valor2) as resultado
FROM comparacoes;
-- retorno: nulo se valores iguais

-- NVL/IFNULL - Valor alternativo
SELECT 
    NVL(comissao, 0) as comissao,
    IFNULL(desconto, 0) as desconto
FROM vendas;
-- retorno: 0 se nulo`,
    explanation: `
Funções Condicionais:
- CASE: Lógica condicional
- COALESCE: Primeiro não nulo
- NULLIF: Compara valores
- NVL/IFNULL: Valor default
- Controle de fluxo
- Tratamento de nulos`,
  },

  subqueries: {
    title: "Subqueries",
    description: "Consultas aninhadas em SQL",
    code: `
-- Subquery no SELECT
SELECT 
    nome,
    (SELECT COUNT(*) FROM pedidos 
     WHERE pedidos.cliente_id = clientes.id) as total_pedidos
FROM clientes;
-- retorno: clientes com total de pedidos

-- Subquery no WHERE
SELECT * FROM produtos
WHERE preco > (
    SELECT AVG(preco) FROM produtos
);
-- retorno: produtos acima da média de preço

-- Subquery com IN
SELECT * FROM clientes
WHERE id IN (
    SELECT cliente_id 
    FROM pedidos 
    WHERE valor > 1000
);
-- retorno: clientes com pedidos grandes

-- Subquery correlacionada
SELECT * FROM pedidos p
WHERE valor > (
    SELECT AVG(valor) FROM pedidos 
    WHERE cliente_id = p.cliente_id
);
-- retorno: pedidos acima da média do cliente

-- Subquery no FROM
SELECT dept_name, avg_salary
FROM (
    SELECT 
        departamento,
        AVG(salario) as avg_salary
    FROM funcionarios
    GROUP BY departamento
) as dept_stats;
-- retorno: estatísticas por departamento`,
    explanation: `
Subqueries:
- Query dentro de outra
- Pode usar no SELECT
- Pode usar no WHERE
- Pode ser correlacionada
- Retorna valor ou lista
- Melhora legibilidade`,
  },

  views: {
    title: "Views",
    description: "Criando e usando views em SQL",
    code: `
-- Criando view simples
CREATE VIEW vw_clientes_ativos AS
SELECT * FROM clientes
WHERE status = 'ativo';
-- retorno: view criada

-- View com joins
CREATE VIEW vw_pedidos_completos AS
SELECT 
    p.id,
    c.nome as cliente,
    p.data,
    p.valor
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id;
-- retorno: view com dados de pedidos

-- View materializada
CREATE MATERIALIZED VIEW vw_vendas_mensais AS
SELECT 
    DATE_TRUNC('month', data) as mes,
    SUM(valor) as total
FROM vendas
GROUP BY DATE_TRUNC('month', data);
-- retorno: view materializada criada

-- Atualizando view materializada
REFRESH MATERIALIZED VIEW vw_vendas_mensais;
-- retorno: view atualizada

-- Usando view
SELECT * FROM vw_clientes_ativos
WHERE cidade = 'São Paulo';
-- retorno: clientes ativos de SP`,
    explanation: `
Views:
- Consulta salva
- Simplifica queries
- Reutiliza código
- Controla acesso
- Pode ser materializada
- Atualiza automaticamente`,
  },

  cte: {
    title: "Common Table Expressions",
    description: "Usando CTEs para consultas temporárias",
    code: `
-- CTE básica
WITH vendas_por_mes AS (
    SELECT 
        DATE_TRUNC('month', data) as mes,
        SUM(valor) as total
    FROM vendas
    GROUP BY DATE_TRUNC('month', data)
)
SELECT * FROM vendas_por_mes
ORDER BY mes;
-- retorno: totais mensais

-- CTE múltipla
WITH 
clientes_vip AS (
    SELECT * FROM clientes
    WHERE tipo = 'VIP'
),
pedidos_vip AS (
    SELECT p.* FROM pedidos p
    JOIN clientes_vip c ON p.cliente_id = c.id
)
SELECT * FROM pedidos_vip;
-- retorno: pedidos de clientes VIP

-- CTE recursiva
WITH RECURSIVE subordinados AS (
    -- caso base
    SELECT id, nome, gerente_id
    FROM funcionarios 
    WHERE gerente_id = 1
    
    UNION ALL
    
    -- parte recursiva
    SELECT f.id, f.nome, f.gerente_id
    FROM funcionarios f
    JOIN subordinados s ON f.gerente_id = s.id
)
SELECT * FROM subordinados;
-- retorno: hierarquia de funcionários`,
    explanation: `
CTEs:
- Consulta temporária
- Melhora organização
- Permite recursão
- Reutiliza subconsultas
- Mais legível que subquery
- Escopo limitado`,
  },

  tempTables: {
    title: "Tabelas Temporárias",
    description: "Criando e usando tabelas temporárias",
    code: `
-- Tabela temporária
CREATE TEMPORARY TABLE temp_resultados (
    id serial,
    valor numeric,
    data timestamp
);
-- retorno: tabela temp criada

-- Inserindo dados
INSERT INTO temp_resultados
SELECT id, valor, data
FROM vendas
WHERE data >= CURRENT_DATE - INTERVAL '30 days';
-- retorno: dados inseridos

-- Usando tabela temporária
SELECT 
    DATE_TRUNC('day', data) as dia,
    SUM(valor) as total
FROM temp_resultados
GROUP BY dia;
-- retorno: totais diários

-- Tabela temporária com estrutura existente
CREATE TEMPORARY TABLE temp_vendas_filtradas 
AS SELECT * FROM vendas WHERE valor > 1000;
-- retorno: tabela criada com dados

-- Limpando tabela temporária
DROP TABLE temp_resultados;
-- retorno: tabela removida`,
    explanation: `
Tabelas Temporárias:
- Dura apenas na sessão
- Performance melhor
- Índices próprios
- Escopo limitado
- Sem conflito de nomes
- Auto-limpeza`,
  },

  createTable: {
    title: "CREATE TABLE",
    description: "Criando tabelas e definindo estrutura",
    code: `
-- Criação básica de tabela
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- retorno: tabela criada

-- Tabela com múltiplas chaves
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    cliente_id INTEGER NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
);
-- retorno: tabela criada com foreign key

-- Tabela com check constraint
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INTEGER NOT NULL,
    categoria VARCHAR(50),
    CONSTRAINT preco_positivo CHECK (preco > 0),
    CONSTRAINT estoque_valido CHECK (estoque >= 0)
);
-- retorno: tabela criada com checks

-- Tabela com composite key
CREATE TABLE item_pedido (
    pedido_id INTEGER,
    produto_id INTEGER,
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
-- retorno: tabela criada com chave composta`,
    explanation: `
CREATE TABLE:
- Define estrutura
- Tipos de dados
- Constraints
- Valores default
- Chaves primárias/estrangeiras
- Regras de validação`,
  },

  alterTable: {
    title: "ALTER TABLE",
    description: "Modificando estrutura de tabelas existentes",
    code: `
-- Adicionar coluna
ALTER TABLE usuarios
ADD COLUMN telefone VARCHAR(20);
-- retorno: coluna adicionada

-- Remover coluna
ALTER TABLE usuarios
DROP COLUMN telefone;
-- retorno: coluna removida

-- Modificar tipo de coluna
ALTER TABLE produtos
ALTER COLUMN preco TYPE NUMERIC(12,2);
-- retorno: tipo modificado

-- Adicionar constraint
ALTER TABLE usuarios
ADD CONSTRAINT email_unique 
UNIQUE (email);
-- retorno: constraint adicionada

-- Remover constraint
ALTER TABLE usuarios
DROP CONSTRAINT email_unique;
-- retorno: constraint removida

-- Renomear tabela
ALTER TABLE usuarios
RENAME TO clientes;
-- retorno: tabela renomeada

-- Adicionar foreign key
ALTER TABLE pedidos
ADD CONSTRAINT fk_cliente
FOREIGN KEY (cliente_id) 
REFERENCES clientes(id);
-- retorno: foreign key adicionada`,
    explanation: `
ALTER TABLE:
- Modifica estrutura
- Adiciona/remove colunas
- Altera tipos
- Adiciona/remove constraints
- Renomeia objetos
- Mantém dados existentes`,
  },

  constraints: {
    title: "Constraints",
    description: "Definindo regras e restrições em tabelas",
    code: `
-- Primary Key
ALTER TABLE usuarios
ADD CONSTRAINT pk_usuarios 
PRIMARY KEY (id);
-- retorno: primary key adicionada

-- Foreign Key
ALTER TABLE pedidos
ADD CONSTRAINT fk_usuario
FOREIGN KEY (usuario_id) 
REFERENCES usuarios(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
-- retorno: foreign key adicionada

-- Unique Constraint
ALTER TABLE usuarios
ADD CONSTRAINT uq_email
UNIQUE (email);
-- retorno: unique constraint adicionada

-- Check Constraint
ALTER TABLE produtos
ADD CONSTRAINT ck_preco
CHECK (preco >= 0);
-- retorno: check constraint adicionada

-- Not Null Constraint
ALTER TABLE usuarios
ALTER COLUMN nome 
SET NOT NULL;
-- retorno: not null adicionado

-- Default Value
ALTER TABLE pedidos
ALTER COLUMN status 
SET DEFAULT 'pendente';
-- retorno: valor default definido`,
    explanation: `
Constraints:
- Primary Key (PK)
- Foreign Key (FK)
- Unique
- Check
- Not Null
- Default Values
- Garante integridade`,
  },

  indexes: {
    title: "Índices",
    description: "Criando e gerenciando índices para otimização",
    code: `
-- Índice simples
CREATE INDEX idx_usuarios_email
ON usuarios(email);
-- retorno: índice criado

-- Índice único
CREATE UNIQUE INDEX idx_produtos_codigo
ON produtos(codigo);
-- retorno: índice único criado

-- Índice composto
CREATE INDEX idx_pedidos_data_status
ON pedidos(data_pedido, status);
-- retorno: índice composto criado

-- Índice parcial
CREATE INDEX idx_produtos_ativos
ON produtos(nome)
WHERE status = 'ativo';
-- retorno: índice parcial criado

-- Remover índice
DROP INDEX idx_usuarios_email;
-- retorno: índice removido

-- Recriar índice
REINDEX TABLE usuarios;
-- retorno: índices recriados`,
    explanation: `
Índices:
- Acelera consultas
- Tipos diversos
- Único ou não
- Simples/composto
- Parcial/total
- Impacta performance`,
  },

  sequences: {
    title: "Sequences",
    description: "Gerando valores sequenciais automaticamente",
    code: `
-- Criar sequence
CREATE SEQUENCE seq_usuarios
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;
-- retorno: sequence criada

-- Usar sequence
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY 
    DEFAULT NEXTVAL('seq_usuarios'),
    nome VARCHAR(100)
);
-- retorno: tabela criada com sequence

-- Próximo valor
SELECT NEXTVAL('seq_usuarios');
-- retorno: próximo número

-- Valor atual
SELECT CURRVAL('seq_usuarios');
-- retorno: valor atual

-- Reiniciar sequence
ALTER SEQUENCE seq_usuarios
RESTART WITH 1;
-- retorno: sequence reiniciada

-- Modificar sequence
ALTER SEQUENCE seq_usuarios
INCREMENT BY 10
MAXVALUE 1000
CYCLE;
-- retorno: sequence modificada`,
    explanation: `
Sequences:
- Gera valores únicos
- Autoincremento
- Independente de tabela
- Cache de valores
- Pode ser cíclica
- Performance melhor`,
  },
  transaction: {
    title: "Transações",
    description: "Controlando transações em SQL",
    code: `
-- Iniciar transação
BEGIN;
-- ou
BEGIN TRANSACTION;
-- retorno: transação iniciada

-- Exemplo de transação
BEGIN;
    -- Atualiza saldo do pagador
    UPDATE contas 
    SET saldo = saldo - 100
    WHERE id = 1;

    -- Atualiza saldo do recebedor
    UPDATE contas 
    SET saldo = saldo + 100
    WHERE id = 2;

    -- Se tudo ok, confirma
    COMMIT;
-- retorno: transação concluída

-- Transação com verificação
BEGIN;
    UPDATE produtos 
    SET estoque = estoque - 10 
    WHERE id = 1;
    
    -- Verifica se tem estoque suficiente
    IF NOT EXISTS (
        SELECT 1 FROM produtos 
        WHERE id = 1 AND estoque >= 0
    ) THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
-- retorno: transação com verificação`,
    explanation: `
Transações:
- Garante atomicidade
- Tudo ou nada
- Consistência dos dados
- Isolamento
- Durabilidade
- Pode ser revertida`,
  },

  commit: {
    title: "COMMIT e ROLLBACK",
    description: "Confirmando ou revertendo transações",
    code: `
-- Commit básico
BEGIN;
    INSERT INTO pedidos (produto_id, quantidade)
    VALUES (1, 5);
    
    UPDATE produtos 
    SET estoque = estoque - 5
    WHERE id = 1;
COMMIT;
-- retorno: mudanças salvas

-- Rollback manual
BEGIN;
    DELETE FROM produtos 
    WHERE id = 1;
    
    -- Ops, melhor não deletar
    ROLLBACK;
-- retorno: mudanças descartadas

-- Commit com tratamento de erro
BEGIN;
    SAVEPOINT antes_operacao;
    
    BEGIN
        -- Tenta operação
        UPDATE contas 
        SET saldo = saldo - 100
        WHERE id = 1;
        
        -- Se erro, reverte ao savepoint
        EXCEPTION WHEN OTHERS THEN
            ROLLBACK TO antes_operacao;
    END;
COMMIT;
-- retorno: transação segura`,
    explanation: `
COMMIT/ROLLBACK:
- COMMIT salva mudanças
- ROLLBACK reverte
- Mantém consistência
- Trata erros
- Protege dados
- Define pontos de retorno`,
  },

  savepoint: {
    title: "SAVEPOINT",
    description: "Criando pontos de salvamento em transações",
    code: `
-- Savepoint básico
BEGIN;
    INSERT INTO usuarios (nome) 
    VALUES ('João');
    
    SAVEPOINT ponto1;
    
    UPDATE usuarios 
    SET email = 'joao@email.com'
    WHERE nome = 'João';
    
    -- Volta ao ponto1 se necessário
    ROLLBACK TO ponto1;
    
COMMIT;
-- retorno: transação com savepoint

-- Múltiplos savepoints
BEGIN;
    SAVEPOINT inicio;
    
    UPDATE produtos 
    SET preco = preco * 1.1;
    
    SAVEPOINT aumento_preco;
    
    UPDATE produtos 
    SET estoque = estoque - 10;
    
    -- Problema no estoque
    ROLLBACK TO aumento_preco;
    
    -- Continua com preços atualizados
    COMMIT;
-- retorno: transação parcial

-- Removendo savepoint
BEGIN;
    SAVEPOINT ponto1;
    -- operações...
    RELEASE SAVEPOINT ponto1;
COMMIT;
-- retorno: savepoint removido`,
    explanation: `
SAVEPOINT:
- Ponto de restauração
- Rollback parcial
- Múltiplos pontos
- Pode ser liberado
- Controle granular
- Flexibilidade`,
  },

  isolation: {
    title: "Níveis de Isolamento",
    description: "Configurando níveis de isolamento de transações",
    code: `
-- Read Uncommitted
BEGIN;
    SET TRANSACTION ISOLATION LEVEL
    READ UNCOMMITTED;
    
    SELECT * FROM produtos;
COMMIT;
-- retorno: pode ler dados não commitados

-- Read Committed
BEGIN;
    SET TRANSACTION ISOLATION LEVEL
    READ COMMITTED;
    
    SELECT * FROM produtos;
COMMIT;
-- retorno: lê apenas dados commitados

-- Repeatable Read
BEGIN;
    SET TRANSACTION ISOLATION LEVEL
    REPEATABLE READ;
    
    SELECT * FROM produtos;
    -- mesma leitura garantida
    SELECT * FROM produtos;
COMMIT;
-- retorno: leituras consistentes

-- Serializable
BEGIN;
    SET TRANSACTION ISOLATION LEVEL
    SERIALIZABLE;
    
    SELECT * FROM produtos
    WHERE estoque > 0
    FOR UPDATE;
    
    UPDATE produtos 
    SET estoque = estoque - 1
    WHERE id = 1;
COMMIT;
-- retorno: máximo isolamento`,
    explanation: `
Níveis Isolamento:
- Read Uncommitted
- Read Committed
- Repeatable Read
- Serializable
- Controla concorrência
- Trade-off performance`,
  },
  explain: {
    title: "EXPLAIN PLAN",
    description: "Analisando plano de execução de queries",
    code: `
-- EXPLAIN básico
EXPLAIN SELECT * FROM usuarios 
WHERE email = 'teste@email.com';
-- retorno: plano de execução simples

-- EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT u.nome, COUNT(p.id) as total_pedidos
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.nome;
-- retorno: plano com tempos de execução

-- EXPLAIN com formato JSON
EXPLAIN (FORMAT JSON) 
SELECT * FROM produtos 
WHERE preco > 100
ORDER BY nome;
-- retorno: plano em formato JSON

-- EXPLAIN ANALYZE VERBOSE
EXPLAIN (ANALYZE, VERBOSE)
SELECT p.*, c.nome as categoria
FROM produtos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.preco > 100
AND c.ativo = true;
-- retorno: plano detalhado com estatísticas`,
    explanation: `
EXPLAIN:
- Mostra plano execução
- Identifica problemas
- Analisa performance
- Sugere melhorias
- Auxilia otimização
- Mede custos`,
  },

  indexing: {
    title: "Estratégias de Indexação",
    description: "Otimizando consultas com índices",
    code: `
-- Índice para WHERE comum
CREATE INDEX idx_usuarios_email 
ON usuarios(email)
WHERE status = 'ativo';
-- retorno: índice para filtragem

-- Índice para JOIN
CREATE INDEX idx_pedidos_usuario 
ON pedidos(usuario_id);
-- retorno: índice para junção

-- Índice composto para ORDER BY
CREATE INDEX idx_produtos_cat_preco 
ON produtos(categoria_id, preco DESC);
-- retorno: índice para ordenação

-- Índice parcial
CREATE INDEX idx_pedidos_status 
ON pedidos(status) 
WHERE status IN ('pendente', 'processando');
-- retorno: índice para subset

-- Índice com INCLUDE
CREATE INDEX idx_produtos_busca 
ON produtos(nome)
INCLUDE (preco, estoque);
-- retorno: índice com colunas extras

-- Análise de uso de índices
SELECT 
    schemaname || '.' || tablename as tabela,
    indexname,
    idx_scan as numero_scans,
    idx_tup_read as linhas_lidas
FROM pg_stat_user_indexes;
-- retorno: estatísticas de uso`,
    explanation: `
Estratégias Índices:
- Escolha colunas certas
- Evite índices demais
- Use índices compostos
- Monitore utilização
- Mantenha atualizados
- Analise impacto`,
  },

  partition: {
    title: "Particionamento",
    description: "Dividindo tabelas grandes em partições",
    code: `
-- Tabela particionada por range
CREATE TABLE vendas (
    id SERIAL,
    data DATE,
    valor DECIMAL(10,2)
) PARTITION BY RANGE (data);
-- retorno: tabela particionada criada

-- Criar partições
CREATE TABLE vendas_2023 
PARTITION OF vendas
FOR VALUES FROM ('2023-01-01') 
TO ('2024-01-01');

CREATE TABLE vendas_2024 
PARTITION OF vendas
FOR VALUES FROM ('2024-01-01') 
TO ('2025-01-01');
-- retorno: partições criadas

-- Tabela particionada por lista
CREATE TABLE produtos (
    id SERIAL,
    categoria TEXT,
    nome TEXT
) PARTITION BY LIST (categoria);

CREATE TABLE produtos_eletronicos 
PARTITION OF produtos
FOR VALUES IN ('eletronicos');

CREATE TABLE produtos_moveis 
PARTITION OF produtos
FOR VALUES IN ('moveis');
-- retorno: partições por categoria`,
    explanation: `
Particionamento:
- Divide tabelas grandes
- Melhora performance
- Facilita manutenção
- Vários critérios
- Acesso mais rápido
- Backup parcial`,
  },

  optimization: {
    title: "Otimização de Queries",
    description: "Técnicas para otimizar consultas SQL",
    code: `
-- Evite SELECT *
SELECT id, nome, email
FROM usuarios
WHERE status = 'ativo';
-- retorno: apenas colunas necessárias

-- Use EXISTS vs IN
SELECT * FROM pedidos p
WHERE EXISTS (
    SELECT 1 
    FROM usuarios u
    WHERE u.id = p.usuario_id
    AND u.status = 'ativo'
);
-- retorno: mais eficiente que IN

-- Evite funções em WHERE
SELECT * FROM usuarios
WHERE DATE_TRUNC('month', data_criacao) = 
      DATE_TRUNC('month', CURRENT_DATE);
-- melhor usar:
SELECT * FROM usuarios
WHERE data_criacao >= '2024-01-01'
AND data_criacao < '2024-02-01';
-- retorno: permite uso de índice

-- Use UNION ALL vs UNION
SELECT * FROM vendas_2023
UNION ALL
SELECT * FROM vendas_2024;
-- retorno: sem remoção de duplicatas

-- Limite resultados
SELECT * FROM produtos
ORDER BY preco DESC
LIMIT 10;
-- retorno: top 10 mais caros`,
    explanation: `
Otimizações:
- Selecione menos dados
- Use índices corretamente
- Evite funções em WHERE
- Prefira UNION ALL
- Limite resultados
- Monitore performance`,
  }
}