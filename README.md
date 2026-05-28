# Campaign Manager

Sistema administrativo para gerenciamento de campanhas promocionais.

## Tecnologias

**Backend**
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Multer (upload de arquivos)
- Zod (validação de parâmetros)

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Como executar

### Backend

```bash
cd backend
npm install
```

Copie o `.env.example` para `.env` e preencha as variáveis.

```bash
# Subir banco de dados
docker compose up -d

# Rodar migrations
npx prisma migrate dev

#Rodar os generates
npx prisma generate

# Rodar seed
npx prisma db seed

# Iniciar servidor
npm run dev
```

Servidor disponível em `http://localhost:21167`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Copie o `.env.example` para `.env.local` e preencha:
NEXT_PUBLIC_API_URL=http://localhost:21167

Aplicação disponível em `http://localhost:3000`

## Decisões técnicas

- **Multer com storage local**: escolhido pela simplicidade e por não exigir dependências externas. Em produção, substituiria por S3 ou storage equivalente.
- **Atualização parcial (PATCH)**: todos os campos são opcionais no update, permitindo atualizar só o que mudou.
- **Validação no backend com Zod**: garante contratos claros entre frontend e API.
- **Separação de endpoints de upload**: cada PDF tem seu próprio endpoint para facilitar reenvio individual sem afetar os demais campos.

## Premissas adotadas

- Apenas arquivos PDF são aceitos nos uploads
- A descrição do regulamento é obrigatória e limitada a 3000 caracteres
- Ao enviar um novo PDF para o mesmo campo, o vínculo anterior é substituído
- Unificar o formulário de criação e edição em um único componente reutilizável

## Limitações

- Os arquivos PDF são armazenados localmente em `backend/uploads` — não adequado para produção
- Não há autenticação implementada (JWT seria o próximo passo)
- Não há testes automatizados

## O que faria com mais tempo

- Autenticação JWT nos endpoints administrativos
- Testes unitários e de integração no backend
- Upload de arquivos para S3
- Paginação na listagem de campanhas
- Estratégia de observabilidade com logs estruturados
