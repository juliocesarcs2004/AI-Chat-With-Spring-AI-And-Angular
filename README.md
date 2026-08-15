# AI Chat Application - Spring AI & Angular

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-green)
![Spring AI](https://img.shields.io/badge/Spring%20AI-2.0.0-brightgreen)
![Java](https://img.shields.io/badge/Java-25-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 📋 Descrição do Projeto

Aplicação de chat inteligente que integra inteligência artificial com Spring AI e interface moderna desenvolvida em Angular. A aplicação permite que usuários interajam com um modelo de linguagem (LLM) através de uma interface web responsiva e intuitiva.

Este projeto demonstra a integração completa entre um backend robusto baseado em Spring Boot com capacidades de IA e um frontend moderno em Angular, utilizando Material Design para uma experiência de usuário profissional.

## ✨ Características Principais

- 🤖 **Integração com IA**: Utiliza Spring AI com OpenAI como provedor de modelo de linguagem
- 💬 **Chat em Tempo Real**: Interface de chat responsiva e intuitiva
- 🎨 **Design Moderno**: Desenvolvido com Angular Material para uma UX profissional
- 🔄 **Arquitetura Completa**: Full-stack com separação clara entre frontend e backend
- 📱 **Responsivo**: Interface otimizada para desktop e dispositivos móveis
- 🛡️ **Spring Boot**: Backend robusto e escalável

## 🏗️ Arquitetura do Sistema

```
Cliente Angular (localhost:4200)

    Simple Chat Component
    - Input de mensagens
    - Exibição de histórico de chat
    - Material Design Components

                    ↓ HTTP Request (POST)

                    /api/chat

                    ↓

Spring Boot API (localhost:8080)

    ChatController
    - Endpoint: POST /api/chat
    - Processa mensagens do usuário

                    ↓

    Spring AI - ChatClient
    - Comunicação com OpenAI API
    - Processamento de LLM

                    ↓

                 API Call
                    ↓

OpenAI API

    - Processamento de linguagem natural
    - Geração de respostas inteligentes
```

## 🛠️ Tecnologias Utilizadas

### Backend

- **Java 25**: Linguagem de programação principal
- **Spring Boot 4.1.0**: Framework web
- **Spring AI 2.0.0**: Integração com modelos de linguagem
- **Spring AI OpenAI**: Provider de IA
- **Maven**: Gerenciador de dependências e build

### Frontend

- **Angular 20.3.0**: Framework web moderno
- **Angular Material 20.2.14**: Componentes de UI
- **TypeScript 5.x**: Linguagem de programação tipada
- **RxJS 7.8.0**: Programação reativa
- **SCSS**: Pré-processador CSS

### Infraestrutura

- **Node.js**: Runtime para Angular
- **npm**: Gerenciador de pacotes JavaScript

## 📋 Requisitos do Sistema

### Pré-requisitos

- **Java 25** ou superior
- **Node.js 18.x** ou superior
- **npm 9.x** ou superior
- **Maven 3.8+**
- **Chave de API do OpenAI** (para usar Spring AI)

### Verificar Versões Instaladas

```bash
# Verificar Java
java -version

# Verificar Node.js e npm
node --version
npm --version

# Verificar Maven
mvn --version
```

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd AI-Chat-With-Spring-AI-And-Angular
```

### 2. Configuração do Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd api-ai

# Instalação de dependências (automática com Maven)
# Nenhuma configuração adicional necessária se apenas usar Maven

# Para Windows
mvnw clean install

# Para macOS/Linux
./mvnw clean install
```

### 3. Configuração do Frontend (Angular)

```bash
# Navegar para o diretório do frontend (em outro terminal)
cd angular-ai

# Instalação de dependências
npm install
```

### 4. Configurar Variáveis de Ambiente

#### Backend - api-ai/src/main/resources/application.properties

```properties
# OpenAI Configuration
spring.ai.openai.api-key=<sua-chave-api-openai>
spring.ai.openai.chat.options.model=gpt-4
spring.ai.openai.chat.options.temperature=0.7

# Server Configuration
server.port=8080
server.servlet.context-path=/api
```

#### Frontend - angular-ai/proxy.conf.js

```javascript
// Proxy para redirecionar chamadas da API
module.exports = {
  "/api": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
  },
};
```

## 📂 Estrutura do Projeto

```
AI-Chat-With-Spring-AI-And-Angular/
│
├── angular-ai/                         # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts                  # Root component
│   │   │   ├── app.routes.ts           # Rotas da aplicação
│   │   │   ├── chat/
│   │   │   │   ├── chat-service.ts     # Serviço de comunicação com API
│   │   │   │   ├── chat-response.ts    # Modelo de resposta
│   │   │   │   └── simple-chat/        # Componente de chat
│   │   │   │       ├── simple-chat.ts
│   │   │   │       ├── simple-chat.html
│   │   │   │       └── simple-chat.scss
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── proxy.conf.js                   # Configuração de proxy
│
├── api-ai/                             # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/juliocesarcs2004/api_ai/
│   │   │   │       ├── ApiAiApplication.java      # Classe principal
│   │   │   │       └── chat/
│   │   │   │           ├── ChatController.java    # REST Controller
│   │   │   │           └── ChatMessage.java       # Modelo de dados
│   │   │   └── resources/
│   │   │       └── application.properties         # Configurações
│   │   └── test/
│   │       └── java/.../ApiAiApplicationTests.java
│   ├── pom.xml                         # Configuração Maven
│   ├── mvnw / mvnw.cmd                 # Maven Wrapper
│   └── target/                         # Arquivos compilados
│
└── README.md                           # Este arquivo
```

## ▶️ Como Executar

### Executar Backend (Spring Boot)

#### Terminal 1 - Backend

```bash
cd api-ai

# Windows
mvnw spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

### Executar Frontend (Angular)

#### Terminal 2 - Frontend

```bash
cd angular-ai

# Desenvolvimento
npm start

# Ou usando Angular CLI diretamente
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

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
