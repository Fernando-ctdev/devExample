CREATE TABLE IF NOT EXISTS explanations (
    id SERIAL PRIMARY KEY,
    tech VARCHAR(100) NOT NULL,
    tech_id VARCHAR(100) UNIQUE NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tech_id ON explanations(tech_id);

-- Tabela para tecnologias
CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela para categorias
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    tech_id INTEGER REFERENCES technologies(id),
    name VARCHAR(200) NOT NULL
);

-- Tabela para items
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    item_id VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL
);

-- Tabela para exemplos
CREATE TABLE IF NOT EXISTS examples (
    id SERIAL PRIMARY KEY,
    tech_id INTEGER REFERENCES technologies(id),
    item_id VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    code TEXT,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_tech_name ON technologies(name);
CREATE INDEX IF NOT EXISTS idx_category_tech ON categories(tech_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);
CREATE INDEX IF NOT EXISTS idx_example_item ON examples(item_id);
