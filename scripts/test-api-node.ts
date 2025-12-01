/**
 * Script de teste da API RaDB (Node.js)
 * 
 * Testa todas as operações CRUD e autenticação
 * 
 * Execute: npx tsx scripts/test-api-node.ts
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Carregar variáveis de ambiente do .env.local
let envVars: Record<string, string> = {};
const envPath = join(process.cwd(), '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envVars = envContent
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .reduce((acc, line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        acc[key.trim()] = valueParts.join('=').trim();
      }
      return acc;
    }, {} as Record<string, string>);
  
  // Definir no process.env
  Object.assign(process.env, envVars);
} catch (error) {
  console.warn('⚠️  Não foi possível carregar .env.local, usando variáveis do sistema');
}

const RADB_BASE_URL = envVars.VITE_RADB_URL || envVars.RADB_PROJECT_URL || '';
const RADB_URL = RADB_BASE_URL ? `${RADB_BASE_URL}/api/v1` : '';
const RADB_ANON_KEY = envVars.VITE_RADB_ANON_KEY || envVars.RADB_ANON_KEY || '';
const RADB_SERVICE_ROLE_KEY = envVars.VITE_RADB_SERVICE_ROLE_KEY || envVars.RADB_SERVICE_ROLE_KEY || '';

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
  warn: (msg: string) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
};

// Verificar configuração
if (!RADB_URL || !RADB_ANON_KEY) {
  log.error('Variáveis de ambiente não configuradas!');
  log.info(`RADB_URL: ${RADB_URL ? '✅' : '❌'}`);
  log.info(`RADB_ANON_KEY: ${RADB_ANON_KEY ? '✅' : '❌'}`);
  process.exit(1);
}

log.info(`URL: ${RADB_URL}`);
log.info(`Key: ${RADB_ANON_KEY.substring(0, 20)}...`);

// Função auxiliar para fazer requisições
async function radbRequest(
  method: string,
  endpoint: string,
  body?: any,
  token?: string
): Promise<{ data: any; error: any }> {
  try {
    const url = `${RADB_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token || RADB_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
}

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
    const signUpResult = await radbRequest('POST', '/auth/v1/signup', {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: 'Test User',
    });
    
    if (signUpResult.error) {
      if (signUpResult.error.message?.includes('already registered') || 
          signUpResult.error.message?.includes('already exists')) {
        log.warn('   Usuário já existe, tentando fazer login...');
      } else {
        log.error(`   Erro: ${JSON.stringify(signUpResult.error)}`);
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
      const signInResult = await radbRequest('POST', '/auth/login', {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
      
      if (signInResult.error) {
        log.error(`   Erro: ${JSON.stringify(signInResult.error)}`);
        throw new Error(signInResult.error.message || 'Erro no login');
      }
      
      log.success('   Sign In realizado com sucesso');
      // O token pode vir como accessToken ou access_token
      const token = signInResult.data?.accessToken || signInResult.data?.access_token;
      if (token) {
        authToken = token;
      }
    }
    
    // Teste 3: Get User
    if (authToken) {
      log.info('3. Testando Get User...');
      const userResult = await radbRequest('GET', '/auth/v1/me', undefined, authToken);
      
      if (userResult.error) {
        log.warn(`   Erro ao buscar usuário: ${JSON.stringify(userResult.error)}`);
      } else {
        log.success(`   Usuário obtido: ${userResult.data?.email || 'N/A'}`);
      }
    }
    
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
    
    const insertResult = await radbRequest('POST', '/rest/v1/cms_sections', {
      section_key: 'hero',
      content: heroContent,
    }, RADB_SERVICE_ROLE_KEY || authToken || RADB_ANON_KEY || undefined);
    
    if (insertResult.error) {
      if (insertResult.error.message?.includes('duplicate') || 
          insertResult.error.message?.includes('unique') ||
          insertResult.error.code === '23505') {
        log.info('   Seção Hero já existe, atualizando...');
        // Tentar atualizar
        const readResult = await radbRequest('GET', '/rest/v1/cms_sections?section_key=eq.hero');
        if (readResult.data && Array.isArray(readResult.data) && readResult.data.length > 0) {
          const sectionId = readResult.data[0].id;
          const updateResult = await radbRequest('PATCH', `/rest/v1/cms_sections/${sectionId}`, {
            content: heroContent,
          }, RADB_SERVICE_ROLE_KEY || authToken || RADB_ANON_KEY || undefined);
          
          if (updateResult.error) {
            log.error(`   Erro ao atualizar: ${JSON.stringify(updateResult.error)}`);
            throw new Error(updateResult.error.message || 'Erro ao atualizar');
          }
          log.success('   Seção Hero atualizada');
        }
      } else {
        log.error(`   Erro: ${JSON.stringify(insertResult.error)}`);
        throw new Error(insertResult.error.message || 'Erro ao criar');
      }
    } else {
      log.success('   Seção Hero criada');
    }
    
    // Teste 2: Ler seção
    log.info('2. Lendo seção Hero...');
    const readResult = await radbRequest('GET', '/rest/v1/cms_sections?section_key=eq.hero');
    
    if (readResult.error) {
      log.error(`   Erro: ${JSON.stringify(readResult.error)}`);
      throw new Error(readResult.error.message || 'Erro ao ler');
    }
    
    log.success(`   Seção lida: ${readResult.data ? 'Sim' : 'Não'}`);
    if (readResult.data && Array.isArray(readResult.data) && readResult.data.length > 0) {
      log.info(`   Conteúdo: ${JSON.stringify(readResult.data[0].content).substring(0, 80)}...`);
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
    
    const insertResult = await radbRequest('POST', '/rest/v1/cms_products', productData, RADB_SERVICE_ROLE_KEY || authToken || undefined);
    
    if (insertResult.error) {
      log.error(`   Erro: ${JSON.stringify(insertResult.error)}`);
      throw new Error(insertResult.error.message || 'Erro ao criar produto');
    }
    
    log.success('   Produto criado');
    // A resposta pode vir em diferentes formatos: { data: { id: ... } } ou [{ id: ... }]
    let productId: string | undefined;
    if (insertResult.data?.data?.id) {
      productId = insertResult.data.data.id;
    } else if (Array.isArray(insertResult.data)) {
      productId = insertResult.data[0]?.id;
    } else if (insertResult.data?.id) {
      productId = insertResult.data.id;
    } else if (Array.isArray(insertResult.data?.data)) {
      productId = insertResult.data.data[0]?.id;
    }
    
    if (!productId) {
      log.warn('   ID do produto não retornado, tentando buscar...');
      // Tentar buscar o produto recém criado
      const searchResult = await radbRequest('GET', `/rest/v1/cms_products?name=eq.${encodeURIComponent(productData.name)}`);
      if (searchResult.data && Array.isArray(searchResult.data) && searchResult.data.length > 0) {
        const foundId = searchResult.data[0].id;
        log.info(`   Produto encontrado com ID: ${foundId}`);
        return await testProductOperations(foundId);
      }
      log.error(`   Resposta completa: ${JSON.stringify(insertResult.data)}`);
      throw new Error('ID do produto não retornado');
    }
    
    return await testProductOperations(productId);
  } catch (error: any) {
    log.error(`Erro no teste de produtos: ${error.message}`);
    return false;
  }
}

async function testProductOperations(productId: string) {
  try {
    // Teste 2: Ler produtos
    log.info('2. Lendo produtos...');
    const readResult = await radbRequest('GET', '/rest/v1/cms_products?is_active=eq.true&order=order.asc');
    
    if (readResult.error) {
      log.error(`   Erro: ${JSON.stringify(readResult.error)}`);
      throw new Error(readResult.error.message || 'Erro ao ler produtos');
    }
    
    log.success(`   ${Array.isArray(readResult.data) ? readResult.data.length : 0} produtos encontrados`);
    
    // Teste 3: Atualizar produto
    log.info('3. Atualizando produto...');
    const updateResult = await radbRequest('PATCH', `/rest/v1/cms_products/${productId}`, {
      price: 6.00,
      description: 'Preço atualizado!',
    }, RADB_SERVICE_ROLE_KEY || authToken || RADB_ANON_KEY || undefined);
    
    if (updateResult.error) {
      log.error(`   Erro: ${JSON.stringify(updateResult.error)}`);
      throw new Error(updateResult.error.message || 'Erro ao atualizar');
    }
    
    log.success('   Produto atualizado');
    
    // Teste 4: Deletar produto
    log.info('4. Deletando produto de teste...');
    const deleteResult = await radbRequest('DELETE', `/rest/v1/cms_products/${productId}`, undefined, RADB_SERVICE_ROLE_KEY || authToken || RADB_ANON_KEY || undefined);
    
    if (deleteResult.error) {
      log.error(`   Erro: ${JSON.stringify(deleteResult.error)}`);
      throw new Error(deleteResult.error.message || 'Erro ao deletar');
    }
    
    log.success('   Produto deletado');
    
    return true;
  } catch (error: any) {
    log.error(`Erro nas operações de produto: ${error.message}`);
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
    
    const insertResult = await radbRequest('POST', '/rest/v1/cms_testimonials', testimonialData, RADB_SERVICE_ROLE_KEY || authToken || undefined);
    
    if (insertResult.error) {
      log.error(`   Erro: ${JSON.stringify(insertResult.error)}`);
      throw new Error(insertResult.error.message || 'Erro ao criar depoimento');
    }
    
    log.success('   Depoimento criado');
    // A resposta pode vir em diferentes formatos: { data: { id: ... } } ou [{ id: ... }]
    let testimonialId: string | undefined;
    if (insertResult.data?.data?.id) {
      testimonialId = insertResult.data.data.id;
    } else if (Array.isArray(insertResult.data)) {
      testimonialId = insertResult.data[0]?.id;
    } else if (insertResult.data?.id) {
      testimonialId = insertResult.data.id;
    } else if (Array.isArray(insertResult.data?.data)) {
      testimonialId = insertResult.data.data[0]?.id;
    }
    
    if (!testimonialId) {
      log.error(`   Resposta completa: ${JSON.stringify(insertResult.data)}`);
      throw new Error('ID do depoimento não retornado');
    }
    
    // Teste 2: Ler depoimentos
    log.info('2. Lendo depoimentos...');
    const readResult = await radbRequest('GET', '/rest/v1/cms_testimonials?is_active=eq.true&order=order.asc');
    
    if (readResult.error) {
      log.error(`   Erro: ${JSON.stringify(readResult.error)}`);
      throw new Error(readResult.error.message || 'Erro ao ler depoimentos');
    }
    
    log.success(`   ${Array.isArray(readResult.data) ? readResult.data.length : 0} depoimentos encontrados`);
    
    // Teste 3: Deletar depoimento
    log.info('3. Deletando depoimento de teste...');
    const deleteResult = await radbRequest('DELETE', `/rest/v1/cms_testimonials/${testimonialId}`, undefined, RADB_SERVICE_ROLE_KEY || authToken || RADB_ANON_KEY || undefined);
    
    if (deleteResult.error) {
      log.error(`   Erro: ${JSON.stringify(deleteResult.error)}`);
      throw new Error(deleteResult.error.message || 'Erro ao deletar');
    }
    
    log.success('   Depoimento deletado');
    
    return true;
  } catch (error: any) {
    log.error(`Erro no teste de depoimentos: ${error.message}`);
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
  };
  
  // Executar testes
  results.auth = await testAuth();
  await sleep(500);
  
  results.sections = await testSections();
  await sleep(500);
  
  results.products = await testProducts();
  await sleep(500);
  
  results.testimonials = await testTestimonials();
  
  // Resumo
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(50));
  console.log(`Autenticação:     ${results.auth ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Seções:           ${results.sections ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Produtos:         ${results.products ? '✅ PASSOU' : '❌ FALHOU'}`);
  console.log(`Depoimentos:      ${results.testimonials ? '✅ PASSOU' : '❌ FALHOU'}`);
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

