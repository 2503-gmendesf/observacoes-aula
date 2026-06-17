# Sistema de Observação de Aula — Colégio Santa Maria Minas

## Deploy no Vercel (produção)

### 1. Suba o código para o GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/SEU_USUARIO/observacoes-aula.git
git push -u origin main
```

### 2. Crie o projeto no Vercel
1. Acesse vercel.com → **Add New Project**
2. Importe o repositório do GitHub
3. Clique em **Deploy** (sem configurar mais nada)

### 3. Adicione o banco de dados Neon Postgres
1. Painel do projeto no Vercel → aba **Storage**
2. **Create Database** → **Neon** → dê um nome → **Create**
3. O Vercel configura `POSTGRES_URL` automaticamente

### 4. Inicialize a tabela e dados de exemplo
```bash
npm install -g vercel
vercel link
vercel env pull .env.local
node setup-db.js
```

---

## Desenvolvimento local
```bash
npm install
vercel dev   # http://localhost:3000
```

## Usuários de demonstração (senha: demo123)
- marcos@santamariaminas.edu.br — Coordenador Pedagógico
- fernanda@santamariaminas.edu.br — Diretora de Unidade
- roberto@santamariaminas.edu.br — Diretor Geral da Rede
