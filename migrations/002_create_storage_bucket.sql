-- ============================================
-- Migration: Storage Bucket for CMS Images
-- Data: 2024-11-28
-- Descrição: Cria o bucket de storage para upload de imagens
-- ============================================

-- NOTA: Buckets são criados via Dashboard ou API do RaDB
-- Este arquivo serve como documentação do bucket necessário

-- ============================================
-- Bucket: cms-uploads
-- ============================================
-- Nome: cms-uploads
-- Tipo: Public (para URLs públicas)
-- Descrição: Armazena imagens do CMS (produtos, depoimentos, seções)

-- Para criar o bucket via Dashboard:
-- 1. Acesse o RaDB Dashboard
-- 2. Vá em Storage
-- 3. Clique em "Create Bucket"
-- 4. Nome: cms-uploads
-- 5. Marque como "Public"
-- 6. Salve

-- Para criar via API (se disponível):
-- POST /storage/v1/bucket
-- {
--   "name": "cms-uploads",
--   "public": true
-- }

-- ============================================
-- Políticas de Acesso (se necessário)
-- ============================================

-- Upload: Apenas usuários autenticados
-- Download: Público (para URLs públicas)
-- Delete: Apenas usuários autenticados

-- ============================================
-- Estrutura de Pastas Sugerida
-- ============================================
-- cms-uploads/
--   ├── products/          # Imagens de produtos
--   ├── testimonials/      # Fotos de depoimentos
--   ├── sections/          # Imagens das seções (hero, etc)
--   └── general/           # Outras imagens

-- ============================================
-- FIM DA MIGRATION
-- ============================================

