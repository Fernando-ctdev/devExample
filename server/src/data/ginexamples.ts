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
]

export const examples: Record<string, Example> = {
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
    file, _ := os.Create("server.log")
    gin.DefaultWriter = file

    r := gin.Default()

    r.GET("/", func(c *gin.Context) {
        log.Println("Requisição recebida!")
        c.JSON(200, gin.H{"message": "Bem-vindo ao servidor"})
    })

    r.Run(":8080")
}`,
      explanation: `Podemos configurar logs no Gin para capturar atividades do servidor.

- \`os.Create("server.log")\` cria um arquivo para armazenar logs.
- \`gin.DefaultWriter = file\` direciona os logs do Gin para esse arquivo.
- \`log.Println("Requisição recebida!")\` registra eventos importantes.

Isso ajuda a monitorar e depurar o funcionamento da API de forma eficiente.`
    }
}