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
    category: "Framework NestJS",
    items: [
      { id: "nestjsintro", title: "Introdução ao NestJS" },
      { id: "nestjsestrutura", title: "Estrutura de Projeto" },
      { id: "nestjsmodulos", title: "Módulos no NestJS" },
      { id: "nestjsrotas", title: "Rotas e Controladores" },
      { id: "nestjsparametros", title: "Parâmetros de Rota" },
      { id: "nestjsrespostas", title: "Resposta de Requisição" },
      { id: "nestjsservicos", title: "Serviços no NestJS" },
      { id: "nestjsinjecao", title: "Injeção de Dependências" },
      { id: "nestjsmiddlewares", title: "Middlewares no NestJS" },
      { id: "nestjspipes", title: "Pipes e Validação" },
      { id: "nestjsguards", title: "Guards e Segurança" },
      { id: "nestjsinterceptors", title: "Interceptors no NestJS" },
    ],
  },
];

export const examplesnest: Record<string, Example> = {
  "nestjsintro": {
        "title": "Introdução ao NestJS",
        "description": "Framework Node.js para construção de aplicações back-end eficientes e escaláveis",
        "code": `// Instalação do NestJS CLI
npm install -g @nestjs/cli

// Criação de novo projeto
nest new projeto-exemplo

// Estrutura básica de uma aplicação
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}`,
        "explanation": `O NestJS é um framework progressivo para construção de aplicações server-side com Node.js. Ele utiliza TypeScript como linguagem principal e se inspira em padrões de arquitetura como Angular.

Principais características:
- Arquitetura modular baseada em decorators
- Suporte nativo a Injeção de Dependências
- Baseado em módulos reutilizáveis
- Alto desempenho e escalabilidade
- Fortemente tipado com TypeScript

No exemplo de código, mostramos:
1. Instalação do NestJS CLI
2. Criação de um novo projeto
3. Definição de um módulo básico usando decorators
`
    },
    "nestjsestrutura": {
        "title": "Estrutura de Projeto",
        "description": "Organização de diretórios e arquivos em um projeto NestJS",
        "code": `projeto-exemplo/
├── src/
│   ├── main.ts          # Ponto de entrada da aplicação
│   ├── app.module.ts    # Módulo raiz da aplicação
│   ├── app.controller.ts # Controlador principal
│   ├── app.service.ts   # Serviço principal
│   └── modules/         # Diretório para módulos específicos
│       └── usuarios/
│           ├── usuarios.module.ts
│           ├── usuarios.controller.ts
│           └── usuarios.service.ts
├── test/                # Diretórios de testes
├── nest-cli.json        # Configurações do NestJS
└── tsconfig.json        # Configurações do TypeScript`,
        "explanation": `A estrutura de um projeto NestJS segue uma organização modular e bem definida:

Principais componentes:
- src/main.ts: Ponto de entrada da aplicação
- src/app.module.ts: Módulo raiz que importa todos os outros
- Diretório modules/: Agrupa módulos específicos da aplicação

Cada módulo geralmente contém:
1. Módulo (.module.ts)
2. Controlador (.controller.ts)
3. Serviço (.service.ts)

Benefícios desta estrutura:
- Organização clara
- Separação de responsabilidades
- Facilidade de manutenção e escalabilidade
`
    },
    "nestjsmodulos": {
        "title": "Módulos no NestJS",
        "description": "Criação e configuração de módulos no NestJS",
        "code": `import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],  // Controladores do módulo
  providers: [UsuariosService],       // Serviços/Providers
  imports: [],                         // Módulos importados
  exports: [UsuariosService]           // Serviços exportados
})
export class UsuariosModule {}

// Exemplo de módulo raiz
@Module({
  imports: [UsuariosModule, OutroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`
        ,
        "explanation": `Módulos no NestJS são classes decoradas com @Module() que organizam componentes relacionados.

Principais elementos de um módulo:
- controllers: Controladores associados ao módulo
- providers: Serviços e injetáveis 
- imports: Outros módulos necessários
- exports: Serviços disponibilizados para outros módulos

Características importantes:
1. Encapsulam um conjunto coeso de funcionalidades
2. Permitem organização modular da aplicação
3. Facilitam a injeção de dependências
4. Promovem baixo acoplamento entre componentes`
    },
    "nestjsrotas": {
        "title": "Rotas e Controladores",
        "description": "Definição de rotas e controladores no NestJS",
        "code": `import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')  // Prefixo de rota
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService
  ) {}

  // Rota GET /usuarios
  @Get()
  listarTodos() {
    return this.usuariosService.listarTodos();
  }

  // Rota POST /usuarios
  @Post()
  criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return this.usuariosService.criar(dadosUsuario);
  }

  // Rota GET /usuarios/:id
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id);
  }
}`,
        "explanation": `Controladores no NestJS gerenciam rotas e requisições HTTP.

Principais decorators de rota:
- @Controller(): Define o prefixo base para rotas
- @Get(): Manipula requisições GET
- @Post(): Manipula requisições POST
- @Put(): Manipula requisições PUT
- @Delete(): Manipula requisições DELETE

Características:
1. Utilizam decorators para definir rotas
2. Injetam serviços via construtor
3. Podem usar decorators para capturar parâmetros:
   - @Body(): Corpo da requisição
   - @Param(): Parâmetros de rota
   - @Query(): Parâmetros de consulta`
    },
    "nestjsparametros": {
        "title": "Parâmetros de Rota",
        "description": "Manipulação de parâmetros em rotas NestJS",
        "code": `import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('produtos')
export class ProdutosController {
  // Parâmetro de rota simples
  @Get(':id')
  buscarProduto(@Param('id') id: string) {
    return { mensagem: Buscando produto S{id} };
  }

  // Múltiplos parâmetros
  @Get('categoria/:categoria/marca/:marca')
  buscarPorCategoriaEMarca(
    @Param('categoria') categoria: string,
    @Param('marca') marca: string
  ) {
    return { 
      categoria, 
      marca 
    };
  }

  // Parâmetros de consulta
  @Get()
  listarProdutos(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10
  ) {
    return {
      pagina,
      limite,
      produtos: []
    };
  }
}`,
        "explanation": `Parâmetros de rota permitem capturar valores dinâmicos em URLs.

Tipos de parâmetros:
1. Parâmetros de Rota (@Param)
   - Capturados diretamente na URL
   - Definidos no path do decorator

2. Parâmetros de Consulta (@Query)
   - Opcionais
   - Passados após ? na URL (ex: /produtos?pagina=2&limite=10)
   - Podem ter valores padrão

Características:
- Conversão automática de tipos
- Validação pode ser adicionada com Pipes
- Flexibilidade na definição de rotas dinâmicas`
    },
    "nestjsrespostas": {
        "title": "Resposta de Requisição",
        "description": "Formatação e envio de respostas HTTP",
        "code": `import { 
  Controller, 
  Get, 
  Post, 
  Res, 
  HttpStatus, 
  HttpException 
} from '@nestjs/common';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  // Resposta simples
  @Get()
  listarusuarios() {
    return { usuarios: [] };
  }

  // Usando Response do Express
  @Get('detalhes')
  obterDetalhes(@Res() res: Response) {
    res.status(200).json({
      mensagem: 'Detalhes obtidos com sucesso'
    });
  }

  // Lançando exceções HTTP
  @Post()
  criarUsuario() {
    try {
      // Lógica de criação
      throw new Error('Usuário já existe');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Erro ao criar usuário',
        detalhes: error.message
      }, HttpStatus.CONFLICT);
    }
  }
}`,
        "explanation": `Respostas de requisição no NestJS podem ser manipuladas de várias formas:

Métodos de Resposta:
1. Retorno direto de objetos
   - NestJS converte automaticamente para JSON
   - Status padrão 200 OK

2. Uso do objeto Response do Express
   - Controle total sobre cabeçalhos e status
   - Método @Res() para injetar resposta

3. Tratamento de Exceções
   - HttpException para erros personalizados
   - Permite definir status e mensagens específicas

Boas Práticas:
- Use retornos simples quando possível
- Utilize HttpException para erros esperados
- Padronize formatos de resposta`
    },
    "nestjsservicos": {
        "title": "Serviços no NestJS",
        "description": "Criação e uso de serviços para lógica de negócio",
        "code": `import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
  ];

  listarTodos() {
    return this.usuarios;
  }

  buscarPorId(id: number) {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  criar(dadosUsuario) {
    const novoUsuario = {
      id: this.usuarios.length + 1,
      ...dadosUsuario
    };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }
}

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService
  ) {}

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarTodos();
  }
}`,
        "explanation": `Serviços no NestJS encapsulam a lógica de negócio:

Características principais:
1. Decorador @Injectable()
   - Permite injeção de dependência
   - Registra a classe como um provider

2. Separação de Responsabilidades
   - Lógica de negócio isolada dos controladores
   - Facilita manutenção e testes

3. Injeção de Dependência
   - Serviços são injetados via construtor
   - Promove baixo acoplamento
   - Facilita substituição e mock de dependências

Boas Práticas:
- Mantenha serviços focados em uma responsabilidade
- Use para manipulação de dados
- Separe lógicas complexas em métodos distintos`
    },
    "nestjsinjecao": {
        "title": "Injeção de Dependências",
        "description": "Gerenciamento de dependências no NestJS",
        "code": `import { Injectable, Inject } from '@nestjs/common';

// Serviço de Usuários
@Injectable()
export class UsuariosService {
  constructor(
    @Inject('REPOSITORIO_USUARIOS') 
    private repositorio: RepositorioUsuarios
  ) {}

  listarTodos() {
    return this.repositorio.encontrarTodos();
  }
}

// Módulo de Usuários
@Module({
  providers: [
    UsuariosService,
    {
      provide: 'REPOSITORIO_USUARIOS',
      useClass: RepositorioPostgres
    },
    // Valor constante
    {
      provide: 'CONFIG_BD',
      useValue: {
        host: 'localhost',
        porta: 5432
      }
    },
    // Fábrica
    {
      provide: 'SERVICO_AUTENTICACAO',
      useFactory: (configService) => {
        return new ServicoAutenticacao(configService);
      },
      inject: [ConfigService]
    }
  ]
})
export class UsuariosModule {}`,
        explanation: `Injeção de Dependências no NestJS:

Tipos de Injeção:
1. Injeção por Construtor
   - Método padrão de injeção
   - Decorador @Injectable()
   - Resolve dependências automaticamente

2. Injeção Personalizada
   - @Inject() para tokens customizados
   - Permite injetar valores, classes ou fábricas

3. Formas de Registro de Providers:
   - useClass: Instancia uma classe
   - useValue: Injeta um valor constante
   - useFactory: Cria instâncias dinamicamente

Vantagens:
- Desacoplamento de componentes
- Facilidade de substituição de dependências
- Inversão de controle
- Simplificação de testes`
    },
"nestjsmiddlewares": {
        "title": "Middlewares no NestJS",
        "description": "Implementação de middlewares para processamento de requisições",
        "code": `import { 
  Injectable, 
  NestMiddleware 
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware Global
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Requisição recebida:', {
      metodo: req.method,
      url: req.originalUrl,
      timestamp: new Date()
    });
    next();
  }
}

// Configuração no Módulo
@Module({
  // ...
})
export class AppModule implements NestModuleMiddleware {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('usuarios') // Aplicar apenas em rotas específicas
      // Ou para todos os controladores
      // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}`,
        "explanation": `Middlewares no NestJS são funções que processam requisições antes dos controladores:

Características Principais:
1. Implementam a interface NestMiddleware
2. Podem modificar objetos de requisição e resposta
3. Podem interromper o ciclo de requisição
4. Executados em ordem de declaração

Tipos de Middlewares:
- Globais: Afetam todas as rotas
- Específicos: Aplicados em rotas ou controladores selecionados

Casos de Uso Comuns:
- Logging
- Autenticação
- Tratamento de CORS
- Validação de requisições`
    },
    "nestjspipes": {
        "title": "Pipes e Validação",
        "description": "Validação de dados e transformação com Pipes",
        "code": `import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { 
  IsString, 
  IsEmail, 
  MinLength, 
  MaxLength 
} from 'class-validator';

// DTO (Data Transfer Object) com validações
export class CriarUsuarioDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}

@Controller('usuarios')
export class UsuariosController {
  // Validação global
  @Post()
  @UsePipes(new ValidationPipe())
  criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return { 
      mensagem: 'Usuário criado', 
      dados: dadosUsuario 
    };
  }

  // Pipe de transformação
  @Get(':id')
  buscarUsuario(
    @Param('id', ParseIntPipe) id: number
  ) {
    return { id };
  }
}

// Pipe personalizado
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    return typeof value === 'string' 
      ? value.trim() 
      : value;
  }
}`,
        "explanation": `Pipes no NestJS têm duas funções principais:

Tipos de Pipes:
1. Validação
   - Verificam se os dados atendem a critérios específicos
   - Usam bibliotecas como class-validator
   - Podem rejeitar requisições inválidas

2. Transformação
   - Modificam dados de entrada
   - Convertem tipos
   - Executam pré-processamento

Características:
- Podem ser aplicados globalmente
- Específicos para rotas ou parâmetros
- Suportam validações declarativas
- Melhoram segurança e consistência dos dados

Bibliotecas Comuns:
- class-validator para validações
- class-transformer para transformações`
    },
    "nestjsguards": {
        "title": "Guards e Segurança",
        "description": "Implementação de proteção de rotas",
        "code": `import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  UnauthorizedException 
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Guard de Autenticação
@Injectable()
export class AutenticacaoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      // Lógica de validação de token
      const usuarioValido = this.validarToken(token);
      return usuarioValido;
    } catch (erro) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private validarToken(token: string): boolean {
    // Implementação de validação de token
    return token.startsWith('Bearer ');
  }
}

// Guard de Papel/Permissão
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'roles', 
      context.getHandler()
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    // Verifica se o usuário tem a role necessária
    return roles.some(role => usuario.roles.includes(role));
  }
}

// Uso nos controladores
@Controller('admin')
@UseGuards(AutenticacaoGuard, RolesGuard)
export class AdminController {
  @Post()
  @Roles('ADMIN')
  criarRecurso() {
    // Apenas administradores podem acessar
  }
}`,
        "explanation": `Guards no NestJS controlam o acesso a rotas e recursos:

Características Principais:
1. Implementam CanActivate
2. Executados antes de controladores/rotas
3. Podem bloquear ou permitir acesso

Tipos de Guards:
- Autenticação: Verificam identidade do usuário
- Autorização: Controlam permissões de acesso
- Baseados em papéis ou tokens

Funcionalidades:
- Interceptam requisições
- Validam credenciais
- Verificam permissões
- Lançam exceções de não autorizado

Boas Práticas:
- Separar lógica de autenticação
- Usar decorators para definir permissões
- Implementar validações robustas`
    },
    "nestjsinterceptors": {
        "title": "Interceptors no NestJS",
        "description": "Manipulação de requisições e respostas",
        "code": `import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// Interceptor de Logging
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    const now = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        console.log(Processamento levou S{Date.now() - now}ms);
      })
    );
  }
}

// Interceptor de Transformação de Resposta
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        sucesso: true,
        dados: data,
        timestamp: new Date()
      }))
    );
  }
}

// Uso no Controlador
@Controller('usuarios')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsuariosController {
  @Get()
  listarUsuarios() {
    return [
      { id: 1, nome: 'João' },
      { id: 2, nome: 'Maria' }
    ];
  }
}

// Interceptor Global
app.useGlobalInterceptors(new LoggingInterceptor());`,
        "explanation": `Interceptors no NestJS modificam o fluxo de requisições e respostas:

Características Principais:
1. Baseados em Observables (RxJS)
2. Executam antes e depois do tratamento de rotas
3. Podem modificar requisições e respostas

Casos de Uso Comuns:
- Logging de requisições
- Transformação de dados
- Tratamento de erros
- Medição de tempo de execução
- Caching

Tipos de Operações:
- Pré-processamento: Antes do controlador
- Pós-processamento: Após o controlador
- Manipulação de fluxo de dados

Benefícios:
- Separação de preocupações
- Código mais limpo e modular
- Flexibilidade na manipulação de requisições`
    }
};