# Migrations do CMS - Keys Café

Este diretório contém as migrations SQL para configurar o banco de dados do CMS no RaDB.

## 📋 Como Executar

### 1. Acesse o RaDB Dashboard

1. Acesse: https://cafe-da-hora.radb.rsolutionsbr.com/dashboard
2. Faça login com suas credenciais
3. Vá em **SQL Editor**

### 2. Execute as Migrations em Ordem

Execute os arquivos SQL na seguinte ordem:

1. **001_create_cms_tables.sql** - Cria todas as tabelas do CMS
2. **002_create_storage_bucket.sql** - Documentação do bucket (criar manualmente via Dashboard)

### 3. Verificar se Funcionou

Após executar a migration, verifique se as tabelas foram criadas:

```sql
-- Listar todas as tabelas CMS
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'cms_%';

-- Verificar estrutura da tabela cms_sections
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'cms_sections';

-- Verificar policies RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename LIKE 'cms_%';
```

## 📁 Estrutura das Tabelas

### cms_sections
Armazena o conteúdo das seções editáveis do site:
- `hero` - Seção principal
- `about` - Seção sobre
- `contact` - Seção de contato
- `header` - Cabeçalho
- `footer` - Rodapé

### cms_products
Produtos editáveis (cafés, bebidas, etc.)

### cms_testimonials
Depoimentos de clientes

## 🔒 Segurança (RLS)

Todas as tabelas têm Row Level Security (RLS) ativado:

- **Leitura**: Qualquer um pode ler (anon ou authenticated)
- **Escrita**: Apenas usuários autenticados podem criar/atualizar/deletar

## 🗄️ Storage

O bucket `cms-uploads` deve ser criado manualmente via Dashboard:

1. Vá em **Storage** no Dashboard
2. Clique em **Create Bucket**
3. Nome: `cms-uploads`
4. Marque como **Public**
5. Salve

## ⚠️ Importante

- Execute as migrations na ordem correta
- Não execute a mesma migration duas vezes (use `IF NOT EXISTS` para segurança)
- Faça backup antes de executar migrations em produção
- Verifique se as policies RLS estão funcionando corretamente

## 🐛 Troubleshooting

### Erro: "relation already exists"
- A tabela já existe. Isso é normal se você já executou a migration antes.
- As migrations usam `IF NOT EXISTS` para evitar erros.

### Erro: "permission denied"
- Verifique se você tem permissões de administrador no projeto RaDB
- Certifique-se de estar usando a `SERVICE_ROLE_KEY` se necessário

### Erro: "function does not exist"
- A função `auth_role()` e `auth_uid()` devem estar disponíveis no RaDB
- Se não estiverem, verifique a documentação do RaDB sobre funções de autenticação

---

**Última atualização:** 2024-11-28

