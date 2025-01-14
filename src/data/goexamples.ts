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
      { id: "Sprintf", title: "Sprintf" },
      { id: "Print", title: "Print" },
      { id: "Println", title: "Println" },
      { id: "Fprintf", title: "Fprintf" },
      { id: "Fprint", title: "Fprint" },
      { id: "Errorf", title: "Errorf" },
      { id: "Scan", title: "Scan" },
      { id: "Scanf", title: "Scanf" },
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
    title: "Pacote fmt",
    description: "Uso do pacote fmt para formatação e saída de dados",
    code: `// Exemplo de uso do pacote fmt
import "fmt"

func main() {
    fmt.Println("Olá, Go!")
    nome := "João"
    idade := 30
    fmt.Printf("Nome: %s, Idade: %d\n", nome, idade)
}`,
    explanation: `O pacote fmt é usado para formatar e imprimir dados. A função Println imprime uma linha com uma quebra de linha no final, enquanto a função Printf permite especificar a formatação de dados, como no exemplo de 'Nome' e 'Idade'.`,
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
    title: "Tipo int",
    description: "Trabalhando com o tipo de dado int em Go",
    code: `// Exemplo de uso do tipo int
var numero int = 42
fmt.Println(numero)`,
    explanation: `O tipo int é utilizado para armazenar números inteiros. Em Go, o tipo int pode variar em tamanho dependendo do sistema, mas é adequado para a maioria dos usos de números inteiros.`,
  },
  time: {
    title: "Pacote time",
    description: "Manipulação de datas e horários com o pacote time",
    code: `// Exemplo de uso do pacote time
import "time"

func main() {
    agora := time.Now()
    fmt.Println("Data e Hora atuais:", agora)
}`,
    explanation: `O pacote time fornece funcionalidades para manipular datas, horas e durações. A função time.Now() retorna o horário atual do sistema.`,
  },
  os: {
    title: "Pacote os",
    description: "Interação com o sistema operacional através do pacote os",
    code: `// Exemplo de uso do pacote os
import "os"

func main() {
    args := os.Args
    fmt.Println("Argumentos passados:", args)
}`,
    explanation: `O pacote os oferece funções para interagir com o sistema operacional. No exemplo, os.Args retorna uma lista de argumentos passados ao programa na linha de comando.`,
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
  Sprintf: {
    title: "Sprintf",
    description: "Formatação de strings com o método Sprintf em Go",
    code: `// Usando Sprintf para formatar uma string, 
    // comum usar 
%s - Para textos (strings)
%d - Para números inteiros
%f - Para números decimais
%t - Para verdadeiro/falso (true/false)
%v - Serve para qualquer tipo (versátil)

nome := "João"
idade := 25
result := fmt.Sprintf("Nome: %s, Idade: %d", nome, idade)`,
    explanation: `O método 'Sprintf' é utilizado para formatar uma string com valores dinâmicos. Ele retorna a string formatada sem imprimir na tela, permitindo maior controle sobre a saída.`,
  },
  Print: {
    title: "Print",
    description: "Impressão de dados na saída padrão com Print em Go",
    code: `// Usando Print para imprimir na saída padrão
fmt.Print("Olá, Mundo!")`,
    explanation: `'Print' imprime o texto ou os valores passados como argumento na saída padrão (geralmente o terminal), sem adicionar uma nova linha no final.`,
  },
  Println: {
    title: "Println",
    description: "Impressão de dados com Println, incluindo uma nova linha",
    code: `// Usando Println para imprimir com nova linha
fmt.Println("Olá, Mundo!")`,
    explanation: `O método 'Println' funciona de forma similar ao 'Print', mas com a diferença de que ele automaticamente adiciona uma nova linha ao final da impressão.`,
  },
  Fprintf: {
    title: "Fprintf",
    description: "Impressão formatada em um writer com Fprintf",
    code: `// Usando Fprintf para formatar e imprimir em um writer (ex: arquivo)
file, _ := os.Create("saida.txt")
fmt.Fprintf(file, "Nome: %s, Idade: %d", nome, idade)`,
    explanation: `'Fprintf' é similar ao 'Sprintf', mas imprime a saída formatada para um 'writer' (por exemplo, arquivos, buffers, etc.), ao invés da saída padrão.`,
  },
  Fprint: {
    title: "Fprint",
    description: "Impressão simples em um writer com Fprint",
    code: `// Usando Fprint para imprimir sem formatação em um writer
file, _ := os.Create("saida.txt")
fmt.Fprint(file, "Texto simples")`,
    explanation: `'Fprint' imprime os dados passados para um 'writer', mas sem realizar qualquer formatação, diferente do 'Fprintf' que permite formatação.`,
  },
  Errorf: {
    title: "Errorf",
    description: "Criação de erros formatados com Errorf",
    code: `// Usando Errorf para criar um erro formatado
err := fmt.Errorf("Erro: %s, Código: %d", "Falha ao processar", 404)`,
    explanation: `'Errorf' cria um erro formatado similar ao 'Sprintf', mas ao invés de uma string comum, ele retorna um valor do tipo 'error', que pode ser manipulado em fluxos de controle de erro.`,
  },
  Scan: {
    title: "Scan",
    description: "Leitura de entrada com Scan",
    code: `// Usando Scan para ler entrada do usuário
var nome string
fmt.Scan(&nome)`,
    explanation: `'Scan' é utilizado para ler dados da entrada padrão (geralmente teclado) e armazená-los em variáveis. O exemplo lê uma string do usuário e a armazena na variável 'nome'.`,
  },
  Scanf: {
    title: "Scanf",
    description: "Leitura de entrada formatada com Scanf",
    code: `// Usando Scanf para ler uma entrada formatada
var nome string
var idade int
fmt.Scanf("%s %d", &nome, &idade)`,
    explanation: `'Scanf' permite ler entradas da mesma forma que 'Scan', mas com a capacidade de especificar um formato de leitura (como '%s' para string e '%d' para inteiros). Isso ajuda a garantir que a entrada seja lida corretamente no formato desejado.`,
  },
};
