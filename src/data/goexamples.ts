export interface Examplego {
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
      { id: "Pacotes", title: "1 - Tipos em Go" },
      { id: "variaveis", title: "2 - Variáveis e Constantes" },
      { id: "Tipos", title: "3 - Tipos de dados" },
      { id: "Funções", title: "4 - Funçoes em Go" },
      { id: "Operadores", title: "5 - Operadores" },
      { id: "Structs", title: "6 - Structs em Go" },
      { id: "Arrays", title: "7 - Arrays e Slices" },
      { id: "Ponteiros", title: "8 - Ponteiros" },
      { id: "Maps", title: "9 - Maps" },
      { id: "Estruturas de controle", title: "10 - struturas de controle" },
      { id: "Métodos", title: "11 - Métodos" },
      { id: "Interfaces", title: "12 - Interfaces" },
    ],
  },
  {
    category: "Funções Avançadas",
    items: [
      {
        id: "Funções com retorno nomeado",
        title: "1 - Funções retorno nomeado",
      },
      { id: "Funções variáticas", title: "2 - Funções variáticas" },
      { id: "Funções anônimas", title: "3 - Funções anônimas" },
      { id: "Funções recursivas", title: "4 - Funções recursivas" },
      { id: "Defer", title: "5 - Defer" },
      { id: "Panic-Recover", title: "6 - Panic-Recover" },
      { id: "Closure", title: "7 - Closure" },
      { id: "Ponteiros", title: "8 - Ponteiros" },
      { id: "Init", title: "9 - Init" },
    ],
  },
  {
    category: "Interfaces",
    items: [
      { id: "Formas", title: "1 - Formas" },
      { id: "Tipo generico", title: "2 - Tipo generico" },
    ],
  },
  {
    category: "Concorrência em Go",
    items: [
      { id: "Go routines", title: "1 - Go routines" },
      { id: "Waitgroup", title: "2 - Waitgroup" },
      { id: "Canais", title: "3 - Canais" },
      { id: "Canais com buffer", title: "4 - Canais com buffer" },
      { id: "Select", title: "5 - Select" },
    ],
  },
  {
    category: "Padrões de concorrência",
    items: [
      { id: "Worker pools", title: "1 - Worker pools" },
      { id: "Generator", title: "2 - Generator" },
      { id: "Multiplexador", title: "3 - Multiplexador" },
    ],
  },
  {
    category: "Principais pacotes Go",
    items: [
      { id: "fmt", title: "1 - fmt" },
      { id: "string", title: "2 - string" },
      { id: "int", title: "3 - int" },
      { id: "time", title: "4 - time" },
      { id: "os", title: "5 - os" },
      { id: "net/http", title: "6 - net/http" },
    ],
  },
  {
    category: "Principais Verbos de Formatação",
    items: [
      { id: "Sprintf", title: "1 - Sprintf" },
      { id: "Print", title: "2 - Print" },
      { id: "Println", title: "3 - Println" },
      { id: "Fprintf", title: "4 - Fprintf" },
      { id: "Fprint", title: "5 - Fprint" },
      { id: "Errorf", title: "6 - Errorf" },
      { id: "Scan", title: "7 - Scan" },
      { id: "Scanf", title: "8 - Scanf" },
    ],
  },
];

export const examplesgo: Record<string, Examplego> = {
  Pacotes: {
    title: "1 - Tipos em Go",
    description: "Os tipos básicos e estruturados em GoLang",
    code: `// Declaração de variáveis em Go
var texto string = "Olá"
var numero int = 42
var decimal float64 = 3.14
var booleano bool = true`,
    explanation: `Go usa tipos estáticos e inferência para melhorar a consistência.
Você pode declarar variáveis com tipos explícitos ou confiar na inferência de tipo do Go.`,
  },
  variaveis: {
    title: "2 - Variáveis e Constantes",
    description: "Como declarar e utilizar variáveis e constantes em Go",
    code: `// Declaração de variáveis
var idade int = 30
// Declaração de constantes
const Pi = 3.14`,
    explanation: `Em Go, as variáveis podem ser declaradas explicitamente, como no exemplo acima, ou utilizando a palavra-chave 'var' com inferência de tipo.
Já as constantes são declaradas com a palavra-chave 'const', e seu valor não pode ser alterado após a atribuição inicial.`,
  },
  Tipos: {
    title: "3 - Tipos de dados",
    description: "Entenda os diferentes tipos de dados disponíveis em Go",
    code: `// Tipos primitivos em Go
var inteiro int = 10
var flutuante float64 = 3.14
var texto string = "Olá, Go!"`,
    explanation: `Go tem tipos estáticos como inteiros, flutuantes, strings, bool, e tipos compostos como arrays, slices e structs.
O tipo 'string' é usado para textos, 'int' para inteiros, e 'float64' para números com ponto flutuante.`,
  },
  Funções: {
    title: "4 - Funções em Go",
    description: "Definindo funções e retornando valores",
    code: `// Definição de função simples
func saudacao(nome string) string {
    return "Olá, " + nome
}`,
    explanation: `Funções em Go podem ter múltiplos parâmetros e retornos.
Neste exemplo, 'saudacao' recebe um parâmetro 'nome' do tipo 'string' e retorna uma 'string'.`,
  },
  Operadores: {
    title: "5 - Operadores",
    description: "Operadores aritméticos, relacionais e lógicos em Go",
    code: `// Operadores em Go
var soma = 10 + 5  // Aritmético
var maiorQue = 10 > 5  // Relacional
var eVerdade = true && false  // Lógico`,
    explanation: `Go possui operadores aritméticos (+, -, *, /), relacionais (==, !=, >, <), e lógicos (&&, ||) para manipulação de dados e controle de fluxo.`,
  },
  Structs: {
    title: "6 - Structs em Go",
    description: "Como usar structs para agrupar dados em Go",
    code: `// Definindo uma struct
type Pessoa struct {
    Nome   string
    Idade  int
}

// Usando uma struct
pessoa := Pessoa{"João", 25}`,
    explanation: `Structs em Go são tipos compostos que permitem agrupar diferentes tipos de dados.
Neste exemplo, a struct 'Pessoa' possui os campos 'Nome' e 'Idade', e podemos inicializá-la com um valor diretamente.`,
  },
  Arrays: {
    title: "7 - Arrays e Slices",
    description: "Arrays e slices em Go",
    code: `// Arrays em Go
var arr [3]int = [3]int{1, 2, 3}
// Slices são mais flexíveis
var slice []int = []int{1, 2, 3}`,
    explanation: `Arrays têm tamanho fixo, enquanto slices são mais flexíveis, permitindo o redimensionamento dinâmico.
Neste exemplo, 'arr' é um array de 3 elementos, enquanto 'slice' é um slice de tamanho dinâmico.`,
  },
  Ponteiros: {
    title: "8 - Ponteiros",
    description: "Trabalhando com ponteiros em Go",
    code: `// Ponteiros em Go
var numero int = 10
var ponteiro *int = &numero`,
    explanation: `Ponteiros em Go são usados para referenciar variáveis, permitindo acessar e modificar seus valores sem criar cópias.
O operador '&' é utilizado para obter o endereço de memória de uma variável.`,
  },
  Maps: {
    title: "9 - Maps",
    description: "Mapas (ou dicionários) em Go",
    code: `// Declaração de um map onde a chave é string e o valor é int
var mapeamento map[string]int = map[string]int{"um": 1, "dois": 2}

// Forma mais curta de criar um map
numeros := map[string]int{
    "um":   1,
    "dois": 2,
}

// Adicionando um novo item
numeros["três"] = 3

// Verificando se uma chave existe
valor, existe := numeros["quatro"]`,
    explanation: `Maps são coleções de pares chave-valor, onde cada chave é única.
Neste exemplo, o mapa 'mapeamento' associa chaves do tipo 'string' a valores do tipo 'int'.`,
  },
  "Estruturas de controle": {
    title: "10 - Estruturas de controle",
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
    title: "11 - Métodos",
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
  "Go routines": {
    title: "1 - Go routines",
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
    title: "2 - Waitgroup",
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
    title: "3 - Canais",
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
    title: "4 - Canais com buffer",
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
    title: "5 - Select",
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
    title: "1 - Worker pools",
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
    title: "2 - Generator",
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
    title: "3 - Multiplexador",
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
    title: "1 - Pacote fmt",
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
    title: "2 - Pacote string",
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
    title: "3 - Tipo int",
    description: "Trabalhando com o tipo de dado int em Go",
    code: `// Exemplo de uso do tipo int
var numero int = 42
fmt.Println(numero)`,
    explanation: `O tipo int é utilizado para armazenar números inteiros. Em Go, o tipo int pode variar em tamanho dependendo do sistema, mas é adequado para a maioria dos usos de números inteiros.`,
  },
  time: {
    title: "4 - Pacote time",
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
    title: "5 - Pacote os",
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
    title: "6 - Pacote net/http",
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
    title: "1 - Sprintf",
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
    title: "2 - Print",
    description: "Impressão de dados na saída padrão com Print em Go",
    code: `// Usando Print para imprimir na saída padrão
fmt.Print("Olá, Mundo!")`,
    explanation: `'Print' imprime o texto ou os valores passados como argumento na saída padrão (geralmente o terminal), sem adicionar uma nova linha no final.`,
  },
  Println: {
    title: "3 - Println",
    description: "Impressão de dados com Println, incluindo uma nova linha",
    code: `// Usando Println para imprimir com nova linha
fmt.Println("Olá, Mundo!")`,
    explanation: `O método 'Println' funciona de forma similar ao 'Print', mas com a diferença de que ele automaticamente adiciona uma nova linha ao final da impressão.`,
  },
  Fprintf: {
    title: "4 - Fprintf",
    description: "Impressão formatada em um writer com Fprintf",
    code: `// Usando Fprintf para formatar e imprimir em um writer (ex: arquivo)
file, _ := os.Create("saida.txt")
fmt.Fprintf(file, "Nome: %s, Idade: %d", nome, idade)`,
    explanation: `'Fprintf' é similar ao 'Sprintf', mas imprime a saída formatada para um 'writer' (por exemplo, arquivos, buffers, etc.), ao invés da saída padrão.`,
  },
  Fprint: {
    title: "5 - Fprint",
    description: "Impressão simples em um writer com Fprint",
    code: `// Usando Fprint para imprimir sem formatação em um writer
file, _ := os.Create("saida.txt")
fmt.Fprint(file, "Texto simples")`,
    explanation: `'Fprint' imprime os dados passados para um 'writer', mas sem realizar qualquer formatação, diferente do 'Fprintf' que permite formatação.`,
  },
  Errorf: {
    title: "6 - Errorf",
    description: "Criação de erros formatados com Errorf",
    code: `// Usando Errorf para criar um erro formatado
err := fmt.Errorf("Erro: %s, Código: %d", "Falha ao processar", 404)`,
    explanation: `'Errorf' cria um erro formatado similar ao 'Sprintf', mas ao invés de uma string comum, ele retorna um valor do tipo 'error', que pode ser manipulado em fluxos de controle de erro.`,
  },
  Scan: {
    title: "7 - Scan",
    description: "Leitura de entrada com Scan",
    code: `// Usando Scan para ler entrada do usuário
var nome string
fmt.Scan(&nome)`,
    explanation: `'Scan' é utilizado para ler dados da entrada padrão (geralmente teclado) e armazená-los em variáveis. O exemplo lê uma string do usuário e a armazena na variável 'nome'.`,
  },
  Scanf: {
    title: "8 - Scanf",
    description: "Leitura de entrada formatada com Scanf",
    code: `// Usando Scanf para ler uma entrada formatada
var nome string
var idade int
fmt.Scanf("%s %d", &nome, &idade)`,
    explanation: `'Scanf' permite ler entradas da mesma forma que 'Scan', mas com a capacidade de especificar um formato de leitura (como '%s' para string e '%d' para inteiros). Isso ajuda a garantir que a entrada seja lida corretamente no formato desejado.`,
  },
};
