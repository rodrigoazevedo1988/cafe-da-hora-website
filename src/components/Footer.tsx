
import React from 'react';

const Footer = () => (
  <footer className="py-8 bg-navy-900 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="font-playfair text-2xl cursor-pointer hover:text-coffee-300 transition-colors duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Keys Café
        </span>
      </div>
      <nav className="flex space-x-6">
        <a href="#home" className="hover:underline">Início</a>
        <a href="#about" className="hover:underline">Sobre</a>
        <a href="#products" className="hover:underline">Produtos</a>
        <a href="#testimonials" className="hover:underline">Depoimentos</a>
        <a href="#contact" className="hover:underline">Contato</a>
      </nav>
      <div className="mt-4 md:mt-0">
        <span className="text-sm">&copy; {new Date().getFullYear()} Keys Café. Todos os direitos reservados.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
