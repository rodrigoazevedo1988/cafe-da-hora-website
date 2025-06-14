
import React from 'react';

const Footer = () => (
  <footer className="py-7 bg-coffee-500">
    <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="font-playfair text-3xl text-white mr-8">Keys Café</span>
        <nav className="flex space-x-8">
          <a href="#home" className="text-white text-lg hover:underline">Início</a>
          <a href="#about" className="text-white text-lg hover:underline">Sobre</a>
          <a href="#products" className="text-white text-lg hover:underline">Produtos</a>
          <a href="#testimonials" className="text-white text-lg hover:underline">Depoimentos</a>
          <a href="#contact" className="text-white text-lg hover:underline">Contato</a>
        </nav>
      </div>
      <div className="text-white text-base mt-2 md:mt-0">
        © {new Date().getFullYear()} Keys Café. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
