# Vitrine de Sêmen - Aplicação Next.js

Aplicação Next.js para vitrine de sêmen com deploy automático no Azure.

## Workflow Automático

Este repositório está configurado com GitHub Actions para automatizar o processo de desenvolvimento:

### 1. Auto-criação de Pull Requests

Quando você faz push para qualquer branch (exceto `master`), um Pull Request é automaticamente criado para a branch `master`.

**Workflow:** `.github/workflows/auto-pr-on-push.yml`

### 2. Validação, Deploy e Merge Automático

Quando um Pull Request é criado ou atualizado, o seguinte processo é executado:

1. **Build**: Compila a aplicação Next.js
   - Instala dependências
   - Executa lint (se disponível)
   - Executa testes (se disponível)
   - Faz build da aplicação

2. **Deploy**: Deploy no Azure Static Web Apps
   - Requer aprovação manual (configurado no ambiente "production")
   - Deploy automático após aprovação
   - URL de preview disponível

3. **Auto-Merge**: Merge automático após deploy bem-sucedido
   - Usa método "merge commit"
   - Merge automático para a branch `master`

**Workflow:** `.github/workflows/pr-validate-deploy-merge.yml`

## Configuração Necessária

### Secrets do GitHub

Para que o deploy funcione, você precisa configurar o seguinte secret no repositório:

- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Token de API do Azure Static Web Apps

### Ambiente de Produção

O workflow usa um ambiente chamado "production" que requer aprovação manual antes do deploy. Para configurar:

1. Vá em Settings → Environments → New environment
2. Crie um ambiente chamado "production"
3. Configure "Required reviewers" para adicionar aprovadores

## Desenvolvimento Local

### Usando Node.js diretamente

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Executar lint
npm run lint
```

### Usando Docker

#### Desenvolvimento com Docker

```bash
# Executar em modo de desenvolvimento com hot-reload
docker-compose --profile dev up

# Ou usando docker-compose run
docker-compose run --rm --service-ports dev
```

A aplicação estará disponível em `http://localhost:3000` com hot-reload ativado.

#### Produção com Docker

```bash
# Build da imagem
docker-compose build

# Executar em modo de produção
docker-compose up

# Ou executar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar os containers
docker-compose down
```

#### Comandos Docker úteis

```bash
# Build manual da imagem
docker build -t chreproducao-vitrine-semen .

# Executar container manualmente
docker run -p 3000:3000 chreproducao-vitrine-semen

# Executar em modo desenvolvimento
docker build -f Dockerfile.dev -t chreproducao-vitrine-semen-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules chreproducao-vitrine-semen-dev
```

## Estrutura do Projeto

```
.
├── app/                    # Diretório da aplicação Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── .github/
│   └── workflows/         # GitHub Actions workflows
│       ├── auto-pr-on-push.yml              # Auto-criação de PRs
│       └── pr-validate-deploy-merge.yml     # Build, Deploy e Merge
├── Dockerfile             # Dockerfile para produção (multi-stage)
├── Dockerfile.dev         # Dockerfile para desenvolvimento
├── docker-compose.yml     # Configuração Docker Compose
├── .dockerignore          # Arquivos ignorados pelo Docker
├── next.config.js         # Configuração do Next.js
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configuração do TypeScript
```

## Fluxo de Trabalho Recomendado

1. Crie uma nova branch para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "Adiciona minha feature"
   ```

3. Faça push da branch:
   ```bash
   git push origin feature/minha-feature
   ```

4. Um PR será automaticamente criado

5. O workflow executará build e testes automaticamente

6. Após aprovação manual, o deploy será feito no Azure

7. Se o deploy for bem-sucedido, o PR será automaticamente merged na master

## Tecnologias

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Docker**: Containerização da aplicação
- **Azure Static Web Apps**: Hospedagem e deploy
- **GitHub Actions**: CI/CD automático

## Docker

### Arquivos Docker

- **Dockerfile**: Multi-stage build otimizado para produção
  - Stage 1 (deps): Instala dependências
  - Stage 2 (builder): Compila a aplicação
  - Stage 3 (runner): Imagem final mínima com apenas o necessário
  
- **Dockerfile.dev**: Dockerfile para desenvolvimento com hot-reload

- **docker-compose.yml**: Orquestração de containers
  - Serviço `app`: Produção
  - Serviço `dev`: Desenvolvimento (profile: dev)

### Características do Docker Setup

- ✅ Multi-stage build para imagens otimizadas
- ✅ Non-root user para segurança
- ✅ Hot-reload em modo desenvolvimento
- ✅ Health checks configurados
- ✅ Volumes para desenvolvimento
- ✅ .dockerignore para builds eficientes
