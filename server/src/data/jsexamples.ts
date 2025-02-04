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
    category: "Fundamentos JavaScript",
    items: [
      { id: "tipos", title: "Tipos de Dados" },
      { id: "variaveis", title: "Variáveis e Escopo" },
      { id: "operadores", title: "Operadores" },
      { id: "comentarios", title: "Comentários e Boas Práticas" },
    ],
  },
  {
    category: "Estruturas de Dados",
    items: [
      { id: "arrays", title: "Arrays e Métodos" },
      { id: "objetos", title: "Objetos e Propriedades" },
      { id: "strings", title: "Strings e Métodos" },
    ],
  },
  {
    category: "Controle de Fluxo",
    items: [
      { id: "condicionais", title: "Condicionais (if/else, switch)" },
      { id: "loops", title: "Loops (for, while, forEach)" },
      { id: "exceptions", title: "Tratamento de Erros " },
      { id: "asyncAwait", title: "Async/Await" },
    ],
  },
  {
    category: "Funções",
    items: [
      { id: "funcoesBasicas", title: "Declaração de Funções" },
      { id: "funcoesArrow", title: "Arrow Functions" },
      { id: "funcoesRecursivas", title: "Funções Recursivas" },
      { id: "funcoesAnonimas", title: "Funções Anônimas" },
      { id: "callbacks", title: "Callbackse e Promises" },
      { id: "closures", title: "Closures e Contexto Léxico" },
      { id: "bindCallApply", title: "Bind, Call e Apply" },
    ],
  },
  {
    category: "Conceitos Avançados",
    items: [
      { id: "hoisting", title: "Hoisting" },
      { id: "eventLoop", title: "Event Loop e Assíncrono" },
      { id: "prototypeHeranca", title: "Prototype e Herança" },
      { id: "iteradoresGenerators", title: "Iteradores e Generators" },
      { id: "promisesAvancadas", title: "Promises Avançadas" },
    ],
  },
  {
    category: "Manipulação do DOM",
    items: [
      { id: "domIntro", title: "Introdução ao DOM" },
      { id: "domSelectors", title: "Seletores DOM" },
      { id: "eventListeners", title: "Manipulação de Eventos" },
      { id: "criacaoElementos", title: "Manipulação de Elementos" },
      { id: "classesDom", title: "Classes e Estilização" },
    ],
  },
];



export const examples: Record<string, Example> = {
  tipos: {
    title: "Tipos de dados",
    description: "Conceitos básicos e essenciais de JavaScript."  ,
    code: `
 Tipos primitivos
let texto = "Olá";
 retorno: "Olá"

let numero = 42;
 retorno: 42

let boolean = true; ou false
 retorno: true

let nulo = null;
 retorno: null

let indefinido;
 retorno: undefined

 Exemplo de tipos de dados
let objeto = { chave: "valor" };  object
let lista = [1, 2, 3];  array

    `,
    explanation: `
Tipos primitivos:
- string: Representa textos e caracteres.
- number: Representa números, tanto inteiros quanto decimais.
- boolean: Representa valores verdadeiro (true) ou falso (false).
- null: Representa a ausência intencional de valor.
- undefined: Representa uma variável que não foi atribuída.
- object: para objetos, que podem armazenar coleções de dados.
- array: uma forma de objeto para listas de dados.
    `,
  },
  variaveis: {
    title: "Variáveis e Escopo",
    description: "Declaração de variáveis e regras de escopo.",
    code: `
 Declarando variáveis
let nome = "Maria";  Variável de escopo de bloco
const idade = 30;    Variável de valor constante
var cidade = "São Paulo";  Variável com escopo global

function saudacao() {
  let mensagem = "Olá";
  console.log(mensagem);
  console.log(nome);
  console.log(cidade);  'cidade' está disponível por ser var
}

saudacao();
 retorno: "Olá", "Maria", "São Paulo"
    `,
    explanation: `
- let: Variáveis com escopo de bloco.
- const: Variáveis com valor constante e escopo de bloco.
- var: Variáveis com escopo de função ou global (dependendo de onde são declaradas).
- Funções possuem seu próprio escopo local.
    `,
  },
  operadores: {
    title: "Operadores",
    description: "Operadores utilizados em JavaScript para manipulação de dados.",
    code: `
 Operadores aritméticos
let soma = 5 + 3;  8
let subtracao = 5 - 3;  2
let multiplicacao = 5 * 3;  15
let divisao = 5 / 3;  1.6666...

 Operadores de comparação
let igual = 5 == 5;  true
let diferente = 5 != 3;  true
let maiorQue = 5 > 3;  true
let menorQue = 5 < 3;  false

 Operadores lógicos
let e = true && false;  false
let ou = true || false;  true
let negacao = !true;  false
    `,
    explanation: `
Operadores aritméticos: Realizam operações matemáticas como soma (+), subtração (-), multiplicação (*), e divisão (/).
Operadores de comparação: Comparam valores, como igual (==), diferente (!=), maior que (>), e menor que (<).
Operadores lógicos: Operações lógicas como 'e' (&&), 'ou' (||), e negação (!).
    `,
  },

  comentarios: {
    title: "Comentários e Boas Práticas",
    description: "Como usar comentários e aplicar boas práticas em JavaScript",
    code: ` Comentário de linha única
console.log("Hello World");

/* Comentário de
   múltiplas linhas */

/**
 * Comentário de documentação (JSDoc)
 * @param {number} a Primeiro número
 * @param {number} b Segundo número
 * @returns {number} A soma dos números
 */
function soma(a, b) {
    return a + b;
}

 Boas práticas de nomeação
const ID_USUARIO = 'user123';   constantes
let nomeUsuario = 'João';       variáveis
function calcularTotal() {}     funções

 Use let e const ao invés de var
const pi = 3.14;
let contador = 0;

 Indentação e formatação
function exemploFormatacao() {
    if (condicao) {
        console.log("Verdadeiro");
    } else {
        console.log("Falso");
    }
}

 Tratamento de erros
try {
     Código que pode gerar erro
    throw new Error("Exemplo de erro");
} catch (erro) {
    console.error("Erro:", erro.message);
}

 Use === ao invés de ==
if (valor === null) {
    console.log("Valor é null");
}`,
    explanation: `Comentários e boas práticas em JavaScript são fundamentais para criar código 
legível, manutenível e seguindo os padrões modernos da linguagem.

Elementos principais:
- Comentários simples:  para documentação rápida
- Comentários múltiplos: /* */ para blocos maiores
- JSDoc: /** */ para documentação formal de funções e classes
- Declarações: Prefira const e let sobre var
- Comparações: Use === e !== para comparações estritas
- Nomeação: camelCase para variáveis e funções
- Indentação: 2 ou 4 espaços consistentes
- Ponto e vírgula: Use-os ao final das instruções
- Error handling: Use try/catch para tratamento de erros`
},
  
  arrays: {
    title: "Arrays e Métodos",

    description: "Manipulação de arrays em JavaScript",
    code: ` Declaração e inicialização
let numeros = [1, 2, 3, 4, 5];
 retorno: [1, 2, 3, 4, 5]

let frutas = ["maçã", "banana", "laranja"];
 retorno: ["maçã", "banana", "laranja"]


 Métodos de adição e remoção
frutas.push("uva");              
 retorno: 4 (novo tamanho do array)
 frutas agora é: ["maçã", "banana", "laranja", "uva"]

let ultima = frutas.pop();       
 retorno: "uva"
 frutas agora é: ["maçã", "banana", "laranja"]

frutas.unshift("morango");       
 retorno: 4 (novo tamanho do array)
 frutas agora é: ["morango", "maçã", "banana", "laranja"]

let primeira = frutas.shift();   
 retorno: "morango"
 frutas agora é: ["maçã", "banana", "laranja"]

frutas.splice(1, 2, "pera");    
 retorno: ["banana", "laranja"] (elementos removidos)
 frutas agora é: ["maçã", "pera"]


 Métodos de transformação
let dobrados = numeros.map(n => n * 2);
 retorno: [2, 4, 6, 8, 10]

let pares = numeros.filter(n => n % 2 === 0);
 retorno: [2, 4]

let soma = numeros.reduce((acc, n) => acc + n, 0);
 retorno: 15


 Métodos de busca
let indice = frutas.indexOf("banana");
 retorno: 1 (ou -1 se não encontrar)

let temMaca = frutas.includes("maçã");
 retorno: true

let encontrado = numeros.find(n => n > 3);
 retorno: 4 (ou undefined se não encontrar)

let algumMaior3 = numeros.some(n => n > 3);
 retorno: true

let todosMaior0 = numeros.every(n => n > 0);
 retorno: true


 Ordenação e outras operações
let ordenados = [...numeros].sort((a, b) => a - b);
 retorno: [1, 2, 3, 4, 5]

let parte = numeros.slice(1, 3);
 retorno: [2, 3]

let juntado = numeros.join(", ");
 retorno: "1, 2, 3, 4, 5"


 Iteração
numeros.forEach((n, i) => {
    console.log(\`Número \${n} no índice \${i}\`);
});
 não tem retorno, apenas exibe no console

 Map com arrow function
let stringNumeros = numeros.map(n => n.toString());
 retorno: ["1", "2", "3", "4", "5"]

 Filter com diferentes tipos
let itens = ["a", 1, "b", 2];
let apenasStrings = itens.filter(item => typeof item === "string");
 retorno: ["a", "b"]`,
    explanation: ` Declaração e inicialização
Arrays em JavaScript são estruturas dinâmicas que podem armazenar qualquer tipo de dado
Podem ser criados usando colchetes [] ou new Array()


 Métodos de adição e remoção
.push() - Adiciona elementos ao final do array e retorna o novo tamanho
.pop() - Remove o último elemento e o retorna
.unshift() - Adiciona elementos no início e retorna o novo tamanho
.shift() - Remove o primeiro elemento e o retorna
.splice() - Permite remover e adicionar elementos em qualquer posição


 Métodos de transformação
.map() - Cria um novo array transformando cada elemento
.filter() - Cria um novo array com elementos que passam no teste
.reduce() - Reduz o array a um único valor


 Métodos de busca
.indexOf() - Retorna a posição do elemento ou -1 se não encontrar
.includes() - Retorna true/false se o elemento existe
.find() - Retorna o primeiro elemento que satisfaz a condição
.some() - Verifica se algum elemento satisfaz a condição
.every() - Verifica se todos os elementos satisfazem a condição


 Ordenação e outras operações
.sort() - Ordena os elementos (use comparador para números)
.slice() - Extrai uma parte do array
.join() - Converte o array em string com separador


 Iteração
.forEach() - Executa uma função para cada elemento
Arrow functions tornam o código mais conciso
Spread operator (...) cria cópias de arrays`,
  },

  objetos: {
    title: "Objetos e Métodos",
    description: "Trabalhando com objetos em JavaScript",
    code: ` Criação de objetos
const pessoa = {
    nome: "Maria",
    idade: 30
};
 retorno: { nome: "Maria", idade: 30 }


 Métodos do Object
const chaves = Object.keys(pessoa);
 retorno: ["nome", "idade"]

const valores = Object.values(pessoa);
 retorno: ["Maria", 30]

const entradas = Object.entries(pessoa);
 retorno: [["nome", "Maria"], ["idade", 30]]

const temPropriedade = Object.hasOwn(pessoa, "nome");
 retorno: true


 Acessando e modificando
pessoa.nome = "Ana";           
 retorno: "Ana"
 pessoa agora é: { nome: "Ana", idade: 30 }

pessoa["idade"] = 31;          
 retorno: 31
 pessoa agora é: { nome: "Ana", idade: 31 }

delete pessoa.email;           
 retorno: true


 Spread e Rest
const pessoaCompleta = {
    ...pessoa,
    email: "ana@email.com"
};
 retorno: { nome: "Ana", idade: 31, email: "ana@email.com" }

const { nome, ...resto } = pessoaCompleta;
 retorno para nome: "Ana"
 retorno para resto: { idade: 31, email: "ana@email.com" }


 Object.freeze
const pessoaImutavel = Object.freeze(pessoa);
 Tentativa de modificação não terá efeito em modo strict
 pessoaImutavel.nome = "João";  Erro em strict mode


 Getters e Setters
const conta = {
    saldo: 0,
    get saldoFormatado() {
        return \`R$ \${this.saldo.toFixed(2)}\`;
    },
    deposito(valor) {
        this.saldo += valor;
    }
};
 uso:
conta.deposito(100);
 retorno do saldoFormatado: "R$ 100.00"


 Verificação de tipo de objeto
const veiculo = { tipo: "carro", portas: 4 };

function ehCarro(veiculo) {
    return veiculo.tipo === "carro";
}

if (ehCarro(veiculo)) {
    console.log(veiculo.portas);
}
 retorno do console.log: 4


 Objetos como dicionários
const dicionario = {
    "um": 1,
    "dois": 2
};
 retorno: { "um": 1, "dois": 2 }


 Acessando propriedades dinamicamente
function getProp(obj, key) {
    return obj[key];
}
const nomePessoa = getProp(pessoa, "nome");
 retorno: "Ana"


 Object descriptors
Object.defineProperty(pessoa, 'idade', {
    value: 31,
    writable: false,     não pode ser alterado
    enumerable: true,    aparece em loops
    configurable: false  não pode ser deletado
});

 Criando objetos com prototypes
const pessoaProto = {
    saudacao() {
        return \`Olá, meu nome é \${this.nome}\`;
    }
};

const novaPessoa = Object.create(pessoaProto, {
    nome: {
        value: 'João',
        writable: true,
        enumerable: true
    }
});
 uso:
novaPessoa.saudacao();
 retorno: "Olá, meu nome é João"`,
    explanation: ` Criação de objetos
Objetos podem ser criados usando a notação literal {} ou Object.create()
Propriedades podem ser adicionadas dinamicamente


 Métodos do Object
Object.keys() - Retorna array com os nomes das propriedades
Object.values() - Retorna array com os valores das propriedades
Object.entries() - Retorna array de pares [chave, valor]
Object.hasOwn() - Verifica se a propriedade pertence ao objeto


 Acessando e modificando
Notação ponto (obj.prop) - Acesso direto a propriedades
Notação colchetes (obj["prop"]) - Acesso dinâmico a propriedades
delete - Remove propriedades do objeto


 Spread e Rest
... spread - Copia todas as propriedades de um objeto
... rest - Coleta propriedades restantes em um novo objeto


 Object.freeze
Torna o objeto imutável
Modificações são ignoradas em modo strict
Útil para dados que não devem ser alterados


 Getters e Setters
get - Define propriedade computada
set - Define função para alterar propriedade
Permite encapsulamento e lógica personalizada


 Verificação de tipo de objeto
Funções podem verificar propriedades específicas
Útil para trabalhar com diferentes tipos de objetos
Permite código condicional baseado no tipo


 Objetos como dicionários
Podem usar strings como chaves
Útil para mapear valores
Acesso dinâmico a propriedades


 Object descriptors
Permitem controle fino sobre propriedades
Podem definir propriedades como imutáveis
Controlam enumeração e configuração


 Prototypes
Base para herança em JavaScript
Permitem compartilhar métodos entre objetos
Fundamental para programação orientada a objetos em JS`,
  },

  strings: {
    title: "Strings e Métodos",
    description: "Manipulação de strings em JavaScript",
    code: ` Criação de strings
let aspasSimples = 'texto simples';
 retorno: "texto simples"

let aspasDuplas = "texto com aspas";
 retorno: "texto com aspas"

let variavel = "mundo";
let template = \`Olá \${variavel}\`;
 retorno: "Olá mundo"


 Métodos de busca
let texto = "JavaScript é incrível";

let tamanho = texto.length;
 retorno: 21

let posicao = texto.indexOf("é");
 retorno: 11

let ultimaPosicao = texto.lastIndexOf("i");
 retorno: 19

let inclui = texto.includes("Script");
 retorno: true

let comeca = texto.startsWith("Java");
 retorno: true

let termina = texto.endsWith("vel");
 retorno: true

let buscaRegex = texto.search(/é/);
 retorno: 11

let match = texto.match(/[A-Z]/g);
 retorno: ["J", "S"]


 Métodos de transformação
let maiusculas = texto.toUpperCase();
 retorno: "JAVASCRIPT É INCRÍVEL"

let minusculas = texto.toLowerCase();
 retorno: "javascript é incrível"

let textoComEspacos = "  texto com espaços  ";
let semEspacos = textoComEspacos.trim();
 retorno: "texto com espaços"

let semEspacosInicio = textoComEspacos.trimStart();
 retorno: "texto com espaços  "

let semEspacosFim = textoComEspacos.trimEnd();
 retorno: "  texto com espaços"

let substituido = texto.replace("incrível", "fantástico");
 retorno: "JavaScript é fantástico"

let substituicaoGlobal = "ana banana".replace(/ana/g, "ada");
 retorno: "ada bada"

let partes = texto.split(" ");
 retorno: ["JavaScript", "é", "incrível"]


 Extração de substrings
let sub1 = texto.substring(0, 4);
 retorno: "Java"

let sub2 = texto.slice(4, 10);
 retorno: "Script"

let sub3 = texto.slice(-9);
 retorno: "incrível"

let caractere = texto.charAt(0);
 retorno: "J"

let codigo = texto.charCodeAt(0);
 retorno: 74


 Template literals
const nome = "João";
const idade = 30;
const info = \`Nome: \${nome}, Idade: \${idade}\`;
 retorno: "Nome: João, Idade: 30"

 Template multiline
const mensagem = \`
  Primeira linha
  Segunda linha
  Terceira linha
\`;
 retorno: "\n  Primeira linha\n  Segunda linha\n  Terceira linha\n"


 Padronização de strings
let preenchido = "123".padStart(5, "0");
 retorno: "00123"

let preenchidoFim = "123".padEnd(5, "0");
 retorno: "12300"

let repetido = "abc".repeat(3);
 retorno: "abcabcabc"

 Métodos de comparação
let comparacao = "a".localeCompare("b");
 retorno: -1 (a vem antes de b)

 Conversão de outros tipos para string
let numero = 123;
let stringNumero = String(numero);
 retorno: "123"

let array = [1, 2, 3];
let stringArray = array.toString();
 retorno: "1,2,3"`,
    explanation: ` Criação de strings
Strings podem ser criadas com aspas simples (''), duplas ("") ou backticks (\`\`)
Template literals (\`\`) permitem interpolação de variáveis e strings multiline


 Métodos de busca
.length - Retorna o número de caracteres
.indexOf() - Encontra a primeira posição de uma substring
.lastIndexOf() - Encontra a última posição de uma substring
.includes() - Verifica se contém uma substring
.startsWith() - Verifica se começa com uma substring
.endsWith() - Verifica se termina com uma substring
.search() - Busca usando expressão regular
.match() - Retorna array com correspondências de regex


 Métodos de transformação
.toUpperCase() - Converte para maiúsculas
.toLowerCase() - Converte para minúsculas
.trim() - Remove espaços no início e fim
.trimStart() - Remove espaços apenas no início
.trimEnd() - Remove espaços apenas no fim
.replace() - Substitui texto ou padrão
.split() - Divide a string em um array


 Extração de substrings
.substring() - Extrai parte da string por posição
.slice() - Similar ao substring, mas aceita índices negativos
.charAt() - Retorna o caractere em uma posição
.charCodeAt() - Retorna o código ASCII do caractere


 Template literals
Permitem interpolação com \${expressão}
Suportam múltiplas linhas sem caracteres especiais
Úteis para criar strings complexas


 Padronização de strings
.padStart() - Preenche o início até um tamanho específico
.padEnd() - Preenche o final até um tamanho específico
.repeat() - Repete a string um número de vezes


 Conversões
String() - Converte outros tipos para string
.toString() - Método alternativo para conversão
.localeCompare() - Compara strings considerando localização`,
  },
  condicionais: {
    title: "Controle de Fluxo - Condicionais",
    description: "Controle de fluxo essencial em JavaScript usando if/else e switch.",
    code: `
 Condicionais (if/else, switch)
let idade = 20;

 Usando if/else
if (idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}
 retorno: "Maior de idade"

let dia = "segunda-feira";

 Usando switch
switch (dia) {
  case "segunda-feira":
    console.log("Início da semana");
    break;
  case "sexta-feira":
    console.log("Final de semana chegando");
    break;
  default:
    console.log("Meio da semana");
}
 retorno: "Início da semana"
    `,
    explanation: `
Condicionais:
- if/else: Verifica uma condição e executa um bloco de código se for verdadeira, caso contrário, executa outro bloco.
- switch: Serve para verificar uma variável contra diferentes valores, executando um bloco de código correspondente ao valor.
    `,
  },

loops: {
    title: "Controle de Fluxo - Loops",
    description: "Controle de fluxo essencial em JavaScript usando loops.",
    code: `
 Loops (for, while, for...of)
let numeros = [1, 2, 3, 4, 5];

 Usando for
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}
 retorno: 1, 2, 3, 4, 5

 Usando while
let contador = 0;
while (contador < 3) {
  console.log("Contagem:", contador);
  contador++;
}
 retorno: "Contagem: 0", "Contagem: 1", "Contagem: 2"

 Usando for...of
for (let numero of numeros) {
  console.log(numero);
}
 retorno: 1, 2, 3, 4, 5
    `,
    explanation: `
Loops:
- for: Ideal para percorrer arrays ou executar um bloco de código um número específico de vezes.
- while: Executa um bloco de código enquanto uma condição for verdadeira.
- for...of: Utilizado para percorrer elementos de objetos iteráveis (como arrays, strings, maps, etc.). Ao contrário do for, o for...of itera diretamente sobre os valores, e não sobre os índices.
    `,
  },

  exceptions: {
    title: "Tratamento de Erros",
    description: "Como tratar erros em JavaScript usando try/catch.",
    code: `
 Tratamento de Erros
try {
  let resultado = 10 / 0;
  if (resultado === Infinity) {
    throw new Error("Divisão por zero!");
  }
  console.log(resultado);
} catch (error) {
  console.log("Erro:", error.message);
}
 retorno: "Erro: Divisão por zero!"
    `,
    explanation: `
Tratamento de Erros:
- try/catch: Usado para capturar erros que podem ocorrer em tempo de execução e tratá-los sem interromper a execução do programa. O bloco try contém o código que pode gerar erros, e o bloco catch trata o erro.
    `,
  },
  asyncAwait: {
    title: "Funções - Async/Await",
    description: "Funções essenciais em JavaScript, incluindo async/await.",
    code: `
 Async/Await
async function obterDados(url: string): Promise<string> {
  const dados = await buscarDados(url);
  return dados;
}

async function exibirDados() {
  const mensagem = await obterDados("https:api.exemplo.com");
  console.log(mensagem);
}
 chamada da função
exibirDados();
 retorno (após 2 segundos): "Dados recebidos de https:api.exemplo.com"
    `,
    explanation: `
Async/Await:
- Async/Await é uma forma mais moderna de trabalhar com operações assíncronas. Com \`async\`, a função sempre retorna uma Promise, e com \`await\`, podemos esperar o resultado de uma Promise antes de continuar a execução do código.
    `,
  },

  funcoesBasicas: {
    title: "Funções - Declaração de Funções",
    description: "Funções essenciais em JavaScript, incluindo declaração de funções tradicionais.",
    code: `
 Declaração de Funções
function saudacao(nome: string): string {
  return \`Olá, \${nome}!\`;
}
 Chamada da função
let mensagem = saudacao("Maria");
 retorno: "Olá, Maria!"
    `,
    explanation: `
Declaração de Funções:
- Funções tradicionais são declaradas com a palavra-chave \`function\`. Elas possuem um nome, podem receber parâmetros e retornar valores. São úteis quando a função precisa ser reutilizada em várias partes do código.
    `,
  },

  funcoesArrow: {
    title: "Arrow Functions",
    description: "Sintaxe moderna para funções em JavaScript",
    code: ` Arrow function básica
 const soma = (a, b) => a + b;
 console.log(soma(5, 3));  retorno: 8
 
  Arrow function com múltiplas linhas
 const multiplicar = (a, b) => {
    const resultado = a * b;
    return resultado;
 };
 
  Arrow function sem parâmetros
 const saudacao = () => "Olá!";
 
  Arrow function com um parâmetro
 const dobrar = x => x * 2;
  Parênteses opcionais com um parâmetro
 
  Arrow function retornando objeto
 const criarUsuario = (nome, idade) => ({
    nome: nome,
    idade: idade
 });
 
  Arrow functions em arrays
 const numeros = [1, 2, 3, 4, 5];
 const dobrados = numeros.map(n => n * 2);
  retorno: [2, 4, 6, 8, 10]
 
  Como callback
 setTimeout(() => {
    console.log("Executado após 1 segundo");
 }, 1000);
 
  Arrow function com default parameters
 const somar = (a = 0, b = 0) => a + b;
 console.log(somar());      retorno: 0
 console.log(somar(5));     retorno: 5
 console.log(somar(5, 3));  retorno: 8
 
  Arrow function em métodos de array
 const frutas = ['maçã', 'banana', 'uva'];
 const maiusculas = frutas.map(fruta => fruta.toUpperCase());
  retorno: ['MAÇÃ', 'BANANA', 'UVA']
 
  Filtrando com arrow function
 const numeros = [1, 2, 3, 4, 5, 6];
 const pares = numeros.filter(num => num % 2 === 0);
  retorno: [2, 4, 6]`,
    explanation: `Arrow Functions são uma forma mais concisa de escrever funções em JavaScript, 
 introduzidas no ES6. Elas oferecem uma sintaxe mais limpa e um comportamento específico do this.
 
 Elementos principais:
 - Sintaxe concisa: Menos código para funções simples
 - this léxico: Mantém o contexto do escopo envolvente
 - Retorno implícito: Uma linha retorna automaticamente
 - Parâmetros: Flexibilidade na declaração
 - Callbacks: Ideal para funções de callback
 - Métodos de array: Perfeita para map, filter, reduce`
 },

funcoesRecursivas: {
    title: "Funções - Recursivas",
    description: "Funções essenciais em JavaScript, incluindo funções recursivas.",
    code: `
 Funções Recursivas
function fatorial(n: number): number {
  if (n <= 1) return 1;
  return n * fatorial(n - 1);
}
 Chamada da função
let resultadoFatorial = fatorial(5);
 retorno: 120
    `,
    explanation: `
Funções Recursivas:
- Funções recursivas são aquelas que se chamam dentro de si mesmas. Elas são frequentemente usadas para resolver problemas que podem ser decompostos em subproblemas, como o cálculo de um fatorial.
    `,
  },
  funcoesAnonimas: {
    title: "Funções Anônimas em JavaScript",
    description: "Criando e usando funções anônimas (funções sem nome)",
    code: ` Função anônima básica
 const saudacao = function() {
    console.log("Olá!");
 };
  uso: saudacao();
 
  Função anônima com parâmetros
 const soma = function(a, b) {
    return a + b;
 };
  uso: console.log(soma(5, 3));  retorno: 8
 
  Função anônima como callback
 setTimeout(function() {
    console.log("Executado após 2 segundos");
 }, 2000);
 
  IIFE (Immediately Invoked Function Expression)
 (function() {
    const mensagem = "Esta função executa imediatamente";
    console.log(mensagem);
 })();
 
  Função anônima em evento
 button.addEventListener('click', function(event) {
    console.log("Botão clicado!");
    event.preventDefault();
 });
 
  Função anônima com arrow function
 const multiplicar = (a, b) => a * b;
  uso: console.log(multiplicar(4, 2));  retorno: 8
 
  Função anônima como método de objeto
 const calculadora = {
    somar: function(a, b) {
        return a + b;
    },
     Sintaxe curta em objetos
    subtrair(a, b) {
        return a - b;
    }
 };
  uso: console.log(calculadora.somar(5, 3));  retorno: 8`,
    explanation: `Funções anônimas são funções sem nome que podem ser atribuídas a variáveis ou passadas 
 como argumentos. São fundamentais para callbacks e programação funcional em JavaScript.
 
 Elementos principais:
 - Expressão de função: Função atribuída a uma variável
 - Arrow Function: Sintaxe curta (=>) para funções anônimas
 - Callbacks: Funções passadas como argumentos
 - IIFE: Funções auto-executáveis
 - Event Handlers: Usadas em eventos
 - Métodos de objeto: Funções como propriedades`
 },

callbacks: {
    title: "Funções - Callbacks e Promises",
    description: "Funções essenciais em JavaScript, incluindo callbacks.",
    code: `
 Callbacks
function fetchDados(url: string, callback: (dados: string) => void): void {
  setTimeout(() => {
    callback(\`Dados recebidos de \${url}\`);
  }, 2000);
}

fetchDados("https:api.exemplo.com", (mensagem) => {
  console.log(mensagem);
});
 retorno (após 2 segundos): "Dados recebidos de https:api.exemplo.com"

 Promises
function buscarDados(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(\`Dados recebidos de \${url}\`);
    }, 2000);
  });
}

buscarDados("https:api.exemplo.com")
  .then((dados) => console.log(dados))
  .catch((erro) => console.error(erro));
 retorno (após 2 segundos): "Dados recebidos de https:api.exemplo.com"
    `,
    explanation: `
Callbacks:
- Callbacks são funções passadas como argumento para outra função e executadas posteriormente, geralmente após a conclusão de uma tarefa assíncrona. No exemplo, usamos \`setTimeout\` para simular uma operação assíncrona e chamar o callback após um tempo determinado.

Promises:
- Promises são usadas para representar operações assíncronas em JavaScript. Elas têm três estados: pending, fulfilled e rejected. Utilizamos \`.then()\` para tratar a resolução e \`.catch()\` para capturar erros.
    `,
  },

  closures: {
    title: "Conceitos Avançados - Closures",
    description: "Conceitos avançados importantes em JavaScript, incluindo closures.",
    code: `
 Closures
function criarContador() {
  let contador = 0;
  return function incrementar() {
    contador++;
    return contador;
  };
}

const contador1 = criarContador();
const contador2 = criarContador();

console.log(contador1());  retorno: 1
console.log(contador1());  retorno: 2
console.log(contador2());  retorno: 1
    `,
    explanation: `
Closures:
- Closures ocorrem quando uma função é capaz de "lembrar" e acessar variáveis de seu escopo de criação, mesmo após a função externa ter sido executada. No exemplo, a função incrementar tem acesso à variável contador, mesmo após a execução de criarContador(). Isso é possível porque incrementar é uma closure.
    `,
  },

  bindCallApply: {
    title: "Bind, Call e Apply em JavaScript",
    description: "Controlando o contexto 'this' e executando funções com diferentes contextos",
    code: ` Exemplo com método bind()
 const pessoa = {
    nome: "João",
    saudacao: function() {
        return "Olá, eu sou " + this.nome;
    }
 };
 
 const outraPessoa = {
    nome: "Maria"
 };
 
  Criando nova função com bind
 const saudacaoMaria = pessoa.saudacao.bind(outraPessoa);
 console.log(saudacaoMaria());
  retorno: "Olá, eu sou Maria"
 
  Exemplo com call()
 function mostrarDetalhes(idade, cidade) {
    console.log(\`\${this.nome} tem \${idade} anos e mora em \${cidade}\`);
 }
 
 mostrarDetalhes.call(pessoa, 30, "São Paulo");
  retorno: "João tem 30 anos e mora em São Paulo"
 
  Exemplo com apply()
 const args = [25, "Rio de Janeiro"];
 mostrarDetalhes.apply(outraPessoa, args);
  retorno: "Maria tem 25 anos e mora em Rio de Janeiro"
 
  Exemplo prático com bind
 class Contador {
    constructor() {
        this.count = 0;
         Garantindo que 'this' seja sempre Contador
        this.incrementar = this.incrementar.bind(this);
    }
 
    incrementar() {
        this.count++;
        console.log(this.count);
    }
 }
 
 const meuContador = new Contador();
 const btnIncrement = document.getElementById('btn');
 btnIncrement.addEventListener('click', meuContador.incrementar);
 
  Exemplo com call em herança
 function Animal(nome) {
    this.nome = nome;
 }
 
 function Cachorro(nome, raca) {
    Animal.call(this, nome);
    this.raca = raca;
 }
 
  Exemplo com apply para valores máximos/mínimos
 const numeros = [5, 6, 2, 3, 7];
 const max = Math.max.apply(null, numeros);
  retorno: 7
 
  Comparação entre os três
 function exibirInfo(a, b) {
    console.log(\`\${this.nome}: \${a} e \${b}\`);
 }
 
  Usando bind
 const exibirJoao = exibirInfo.bind(pessoa);
 exibirJoao("dado1", "dado2");
  retorno: "João: dado1 e dado2"
 
  Usando call
 exibirInfo.call(pessoa, "dado1", "dado2");
  retorno: "João: dado1 e dado2"
 
  Usando apply
 exibirInfo.apply(pessoa, ["dado1", "dado2"]);
  retorno: "João: dado1 e dado2"`,
    explanation: `Bind, Call e Apply são métodos fundamentais em JavaScript para controlar o contexto 
 'this' e executar funções com diferentes objetos. Cada um tem seu propósito específico.
 
 Elementos principais:
 - bind(): Cria nova função com 'this' fixo
 - call(): Executa função com 'this' e argumentos individuais
 - apply(): Executa função com 'this' e array de argumentos
 - Contexto (this): Define o objeto de referência
 - Event listeners: Comum usar bind em eventos
 - Herança: call/apply em construtores
 - Borrowed methods: Usar métodos de outros objetos`
 },

 hoisting: {
  title: "Conceitos Avançados - Hoisting",
  description: "Conceitos avançados importantes em JavaScript, incluindo hoisting.",
  code: `
 Hoisting
console.log(nome);  retorno: undefined
var nome = "João";

 Exemplo com let
try {
console.log(idade);  lança erro: Cannot access 'idade' before initialization
let idade = 25;
} catch (e) {
console.log(e.message);
}
  `,
  explanation: `
Hoisting:
- Hoisting é um comportamento do JavaScript onde variáveis e funções são movidas para o topo de seu contexto (função ou escopo global) durante a execução. No exemplo, a variável nome é "elevada" para o topo, mas como foi declarada com var, seu valor será undefined até que seja atribuído. Já com let, ocorre um erro se tentarmos acessar a variável antes da inicialização, devido ao conceito de temporal dead zone (TDZ).
  `,
},

eventLoop: {
  title: "Conceitos Avançados - Event Loop e Assíncrono",
  description: "Conceitos avançados importantes em JavaScript, incluindo o event loop e o comportamento assíncrono.",
  code: `
 Event Loop e Assíncrono
console.log("Início");

setTimeout(() => {
console.log("Execução do setTimeout");
}, 0);

console.log("Fim");
 retorno: "Início", "Fim", "Execução do setTimeout"
  `,
  explanation: `
Event Loop e Assíncrono:
- O event loop é um mecanismo que permite que JavaScript execute operações assíncronas, como callbacks e promessas, sem bloquear o fluxo de execução do programa. No exemplo, a função setTimeout é executada de forma assíncrona, mesmo com o tempo de 0 ms. Ela é colocada na fila de tarefas e só será executada depois que o call stack (pilha de execução) estiver vazio. Portanto, a sequência de execução é: "Início", "Fim", e então, após a execução do código síncrono, "Execução do setTimeout".
  `,
},

 prototypeHeranca: {
  title: "Prototype e Herança em JavaScript",
  description: "Entendendo o sistema de protótipos e herança em JavaScript",
  code: ` Construtor de objeto usando prototype
function Animal(nome) {
  this.nome = nome;
}

Animal.prototype.fazerSom = function() {
  return "Som genérico";
};

 Herança prototipal
function Cachorro(nome, raca) {
  Animal.call(this, nome);
  this.raca = raca;
}

 Estabelecendo a cadeia de protótipos
Cachorro.prototype = Object.create(Animal.prototype);
Cachorro.prototype.constructor = Cachorro;

 Sobrescrevendo método do protótipo
Cachorro.prototype.fazerSom = function() {
  return "Au au!";
};

 Exemplo de uso
const animal = new Animal("Animal");
console.log(animal.fazerSom());   "Som genérico"

const rex = new Cachorro("Rex", "Vira-lata");
console.log(rex.fazerSom());      "Au au!"

 Verificando a cadeia de protótipos
console.log(rex instanceof Cachorro);   true
console.log(rex instanceof Animal);     true

 Adicionando métodos dinamicamente
Animal.prototype.comer = function() {
  return \`\${this.nome} está comendo\`;
};

 Todos os objetos herdam o novo método
console.log(rex.comer());   "Rex está comendo"

 Object.create com propriedades
const protoGato = {
  miar() {
      return "Miau!";
  }
};

const gato = Object.create(protoGato, {
  nome: {
      value: 'Felix',
      writable: true
  }
});`,
  explanation: `Prototypes são o mecanismo de herança nativo do JavaScript, permitindo objetos 
compartilharem propriedades e métodos através de uma cadeia de protótipos.

Elementos principais:
- prototype: Objeto que serve como template
- __proto__: Referência ao protótipo
- Constructor: Função que cria objetos
- Herança: Reutilização de código
- Object.create(): Cria objetos com protótipo específico
- instanceof: Verifica cadeia de protótipos`
},

iteradoresGenerators: {
  title: "Iteradores e Generators",
  description: "Criando e usando iteradores e generators em JavaScript",
  code: ` Iterador personalizado
const meuIterador = {
  dados: [1, 2, 3, 4],
  posicaoAtual: 0,
  next() {
      return {
          done: this.posicaoAtual >= this.dados.length,
          value: this.dados[this.posicaoAtual++]
      };
  }
};

 Generator básico
function* contador() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = contador();
console.log(gen.next());  { value: 1, done: false }
console.log(gen.next());  { value: 2, done: false }
console.log(gen.next());  { value: 3, done: false }
console.log(gen.next());  { value: undefined, done: true }

 Generator infinito
function* geradorID() {
  let id = 1;
  while(true) {
      yield id++;
  }
}

 Generator com yield*
function* letras() {
  yield 'a';
  yield 'b';
}

function* numeros() {
  yield 1;
  yield* letras();     delegando para outro generator
  yield 2;
}

 Async Generator
async function* streamDados() {
  const dados = [1, 2, 3];
  for(let item of dados) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield item;
  }
}

 Usando async generator
(async () => {
  for await (const item of streamDados()) {
      console.log(item);   log a cada 1 segundo
  }
})();`,
  explanation: `Iteradores e Generators são recursos poderosos para controlar o fluxo de dados de 
forma eficiente e criar sequências sob demanda.

Elementos principais:
- Iteradores: Interface para percorrer dados
- Generators: Funções que geram sequências
- yield: Pausa execução e retorna valor
- next(): Obtém próximo valor
- Async Generators: Iteração assíncrona
- yield*: Delega para outro generator`
},

promisesAvancadas: {
  title: "Promises Avançadas",
  description: "Técnicas avançadas com Promises em JavaScript",
  code: ` Criando Promise personalizada
const minhaPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
      const sucesso = true;
      if (sucesso) {
          resolve("Operação concluída");
      } else {
          reject(new Error("Falha na operação"));
      }
  }, 1000);
});

 Encadeamento de Promises
minhaPromise
  .then(resultado => resultado.toUpperCase())
  .then(resultado => console.log(resultado))
  .catch(erro => console.error(erro))
  .finally(() => console.log("Finalizado"));

 Promise.all
const promises = [
  fetch('url1'),
  fetch('url2'),
  fetch('url3')
];

Promise.all(promises)
  .then(resultados => {
       Todos sucesso
  })
  .catch(erro => {
       Qualquer erro
  });

 Promise.race
Promise.race([
  fetch('url1'),
  new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
  )
])
.then(resultado => console.log('Resposta rápida'))
.catch(erro => console.log('Timeout ou erro'));

 Promise.allSettled
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('erro'),
  Promise.resolve(3)
])
.then(resultados => {
   Array com status de todas as promises
});

 Async/Await com tratamento de erro
async function exemploAsyncAwait() {
  try {
      const resultado1 = await fetch('url1');
      const resultado2 = await fetch('url2');
      return [resultado1, resultado2];
  } catch (erro) {
      console.error('Erro:', erro);
      throw erro;
  }
}

 Promise com cancelamento
function promiseCancelavel() {
  let cancelar;
  
  const promise = new Promise((resolve, reject) => {
      cancelar = () => reject('Cancelado');
       ... lógica normal
  });

  return { promise, cancelar };
}`,
  explanation: `Promises avançadas permitem gerenciar operações assíncronas complexas de forma 
elegante e controlada.

Elementos principais:
- Promise.all: Executa múltiplas promises em paralelo
- Promise.race: Retorna primeira promise concluída
- Promise.allSettled: Status de todas as promises
- Encadeamento: Sequência de operações
- Cancelamento: Interromper operações
- Error handling: Tratamento de erros robusto`
},
domIntro: {
  title: "Introdução ao DOM",
  description: "Entendendo o Document Object Model (DOM) em JavaScript",
  code: ` Estrutura básica do DOM
document.documentElement   elemento <html>
document.head             elemento <head>
document.body             elemento <body>

 Navegando pelo DOM
const pai = elemento.parentNode;
const filhos = elemento.childNodes;
const primeiro = elemento.firstChild;
const ultimo = elemento.lastChild;
const proximo = elemento.nextSibling;
const anterior = elemento.previousSibling;

 Tipos de nós
console.log(elemento.nodeType);   1: Elemento, 3: Texto
console.log(elemento.nodeName);   Tag name em maiúsculo
console.log(elemento.nodeValue);  Conteúdo do nó

 Propriedades do documento
console.log(document.title);      Título da página
console.log(document.URL);        URL completa
console.log(document.domain);     Domínio do site
console.log(document.charset);    Codificação

 Verificando estado do documento
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado');
});

 Acessando elemento raiz
const root = document.documentElement;
console.log(root.lang);          Idioma do documento`,
  explanation: `O DOM (Document Object Model) é uma interface de programação para documentos HTML/XML. 
Representa a página como uma árvore de objetos que pode ser manipulada via JavaScript.

Elementos principais:
- document: Objeto raiz do DOM
- Nós: Elementos, texto, comentários
- Navegação: Entre nós pai/filho/irmãos
- Propriedades: Acesso a informações
- Eventos: Resposta a ações do usuário
- Estados: Carregamento e prontidão`
},

domSelectors: {
  title: "Seletores DOM",
  description: "Diferentes formas de selecionar elementos no DOM",
  code: ` Seletor por ID
const elemento = document.getElementById('meuId');

 Seletores por classe
const elementos = document.getElementsByClassName('minhaClasse');
const modernos = document.querySelector('.minhaClasse');
const todos = document.querySelectorAll('.minhaClasse');

 Seletores por tag
const divs = document.getElementsByTagName('div');
const primeiraDiv = document.querySelector('div');
const todasDivs = document.querySelectorAll('div');

 Seletores complexos
const nested = document.querySelector('div.classe > p');
const multiplos = document.querySelectorAll('p, span');
const filhos = document.querySelectorAll('ul > li');

 Seletores por atributo
const porAtributo = document.querySelector('[data-test]');
const valorAtributo = document.querySelector('[type="text"]');

 Encontrando elementos filhos
const pai = document.querySelector('.container');
const filhosDiretos = pai.children;
const todosDescendentes = pai.querySelectorAll('*');

 Verificando existência
const existe = document.querySelector('.classe') !== null;

 Iterando sobre resultados
const items = document.querySelectorAll('li');
items.forEach(item => {
  console.log(item.textContent);
});`,
  explanation: `Seletores DOM permitem encontrar e manipular elementos específicos na página. 
Diferentes métodos oferecem flexibilidade para selecionar elementos de várias formas.

Elementos principais:
- getElementById: Seleção por ID única
- querySelector: Seletor CSS moderno
- querySelectorAll: Múltiplos elementos
- getElementsByClassName: Por classe
- getElementsByTagName: Por tag
- Seletores aninhados: Relações pai/filho`
},

eventListeners: {
  title: "Manipulação de Eventos",
  description: "Trabalhando com eventos do DOM em JavaScript",
  code: ` Adicionando event listener
elemento.addEventListener('click', function(event) {
  console.log('Clicado!');
});

 Arrow function e evento
elemento.addEventListener('mouseover', (e) => {
  e.target.style.color = 'red';
});

 Removendo event listener
function handler(e) {
  console.log('Manipulado!');
}
elemento.addEventListener('click', handler);
elemento.removeEventListener('click', handler);

 Eventos comuns
document.addEventListener('DOMContentLoaded', () => {});
elemento.addEventListener('click', () => {});
elemento.addEventListener('mouseenter', () => {});
elemento.addEventListener('mouseleave', () => {});
elemento.addEventListener('submit', (e) => {
  e.preventDefault();  Previne comportamento padrão
});

 Propagação de eventos
elemento.addEventListener('click', (e) => {
  e.stopPropagation();  Para propagação
}, true);  Capture phase

 Delegação de eventos
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
      console.log('Li clicado:', e.target.textContent);
  }
});

 Eventos personalizados
const evento = new CustomEvent('meuEvento', {
  detail: { mensagem: 'Olá!' }
});
elemento.dispatchEvent(evento);`,
  explanation: `Eventos permitem que o JavaScript responda a ações do usuário e mudanças na página. 
São fundamentais para criar interatividade em aplicações web.

Elementos principais:
- addEventListener: Registra handlers
- removeEventListener: Remove handlers
- event object: Informações do evento
- Propagação: Bubbling e capturing
- Delegação: Eventos em elementos dinâmicos
- preventDefault: Controle de comportamento`
},

criacaoElementos: {
  title: "Manipulação de Elementos",
  description: "Criando e modificando elementos do DOM",
  code: ` Criando elementos
const div = document.createElement('div');
const texto = document.createTextNode('Olá Mundo');

 Adicionando conteúdo
div.textContent = 'Texto na div';
div.innerHTML = '<span>HTML na div</span>';

 Adicionando ao DOM
parent.appendChild(div);
parent.insertBefore(div, referenceNode);
parent.prepend(div);   Adiciona no início
parent.append(div);    Adiciona no final

 Removendo elementos
elemento.remove();
parent.removeChild(elemento);

 Clonando elementos
const clone = elemento.cloneNode(true);  true para deep clone

 Substituindo elementos
parent.replaceChild(novoElemento, antigoElemento);

 Manipulando atributos
elemento.setAttribute('class', 'minhaClasse');
elemento.getAttribute('id');
elemento.hasAttribute('data-test');
elemento.removeAttribute('style');

 Data attributes
elemento.dataset.info = 'valor';
console.log(elemento.dataset.info);

 Manipulando conteúdo
elemento.textContent = 'Novo texto';
elemento.innerHTML = '<b>HTML</b>';
elemento.innerText = 'Texto visível';`,
  explanation: `A manipulação de elementos permite criar, modificar e remover elementos do DOM 
dinamicamente, essencial para páginas web interativas.

Elementos principais:
- createElement: Cria novos elementos
- appendChild/prepend: Adiciona elementos
- remove/removeChild: Remove elementos
- cloneNode: Duplica elementos
- setAttribute: Modifica atributos
- textContent/innerHTML: Modifica conteúdo`
},

classesDom: {
  title: "Classes e Estilização",
  description: "Manipulando classes e estilos de elementos DOM",
  code: ` Manipulando classes
elemento.classList.add('novaClasse');
elemento.classList.remove('velhaClasse');
elemento.classList.toggle('classe');
elemento.classList.contains('classe');
elemento.classList.replace('velha', 'nova');

 Múltiplas classes
elemento.classList.add('classe1', 'classe2');
elemento.className = 'classe1 classe2';

 Manipulando estilos inline
elemento.style.backgroundColor = 'red';
elemento.style.fontSize = '16px';
elemento.style.marginTop = '10px';

 Obtendo estilos computados
const estilo = window.getComputedStyle(elemento);
console.log(estilo.backgroundColor);

 Manipulando CSS customizado
elemento.style.setProperty('--minha-cor', 'blue');
elemento.style.getPropertyValue('--minha-cor');

 Alterando visibilidade
elemento.style.display = 'none';
elemento.style.visibility = 'hidden';

 Animações com classes
elemento.classList.add('animate');
setTimeout(() => {
  elemento.classList.remove('animate');
}, 1000);

 Trabalhando com dimensões
const altura = elemento.offsetHeight;
const largura = elemento.offsetWidth;
const posicaoTopo = elemento.offsetTop;
const posicaoEsquerda = elemento.offsetLeft;`,
  explanation: `Classes e estilos permitem modificar a aparência e comportamento visual dos elementos 
dinamicamente via JavaScript.

Elementos principais:
- classList: Gerencia classes
- style: Estilos inline
- getComputedStyle: Estilos aplicados
- CSS Variables: Propriedades customizadas
- Dimensões: Tamanho e posição
- Animações: Transições via classe`
}
};
