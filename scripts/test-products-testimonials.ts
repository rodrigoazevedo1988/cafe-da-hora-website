/**
 * Script para testar queries de produtos e depoimentos
 */

const RADB_URL = 'https://cafe-da-hora.radb.rsolutionsbr.com/api/v1';
const RADB_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyYWRiIiwicHJvamVjdF9pZCI6IjMzMjcyYmY1LTk3OGMtNGIwYS1iZGI3LTgzZjY2MGY1NjU5NyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0NjA1MjYxLCJleHAiOjIwNzk5NjUyNjF9.r8yIFh2D7mykkbW1RDnKXgpJXHP4l8nS1frROHoAggw';

async function testQueries() {
  console.log('🧪 Testando queries de produtos e depoimentos...\n');
  
  // Teste 1: Produtos sem order
  console.log('1. GET /rest/v1/cms_products?is_active=eq.true');
  try {
    const response1 = await fetch(`${RADB_URL}/rest/v1/cms_products?is_active=eq.true`, {
      headers: {
        'Authorization': `Bearer ${RADB_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data1 = await response1.json();
    console.log(`   Status: ${response1.status}`);
    console.log(`   Resposta:`, JSON.stringify(data1, null, 2));
  } catch (error: any) {
    console.error('   Erro:', error.message);
  }
  
  console.log('\n');
  
  // Teste 2: Produtos com order
  console.log('2. GET /rest/v1/cms_products?is_active=eq.true&order=order.asc');
  try {
    const response2 = await fetch(`${RADB_URL}/rest/v1/cms_products?is_active=eq.true&order=order.asc`, {
      headers: {
        'Authorization': `Bearer ${RADB_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data2 = await response2.json();
    console.log(`   Status: ${response2.status}`);
    console.log(`   Resposta:`, JSON.stringify(data2, null, 2));
  } catch (error: any) {
    console.error('   Erro:', error.message);
  }
  
  console.log('\n');
  
  // Teste 3: Depoimentos sem order
  console.log('3. GET /rest/v1/cms_testimonials?is_active=eq.true');
  try {
    const response3 = await fetch(`${RADB_URL}/rest/v1/cms_testimonials?is_active=eq.true`, {
      headers: {
        'Authorization': `Bearer ${RADB_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data3 = await response3.json();
    console.log(`   Status: ${response3.status}`);
    console.log(`   Resposta:`, JSON.stringify(data3, null, 2));
  } catch (error: any) {
    console.error('   Erro:', error.message);
  }
  
  console.log('\n');
  
  // Teste 4: Depoimentos com order
  console.log('4. GET /rest/v1/cms_testimonials?is_active=eq.true&order=order.asc');
  try {
    const response4 = await fetch(`${RADB_URL}/rest/v1/cms_testimonials?is_active=eq.true&order=order.asc`, {
      headers: {
        'Authorization': `Bearer ${RADB_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data4 = await response4.json();
    console.log(`   Status: ${response4.status}`);
    console.log(`   Resposta:`, JSON.stringify(data4, null, 2));
  } catch (error: any) {
    console.error('   Erro:', error.message);
  }
}

testQueries().catch(console.error);

