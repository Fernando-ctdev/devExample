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
      { id: "Estruturas de controle", title: "Estruturas de controle" },
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
      { id: "Ponteiros", title: "Ponteiros" },
      { id: "Init", title: "Init" },
    ],
  },
  {
    category: "Interfaces",
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
    items: [
      { id: "Verbos", title: "Verbos de Formatação" },
    ],
  },
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
var naoVerdade = !true    // Não lógico`,
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
fmt.Println("Endereço:", pessoa.Endereco)`,
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
slice = append(slice, 6)`,
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
fmt.Println("Valor apontado pelo ponteiro:", *ponteiro)`,
    explanation: `Ponteiros são variáveis que armazenam o endereço de memória de outra variável. 
O operador '&' é usado para obter o endereço de memória de uma variável, enquanto '*' é usado para acessar o valor armazenado nesse endereço.
Neste exemplo, mostramos como manipular o valor de uma variável indiretamente através de um ponteiro.`,
},

Maps: {
    title: "Maps",
    description: "Mapas (ou dicionários) em Go",
    code: `// Mapas em Go para armazenar pares chave-valor
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
fmt.Println("Cargo de João:", cargo, "Existe?", existe)`,
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
}`,
    explanation: `Go utiliza estruturas de controle como 'if', 'switch' e 'for' para decidir o fluxo do programa.
Neste exemplo, verificamos se a variável 'idade' é maior ou igual a 18 e, com base nisso, mostramos uma mensagem.`,
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
    title: "rfaces",
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
  title: "ões Avançadas",
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
    title: "Select",
    description: "Multiplexação de canais em Go",
    code: `// Usando select
ch1 := make(chan string)
ch2 := make(chan string)

go func() {
    ch1 <- "Mensagem de ch1"
}()

go func() {
    ch2 <- "Mensagem de ch2"
}()

select {
case msg1 := <-ch1:
    fmt.Println(msg1)
case msg2 := <-ch2:
    fmt.Println(msg2)
}`,

    explanation:
      "A instrução select permite esperar em múltiplos canais simultaneamente, retornando o primeiro canal que recebe um valor.",
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
    explanation:
      "O padrão Worker Pool é utilizado para distribuir uma carga de trabalho entre várias goroutines, equilibrando a execução de tarefas.",
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
      "O padrão Generator em Go é usado para criar um fluxo de valores, permitindo que você gere uma sequência sob demanda de maneira eficiente.",
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
      "O padrão Multiplexador permite combinar múltiplas fontes de dados, facilitando a agregação de valores de diferentes canais.",
  },
  fmt: {
    title: "Funções do Pacote fmt",
    description: "Principais funções do pacote fmt em Go para entrada e saída formatada",
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
    title: "Pacote string",
    description: "Manipulação de strings com o pacote string",
    code: `// Exemplo de uso do pacote string
import "strings"

func main() {
    frase := "Olá, Mundo!"
    fraseMaiuscula := strings.ToUpper(frase)
    fmt.Println(fraseMaiuscula) // Saída: "OLÁ, MUNDO!"
}`,
    explanation: `O pacote strings oferece várias funções úteis para manipulação de strings. A função ToUpper converte todos os caracteres de uma string para maiúsculas.`,
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
    description: "Interação com o sistema operacional: arquivos, processos, ambiente",
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
    title: "Pacote net/http",
    description: "Trabalhando com requisições HTTP usando o pacote net/http",
    code: `// Exemplo de uso do pacote net/http
import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Olá, Mundo!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}`,
    explanation: `O pacote net/http é utilizado para criar servidores HTTP e fazer requisições. O exemplo cria um servidor HTTP simples que responde "Olá, Mundo!" para qualquer requisição na raiz ("/").`,
  },
  Verbos: {
    title: "Verbos de Formatação em Go",
    description: "Principais verbos de formatação para usar com fmt.Printf, fmt.Sprintf, etc.",
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
  }
};
