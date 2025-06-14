
import { useState } from 'react';
import { Menu, Coffee, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Produtos', href: '#products' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 animate-slide-down" role="banner">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Menu principal">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="bg-coffee-500 p-2 rounded-full hover:bg-coffee-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <Coffee className="h-6 w-6 text-white animate-pulse" aria-hidden="true" />
            </div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-coffee-500 hover:text-coffee-600 transition-colors duration-300">
              Keys Café
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-coffee-500 font-inter font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 rounded-md px-2 py-1 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-coffee-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
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
            className="md:hidden pb-4 animate-slide-down"
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-2 text-gray-700 hover:text-coffee-500 hover:bg-gray-50 font-inter font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 rounded-md hover:translate-x-2 animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
