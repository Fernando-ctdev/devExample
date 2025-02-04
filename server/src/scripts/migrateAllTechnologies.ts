import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

let prismaInstance: PrismaClient | null = null;

// Mapeamento dos nomes das tecnologias
const techNameMapping: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'go': 'golang',
  'node': 'nodejs',
  'nest': 'nestjs'
};

async function getPrismaClient() {
  if (!prismaInstance) {
    try {
      prismaInstance = new PrismaClient({
        log: ['error'], 
      });
      await prismaInstance.$connect();
    } catch (error) {
      console.error('❌ Erro ao conectar com Prisma:', error);
      throw error;
    }
  }
  return prismaInstance;
}

async function cleanDatabase() {
  const prisma = await getPrismaClient();
  console.log('🧹 Limpando banco de dados...');
  
  try {
    // Ordem importante por causa das relações
    await prisma.$transaction([
      prisma.example.deleteMany(),
      prisma.item.deleteMany(),
      prisma.category.deleteMany(),
      prisma.technology.deleteMany()
    ]);
    console.log('✅ Banco de dados limpo com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar banco de dados:', error);
    throw error;
  }
}

async function getTechFiles() {
  const dataDir = path.join(__dirname, '../data');
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.ts'));
  
  return files.map(file => {
    const name = file.replace('examples.ts', '');
    const defaultConfig = {
      title: name.charAt(0).toUpperCase() + name.slice(1),
      color: "bg-gradient-to-r from-gray-500 to-gray-700",
      hoverColor: "hover:from-gray-600 hover:to-gray-800",
      logo: "",
      alt: `${name} Logo`,
      padding: "px-8 py-3"
    };

    return {
      name,
      file,
      config: defaultConfig
    };
  });
}

async function importTechnology(techName: string, filename: string) {
  try {
    const dataDir = path.join(__dirname, '../data');
    const filePath = path.join(dataDir, filename);
    
    console.log(`\n📂 ${techName}`);
    console.log(`📍 Procurando arquivo em: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Arquivo não encontrado: ${filename}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`📄 Conteúdo do arquivo carregado (${content.length} caracteres)`);
    
    const topicsStart = content.indexOf('export const topics');
    const examplesStart = content.indexOf('export const examples');
    
    console.log(`🔍 Índices encontrados - topics: ${topicsStart}, examples: ${examplesStart}`);
    
    if (topicsStart === -1 || examplesStart === -1) {
      console.log('❌ Exportações não encontradas');
      return false;
    }

    const topicsSection = content.slice(topicsStart, examplesStart);
    const examplesSection = content.slice(examplesStart);
    
    console.log(`📊 Tamanho das seções - topics: ${topicsSection.length}, examples: ${examplesSection.length}`);
    console.log(`\n🔍 Primeiros 100 caracteres de topics:\n${topicsSection.slice(0, 100)}`);
    console.log(`\n🔍 Primeiros 100 caracteres de examples:\n${examplesSection.slice(0, 100)}`);

    const topicsContent = extractContent(topicsSection);
    const examplesContent = extractContent(examplesSection);

    if (!topicsContent || !examplesContent) {
      console.log('❌ Falha na extração');
      console.log(`Topics extraído: ${topicsContent ? '✅' : '❌'}`);
      console.log(`Examples extraído: ${examplesContent ? '✅' : '❌'}`);
      return false;
    }

    return processContent(topicsContent, examplesContent, techName);
  } catch (error) {
    console.error(`❌ ${techName}:`, error instanceof Error ? error.message : 'Erro');
    return false;
  }
}

function extractContent(text: string): string | null {
  try {
    console.log('\n🔍 Iniciando extração de conteúdo');
    
    const exportIndex = text.indexOf('export const');
    if (exportIndex === -1) return null;

    const exportName = text.slice(
      text.indexOf('const') + 5, 
      text.indexOf('=')
    ).trim();
    console.log(`📍 Processando exportação: ${exportName}`);

    const cleanText = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => !line.startsWith('//'))
      .join('\n');

    const equalIndex = cleanText.indexOf('=');
    if (equalIndex === -1) return null;

    let content = cleanText.slice(equalIndex + 1).trim();
    
    if (exportName.includes('examples')) {
      const matches = content.match(/^{[\s\S]*}(?:\s*\/\/[^\n]*)?$/);
      if (matches) {
        content = matches[0].replace(/\/\/[^\n]*$/, '').trim();
      }
    }

    try {
      const parsed = (new Function(`return ${content}`))();
      const isValid = Array.isArray(parsed) || typeof parsed === 'object';
      
      if (isValid) {
        console.log(`✅ Conteúdo extraído com sucesso (${content.length} caracteres)`);
        return content;
      }
    } catch (error) {
      console.log('⚠️ Erro na validação:', error.message);
    }

    return null;
  } catch (error) {
    console.error('❌ Erro na extração:', error);
    return null;
  }
}

function processExampleContent(example: any) {
  const formatCode = (code: string) => {
    if (!code) return '';

    return code
      .split('\n')
      .map(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('//') || trimmedLine.startsWith('retorno:')) {
          return `\n${trimmedLine}`;
        }

        return trimmedLine
          .replace(/let(\w+)/, 'let $1')
          .replace(/const(\w+)/, 'const $1')
          .replace(/var(\w+)/, 'var $1')
          .replace(/function(\w+)/, 'function $1');
      })
      .join('\n')
      .replace(/\n{3,}/g, '\n\n');
  };

  return {
    ...example,
    code: formatCode(example.code || ''),
    explanation: example.explanation || ''
  };
}

async function processContent(topicsContent: string, examplesContent: string, techName: string) {
  let prisma;
  try {
    prisma = await getPrismaClient();
    if (!prisma) throw new Error('Prisma não inicializado');

    const techConfig = (await getTechFiles()).find(t => t.name === techName)?.config;
    if (!techConfig) throw new Error('Configuração da tecnologia não encontrada');

    // Use o mapeamento de nomes aqui
    const normalizedTechName = techNameMapping[techName] || techName;

    const technology = await prisma.technology.upsert({
      where: { name: normalizedTechName },
      create: {
        name: normalizedTechName,
        ...techConfig
      },
      update: {}
    });

    const topics = (new Function(`return ${topicsContent}`))();
    const examples = (new Function(`return ${examplesContent}`))();

    if (!Array.isArray(topics) || !topics.every(t => t.category && Array.isArray(t.items))) {
      throw new Error('Formato inválido dos tópicos');
    }

    let totalItems = 0;
    let totalExamples = 0;

    for (const topic of topics) {
      const category = await prisma.category.create({
        data: {
          name: topic.category,
          technologyId: technology.id,
          items: {
            create: topic.items.map(item => ({
              itemId: item.id,
              title: item.title
            }))
          }
        },
        include: {
          items: true
        }
      });

      totalItems += category.items.length;

      for (const item of category.items) {
        const example = examples[item.itemId];
        if (example) {
          const processedExample = processExampleContent(example);
          await prisma.example.create({
            data: {
              title: processedExample.title,
              description: processedExample.description || '',
              code: processedExample.code,
              explanation: processedExample.explanation,
              itemId: item.id,
              technologyId: technology.id
            }
          });
          totalExamples++;
        }
      }
    }

    console.log(`✅ ${normalizedTechName}: ${topics.length} categorias, ${totalItems} items, ${totalExamples} exemplos`);
    return true;
  } catch (error) {
    console.error(`❌ ${techName}:`, error instanceof Error ? error.message : 'Erro');
    return false;
  }
}

async function migrateAll() {
  try {
    await getPrismaClient();
    console.log('🚀 Iniciando migração de todas as tecnologias...');

    // Limpa o banco antes de começar
    await cleanDatabase();

    const techFiles = await getTechFiles();
    console.log(`📁 Encontrados ${techFiles.length} arquivos para processar`);

    for (const tech of techFiles) {
      console.log(`\n📦 Processando ${tech.name.toUpperCase()}...`);
      await importTechnology(tech.name, tech.file);
    }
  } catch (error) {
    console.error('❌ Erro:', error instanceof Error ? error.message : 'Erro desconhecido');
  } finally {
    if (prismaInstance) {
      await prismaInstance.$disconnect();
      prismaInstance = null;
    }
  }
}

migrateAll().catch(error => {
  console.error('🔥 Erro fatal:', error);
  process.exit(1);
});