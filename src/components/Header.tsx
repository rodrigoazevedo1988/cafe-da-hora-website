
import { useState, useEffect } from 'react';
import { Menu, Coffee, X, Moon, Sun } from 'lucide-react';
import { useSection } from '@/hooks/useCMS';
import type { HeaderSectionContent } from '@/types/cms';

const Header = () => {
  const { data: section } = useSection('header');
  const defaultContent: HeaderSectionContent = {
    logoText: 'Keys Café',
    menuItems: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre', href: '#about' },
      { label: 'Produtos', href: '#products' },
      { label: 'Depoimentos', href: '#testimonials' },
      { label: 'Contato', href: '#contact' },
    ],
  };
  const content = (section?.content as HeaderSectionContent) || defaultContent;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Aplica o tema salvo ao montar o componente
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (!theme && prefersDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  // Alternar tema (dark/light)
  const toggleTheme = () => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  const menuItems = content?.menuItems || defaultContent.menuItems || [];
  const navigationItems = menuItems.map(item => ({
    name: item.label || item.name || '',
    href: item.href || '#',
  }));

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-coffee-900 shadow-lg sticky top-0 z-50 animate-slide-down" role="banner">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Menu principal">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="bg-coffee-500 p-2 rounded-full hover:bg-coffee-600 dark:hover:bg-coffee-400 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <Coffee className="h-6 w-6 text-white animate-pulse" aria-hidden="true" />
            </div>
            {/* Nome da cafeteria CLIQUE PARA TOPO */}
            {content.logoUrl ? (
              <img
                src={content.logoUrl}
                alt={content.logoText}
                className="h-8 md:h-10"
              />
            ) : (
              <button
                onClick={() => scrollToSection('#home')}
                className="font-playfair text-2xl md:text-3xl font-bold text-black dark:!text-white hover:text-coffee-600 dark:hover:!text-coffee-200 transition-colors duration-300 bg-transparent border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-coffee-500 rounded"
                aria-label="Voltar ao início do site"
                style={{ padding: 0 }}
              >
                {content.logoText}
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={`nav-${item.name}-${index}`}
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 dark:text-gray-200 hover:text-coffee-500 dark:hover:text-coffee-300 font-inter font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 rounded-md px-2 py-1 hover:scale-110 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-500 dark:bg-coffee-300 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            {/* Switch de Tema */}
            <button
              className="ml-4 p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-coffee-800 focus:outline-none focus:ring-2 focus:ring-coffee-500 hover:scale-110"
              aria-label="Alternar tema claro/escuro"
              onClick={toggleTheme}
            >
              {dark ? (
                <Sun className="h-5 w-5 text-yellow-400 animate-spin-once" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5 text-coffee-600 dark:text-coffee-300 animate-bounce-subtle" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-coffee-500 dark:hover:text-coffee-300 hover:bg-gray-100 dark:hover:bg-coffee-800 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 animate-spin-once" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 animate-bounce-subtle" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4 animate-slide-down border-t border-gray-200 dark:border-coffee-700 mt-2"
          >
            <div className="flex flex-col space-y-2 pt-4">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-coffee-500 dark:hover:text-coffee-300 hover:bg-gray-50 dark:hover:bg-coffee-800 font-inter font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 rounded-md hover:translate-x-2 animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ))}
              {/* Theme switch on mobile menu */}
              <button
                className="mt-2 w-min px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-coffee-800 focus:outline-none focus:ring-2 focus:ring-coffee-500 hover:scale-110"
                aria-label="Alternar tema claro/escuro"
                onClick={toggleTheme}
              >
                {dark ? (
                  <Sun className="h-5 w-5 text-yellow-400 animate-spin-once" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5 text-coffee-600 dark:text-coffee-300 animate-bounce-subtle" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
