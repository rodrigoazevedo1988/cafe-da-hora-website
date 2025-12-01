# CMS - Sistema de Gerenciamento de Conteúdo

Este projeto inclui um CMS completo para gerenciar todo o conteúdo do site usando RaDB como backend.

## 🚀 Setup Inicial

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
VITE_RADB_URL=https://[subdomain].radb.io
VITE_RADB_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Frontend (público)
VITE_RADB_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Backend only (admin)
```

**⚠️ IMPORTANTE:**
- `VITE_RADB_ANON_KEY`: JWT público, pode ser usado no frontend
- `VITE_RADB_SERVICE_ROLE_KEY`: JWT admin que bypassa RLS, **NUNCA** expor no frontend
- As credenciais são geradas automaticamente ao criar um projeto no Dashboard

### 2. Criar Tabelas no RaDB

Execute o SQL do arquivo `database-schema.sql` no RaDB Dashboard SQL Editor:

1. Acesse https://radb.rsolutionsbr.com.br/dashboard
2. Vá em SQL Editor
3. Cole o conteúdo de `database-schema.sql`
4. Execute o script

### 3. Criar Bucket de Storage (Opcional)

Se você quiser fazer upload de imagens:

1. No RaDB Dashboard, vá em Storage
2. Crie um bucket chamado `cms-uploads`
3. Configure como público (public)

### 4. Popular Dados Iniciais (Seed)

Execute o script de seed para popular o banco com os dados iniciais:

```bash
# Instalar tsx se necessário
npm install -D tsx

# Executar seed
npx tsx scripts/seed-cms.ts
```

Ou use o admin para criar os dados manualmente.

## 📋 Estrutura do CMS

### Seções Editáveis

- **Hero**: Título, subtítulo, botões e imagem de fundo
- **About**: Título, descrição e estatísticas
- **Contact**: Informações de contato e formulário
- **Header**: Logo e menu de navegação
- **Footer**: Links, informações e redes sociais

### Conteúdo Dinâmico

- **Produtos**: Lista de produtos com nome, descrição, preço e imagem
- **Depoimentos**: Depoimentos de clientes com foto, nome, avaliação e texto

## 🔐 Acesso ao Admin

1. Acesse `/admin/login`
2. Crie uma conta ou faça login
3. Após login, você será redirecionado para `/admin`

## 📝 Como Usar

### Editar Seções

1. Acesse `/admin`
2. Clique na seção que deseja editar (Hero, About, Contact, etc.)
3. Modifique os campos
4. Clique em "Salvar Alterações"

### Gerenciar Produtos

1. Acesse `/admin/products`
2. Clique em "Novo Produto" para adicionar
3. Use os botões "Editar" e "Excluir" para gerenciar produtos existentes

### Gerenciar Depoimentos

1. Acesse `/admin/testimonials`
2. Clique em "Novo Depoimento" para adicionar
3. Use os botões "Editar" e "Excluir" para gerenciar depoimentos existentes

### Upload de Imagens

1. Ao editar qualquer seção ou conteúdo, você verá o componente de upload
2. Clique na área de upload
3. Selecione uma imagem (máximo 5MB)
4. A imagem será enviada para o RaDB Storage e a URL será salva automaticamente

## 🔒 Segurança

- Todas as tabelas têm RLS (Row Level Security) ativado
- Apenas usuários autenticados podem editar conteúdo
- Usuários não autenticados podem apenas ler (para exibir no site)
- O `SERVICE_ROLE_KEY` nunca é exposto no frontend

## 🐛 Troubleshooting

### Erro: "Unauthorized" ou "Invalid API Key"
- Verifique se as credenciais no `.env.local` estão corretas
- Confirme que está usando `VITE_RADB_ANON_KEY` no frontend
- Verifique se o projeto está com status `ready` no Dashboard

### Erro: "Row Level Security policy violation"
- Verifique se RLS está ativado na tabela
- Confirme que as policies permitem a operação
- Certifique-se de estar autenticado ao tentar editar

### Erro: "Table does not exist"
- Execute o SQL do `database-schema.sql` no Dashboard
- Verifique se está usando o schema correto

### Imagens não aparecem
- Verifique se o bucket `cms-uploads` foi criado
- Confirme que o bucket está configurado como público
- Verifique as URLs das imagens no banco de dados

## 📚 Recursos

- **Dashboard RaDB:** https://radb.rsolutionsbr.com.br/dashboard
- **Documentação:** Consulte o arquivo `Prompt Init Project RADB.md`

---

**Última atualização:** 2024-11-28

