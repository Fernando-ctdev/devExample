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
      { id: "loops", title: "Loops (for, while)" },
      { id: "exceptions", title: "Tratamento de Erros" },
    ],
  },
  {
    category: "Funções",
    items: [
      { id: "funcoesBasicas", title: "Declaração de Funções" },
      { id: "funcoesArrow", title: "Arrow Functions" },
      { id: "funcoesRecursivas", title: "Funções Recursivas" },
      { id: "callbacks", title: "Callbacks e Promises" },
      { id: "asyncAwait", title: "Async/Await" },
    ],
  },
  {
    category: "Conceitos Avançados",
    items: [
      { id: "closures", title: "Closures" },
      { id: "hoisting", title: "Hoisting" },
      { id: "eventLoop", title: "Event Loop e Assíncrono" },
    ],
  },
];


export const examplesjs: Record<string, Example> = {
  tipos: {
    title: "Tipos de dados",
    description: "Conceitos básicos e essenciais de JavaScript."  ,
    code: `
// Tipos primitivos
let texto = "Olá";
// retorno: "Olá"

let numero = 42;
// retorno: 42

let boolean = true; //ou false
// retorno: true

let nulo = null;
// retorno: null

let indefinido;
// retorno: undefined

// Exemplo de tipos de dados
let objeto = { chave: "valor" }; // object
let lista = [1, 2, 3]; // array

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
// Declarando variáveis
let nome = "Maria"; // Variável de escopo de bloco
const idade = 30;   // Variável de valor constante
var cidade = "São Paulo"; // Variável com escopo global

function saudacao() {
  let mensagem = "Olá";
  console.log(mensagem);
  console.log(nome);
  console.log(cidade); // 'cidade' está disponível por ser var
}

saudacao();
// retorno: "Olá", "Maria", "São Paulo"
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
// Operadores aritméticos
let soma = 5 + 3; // 8
let subtracao = 5 - 3; // 2
let multiplicacao = 5 * 3; // 15
let divisao = 5 / 3; // 1.6666...

// Operadores de comparação
let igual = 5 == 5; // true
let diferente = 5 != 3; // true
let maiorQue = 5 > 3; // true
let menorQue = 5 < 3; // false

// Operadores lógicos
let e = true && false; // false
let ou = true || false; // true
let negacao = !true; // false
    `,
    explanation: `
Operadores aritméticos: Realizam operações matemáticas como soma (+), subtração (-), multiplicação (*), e divisão (/).
Operadores de comparação: Comparam valores, como igual (==), diferente (!=), maior que (>), e menor que (<).
Operadores lógicos: Operações lógicas como 'e' (&&), 'ou' (||), e negação (!).
    `,
  },
  
  arrays: {
    title: "Arrays e Métodos",

    description: "Manipulação de arrays em JavaScript",
    code: `// Declaração e inicialização
let numeros = [1, 2, 3, 4, 5];
// retorno: [1, 2, 3, 4, 5]

let frutas = ["maçã", "banana", "laranja"];
// retorno: ["maçã", "banana", "laranja"]


// Métodos de adição e remoção
frutas.push("uva");              
// retorno: 4 (novo tamanho do array)
// frutas agora é: ["maçã", "banana", "laranja", "uva"]

let ultima = frutas.pop();       
// retorno: "uva"
// frutas agora é: ["maçã", "banana", "laranja"]

frutas.unshift("morango");       
// retorno: 4 (novo tamanho do array)
// frutas agora é: ["morango", "maçã", "banana", "laranja"]

let primeira = frutas.shift();   
// retorno: "morango"
// frutas agora é: ["maçã", "banana", "laranja"]

frutas.splice(1, 2, "pera");    
// retorno: ["banana", "laranja"] (elementos removidos)
// frutas agora é: ["maçã", "pera"]


// Métodos de transformação
let dobrados = numeros.map(n => n * 2);
// retorno: [2, 4, 6, 8, 10]

let pares = numeros.filter(n => n % 2 === 0);
// retorno: [2, 4]

let soma = numeros.reduce((acc, n) => acc + n, 0);
// retorno: 15


// Métodos de busca
let indice = frutas.indexOf("banana");
// retorno: 1 (ou -1 se não encontrar)

let temMaca = frutas.includes("maçã");
// retorno: true

let encontrado = numeros.find(n => n > 3);
// retorno: 4 (ou undefined se não encontrar)

let algumMaior3 = numeros.some(n => n > 3);
// retorno: true

let todosMaior0 = numeros.every(n => n > 0);
// retorno: true


// Ordenação e outras operações
let ordenados = [...numeros].sort((a, b) => a - b);
// retorno: [1, 2, 3, 4, 5]

let parte = numeros.slice(1, 3);
// retorno: [2, 3]

let juntado = numeros.join(", ");
// retorno: "1, 2, 3, 4, 5"


// Iteração
numeros.forEach((n, i) => {
    console.log(\`Número \${n} no índice \${i}\`);
});
// não tem retorno, apenas exibe no console

// Map com arrow function
let stringNumeros = numeros.map(n => n.toString());
// retorno: ["1", "2", "3", "4", "5"]

// Filter com diferentes tipos
let itens = ["a", 1, "b", 2];
let apenasStrings = itens.filter(item => typeof item === "string");
// retorno: ["a", "b"]`,
    explanation: `// Declaração e inicialização
Arrays em JavaScript são estruturas dinâmicas que podem armazenar qualquer tipo de dado
Podem ser criados usando colchetes [] ou new Array()


// Métodos de adição e remoção
.push() - Adiciona elementos ao final do array e retorna o novo tamanho
.pop() - Remove o último elemento e o retorna
.unshift() - Adiciona elementos no início e retorna o novo tamanho
.shift() - Remove o primeiro elemento e o retorna
.splice() - Permite remover e adicionar elementos em qualquer posição


// Métodos de transformação
.map() - Cria um novo array transformando cada elemento
.filter() - Cria um novo array com elementos que passam no teste
.reduce() - Reduz o array a um único valor


// Métodos de busca
.indexOf() - Retorna a posição do elemento ou -1 se não encontrar
.includes() - Retorna true/false se o elemento existe
.find() - Retorna o primeiro elemento que satisfaz a condição
.some() - Verifica se algum elemento satisfaz a condição
.every() - Verifica se todos os elementos satisfazem a condição


// Ordenação e outras operações
.sort() - Ordena os elementos (use comparador para números)
.slice() - Extrai uma parte do array
.join() - Converte o array em string com separador


// Iteração
.forEach() - Executa uma função para cada elemento
Arrow functions tornam o código mais conciso
Spread operator (...) cria cópias de arrays`,
  },

  objetos: {
    title: "Objetos e Métodos",
    description: "Trabalhando com objetos em JavaScript",
    code: `// Criação de objetos
const pessoa = {
    nome: "Maria",
    idade: 30
};
// retorno: { nome: "Maria", idade: 30 }


// Métodos do Object
const chaves = Object.keys(pessoa);
// retorno: ["nome", "idade"]

const valores = Object.values(pessoa);
// retorno: ["Maria", 30]

const entradas = Object.entries(pessoa);
// retorno: [["nome", "Maria"], ["idade", 30]]

const temPropriedade = Object.hasOwn(pessoa, "nome");
// retorno: true


// Acessando e modificando
pessoa.nome = "Ana";           
// retorno: "Ana"
// pessoa agora é: { nome: "Ana", idade: 30 }

pessoa["idade"] = 31;          
// retorno: 31
// pessoa agora é: { nome: "Ana", idade: 31 }

delete pessoa.email;           
// retorno: true


// Spread e Rest
const pessoaCompleta = {
    ...pessoa,
    email: "ana@email.com"
};
// retorno: { nome: "Ana", idade: 31, email: "ana@email.com" }

const { nome, ...resto } = pessoaCompleta;
// retorno para nome: "Ana"
// retorno para resto: { idade: 31, email: "ana@email.com" }


// Object.freeze
const pessoaImutavel = Object.freeze(pessoa);
// Tentativa de modificação não terá efeito em modo strict
// pessoaImutavel.nome = "João"; // Erro em strict mode


// Getters e Setters
const conta = {
    saldo: 0,
    get saldoFormatado() {
        return \`R$ \${this.saldo.toFixed(2)}\`;
    },
    deposito(valor) {
        this.saldo += valor;
    }
};
// uso:
conta.deposito(100);
// retorno do saldoFormatado: "R$ 100.00"


// Verificação de tipo de objeto
const veiculo = { tipo: "carro", portas: 4 };

function ehCarro(veiculo) {
    return veiculo.tipo === "carro";
}

if (ehCarro(veiculo)) {
    console.log(veiculo.portas);
}
// retorno do console.log: 4


// Objetos como dicionários
const dicionario = {
    "um": 1,
    "dois": 2
};
// retorno: { "um": 1, "dois": 2 }


// Acessando propriedades dinamicamente
function getProp(obj, key) {
    return obj[key];
}
const nomePessoa = getProp(pessoa, "nome");
// retorno: "Ana"


// Object descriptors
Object.defineProperty(pessoa, 'idade', {
    value: 31,
    writable: false,    // não pode ser alterado
    enumerable: true,   // aparece em loops
    configurable: false // não pode ser deletado
});

// Criando objetos com prototypes
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
// uso:
novaPessoa.saudacao();
// retorno: "Olá, meu nome é João"`,
    explanation: `// Criação de objetos
Objetos podem ser criados usando a notação literal {} ou Object.create()
Propriedades podem ser adicionadas dinamicamente


// Métodos do Object
Object.keys() - Retorna array com os nomes das propriedades
Object.values() - Retorna array com os valores das propriedades
Object.entries() - Retorna array de pares [chave, valor]
Object.hasOwn() - Verifica se a propriedade pertence ao objeto


// Acessando e modificando
Notação ponto (obj.prop) - Acesso direto a propriedades
Notação colchetes (obj["prop"]) - Acesso dinâmico a propriedades
delete - Remove propriedades do objeto


// Spread e Rest
... spread - Copia todas as propriedades de um objeto
... rest - Coleta propriedades restantes em um novo objeto


// Object.freeze
Torna o objeto imutável
Modificações são ignoradas em modo strict
Útil para dados que não devem ser alterados


// Getters e Setters
get - Define propriedade computada
set - Define função para alterar propriedade
Permite encapsulamento e lógica personalizada


// Verificação de tipo de objeto
Funções podem verificar propriedades específicas
Útil para trabalhar com diferentes tipos de objetos
Permite código condicional baseado no tipo


// Objetos como dicionários
Podem usar strings como chaves
Útil para mapear valores
Acesso dinâmico a propriedades


// Object descriptors
Permitem controle fino sobre propriedades
Podem definir propriedades como imutáveis
Controlam enumeração e configuração


// Prototypes
Base para herança em JavaScript
Permitem compartilhar métodos entre objetos
Fundamental para programação orientada a objetos em JS`,
  },

  strings: {
    title: "Strings e Métodos",
    description: "Manipulação de strings em JavaScript",
    code: `// Criação de strings
let aspasSimples = 'texto simples';
// retorno: "texto simples"

let aspasDuplas = "texto com aspas";
// retorno: "texto com aspas"

let variavel = "mundo";
let template = \`Olá \${variavel}\`;
// retorno: "Olá mundo"


// Métodos de busca
let texto = "JavaScript é incrível";

let tamanho = texto.length;
// retorno: 21

let posicao = texto.indexOf("é");
// retorno: 11

let ultimaPosicao = texto.lastIndexOf("i");
// retorno: 19

let inclui = texto.includes("Script");
// retorno: true

let comeca = texto.startsWith("Java");
// retorno: true

let termina = texto.endsWith("vel");
// retorno: true

let buscaRegex = texto.search(/é/);
// retorno: 11

let match = texto.match(/[A-Z]/g);
// retorno: ["J", "S"]


// Métodos de transformação
let maiusculas = texto.toUpperCase();
// retorno: "JAVASCRIPT É INCRÍVEL"

let minusculas = texto.toLowerCase();
// retorno: "javascript é incrível"

let textoComEspacos = "  texto com espaços  ";
let semEspacos = textoComEspacos.trim();
// retorno: "texto com espaços"

let semEspacosInicio = textoComEspacos.trimStart();
// retorno: "texto com espaços  "

let semEspacosFim = textoComEspacos.trimEnd();
// retorno: "  texto com espaços"

let substituido = texto.replace("incrível", "fantástico");
// retorno: "JavaScript é fantástico"

let substituicaoGlobal = "ana banana".replace(/ana/g, "ada");
// retorno: "ada bada"

let partes = texto.split(" ");
// retorno: ["JavaScript", "é", "incrível"]


// Extração de substrings
let sub1 = texto.substring(0, 4);
// retorno: "Java"

let sub2 = texto.slice(4, 10);
// retorno: "Script"

let sub3 = texto.slice(-9);
// retorno: "incrível"

let caractere = texto.charAt(0);
// retorno: "J"

let codigo = texto.charCodeAt(0);
// retorno: 74


// Template literals
const nome = "João";
const idade = 30;
const info = \`Nome: \${nome}, Idade: \${idade}\`;
// retorno: "Nome: João, Idade: 30"

// Template multiline
const mensagem = \`
  Primeira linha
  Segunda linha
  Terceira linha
\`;
// retorno: "\n  Primeira linha\n  Segunda linha\n  Terceira linha\n"


// Padronização de strings
let preenchido = "123".padStart(5, "0");
// retorno: "00123"

let preenchidoFim = "123".padEnd(5, "0");
// retorno: "12300"

let repetido = "abc".repeat(3);
// retorno: "abcabcabc"

// Métodos de comparação
let comparacao = "a".localeCompare("b");
// retorno: -1 (a vem antes de b)

// Conversão de outros tipos para string
let numero = 123;
let stringNumero = String(numero);
// retorno: "123"

let array = [1, 2, 3];
let stringArray = array.toString();
// retorno: "1,2,3"`,
    explanation: `// Criação de strings
Strings podem ser criadas com aspas simples (''), duplas ("") ou backticks (\`\`)
Template literals (\`\`) permitem interpolação de variáveis e strings multiline


// Métodos de busca
.length - Retorna o número de caracteres
.indexOf() - Encontra a primeira posição de uma substring
.lastIndexOf() - Encontra a última posição de uma substring
.includes() - Verifica se contém uma substring
.startsWith() - Verifica se começa com uma substring
.endsWith() - Verifica se termina com uma substring
.search() - Busca usando expressão regular
.match() - Retorna array com correspondências de regex


// Métodos de transformação
.toUpperCase() - Converte para maiúsculas
.toLowerCase() - Converte para minúsculas
.trim() - Remove espaços no início e fim
.trimStart() - Remove espaços apenas no início
.trimEnd() - Remove espaços apenas no fim
.replace() - Substitui texto ou padrão
.split() - Divide a string em um array


// Extração de substrings
.substring() - Extrai parte da string por posição
.slice() - Similar ao substring, mas aceita índices negativos
.charAt() - Retorna o caractere em uma posição
.charCodeAt() - Retorna o código ASCII do caractere


// Template literals
Permitem interpolação com \${expressão}
Suportam múltiplas linhas sem caracteres especiais
Úteis para criar strings complexas


// Padronização de strings
.padStart() - Preenche o início até um tamanho específico
.padEnd() - Preenche o final até um tamanho específico
.repeat() - Repete a string um número de vezes


// Conversões
String() - Converte outros tipos para string
.toString() - Método alternativo para conversão
.localeCompare() - Compara strings considerando localização`,
  },
  condicionais: {
    title: "Controle de Fluxo - Condicionais",
    description: "Controle de fluxo essencial em JavaScript usando if/else e switch.",
    code: `
// Condicionais (if/else, switch)
let idade = 20;

// Usando if/else
if (idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}
// retorno: "Maior de idade"

let dia = "segunda-feira";

// Usando switch
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
// retorno: "Início da semana"
    `,
    explanation: `
//Condicionais:
- if/else: Verifica uma condição e executa um bloco de código se for verdadeira, caso contrário, executa outro bloco.
- switch: Serve para verificar uma variável contra diferentes valores, executando um bloco de código correspondente ao valor.
    `,
  },

loops: {
    title: "Controle de Fluxo - Loops",
    description: "Controle de fluxo essencial em JavaScript usando loops.",
    code: `
// Loops (for, while, for...of)
let numeros = [1, 2, 3, 4, 5];

// Usando for
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}
// retorno: 1, 2, 3, 4, 5

// Usando while
let contador = 0;
while (contador < 3) {
  console.log("Contagem:", contador);
  contador++;
}
// retorno: "Contagem: 0", "Contagem: 1", "Contagem: 2"

// Usando for...of
for (let numero of numeros) {
  console.log(numero);
}
// retorno: 1, 2, 3, 4, 5
    `,
    explanation: `
//Loops:
- for: Ideal para percorrer arrays ou executar um bloco de código um número específico de vezes.
- while: Executa um bloco de código enquanto uma condição for verdadeira.
- for...of: Utilizado para percorrer elementos de objetos iteráveis (como arrays, strings, maps, etc.). Ao contrário do for, o for...of itera diretamente sobre os valores, e não sobre os índices.
    `,
  },

  exceptions: {
    title: "Tratamento de Erros",
    description: "Como tratar erros em JavaScript usando try/catch.",
    code: `
// Tratamento de Erros
try {
  let resultado = 10 / 0;
  if (resultado === Infinity) {
    throw new Error("Divisão por zero!");
  }
  console.log(resultado);
} catch (error) {
  console.log("Erro:", error.message);
}
// retorno: "Erro: Divisão por zero!"
    `,
    explanation: `
//Tratamento de Erros:
- try/catch: Usado para capturar erros que podem ocorrer em tempo de execução e tratá-los sem interromper a execução do programa. O bloco try contém o código que pode gerar erros, e o bloco catch trata o erro.
    `,
  },


  funcoesBasicas: {
    title: "Funções - Declaração de Funções",
    description: "Funções essenciais em JavaScript, incluindo declaração de funções tradicionais.",
    code: `
// Declaração de Funções
function saudacao(nome: string): string {
  return \`Olá, \${nome}!\`;
}
// Chamada da função
let mensagem = saudacao("Maria");
// retorno: "Olá, Maria!"
    `,
    explanation: `
Declaração de Funções:
- Funções tradicionais são declaradas com a palavra-chave \`function\`. Elas possuem um nome, podem receber parâmetros e retornar valores. São úteis quando a função precisa ser reutilizada em várias partes do código.
    `,
  },

funcoesArrow: {
    title: "Funções - Arrow Functions",
    description: "Funções essenciais em JavaScript, incluindo arrow functions.",
    code: `
// Arrow Functions
const soma = (a: number, b: number): number => a + b;
// Chamada da função
let resultadoSoma = soma(10, 5);
// retorno: 15
    `,
    explanation: `
Arrow Functions:
- Arrow functions são funções anônimas e mais compactas, definidas com a sintaxe \`=>\`. Elas não possuem seu próprio \`this\`, o que pode ser vantajoso em alguns contextos, como quando se utiliza dentro de callbacks ou em funções de array.
    `,
  },

funcoesRecursivas: {
    title: "Funções - Recursivas",
    description: "Funções essenciais em JavaScript, incluindo funções recursivas.",
    code: `
// Funções Recursivas
function fatorial(n: number): number {
  if (n <= 1) return 1;
  return n * fatorial(n - 1);
}
// Chamada da função
let resultadoFatorial = fatorial(5);
// retorno: 120
    `,
    explanation: `
//Funções Recursivas:
- Funções recursivas são aquelas que se chamam dentro de si mesmas. Elas são frequentemente usadas para resolver problemas que podem ser decompostos em subproblemas, como o cálculo de um fatorial.
    `,
  },

callbacks: {
    title: "Funções - Callbacks e Promises",
    description: "Funções essenciais em JavaScript, incluindo callbacks.",
    code: `
// Callbacks
function fetchDados(url: string, callback: (dados: string) => void): void {
  setTimeout(() => {
    callback(\`Dados recebidos de \${url}\`);
  }, 2000);
}

fetchDados("https://api.exemplo.com", (mensagem) => {
  console.log(mensagem);
});
// retorno (após 2 segundos): "Dados recebidos de https://api.exemplo.com"

// Promises
function buscarDados(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(\`Dados recebidos de \${url}\`);
    }, 2000);
  });
}

buscarDados("https://api.exemplo.com")
  .then((dados) => console.log(dados))
  .catch((erro) => console.error(erro));
// retorno (após 2 segundos): "Dados recebidos de https://api.exemplo.com"
    `,
    explanation: `
//Callbacks:
- Callbacks são funções passadas como argumento para outra função e executadas posteriormente, geralmente após a conclusão de uma tarefa assíncrona. No exemplo, usamos \`setTimeout\` para simular uma operação assíncrona e chamar o callback após um tempo determinado.

//Promises:
- Promises são usadas para representar operações assíncronas em JavaScript. Elas têm três estados: pending, fulfilled e rejected. Utilizamos \`.then()\` para tratar a resolução e \`.catch()\` para capturar erros.
    `,
  },

asyncAwait: {
    title: "Funções - Async/Await",
    description: "Funções essenciais em JavaScript, incluindo async/await.",
    code: `
// Async/Await
async function obterDados(url: string): Promise<string> {
  const dados = await buscarDados(url);
  return dados;
}

async function exibirDados() {
  const mensagem = await obterDados("https://api.exemplo.com");
  console.log(mensagem);
}
// chamada da função
exibirDados();
// retorno (após 2 segundos): "Dados recebidos de https://api.exemplo.com"
    `,
    explanation: `
Async/Await:
- Async/Await é uma forma mais moderna de trabalhar com operações assíncronas. Com \`async\`, a função sempre retorna uma Promise, e com \`await\`, podemos esperar o resultado de uma Promise antes de continuar a execução do código.
    `,
  },

  closures: {
    title: "Conceitos Avançados - Closures",
    description: "Conceitos avançados importantes em JavaScript, incluindo closures.",
    code: `
// Closures
function criarContador() {
  let contador = 0;
  return function incrementar() {
    contador++;
    return contador;
  };
}

const contador1 = criarContador();
const contador2 = criarContador();

console.log(contador1()); // retorno: 1
console.log(contador1()); // retorno: 2
console.log(contador2()); // retorno: 1
    `,
    explanation: `
//Closures:
- Closures ocorrem quando uma função é capaz de "lembrar" e acessar variáveis de seu escopo de criação, mesmo após a função externa ter sido executada. No exemplo, a função incrementar tem acesso à variável contador, mesmo após a execução de criarContador(). Isso é possível porque incrementar é uma closure.
    `,
  },

hoisting: {
    title: "Conceitos Avançados - Hoisting",
    description: "Conceitos avançados importantes em JavaScript, incluindo hoisting.",
    code: `
// Hoisting
console.log(nome); // retorno: undefined
var nome = "João";

// Exemplo com let
try {
  console.log(idade); // lança erro: Cannot access 'idade' before initialization
  let idade = 25;
} catch (e) {
  console.log(e.message);
}
    `,
    explanation: `
//Hoisting:
- Hoisting é um comportamento do JavaScript onde variáveis e funções são movidas para o topo de seu contexto (função ou escopo global) durante a execução. No exemplo, a variável nome é "elevada" para o topo, mas como foi declarada com var, seu valor será undefined até que seja atribuído. Já com let, ocorre um erro se tentarmos acessar a variável antes da inicialização, devido ao conceito de temporal dead zone (TDZ).
    `,
  },

eventLoop: {
    title: "Conceitos Avançados - Event Loop e Assíncrono",
    description: "Conceitos avançados importantes em JavaScript, incluindo o event loop e o comportamento assíncrono.",
    code: `
// Event Loop e Assíncrono
console.log("Início");

setTimeout(() => {
  console.log("Execução do setTimeout");
}, 0);

console.log("Fim");
// retorno: "Início", "Fim", "Execução do setTimeout"
    `,
    explanation: `
//Event Loop e Assíncrono:
- O event loop é um mecanismo que permite que JavaScript execute operações assíncronas, como callbacks e promessas, sem bloquear o fluxo de execução do programa. No exemplo, a função setTimeout é executada de forma assíncrona, mesmo com o tempo de 0 ms. Ela é colocada na fila de tarefas e só será executada depois que o call stack (pilha de execução) estiver vazio. Portanto, a sequência de execução é: "Início", "Fim", e então, após a execução do código síncrono, "Execução do setTimeout".
    `,
  },

};
