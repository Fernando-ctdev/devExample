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
    category: "Fundamentos Go Lang",
    items: [
      { id: "Pacotes", title: "Tipos em Go" },
      { id: "variaveis", title: "Variáveis e Constantes" },
      { id: "Tipos", title: "Tipos de dados" },
      { id: "Funções", title: "Funçoes em Go" },
      { id: "Operadores", title: "Operadores" },
      { id: "Structs", title: "Structs em Go" },
      { id: "Arrays", title: "Arrays e Slices" },
      { id: "Ponteiros", title: "Ponteiros" },
      { id: "Maps", title: "Maps" },
      { id: "Estruturas de controle", title: "Condicionais e Loops" },
      { id: "Métodos", title: "Métodos" },
      { id: "Interfaces", title: "Interfaces" },
    ],
  },
  {
    category: "Funções Avançadas",
    items: [
      { id: "retornoNomeado", title: "Funções retorno nomeado" },
      { id: "FunçõesVariáticas", title: "Funções variáticas" },
      { id: "FunçõesAnônimas", title: "Funções anônimas" },
      { id: "FunçõesRecursivas", title: "Funções recursivas" },
      { id: "Defer", title: "Defer" },
      { id: "PanicRecover", title: "Panic-Recover" },
      { id: "Closure", title: "Closure" },
      { id: "Init", title: "Init" },
    ],
  },
  {
    category: "Interfaces e Tipos Avançados",
    items: [
      { id: "Formas", title: "Formas" },
      { id: "TipoGenerico", title: "Tipo generico" },
    ],
  },
  {
    category: "Concorrência em Go",
    items: [
      { id: "Go routines", title: "Go routines" },
      { id: "Waitgroup", title: "Waitgroup" },
      { id: "Canais", title: "Canais" },
      { id: "Canais com buffer", title: "Canais com buffer" },
      { id: "Select", title: "Select" },
    ],
  },
  {
    category: "Padrões de concorrência",
    items: [
      { id: "Worker pools", title: "Worker pools" },
      { id: "Generator", title: "Generator" },
      { id: "Multiplexador", title: "Multiplexador" },
    ],
  },
  {
    category: "Principais pacotes Go",
    items: [
      { id: "fmt", title: "fmt" },
      { id: "string", title: "string" },
      { id: "int", title: "int" },
      { id: "time", title: "time" },
      { id: "os", title: "os" },
      { id: "net/http", title: "net/http" },
    ],
  },
  {
    category: "Principais Verbos de Formatação",
    items: [{ id: "Verbos", title: "Verbos de Formatação" }],
  },
  {
    category: "Testes e Debug",
    items: [
      { id: "testeUnitario", title: "Testes Unitários" },
      { id: "testeBenchmark", title: "Benchmarks" },
      { id: "testeCobertura", title: "Cobertura de Testes" },
      { id: "testeMock", title: "Mocks e Stubs" },
      { id: "debugging", title: "Debugging" },
    ],
  },
  {
    category: "Segurança e Autenticação",
    items: [
      { id: "jwt", title: "JWT em Go" },
      { id: "hash", title: "Hash e Criptografia" },
      { id: "middleware", title: "Middleware de Autenticação" },
      { id: "oauth", title: "OAuth2" },
      { id: "cors", title: "CORS em Go" },
    ],
  },
  {
    category: "Framework Gin",
    items: [
      { id: "ginintro", title: "Introdução ao Gin" },
      { id: "ginestrutura", title: "Estrutura de Projeto" },
      { id: "ginrotas", title: "Rotas e Parâmetros" },
      { id: "ginmiddlewares", title: "Middlewares no Gin" },
      { id: "ginerro", title: "Tratamento de Erros no Gin" },
      { id: "gingruposrotas", title: "Grupos de Rotas" },
      { id: "ginvaloresdinamicos", title: "Valores Dinâmicos nas Rotas" },
      { id: "ginvalidador", title: "Validação de Requisição" },
      { id: "ginresponse", title: "Manipulação de Respostas" },
      { id: "ginpersistencia", title: "Persistência de Dados" },
      { id: "autenticacao", title: "Autenticação e Autorização" },
      { id: "logs", title: "Logs e Monitoramento no Gin" },
    ],
  }
];


export const examplesgo: Record<string, Example> = {
  Pacotes: {
    title: "Tipos em Go",
    description: "Os tipos básicos e estruturados em GoLang",
    code: `// Declaração de variáveis em Go com tipo explícito
var texto string = "Olá, Mundo"
var numero int = 42
var decimal float64 = 3.14159
var booleano bool = true

// Uso de inferência de tipo com 'var' e ':='
textoInferido := "Olá, Go!"
numeroInferido := 100
decimalInferido := 2.71828
booleanoInferido := false`,
    explanation: `Go usa tipagem estática para garantir a consistência de tipos em tempo de compilação. 
Você pode declarar variáveis explicitamente ou confiar na inferência de tipo. No exemplo acima, 'var' permite que você declare uma variável com tipo explícito, 
e a inferência de tipo usa a sintaxe ':=' para atribuições sem especificação explícita de tipo.
Isso ajuda a evitar erros relacionados a tipos enquanto mantém a legibilidade do código.`,
  },

  variaveis: {
    title: "Variáveis e Constantes",
    description: "Como declarar e utilizar variáveis e constantes em Go",
    code: `// Declarando variáveis de forma explícita e utilizando inferência
var idade int = 30
var nome string = "João"

// Usando a inferência de tipo
cidade := "São Paulo"
altura := 1.75

// Declarando constantes com 'const'
const Pi = 3.14159
const nomeDaEmpresa = "GoCorp"`,
    explanation: `Em Go, as variáveis podem ser declaradas de forma explícita utilizando a palavra-chave 'var' com um tipo definido, 
ou através da inferência de tipo usando ':=' para atribuição implícita de tipo. 
Já as constantes, que não podem ser alteradas após sua inicialização, são declaradas com a palavra-chave 'const'. O exemplo mostra a declaração de constantes e variáveis de maneira clara e eficiente.`,
  },

  Tipos: {
    title: "Tipos de dados",
    description: "Entenda os diferentes tipos de dados disponíveis em Go",
    code: `// Tipos primitivos e compostos em Go
var inteiro int = 10
var flutuante float64 = 3.14159
var texto string = "Olá, Go!"
var booleano bool = true

// Tipos compostos: Arrays e Slices
var arrayDeInteiros [3]int = [3]int{1, 2, 3}
var sliceDeInteiros []int = []int{1, 2, 3, 4, 5}`,

    explanation: `Go oferece uma variedade de tipos de dados para armazenar informações. 
Os tipos primitivos como 'int', 'float64', 'string', e 'bool' são fundamentais para representar números, textos e valores booleanos. 
Além disso, Go permite o uso de tipos compostos como arrays (com tamanho fixo) e slices (com tamanho dinâmico), que são amplamente usados na manipulação de coleções de dados.`,
  },

  Funções: {
    title: "Funções em Go",
    description: "Definindo funções e retornando valores",
    code: `// Função simples que recebe um parâmetro e retorna um valor
func saudacao(nome string) string {
    return "Olá, " + nome + "!"
}

// Função com múltiplos parâmetros
func somar(a int, b int) int {
    return a + b
}

// Função sem retorno (usando 'void' equivalente)
func imprimirMensagem(mensagem string) {
    fmt.Println(mensagem)
}`,
    explanation: `As funções em Go são definidas com a palavra-chave 'func' e podem ter parâmetros e retornos de diferentes tipos. 
No exemplo, a função 'saudacao' recebe um parâmetro do tipo string e retorna um valor do tipo string. 
Go também permite funções com múltiplos parâmetros e funções sem retorno, como a 'imprimirMensagem' que apenas imprime uma mensagem na saída padrão.`,
  },

  Operadores: {
    title: "Operadores",
    description: "Operadores aritméticos, relacionais e lógicos em Go",
    code: `// Operadores aritméticos
var soma = 10 + 5    // Soma
var subtracao = 10 - 5    // Subtração
var multiplicacao = 10 * 5    // Multiplicação
var divisao = 10 / 5    // Divisão

// Operadores relacionais
var maiorQue = 10 > 5    // Maior que
var igual = 10 == 10    // Igual
var diferente = 10 != 5    // Diferente

// Operadores lógicos
var eVerdade = true && false    // E lógico
var ouVerdade = true || false    // Ou lógico
var naoVerdade = !true    // Não lógico
// return: 15
// return: 5
// return: 50
// return: 2
// return: true
// return: true
// return: true
// return: false
// return: true
// return: false`,
        explanation: `Go possui operadores aritméticos, relacionais e lógicos que permitem manipulação de dados e controle de fluxo. 
Os operadores aritméticos são usados para realizar operações matemáticas simples. 
Os operadores relacionais comparam valores, e os operadores lógicos servem para combinar condições booleanas no controle de fluxo de execução.`,
    },

    Structs: {
        title: "Structs em Go",
        description: "Como usar structs para agrupar dados em Go",
        code: `// Definindo uma struct
type Pessoa struct {
        Nome   string
        Idade  int
        Endereco string
}

// Inicializando e acessando valores em structs
pessoa := Pessoa{"João", 25, "Rua 123"}
fmt.Println("Nome:", pessoa.Nome)
fmt.Println("Idade:", pessoa.Idade)
fmt.Println("Endereço:", pessoa.Endereco)
// return: Nome: João
// return: Idade: 25
// return: Endereço: Rua 123`,
        explanation: `Structs em Go são tipos compostos que permitem agrupar dados de diferentes tipos sob uma única estrutura. 
No exemplo, a struct 'Pessoa' possui campos de tipo 'string' para o nome e endereço, e um campo de tipo 'int' para a idade. 
Você pode inicializar uma struct com valores diretamente e acessar seus campos usando a notação de ponto ('.').`,
    },

    Arrays: {
        title: "Arrays e Slices",
        description: "Arrays e slices em Go",
        code: `// Arrays em Go com tamanho fixo
var arr [3]int = [3]int{1, 2, 3}

// Slices em Go com tamanho dinâmico
var slice []int = []int{1, 2, 3, 4, 5}

// Modificando valores em arrays e slices
arr[0] = 10
slice = append(slice, 6)
// return: [1, 2, 3]
// return: [1, 2, 3, 4, 5]
// return: [10, 2, 3]
// return: [1, 2, 3, 4, 5, 6]`,
        explanation: `Arrays em Go possuem tamanho fixo, enquanto slices são mais flexíveis, permitindo crescimento dinâmico. 
Arrays são úteis quando você sabe de antemão o número de elementos, enquanto slices são melhores quando o tamanho do conjunto de dados pode mudar durante a execução do programa. 
O exemplo mostra como modificar valores em arrays e adicionar elementos em slices usando a função 'append'.`,
    },

    PonteirosGo: {
        title: "Ponteiros",
        description: "Trabalhando com ponteiros em Go",
        code: `// Ponteiros em Go para manipulação indireta de variáveis
var numero int = 10
var ponteiro *int = &numero  // Obtendo o endereço de memória da variável

fmt.Println("Valor de numero:", numero)
fmt.Println("Endereço de numero:", ponteiro)
fmt.Println("Valor apontado pelo ponteiro:", *ponteiro)
// return: Valor de numero: 10
// return: Endereço de numero: 0x... (endereço de memória)
// return: Valor apontado pelo ponteiro: 10`,
        explanation: `Ponteiros são variáveis que armazenam o endereço de memória de outra variável. 
O operador '&' é usado para obter o endereço de memória de uma variável, enquanto '*' é usado para acessar o valor armazenado nesse endereço.
Neste exemplo, mostramos como manipular o valor de uma variável indiretamente através de um ponteiro.`,
    },

    Maps: {
        title: "Maps",
        description: "Maps (ou dicionários) em Go",
        code: `// Maps em Go para armazenar pares chave-valor
var numeros map[string]int = map[string]int{"um": 1, "dois": 2}

// Criando um map com a notação curta
pessoas := map[string]string{
        "João": "Analista",
        "Maria": "Desenvolvedora",
}

// Adicionando um item a um map
pessoas["Pedro"] = "Designer"

// Verificando se uma chave existe
cargo, existe := pessoas["João"]
fmt.Println("Cargo de João:", cargo, "Existe?", existe)
// return: Cargo de João: Analista Existe? true`,
        explanation: `Maps em Go são coleções de pares chave-valor, onde cada chave é única. 
No exemplo, o mapa 'numeros' associa strings a inteiros, enquanto o mapa 'pessoas' associa nomes a cargos. 
Você pode verificar se uma chave existe no mapa ao utilizar a segunda variável, como mostrado no exemplo de 'cargo' e 'existe'.`,
    },
    "Estruturas de controle": {
        title: " Estruturas de controle",
        description: "Estruturas de controle como if, switch, for em Go",
        code: `// Exemplo de if-else
if idade >= 18 {
        fmt.Println("Adulto")
} else {
        fmt.Println("Menor de idade")
}
// return: Adulto ou Menor de idade`,
explanation: `Estruturas de controle são mecanismos fundamentais em Go para controlar o fluxo de execução 
do programa, permitindo tomada de decisões e repetições.

Elementos principais:
- if/else: Executa código com base em condições
- switch: Seleciona código baseado em múltiplas condições
- for: Único loop em Go, versátil para diferentes tipos de iteração
- break/continue: Controla o fluxo dentro de loops
- defer: Adia execução até o fim da função atual`,

  },
  Métodos: {
    title: " Métodos",
    description: "Definindo métodos em Go",
    code: `// Definindo um método
type Pessoa struct {
    Nome string
}

func (p Pessoa) saudacao() string {
    return "Olá, " + p.Nome
  }`,
    explanation: `Métodos em Go são funções associadas a um tipo específico.
  No exemplo, criamos um método 'saudacao' para o tipo 'Pessoa'.
  O receptor (p Pessoa) indica que este método pertence ao tipo Pessoa.`,
  },

  Interfaces: {
    title: "Interfaces",
    description: "Definindo interfaces em Go",
    code: `// Definindo uma interface
type Saudavel interface {
    saudacao() string
}

type Pessoa struct {
    Nome string
}

func (p Pessoa) saudacao() string {
    return "Olá, " + p.Nome
}

func exibirSaudacao(s Saudavel) {
    fmt.Println(s.saudacao())
}

func main() {
    p := Pessoa{Nome: "João"}
    exibirSaudacao(p)
}`,
    explanation: `Interfaces em Go definem um conjunto de métodos que um tipo deve implementar. 
No exemplo, a interface 'Saudavel' exige que qualquer tipo que a implemente tenha o método 'saudacao'. 
A função 'exibirSaudacao' recebe um parâmetro do tipo 'Saudavel' e pode ser usada para chamar o método 'saudacao' de qualquer tipo que implemente essa interface. 
No caso, 'Pessoa' implementa a interface implicitamente, pois define o método 'saudacao'.`,
  },

  retornoNomeado: {
    title: "Funções com retorno nomeado",
    description: "Explorando funções avançadas em Go",
    code: `// Funções com retorno nomeado
func soma(a, b int) (resultado int) {
  resultado = a + b
  return
}

func main() {
  fmt.Println(soma(3, 4))
}`,
    explanation: `Funções com retorno nomeado permitem que o valor a ser retornado seja nomeado dentro da assinatura da função. 
No exemplo, a função 'soma' retorna o valor nomeado 'resultado', que é atribuído e retornado implicitamente.`,
  },

  FunçõesVariáticas: {
    title: " Funções Variáticas",
    description: "Usando funções variáticas em Go",
    code: `// Função variática
func somarNumeros(numeros ...int) int {
  total := 0
  for _, numero := range numeros {
      total += numero
  }
  return total
}

func main() {
  fmt.Println(somarNumeros(1, 2, 3, 4, 5))
}`,
    explanation: `Funções variáticas permitem passar um número variável de argumentos para uma função. 
No exemplo, a função 'somarNumeros' pode receber qualquer quantidade de inteiros e somá-los.`,
  },

  FunçõesAnônimas: {
    title: " Funções Anônimas",
    description: "Trabalhando com funções anônimas em Go",
    code: `// Função anônima
func main() {
  saudacao := func(nome string) {
      fmt.Println("Olá,", nome)
  }
  saudacao("João")
}`,
    explanation: `Funções anônimas não possuem nome e podem ser atribuídas a variáveis, como no exemplo. 
A função 'saudacao' é anônima e é atribuída à variável 'saudacao' para ser chamada mais tarde.`,
  },

  FunçõesRecursivas: {
    title: " Funções Recursivas",
    description: "Entendendo funções recursivas em Go",
    code: `// Função recursiva para calcular fatorial
func fatorial(n int) int {
  if n == 0 {
      return 1
  }
  return n * fatorial(n-1)
}

func main() {
  fmt.Println(fatorial(5))
}`,
    explanation: `Funções recursivas são aquelas que se chamam dentro delas mesmas. 
No exemplo, a função 'fatorial' chama a si mesma até que a condição base (n == 0) seja alcançada.`,
  },

  Defer: {
    title: " Defer",
    description: "Usando defer para adiar a execução de funções",
    code: `// Usando defer
func exemploDefer() {
  defer fmt.Println("Isso será impresso ao final")
  fmt.Println("Isso será impresso primeiro")
}

func main() {
  exemploDefer()
}`,
    explanation: `A palavra-chave 'defer' é usada para adiar a execução de uma função até que a função corrente retorne. 
No exemplo, a mensagem 'Isso será impresso ao final' é impressa após a execução da função, apesar de ter sido chamada primeiro.`,
  },

  PanicRecover: {
    title: " Panic e Recover",
    description: "Tratando erros com Panic e Recover",
    code: `// Usando Panic e Recover
func causarPanic() {
  panic("Algo deu errado!")
}

func main() {
  defer func() {
      if r := recover(); r != nil {
          fmt.Println("Recuperado de:", r)
      }
  }()
  
  causarPanic()
  fmt.Println("Essa linha não será alcançada")
}`,
    explanation: `Panic é usado para gerar um erro em Go, e Recover permite capturar esse erro e recuperar a execução normal do programa. 
No exemplo, a função 'causarPanic' gera um erro, que é capturado e tratado pela função anônima usando 'recover'.`,
  },

  Closure: {
    title: " Closure",
    description: "Entendendo closures em Go",
    code: `// Closure
func contador() func() int {
  i := 0
  return func() int {
      i++
      return i
  }
}

func main() {
  c := contador()
  fmt.Println(c())
  fmt.Println(c())
  fmt.Println(c())
}`,
    explanation: `Closures são funções que capturam o ambiente onde foram criadas, incluindo variáveis externas a elas. 
No exemplo, a função 'contador' retorna uma função anônima que tem acesso à variável 'i' do escopo externo.`,
  },

  Ponteiros: {
    title: "Ponteiros",
    description: "Trabalhando com ponteiros em Go",
    code: `// Usando ponteiros para modificar valores
package main

import "fmt"

// Função que altera o valor da variável original usando ponteiro
func alterarValor(x *int) {
    *x = 10 // Modifica o valor armazenado no endereço apontado por 'x'
}

func main() {
    a := 5
    fmt.Println("Antes da alteração:", a)
    
    alterarValor(&a) // Passa o endereço de 'a' para a função
    fmt.Println("Depois da alteração:", a)
}`,
    explanation: `Ponteiros são usados em Go para armazenar o endereço de memória de uma variável, permitindo que funções modifiquem diretamente o valor original.

//No exemplo:
1. A função \`alterarValor\` recebe um ponteiro para um inteiro (\`*int\`).
2. Dentro da função, o operador de desreferenciamento (\`*\`) é usado para acessar e alterar o valor armazenado no endereço fornecido.
3. No \`main\`, o endereço da variável \`a\` é passado para \`alterarValor\` usando o operador de endereço (\`&\`).
4. Após a chamada, a variável \`a\` no escopo original foi modificada para o novo valor atribuído pela função (\`10\`).

Isso é útil para evitar cópias desnecessárias de valores e para manipular diretamente estruturas de dados em memória.`,
  },

  Init: {
    title: " Init",
    description: "Função init em Go",
    code: `// Função init
package main

import "fmt"

func init() {
  fmt.Println("Função init chamada")
}

func main() {
  fmt.Println("Função main chamada")
}`,
    explanation: `A função 'init' é chamada automaticamente antes da função 'main' e é usada para inicializações que precisam ocorrer antes da execução do programa. 
No exemplo, 'init' é chamada antes de 'main', exibindo a mensagem 'Função init chamada' primeiro.`,
  },

  Formas: {
    title: " Formas",
    description: "Trabalhando com formas geométricas em Go",
    code: `// Estruturas para formas geométricas
type Retangulo struct {
  largura, altura int
}

func (r Retangulo) area() int {
  return r.largura * r.altura
}

func main() {
  r := Retangulo{largura: 10, altura: 5}
  fmt.Println("Área do retângulo:", r.area())
}`,
    explanation: `Neste exemplo, uma struct 'Retangulo' é definida para representar uma forma geométrica. 
A função 'area' é um método associado ao tipo 'Retangulo', e calcula a área do retângulo com base nas suas propriedades 'largura' e 'altura'.`,
  },

  TipoGenerico: {
    title: " Tipo Genérico",
    description: "Usando tipos genéricos em Go",
    code: `// Usando tipos genéricos
package main

import "fmt"

func imprimir[T any](valor T) {
  fmt.Println(valor)
}

func main() {
  imprimir(42)
  imprimir("Texto genérico")
}`,
    explanation: `Go 1.18 introduziu suporte para tipos genéricos, permitindo que funções e tipos aceitem argumentos de diferentes tipos. 
No exemplo, a função 'imprimir' usa um tipo genérico 'T', que pode ser qualquer tipo, e imprime seu valor. 
A palavra-chave 'any' é usada para indicar que qualquer tipo pode ser passado.`,
  },
  "Go routines": {
    title: "Go routines",
    description: "Execução de código de forma concorrente em Go",
    code: `// Função que será executada concorrentemente
func imprimir(texto string) {
    fmt.Println(texto)
}

func main() {
    // Executa em segundo plano
    go imprimir("Olá")
    
    // Executa função anônima
    go func() {
        fmt.Println("Mundo")
    }()
    
    // Dá tempo para as goroutines executarem
    time.Sleep(time.Second)
}`,
    explanation: `Goroutines são funções que executam de forma concorrente.
Use a palavra-chave 'go' antes da chamada da função.
São leves e você pode criar milhares delas.
No exemplo, usamos time.Sleep() apenas para demonstração.`,
  },
  Waitgroup: {
    title: "Waitgroup",
    description: "Esperando a conclusão de múltiplas Go routines",
    code: `// Usando WaitGroup
var wg sync.WaitGroup
wg.Add(1)

go func() {
    defer wg.Done()
    fmt.Println("Go routine executada")
}()

wg.Wait()`,
    explanation:
      "O WaitGroup é usado para esperar até que um conjunto de Go routines termine sua execução.",
  },
  Canais: {
    title: "Canais",
    description: "Comunicação entre Go routines com canais",
    code: `// Exemplo de canal
ch := make(chan string)

go func() {
    ch <- "Mensagem da Go routine"
}()

msg := <-ch
fmt.Println(msg)`,
    explanation:
      "Canais permitem a comunicação segura entre Go routines, permitindo passar dados de uma Go routine para outra.",
  },
  "Canais com buffer": {
    title: "Canais com buffer",
    description: "Canais com buffer para armazenamento temporário de dados",
    code: `// Canais com buffer
ch := make(chan string, 2)

ch <- "Mensagem 1"
ch <- "Mensagem 2"

fmt.Println(<-ch)
fmt.Println(<-ch)`,
    explanation:
      "Canais com buffer têm uma capacidade limitada para armazenar valores, permitindo que uma Go routine envie dados sem que a outra precise estar imediatamente disponível para recebê-los.",
  },
  Select: {
    title: "Select em Go",
    description: "Controlando múltiplos canais com select",
    code: `// Exemplo de select com timeout e canal default
  func main() {
      canal1 := make(chan string)
      canal2 := make(chan string)
      done := make(chan bool)
  
      // Goroutine que envia dados após 2 segundos
      go func() {
          time.Sleep(2 * time.Second)
          canal1 <- "Mensagem do canal 1"
      }()
  
      // Goroutine que envia dados após 1 segundo
      go func() {
          time.Sleep(1 * time.Second)
          canal2 <- "Mensagem do canal 2"
      }()
  
      // Select com timeout
      for i := 0; i < 2; i++ {
          select {
          case msg1 := <-canal1:
              fmt.Println(msg1)
              // retorno: "Mensagem do canal 1"
  
          case msg2 := <-canal2:
              fmt.Println(msg2)
              // retorno: "Mensagem do canal 2"
  
          case <-time.After(3 * time.Second):
              fmt.Println("Timeout!")
              return
  
          default:
              fmt.Println("Nenhuma mensagem disponível")
              time.Sleep(500 * time.Millisecond)
          }
      }
  }`,
    explanation: `Select permite trabalhar com múltiplos canais:
  
  - Espera por múltiplos canais simultaneamente
  - Escolhe o primeiro canal que estiver pronto/com dados
  - case default: executa quando nenhum canal está pronto
  - time.After(): adiciona timeout para evitar espera infinita
  
  Casos de uso comuns:
  1. Timeout em operações
  2. Processamento de múltiplas fontes de dados
  3. Cancelamento de operações
  4. Controle de concorrência`,
  },
  "Worker pools": {
    title: "Worker pools",
    description: "Padrão de concorrência worker pool para distribuir tarefas",
    code: `// Exemplo de worker pool
type Job struct {
    id int
}

func worker(jobs <-chan Job, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        fmt.Println("Processando job", job.id)
    }
}

func main() {
    var wg sync.WaitGroup
    jobs := make(chan Job, 5)

    for w := 1; w <= 3; w++ {
        go worker(jobs, &wg)
    }

    for j := 1; j <= 5; j++ {
        jobs <- Job{id: j}
    }

    close(jobs)
    wg.Wait()
}`,
explanation: `Worker pools é um padrão de concorrência que permite processar tarefas em paralelo 
de forma controlada e eficiente, muito útil para processamento distribuído em Go.

O padrão Worker Pool é utilizado para distribuir uma carga de trabalho entre várias goroutines, equilibrando a execução de tarefas. 

Elementos principais:
- Pool de workers: Grupo de goroutines para processamento
- Canal de tarefas: Distribui trabalho entre workers
- WaitGroup: Sincroniza conclusão das tarefas
- Controle de concorrência: Limita número de workers ativos
- Processamento paralelo: Executa tarefas simultaneamente`,
  },
  Generator: {
    title: "Generator",
    description:
      "Padrão de concorrência generator para gerar sequência de valores",
    code: `// Exemplo de Generator
func generator() <-chan int {
    ch := make(chan int)
    go func() {
        for i := 0; ; i++ {
            ch <- i
        }
    }()
    return ch
}

func main() {
    ch := generator()
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
    explanation:
      `Generators são padrões de concorrência em Go que criam sequências de valores sob demanda, 
      permitindo processamento eficiente de grandes conjuntos de dados.

Elementos principais:
- Canal de saída: Envia valores gerados
- Goroutine: Executa geração em background
- Lazy evaluation: Gera valores conforme necessário
- Closure: Mantém estado entre gerações
- Controle de finalização: Fecha canal quando apropriado.`,
  },
  Multiplexador: {
    title: "Multiplexador",
    description:
      "Padrão de concorrência multiplexador para gerenciamento de múltiplas fontes",
    code: `// Exemplo de multiplexador
func multiplexador(ch1, ch2 <-chan string) <-chan string {
    ch := make(chan string)
    go func() {
        for {
            select {
            case msg1 := <-ch1:
                ch <- msg1
            case msg2 := <-ch2:
                ch <- msg2
            }
        }
    }()
    return ch
}

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        ch1 <- "Mensagem de ch1"
    }()
    go func() {
        ch2 <- "Mensagem de ch2"
    }()

    ch := multiplexador(ch1, ch2)
    fmt.Println(<-ch)
}`,
    explanation:
      `Multiplexador é um padrão de concorrência que combina múltiplos canais em um único fluxo 
de dados, facilitando o gerenciamento de várias fontes de dados concorrentes.

Elementos principais:
- Select: Gerencia múltiplos canais
- Canal de saída: Unifica dados dos canais fonte
- Goroutine dedicada: Executa multiplexação
- Controle de fechamento: Gerencia término dos canais
- Priorização: Pode definir ordem de processamento`,
  },
  fmt: {
    title: "Funções do Pacote fmt",
    description:
      "Principais funções do pacote fmt em Go para entrada e saída formatada",
    code: `// Print - Imprime diretamente no console
fmt.Print("Olá", "Mundo", 123)
// retorno: OláMundo123

// Println - Imprime com quebra de linha
fmt.Println("Olá", "Mundo", 123)
// retorno: Olá Mundo 123
// (adiciona espaços entre argumentos e quebra de linha no final)

// Printf - Imprime texto formatado
nome := "João"
idade := 25
fmt.Printf("Nome: %s, Idade: %d\\n", nome, idade)
// retorno: Nome: João, Idade: 25

// Sprintf - Retorna string formatada
texto := fmt.Sprintf("Nome: %s, Idade: %d", nome, idade)
fmt.Println(texto)
// retorno: Nome: João, Idade: 25

// Fprintf - Escreve texto formatado em um io.Writer
arquivo, err := os.Create("saida.txt")
if err != nil {
    return err
}
defer arquivo.Close()

fmt.Fprintf(arquivo, "Nome: %s\\n", nome)
// retorno: Escreve "Nome: João" no arquivo saida.txt

// Fprint - Escreve diretamente em um io.Writer
fmt.Fprint(arquivo, "Olá Mundo")
// retorno: Escreve "Olá Mundo" no arquivo sem formatação

// Errorf - Cria um erro formatado
err = fmt.Errorf("erro: usuário %s não encontrado", nome)
fmt.Println(err)
// retorno: erro: usuário João não encontrado

// Scan - Lê entrada do usuário
var nome string
var idade int
fmt.Print("Digite nome e idade: ")
fmt.Scan(&nome, &idade)
// Espera entrada do usuário: João 25
fmt.Printf("Nome: %s, Idade: %d\\n", nome, idade)
// retorno: Nome: João, Idade: 25

// Scanf - Lê entrada formatada
var dia, mes, ano int
fmt.Print("Digite a data (DD/MM/AAAA): ")
fmt.Scanf("%d/%d/%d", &dia, &mes, &ano)
// Espera entrada do usuário: 15/03/2024
fmt.Printf("Data: %02d/%02d/%d\\n", dia, mes, ano)
// retorno: Data: 15/03/2024

// Exemplos práticos combinando funções

// Exemplo 1: Log formatado
logMsg := fmt.Sprintf("[%s] Usuário %s logado", 
    time.Now().Format("2006-01-02"), nome)
fmt.Println(logMsg)
// retorno: [2024-01-14] Usuário João logado

// Exemplo 2: Relatório em arquivo
header := fmt.Sprintf("Relatório - %s\\n", 
    time.Now().Format("Jan 2006"))
fmt.Fprintf(arquivo, header)
fmt.Fprintf(arquivo, "Usuário: %s\\n", nome)
fmt.Fprintf(arquivo, "Idade: %d\\n", idade)
// retorno: Escreve relatório formatado no arquivo

// Exemplo 3: Tratamento de erro com formato
if idade < 18 {
    err := fmt.Errorf("usuário %s não tem idade mínima (%d < 18)", 
        nome, idade)
    fmt.Println(err)
    return err
}
// retorno: usuário João não tem idade mínima (15 < 18)`,
    explanation: `// Funções de Saída Básica

fmt.Print 
- Imprime argumentos diretamente
- Não adiciona espaços ou quebras de linha
- Útil para saída simples e contínua

fmt.Println
- Imprime argumentos com espaços entre eles
- Adiciona quebra de linha no final
- Melhor para leitura e debug

fmt.Printf
- Imprime texto formatado usando verbos (%s, %d, etc)
- Permite controle preciso do formato de saída
- Essencial para saídas personalizadas


// Funções de Formatação

fmt.Sprintf
- Similar ao Printf, mas retorna string
- Não imprime, apenas formata
- Útil para criar mensagens formatadas

fmt.Errorf
- Cria erro com mensagem formatada
- Usa mesma sintaxe do Printf
- Ideal para mensagens de erro descritivas


// Funções de Arquivo

fmt.Fprintf
- Escreve texto formatado em io.Writer
- Pode escrever em arquivos, conexões, etc
- Combina formatação com escrita em arquivo

fmt.Fprint
- Escreve texto direto em io.Writer
- Sem formatação especial
- Versão básica do Fprintf


// Funções de Entrada

fmt.Scan
- Lê entrada do usuário
- Separa por espaços automaticamente
- Converte para tipos especificados

fmt.Scanf
- Lê entrada formatada do usuário
- Usa padrão especificado
- Mais controle sobre formato de entrada


// Dicas de Uso

Print/Println
- Use para debug e saídas simples
- Println é mais comum por ser mais legível

Printf/Sprintf
- Use para mensagens formatadas
- Sprintf quando precisar da string

Fprintf/Fprint
- Use para escrever em arquivos
- Fprintf para conteúdo formatado

Errorf
- Use para criar erros descritivos
- Melhor que strings de erro simples

Scan/Scanf
- Use para entrada do usuário
- Scanf quando formato é importante`,
  },
  string: {
    title: "Pacote strings em Go",
    description: "Manipulação e processamento de strings com o pacote strings",
    code: `// Importando o pacote
import (
    "fmt"
    "strings"
)

func main() {
    // Texto base para exemplos
    texto := "Go é uma linguagem de programação incrível!"
    palavras := "maçã,banana,laranja,uva"

    // Transformações básicas
    maiusculas := strings.ToUpper(texto)
    // retorno: "GO É UMA LINGUAGEM DE PROGRAMAÇÃO INCRÍVEL!"

    minusculas := strings.ToLower(texto)
    // retorno: "go é uma linguagem de programação incrível!"

    titulo := strings.Title("bem vindo ao go")
    // retorno: "Bem Vindo Ao Go"

    // Busca e substituição
    contemGo := strings.Contains(texto, "Go")
    // retorno: true

    comecaCom := strings.HasPrefix(texto, "Go")
    // retorno: true

    terminaCom := strings.HasSuffix(texto, "!")
    // retorno: true

    posicao := strings.Index(texto, "linguagem")
    // retorno: 11

    ultimaPosicao := strings.LastIndex(texto, "a")
    // retorno: 35

    substituido := strings.Replace(texto, "incrível", "fantástica", 1)
    // retorno: "Go é uma linguagem de programação fantástica!"

    todosSubstituidos := strings.ReplaceAll(texto, "a", "@")
    // retorno: "Go é um@ lingu@gem de progr@m@ção incrível!"

    // Divisão e união
    partes := strings.Split(palavras, ",")
    // retorno: []string{"maçã", "banana", "laranja", "uva"}

    linhas := strings.Split("linha1\\nlinha2\\nlinha3", "\\n")
    // retorno: []string{"linha1", "linha2", "linha3"}

    unido := strings.Join(partes, " - ")
    // retorno: "maçã - banana - laranja - uva"

    // Remoção de espaços
    textoComEspacos := "   texto com espaços   "
    semEspacos := strings.TrimSpace(textoComEspacos)
    // retorno: "texto com espaços"

    semPrefixo := strings.TrimPrefix("PrefixoTexto", "Prefixo")
    // retorno: "Texto"

    semSufixo := strings.TrimSuffix("TextoSufixo", "Sufixo")
    // retorno: "Texto"

    // Contagem e comparação
    contador := strings.Count(texto, "a")
    // retorno: 4

    repetido := strings.Repeat("Go ", 3)
    // retorno: "Go Go Go "

    // Comparação case-insensitive
    iguaisInsensitive := strings.EqualFold("go", "Go")
    // retorno: true

    // Builder para concatenação eficiente
    var builder strings.Builder
    builder.WriteString("Primeira")
    builder.WriteString(" ")
    builder.WriteString("Segunda")
    resultado := builder.String()
    // retorno: "Primeira Segunda"

    // Fields e FieldsFunc
    campos := strings.Fields("   go  lang   rules   ")
    // retorno: []string{"go", "lang", "rules"}

    // Exemplo com FieldsFunc
    numeros := strings.FieldsFunc("1;2,3:4", func(r rune) bool {
        return r == ';' || r == ',' || r == ':'
    })
    // retorno: []string{"1", "2", "3", "4"}

    // Map para transformação de caracteres
    mapeado := strings.Map(func(r rune) rune {
        if r == 'a' {
            return '@'
        }
        return r
    }, "banana")
    // retorno: "b@n@n@"`,
    explanation: `// Principais Categorias de Funções

Transformações de Caso
- ToUpper: Converte para maiúsculas
- ToLower: Converte para minúsculas
- Title: Capitaliza palavras
- ToTitle: Versão especial de capitalização

Busca e Localização
- Contains: Verifica se contém substring
- HasPrefix: Verifica início
- HasSuffix: Verifica final
- Index: Encontra primeira posição
- LastIndex: Encontra última posição

Substituição
- Replace: Substitui n ocorrências
- ReplaceAll: Substitui todas ocorrências
- Map: Transforma caracteres com função

Manipulação
- Split: Divide string em slice
- Join: Une slice em string
- Fields: Divide por espaços
- FieldsFunc: Divide por função

Remoção
- TrimSpace: Remove espaços
- TrimPrefix: Remove prefixo
- TrimSuffix: Remove sufixo
- Trim: Remove caracteres

// Performance e Boas Práticas

Builder
- Use para concatenações múltiplas
- Mais eficiente que += para strings
- Ideal para loops

Comparações
- EqualFold: Comparação insensível a caso
- Compare: Comparação ordenada
- ContainsAny: Verifica múltiplos caracteres

// Casos de Uso Comuns

1. Processamento de Texto
- Formatação
- Limpeza
- Transformação

2. Parsing
- Separação de dados
- Extração de informações
- Tokenização

3. Validação
- Verificação de formato
- Busca de padrões
- Sanitização

4. Formatação
- Relatórios
- Logs
- Saída para usuário

// Dicas Importantes

1. Use Builder para concatenações em loop
2. Prefira ReplaceAll a Replace(-1)
3. Fields é mais robusto que Split(" ")
4. Strings são imutáveis em Go
5. Compare performance para grandes volumes`,
  },
  int: {
    title: "Tipo int em Go",
    description: "Trabalhando com números inteiros e suas operações em Go",
    code: `// Declaração de variáveis int
var numero int = 42        // Declaração com var
idade := 25               // Declaração curta
const maxValor = 100      // Constante

// Tipos específicos de int
var num8 int8 = 127       // -128 até 127
var num16 int16 = 32767   // -32768 até 32767
var num32 int32 = 2147483647
var num64 int64 = 9223372036854775807

// Operações matemáticas
soma := 10 + 5           // 15
subtracao := 10 - 5      // 5
multiplicacao := 10 * 5   // 50
divisao := 10 / 3        // 3 (divisão inteira)
resto := 10 % 3          // 1 (resto da divisão)

// Operadores de incremento/decremento
numero++                 // Incrementa 1
numero--                 // Decrementa 1

// Conversões
var x float64 = 123.456
numeroInt := int(x)      // 123 (trunca decimal)

// Funções úteis para int
absoluto := abs(-42)     // 42
maximo := max(10, 20)    // 20
minimo := min(10, 20)    // 10

// Strings e int
strNumero := "42"
// Convertendo string para int
num, err := strconv.Atoi(strNumero)
if err != nil {
    fmt.Println("Erro na conversão:", err)
}

// Convertendo int para string
str := strconv.Itoa(numero)

// Comparações
maior := 10 > 5          // true
menor := 10 < 20         // true
igual := 10 == 10        // true
diferente := 10 != 5     // true
maiorIgual := 10 >= 10   // true
menorIgual := 5 <= 10    // true

// Operadores bit a bit
and := 12 & 25          // AND bit a bit
or := 12 | 25           // OR bit a bit
xor := 12 ^ 25          // XOR bit a bit
leftShift := 12 << 2    // Deslocamento à esquerda
rightShift := 12 >> 2   // Deslocamento à direita`,
    explanation: `// Tipos de Int em Go

int - Tipo padrão, tamanho depende da arquitetura (32 ou 64 bits)
int8 - 8 bits (-128 a 127)
int16 - 16 bits (-32768 a 32767)
int32 - 32 bits (-2^31 a 2^31-1)
int64 - 64 bits (-2^63 a 2^63-1)

// Quando usar cada tipo
- int: Use para a maioria dos casos
- int8/int16: Quando precisar economizar memória
- int32: Para compatibilidade específica
- int64: Para números muito grandes

// Operações Matemáticas
+ : Adição
- : Subtração
* : Multiplicação
/ : Divisão (trunca decimais)
% : Resto da divisão
++ : Incremento
-- : Decremento

// Conversões
- strconv.Atoi(): String para int
- strconv.Itoa(): Int para string
- int(): Conversão entre tipos numéricos

// Boas Práticas
1. Use int para contadores e índices
2. Verifique overflow em operações
3. Trate erros em conversões
4. Use constantes quando o valor não muda
5. Considere o range do tipo escolhido

// Operadores Bit a Bit
& : AND - Útil para máscaras de bits
| : OR - Combina flags
^ : XOR - Toggle de bits
<< : Multiplica por 2^n
>> : Divide por 2^n`,
  },

  time: {
    title: "Pacote time em Go",
    description: "Manipulação de datas, horários e durações com o pacote time",
    code: `// Obtendo data e hora atual
agora := time.Now()
fmt.Println("Data e Hora:", agora)
// retorno: 2024-01-14 15:04:05.123456789 -0300 BRT

// Componentes da data/hora
ano := agora.Year()           // 2024
mes := agora.Month()          // January
dia := agora.Day()            // 14
hora := agora.Hour()          // 15
minuto := agora.Minute()      // 4
segundo := agora.Second()     // 5
nanoseg := agora.Nanosecond() // 123456789

// Formatação de data
layoutBR := "02/01/2006"
layoutUS := "2006-01-02"
layoutCompleto := "02/01/2006 15:04:05"

dataBR := agora.Format(layoutBR)
// retorno: 14/01/2024

dataUS := agora.Format(layoutUS)
// retorno: 2024-01-14

// Parsing de string para time
dataStr := "14/01/2024"
dataParsed, err := time.Parse(layoutBR, dataStr)
if err != nil {
    fmt.Println("Erro ao parsear data:", err)
}

// Criando data específica
data := time.Date(2024, 1, 14, 15, 4, 5, 0, time.Local)

// Comparações de tempo
antes := data.Before(agora)   // true se data é anterior
depois := data.After(agora)   // true se data é posterior
igual := data.Equal(agora)    // true se datas são iguais

// Operações com tempo
amanha := agora.AddDate(0, 0, 1)  // Adiciona 1 dia
ontem := agora.AddDate(0, 0, -1)  // Subtrai 1 dia
proxMes := agora.AddDate(0, 1, 0) // Adiciona 1 mês
proxAno := agora.AddDate(1, 0, 0) // Adiciona 1 ano

// Durações
duration := time.Hour * 24        // 1 dia
duasHoras := time.Hour * 2        // 2 horas
dezMinutos := time.Minute * 10    // 10 minutos

// Timer e Sleep
time.Sleep(time.Second * 2)       // Pausa por 2 segundos

// Criando timer
timer := time.NewTimer(time.Second * 5)
<-timer.C                         // Espera 5 segundos

// Criando ticker (repetição)
ticker := time.NewTicker(time.Second)
for i := 0; i < 5; i++ {
    <-ticker.C                    // Executa a cada segundo
    fmt.Println("Tick")
}
ticker.Stop()

// Medindo tempo de execução
inicio := time.Now()
// ... código a ser medido ...
duracao := time.Since(inicio)
fmt.Printf("Tempo de execução: %v\\n", duracao)`,
    explanation: `// Principais Conceitos

Time
- Representa um instante no tempo
- Precisão de nanosegundos
- Inclui informação de fuso horário

Duration
- Representa um período de tempo
- Pode ser positivo ou negativo
- Útil para cálculos de intervalo

Location
- Representa um fuso horário
- Importante para conversões
- Afeta formatação e parsing

// Formatação
Go usa uma data específica como referência:
- 2006 = Ano
- 01 = Mês
- 02 = Dia
- 15 = Hora (24h)
- 04 = Minuto
- 05 = Segundo

// Operações Comuns
- AddDate(): Adiciona anos, meses, dias
- Add(): Adiciona uma duração
- Sub(): Calcula diferença entre tempos
- Since(): Tempo decorrido desde
- Until(): Tempo até

// Usos Práticos
1. Timestamps em logs
2. Agendamento de tarefas
3. Medição de performance
4. Controle de expiração
5. Formatação para display

// Timer e Ticker
Timer
- Executa uma vez após delay
- Pode ser cancelado
- Útil para timeouts

Ticker
- Executa periodicamente
- Deve ser parado manualmente
- Útil para tarefas recorrentes`,
  },

  os: {
    title: "Pacote os em Go",
    description:
      "Interação com o sistema operacional: arquivos, processos, ambiente",
    code: `// Argumentos da linha de comando
args := os.Args               // Lista de argumentos
programName := args[0]        // Nome do programa
if len(args) > 1 {
    firstArg := args[1]       // Primeiro argumento
}

// Variáveis de ambiente
home := os.Getenv("HOME")     // Lê variável
os.Setenv("API_KEY", "123")   // Define variável
allEnv := os.Environ()        // Todas variáveis

// Diretório atual
dir, err := os.Getwd()        // Obtém diretório atual
if err != nil {
    log.Fatal(err)
}

os.Chdir("/tmp")              // Muda diretório

// Manipulação de arquivos
// Criação
file, err := os.Create("arquivo.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

// Escrita
data := []byte("Olá, Mundo!")
file.Write(data)

// Leitura
file, err = os.Open("arquivo.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

buffer := make([]byte, 1024)
n, err := file.Read(buffer)

// Informações do arquivo
fileInfo, err := os.Stat("arquivo.txt")
if err != nil {
    log.Fatal(err)
}
size := fileInfo.Size()
mode := fileInfo.Mode()
modTime := fileInfo.ModTime()

// Manipulação de diretórios
os.Mkdir("novapasta", 0755)       // Cria diretório
os.MkdirAll("pasta/subpasta", 0755) // Cria hierarquia

// Listagem de diretório
entries, err := os.ReadDir(".")
for _, entry := range entries {
    fmt.Println(entry.Name())
}

// Remoção
os.Remove("arquivo.txt")          // Remove arquivo
os.RemoveAll("pasta")            // Remove recursivamente

// Processos
pid := os.Getpid()               // ID do processo
ppid := os.Getppid()             // ID do processo pai

// Sinais
sigs := make(chan os.Signal, 1)
signal.Notify(sigs, os.Interrupt)
go func() {
    <-sigs
    fmt.Println("Recebeu sinal de interrupção")
    os.Exit(0)
}()

// Permissões de arquivo
os.Chmod("arquivo.txt", 0644)    // Muda permissões
os.Chown("arquivo.txt", 1000, 1000) // Muda proprietário`,
    explanation: `// Principais Funcionalidades

Argumentos e Ambiente
- os.Args: Argumentos da linha de comando
- os.Getenv/Setenv: Variáveis de ambiente
- os.Environ: Lista todas variáveis

Arquivos e Diretórios
- Create/Open: Manipulação de arquivos
- Mkdir/MkdirAll: Criação de diretórios
- Remove/RemoveAll: Remoção de arquivos/diretórios
- ReadDir: Lista conteúdo de diretório

Processos e Sinais
- Getpid/Getppid: IDs de processo
- Signal: Manipulação de sinais
- Exit: Termina o programa

// Permissões de Arquivo (Unix)
- 0644: rw-r--r-- (Padrão para arquivos)
- 0755: rwxr-xr-x (Padrão para diretórios)
- 0600: rw------- (Privado)

// Boas Práticas
1. Sempre feche arquivos (use defer)
2. Trate erros adequadamente
3. Verifique permissões
4. Use caminhos absolutos com cuidado
5. Limpe recursos temporários

// Casos de Uso Comuns
1. Scripts e automação
2. Manipulação de arquivos
3. Logging e diagnóstico
4. Gerenciamento de configuração
5. Interação com sistema operacional

// Dicas de Segurança
1. Valide entradas de usuário
2. Evite permissões excessivas
3. Use caminhos seguros
4. Trate sinais apropriadamente
5. Limpe dados sensíveis`,
  },
  "net/http": {
    title: "Pacote net/http em Go",
    description: "Criando servidores HTTP e fazendo requisições HTTP em Go",
    code: `// Servidor HTTP Básico
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

// Estrutura para JSON
type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

// Handler com resposta simples
func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Olá, Mundo!")
}

// Handler com JSON
func userHandler(w http.ResponseWriter, r *http.Request) {
    // Configurando header
    w.Header().Set("Content-Type", "application/json")

    // Verificando método HTTP
    switch r.Method {
    case "GET":
        user := User{Name: "João", Email: "joao@email.com"}
        json.NewEncoder(w).Encode(user)
    
    case "POST":
        // Decodificando JSON do request
        var newUser User
        if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        // Respondendo com status 201
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(newUser)
    
    default:
        http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
    }
}

// Middleware de logging
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL)
        next(w, r)
    }
}

func main() {
    // Rotas com middleware
    http.HandleFunc("/", loggingMiddleware(helloHandler))
    http.HandleFunc("/user", loggingMiddleware(userHandler))

    // Iniciando servidor
    fmt.Println("Servidor rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

// Exemplos de Requisições HTTP
func makeRequests() {
    // GET Request
    resp, err := http.Get("http://api.exemplo.com/users")
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    // POST Request com JSON
    user := User{Name: "Maria", Email: "maria@email.com"}
    jsonData, _ := json.Marshal(user)
    
    resp, err = http.Post(
        "http://api.exemplo.com/users",
        "application/json",
        bytes.NewBuffer(jsonData),
    )

    // Cliente HTTP personalizado
    client := &http.Client{
        Timeout: time.Second * 10,
    }

    // Request personalizado
    req, err := http.NewRequest("DELETE", "http://api.exemplo.com/users/1", nil)
    if err != nil {
        log.Fatal(err)
    }
    
    // Adicionando headers
    req.Header.Add("Authorization", "Bearer token123")
    
    resp, err = client.Do(req)
}

// Servidor HTTPS
func startHTTPS() {
    // Certificado TLS
    err := http.ListenAndServeTLS(
        ":443", 
        "server.crt",
        "server.key",
        nil,
    )
    if err != nil {
        log.Fatal(err)
    }
}`,
    explanation: `// Componentes Principais

http.HandleFunc
- Registra handlers para rotas
- Processa requisições HTTP
- Suporta todos métodos HTTP

http.ResponseWriter
- Interface para enviar resposta
- Define headers e status
- Escreve corpo da resposta

http.Request
- Contém dados da requisição
- Headers, corpo, método, URL
- Parâmetros e cookies

// Métodos HTTP Suportados

GET - Recupera recursos
POST - Cria novos recursos
PUT - Atualiza recursos existentes
DELETE - Remove recursos
PATCH - Atualiza parcialmente
HEAD - Como GET, sem corpo
OPTIONS - Info sobre recurso

// Status Codes Comuns

200 OK - Sucesso
201 Created - Recurso criado
400 Bad Request - Erro cliente
401 Unauthorized - Sem autenticação
403 Forbidden - Sem permissão
404 Not Found - Não encontrado
500 Internal Error - Erro servidor

// Boas Práticas

Middleware
- Logging de requisições
- Autenticação
- CORS
- Recuperação de pânico

Headers
- Content-Type
- Authorization
- Cache-Control
- CORS headers

Segurança
- HTTPS/TLS
- Validação de entrada
- Autenticação/Autorização
- Rate limiting

// Casos de Uso

Servidor Web
- APIs REST
- Serviços web
- Proxies
- Webhooks

Cliente HTTP
- Chamadas API
- Scraping
- Integrações
- Monitoramento

// Dicas Importantes

1. Sempre feche o Body das respostas
2. Use timeouts apropriados
3. Trate erros adequadamente
4. Valide entradas
5. Use HTTPS em produção`,
  },
  Verbos: {
    title: "Verbos de Formatação em Go",
    description:
      "Principais verbos de formatação para usar com fmt.Printf, fmt.Sprintf, etc.",
    code: `// Verbos básicos de formatação
nome := "João"
idade := 25
altura := 1.75
programador := true

// %s - Para strings (texto)
fmt.Printf("Nome: %s\\n", nome)
// retorno: Nome: João

// %d - Para números inteiros (int)
fmt.Printf("Idade: %d anos\\n", idade)
// retorno: Idade: 25 anos

// %f - Para números decimais (float)
fmt.Printf("Altura: %.2f metros\\n", altura)
// retorno: Altura: 1.75 metros

// %t - Para booleanos (true/false)
fmt.Printf("É programador? %t\\n", programador)
// retorno: É programador? true

// %v - Para qualquer tipo de valor
fmt.Printf("Dados: %v, %v, %v, %v\\n", nome, idade, altura, programador)
// retorno: Dados: João, 25, 1.75, true

// %#v - Mostra a sintaxe Go do valor
fmt.Printf("Sintaxe Go: %#v\\n", nome)
// retorno: Sintaxe Go: "João"

// %T - Mostra o tipo do valor
fmt.Printf("Tipos: %T, %T, %T, %T\\n", nome, idade, altura, programador)
// retorno: Tipos: string, int, float64, bool

// %%  - Imprime o símbolo %
fmt.Printf("Porcentagem: 100%%\\n")
// retorno: Porcentagem: 100%

// Alinhamento e precisão
// %ns - Alinha texto à direita em n espaços
fmt.Printf("|%10s|\\n", nome)
// retorno: |      João|

// %-ns - Alinha texto à esquerda em n espaços
fmt.Printf("|%-10s|\\n", nome)
// retorno: |João      |

// %.nf - Define casas decimais para float
fmt.Printf("Altura: %.1f\\n", altura)
// retorno: Altura: 1.8

// Formatação de números
numero := 1234567
// %,d - Adiciona separador de milhar
fmt.Printf("Número: %,d\\n", numero)
// retorno: Número: 1,234,567

// %x ou %X - Hexadecimal (minúsculo ou maiúsculo)
fmt.Printf("Hex: %x - %X\\n", 255, 255)
// retorno: Hex: ff - FF

// %b - Binário
fmt.Printf("Binário: %b\\n", 7)
// retorno: Binário: 111`,
    explanation: `// Verbos básicos de formatação

* %s - Usado para strings (textos)
Formata e exibe strings
Não adiciona aspas na saída

* %d Usado para números inteiros
Formata números inteiros
Pode usar com int, int32, int64, etc.

* %f Usado para números decimais
Formata números de ponto flutuante
Pode controlar casas decimais com * %.nf

* %t Usado para booleanos
Mostra true ou false
Útil para valores lógicos

* %v Verbo genérico
Funciona com qualquer tipo
Formato padrão do valor

* %#v Formato sintático Go
Mostra como o valor seria em código Go
Inclui tipos e estruturas

* %T Mostra o tipo
Exibe o tipo Go do valor
Útil para debugging

// Alinhamento e precisão

* %ns Alinhamento à direita
n define o número de espaços
Preenche com espaços à esquerda

* %-ns Alinhamento à esquerda
n define o número de espaços
Preenche com espaços à direita

* %.nf Precisão decimal
n define número de casas decimais
Arredonda o valor automaticamente

// Formatação especial de números

* %,d Separador de milhar
Adiciona vírgula a cada 3 dígitos
Facilita leitura de números grandes

* %x/* %X Formato hexadecimal
Minúsculo ou maiúsculo
Base 16

* %b Formato binário
Mostra número em base 2
Útil para operações bit a bit`,
  },

  testeUnitario: {
    title: "Testes Unitários",
    description: "Criando e executando testes unitários em Go",
    code: `
 // arquivo: calculator.go
 package calculator
 
 func Add(a, b int) int {
    return a + b
 }
 
 // arquivo: calculator_test.go
 package calculator
 
 import "testing"
 
 // Teste simples
 func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
 
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
 }
 
 // Teste com tabela
 func TestAddTable(t *testing.T) {
    tests := []struct {
        name string
        a    int
        b    int
        want int
    }{
        {"positivos", 2, 3, 5},
        {"negativo_positivo", -2, 3, 1},
        {"zeros", 0, 0, 0},
    }
 
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Errorf("Add(%d, %d) = %d; want %d", 
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
 }
 
 // Teste com subtestes
 func TestAddSubtests(t *testing.T) {
    t.Run("números positivos", func(t *testing.T) {
        got := Add(2, 3)
        want := 5
        if got != want {
            t.Error("falhou com positivos")
        }
    })
 
    t.Run("com zero", func(t *testing.T) {
        got := Add(0, 5)
        want := 5
        if got != want {
            t.Error("falhou com zero")
        }
    })
 }
 
 // Executar testes: go test
 // Com verbosidade: go test -v
 // Testes específicos: go test -run TestAdd`,
 explanation: `
 Testes unitários verificam o funcionamento correto de funções e métodos 
 individuais. São fundamentais para garantir a qualidade do código e facilitar
 manutenções futuras.
 
 Funções e métodos principais:
 - TestNomeFuncao(): Função de teste que verifica um comportamento específico
 - t.Run(): Executa subtestes, permitindo organizar testes relacionados
 - t.Error/Errorf(): Reporta falhas encontradas durante o teste
 - go test: Comando para executar os testes
 - go test -v: Executa testes com saída detalhada`,
  },

  testeBenchmark: {
    title: "Benchmarks",
    description: "Testando performance com benchmarks",
    code: `
 // arquivo: benchmark_test.go
 package main
 
 import "testing"
 
 func BenchmarkAdd(b *testing.B) {
    // Resetar timer se precisar setup
    b.ResetTimer()
    
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
 }
 
 // Benchmark com diferentes tamanhos
 func BenchmarkSlice(b *testing.B) {
    for size := 100; size <= 10000; size *= 10 {
        b.Run(fmt.Sprintf("size-%d", size), func(b *testing.B) {
            slice := make([]int, size)
            b.ResetTimer()
            
            for i := 0; i < b.N; i++ {
                _ = append(slice, 1)
            }
        })
    }
 }
 
 // Benchmark paralelo
 func BenchmarkParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            Add(2, 3)
        }
    })
 }
 
 // Executar: go test -bench=.
 // Com alocações: go test -bench=. -benchmem
 // Específico: go test -bench=BenchmarkAdd`,
  explanation: `
 Benchmarks são testes de performance que medem o tempo de execução e consumo 
 de recursos de uma função. São essenciais para identificar gargalos e otimizar 
 o código.
 
 Funções e métodos principais:
 - BenchmarkNome(): Define um teste de benchmark
 - b.N: Número de iterações determinado automaticamente
 - b.ResetTimer(): Reseta o timer para ignorar setup
 - b.RunParallel(): Executa benchmark em paralelo
 - go test -bench: Executa os benchmarks
 - -benchmem: Inclui estatísticas de memória`,
  },

  testeCobertura: {
    title: "Cobertura de Testes",
    description: "Analisando cobertura de código com testes",
    code: `
 // arquivo: coverage_test.go
 package main
 
 import "testing"
 
 func TestFuncao(t *testing.T) {
    tests := []struct {
        name  string
        input int
        want  bool
    }{
        {"positivo", 5, true},
        {"zero", 0, false},
        {"negativo", -5, true},
    }
 
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Funcao(tt.input)
            if got != tt.want {
                t.Errorf("got %v; want %v", got, tt.want)
            }
        })
    }
 }
 
 // Gerar relatório de cobertura
 // go test -cover
 
 // Gerar arquivo de cobertura
 // go test -coverprofile=coverage.out
 
 // Ver relatório detalhado
 // go tool cover -html=coverage.out
 
 // Ver cobertura por função
 // go tool cover -func=coverage.out`,
    explanation: `
 Cobertura de testes mede quanto do código está sendo testado. Ajuda a identificar 
 partes do código que precisam de mais testes e garante uma melhor qualidade 
 do software.
 
 Comandos e funcionalidades principais:
 - go test -cover: Mostra porcentagem de cobertura
 - -coverprofile: Gera arquivo com dados detalhados
 - cover -html: Visualização HTML da cobertura
 - cover -func: Mostra cobertura por função
 - Cores indicam linhas cobertas/não cobertas
 - Identifica caminhos de código não testados`,
  },

  testeMock: {
    title: "Mocks e Stubs",
    description: "Criando mocks para testes isolados",
    code: `
 // Interface a ser mockada
 type Database interface {
    Get(id string) (*User, error)
    Save(user *User) error
 }
 
 // Mock da Database
 type MockDB struct {
    GetFunc  func(id string) (*User, error)
    SaveFunc func(user *User) error
 }
 
 func (m *MockDB) Get(id string) (*User, error) {
    return m.GetFunc(id)
 }
 
 func (m *MockDB) Save(user *User) error {
    return m.SaveFunc(user)
 }
 
 // Teste usando mock
 func TestUserService(t *testing.T) {
    mockDB := &MockDB{
        GetFunc: func(id string) (*User, error) {
            return &User{ID: id, Name: "Test"}, nil
        },
        SaveFunc: func(user *User) error {
            return nil
        },
    }
 
    service := NewUserService(mockDB)
    user, err := service.GetUser("123")
    
    if err != nil {
        t.Error("não deveria retornar erro")
    }
    if user.Name != "Test" {
        t.Error("nome incorreto")
    }
 }
 
 // Usando testify/mock
 import "github.com/stretchr/testify/mock"
 
 type MockDB struct {
    mock.Mock
 }
 
 func (m *MockDB) Get(id string) (*User, error) {
    args := m.Called(id)
    return args.Get(0).(*User), args.Error(1)
 }
 
 // Teste com testify
 func TestWithTestify(t *testing.T) {
    mockDB := new(MockDB)
    mockDB.On("Get", "123").Return(&User{ID: "123"}, nil)
    
    service := NewUserService(mockDB)
    service.GetUser("123")
    
    mockDB.AssertExpectations(t)
 }`,
 explanation: `
 Mocks são objetos que simulam o comportamento de dependências reais durante os 
 testes. Permitem testar código isoladamente e controlar o comportamento das 
 dependências.
 
 Conceitos e ferramentas principais:
 - Interface: Define contrato para mock
 - MockDB: Implementação simulada
 - testify/mock: Framework de mocking
 - AssertExpectations: Verifica chamadas esperadas
 - On/Return: Define comportamento do mock
 - Stub: Implementação simplificada para testes`,
  },

  debugging: {
    title: "Debugging",
    description: "Técnicas de debugging em Go",
    code: `
 // Usando print para debug
 func debugPrint() {
    fmt.Printf("Valor: %+v\n", objeto)
    fmt.Printf("Tipo: %T\n", variavel)
    log.Printf("Debug: %#v\n", dados)
 }
 
 // Usando delve (dlv)
 // Instalar: go install github.com/go-delve/delve/cmd/dlv@latest
 
 // Breakpoint no código
 func processar() {
    runtime.Breakpoint() // breakpoint programático
    // ... código
 }
 
 // Debugging com logs
 import "log"
 
 func configureLog() {
    log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
    logFile, _ := os.Create("debug.log")
    log.SetOutput(logFile)
 }
 
 // Rastreamento de tempo
 func timeTrack(start time.Time, name string) {
    elapsed := time.Since(start)
    log.Printf("%s levou %s", name, elapsed)
 }
 
 func exemplo() {
    defer timeTrack(time.Now(), "exemplo")
    // ... código
 }
 
 // Recuperando panics
 func recuperar() {
    if r := recover(); r != nil {
        log.Printf("Recuperado: %v\n", r)
    }
 }
 
 func exemplo2() {
    defer recuperar()
    // ... código que pode panic
 }`,
 explanation: `
 Debugging é o processo de identificar e corrigir erros no código. Go oferece 
 várias ferramentas e técnicas para facilitar a localização e resolução de 
 problemas.
 
 Ferramentas e técnicas principais:
 - delve (dlv): Debugger oficial para Go
 - runtime.Breakpoint(): Ponto de parada no código
 - log: Sistema de logging configurável
 - defer: Rastreamento de tempo de execução
 - recover: Recuperação de panics
 - fmt.Printf: Debug com prints formatados`,
  },

  jwt:{
  title: "JWT em Go",
  description: "Gerando e validando JSON Web Tokens (JWT) com a biblioteca jwt-go",
  code: `// Exemplo de geração e validação de JWT
package main

import (
    "fmt"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("sua_chave_secreta")

func gerarToken() (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user": "usuario123",
        "exp":  time.Now().Add(time.Hour * 2).Unix(),
    })
    return token.SignedString(secretKey)
}

func validarToken(tokenString string) error {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })
    if err != nil {
        return err
    }
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        fmt.Println("Token válido para o usuário:", claims["user"])
    }
    return nil
}

func main() {
    token, _ := gerarToken()
    fmt.Println("Token Gerado:", token)
    validarToken(token)
}`,
  explanation: `JWT (JSON Web Token) é um padrão para autenticação segura. 
O exemplo utiliza a biblioteca 'jwt-go' para criar e validar tokens. 
O token inclui claims (informações como o nome do usuário e a expiração). 
A chave secreta é usada para assinar e validar o token, garantindo sua integridade.`,
  },
  hash:{
    title: "Hash e Criptografia",
  description: "Como gerar e comparar hashes com bcrypt em Go",
  code: `// Exemplo de uso do bcrypt
package main

import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
)

func gerarHash(senha string) (string, error) {
    hash, err := bcrypt.GenerateFromPassword([]byte(senha), bcrypt.DefaultCost)
    return string(hash), err
}

func verificarHash(senha, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(senha))
    return err == nil
}

func main() {
    senha := "senha_secreta"
    hash, _ := gerarHash(senha)
    fmt.Println("Hash gerado:", hash)

    valido := verificarHash(senha, hash)
    fmt.Println("Senha válida?", valido)
}`,
  explanation: `A biblioteca 'bcrypt' é amplamente usada para hashing de senhas em Go. 
O hash gerado é seguro e adequado para armazenamento de credenciais. 
O exemplo inclui funções para gerar e verificar hashes usando bcrypt.`,
  },

  middleware:{
    title: "Middleware de Autenticação",
    description: "Um middleware para autenticar requisições em um servidor HTTP",
    code: `// Exemplo de middleware de autenticação
  package main
  
  import (
      "net/http"
  )
  
  func autenticar(next http.Handler) http.Handler {
      return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
          token := r.Header.Get("Authorization")
          if token != "Bearer token_valido" {
              http.Error(w, "Não autorizado", http.StatusUnauthorized)
              return
          }
          next.ServeHTTP(w, r)
      })
  }
  
  func main() {
      http.Handle("/", autenticar(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
          w.Write([]byte("Bem-vindo!"))
      })))
  
      http.ListenAndServe(":8080", nil)
  }`,
    explanation: `Middlewares são usados para interceptar e processar requisições HTTP antes de chegar aos handlers. 
  Este exemplo implementa um middleware que verifica o cabeçalho "Authorization" para autenticação básica.`,
  },
  oauth:{
    title: "OAuth2",
  description: "Implementando fluxo básico de autenticação OAuth2 com a biblioteca 'oauth2'",
  code: `// Exemplo de uso do OAuth2
package main

import (
    "fmt"
    "golang.org/x/oauth2"
)

func main() {
    config := &oauth2.Config{
        ClientID:     "seu_client_id",
        ClientSecret: "seu_client_secret",
        Endpoint: oauth2.Endpoint{
            AuthURL:  "https://provider.com/oauth2/auth",
            TokenURL: "https://provider.com/oauth2/token",
        },
        RedirectURL: "http://localhost:8080/callback",
        Scopes:      []string{"profile", "email"},
    }

    url := config.AuthCodeURL("state")
    fmt.Println("Visite o URL para autenticação:", url)
}`,
  explanation: `OAuth2 é um padrão para delegação de autenticação. 
No exemplo, configuramos um cliente OAuth2 para gerar um URL de autorização, que redireciona o usuário ao provedor de identidade.`,
  },
  cors:{
    title: "CORS em Go",
  description: "Como configurar CORS em um servidor HTTP em Go",
  code: `// Exemplo de configuração de CORS
package main

import (
    "net/http"
)

func habilitarCORS(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        if r.Method == "OPTIONS" {
            return
        }
        h.ServeHTTP(w, r)
    })
}

func main() {
    http.Handle("/", habilitarCORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Requisição bem-sucedida"))
    })))

    http.ListenAndServe(":8080", nil)
}`,
  explanation: `CORS (Cross-Origin Resource Sharing) permite que servidores definam políticas para compartilhamento de recursos entre diferentes origens. 
O exemplo adiciona cabeçalhos CORS a todas as respostas HTTP.`,
  },

  ginIntro: {
    title: "Introdução ao Gin",
    description: "Configuração inicial e primeiro Hello World com Gin Framework",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    // Cria um roteador padrão do Gin
    router := gin.Default()

    // Rota simples de Hello World
    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Bem-vindo ao Gin Framework!",
        })
    })

    // Inicia o servidor na porta 8080
    router.Run(":8080")
}`,
    explanation: `Gin é um framework web para Go que oferece roteamento rápido e simples. 
    Neste exemplo básico, criamos um roteador com gin.Default(), que inclui 
    middlewares padrão de recuperação e logging. A função c.JSON() permite 
    retornar respostas JSON com código de status HTTP definido.`
  },

  ginEstrutura: {
    title: "Estrutura de Projeto",
    description: "Organização típica de um projeto Gin",
    code: `project/
├── main.go
├── config/
│   └── database.go
├── controllers/
│   └── user_controller.go
├── models/
│   └── user.go
├── routes/
│   └── user_routes.go
├── middlewares/
│   └── auth_middleware.go
└── go.mod`,
    explanation: `Uma estrutura de projeto organizada é crucial para manutenibilidade. 
    Esta estrutura separa responsabilidades em diferentes diretórios:
    - main.go: Ponto de entrada da aplicação
    - config: Configurações de sistema
    - controllers: Lógica de negócio
    - models: Definição de estruturas de dados
    - routes: Definição de rotas
    - middlewares: Funções intermediárias de processamento`
  },

  ginRoutes: {
    title: "Rotas e Parâmetros",
    description: "Definição de rotas e captura de parâmetros",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()

    // Rota com parâmetro de caminho
    router.GET("/user/:id", func(c *gin.Context) {
        userID := c.Param("id")
        c.JSON(http.StatusOK, gin.H{
            "user_id": userID,
        })
    })

    // Rota com parâmetro de consulta
    router.GET("/search", func(c *gin.Context) {
        query := c.Query("q")
        c.JSON(http.StatusOK, gin.H{
            "search_query": query,
        })
    })

    // Rota com múltiplos parâmetros
    router.GET("/products/:category/detail", func(c *gin.Context) {
        category := c.Param("category")
        id := c.Query("id")
        c.JSON(http.StatusOK, gin.H{
            "category": category,
            "product_id": id,
        })
    })

    router.Run(":8080")
}`,
    explanation: `Gin facilita a definição de rotas com diferentes tipos de parâmetros:
    - Parâmetros de caminho (:id) são capturados com c.Param()
    - Parâmetros de consulta são obtidos com c.Query()
    - É possível combinar diferentes tipos de parâmetros em uma única rota
    - Os métodos de captura de parâmetros retornam strings, então conversões 
      de tipo podem ser necessárias`
  },

  ginMiddlewares: {
    title: "Middlewares no Gin",
    description: "Criação e uso de middlewares personalizados",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "log"
    "time"
)

// Middleware de log personalizado
func LoggerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        startTime := time.Now()
        
        // Processa a requisição
        c.Next()
        
        // Log após processamento
        endTime := time.Now()
        latency := endTime.Sub(startTime)
        
        log.Printf(
            "METHOD: %s | PATH: %s | STATUS: %d | LATENCY: %v",
            c.Request.Method,
            c.Request.URL.Path,
            c.Writer.Status(),
            latency,
        )
    }
}

// Middleware de autenticação simples
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        
        if token == "" {
            c.JSON(401, gin.H{
                "error": "Token de autorização não fornecido",
            })
            c.Abort()
            return
        }
        
        // Lógica de validação do token
        if !isValidToken(token) {
            c.JSON(401, gin.H{
                "error": "Token inválido",
            })
            c.Abort()
            return
        }
        
        c.Next()
    }
}

func isValidToken(token string) bool {
    // Implementação da validação de token
    return token == "token-secreto"
}

func main() {
    router := gin.Default()
    
    // Aplicar middleware globalmente
    router.Use(LoggerMiddleware())
    
    // Rota protegida com middleware de autenticação
    protectedGroup := router.Group("/admin")
    protectedGroup.Use(AuthMiddleware())
    {
        protectedGroup.GET("/dashboard", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "Bem-vindo ao painel administrativo",
            })
        })
    }

    router.Run(":8080")
}`,
    explanation: `Middlewares em Gin são funções que processam requisições antes 
    ou depois do tratador principal:
    - Podem ser aplicados globalmente ou para grupos específicos de rotas
    - Úteis para log, autenticação, validação, etc.
    - c.Next() continua o processamento da requisição
    - c.Abort() interrompe o processamento se necessário`
  },

  ginErro: {
    title: "Tratamento de Erros no Gin",
    description: "Estratégias de tratamento de erros em aplicações Gin",
    code: `package main

import (
    "errors"
    "github.com/gin-gonic/gin"
    "net/http"
)

// Estrutura de erro personalizada
type CustomError struct {
    Code    int    \`json:"code"\`
    Message string \`json:"message"\`
}

// Middleware de tratamento de erros global
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        
        // Captura erros após processamento
        for _, err := range c.Errors {
            switch err.Type {
            case gin.ErrorTypePublic:
                // Erros públicos (esperados)
                c.JSON(err.Status, gin.H{
                    "error": err.Error(),
                })
            case gin.ErrorTypeBind:
                // Erros de binding (validação)
                c.JSON(http.StatusBadRequest, gin.H{
                    "error": "Erro de validação",
                    "details": err.Error(),
                })
            default:
                // Erros internos
                c.JSON(http.StatusInternalServerError, gin.H{
                    "error": "Erro interno do servidor",
                })
            }
        }
    }
}

func getUserByID(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("ID de usuário inválido")
    }
    // Lógica de busca de usuário
    return &User{ID: id, Name: "Exemplo"}, nil
}

func main() {
    router := gin.Default()
    
    // Adiciona middleware de tratamento de erros
    router.Use(ErrorHandler())
    
    router.GET("/user/:id", func(c *gin.Context) {
        id := 0 // Exemplo de ID inválido
        
        user, err := getUserByID(id)
        if err != nil {
            // Adiciona erro ao contexto
            c.Error(err).SetType(gin.ErrorTypePublic)
            return
        }
        
        c.JSON(http.StatusOK, user)
    })

    router.Run(":8080")
}

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}`,
    explanation: `Tratamento de erros no Gin envolve várias estratégias:
    - Uso de c.Error() para registrar erros no contexto
    - Middleware global para tratamento centralizado de erros
    - Diferentes tipos de erros (públicos, bind, internos)
    - Possibilidade de adicionar metadados e status HTTP personalizados
    - Facilita a criação de respostas de erro consistentes`
  },

  ginGruposrotas: {
    title: "Grupos de Rotas",
    description: "Agrupamento e organização de rotas no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()
    
    // Grupo de rotas de autenticação
    authGroup := router.Group("/auth")
    {
        authGroup.POST("/login", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Login realizado",
            })
        })
        
        authGroup.POST("/register", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Usuário registrado",
            })
        })
        
        authGroup.POST("/logout", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Logout realizado",
            })
        })
    }
    
    // Grupo de rotas de usuário
    userGroup := router.Group("/users")
    {
        userGroup.GET("/profile", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Perfil do usuário",
            })
        })
        
        userGroup.PUT("/update", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Perfil atualizado",
            })
        })
    }
    
    // Grupo de rotas com middleware específico
    adminGroup := router.Group("/admin")
    adminGroup.Use(AuthMiddleware())
    {
        adminGroup.GET("/dashboard", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Painel administrativo",
            })
        })
        
        adminGroup.DELETE("/user/:id", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Usuário removido",
            })
        })
    }

    router.Run(":8080")
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Lógica de autenticação simplificada
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Token não fornecido",
            })
            c.Abort()
            return
        }
        c.Next()
    }
}`,
    explanation: `Grupos de rotas no Gin oferecem várias vantagens:
    - Organização lógica de endpoints relacionados
    - Possibilidade de aplicar middlewares a grupos específicos
    - Reutilização de lógica comum
    - Melhora a legibilidade e manutenibilidade do código
    - Permite aplicação de prefixos comuns e middlewares compartilhados`
  },
  ginValoresdinamicos: {
    title: "Valores Dinâmicos nas Rotas",
    description: "Captura e manipulação de parâmetros dinâmicos",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv"
)

func main() {
    router := gin.Default()
    
    // Rota com parâmetro de caminho
    router.GET("/users/:id", func(c *gin.Context) {
        id, err := strconv.Atoi(c.Param("id"))
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "ID inválido",
            })
            return
        }
        
        c.JSON(http.StatusOK, gin.H{
            "user_id": id,
        })
    })
    
    // Rota com parâmetros opcionais de consulta
    router.GET("/products", func(c *gin.Context) {
        // Parâmetros com valores padrão
        page := c.DefaultQuery("page", "1")
        limit := c.DefaultQuery("limit", "10")
        category := c.Query("category")
        
        pageNum, _ := strconv.Atoi(page)
        limitNum, _ := strconv.Atoi(limit)
        
        c.JSON(http.StatusOK, gin.H{
            "page":     pageNum,
            "limit":    limitNum,
            "category": category,
        })
    })
    
    // Rota com múltiplos parâmetros dinâmicos
    router.GET("/blog/:year/:month", func(c *gin.Context) {
        year := c.Param("year")
        month := c.Param("month")
        
        c.JSON(http.StatusOK, gin.H{
            "year":  year,
            "month": month,
        })
    })
    
    // Rota com parâmetro coringa (catch-all)
    router.GET("/files/*filepath", func(c *gin.Context) {
        filepath := c.Param("filepath")
        
        c.JSON(http.StatusOK, gin.H{
            "filepath": filepath,
        })
    })

    router.Run(":8080")
}`,
    explanation: `Gin oferece diversas formas de capturar valores dinâmicos:
    - Parâmetros de caminho (:id) capturados com c.Param()
    - Parâmetros de consulta com c.Query() e c.DefaultQuery()
    - Conversão de tipos usando strconv
    - Suporte a parâmetros coringa para rotas flexíveis`
  },

  ginValidador: {
    title: "Validação de Requisição",
    description: "Validação de entrada de dados usando bibliotecas de validação",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "net/http"
)

// Estrutura com tags de validação
type User struct {
    Name     string \`json:"name" binding:"required,min=2,max=50"\`
    Email    string \`json:"email" binding:"required,email"\`
    Age      int    \`json:"age" binding:"gte=18,lte=120"\`
    Password string \`json:"password" binding:"required,min=8"\`
}

func main() {
    router := gin.Default()

    router.POST("/register", func(c *gin.Context) {
        var user User
        
        // Bind e valida a requisição
        if err := c.ShouldBindJSON(&user); err != nil {
            // Processa erros de validação
            var errors []string
            
            if validationErrors, ok := err.(validator.ValidationErrors); ok {
                for _, e := range validationErrors {
                    switch e.Tag() {
                    case "required":
                        errors = append(errors, e.Field()+" é obrigatório")
                    case "email":
                        errors = append(errors, "E-mail inválido")
                    case "min":
                        errors = append(errors, e.Field()+" deve ter no mínimo "+e.Param()+" caracteres")
                    case "max":
                        errors = append(errors, e.Field()+" deve ter no máximo "+e.Param()+" caracteres")
                    case "gte":
                        errors = append(errors, e.Field()+" deve ser maior ou igual a "+e.Param())
                    case "lte":
                        errors = append(errors, e.Field()+" deve ser menor ou igual a "+e.Param())
                    }
                }
            }
            
            c.JSON(http.StatusBadRequest, gin.H{
                "errors": errors,
            })
            return
        }
        
        // Processamento após validação
        c.JSON(http.StatusCreated, gin.H{
            "message": "Usuário registrado com sucesso",
            "user":    user,
        })
    })

    router.Run(":8080")
}`,
    explanation: `Validação de entrada no Gin:
    - Usa tags de validação na definição das estruturas
    - Bibliotecas como go-playground/validator facilitam validações complexas
    - c.ShouldBindJSON() realiza bind e validação simultaneamente
    - Possibilidade de tratamento detalhado de erros de validação
    - Suporta validações como required, email, comprimento, ranges, etc.`
  },

  ginResponse: {
    title: "Manipulação de Respostas",
    description: "Diferentes formas de enviar respostas no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "os"
)

func main() {
    router := gin.Default()

    // Resposta JSON
    router.GET("/json", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Resposta JSON",
            "status": "success",
        })
    })

    // Resposta XML
    router.GET("/xml", func(c *gin.Context) {
        type Result struct {
            XMLName xml.Name \`xml:"result"\`
            Message string   \`xml:"message"\`
        }
        
        c.XML(http.StatusOK, Result{
            Message: "Resposta XML",
        })
    })

    // Download de arquivo
    router.GET("/download", func(c *gin.Context) {
        fileName := "exemplo.txt"
        c.Header("Content-Disposition", "attachment; filename="+fileName)
        c.File(fileName)
    })

    // Upload de arquivo
    router.POST("/upload", func(c *gin.Context) {
        file, err := c.FormFile("file")
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }

        // Salva o arquivo
        err = c.SaveUploadedFile(file, "./uploads/"+file.Filename)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Falha no upload",
            })
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "message": "Arquivo enviado com sucesso",
            "filename": file.Filename,
        })
    })

    // Renderização de HTML
    router.GET("/html", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{
            "title": "Página de Exemplo",
        })
    })

    // Stream de dados
    router.GET("/stream", func(c *gin.Context) {
        c.Stream(func(w io.Writer) bool {
            // Simula streaming de dados
            for i := 0; i < 5; i++ {
                w.Write([]byte(fmt.Sprintf("Dados %d\n", i)))
                time.Sleep(1 * time.Second)
            }
            return false
        })
    })

    router.Run(":8080")
}`,
    explanation: `Gin oferece múltiplas formas de manipular respostas:
    - Respostas JSON com c.JSON()
    - Respostas XML com c.XML()
    - Download de arquivos com c.File()
    - Upload de arquivos com c.FormFile() e c.SaveUploadedFile()
    - Renderização de templates HTML com c.HTML()
    - Streaming de dados com c.Stream()
    - Flexibilidade para diferentes tipos de conteúdo e cenários`
  },

  ginPersistencia: {
    title: "Persistência de Dados",
    description: "Integração com bancos de dados usando Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "gorm.io/driver/postgres"
    "net/http"
)

// Modelo de usuário
type User struct {
    gorm.Model
    Name     string \`json:"name"\`
    Email    string \`json:"email" gorm:"unique"\`
    Age      int    \`json:"age"\`
}

func main() {
    // Conexão com o banco de dados
    dsn := "host=localhost user=usuario password=senha dbname=banco port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Falha na conexão com o banco de dados")
    }

    // Migração de modelos
    db.AutoMigrate(&User{})

    router := gin.Default()

    // Injeção de dependência do banco de dados
    router.Use(func(c *gin.Context) {
        c.Set("db", db)
    })

    // Criar usuário
    router.POST("/users", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }

        // Obtém a instância do banco de dados
        db := c.MustGet("db").(*gorm.DB)
        
        // Cria usuário no banco de dados
        result := db.Create(&user)
        if result.Error != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Falha ao criar usuário",
            })
            return
        }

        c.JSON(http.StatusCreated, user)
    })

    // Buscar usuários
    router.GET("/users", func(c *gin.Context) {
        db := c.MustGet("db").(*gorm.DB)
        
        var users []User
        result := db.Find(&users)
        if result.Error != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Falha ao buscar usuários",
            })
            return
        }

        c.JSON(http.StatusOK, users)
    })

    // Buscar usuário por ID
    router.GET("/users/:id", func(c *gin.Context) {
        db := c.MustGet("db").(*gorm.DB)
        
        var user User
        result := db.First(&user, c.Param("id"))
        if result.Error != nil {
            c.JSON(http.StatusNotFound, gin.H{
                "error": "Usuário não encontrado",
            })
            return
        }

        c.JSON(http.StatusOK, user)
    })

    // Atualizar usuário
    router.PUT("/users/:id", func(c *gin.Context) {
        db := c.MustGet("db").(*gorm.DB)
        
        var user User
        if err := db.First(&user, c.Param("id")).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{
                "error": "Usuário não encontrado",
            })
            return
        }

        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }

        db.Save(&user)
        c.JSON(http.StatusOK, user)
    })

    // Remover usuário
    router.DELETE("/users/:id", func(c *gin.Context) {
        db := c.MustGet("db").(*gorm.DB)
        
        result := db.Delete(&User{}, c.Param("id"))
        if result.Error != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Falha ao remover usuário",
            })
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "message": "Usuário removido com sucesso",
        })
    })

    router.Run(":8080")
}`,
    explanation: `Persistência de dados no Gin com GORM:
    - Uso de ORM (Object-Relational Mapping) para simplificar operações de banco
    - Injeção de dependência da conexão do banco de dados
    - Operações CRUD (Create, Read, Update, Delete) simplificadas
    - Suporte a validações e migrações de modelo
    - Flexibilidade para diferentes tipos de bancos de dados`
  },

  authentication: {
    title: "Autenticação no Gin",
    description: "Estratégias básicas de autenticação com JWT",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
    "net/http"
    "time"
)

// Gera token JWT
func generateToken(username string) (string, error) {
    claims := jwt.MapClaims{
        "username": username,
        "exp":      time.Now().Add(time.Hour * 24).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte("secret-key"))
}

// Middleware de autenticação
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")
        
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return []byte("secret-key"), nil
        })

        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Token inválido",
            })
            c.Abort()
            return
        }

        c.Next()
    }
}

func main() {
    router := gin.Default()

    // Rota de login
    router.POST("/login", func(c *gin.Context) {
        var loginInfo struct {
            Username string \`json:"username"\`
            Password string \`json:"password"\`
        }

        if err := c.ShouldBindJSON(&loginInfo); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Dados inválidos",
            })
            return
        }

        // Validação simples de credenciais
        if loginInfo.Username == "admin" && loginInfo.Password == "senha123" {
            token, _ := generateToken(loginInfo.Username)
            c.JSON(http.StatusOK, gin.H{
                "token": token,
            })
            return
        }

        c.JSON(http.StatusUnauthorized, gin.H{
            "error": "Credenciais inválidas",
        })
    })

    // Rota protegida
    protected := router.Group("/api")
    protected.Use(AuthMiddleware())
    {
        protected.GET("/perfil", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "Perfil do usuário",
            })
        })
    }

    router.Run(":8080")
}`,
    explanation: `Conceitos básicos de autenticação:
    - Geração de tokens JWT
    - Middleware para validação de tokens
    - Rota de login simples
    - Proteção de rotas com autenticação`
  },

  logging: {
    title: "Logging no Gin",
    description: "Estratégias básicas de logging em aplicações Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/sirupsen/logrus"
    "net/http"
    "time"
)

// Middleware de logging
func LoggingMiddleware(logger *logrus.Logger) gin.HandlerFunc {
    return func(c *gin.Context) {
        startTime := time.Now()

        // Passa para o próximo handler
        c.Next()

        // Tempo de processamento
        duration := time.Since(startTime)

        // Log da requisição
        logger.WithFields(logrus.Fields{
            "method":     c.Request.Method,
            "path":       c.Request.URL.Path,
            "status":     c.Writer.Status(),
            "latency":    duration.String(),
            "client_ip":  c.ClientIP(),
        }).Info("Requisição processada")
    }
}

func main() {
    // Configura logger
    logger := logrus.New()
    logger.SetFormatter(&logrus.JSONFormatter{})

    // Cria roteador
    router := gin.New()
    
    // Adiciona middleware de logging
    router.Use(LoggingMiddleware(logger))

    // Rotas de exemplo
    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Olá, mundo!",
        })
    })

    router.GET("/erro", func(c *gin.Context) {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Erro simulado",
        })
    })

    // Inicia servidor
    router.Run(":8080")
}`,
    explanation: `Práticas básicas de logging:
    - Middleware de logging personalizado
    - Uso de Logrus para logs estruturados
    - Captura de informações da requisição
    - Log de métodos, status, tempo de processamento`
  },
  ginintro: {
    title: "Introdução ao Gin",
    description: "Uma introdução ao framework Gin para desenvolvimento de APIs em Go",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    
    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Bem-vindo ao Gin!"})
    })
    
    r.Run(":8080") // Inicia o servidor na porta 8080
}
`,

    explanation: `O Gin é um framework minimalista e de alto desempenho para desenvolvimento de APIs em Go.

- A função \`gin.Default()\` cria uma instância do router com middlewares padrão (logger e recuperação de panics).
- A rota \`GET("/ “)\` define um endpoint que retorna um JSON com a mensagem "Bem-vindo ao Gin!".
- \`r.Run(":8080")\` inicia o servidor na porta 8080.
- O Gin é conhecido por ser rápido e eficiente, tornando-se uma excelente escolha para a construção de APIs escaláveis.`
},
ginestrutura: {
    title: "Estrutura de Projeto",
    description: "Como organizar um projeto no Gin de forma modular e escalável",
    code: `project/
│── main.go
│── routes/
│   ├── routes.go
│   ├── user_routes.go
│── controllers/
│   ├── user_controller.go
│── models/
│   ├── user.go
│── middlewares/
│   ├── auth.go
│── config/
│   ├── database.go
│── .env
`,

    explanation: `Para manter um projeto Gin organizado e escalável, seguimos uma estrutura modular.

- \`routes/\` contém as definições de rotas, separadas por responsabilidade.
- \`controllers/\` gerencia a lógica das requisições e respostas.
- \`models/\` define as estruturas de dados utilizadas no projeto.
- \`middlewares/\` armazena middlewares, como autenticação e logging.
- \`config/\` contém configurações globais, como conexão com banco de dados.
- \`.env\` armazena variáveis de ambiente, como chaves secretas e URLs de banco de dados.

Essa estrutura melhora a manutenção e facilita a escalabilidade do código.`
},
ginrotas: {
    title: "Rotas e Parâmetros com Gin",
    description: "Como definir rotas e capturar parâmetros no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    // Rota simples
    r.GET("/hello", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Olá, Gin!"})
    })

    // Rota com parâmetro de URL
    r.GET("/user/:id", func(c *gin.Context) {
        userID := c.Param("id") 
        c.JSON(http.StatusOK, gin.H{"user_id": userID})
    })

    // Rota com query parameters
    r.GET("/search", func(c *gin.Context) {
        query := c.Query("q")
        c.JSON(http.StatusOK, gin.H{"query": query})
    })

    r.Run(":8080")
}
`,

    explanation: `O Gin permite criar rotas de forma simples e intuitiva:

- A rota \`/hello\` responde com uma mensagem JSON fixa.
- A rota \`/user/:id\` captura um parâmetro da URL (\`:id\`) e retorna como resposta.
- A rota \`/search?q=valor\` usa query parameters, capturados com \`c.Query("q")\`.

Isso torna a API flexível para lidar com diferentes formas de entrada de dados.`
},
ginmiddlewares: {
    title: "Middlewares no Gin",
    description: "Como criar e usar middlewares no Gin para controle de fluxo",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "log"
    "time"
)

func LoggerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next() // Continua para a próxima etapa
        duration := time.Since(start)
        log.Printf("Requisição %s %s demorou %v", c.Request.Method, c.Request.URL, duration)
    }
}

func main() {
    r := gin.Default()
    r.Use(LoggerMiddleware()) // Aplica o middleware globalmente

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello, Middleware!"})
    })

    r.Run(":8080")
}
`,

    explanation: `Middlewares são funções que podem interceptar requisições antes de chegarem aos handlers.

- \`LoggerMiddleware\` calcula o tempo de execução da requisição e exibe no log.
- \`c.Next()\` permite que o fluxo continue para o próximo middleware ou handler.
- \`r.Use(LoggerMiddleware())\` registra o middleware globalmente para todas as rotas.

Middlewares são úteis para autenticação, logging, controle de acesso, entre outros.`
},
ginerro: {
    title: "Tratamento de Erros no Gin",
    description: "Como lidar com erros de forma eficaz no Gin",
    code: `package main

import (
    "errors"
    "github.com/gin-gonic/gin"
    "net/http"
)

// Função simulando um erro
func getUser(c *gin.Context) {
    userID := c.Param("id")
    if userID != "1" {
        c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"user": "Usuário encontrado!"})
}

func main() {
    r := gin.Default()
    r.GET("/user/:id", getUser)
    r.Run(":8080")
}
`,

    explanation: `O tratamento de erros no Gin é feito verificando condições e retornando respostas adequadas.

- Se \`userID != "1"\`, retornamos um erro 404 com \`c.JSON(http.StatusNotFound)\`.
- Caso contrário, retornamos uma resposta de sucesso.
- O Gin também permite usar middlewares para capturar erros globais, melhorando a padronização da API.

Isso garante uma experiência consistente e previsível para os usuários da API.`
},
gingruposrotas: {
    title: "Grupos de Rotas",
    description: "Como organizar rotas em grupos no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    api := r.Group("/api")
    {
        api.GET("/users", func(c *gin.Context) {
            c.JSON(200, gin.H{"users": "Lista de usuários"})
        })

        api.GET("/products", func(c *gin.Context) {
            c.JSON(200, gin.H{"products": "Lista de produtos"})
        })
    }

    r.Run(":8080")
}
`,

    explanation: `Grupos de rotas ajudam a organizar endpoints com um prefixo comum.

- Criamos o grupo \`/api\` e definimos sub-rotas dentro dele.
- Isso torna o código mais organizado e reduz repetição de prefixos.
- Também podemos aplicar middlewares a grupos específicos.

Isso melhora a modularidade e facilita a manutenção do código.`
},
ginvaloresdinamicos: {
    title: "Valores Dinâmicos nas Rotas",
    description: "Como trabalhar com valores dinâmicos em rotas no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    r.GET("/post/:year/:month/:day", func(c *gin.Context) {
        year := c.Param("year")
        month := c.Param("month")
        day := c.Param("day")
        c.JSON(http.StatusOK, gin.H{"date": year + "-" + month + "-" + day})
    })

    r.Run(":8080")
}
`,

    explanation: `Podemos capturar múltiplos parâmetros dinâmicos em uma rota.

- A rota \`/post/:year/:month/:day\` captura três valores da URL.
- \`c.Param("year")\`, \`c.Param("month")\` e \`c.Param("day")\` extraem esses valores.
- Isso é útil para páginas de detalhes, filtragens e categorias dinâmicas.

Facilita a criação de URLs semânticas e amigáveis para APIs e aplicações web.`
},
ginvalidador: {
    title: "Validação de Requisição",
    description: "Como validar dados enviados pelo cliente no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "net/http"
)

type User struct {
    Name  string \`json:"name" binding:"required"\`
    Email string \`json:"email" binding:"required,email"\`
    Age   int    \`json:"age" binding:"gte=18,lte=60"\`
}

var validate = validator.New()

func createUser(c *gin.Context) {
    var user User

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Usuário criado com sucesso", "user": user})
}

func main() {
    r := gin.Default()
    r.POST("/user", createUser)
    r.Run(":8080")
}
`,

    explanation: `A validação de dados no Gin é feita com o pacote \`binding\`, que usa \`validator.v10\`.

- A struct \`User\` tem regras de validação nos campos, como \`required\`, \`email\` e \`gte=18,lte=60\`.
- \`c.ShouldBindJSON(&user)\` verifica se os dados da requisição são válidos.
- Se houver erro, retornamos um código HTTP 400 com a mensagem de erro.

Isso garante que os dados recebidos estejam no formato esperado antes do processamento.`
},
ginresponse: {
    title: "Manipulação de Respostas",
    description: "Como retornar diferentes tipos de respostas no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    // Retornando JSON
    r.GET("/json", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Resposta JSON"})
    })

    // Retornando texto simples
    r.GET("/text", func(c *gin.Context) {
        c.String(http.StatusOK, "Resposta em texto")
    })

    // Retornando HTML
    r.GET("/html", func(c *gin.Context) {
        c.Data(http.StatusOK, "text/html; charset=utf-8", []byte("<h1>Resposta HTML</h1>"))
    })

    r.Run(":8080")
}
`,

    explanation: `O Gin permite retornar diferentes formatos de resposta:

- \`c.JSON\` retorna JSON estruturado.
- \`c.String\` retorna texto puro.
- \`c.Data\` pode ser usado para HTML, arquivos ou qualquer outro formato.

Isso facilita a criação de APIs flexíveis que atendem diferentes tipos de clientes.`
},
ginpersistencia: {
    title: "Persistência de Dados",
    description: "Como conectar o Gin a um banco de dados PostgreSQL",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "net/http"
)

type User struct {
    ID    uint   \`json:"id" gorm:"primaryKey"\`
    Name  string \`json:"name"\`
    Email string \`json:"email" gorm:"unique"\`
}

var db *gorm.DB

func initDB() {
    dsn := "host=localhost user=postgres password=1234 dbname=mydb port=5432 sslmode=disable"
    var err error
    db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Erro ao conectar ao banco de dados")
    }
    db.AutoMigrate(&User{})
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    db.Create(&user)
    c.JSON(http.StatusOK, gin.H{"message": "Usuário criado com sucesso", "user": user})
}

func main() {
    r := gin.Default()
    initDB()
    
    r.POST("/users", createUser)
    
    r.Run(":8080")
}
`,

    explanation: `Aqui conectamos o Gin ao banco de dados PostgreSQL usando GORM.

- \`gorm.Open(postgres.Open(dsn))\` estabelece a conexão.
- \`db.AutoMigrate(&User{})\` cria a tabela automaticamente se ela não existir.
- \`db.Create(&user)\` insere um novo usuário no banco.

Isso simplifica a integração da API com o banco de dados de forma eficiente.`
},
autenticacao: {
    title: "Autenticação e Autorização",
    description: "Como implementar autenticação com JWT no Gin",
    code: `package main

import (
    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
    "net/http"
    "time"
)

var secretKey = []byte("chave-secreta")

func GenerateToken(c *gin.Context) {
    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["username"] = "usuario123"
    claims["exp"] = time.Now().Add(time.Hour * 1).Unix()

    tokenString, _ := token.SignedString(secretKey)
    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")
        if tokenString == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token não fornecido"})
            c.Abort()
            return
        }

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return secretKey, nil
        })
        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
            c.Abort()
            return
        }

        c.Next()
    }
}

func main() {
    r := gin.Default()

    r.POST("/login", GenerateToken)

    protected := r.Group("/api")
    protected.Use(AuthMiddleware())
    protected.GET("/secure", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Acesso autorizado!"})
    })

    r.Run(":8080")
}
`,

    explanation: `Implementamos autenticação JWT para proteger rotas sensíveis.

- \`GenerateToken\` gera um token JWT válido por 1 hora.
- \`AuthMiddleware\` verifica a validade do token antes de permitir o acesso.
- \`protected.Use(AuthMiddleware())\` protege todas as rotas dentro do grupo \`/api\`.

Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades da API.`
},
logs: {
    title: "Logs e Monitoramento no Gin",
    description: "Como registrar logs e monitorar requisições no Gin",
    code: `package main

import (
    "github.com/gin-gonic/gin"
    "log"
    "os"
)

func main() {
    // Criando arquivo de log
    file, _ := os.Create("server.log")
    gin.DefaultWriter = file

    r := gin.Default()

    r.GET("/", func(c *gin.Context) {
        log.Println("Requisição recebida!")
        c.JSON(200, gin.H{"message": "Bem-vindo ao servidor"})
    })

    r.Run(":8080")
}
`,

    explanation: `Podemos configurar logs no Gin para capturar atividades do servidor.

- \`os.Create("server.log")\` cria um arquivo para armazenar logs.
- \`gin.DefaultWriter = file\` direciona os logs do Gin para esse arquivo.
- \`log.Println("Requisição recebida!")\` registra eventos importantes.

Isso ajuda a monitorar e depurar o funcionamento da API de forma eficiente.`
}
};
