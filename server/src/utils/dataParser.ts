interface Example {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

interface ExampleCategory {
  category: string;
  items: {
    id: string;
    title: string;
  }[];
}

function cleanAndLogContent(content: string, filename: string) {
  console.log(`\n🔍 Analisando ${filename}:`);
  
  // Remove comentários e normaliza o conteúdo
  const cleaned = content
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comentários multi-linha
    .replace(/\/\/.*$/gm, '')          // Remove comentários de linha
    .replace(/\r\n/g, '\n')           // Normaliza quebras de linha
    .trim();

  // Encontra todas as exportações
  const exports = cleaned.match(/export\s+const\s+\w+/g) || [];
  console.log('Exports encontrados:', exports);
  
  return cleaned;
}

function parseTopicsFromContent(content: string): ExampleCategory[] {
  try {
    // Busca específica por topics com diferentes formatos
    const topicsMatches = content.match(/export\s+const\s+topics[^=]+=\s*(\[[\s\S]*?];)/m);
    
    if (!topicsMatches) {
      console.error('❌ Estrutura de topics não encontrada');
      return [];
    }

    let topicsContent = topicsMatches[1].trim();
    // Remove ponto e vírgula final se existir
    topicsContent = topicsContent.replace(/;$/, '');

    try {
      const topics = Function(`return ${topicsContent}`)();
      console.log(`✅ Topics parseados com sucesso: ${topics.length} itens`);
      return topics;
    } catch (evalError) {
      console.error('Erro ao avaliar topics:', evalError);
      console.log('Conteúdo problemático:', topicsContent.substring(0, 200));
      return [];
    }
  } catch (error) {
    console.error('Erro ao extrair topics:', error);
    return [];
  }
}

function parseExamplesFromContent(content: string, prefix: string): Record<string, Example> {
  try {
    // Procura por padrões de exemplos com o prefixo específico
    const patterns = [
      `examples${prefix}`,
      `${prefix}Examples`,
      'examples'
    ];

    for (const pattern of patterns) {
      const examplesMatch = content.match(
        new RegExp(`export\\s+const\\s+${pattern}[^=]+=\\s*({[\\s\\S]*?\\n});`, 'm')
      );

      if (examplesMatch) {
        let examplesContent = examplesMatch[1].trim();
        try {
          const examples = Function(`return ${examplesContent}`)();
          const count = Object.keys(examples).length;
          console.log(`✅ Examples parseados com sucesso: ${count} itens`);
          return examples;
        } catch (evalError) {
          console.error(`Erro ao avaliar examples (${pattern}):`, evalError);
        }
      }
    }

    console.error('❌ Nenhum padrão de examples encontrado');
    return {};
  } catch (error) {
    console.error('Erro ao extrair examples:', error);
    return {};
  }
}

export function parseFile(content: string, filename: string) {
  // Limpa e analisa o conteúdo primeiro
  const cleanContent = cleanAndLogContent(content, filename);
  
  // Extrai o prefixo do nome do arquivo
  const prefix = filename.replace(/examples\.ts$/, '');
  
  // Parse os dados
  const topics = parseTopicsFromContent(cleanContent);
  const examples = parseExamplesFromContent(cleanContent, prefix);

  // Validação final
  const isValid = topics.length > 0 && Object.keys(examples).length > 0;
  if (!isValid) {
    console.error('⚠️ Arquivo não contém todos os dados necessários:', {
      hasTopics: topics.length > 0,
      hasExamples: Object.keys(examples).length > 0
    });
  }

  return { topics, examples };
}

export { Example, ExampleCategory };
