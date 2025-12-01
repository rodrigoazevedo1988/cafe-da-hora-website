import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Home,
  FileText,
  Coffee,
  Users,
  Settings,
} from 'lucide-react';
import { useProducts } from '@/hooks/useCMS';
import { useTestimonials } from '@/hooks/useCMS';

const Dashboard = () => {
  const { data: products = [] } = useProducts(true);
  const { data: testimonials = [] } = useTestimonials(true);

  const stats = [
    {
      title: 'Produtos',
      value: products.length,
      icon: Coffee,
      link: '/admin/products',
      color: 'text-coffee-500',
    },
    {
      title: 'Depoimentos',
      value: testimonials.length,
      icon: Users,
      link: '/admin/testimonials',
      color: 'text-blue-500',
    },
  ];

  const sections = [
    { name: 'Hero', path: '/admin/sections/hero', icon: Home },
    { name: 'Sobre', path: '/admin/sections/about', icon: FileText },
    { name: 'Contato', path: '/admin/sections/contact', icon: FileText },
    { name: 'Header', path: '/admin/sections/header', icon: Settings },
    { name: 'Footer', path: '/admin/sections/footer', icon: Settings },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie o conteúdo do seu site
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{stat.title}</CardTitle>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Sections */}
      <div>
        <h2 className="text-xl font-semibold text-coffee-600 dark:text-coffee-300 mb-4">
          Seções do Site
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.path} to={section.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-coffee-500" />
                      <CardTitle>{section.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Editar conteúdo da seção</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

