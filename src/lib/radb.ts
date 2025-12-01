// Cliente RaDB para frontend (anon key)
const RADB_BASE_URL = import.meta.env.VITE_RADB_URL || import.meta.env.NEXT_PUBLIC_RADB_URL || '';
const RADB_URL = RADB_BASE_URL ? `${RADB_BASE_URL}/api/v1` : '';
const RADB_ANON_KEY = import.meta.env.VITE_RADB_ANON_KEY || import.meta.env.NEXT_PUBLIC_RADB_ANON_KEY || '';

// Debug: verificar se as variáveis estão carregadas
if (typeof window !== 'undefined' && !RADB_URL) {
  console.warn('⚠️ VITE_RADB_URL não está definida. Verifique o arquivo .env.local');
}
if (typeof window !== 'undefined' && !RADB_ANON_KEY) {
  console.warn('⚠️ VITE_RADB_ANON_KEY não está definida. Verifique o arquivo .env.local');
}

interface QueryBuilder {
  select(columns?: string): QueryBuilder;
  eq(column: string, value: any): QueryBuilder;
  neq(column: string, value: any): QueryBuilder;
  gt(column: string, value: any): QueryBuilder;
  gte(column: string, value: any): QueryBuilder;
  lt(column: string, value: any): QueryBuilder;
  lte(column: string, value: any): QueryBuilder;
  like(column: string, pattern: string): QueryBuilder;
  ilike(column: string, pattern: string): QueryBuilder;
  is(column: string, value: any): QueryBuilder;
  in(column: string, values: any[]): QueryBuilder;
  order(column: string, options?: { ascending?: boolean }): QueryBuilder;
  limit(count: number): QueryBuilder;
  offset(count: number): QueryBuilder;
  execute(): Promise<{ data: any; error: any }>;
}

class RaDBQueryBuilder implements QueryBuilder {
  private table: string;
  private params: URLSearchParams;
  private method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  private body?: any;
  private token: string;

  constructor(table: string, token: string) {
    this.table = table;
    this.params = new URLSearchParams();
    this.method = 'GET';
    this.token = token;
  }

  select(columns: string = '*'): QueryBuilder {
    // Se for '*', não adicionar o parâmetro select (RaDB retorna todas as colunas por padrão)
    // Se for uma lista específica de colunas, adicionar o parâmetro
    if (columns !== '*') {
      this.params.set('select', columns);
    }
    return this;
  }

  eq(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `eq.${value}`);
    return this;
  }

  neq(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `neq.${value}`);
    return this;
  }

  gt(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `gt.${value}`);
    return this;
  }

  gte(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `gte.${value}`);
    return this;
  }

  lt(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `lt.${value}`);
    return this;
  }

  lte(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `lte.${value}`);
    return this;
  }

  like(column: string, pattern: string): QueryBuilder {
    this.params.append(`${column}`, `like.${pattern}`);
    return this;
  }

  ilike(column: string, pattern: string): QueryBuilder {
    this.params.append(`${column}`, `ilike.${pattern}`);
    return this;
  }

  is(column: string, value: any): QueryBuilder {
    this.params.append(`${column}`, `is.${value}`);
    return this;
  }

  in(column: string, values: any[]): QueryBuilder {
    this.params.append(`${column}`, `in.(${values.join(',')})`);
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): QueryBuilder {
    const direction = options?.ascending === false ? 'desc' : 'asc';
    this.params.append('order', `${column}.${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.params.set('limit', count.toString());
    return this;
  }

  offset(count: number): QueryBuilder {
    this.params.set('offset', count.toString());
    return this;
  }

  async execute(): Promise<{ data: any; error: any }> {
    try {
      const queryString = this.params.toString();
      const url = `${RADB_URL}/rest/v1/${this.table}${queryString ? `?${queryString}` : ''}`;
      
      // Debug: log da URL em desenvolvimento
      if (typeof window !== 'undefined' && import.meta.env.DEV) {
        console.log('🔍 RaDB Query URL:', url);
      }
      
      const options: RequestInit = {
        method: this.method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      };

      if (this.body) {
        options.body = JSON.stringify(this.body);
      }

      const response = await fetch(url, options);
      
      // Verificar se a resposta é JSON antes de fazer parse
      let responseData: any;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        console.error('❌ Resposta não é JSON:', text);
        return { 
          data: null, 
          error: { 
            message: `Erro ${response.status}: ${text.substring(0, 100)}`,
            statusCode: response.status 
          } 
        };
      }

      if (!response.ok) {
        console.error('❌ Erro na requisição RaDB:', {
          url,
          status: response.status,
          error: responseData
        });
        return { data: null, error: responseData };
      }

      // A resposta pode vir como { data: [...] } ou diretamente como array
      const data = responseData.data !== undefined ? responseData.data : responseData;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
}

interface InsertBuilder {
  execute(): Promise<{ data: any; error: any }>;
}

class RaDBInsertBuilder implements InsertBuilder {
  private table: string;
  private body: any;
  private token: string;

  constructor(table: string, body: any, token: string) {
    this.table = table;
    this.body = body;
    this.token = token;
  }

  async execute(): Promise<{ data: any; error: any }> {
    try {
      const response = await fetch(`${RADB_URL}/rest/v1/${this.table}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.body),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return { data: null, error: responseData };
      }

      // A resposta pode vir como { data: {...} } ou diretamente como objeto
      const data = responseData.data !== undefined ? responseData.data : responseData;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
}

interface UpdateBuilder {
  eq(column: string, value: any): UpdateBuilder;
  execute(): Promise<{ data: any; error: any }>;
}

class RaDBUpdateBuilder implements UpdateBuilder {
  private table: string;
  private body: any;
  private token: string;
  private filters: Map<string, any> = new Map();

  constructor(table: string, body: any, token: string) {
    this.table = table;
    this.body = body;
    this.token = token;
  }

  eq(column: string, value: any): UpdateBuilder {
    this.filters.set(column, value);
    return this;
  }

  async execute(): Promise<{ data: any; error: any }> {
    try {
      let url = `${RADB_URL}/rest/v1/${this.table}`;
      
      // Se há filtros, usar query params ou construir URL com ID
      if (this.filters.size > 0) {
        const [column, value] = Array.from(this.filters.entries())[0];
        if (column === 'id') {
          url = `${url}/${value}`;
        } else {
          url = `${url}?${column}=eq.${value}`;
        }
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.body),
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: data };
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
}

interface DeleteBuilder {
  eq(column: string, value: any): DeleteBuilder;
  neq(column: string, value: any): DeleteBuilder;
  execute(): Promise<{ data: any; error: any }>;
}

class RaDBDeleteBuilder implements DeleteBuilder {
  private table: string;
  private token: string;
  private filters: Map<string, any> = new Map();

  constructor(table: string, token: string) {
    this.table = table;
    this.token = token;
  }

  eq(column: string, value: any): DeleteBuilder {
    this.filters.set(column, value);
    return this;
  }

  neq(column: string, value: any): DeleteBuilder {
    this.filters.set(column, `neq.${value}`);
    return this;
  }

  async execute(): Promise<{ data: any; error: any }> {
    try {
      let url = `${RADB_URL}/rest/v1/${this.table}`;
      
      // Se há filtros, usar query params ou construir URL com ID
      if (this.filters.size > 0) {
        const [column, value] = Array.from(this.filters.entries())[0];
        if (column === 'id') {
          url = `${url}/${value}`;
        } else {
          const filterValue = typeof value === 'string' && value.startsWith('neq.') 
            ? value 
            : `eq.${value}`;
          url = `${url}?${column}=${filterValue}`;
        }
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return { data: null, error };
      }

      return { data: null, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
}

interface RaDBClient {
  from(table: string): {
    select(columns?: string): QueryBuilder;
    insert(data: any): InsertBuilder;
    update(data: any): UpdateBuilder;
    delete(): DeleteBuilder;
  };
  auth: {
    signUp(credentials: { email: string; password: string }): Promise<{ data: any; error: any }>;
    signIn(credentials: { email: string; password: string }): Promise<{ data: any; error: any }>;
    signOut(): Promise<{ error: any }>;
    getUser(): Promise<{ data: { user: any } | null; error: any }>;
    signInWithOAuth(options: { provider: string; options?: { redirectTo?: string } }): Promise<{ error: any }>;
  };
  storage: {
    from(bucket: string): {
      upload(path: string, file: File): Promise<{ data: any; error: any }>;
      getPublicUrl(path: string): { data: { publicUrl: string } };
      download(path: string): Promise<{ data: Blob | null; error: any }>;
      remove(paths: string[]): Promise<{ data: any; error: any }>;
    };
  };
}

// Função para obter token do localStorage
const getToken = (): string => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('radb_token');
    return token || RADB_ANON_KEY;
  }
  return RADB_ANON_KEY;
};

// Função para salvar token no localStorage
const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('radb_token', token);
  }
};

// Função para remover token do localStorage
const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('radb_token');
    localStorage.removeItem('radb_user');
  }
};

// Função para obter dados do usuário salvos
const getUserData = (): any => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('radb_user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// Função para salvar dados do usuário
const setUserData = (user: any): void => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('radb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('radb_user');
    }
  }
};

export const radb: RaDBClient = {
  from(table: string) {
    const token = getToken();
    return {
      select(columns?: string): QueryBuilder {
        const builder = new RaDBQueryBuilder(table, token);
        if (columns) {
          builder.select(columns);
        }
        return builder;
      },
      insert(data: any): InsertBuilder {
        return new RaDBInsertBuilder(table, data, token);
      },
      update(data: any): UpdateBuilder {
        return new RaDBUpdateBuilder(table, data, token);
      },
      delete(): DeleteBuilder {
        return new RaDBDeleteBuilder(table, token);
      },
    };
  },
  auth: {
    async signUp(credentials: { email: string; password: string; name?: string }) {
      try {
        if (!RADB_URL) {
          return { data: null, error: { message: 'URL do RaDB não configurada. Verifique o arquivo .env.local' } };
        }
        
        // Tentar primeiro o endpoint principal /auth/register
        let url = `${RADB_URL}/auth/register`;
        console.log('🔍 Tentando fazer signup em:', url);
        
        let response: Response;
        let responseData: any;
        
        try {
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RADB_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              name: credentials.name || credentials.email.split('@')[0],
            }),
          });
          responseData = await response.json();
        } catch (fetchError: any) {
          // Se falhar por CORS ou rede, tentar endpoint de compatibilidade
          if (fetchError.message?.includes('CORS') || fetchError.message?.includes('Failed to fetch')) {
            console.log('⚠️  Tentando endpoint de compatibilidade...');
            url = `${RADB_URL}/auth/v1/signup`;
            try {
              response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${RADB_ANON_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                  name: credentials.name || credentials.email.split('@')[0],
                }),
              });
              responseData = await response.json();
            } catch (retryError: any) {
              throw fetchError; // Lançar o erro original
            }
          } else {
            throw fetchError;
          }
        }

        if (!response.ok) {
          // Se for 409 (Conflict), usuário já existe - tentar fazer login
          if (response.status === 409) {
            console.log('⚠️  Usuário já existe, tentando fazer login...');
            const loginResult = await this.signIn(credentials);
            if (!loginResult.error) {
              return { data: loginResult.data, error: null };
            }
          }
          
          console.error('❌ Erro no signup:', responseData);
          return { data: null, error: responseData };
        }

        // A resposta pode vir como { data: {...} } ou diretamente
        const data = responseData.data || responseData;
        
        // O token pode vir como accessToken ou access_token
        const token = data.accessToken || data.access_token;
        if (token) {
          setToken(token);
        }

        // Armazenar dados do usuário se disponíveis na resposta
        if (data.user) {
          setUserData(data.user);
        } else if (data.email) {
          // Se não há objeto user, criar um básico com os dados disponíveis
          setUserData({ email: data.email, id: data.id || 'current' });
        }

        return { data, error: null };
      } catch (error: any) {
        console.error('❌ Erro de rede no signup:', error);
        
        // Tratar erro de CORS especificamente
        if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
          return { 
            data: null, 
            error: { 
              message: 'Erro de CORS. O servidor RaDB precisa configurar os headers CORS corretamente. Entre em contato com o suporte do RaDB.' 
            } 
          };
        }
        
        return { 
          data: null, 
          error: { 
            message: error.message || 'Erro de conexão. Verifique se a URL do RaDB está correta e se o servidor está acessível.' 
          } 
        };
      }
    },
    async signIn(credentials: { email: string; password: string }) {
      try {
        if (!RADB_URL) {
          return { data: null, error: { message: 'URL do RaDB não configurada. Verifique o arquivo .env.local' } };
        }
        
        const response = await fetch(`${RADB_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RADB_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const responseData = await response.json();

        if (!response.ok) {
          return { data: null, error: responseData };
        }

        // A resposta pode vir como { data: {...} } ou diretamente
        const data = responseData.data || responseData;
        
        // O token pode vir como accessToken ou access_token
        const token = data.accessToken || data.access_token;
        if (token) {
          setToken(token);
        }

        // Armazenar dados do usuário se disponíveis na resposta
        if (data.user) {
          setUserData(data.user);
        } else if (data.email) {
          // Se não há objeto user, criar um básico com os dados disponíveis
          setUserData({ email: data.email, id: data.id || 'current' });
        }

        return { data, error: null };
      } catch (error: any) {
        console.error('❌ Erro de rede no signin:', error);
        
        // Tratar erro de CORS especificamente
        if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
          return { 
            data: null, 
            error: { 
              message: 'Erro de CORS. O servidor RaDB precisa configurar os headers CORS corretamente. Entre em contato com o suporte do RaDB.' 
            } 
          };
        }
        
        return { 
          data: null, 
          error: { 
            message: error.message || 'Erro de conexão. Verifique se a URL do RaDB está correta e se o servidor está acessível.' 
          } 
        };
      }
    },
    async signOut() {
      try {
        removeToken();
        return { error: null };
      } catch (error: any) {
        return { error: { message: error.message } };
      }
    },
    async getUser() {
      try {
        const token = getToken();
        if (!token) {
          // Se não há token, verificar se há dados do usuário salvos
          const savedUser = getUserData();
          if (savedUser) {
            return { data: { user: savedUser }, error: null };
          }
          return { data: { user: null }, error: { message: 'Token não encontrado' } };
        }

        // Tentar diferentes endpoints possíveis
        const endpoints = [
          `${RADB_URL}/auth/me`,
          `${RADB_URL}/auth/v1/me`,
          `${RADB_URL}/user/me`,
        ];

        let lastError: any = null;
        
        for (const url of endpoints) {
          try {
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            const responseData = await response.json();

            if (response.ok) {
              // A resposta pode vir como { data: {...} } ou diretamente
              const userData = responseData.data || responseData;
              setUserData(userData); // Salvar para uso futuro
              return { data: { user: userData }, error: null };
            }
            
            lastError = responseData;
          } catch (fetchError: any) {
            lastError = fetchError;
            continue; // Tentar próximo endpoint
          }
        }

        // Se nenhum endpoint funcionou, usar dados salvos ou retornar erro não crítico
        const savedUser = getUserData();
        if (savedUser) {
          console.warn('⚠️  Endpoint de getUser não encontrado, usando dados salvos');
          return { data: { user: savedUser }, error: null };
        }

        console.warn('⚠️  Endpoint de getUser não encontrado, mas token existe - usuário considerado autenticado');
        // Retornar sucesso mesmo sem dados do usuário, já que o token existe
        return { data: { user: { id: 'authenticated', authenticated: true } }, error: null };
      } catch (error: any) {
        console.warn('⚠️  Erro ao obter usuário:', error);
        // Tentar usar dados salvos
        const savedUser = getUserData();
        if (savedUser) {
          return { data: { user: savedUser }, error: null };
        }
        return { data: { user: null }, error: { message: error.message } };
      }
    },
    async signInWithOAuth(options: { provider: string; options?: { redirectTo?: string } }) {
      try {
        const redirectTo = options.options?.redirectTo || window.location.origin + '/auth/callback';
        window.location.href = `${RADB_URL}/auth/v1/oauth/${options.provider}?redirect_to=${encodeURIComponent(redirectTo)}`;
        return { error: null };
      } catch (error: any) {
        return { error: { message: error.message } };
      }
    },
  },
  storage: {
    from(bucket: string) {
      const token = getToken();
      return {
        async upload(path: string, file: File) {
          try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${RADB_URL}/storage/${bucket}/${path}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
              return { data: null, error: data };
            }

            return { data, error: null };
          } catch (error: any) {
            return { data: null, error: { message: error.message } };
          }
        },
        getPublicUrl(path: string) {
          const publicUrl = `${RADB_BASE_URL}/storage/v1/object/public/${bucket}/${path}`;
          return { data: { publicUrl } };
        },
        async download(path: string) {
          try {
            const response = await fetch(`${RADB_URL}/storage/${bucket}/${path}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              return { data: null, error: await response.json() };
            }

            const blob = await response.blob();
            return { data: blob, error: null };
          } catch (error: any) {
            return { data: null, error: { message: error.message } };
          }
        },
        async remove(paths: string[]) {
          try {
            const response = await fetch(`${RADB_URL}/storage/v1/object/${bucket}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paths),
            });

            const data = await response.json();

            if (!response.ok) {
              return { data: null, error: data };
            }

            return { data, error: null };
          } catch (error: any) {
            return { data: null, error: { message: error.message } };
          }
        },
      };
    },
  },
};

