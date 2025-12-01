// Cliente RaDB para backend/admin (service role key)
const RADB_URL = import.meta.env.VITE_RADB_URL || import.meta.env.NEXT_PUBLIC_RADB_URL || '';
const RADB_SERVICE_ROLE_KEY = import.meta.env.VITE_RADB_SERVICE_ROLE_KEY || import.meta.env.RADB_SERVICE_ROLE_KEY || '';

// Reutilizar a mesma estrutura do radb.ts mas com service role key
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
    this.params.set('select', columns);
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
      const url = `${RADB_URL}/rest/v1/${this.table}${this.params.toString() ? `?${this.params.toString()}` : ''}`;
      
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
      let url = `${RADB_URL}/api/${this.table}`;
      
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
      let url = `${RADB_URL}/api/${this.table}`;
      
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

interface RaDBAdminClient {
  from(table: string): {
    select(columns?: string): QueryBuilder;
    insert(data: any): InsertBuilder;
    update(data: any): UpdateBuilder;
    delete(): DeleteBuilder;
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

export const radbAdmin: RaDBAdminClient = {
  from(table: string) {
    return {
      select(columns?: string): QueryBuilder {
        const builder = new RaDBQueryBuilder(table, RADB_SERVICE_ROLE_KEY);
        if (columns) {
          builder.select(columns);
        }
        return builder;
      },
      insert(data: any): InsertBuilder {
        return new RaDBInsertBuilder(table, data, RADB_SERVICE_ROLE_KEY);
      },
      update(data: any): UpdateBuilder {
        return new RaDBUpdateBuilder(table, data, RADB_SERVICE_ROLE_KEY);
      },
      delete(): DeleteBuilder {
        return new RaDBDeleteBuilder(table, RADB_SERVICE_ROLE_KEY);
      },
    };
  },
  storage: {
    from(bucket: string) {
      return {
        async upload(path: string, file: File) {
          try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${RADB_URL}/storage/v1/object/${bucket}/${path}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${RADB_SERVICE_ROLE_KEY}`,
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
          const publicUrl = `${RADB_URL}/storage/v1/object/public/${bucket}/${path}`;
          return { data: { publicUrl } };
        },
        async download(path: string) {
          try {
            const response = await fetch(`${RADB_URL}/storage/v1/object/${bucket}/${path}`, {
              headers: {
                'Authorization': `Bearer ${RADB_SERVICE_ROLE_KEY}`,
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
                'Authorization': `Bearer ${RADB_SERVICE_ROLE_KEY}`,
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

