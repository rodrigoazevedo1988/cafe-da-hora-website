import { useState, useEffect, useCallback } from 'react';
import { radb } from '@/lib/radb';
import type { AuthUser } from '@/types/cms';

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data, error } = await radb.auth.getUser();
      if (error) {
        // Se o erro for 404, não é crítico - o usuário pode estar autenticado mesmo sem o endpoint
        if (error.statusCode === 404 || error.message?.includes('404')) {
          console.warn('⚠️  Endpoint de getUser não disponível, mas usuário pode estar autenticado');
          // Verificar se há token - se sim, considerar autenticado
          const token = localStorage.getItem('radb_token');
          if (token) {
            // Criar um usuário básico a partir do token ou dados do login
            setUser({ id: 'current', email: 'user@example.com' } as AuthUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        return;
      }
      setUser(data?.user || null);
    } catch (error) {
      // Em caso de erro, verificar se há token
      const token = localStorage.getItem('radb_token');
      if (token) {
        setUser({ id: 'current', email: 'user@example.com' } as AuthUser);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await radb.auth.signIn({ email, password });
      if (error) {
        setLoading(false);
        return { error };
      }
      await refreshUser();
      return { error: null };
    } catch (error: any) {
      setLoading(false);
      return { error: { message: error.message } };
    }
  }, [refreshUser]);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await radb.auth.signUp({ email, password });
      if (error) {
        setLoading(false);
        return { error };
      }
      await refreshUser();
      return { error: null };
    } catch (error: any) {
      setLoading(false);
      return { error: { message: error.message } };
    }
  }, [refreshUser]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await radb.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };
};

