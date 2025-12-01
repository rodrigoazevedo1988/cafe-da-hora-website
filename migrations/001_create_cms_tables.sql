-- ============================================
-- Migration: CMS Tables for Keys Café
-- Data: 2024-11-28
-- Descrição: Cria todas as tabelas necessárias para o CMS
-- ============================================

-- ============================================
-- 1. Tabela cms_sections - Conteúdo das seções
-- ============================================
CREATE TABLE IF NOT EXISTS cms_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para busca rápida por section_key
CREATE INDEX IF NOT EXISTS idx_cms_sections_key ON cms_sections(section_key);

-- Comentários
COMMENT ON TABLE cms_sections IS 'Armazena o conteúdo editável das seções do site (Hero, About, Contact, Header, Footer)';
COMMENT ON COLUMN cms_sections.section_key IS 'Chave única da seção: hero, about, contact, header, footer';
COMMENT ON COLUMN cms_sections.content IS 'Conteúdo da seção em formato JSONB';

-- ============================================
-- 2. Tabela cms_products - Produtos
-- ============================================
CREATE TABLE IF NOT EXISTS cms_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cms_products_active ON cms_products(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_products_order ON cms_products("order");
CREATE INDEX IF NOT EXISTS idx_cms_products_name ON cms_products(name);

-- Comentários
COMMENT ON TABLE cms_products IS 'Produtos editáveis do site (cafés, bebidas, etc.)';
COMMENT ON COLUMN cms_products."order" IS 'Ordem de exibição dos produtos';
COMMENT ON COLUMN cms_products.is_active IS 'Se false, produto não aparece no site';

-- ============================================
-- 3. Tabela cms_testimonials - Depoimentos
-- ============================================
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cms_testimonials_active ON cms_testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_testimonials_order ON cms_testimonials("order");
CREATE INDEX IF NOT EXISTS idx_cms_testimonials_rating ON cms_testimonials(rating);

-- Comentários
COMMENT ON TABLE cms_testimonials IS 'Depoimentos de clientes';
COMMENT ON COLUMN cms_testimonials.rating IS 'Avaliação de 1 a 5 estrelas';
COMMENT ON COLUMN cms_testimonials."order" IS 'Ordem de exibição dos depoimentos';

-- ============================================
-- 4. Ativar Row Level Security (RLS)
-- ============================================
ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. Policies para cms_sections
-- ============================================

-- Qualquer um pode ler (anon ou authenticated)
CREATE POLICY "Anyone can read sections" ON cms_sections 
  FOR SELECT USING (true);

-- Apenas authenticated podem criar/atualizar/deletar
CREATE POLICY "Authenticated can manage sections" ON cms_sections 
  FOR ALL USING (auth_role() = 'authenticated');

-- ============================================
-- 6. Policies para cms_products
-- ============================================

-- Qualquer um pode ler produtos ativos
CREATE POLICY "Anyone can read active products" ON cms_products 
  FOR SELECT USING (is_active = true OR auth_role() = 'authenticated');

-- Apenas authenticated podem inserir
CREATE POLICY "Authenticated can insert products" ON cms_products 
  FOR INSERT WITH CHECK (auth_role() = 'authenticated');

-- Apenas authenticated podem atualizar
CREATE POLICY "Authenticated can update products" ON cms_products 
  FOR UPDATE USING (auth_role() = 'authenticated');

-- Apenas authenticated podem deletar
CREATE POLICY "Authenticated can delete products" ON cms_products 
  FOR DELETE USING (auth_role() = 'authenticated');

-- ============================================
-- 7. Policies para cms_testimonials
-- ============================================

-- Qualquer um pode ler depoimentos ativos
CREATE POLICY "Anyone can read active testimonials" ON cms_testimonials 
  FOR SELECT USING (is_active = true OR auth_role() = 'authenticated');

-- Apenas authenticated podem inserir
CREATE POLICY "Authenticated can insert testimonials" ON cms_testimonials 
  FOR INSERT WITH CHECK (auth_role() = 'authenticated');

-- Apenas authenticated podem atualizar
CREATE POLICY "Authenticated can update testimonials" ON cms_testimonials 
  FOR UPDATE USING (auth_role() = 'authenticated');

-- Apenas authenticated podem deletar
CREATE POLICY "Authenticated can delete testimonials" ON cms_testimonials 
  FOR DELETE USING (auth_role() = 'authenticated');

-- ============================================
-- 8. Função para atualizar updated_at automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
DROP TRIGGER IF EXISTS update_cms_sections_updated_at ON cms_sections;
CREATE TRIGGER update_cms_sections_updated_at 
  BEFORE UPDATE ON cms_sections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cms_products_updated_at ON cms_products;
CREATE TRIGGER update_cms_products_updated_at 
  BEFORE UPDATE ON cms_products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cms_testimonials_updated_at ON cms_testimonials;
CREATE TRIGGER update_cms_testimonials_updated_at 
  BEFORE UPDATE ON cms_testimonials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 9. Validações e Constraints Adicionais
-- ============================================

-- Garantir que section_key seja válido
ALTER TABLE cms_sections 
  ADD CONSTRAINT check_section_key 
  CHECK (section_key IN ('hero', 'about', 'contact', 'header', 'footer'));

-- Garantir que price seja positivo
ALTER TABLE cms_products 
  ADD CONSTRAINT check_price_positive 
  CHECK (price >= 0);

-- Garantir que rating esteja no range válido
ALTER TABLE cms_testimonials 
  ADD CONSTRAINT check_rating_range 
  CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

-- ============================================
-- 10. Comentários Finais
-- ============================================

COMMENT ON FUNCTION update_updated_at_column() IS 'Função auxiliar para atualizar automaticamente o campo updated_at';

-- ============================================
-- FIM DA MIGRATION
-- ============================================

-- Para verificar se tudo foi criado corretamente, execute:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'cms_%';
-- SELECT * FROM cms_sections;
-- SELECT * FROM cms_products;
-- SELECT * FROM cms_testimonials;

