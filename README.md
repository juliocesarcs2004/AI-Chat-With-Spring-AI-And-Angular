# AI Chat with Spring AI and Angular

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-green)
![Spring AI](https://img.shields.io/badge/Spring%20AI-2.0.0-brightgreen)
![Java](https://img.shields.io/badge/Java-25-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Visão Geral

Este projeto é uma aplicação full-stack de chat com inteligência artificial, desenvolvida com Angular no frontend e Spring Boot + Spring AI no backend. A solução usa um modelo de linguagem da OpenAI para responder mensagens do usuário e inclui uma funcionalidade de chat com memória por conversa.

A estrutura foi pensada para demonstrar uma integração real entre:

- frontend moderno em Angular + Angular Material;
- backend REST em Java com Spring Boot;
- acesso a IA via Spring AI;
- persistência de conversas em banco PostgreSQL;
- suporte a containerização com Docker Compose para o banco de dados.

## Objetivo do Projeto

O objetivo principal é permitir que o usuário converse com um assistente virtual em uma interface simples e responsiva, com possibilidade de:

- enviar mensagens em um chat intuitivo;
- receber respostas geradas por um modelo de IA;
- manter histórico de conversas por chat;
- criar descrições automáticas para cada conversa;
- aproveitar memória de contexto entre mensagens da mesma sessão.

## Stack Tecnológica

### Backend

- Java 25
- Spring Boot 4.1.0
- Spring AI 2.0.0
- Spring AI OpenAI Starter
- Spring JDBC Chat Memory Repository
- PostgreSQL
- Maven

### Frontend

- Angular 20.3
- Angular Material
- TypeScript 5.x
- RxJS
- SCSS

### Infraestrutura e DevOps

- Docker Compose
- Maven Wrapper
- npm
- Node.js

## Arquitetura do Sistema

O sistema está dividido em duas partes principais:

1. Frontend Angular: interface web para conversa com o assistente.
2. Backend Spring Boot: expõe endpoints REST para comunicação com o modelo de IA e armazenamento de memória.

Fluxo principal:

```text
Usuário (Angular UI)
        |
        v
POST /api/chat-memory/start ou /api/chat-memory/{chatId}
        |
        v
Spring Boot API
        |
        +--> ChatClient do Spring AI
        |
        +--> MessageWindowChatMemory
        |
        +--> PostgreSQL (histórico de conversas)
        |
        v
Resposta do modelo OpenAI
```

## Funcionalidades

### 1. Chat simples

A API básica de chat recebe uma mensagem e devolve a resposta do modelo sem armazenar contexto em memória.

Endpoint:

- POST /api/chat

Implementação principal:

- `api-ai/src/main/java/com/juliocesarcs2004/api_ai/chat/ChatController.java`

### 2. Chat com memória de conversa

Esse fluxo é o mais completo do projeto. Ele usa `MessageWindowChatMemory` e `JdbcChatMemoryRepository` para manter contexto de uma conversa e controlar vários chats por usuário.

Endpoints:

- POST /api/chat-memory/start
- POST /api/chat-memory/{chatId}
- GET /api/chat-memory
- GET /api/chat-memory/{chatId}

Implementações principais:

- `api-ai/src/main/java/com/juliocesarcs2004/api_ai/memory/MemoryChatController.java`
- `api-ai/src/main/java/com/juliocesarcs2004/api_ai/memory/MemoryChatService.java`
- `api-ai/src/main/java/com/juliocesarcs2004/api_ai/memory/MemoryChatRepository.java`

### 3. Geração automática de descrição da conversa

Quando um novo chat é criado, a aplicação envia a primeira mensagem para um cliente de IA e gera um resumo curto (até 30 caracteres) para representar a conversa.

Essa lógica está em:

- `MemoryChatService.generateDescription()`

### 4. Banco de memória de conversas

As tabelas de suporte para a memória do Spring AI são definidas em:

- `api-ai/src/main/resources/schema-postgresql.sql`

Estrutura principal:

- `SPRING_AI_CHAT_MEMORY`: armazena as mensagens da conversa com `conversation_id`, `content`, `type` e `timestamp`.
- `CHAT_MEMORY`: armazena metadados do chat, como `conversation_id`, `user_id` e `description`.

## Estrutura do Projeto

```text
AI-Chat-With-Spring-AI-And-Angular/
├── README.md
├── angular-ai/
│   ├── angular.json
│   ├── package.json
│   ├── proxy.conf.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── app.config.ts
│       │   ├── app.html
│       │   ├── app.routes.ts
│       │   ├── app.scss
│       │   ├── app.spec.ts
│       │   ├── app.ts
│       │   └── chat/
│       │       ├── chat-response.ts
│       │       ├── chat-service.ts
│       │       └── simple-chat/
│       │           ├── simple-chat.html
│       │           ├── simple-chat.scss
│       │           └── simple-chat.ts
│       ├── index.html
│       ├── main.ts
│       └── styles.scss
├── api-ai/
│   ├── compose.yaml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/juliocesarcs2004/api_ai/
│   │   │   │       ├── ApiAiApplication.java
│   │   │   │       ├── chat/
│   │   │   │       │   ├── ChatController.java
│   │   │   │       │   └── ChatMessage.java
│   │   │   │       └── memory/
│   │   │   │           ├── Chat.java
│   │   │   │           ├── ChatMessage.java
│   │   │   │           ├── MemoryChatController.java
│   │   │   │           ├── MemoryChatRepository.java
│   │   │   │           ├── MemoryChatService.java
│   │   │   │           └── NewChatResponse.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── schema-mysql.sql
│   │   │       └── schema-postgresql.sql
│   │   └── test/
│   │       └── java/com/juliocesarcs2004/api_ai/ApiAiApplicationTests.java
│   └── target/
└── .gitignore
```

## Configuração do Backend

### Pré-requisitos

- Java 25
- Maven 3.8+
- PostgreSQL em execução local ou via Docker
- Chave da OpenAI em variável de ambiente

### Variáveis de ambiente

No arquivo `api-ai/src/main/resources/application.properties`, a chave da API da OpenAI está configurada assim:

```properties
spring.application.name=api-ai
spring.ai.openai.api-key=${OPENAI_API_KEY}
```

É necessário exportar a variável antes de rodar a aplicação:

```bash
export OPENAI_API_KEY=sua_chave_da_openai
```

No macOS/Linux, também pode ser usado:

```bash
echo "export OPENAI_API_KEY=sua_chave_da_openai" >> ~/.zshrc
source ~/.zshrc
```

### Banco de dados

O projeto já está configurado para usar PostgreSQL. O arquivo `compose.yaml` cria um container com PostgreSQL:

```yaml
services:
  postgres:
    image: "postgres:latest"
    environment:
      - "POSTGRES_DB=mydatabase"
      - "POSTGRES_PASSWORD=secret"
      - "POSTGRES_USER=myuser"
    ports:
      - "5432"
```

Configuração de conexão no `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydatabase
spring.datasource.username=myuser
spring.datasource.password=secret
spring.datasource.driver-class-name=org.postgresql.Driver
```

### Banco da memória de chat

A aplicação usa o Spring AI JDBC chat memory repository. A criação das tabelas pode ser feita manualmente ou por script SQL, conforme o arquivo:

- `api-ai/src/main/resources/schema-postgresql.sql`

## Configuração do Frontend

A aplicação Angular usa proxy para encaminhar as chamadas para o backend local.

Arquivo:

- `angular-ai/proxy.conf.js`

Exemplo:

```javascript
module.exports = {
  "/api": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
  },
};
```

Isso permite que o frontend chame URLs como `/api/chat-memory` sem precisar configurar CORS manualmente no Angular.

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd AI-Chat-With-Spring-AI-And-Angular
```

### 2. Subir o banco PostgreSQL

A forma mais simples é usar o Docker Compose dentro do diretório do backend:

```bash
cd api-ai
docker compose up -d
```

Isso inicia o container do PostgreSQL na porta `5432`.

### 3. Executar o backend

```bash
cd api-ai
export OPENAI_API_KEY=sua_chave_da_openai
./mvnw spring-boot:run
```

O backend fica disponível em:

- http://localhost:8080

### 4. Executar o frontend

Em outro terminal:

```bash
cd angular-ai
npm install
npm start
```

O frontend fica disponível em:

- http://localhost:4200

## Endpoints da API

### Chat simples

#### POST /api/chat

Request body:

```json
{
  "message": "Explique o que é inteligência artificial"
}
```

Resposta:

```json
{
  "message": "A inteligência artificial..."
}
```

### Chat com memória

#### POST /api/chat-memory/start

Cria um novo chat para o usuário padrão `julio` e retorna o identificador, a descrição e a primeira resposta.

Request body:

```json
{
  "content": "Quero saber como funciona o Java"
}
```

Resposta esperada:

```json
{
  "chatId": "...",
  "description": "Como funciona o Java",
  "response": "..."
}
```

#### POST /api/chat-memory/{chatId}

Envia outra mensagem para um chat já existente.

Request body:

```json
{
  "content": "Me explique sobre collections em Java"
}
```

#### GET /api/chat-memory

Retorna todos os chats do usuário atual.

#### GET /api/chat-memory/{chatId}

Retorna as mensagens de um chat específico.

## Fluxo de Uso no Frontend

O Angular usa o serviço `ChatService` para conversar com a API:

- `angular-ai/src/app/chat/chat-service.ts`

A UI principal está em:

- `angular-ai/src/app/chat/simple-chat/simple-chat.ts`
- `angular-ai/src/app/chat/simple-chat/simple-chat.html`

O componente permite:

- digitar uma mensagem;
- exibir o histórico em formato de conversa;
- trocar entre resposta simulada e resposta real;
- rolar automaticamente para a última mensagem.

O projeto também possui um flag `local` para acionar uma resposta simulada em vez de chamar a API real.

## Observações Importantes

### Usuário fixo da memória

A aplicação usa um usuário fixo:

```java
private static final String USER_ID = "julio";
```

Isso significa que, no estado atual, todos os chats são associados a esse mesmo usuário. Se quiser criar um sistema multiusuário, esse ponto deve ser evoluído para receber o identificador do usuário por login ou token.

### Modelo da OpenAI

A aplicação usa o cliente OpenAI do Spring AI e a configuração do modelo pode ser ajustada conforme a sua conta e os custos desejados. O projeto usa somente a configuração do `api-key` e não fixa um modelo específico no código, deixando isso em aberto para a configuração do ambiente e da própria biblioteca.

### Uso do PostgreSQL

O projeto foi configurado para PostgreSQL, mas o arquivo `schema-mysql.sql` também existe no repositório, indicando que a aplicação pode ser adaptada para MySQL em outra configuração.

## Possíveis Melhorias

Algumas melhorias que podem ser aplicadas futuramente:

- autenticação e autorização;
- chat por usuário real em vez de usuário fixo;
- paginação de histórico de chats;
- exportação de conversas;
- suporte a múltiplos provedores de IA;
- carregamento de histórico no frontend por chat selecionado;
- interface com sidebar para listar conversas anteriores;
- testes automatizados de backend e frontend;
- configuração de ambiente por `.env`.

## Troubleshooting

### Erro de API key

Se a aplicação falhar ao iniciar ou ao realizar a chamada para a IA, verifique se `OPENAI_API_KEY` foi configurada corretamente.

```bash
echo $OPENAI_API_KEY
```

### Erro de conexão com PostgreSQL

Verifique se o container do banco está ativo:

```bash
docker compose ps
```

Se necessário:

```bash
docker compose down
docker compose up -d
```

### Erro ao rodar o frontend

Verifique se o Node.js e os pacotes foram instalados corretamente:

```bash
node --version
npm install
```

### Erro ao rodar o backend

Para verificar o build do Spring Boot:

```bash
cd api-ai
./mvnw clean install
```

## Conclusão

Este projeto funciona como exemplo prático de integração entre Angular e Spring AI, com foco em chat inteligente, memória de conversa e estrutura full-stack moderna. Ele é útil tanto para aprendizado quanto como base para aplicações mais robustas de chatbot e assistente inteligente.

Se você deseja evoluir a solução, os pontos mais promissores são:

- autenticação;
- gestão de usuários;
- persistência mais rica de contexto;
- UI para histórico de chats;
- testabilidade e monitoramento.

---

Desenvolvido como exemplo de integração entre Spring AI, Spring Boot e Angular.

### Verificar Status

```bash
# Verificar se o backend está respondendo
curl http://localhost:8080/api/chat

# Verificar se o frontend está acessível
curl http://localhost:4200
```

## 📡 Endpoints da API

### Chat

- **URL**: `POST /api/chat`
- **Descrição**: Envia uma mensagem para processamento de IA
- **Request Body**:
  ```json
  {
    "message": "Sua pergunta aqui"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Resposta da IA"
  }
  ```

**Exemplo com cURL**:

```bash
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá, como você está?"}'
```

## 🔧 Build para Produção

### Build do Backend

```bash
cd api-ai

# Windows
mvnw clean package

# macOS/Linux
./mvnw clean package

# JAR gerado em: target/api-ai-0.0.1-SNAPSHOT.jar
```

### Build do Frontend

```bash
cd angular-ai

# Build otimizado para produção
ng build --configuration production

# Arquivos gerados em: dist/angular-ai/
```

## 🧪 Testes

### Backend

```bash
cd api-ai

# Windows
mvnw test

# macOS/Linux
./mvnw test
```

### Frontend

```bash
cd angular-ai

# Executar testes Jasmine
npm test

# Ou usando Angular CLI
ng test
```

## ⚙️ Configuração Avançada

### Spring AI Configuration

O Spring AI foi configurado com os seguintes modelos disponíveis:

- **OpenAI GPT-4**: Padrão recomendado para melhor qualidade
- **OpenAI GPT-3.5 Turbo**: Alternativa mais rápida e econômica

Modificar em `api-ai/src/main/resources/application.properties`:

```properties
spring.ai.openai.chat.options.model=gpt-4
spring.ai.openai.chat.options.temperature=0.7  # 0.0 a 1.0 (criatividade)
spring.ai.openai.chat.options.max-tokens=2000
```

### CORS no Backend

Se necessário configurar CORS, adicione ao `ApiAiApplication.java`:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
        }
    };
}
```

## 📚 Recursos Adicionais

- [Documentação Spring Boot](https://spring.io/projects/spring-boot)
- [Documentação Spring AI](https://spring.io/projects/spring-ai)
- [Documentação Angular](https://angular.io/docs)
- [Documentação Material Design](https://material.angular.io)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👤 Autor

**Julho César**

- GitHub: [@juliocesarcs2004](https://github.com/juliocesarcs2004)

## 📞 Suporte

Para reportar bugs ou solicitar features, abra uma issue no repositório.

## 🙏 Agradecimentos

- Spring Framework team
- Angular team
- OpenAI pela excelente API
- Community do open source

---

**Última atualização**: Agosto de 2026
