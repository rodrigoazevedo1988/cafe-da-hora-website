/**
 * Script de seed para popular o CMS com dados iniciais
 * 
 * Execute este script após criar as tabelas no RaDB Dashboard
 * 
 * Uso:
 * 1. Configure as variáveis de ambiente no .env.local
 * 2. Execute: npx tsx scripts/seed-cms.ts
 */

import { radb } from '../src/lib/radb';

const seedData = async () => {
  console.log('🌱 Iniciando seed do CMS...');

  try {
    // 1. Hero Section
    console.log('📝 Criando seção Hero...');
    await radb.from('cms_sections').insert({
      section_key: 'hero',
      content: {
        title: 'O melhor café que você poderia tomar',
        subtitle: 'Descubra o sabor único do nosso café artesanal, preparado com grãos selecionados e torrefação especial para uma experiência inesquecível no Keys Café.',
        primaryButtonText: 'Experimente nossos deliciosos cafés',
        primaryButtonAction: '#products',
        secondaryButtonText: 'Saiba mais sobre nós',
        secondaryButtonAction: '#about',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
      },
    }).execute();
    console.log('✅ Hero criado');

    // 2. About Section
    console.log('📝 Criando seção About...');
    await radb.from('cms_sections').insert({
      section_key: 'about',
      content: {
        title: 'Sobre o Keys Café',
        description: 'Tradicional, acolhedor e inovador: somos apaixonados por café e por criar experiências únicas. Desde o aroma fresco da manhã até aquele espresso perfeito para encerrar o dia, o Keys Café é seu lugar para momentos especiais.',
        stats: {
          years: 10,
          yearsLabel: 'anos de tradição',
          coffees: 50,
          coffeesLabel: 'cafés e receitas',
          rating: 4.5,
          ratingLabel: 'de avaliação',
        },
      },
    }).execute();
    console.log('✅ About criado');

    // 3. Contact Section
    console.log('📝 Criando seção Contact...');
    await radb.from('cms_sections').insert({
      section_key: 'contact',
      content: {
        title: 'Entre em Contato',
        description: 'Estamos sempre prontos para atendê-lo. Entre em contato conosco para dúvidas, sugestões ou para reservar sua mesa.',
        email: 'contato@keyscafe.com.br',
        phone: '(99) 99999-9999',
        address: 'Rua dos Grãos, 123\nCentro, Sua Cidade - Brasil',
        formFields: [],
      },
    }).execute();
    console.log('✅ Contact criado');

    // 4. Header Section
    console.log('📝 Criando seção Header...');
    await radb.from('cms_sections').insert({
      section_key: 'header',
      content: {
        logoText: 'Keys Café',
        menuItems: [
          { label: 'Início', href: '#home' },
          { label: 'Sobre', href: '#about' },
          { label: 'Produtos', href: '#products' },
          { label: 'Depoimentos', href: '#testimonials' },
          { label: 'Contato', href: '#contact' },
        ],
      },
    }).execute();
    console.log('✅ Header criado');

    // 5. Footer Section
    console.log('📝 Criando seção Footer...');
    await radb.from('cms_sections').insert({
      section_key: 'footer',
      content: {
        description: '',
        address: 'Rua dos Grãos, 123, Centro\nSua Cidade, Brasil',
        phone: '(99) 99999-9999',
        email: 'contato@keyscafe.com.br',
        copyright: `© ${new Date().getFullYear()} Keys Café. Todos os direitos reservados.`,
        socialLinks: [
          { platform: 'Instagram', url: 'https://instagram.com/keyscafe' },
          { platform: 'Facebook', url: 'https://facebook.com/keyscafe' },
          { platform: 'Youtube', url: 'https://youtube.com/keyscafe' },
        ],
        links: [
          { label: 'Início', href: '#home' },
          { label: 'Sobre', href: '#about' },
          { label: 'Produtos', href: '#products' },
          { label: 'Depoimentos', href: '#testimonials' },
          { label: 'Contato', href: '#contact' },
        ],
      },
    }).execute();
    console.log('✅ Footer criado');

    // 6. Products
    console.log('📝 Criando produtos...');
    const products = [
      {
        name: 'Café Expresso Tradicional',
        description: 'Um clássico irresistível para começar seu dia.',
        price: 5.5,
        image_url: 'https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=400&q=80',
        order: 0,
        is_active: true,
      },
      {
        name: 'Cappuccino Cremoso',
        description: 'Café, leite vaporizado e espuma cremosa com um toque extra.',
        price: 8.0,
        image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
        order: 1,
        is_active: true,
      },
      {
        name: 'Latte Avelã',
        description: 'Avelã com creme leite aveludado, sofisticado.',
        price: 9.5,
        image_url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
        order: 2,
        is_active: true,
      },
      {
        name: 'Mocha Chocolate',
        description: 'Para os amantes de chocolate: café intenso, leite e cacau.',
        price: 10.0,
        image_url: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80',
        order: 3,
        is_active: true,
      },
      {
        name: 'Café Gelado Tropical',
        description: 'Refrescante e exótico, perfeito para os dias quentes.',
        price: 7.0,
        image_url: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
        order: 4,
        is_active: true,
      },
      {
        name: 'Macchiato Caramelo',
        description: 'Camadas de espresso com doce de caramelo e espuma.',
        price: 8.5,
        image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
        order: 5,
        is_active: true,
      },
    ];

    for (const product of products) {
      await radb.from('cms_products').insert(product).execute();
    }
    console.log(`✅ ${products.length} produtos criados`);

    // 7. Testimonials
    console.log('📝 Criando depoimentos...');
    const testimonials = [
      {
        author_name: 'Maria Silva',
        author_role: null,
        content: 'Um lugar incrível! O Keys Café tem os melhores grãos que já provei. Atendimento impecável e ambiente super aconchegante. Recomendo para todos os amantes de café!',
        image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=facearea&facepad=2&q=80',
        rating: 5,
        order: 0,
        is_active: true,
      },
      {
        author_name: 'João Pereira',
        author_role: null,
        content: 'O melhor cappuccino que já tomei! O Keys Café superou minhas expectativas. Ambiente agradável e serviço de alta qualidade.',
        image_url: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=facearea&facepad=2&q=80',
        rating: 4,
        order: 1,
        is_active: true,
      },
      {
        author_name: 'Ana Clara',
        author_role: null,
        content: 'Adoro o ambiente do Keys Café! Perfeito para relaxar e saborear um bom café. Os funcionários são muito atenciosos e os produtos de alta qualidade.',
        image_url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=facearea&facepad=2&q=80',
        rating: 5,
        order: 2,
        is_active: true,
      },
    ];

    for (const testimonial of testimonials) {
      await radb.from('cms_testimonials').insert(testimonial).execute();
    }
    console.log(`✅ ${testimonials.length} depoimentos criados`);

    console.log('🎉 Seed concluído com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro ao fazer seed:', error);
    if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
      console.log('⚠️  Alguns dados já existem. Isso é normal se você já executou o seed antes.');
    } else {
      throw error;
    }
  }
};

// Executar apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData().catch(console.error);
}

export default seedData;

