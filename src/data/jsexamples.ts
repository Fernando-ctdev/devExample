export interface Example {
  title: string;
  id: number,
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

let ID: number = 0

export const examplesjs: Record<string, Example> = {
  tipos: {
    title: "Tipos de dados",
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    title: "Arrays e métodos",
    id: ID++,
    description: "Estruturas de dados essenciais em JavaScript.",
    code: `
// Arrays e Métodos
let numeros = [1, 2, 3, 4, 5];

// Método para adicionar elementos no final
numeros.push(6); // [1, 2, 3, 4, 5, 6]

// Método para remover o último elemento
numeros.pop(); // [1, 2, 3, 4, 5]

// Método para encontrar o índice de um elemento
let indice = numeros.indexOf(3); // 2

// Método para percorrer o array
numeros.forEach((numero) => console.log(numero));
// retorno: 1, 2, 3, 4, 5

// Método para filtrar elementos com base em uma condição
let pares = numeros.filter(numero => numero % 2 === 0); // [2, 4]

// Método para mapear o array e retornar um novo array
let quadrados = numeros.map(numero => numero * numero); // [1, 4, 9, 16, 25]

// Método para reduzir o array a um único valor
let soma = numeros.reduce((acc, numero) => acc + numero, 0); // 15

// Método para verificar se todos os elementos satisfazem uma condição
let todosPares = numeros.every(numero => numero % 2 === 0); // false

// Método para verificar se pelo menos um elemento satisfaz a condição
let algumPar = numeros.some(numero => numero % 2 === 0); // true

// Método para inverter a ordem dos elementos no array
let invertido = numeros.reverse(); // [5, 4, 3, 2, 1]

// Método para encontrar o primeiro elemento que satisfaz uma condição
let primeiroPar = numeros.find(numero => numero % 2 === 0); // 4

// Método para encontrar o índice do primeiro elemento que satisfaz uma condição
let indicePar = numeros.findIndex(numero => numero % 2 === 0); // 3
    `,
    explanation: `
Arrays são listas ordenadas de elementos. 
Além dos métodos básicos, podemos usar:
- filter(): Retorna um novo array com elementos que passam no teste de uma condição.
- map(): Retorna um novo array com os resultados da execução de uma função em cada elemento.
- reduce(): Reduz o array a um único valor baseado em uma função.
- every(): Verifica se todos os elementos do array satisfazem uma condição.
- some(): Verifica se pelo menos um elemento satisfaz a condição.
- reverse(): Inverte a ordem dos elementos no array.
- find(): Retorna o primeiro elemento que satisfaz uma condição.
- findIndex(): Retorna o índice do primeiro elemento que satisfaz uma condição.
    `,
  },

  objetos: {
    title: "Objetos e Propriedades",
    id: ID++,
    description: "Trabalhando com objetos e suas propriedades em JavaScript.",
    code: `
// Criando um objeto
let pessoa = {
  nome: "João",
  idade: 30,
  saudacao: function() {
    return "Olá, " + this.nome;
  }
};

// Acessando propriedades
console.log(pessoa.nome); // "João"
console.log(pessoa.idade); // 30

// Chamando um método
console.log(pessoa.saudacao()); // "Olá, João"

// Adicionando uma nova propriedade
pessoa.email = "joao@example.com";
console.log(pessoa.email); // "joao@example.com"

// Removendo uma propriedade
delete pessoa.idade;
console.log(pessoa.idade); // undefined
    `,
    explanation: `
Objetos são coleções de propriedades, onde cada propriedade possui uma chave (nome) e um valor.
- Acessamos as propriedades usando a notação de ponto: pessoa.nome.
- Podemos adicionar ou remover propriedades dinamicamente.
- Métodos são funções dentro de objetos e são acessados como qualquer outra propriedade.
    `,
  },
  strings: {
    title: "Strings e Métodos",
    id: ID++,
    description: "Trabalhando com strings e métodos de manipulação.",
    code: `
// Criando uma string
let texto = "Olá, Mundo!";

// Método para transformar para maiúsculas
let maiuscula = texto.toUpperCase(); // "OLÁ, MUNDO!"

// Método para transformar para minúsculas
let minuscula = texto.toLowerCase(); // "olá, mundo!"

// Método para substituir parte de uma string
let novoTexto = texto.replace("Mundo", "JavaScript"); // "Olá, JavaScript!"

// Método para dividir uma string em um array
let palavras = texto.split(", "); // ["Olá", "Mundo!"]

// Método para verificar se uma string contém outra
let contem = texto.includes("Mundo"); // true
    `,
    explanation: `
//Strings são sequências de caracteres.
- toUpperCase() e toLowerCase(): Convertem a string para maiúsculas ou minúsculas.
- replace(): Substitui uma parte da string por outra.
- split(): Divide a string em um array de substrings.
- includes(): Verifica se uma substring está presente na string.
    `,
  },
  condicionais: {
    title: "Controle de Fluxo - Condicionais",
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
    id: ID++,
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
