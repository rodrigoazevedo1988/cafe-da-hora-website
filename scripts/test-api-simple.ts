/**
 * Script de teste simples da API RaDB
 * Testa apenas a conectividade básica
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Carregar variáveis de ambiente
const envPath = join(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = envContent
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      acc[key.trim()] = valueParts.join('=').trim();
    }
    return acc;
  }, {} as Record<string, string>);

const RADB_URL = envVars.VITE_RADB_URL || envVars.RADB_PROJECT_URL || '';
const RADB_ANON_KEY = envVars.VITE_RADB_ANON_KEY || envVars.RADB_ANON_KEY || '';

console.log('\n🔍 TESTE DE CONECTIVIDADE\n');
console.log(`URL: ${RADB_URL}`);
console.log(`Key: ${RADB_ANON_KEY.substring(0, 30)}...\n`);

// Teste 1: Verificar se a URL base responde
async function testBaseUrl() {
  console.log('1. Testando URL base...');
  try {
    const response = await fetch(RADB_URL);
    console.log(`   Status: ${response.status}`);
    console.log(`   OK: ${response.ok}`);
    return response.ok;
  } catch (error: any) {
    console.log(`   ❌ Erro: ${error.message}`);
    return false;
  }
}

// Teste 2: Testar endpoint REST
async function testRestEndpoint() {
  console.log('\n2. Testando endpoint REST...');
  const endpoints = [
    '/rest/v1',
    '/api/v1',
    '/v1',
    '/api',
  ];
  
  for (const endpoint of endpoints) {
    try {
      const url = `${RADB_URL}${endpoint}`;
      console.log(`   Testando: ${url}`);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${RADB_ANON_KEY}`,
        },
      });
      console.log(`   Status: ${response.status}`);
      if (response.status !== 404) {
        const text = await response.text();
        console.log(`   Resposta: ${text.substring(0, 100)}`);
        return endpoint;
      }
    } catch (error: any) {
      console.log(`   ❌ Erro: ${error.message}`);
    }
  }
  return null;
}

// Teste 3: Testar tabela específica
async function testTable(table: string) {
  console.log(`\n3. Testando tabela ${table}...`);
  const endpoints = [
    `/rest/v1/${table}`,
    `/api/v1/${table}`,
    `/v1/${table}`,
    `/api/${table}`,
  ];
  
  for (const endpoint of endpoints) {
    try {
      const url = `${RADB_URL}${endpoint}`;
      console.log(`   Testando: ${url}`);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${RADB_ANON_KEY}`,
        },
      });
      console.log(`   Status: ${response.status}`);
      if (response.status !== 404) {
        const text = await response.text();
        console.log(`   Resposta: ${text.substring(0, 200)}`);
        return endpoint;
      }
    } catch (error: any) {
      console.log(`   ❌ Erro: ${error.message}`);
    }
  }
  return null;
}

// Executar testes
(async () => {
  await testBaseUrl();
  const restEndpoint = await testRestEndpoint();
  if (restEndpoint) {
    console.log(`\n✅ Endpoint REST encontrado: ${restEndpoint}`);
  }
  await testTable('cms_sections');
  await testTable('cms_products');
})();

