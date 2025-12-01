import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Coffee,
  Users,
  FileText,
  Image,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Admin = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Home, label: 'Hero', path: '/admin/sections/hero' },
    { icon: FileText, label: 'Sobre', path: '/admin/sections/about' },
    { icon: Coffee, label: 'Produtos', path: '/admin/products' },
    { icon: Users, label: 'Depoimentos', path: '/admin/testimonials' },
    { icon: FileText, label: 'Contato', path: '/admin/sections/contact' },
    { icon: Settings, label: 'Header', path: '/admin/sections/header' },
    { icon: Settings, label: 'Footer', path: '/admin/sections/footer' },
  ];

  return (
    <div className="min-h-screen bg-coffee-50 dark:bg-coffee-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-coffee-900 border-r border-coffee-200 dark:border-coffee-800 min-h-screen sticky top-0">
          <div className="p-6 border-b border-coffee-200 dark:border-coffee-800">
            <h1 className="text-2xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
              Keys Café CMS
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {user?.email}
            </p>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-coffee-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-coffee-100 dark:hover:bg-coffee-800'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;

