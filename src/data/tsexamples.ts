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
    category: "Fundamentos Typescript",
    items: [
    { id: "tiposPrimitivos", title: "Tipos Primitivos" },
      { id: "tiposCompostos", title: "Tipos Compostos" },
      { id: "tiposCustomizados", title: "Tipos Customizados" },
      { id: "enums", title: "Enums" },
      { id: "typeAssertions", title: "Type Assertions" },
      { id: "tiposLiterais", title: "Tipos Literais" },
      { id: "tiposObjeto", title: "Tipos de Objeto" },
      { id: "variaveis", title: "Variáveis e Escopo" },
      { id: "operadores", title: "Operadores" },
    ],
  },
  {
    category: "Estruturas de Dados",
    items: [
      { id: "arrays", title: "Arrays e Métodos" },
      { id: "objetos", title: "Objetos e Métodos" },
      { id: "strings", title: "Strings e Métodos" },
    ],
  },
  {
    category: "Controle de Fluxo",
    items: [
      { id: "estruturas", title: "Estruturas condicionais" },
      { id: "loops", title: "Loops e Iterações" },
      { id: "condicionais", title: "Condicionais type guards" },
    ],
  },
  {
    category: "Funções",
    items: [
      { id: "funcoes-basicas", title: "Funções Básicas" },
      { id: "funcoes-arrow", title: "Arrow Functions" },
      { id: "funcoes-recursivas", title: "Funções Recursivas" },
      { id: "funcoes-anonimas", title: "Funções Anônimas" },
      { id: "callbacks", title: "Callbacks e Promises" },
    ],
  },
];

export const examplests: Record<string, Example> = {
    tiposPrimitivos: {
        title: "Tipos Primitivos em TypeScript",
        description: "Os tipos básicos fundamentais do TypeScript",
        code: `// Tipos primitivos
    let texto: string = "Olá";
    // retorno: "Olá"
    
    let numero: number = 42;
    // retorno: 42
    
    let decimal: number = 3.14;
    // retorno: 3.14
    
    let booleano: boolean = true;
    // retorno: true
    
    let nulo: null = null;
    // retorno: null
    
    let indefinido: undefined = undefined;
    // retorno: undefined
    
    let simbolo: symbol = Symbol("sym");
    // retorno: Symbol(sym)
    
    let bigInt: bigint = 100n;
    // retorno: 100n`,
        explanation: `Os tipos primitivos são os blocos fundamentais de construção em TypeScript:
    
    string - Representa textos e caracteres, pode usar aspas simples ou duplas
    
    number - Representa números, tanto inteiros quanto decimais
    
    boolean - Representa valores verdadeiro (true) ou falso (false)
    
    null - Representa um valor nulo intencional
    
    undefined - Representa uma variável que não foi atribuída
    
    symbol - Representa um identificador único e imutável
    
    bigint - Representa números inteiros muito grandes`
      },
    
      tiposCompostos: {
        title: "Tipos Compostos em TypeScript",
        description: "Arrays, tuplas e unions em TypeScript",
        code: `// Arrays
    let array: number[] = [1, 2, 3];
    // retorno: [1, 2, 3]
    
    // Tuplas
    let tupla: [string, number] = ["idade", 25];
    // retorno: ["idade", 25]
    
    // Union Types
    let union: string | number = "texto";
    // retorno: "texto"
    union = 42;
    // retorno: 42
    
    // Any (usar com moderação)
    let qualquerCoisa: any = 4;
    // retorno: 4
    qualquerCoisa = "mudei o tipo";
    // retorno: "mudei o tipo"`,
        explanation: `Os tipos compostos permitem criar estruturas mais complexas:
    
    Arrays - Lista ordenada de elementos do mesmo tipo, definido como tipo[] ou Array<tipo>
    
    Tuplas - Array com número fixo de elementos, cada um podendo ter um tipo diferente
    
    Union Types - Permite que uma variável aceite mais de um tipo, definido com |
    
    Any - Permite qualquer tipo, desativa a verificação de tipo (deve ser evitado quando possível)`
      },
    
      tiposCustomizados: {
        title: "Tipos Customizados em TypeScript",
        description: "Criando tipos personalizados com type e interface",
        code: `// Type
    type Ponto = {
        x: number;
        y: number;
    };
    
    let coordenada: Ponto = { x: 10, y: 20 };
    // retorno: { x: 10, y: 20 }
    
    // Interface
    interface Pessoa {
        nome: string;
        idade: number;
        email?: string;  // Propriedade opcional
    }
    
    let usuario: Pessoa = { 
        nome: "João", 
        idade: 25 
    };
    // retorno: { nome: "João", idade: 25 }`,
        explanation: `Tipos customizados permitem definir estruturas complexas reutilizáveis:
    
    //Type - Cria um alias para um tipo complexo, útil para reutilização
    - Pode representar qualquer tipo de dados
    - Não pode ser estendido após criação
    
    //Interface - Define um contrato para objetos
    - Mais flexível para objetos
    - Pode ser estendida
    - Suporta propriedades opcionais (marcadas com ?)`
      },
    
      enums: {
        title: "Enums em TypeScript",
        description: "Conjuntos de constantes nomeadas",
        code: `// Enum Numérico
    enum DiaDaSemana {
        DOMINGO,     // 0
        SEGUNDA,     // 1
        TERCA,       // 2
        QUARTA,      // 3
        QUINTA,      // 4
        SEXTA,       // 5
        SABADO      // 6
    }
    let dia: DiaDaSemana = DiaDaSemana.SEGUNDA;
    // retorno: 1
    
    // Enum com valores string
    enum Status {
        ATIVO = "ATIVO",
        INATIVO = "INATIVO"
    }
    let statusAtual: Status = Status.ATIVO;
    // retorno: "ATIVO"`,
        explanation: `Enums são úteis para representar conjuntos fixos de valores:
    
    //Enum Numérico
    - Valores são atribuídos automaticamente começando do 0
    - Cada membro recebe um número sequencial
    - Pode ser referenciado pelo nome ou número
    
    //Enum String
    - Valores precisam ser explicitamente atribuídos
    - Mais seguros para serialização
    - Mais fáceis de depurar`
      },
    
      typeAssertions: {
        title: "Type Assertions em TypeScript",
        description: "Formas de afirmar o tipo de uma variável",
        code: `// Usando 'as'
    let valor: any = "uma string";
    let tamanho: number = (valor as string).length;
    // retorno: 10
    
    // Usando sintaxe angular
    let comprimento: number = (<string>valor).length;
    // retorno: 10
    
    // Type assertion em objetos
    let usuario: any = {
        nome: "João",
        idade: 25
    };
    
    let idade = (usuario as { idade: number }).idade;
    // retorno: 25`,
        explanation: `Type assertions são formas de dizer ao TypeScript que você sabe mais sobre o tipo de uma variável do que ele:
    
    //as - Forma moderna de type assertion
    - Sintaxe mais clara e preferida
    - Funciona em todos os contextos, incluindo .tsx
    
    //Sintaxe angular (<>)
    - Sintaxe antiga
    - Não funciona em arquivos .tsx
    - Ainda suportada mas não recomendada
    
    Use type assertions com cuidado, pois elas podem contornar a segurança de tipos do TypeScript`
      },
    
      tiposLiterais: {
        title: "Tipos Literais em TypeScript",
        description: "Tipos que representam valores específicos",
        code: `// Literal types
    let alinhamento: "left" | "right" | "center" = "left";
    // retorno: "left"
    
    type Opcoes = "sim" | "não" | "talvez";
    let resposta: Opcoes = "sim";
    // retorno: "sim"
    
    // Combinando com outros tipos
    type Resultado = number | "erro" | "pendente";
    let status: Resultado = "pendente";
    // retorno: "pendente"
    status = 42;
    // retorno: 42`,
        explanation: `Tipos literais permitem especificar exatamente quais valores são aceitos:
    
    //Valores Literais
    - Podem ser strings, números ou booleanos
    - Restringem uma variável a valores específicos
    - Úteis para configurações e estados
    
    //Union de Literais
    - Combina múltiplos valores possíveis
    - Pode ser combinado com outros tipos
    - Oferece autocompletar no IDE`
      },
    
      tiposObjeto: {
        title: "Tipos de Objeto em TypeScript",
        description: "Diferentes formas de tipar objetos",
        code: `// Objeto genérico
    let config: object = { tema: "dark", fonte: 12 };
    // retorno: { tema: "dark", fonte: 12 }
    
    // Record
    let dados: Record<string, number> = { 
        idade: 25, 
        ano: 2024 
    };
    // retorno: { idade: 25, ano: 2024 }
    
    // Object literal type
    let usuario: {
        nome: string;
        idade: number;
        ativo?: boolean;
    } = {
        nome: "Maria",
        idade: 30
    };
    // retorno: { nome: "Maria", idade: 30 }`,
        explanation: `TypeScript oferece várias formas de tipar objetos:
    
    //object
    - Tipo genérico para qualquer valor não primitivo
    - Menos específico e seguro
    
    //Record<K,T>
    - Define um objeto com chaves e valores de tipos específicos
    - Útil para objetos com estrutura uniforme
    
    //Object literal type
    - Define a estrutura exata do objeto
    - Pode incluir propriedades opcionais
    - Mais específico e seguro`
      },

  variaveis: {
    title: "Variáveis e Escopo",
    description: "Declaração e escopo de variáveis em TypeScript",
    code: `// Declaração de variáveis
let contador: number = 1;
// retorno: 1

const PI: number = 3.14159;
// retorno: 3.14159

var antiga: string = "evitar usar var";
// retorno: "evitar usar var"


// Inferência de tipos
let nome = "João";              // TypeScript infere como string
// retorno: "João"

let idade = 25;                 // TypeScript infere como number
// retorno: 25

let ativo = true;               // TypeScript infere como boolean
// retorno: true

let nums = [1, 2, 3];          // TypeScript infere como number[]
// retorno: [1, 2, 3]


// Escopo de bloco
{
    let escopo = "local";       // Só existe neste bloco
    // retorno: "local"
    const PI = 3.14;           // Diferente do PI externo
    // retorno: 3.14
}
// console.log(escopo);        // Erro: escopo não existe aqui


// Hoisting com var (evitar)
console.log(x);                // undefined (hoisting)
var x = 10;
// retorno: undefined, depois 10

// console.log(y);             // Erro com let
let y = 20;


// Destructuring de objetos
const pessoa = { 
    nome: "Maria", 
    idade: 30, 
    cidade: "SP" 
};

const { nome: nomeCompleto, idade: anos } = pessoa;
// retorno para nomeCompleto: "Maria"
// retorno para anos: 30

const { cidade, ...resto } = pessoa;
// retorno para cidade: "SP"
// retorno para resto: { nome: "Maria", idade: 30 }


// Destructuring de arrays
const numeros = [1, 2, 3, 4, 5];

const [primeiro, segundo, ...restantes] = numeros;
// retorno para primeiro: 1
// retorno para segundo: 2
// retorno para restantes: [3, 4, 5]

const [, , terceiro] = numeros;
// retorno: 3


// Spread operator
const array1 = [1, 2, 3];
const array2 = [...array1, 4, 5];
// retorno: [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
// retorno: { a: 1, b: 2, c: 3 }


// Reatribuição e mutação
let mutavel = { valor: 1 };
mutavel.valor = 2;             // OK - mudando propriedade
// retorno: { valor: 2 }

const imutavel = { valor: 1 };
imutavel.valor = 2;            // OK - mudando propriedade
// retorno: { valor: 2 }
// imutavel = { valor: 3 };    // Erro - não pode reatribuir const


// Template literals
const usuario = "Ana";
const msg = \`Bem-vinda \${usuario}!\`;
// retorno: "Bem-vinda Ana!"

const multi = \`
  Linha 1
  Linha 2
\`;
// retorno: "\n  Linha 1\n  Linha 2\n"`,
    explanation: `// Declaração de variáveis

let - Declara variável que pode ser reatribuída, com escopo de bloco

const - Declara constante que não pode ser reatribuída, com escopo de bloco

var - Forma antiga de declarar variáveis, com hoisting e escopo de função (evitar)


// Inferência de tipos

TypeScript pode inferir automaticamente o tipo baseado no valor inicial

Não é necessário declarar o tipo explicitamente quando é óbvio

A inferência funciona com tipos primitivos e compostos


// Escopo de bloco

let e const têm escopo de bloco - só existem dentro do bloco onde foram declaradas

Blocos podem ter variáveis com mesmo nome de variáveis externas (shadowing)

var não respeita escopo de bloco (mais um motivo para evitar)


// Hoisting com var

var sofre hoisting - declaração é movida para o topo, mas não a inicialização

let e const não sofrem hoisting - não podem ser usadas antes da declaração

Hoisting pode causar bugs difíceis de encontrar


// Destructuring de objetos

Extrai propriedades de objetos em variáveis individuais

Permite renomear variáveis usando : novo_nome

Rest operator (...) coleta propriedades restantes em novo objeto


// Destructuring de arrays

Extrai elementos de arrays em variáveis individuais

Pode pular elementos usando vírgulas

Rest operator (...) coleta elementos restantes em novo array


// Spread operator

Em arrays - Copia elementos de um array para outro

Em objetos - Copia propriedades de um objeto para outro

Cria cópias superficiais (shallow copy)


// Reatribuição e mutação

let permite reatribuição (mudar a referência)

const impede reatribuição mas não impede mutação de objetos/arrays

Para imutabilidade total, use Object.freeze()


// Template literals

Permitem interpolação de expressões usando \${}

Suportam strings multilinhas preservando formatação

Podem incluir expressões complexas dentro de \${}`,
  },

  operadores: {
    title: "Operadores do TypeScript",
    description:
      "Operadores e expressões específicos ou comumente usados em TypeScript",
    code: `// Operadores de tipo
let valor: unknown;
let texto = valor as string;
// retorno: valor convertido para string

let numero = <number>valor;
// retorno: valor convertido para number


// Operador de coalescência nula (??)
let nome: string | null = null;
let nomeExibicao = nome ?? "Anônimo";
// retorno: "Anônimo"


// Operador de encadeamento opcional (?.)
interface Usuario {
    endereco?: {
        rua?: string;
    };
}

let usuario: Usuario = {};
let rua = usuario?.endereco?.rua;
// retorno: undefined


// Operadores de verificação de tipo
let tipo = typeof valor;
// retorno: "string", "number", etc.

function isString(x: any): x is string {
    return typeof x === "string";
}
// retorno: true/false


// Operador keyof
interface Pessoa {
    nome: string;
    idade: number;
}

type ChavesPessoa = keyof Pessoa;
// retorno: "nome" | "idade"

function getProp(obj: Pessoa, key: keyof Pessoa) {
    return obj[key];
}


// Operador in
interface Animal {
    nome: string;
}

interface Cachorro extends Animal {
    latir: () => void;
}

function isDog(animal: Animal): animal is Cachorro {
    return 'latir' in animal;
}
// retorno: true/false


// Operadores de união e interseção
type StringOuNumero = string | number;
// união de tipos

type ObjetoComNome = { nome: string };
type ObjetoComIdade = { idade: number };
type Pessoa = ObjetoComNome & ObjetoComIdade;
// interseção de tipos


// Operador satisfies
type RGB = [number, number, number];
const cor = [255, 128, 0] satisfies RGB;
// verifica se o valor corresponde ao tipo


// Operador instanceof com type guards
class Erro1 extends Error {}
class Erro2 extends Error {}

function trataErro(erro: Error) {
    if (erro instanceof Erro1) {
        // TypeScript sabe que é Erro1
    }
}`,
    explanation: `// Operadores de tipo

as - Operador de asserção de tipo, usado para converter tipos

<tipo> - Sintaxe alternativa para asserção de tipo (não usar em JSX)


// Operador de coalescência nula

?? - Fornece valor padrão quando null/undefined, específico para esses valores


// Operador de encadeamento opcional

?. - Acesso seguro a propriedades, específico do TypeScript/JavaScript moderno


// Operadores de verificação de tipo

typeof - Verifica o tipo em tempo de execução

is - Cria type guard personalizado, recurso do TypeScript


// Operador keyof

keyof - Obtém as chaves de um tipo como union type

Útil para trabalhar com tipos de forma genérica


// Operador in

in - Verifica se propriedade existe em objeto

Útil para type narrowing em TypeScript


// Operadores de união e interseção

| - Cria um tipo que pode ser um OU outro

& - Combina múltiplos tipos em um só


// Operador satisfies

satisfies - Verifica se um valor corresponde a um tipo

Mantém a inferência literal de tipo


// instanceof com type guards

Combina instanceof com type guards do TypeScript

Permite narrowing de tipos em verificações de instância`,
  },

  arrays: {
    title: "Arrays e Métodos",
    description: "Manipulação de arrays em TypeScript",
    code: `// Declaração e inicialização
let numeros: number[] = [1, 2, 3, 4, 5];
// retorno: [1, 2, 3, 4, 5]

let frutas: Array<string> = ["maçã", "banana", "laranja"];
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
let dobrados = numeros.map((n: number): number => n * 2);
// retorno: [2, 4, 6, 8, 10]

let pares = numeros.filter((n: number): boolean => n % 2 === 0);
// retorno: [2, 4]

let soma = numeros.reduce((acc: number, n: number): number => acc + n, 0);
// retorno: 15


// Métodos de busca
let indice = frutas.indexOf("banana");
// retorno: 1 (ou -1 se não encontrar)

let temMaca = frutas.includes("maçã");
// retorno: true

let encontrado = numeros.find((n: number): boolean => n > 3);
// retorno: 4 (ou undefined se não encontrar)

let algumMaior3 = numeros.some((n: number): boolean => n > 3);
// retorno: true

let todosMaior0 = numeros.every((n: number): boolean => n > 0);
// retorno: true


// Ordenação e outras operações
let ordenados = [...numeros].sort((a: number, b: number): number => a - b);
// retorno: [1, 2, 3, 4, 5]

let parte = numeros.slice(1, 3);
// retorno: [2, 3]

let juntado = numeros.join(", ");
// retorno: "1, 2, 3, 4, 5"


// Type-safe iteração
numeros.forEach((n: number, i: number): void => {
    console.log(\`Número \${n} no índice \${i}\`);
});
// não tem retorno, apenas exibe no console

// Map com type inference
let stringNumeros = numeros.map(n => n.toString());
// retorno: ["1", "2", "3", "4", "5"]

// Filter com union types
let itens: (string | number)[] = ["a", 1, "b", 2];
let apenasStrings = itens.filter((item): item is string => 
    typeof item === "string"
);
// retorno: ["a", "b"]`,
    explanation: `// Declaração e inicialização

number[] - Tipo de array mais comum em TypeScript

Array<string> - Sintaxe alternativa usando generics


// Métodos de adição e remoção

.push() - Adiciona ao final e retorna novo tamanho

.pop() - Remove do final e retorna elemento removido

.unshift() - Adiciona no início e retorna novo tamanho

.shift() - Remove do início e retorna elemento removido

.splice() - Remove/adiciona elementos e retorna removidos


// Métodos de transformação

.map() - Transforma elementos mantendo type safety

.filter() - Filtra elementos preservando o tipo

.reduce() - Reduz array a um valor com tipo especificado


// Métodos de busca

.indexOf() - Retorna índice com type narrowing

.includes() - Verifica existência com type checking

.find() - Encontra elemento com type inference

.some() - Verifica condição com type checking

.every() - Verifica condição para todos elementos


// Ordenação e outras operações

.sort() - Ordena com comparador tipado

.slice() - Extrai subarray mantendo o tipo

.join() - Converte para string com separador


// Type-safe iteração

.forEach() - Iteração com tipos verificados

Type inference - TypeScript infere tipos automaticamente

Type guard - Narrowing de tipos em filtragens`,
  },

  objetos: {
    title: "Objetos e Métodos",
    description: "Trabalhando com objetos em TypeScript",
    code: `// Interface e inicialização
interface Pessoa {
    nome: string;
    idade: number;
    email?: string;  // Propriedade opcional
}

const pessoa: Pessoa = {
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


// Spread e Rest com type safety
const pessoaCompleta: Pessoa = {
    ...pessoa,
    email: "ana@email.com"
};
// retorno: { nome: "Ana", idade: 31, email: "ana@email.com" }

const { nome, ...resto }: Pessoa = pessoaCompleta;
// retorno para nome: "Ana"
// retorno para resto: { idade: 31, email: "ana@email.com" }


// Object.freeze com types
interface PessoaReadOnly {
    readonly nome: string;
    readonly idade: number;
}

const pessoaImutavel: Readonly<Pessoa> = Object.freeze(pessoa);
// Tentativa de modificação gerará erro de compilação
// pessoaImutavel.nome = "João"; // Erro


// Getters e Setters tipados
interface Conta {
    saldo: number;
    readonly saldoFormatado: string;
    deposito(valor: number): void;
}

const conta: Conta = {
    saldo: 0,
    get saldoFormatado(): string {
        return \`R$ \${this.saldo.toFixed(2)}\`;
    },
    deposito(valor: number): void {
        this.saldo += valor;
    }
};
// uso:
conta.deposito(100);
// retorno do saldoFormatado: "R$ 100.00"


// Type Guards com objetos
interface Carro {
    tipo: "carro";
    portas: number;
}

interface Moto {
    tipo: "moto";
    cilindradas: number;
}

type Veiculo = Carro | Moto;

function ehCarro(veiculo: Veiculo): veiculo is Carro {
    return veiculo.tipo === "carro";
}

const veiculo: Veiculo = { tipo: "carro", portas: 4 };
if (ehCarro(veiculo)) {
    // TypeScript sabe que é um Carro aqui
    console.log(veiculo.portas);
}
// retorno do console.log: 4


// Index Signatures
interface DicionarioNumeros {
    [key: string]: number;
}

const dicionario: DicionarioNumeros = {
    "um": 1,
    "dois": 2
};
// retorno: { "um": 1, "dois": 2 }


// Keyof com objetos
type ChavesPessoa = keyof Pessoa;
// retorno do tipo: "nome" | "idade" | "email"

function getProp<T>(obj: T, key: keyof T): T[keyof T] {
    return obj[key];
}
const nomePessoa = getProp(pessoa, "nome");
// retorno: "Ana"`,
    explanation: `// Interface e inicialização

interface - Define o contrato do objeto com tipos

?: - Marca propriedades como opcionais


// Métodos do Object

Object.keys() - Retorna array de chaves com type safety

Object.values() - Retorna array de valores tipados

Object.entries() - Retorna array de pares chave-valor tipados

Object.hasOwn() - Verifica propriedade com type checking


// Acessando e modificando

Notação ponto - Acesso type-safe a propriedades

Notação colchetes - Acesso dinâmico com verificação de tipos

delete - Remove propriedades opcionais


// Spread e Rest com type safety

... spread - Copia propriedades mantendo tipos

... rest - Coleta propriedades restantes com tipos


// Object.freeze com types

Readonly<T> - Torna todas as propriedades readonly

Object.freeze - Impede modificações em runtime


// Getters e Setters tipados

get - Define propriedade computada com tipo de retorno

set - Define setter com verificação de tipo do parâmetro


// Type Guards com objetos

is - Define type guard personalizado

Narrowing - Refina tipos em condicionais


// Index Signatures

[key: string] - Define tipos para propriedades dinâmicas

Permite adicionar propriedades mantendo type safety


// Keyof com objetos

keyof - Obtém union type das chaves

Permite acesso genérico type-safe a propriedades`,
  },
  strings: {
    title: "Strings e Métodos",
    description: "Manipulação de strings em TypeScript",
    code: `// Criação de strings
let aspasSimples: string = 'texto simples';
// retorno: "texto simples"

let aspasDuplas: string = "texto com aspas";
// retorno: "texto com aspas"

let variavel: string = "mundo";
let template: string = \`Olá \${variavel}\`;
// retorno: "Olá mundo"


// Métodos de busca
let texto: string = "TypeScript é incrível";

let tamanho: number = texto.length;
// retorno: 21

let posicao: number = texto.indexOf("é");
// retorno: 11

let ultimaPosicao: number = texto.lastIndexOf("i");
// retorno: 19

let inclui: boolean = texto.includes("Script");
// retorno: true

let comeca: boolean = texto.startsWith("Type");
// retorno: true

let termina: boolean = texto.endsWith("vel");
// retorno: true

let buscaRegex: number = texto.search(/é/);
// retorno: 11

let match: RegExpMatchArray | null = texto.match(/[A-Z]/g);
// retorno: ["T", "S"]


// Métodos de transformação
let maiusculas: string = texto.toUpperCase();
// retorno: "TYPESCRIPT É INCRÍVEL"

let minusculas: string = texto.toLowerCase();
// retorno: "typescript é incrível"

let textoComEspacos: string = "  texto com espaços  ";
let semEspacos: string = textoComEspacos.trim();
// retorno: "texto com espaços"

let semEspacosInicio: string = textoComEspacos.trimStart();
// retorno: "texto com espaços  "

let semEspacosFim: string = textoComEspacos.trimEnd();
// retorno: "  texto com espaços"

let substituido: string = texto.replace("incrível", "fantástico");
// retorno: "TypeScript é fantástico"

let substituicaoGlobal: string = "ana banana".replace(/ana/g, "ada");
// retorno: "ada bada"

let partes: string[] = texto.split(" ");
// retorno: ["TypeScript", "é", "incrível"]


// Extração de substrings
let sub1: string = texto.substring(0, 4);
// retorno: "Type"

let sub2: string = texto.slice(4, 10);
// retorno: "Script"

let sub3: string = texto.slice(-9);
// retorno: "incrível"

let caractere: string = texto.charAt(0);
// retorno: "T"

let codigo: number = texto.charCodeAt(0);
// retorno: 84


// Template literals tipados
type Saudacao = \`Olá \${string}\`;
let saudacao: Saudacao = \`Olá João\`;
// retorno: "Olá João"
// let invalido: Saudacao = \`Tchau João\`; // Erro!

// Template literal com union types
type Tamanho = 'pequeno' | 'médio' | 'grande';
type Cor = 'vermelho' | 'azul' | 'verde';
type Produto = \`\${Tamanho}-\${Cor}\`;
let produto: Produto = 'pequeno-vermelho';
// retorno: "pequeno-vermelho"


// Padronização de strings
let preenchido: string = "123".padStart(5, "0");
// retorno: "00123"

let preenchidoFim: string = "123".padEnd(5, "0");
// retorno: "12300"

let repetido: string = "abc".repeat(3);
// retorno: "abcabcabc"`,
    explanation: `// Criação de strings

string - Tipo básico para textos em TypeScript

Template literals - Permitem interpolação tipada

Union types com strings literais - Restringem valores possíveis


// Métodos de busca

.length - Propriedade que retorna o tamanho da string

.indexOf() - Retorna a posição ou -1 com type checking

.lastIndexOf() - Busca da direita para esquerda com type safety

.includes() - Retorna boolean com type checking

.startsWith() - Verifica início com type safety

.endsWith() - Verifica final com type safety

.search() - Busca com regex e retorna number

.match() - Retorna array tipado ou null com regex


// Métodos de transformação

.toUpperCase() - Converte para maiúsculas mantendo tipo

.toLowerCase() - Converte para minúsculas mantendo tipo

.trim() - Remove espaços com retorno tipado

.trimStart() - Remove espaços do início

.trimEnd() - Remove espaços do fim

.replace() - Substitui com type checking

.split() - Converte para array tipado


// Extração de substrings

.substring() - Extrai parte da string com type safety

.slice() - Suporta índices negativos com type checking

.charAt() - Retorna caractere com tipo string

.charCodeAt() - Retorna código numérico tipado


// Template literals tipados

Type literals - Definem padrões exatos para strings

Union com template - Combinam múltiplos padrões tipados


// Padronização de strings

.padStart() - Preenche início mantendo tipo string

.padEnd() - Preenche final mantendo tipo string

.repeat() - Repete string com verificação de tipo`,
  },
  estruturas: {
    title: "Estruturas condicionais",
    description: "Estruturas condicionais de fluxo em TypeScript",
    code: `// If...else com Type Guard
let valor: string | number = "42";

if (typeof valor === "string") {
    console.log(valor.toUpperCase());
    // retorno: "42"
} else {
    console.log(valor.toFixed(2));
    // retorno: não executa este bloco
}


// Switch com Type Safety
type Status = "pendente" | "aprovado" | "rejeitado";
const status: Status = "aprovado";

switch (status) {
    case "pendente":
        console.log("Em análise");
        // retorno: não executa
        break;
    case "aprovado":
        console.log("Tudo certo!");
        // retorno: "Tudo certo!"
        break;
    case "rejeitado":
        console.log("Não aprovado");
        // retorno: não executa
        break;
    default:
        // O TypeScript sabe que nunca chegará aqui
        const _nunca: never = status;
        break;
}


// Operador ternário com Type Inference
const idade: number = 20;
const mensagem: string = idade >= 18 
    ? "Pode dirigir" 
    : "Não pode dirigir";
// retorno: "Pode dirigir"


// Encadeamento opcional
interface Usuario {
    endereco?: {
        rua?: string;
        numero?: number;
    };
}

const usuario: Usuario = {};
const rua = usuario?.endereco?.rua;
// retorno: undefined


// Nullish Coalescing
const nome: string | null = null;
const nomeExibicao = nome ?? "Anônimo";
// retorno: "Anônimo"


// Type Narrowing com if
function processaValor(valor: string | number) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
        // retorno se string: versão maiúscula da string
    } else {
        return valor.toFixed(2);
        // retorno se number: número formatado com 2 decimais
    }
}


// Type Guards personalizados
interface Carro {
    tipo: "carro";
    portas: number;
}

interface Moto {
    tipo: "moto";
    cilindradas: number;
}

type Veiculo = Carro | Moto;

function ehCarro(veiculo: Veiculo): veiculo is Carro {
    return veiculo.tipo === "carro";
}

const veiculo: Veiculo = { tipo: "carro", portas: 4 };
if (ehCarro(veiculo)) {
    console.log(veiculo.portas);
    // retorno: 4
}


// Pattern Matching com TypeScript
type Resultado<T> = 
    | { sucesso: true; valor: T }
    | { sucesso: false; erro: string };

function processaResultado<T>(resultado: Resultado<T>): T | null {
    if (resultado.sucesso) {
        return resultado.valor;
        // retorno se sucesso: valor do tipo T
    } else {
        console.error(resultado.erro);
        return null;
        // retorno se erro: null
    }
}`,
    explanation: `// If...else com Type Guard

typeof - Verifica tipo em runtime com type narrowing

Type Guard - Ajuda TypeScript a entender o tipo em cada bloco


// Switch com Type Safety

Type Literals - Restringe valores possíveis para o switch

Never - Garante que todos os casos foram cobertos


// Operador ternário com Type Inference

Type Inference - TypeScript infere tipo do resultado

Útil para lógica condicional simples com tipos


// Encadeamento opcional

?. - Acesso seguro a propriedades possivelmente undefined

Evita erros de runtime com null/undefined


// Nullish Coalescing

?? - Fornece valor padrão apenas para null/undefined

Diferente do || que age em todos os falsy values


// Type Narrowing com if

Narrowing - Restringe tipos em blocos condicionais

TypeScript entende o tipo em cada bloco


// Type Guards personalizados

is - Cria predicado de tipo personalizado

Permite type narrowing customizado


// Pattern Matching com TypeScript

Union Types - Define possíveis estados/resultados

Discriminated Unions - Usa propriedade para distinguir tipos`,
  },

  loops: {
    title: "Loops e Iterações",
    description: "Diferentes formas de iteração em TypeScript",
    code: `// For tradicional com type safety
for (let i: number = 0; i < 5; i++) {
    console.log(i);
}
// retorno no console: 0, 1, 2, 3, 4


// For...of com arrays tipados
const numeros: number[] = [1, 2, 3, 4];
for (const num of numeros) {
    console.log(num);
}
// retorno no console: 1, 2, 3, 4


// For...in com objetos tipados
interface Pessoa {
    nome: string;
    idade: number;
}

const pessoa: Pessoa = { nome: "João", idade: 25 };
for (const key in pessoa) {
    console.log(\`\${key}: \${pessoa[key as keyof Pessoa]}\`);
}
// retorno no console:
// "nome: João"
// "idade: 25"


// While com type narrowing
let contador: number | null = 10;
while (contador !== null && contador > 0) {
    console.log(contador);
    contador--;
}
// retorno no console: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1


// Do...while com type checking
let tentativas: number = 0;
do {
    console.log(\`Tentativa \${tentativas + 1}\`);
    tentativas++;
} while (tentativas < 3);
// retorno no console:
// "Tentativa 1"
// "Tentativa 2"
// "Tentativa 3"


// ForEach com tipos
const frutas: string[] = ["maçã", "banana", "laranja"];
frutas.forEach((fruta: string, index: number) => {
    console.log(\`\${index}: \${fruta}\`);
});
// retorno no console:
// "0: maçã"
// "1: banana"
// "2: laranja"


// Iterador personalizado
function* numeroGenerator(): Generator<number> {
    yield 1;
    yield 2;
    yield 3;
}

for (const num of numeroGenerator()) {
    console.log(num);
}
// retorno no console: 1, 2, 3


// Iterator com interface tipada
interface Iterator<T> {
    next(): { value: T; done: boolean };
}

class NumberRange implements Iterator<number> {
    private current: number = 0;
    constructor(private max: number) {}

    next(): { value: number; done: boolean } {
        if (this.current < this.max) {
            return { value: this.current++, done: false };
        }
        return { value: this.current, done: true };
    }
}

const range = new NumberRange(3);
let result = range.next();
while (!result.done) {
    console.log(result.value);
    result = range.next();
}
// retorno no console: 0, 1, 2


// Map com type safety
const mapNumeros = new Map<string, number>();
mapNumeros.set("um", 1);
mapNumeros.set("dois", 2);

for (const [chave, valor] of mapNumeros) {
    console.log(\`\${chave}: \${valor}\`);
}
// retorno no console:
// "um: 1"
// "dois: 2"`,
    explanation: `// For tradicional com type safety

Variável de controle tipada como number

Garante type checking em incrementos/condições


// For...of com arrays tipados

Iteração segura sobre arrays tipados

TypeScript infere o tipo do elemento automaticamente


// For...in com objetos tipados

keyof - Garante type safety ao acessar propriedades

Necessário assertion de tipo para chaves


// While com type narrowing

Narrowing em condições de loop

Type guard para null/undefined


// Do...while com type checking

Executa pelo menos uma vez

Mantém type safety na condição


// ForEach com tipos

Arrow function com parâmetros tipados

Index opcional com tipo number


// Iterador personalizado

Generator tipado com Generator<T>

yield - Retorna valores com tipo específico


// Iterator com interface tipada

Interface Iterator do TypeScript

Implementação type-safe de iteradores


// Map com type safety

Map tipado com generics

Destructuring mantém tipos das chaves e valores`,
  },
  condicionais: {
    title: "Condicionais type guards",
    description: "Diferentes tipos de condicionais e type guards em TypeScript",
    code: `// Type Guards básicos
function processaValor(valor: string | number) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
        // retorno: string em maiúsculas
    } else {
        return valor.toFixed(2);
        // retorno: número com 2 casas decimais
    }
}


// instanceof Type Guard
class Erro1 extends Error {}
class Erro2 extends Error {}

function trataErro(erro: Error) {
    if (erro instanceof Erro1) {
        console.log("Tratando erro tipo 1");
        // retorno no console: "Tratando erro tipo 1"
    } else if (erro instanceof Erro2) {
        console.log("Tratando erro tipo 2");
        // retorno no console: "Tratando erro tipo 2"
    }
}


// in operator Type Guard
interface Peixe {
    nadar: () => void;
}
interface Passaro {
    voar: () => void;
}

function mover(animal: Peixe | Passaro) {
    if ("nadar" in animal) {
        animal.nadar();
        // retorno: executa método nadar
    } else {
        animal.voar();
        // retorno: executa método voar
    }
}


// User-Defined Type Guards
interface Carro {
    tipo: "carro";
    rodas: number;
}

interface Moto {
    tipo: "moto";
    cilindradas: number;
}

function ehCarro(veiculo: Carro | Moto): veiculo is Carro {
    return veiculo.tipo === "carro";
}

const veiculo1: Carro = { tipo: "carro", rodas: 4 };
if (ehCarro(veiculo1)) {
    console.log(veiculo1.rodas);
    // retorno: 4
}


// Discriminated Unions
type Resposta =
    | { tipo: "sucesso"; dados: string }
    | { tipo: "erro"; mensagem: string };

function processaResposta(resposta: Resposta) {
    if (resposta.tipo === "sucesso") {
        return resposta.dados;
        // retorno: string dos dados
    } else {
        throw new Error(resposta.mensagem);
        // retorno: lança erro com mensagem
    }
}


// Conditional Types
type EhString<T> = T extends string ? true : false;
type Resultado1 = EhString<"texto">;  // true
type Resultado2 = EhString<number>;   // false


// Type Guards com Generics
function isArray<T>(valor: T | T[]): valor is T[] {
    return Array.isArray(valor);
}

function processaItem<T>(item: T | T[]) {
    if (isArray(item)) {
        return item.length;
        // retorno: tamanho do array
    } else {
        return item;
        // retorno: item individual
    }
}


// Type Guards com Union Types
type StringOuNumero = string | number;

function ehString(valor: StringOuNumero): valor is string {
    return typeof valor === "string";
}

function processaValorUnion(valor: StringOuNumero) {
    if (ehString(valor)) {
        return valor.toUpperCase();
        // retorno: string em maiúsculas
    } else {
        return valor.toFixed(2);
        // retorno: número formatado
    }
}`,
    explanation: `// Type Guards básicos

typeof - Verifica tipo primitivo em runtime

Type narrowing automático em blocos condicionais


// instanceof Type Guard

instanceof - Verifica se objeto é instância de classe

Útil para tratamento de erros tipados


// in operator Type Guard

in - Verifica existência de propriedade

Útil para discriminar entre interfaces


// User-Defined Type Guards

is - Cria type guard personalizado

Permite type narrowing customizado


// Discriminated Unions

União discriminada - Usa propriedade comum para distinguir tipos

Pattern matching type-safe


// Conditional Types

extends - Define tipos condicionalmente

Útil para tipos genéricos avançados


// Type Guards com Generics

Type Guards genéricos - Funcionam com qualquer tipo

Mantém type safety com tipos genéricos


// Type Guards com Union Types

Union Types - Combina múltiplos tipos

Custom Type Guards para unions`,
  },

  "funcoes-basicas": {
    title: "Funções Básicas",
    description: "Declaração e uso de funções básicas em TypeScript",
    code: `// Função com tipos
function soma(a: number, b: number): number {
    return a + b;
}
const resultadoSoma = soma(5, 3);
// retorno: 8


// Parâmetros opcionais
function saudacao(nome: string, titulo?: string): string {
    if (titulo) {
        return \`\${titulo} \${nome}\`;
    }
    return \`Olá \${nome}\`;
}
const saudacao1 = saudacao("João");
const saudacao2 = saudacao("João", "Sr.");
// retorno saudacao1: "Olá João"
// retorno saudacao2: "Sr. João"


// Parâmetros padrão
function criarArray(tamanho: number = 3): number[] {
    return new Array(tamanho).fill(0);
}
const array1 = criarArray();
const array2 = criarArray(5);
// retorno array1: [0, 0, 0]
// retorno array2: [0, 0, 0, 0, 0]


// Rest parameters
function somarTodos(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}
const soma1 = somarTodos(1, 2, 3);
const soma2 = somarTodos(1, 2, 3, 4, 5);
// retorno soma1: 6
// retorno soma2: 15


// Função com objeto como parâmetro
interface OpcoesUsuario {
    nome: string;
    idade: number;
    email?: string;
}

function criarUsuario(opcoes: OpcoesUsuario): string {
    const { nome, idade, email = 'não informado' } = opcoes;
    return \`Usuário: \${nome}, Idade: \${idade}, Email: \${email}\`;
}
const usuario = criarUsuario({ nome: "Maria", idade: 25 });
// retorno: "Usuário: Maria, Idade: 25, Email: não informado"


// Function overloads
function processarValor(x: number): number;
function processarValor(x: string): string;
function processarValor(x: number | string): number | string {
    if (typeof x === "number") {
        return x * 2;
    }
    return x.toUpperCase();
}
const proc1 = processarValor(10);
const proc2 = processarValor("hello");
// retorno proc1: 20
// retorno proc2: "HELLO"


// Tipos de função
type OperacaoMatematica = (a: number, b: number) => number;

const multiplicar: OperacaoMatematica = (a, b) => a * b;
const dividir: OperacaoMatematica = (a, b) => a / b;
// retorno multiplicar(4, 2): 8
// retorno dividir(10, 2): 5


// Generic functions
function primeiro<T>(array: T[]): T | undefined {
    return array[0];
}
const primeiroNumero = primeiro([1, 2, 3]);
const primeiraString = primeiro(["a", "b", "c"]);
// retorno primeiroNumero: 1
// retorno primeiraString: "a"


// Funções assíncronas tipadas
async function buscarDados<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}
// retorno: Promise<T>


// Funções com callbacks tipados
function executarComCallback(
    fn: (valor: string) => void,
    valor: string
): void {
    fn(valor);
}
executarComCallback((msg) => console.log(msg), "Olá");
// retorno no console: "Olá"`,
    explanation: `// Função com tipos

Parâmetros tipados - Define tipos dos argumentos

Tipo de retorno - Especifica tipo do valor retornado


// Parâmetros opcionais

? - Marca parâmetro como opcional

Lógica condicional baseada em parâmetros opcionais


// Parâmetros padrão

= - Define valor padrão para parâmetro

Usado quando argumento não é fornecido


// Rest parameters

...numeros - Agrupa múltiplos argumentos em array

Permite número variável de argumentos tipados


// Função com objeto como parâmetro

interface - Define estrutura do objeto parâmetro

Destructuring com valores padrão


// Function overloads

Múltiplas assinaturas - Define diferentes formas de chamar

Type Guard - Diferencia comportamento por tipo


// Tipos de função

type - Define tipo para função

Arrow function com tipo específico


// Generic functions

<T> - Tipo genérico para reuso com diferentes tipos

Flexibilidade com type safety


// Funções assíncronas tipadas

async/await com tipos - Promessas tipadas

Generic para tipo do resultado


// Funções com callbacks tipados

Callbacks tipados - Define tipo do argumento e retorno

Funções como parâmetros com type safety`,
  },
  "funcoes-arrow": {
    title: "Arrow Functions",
    description: "Arrow functions e suas características em TypeScript",
    code: `// Arrow function básica
const soma = (a: number, b: number): number => a + b;
const resultado = soma(5, 3);
// retorno: 8


// Com bloco de código
const multiplicar = (a: number, b: number): number => {
    const resultado = a * b;
    return resultado;
};
const resultadoMult = multiplicar(4, 2);
// retorno: 8


// Como callback em array
const numeros: number[] = [1, 2, 3, 4, 5];
const dobrados = numeros.map((n: number): number => n * 2);
const pares = numeros.filter((n: number): boolean => n % 2 === 0);
// retorno dobrados: [2, 4, 6, 8, 10]
// retorno pares: [2, 4]


// Com tipos genéricos
const primeiro = <T>(arr: T[]): T | undefined => arr[0];
const primeiroNum = primeiro([1, 2, 3]);
const primeiraStr = primeiro(["a", "b", "c"]);
// retorno primeiroNum: 1
// retorno primeiraStr: "a"


// Como método de objeto
interface Calculadora {
    soma: (a: number, b: number) => number;
    multiplica: (a: number, b: number) => number;
}

const calc: Calculadora = {
    soma: (a, b) => a + b,
    multiplica: (a, b) => a * b
};
const resultadoSoma = calc.soma(2, 3);
const resultadoMult2 = calc.multiplica(2, 3);
// retorno resultadoSoma: 5
// retorno resultadoMult2: 6


// Com parâmetros default
const saudacao = (nome: string = "Visitante"): string => 
    \`Olá \${nome}\`;
const msg1 = saudacao();
const msg2 = saudacao("João");
// retorno msg1: "Olá Visitante"
// retorno msg2: "Olá João"


// Com destructuring
interface Pessoa {
    nome: string;
    idade: number;
}

const apresentar = ({ nome, idade }: Pessoa): string => 
    \`\${nome} tem \${idade} anos\`;
const pessoa = { nome: "Ana", idade: 25 };
const apresentacao = apresentar(pessoa);
// retorno: "Ana tem 25 anos"


// Higher-order function
const criarMultiplicador = (fator: number): 
    ((x: number) => number) => {
    return (x: number): number => x * fator;
};

const duplicar = criarMultiplicador(2);
const triplicar = criarMultiplicador(3);
const resultadoDup = duplicar(4);
const resultadoTrip = triplicar(4);
// retorno resultadoDup: 8
// retorno resultadoTrip: 12


// Com Promises
const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    return response.json();
};
// retorno: Promise<T>


// Com type guards
const isString = (valor: unknown): valor is string => 
    typeof valor === "string";

const processarValor = (valor: unknown): string => {
    if (isString(valor)) {
        return valor.toUpperCase();
    }
    return "não é string";
};
const resultado1 = processarValor("teste");
const resultado2 = processarValor(123);
// retorno resultado1: "TESTE"
// retorno resultado2: "não é string"`,
    explanation: `// Arrow function básica

Sintaxe concisa para funções simples

Retorno implícito sem bloco de código


// Com bloco de código

{} - Permite múltiplas instruções

return explícito necessário


// Como callback em array

Ideal para métodos de array

Type inference nos callbacks


// Com tipos genéricos

<T> - Permite reutilização com diferentes tipos

Inferência de tipo automática


// Como método de objeto

interface define tipo das funções

Sintaxe concisa em objetos


// Com parâmetros default

Valores padrão para parâmetros opcionais

Type safety mantida


// Com destructuring

Destructuring tipado de objetos

Acesso direto a propriedades


// Higher-order function

Função que retorna função

Closure com type safety


// Com Promises

async/await em arrow functions

Generics para tipo do resultado


// Com type guards

Predicados de tipo em arrow functions

Narrowing de tipos`,
  },
  "funcoes-recursivas": {
    title: "Funções Recursivas",
    description: "Implementação de funções recursivas em TypeScript",
    code: `// Fatorial recursivo
function fatorial(n: number): number {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}
const fat5 = fatorial(5);
// retorno: 120 (5 * 4 * 3 * 2 * 1)


// Fibonacci recursivo
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
const fib6 = fibonacci(6);
// retorno: 8 (sequência: 0, 1, 1, 2, 3, 5, 8)


// Soma de array recursiva
function somaArray(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr[0] + somaArray(arr.slice(1));
}
const soma = somaArray([1, 2, 3, 4, 5]);
// retorno: 15


// Busca binária recursiva
function buscaBinaria(
    arr: number[], 
    alvo: number, 
    inicio: number = 0, 
    fim: number = arr.length - 1
): number {
    if (inicio > fim) return -1;
    
    const meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] === alvo) return meio;
    
    if (arr[meio] > alvo) {
        return buscaBinaria(arr, alvo, inicio, meio - 1);
    } else {
        return buscaBinaria(arr, alvo, meio + 1, fim);
    }
}
const pos = buscaBinaria([1, 2, 3, 4, 5], 3);
// retorno: 2 (índice do elemento 3)


// Percurso em árvore binária
interface No {
    valor: number;
    esquerda?: No;
    direita?: No;
}

function percorrerArvore(no: No | undefined): void {
    if (!no) return;
    
    console.log(no.valor);          // Pré-ordem
    percorrerArvore(no.esquerda);   // Esquerda
    percorrerArvore(no.direita);    // Direita
}
const arvore: No = {
    valor: 1,
    esquerda: { valor: 2 },
    direita: { valor: 3 }
};
// retorno no console: 1, 2, 3


// Deep clone recursivo
function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as unknown as T;
    }

    return Object.fromEntries(
        Object.entries(obj).map(
            ([key, value]) => [key, deepClone(value)]
        )
    ) as T;
}
const original = { a: 1, b: { c: 2 } };
const clone = deepClone(original);
// retorno: { a: 1, b: { c: 2 } } (novo objeto)


// Contagem regressiva recursiva
function contagemRegressiva(n: number): void {
    if (n < 0) return;
    console.log(n);
    contagemRegressiva(n - 1);
}
// retorno para contagemRegressiva(3) no console: 3, 2, 1, 0


// Reversão de string recursiva
function reverterString(str: string): string {
    if (str === "") return "";
    return reverterString(str.substr(1)) + str.charAt(0);
}
const revertida = reverterString("hello");
// retorno: "olleh"


// Máximo divisor comum (MDC) recursivo
function mdc(a: number, b: number): number {
    if (b === 0) return a;
    return mdc(b, a % b);
}
const resultado = mdc(48, 18);
// retorno: 6`,
    explanation: `// Fatorial recursivo

Caso base - n <= 1 retorna 1

Chamada recursiva - Multiplica n pelo fatorial de (n-1)


// Fibonacci recursivo

Casos base - F(0) = 0 e F(1) = 1

Chamada recursiva - Soma os dois números anteriores


// Soma de array recursiva

Caso base - Array vazio retorna 0

Chamada recursiva - Soma primeiro elemento com resto do array


// Busca binária recursiva

Caso base - Quando não encontra ou encontra o elemento

Chamadas recursivas - Divide o array pela metade

Eficiente para arrays ordenados


// Percurso em árvore binária

Caso base - Nó nulo retorna void

Visita em pré-ordem - Raiz, esquerda, direita

Type safety com interface No


// Deep clone recursivo

Caso base - Valor primitivo ou null

Chamada recursiva para objetos e arrays

Mantém tipos com generics


// Contagem regressiva recursiva

Caso base - Número negativo

Chamada recursiva decrementando


// Reversão de string recursiva

Caso base - String vazia

Concatena caracteres em ordem reversa


// MDC recursivo

Caso base - Segundo número é zero

Chamada recursiva com resto da divisão`,
  },
  "funcoes-anonimas": {
    title: "Funções Anônimas",
    description: "Funções anônimas e suas aplicações em TypeScript",
    code: `// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("Executado imediatamente");
})();
// retorno no console: "Executado imediatamente"

// IIFE com parâmetros tipados
(function(x: number): void {
    console.log(x * 2);
})(21);
// retorno no console: 42


// Função anônima em variável
const saudacao = function(nome: string): string {
    return \`Olá \${nome}\`;
};
const msg = saudacao("Maria");
// retorno: "Olá Maria"


// Como callback em array
[1, 2, 3].forEach(function(item: number): void {
    console.log(item * 2);
});
// retorno no console: 2, 4, 6


// Em event handlers
interface Evento {
    tipo: string;
    dados: unknown;
}

const handler = function(evento: Evento): void {
    console.log(\`Evento do tipo: \${evento.tipo}\`);
};
const meuEvento: Evento = { tipo: "click", dados: null };
handler(meuEvento);
// retorno no console: "Evento do tipo: click"


// Closure com tipo
function criarContador(): () => number {
    let count: number = 0;
    return function(): number {
        return ++count;
    };
}
const contador = criarContador();
const valor1 = contador();
const valor2 = contador();
// retorno valor1: 1
// retorno valor2: 2


// Higher-order function com tipos
function executarOperacao(
    a: number,
    b: number,
    operacao: (x: number, y: number) => number
): number {
    return operacao(a, b);
}

const resultado = executarOperacao(5, 3, function(x, y) {
    return x * y;
});
// retorno: 15


// Currying com funções anônimas
const curry = function(fn: Function) {
    return function curried(...args: any[]): any {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...moreArgs: any[]) {
            return curried(...args, ...moreArgs);
        };
    };
};

const somarTres = function(a: number, b: number, c: number): number {
    return a + b + c;
};

const somarCurried = curry(somarTres);
const resultado1 = somarCurried(1)(2)(3);
const resultado2 = somarCurried(1, 2)(3);
// retorno resultado1: 6
// retorno resultado2: 6


// Função anônima assíncrona
const fetchData = async function<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
};
// retorno: Promise<T>


// Função anônima com generics
const primeiro = function<T>(arr: T[]): T | undefined {
    return arr[0];
};
const primeiroNumero = primeiro([1, 2, 3]);
const primeiraString = primeiro(["a", "b", "c"]);
// retorno primeiroNumero: 1
// retorno primeiraString: "a"`,
    explanation: `// IIFE

Executa imediatamente após definição

Útil para criar escopo isolado


// IIFE com parâmetros

Aceita parâmetros tipados

Execução imediata com argumentos


// Função anônima em variável

Função sem nome atribuída a variável

Pode ser reutilizada através da variável


// Como callback

Comum em métodos de array

Executa para cada elemento com type safety


// Em event handlers

Funções para tratar eventos tipados

Interface define estrutura do evento


// Closure com tipo

Função interna acessa variáveis externas

Mantém estado entre chamadas com type safety


// Higher-order function

Função que recebe função como parâmetro

Tipos definidos para parâmetros e retorno


// Currying com funções anônimas

Transforma função com múltiplos argumentos

Permite aplicação parcial de argumentos


// Função anônima assíncrona

async/await em função anônima

Generic para tipo do resultado


// Função anônima com generics

Tipos genéricos para reuso

Inferência de tipo automática`,
  },
  callbacks: {
    title: "Callbacks e Promises",
    description: "Trabalho com callbacks, promises e async/await em TypeScript",
    code: `// Callback simples
function processarDados(
    dados: string[],
    callback: (erro: Error | null, resultado?: string[]) => void
): void {
    try {
        const processado = dados.map(d => d.toUpperCase());
        callback(null, processado);
    } catch (erro) {
        callback(erro as Error);
    }
}

processarDados(["a", "b", "c"], (erro, resultado) => {
    if (erro) console.error(erro);
    else console.log(resultado);
});
// retorno no console: ["A", "B", "C"]


// Promise básica
function buscarDados(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["dado1", "dado2"]);
            // ou reject(new Error("Erro ao buscar"))
        }, 1000);
    });
}

buscarDados()
    .then(dados => console.log(dados))
    .catch(erro => console.error(erro));
// retorno após 1s: ["dado1", "dado2"]


// Async/Await com type safety
async function obterDados(): Promise<string[]> {
    try {
        const dados = await buscarDados();
        return dados.map(d => d.toUpperCase());
    } catch (erro) {
        throw new Error(\`Erro ao buscar dados: \${erro}\`);
    }
}

const dados = await obterDados();
// retorno: ["DADO1", "DADO2"]


// Promise.all com tipagem
interface Usuario {
    id: number;
    nome: string;
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

async function buscarUsuarios(): Promise<Usuario[]> {
    return [{ id: 1, nome: "João" }];
}

async function buscarProdutos(): Promise<Produto[]> {
    return [{ id: 1, nome: "Produto", preco: 100 }];
}

async function buscarTudo(): Promise<{
    usuarios: Usuario[];
    produtos: Produto[];
}> {
    const [usuarios, produtos] = await Promise.all([
        buscarUsuarios(),
        buscarProdutos()
    ]);
    return { usuarios, produtos };
}
// retorno: { usuarios: [...], produtos: [...] }


// Promise com generic
function getData<T>(url: string): Promise<T> {
    return fetch(url).then(response => response.json());
}

interface Post {
    id: number;
    title: string;
}

const post = await getData<Post>('/api/post');
// retorno: { id: number, title: string }


// Event Emitter tipado
interface EventMap {
    data: (data: string) => void;
    error: (error: Error) => void;
    end: () => void;
}

class TypedEventEmitter {
    private listeners: Partial<Record<keyof EventMap, Function[]>> = {};

    on<K extends keyof EventMap>(event: K, listener: EventMap[K]): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]?.push(listener);
    }

    emit<K extends keyof EventMap>(
        event: K,
        ...args: Parameters<EventMap[K]>
    ): void {
        this.listeners[event]?.forEach(listener => {
            listener(...args);
        });
    }
}

const emitter = new TypedEventEmitter();
emitter.on("data", (data) => console.log(data));
emitter.emit("data", "teste");
// retorno no console: "teste"


// Async Iterator
async function* gerarNumeros(): AsyncIterableIterator<number> {
    let i = 0;
    while (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i++;
    }
}

for await (const num of gerarNumeros()) {
    console.log(num);
}
// retorno no console a cada 1s: 0, 1, 2`,
    explanation: `// Callback simples

Callback tipado com padrão erro-primeiro

Try-catch para tratamento seguro de erros


// Promise básica

Promise tipada com generics

Resolve/Reject com tipos específicos


// Async/Await com type safety

async/await com tratamento de erros

Tipo de retorno Promise explícito


// Promise.all com tipagem

Promise.all mantém tipos individuais

Desestruturação tipada do resultado


// Promise com generic

Fetch tipado com generics

Interface define estrutura da resposta


// Event Emitter tipado

Interface para eventos tipados

Tipo genérico para diferentes eventos

Parameters<T> para inferência de tipos


// Async Iterator

AsyncIterableIterator para iteração assíncrona

Yield com tipo específico

For await...of para consumir iterador`,
  },
};
