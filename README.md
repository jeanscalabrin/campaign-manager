Campaign Manager

Sistema administrativo para gerenciamento de campanhas promocionais

Tecnologias utilizadas
Backend
Node.js
Express
Typescript
Prisma ORM
PostgresSQL

Funcionalidades
Buscar campanha
Atualizar campanha
Upload de PDF regulatório e instrucional
Validação de arquivos
Retorno visual de loading e erro

Como executar o projeto
cd backend
npm install

Configurar variáveis de ambiente
Copie o arquivo .env.example para .env

Subir banco de dados
docker comppose up -d

Rodar migrations
npx prisma migrate dev

Rodar seed
npx prisma db seed

Iniciar backend
npm run dev

Servidor: http://localhost:3000

Limpar o banco e rodar migrations
npx prisma migrate reset
