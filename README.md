# n8n-random-node

Custom n8n Node: **Random** — True Random Number Generator via Random.org

## Pré-requisitos

- Node.js 22 (LTS)
- Docker + Docker Compose
- PostgreSQL (via docker-compose)
- n8n 1.85.4 (self-hosted)

## Estrutura do Repositório

- `docker-compose.yml`: sobe n8n + Postgres
- `n8n-nodes-random/`: código do conector custom (TypeScript)
- `random.svg`: ícone do Node
- `README.md`: instruções

## Instalação

### 1. Subir infraestrutura com Docker Compose

```bash
docker compose up -d
```

### 2. Configurar Node Custom

Dentro de `n8n-nodes-random/`:

```bash
npm install
npm install --save-dev @types/node
npm install --save-dev n8n-core n8n-workflow
npm run build
```

Copie o conteúdo de `n8n-nodes-random/dist` para dentro de:

```
./n8n_data/.n8n/custom/n8n-nodes-random/
```

Depois reinicie o container do n8n.

### 3. Acessar n8n

http://localhost:5678

Procure pelo Node **Random** e use a operação *True Random Number Generator*.

## Variáveis de ambiente

Arquivo `.env` (carregado pelo docker-compose):

```
POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8n
POSTGRES_DB=n8n
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
```

## Testes

Para rodar os testes (exemplo Jest):

```bash
npm run test
```

## Observações

- O Random.org possui limites de uso para chamadas anônimas. Para produção, configure uma API Key e credenciais.
- O conector foi escrito em TypeScript com tipagem estrita.
