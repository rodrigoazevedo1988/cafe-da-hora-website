import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        // Mensagens mais específicas para diferentes tipos de erro
        let errorMessage = error.message || 'Erro ao fazer login';
        
        if (error.message?.includes('CORS')) {
          errorMessage = 'Erro de configuração do servidor. Entre em contato com o suporte.';
        } else if (error.statusCode === 409 || error.message?.includes('já está em uso') || error.message?.includes('already')) {
          errorMessage = 'Este e-mail já está cadastrado. Tente fazer login.';
        } else if (error.statusCode === 401 || error.message?.includes('credenciais') || error.message?.includes('invalid')) {
          errorMessage = 'E-mail ou senha incorretos.';
        }
        
        toast.error(errorMessage);
        return;
      }

      toast.success(isSignUp ? 'Conta criada com sucesso!' : 'Login realizado com sucesso!');
      navigate('/admin');
    } catch (error: any) {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50 dark:bg-coffee-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-coffee-500 p-3 rounded-full">
              <Coffee className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-playfair">Keys Café CMS</CardTitle>
          <CardDescription>
            {isSignUp ? 'Crie sua conta para acessar o CMS' : 'Faça login para acessar o CMS'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••"
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-coffee-500 hover:bg-coffee-600"
              disabled={loading}
            >
              {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-coffee-600 dark:text-coffee-400 hover:underline"
            >
              {isSignUp
                ? 'Já tem uma conta? Faça login'
                : 'Não tem uma conta? Criar conta'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

