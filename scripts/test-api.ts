/**
 * Script de teste da API RaDB
 * 
 * Testa todas as operações CRUD e autenticação
 * 
 * Execute: npx tsx scripts/test-api.ts
 */

import { radb } from '../src/lib/radb';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg: string) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  test: (msg: string) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`),
};

// Variáveis de teste
const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = 'test123456';
let authToken: string | null = null;

// Função auxiliar para aguardar
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function testAuth() {
  log.test('=== TESTE DE AUTENTICAÇÃO ===');
  
  try {
    // Teste 1: Sign Up
    log.info('1. Testando Sign Up...');
    const signUpResult = await radb.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    
    if (signUpResult.error) {
      if (signUpResult.error.message?.includes('already registered')) {
        log.info('   Usuário já existe, tentando fazer login...');
      } else {
        throw new Error(signUpResult.error.message || 'Erro no signup');
      }
    } else {
      log.success(`   Sign Up realizado: ${TEST_EMAIL}`);
      if (signUpResult.data?.access_token) {
        authToken = signUpResult.data.access_token;
      }
    }
    
    // Teste 2: Sign In (se signup falhou)
    if (!authToken) {
      log.info('2. Testando Sign In...');
      const signInResult = await radb.auth.signIn({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
      
      if (signInResult.error) {
        throw new Error(signInResult.error.message || 'Erro no login');
      }
      
      log.success('   Sign In realizado com sucesso');
      if (signInResult.data?.access_token) {
        authToken = signInResult.data.access_token;
      }
    }
    
    // Teste 3: Get User
    log.info('3. Testando Get User...');
    const userResult = await radb.auth.getUser();
    
    if (userResult.error) {
      throw new Error(userResult.error.message || 'Erro ao buscar usuário');
    }
    
    log.success(`   Usuário obtido: ${userResult.data?.user?.email || 'N/A'}`);
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de autenticação: ${error.message}`);
    return false;
  }
}

async function testSections() {
  log.test('\n=== TESTE DE SEÇÕES (cms_sections) ===');
  
  try {
    // Teste 1: Criar seção Hero
    log.info('1. Criando seção Hero...');
    const heroContent = {
      title: 'O melhor café que você poderia tomar',
      subtitle: 'Descubra o sabor único do nosso café artesanal',
      primaryButtonText: 'Experimente nossos cafés',
      primaryButtonAction: '#products',
      secondaryButtonText: 'Saiba mais',
      secondaryButtonAction: '#about',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    };
    
    const insertResult = await radb
      .from('cms_sections')
      .insert({
        section_key: 'hero',
        content: heroContent,
      })
      .execute();
    
    if (insertResult.error) {
      if (insertResult.error.message?.includes('duplicate') || insertResult.error.message?.includes('unique')) {
        log.info('   Seção Hero já existe, atualizando...');
        // Tentar atualizar
        const updateResult = await radb
          .from('cms_sections')
          .update({ content: heroContent })
          .eq('section_key', 'hero')
          .execute();
        
        if (updateResult.error) {
          throw new Error(updateResult.error.message || 'Erro ao atualizar');
        }
        log.success('   Seção Hero atualizada');
      } else {
        throw new Error(insertResult.error.message || 'Erro ao criar');
      }
    } else {
      log.success('   Seção Hero criada');
    }
    
    // Teste 2: Ler seção
    log.info('2. Lendo seção Hero...');
    const readResult = await radb
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'hero')
      .execute();
    
    if (readResult.error) {
      throw new Error(readResult.error.message || 'Erro ao ler');
    }
    
    log.success(`   Seção lida: ${readResult.data ? 'Sim' : 'Não'}`);
    if (readResult.data && Array.isArray(readResult.data) && readResult.data.length > 0) {
      log.info(`   Conteúdo: ${JSON.stringify(readResult.data[0].content).substring(0, 50)}...`);
    }
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de seções: ${error.message}`);
    return false;
  }
}

async function testProducts() {
  log.test('\n=== TESTE DE PRODUTOS (cms_products) ===');
  
  try {
    // Teste 1: Criar produto
    log.info('1. Criando produto de teste...');
    const productData = {
      name: 'Café Expresso Teste',
      description: 'Um café expresso delicioso para teste',
      price: 5.50,
      image_url: 'https://images.unsplash.com/photo-1459257868276-5e65389e2722',
      order: 0,
      is_active: true,
    };
    
    const insertResult = await radb
      .from('cms_products')
      .insert(productData)
      .execute();
    
    if (insertResult.error) {
      throw new Error(insertResult.error.message || 'Erro ao criar produto');
    }
    
    log.success('   Produto criado');
    const productId = insertResult.data?.[0]?.id;
    
    if (!productId) {
      throw new Error('ID do produto não retornado');
    }
    
    // Teste 2: Ler produtos
    log.info('2. Lendo produtos...');
    const readResult = await radb
      .from('cms_products')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
      .execute();
    
    if (readResult.error) {
      throw new Error(readResult.error.message || 'Erro ao ler produtos');
    }
    
    log.success(`   ${Array.isArray(readResult.data) ? readResult.data.length : 0} produtos encontrados`);
    
    // Teste 3: Atualizar produto
    log.info('3. Atualizando produto...');
    const updateResult = await radb
      .from('cms_products')
      .update({ price: 6.00, description: 'Preço atualizado!' })
      .eq('id', productId)
      .execute();
    
    if (updateResult.error) {
      throw new Error(updateResult.error.message || 'Erro ao atualizar');
    }
    
    log.success('   Produto atualizado');
    
    // Teste 4: Deletar produto
    log.info('4. Deletando produto de teste...');
    const deleteResult = await radb
      .from('cms_products')
      .delete()
      .eq('id', productId)
      .execute();
    
    if (deleteResult.error) {
      throw new Error(deleteResult.error.message || 'Erro ao deletar');
    }
    
    log.success('   Produto deletado');
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de produtos: ${error.message}`);
    return false;
  }
}

async function testTestimonials() {
  log.test('\n=== TESTE DE DEPOIMENTOS (cms_testimonials) ===');
  
  try {
    // Teste 1: Criar depoimento
    log.info('1. Criando depoimento de teste...');
    const testimonialData = {
      author_name: 'Cliente Teste',
      author_role: 'Cliente VIP',
      content: 'Este é um depoimento de teste para validar a API',
      rating: 5,
      image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      order: 0,
      is_active: true,
    };
    
    const insertResult = await radb
      .from('cms_testimonials')
      .insert(testimonialData)
      .execute();
    
    if (insertResult.error) {
      throw new Error(insertResult.error.message || 'Erro ao criar depoimento');
    }
    
    log.success('   Depoimento criado');
    const testimonialId = insertResult.data?.[0]?.id;
    
    if (!testimonialId) {
      throw new Error('ID do depoimento não retornado');
    }
    
    // Teste 2: Ler depoimentos
    log.info('2. Lendo depoimentos...');
    const readResult = await radb
      .from('cms_testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
      .execute();
    
    if (readResult.error) {
      throw new Error(readResult.error.message || 'Erro ao ler depoimentos');
    }
    
    log.success(`   ${Array.isArray(readResult.data) ? readResult.data.length : 0} depoimentos encontrados`);
    
    // Teste 3: Deletar depoimento
    log.info('3. Deletando depoimento de teste...');
    const deleteResult = await radb
      .from('cms_testimonials')
      .delete()
      .eq('id', testimonialId)
      .execute();
    
    if (deleteResult.error) {
      throw new Error(deleteResult.error.message || 'Erro ao deletar');
    }
    
    log.success('   Depoimento deletado');
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de depoimentos: ${error.message}`);
    return false;
  }
}

async function testStorage() {
  log.test('\n=== TESTE DE STORAGE ===');
  
  try {
    log.info('1. Testando URL pública do storage...');
    const bucket = 'radb-33272bf5-cms-uploads';
    const testPath = 'test/test-image.jpg';
    
    const urlResult = radb.storage.from(bucket).getPublicUrl(testPath);
    log.success(`   URL pública gerada: ${urlResult.data.publicUrl}`);
    
    // Nota: Upload real requer um arquivo, então apenas testamos a geração de URL
    log.info('   (Upload real requer arquivo físico - teste manual necessário)');
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de storage: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 INICIANDO TESTES DA API RaDB');
  console.log('='.repeat(50) + '\n');
  
  const results = {
    auth: false,
    sections: false,
    products: false,
    testimonials: false,
    storage: false,
  };
  
  // Executar testes
  results.auth = await testAuth();
  await sleep(500);
  
  results.sections = await testSections();
  await sleep(500);
  
  results.products = await testProducts();
  await sleep(500);
  
  results.testimonials = await testTestimonials();
  await sleep(500);
  
  results.storage = await testStorage();
  
  // Resumo
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(50));
  console.log(`Autenticação:     ${results.auth ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Seções:           ${results.sections ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Produtos:         ${results.products ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Depoimentos:      ${results.testimonials ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Storage:          ${results.storage ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log('='.repeat(50));
  
  const allPassed = Object.values(results).every(r => r);
  
  if (allPassed) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    process.exit(0);
  } else {
    console.log('\n⚠️  ALGUNS TESTES FALHARAM');
    process.exit(1);
  }
}

// Executar testes
runAllTests().catch((error) => {
  log.error(`Erro fatal: ${error.message}`);
  console.error(error);
  process.exit(1);
});

