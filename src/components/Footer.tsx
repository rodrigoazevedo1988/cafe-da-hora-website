
import React from 'react';

const Footer = () => (
  <footer className="py-8 bg-coffee-500">
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
      <div className="text-white text-base mt-2 md:mt-0 md:text-right">
        <div>© {new Date().getFullYear()} Keys Café. Todos os direitos reservados.</div>
        <div className="text-xs text-coffee-200">
          Rua dos Grãos, 123, Centro – Sua Cidade, Brasil &middot; WhatsApp: (99) 99999-9999
        </div>
        <div className="text-xs text-coffee-200">
          Aberto de segunda a sábado, das 8h às 19h. Domingo das 9h às 13h.
        </div>
        <div className="text-xs mt-1 text-coffee-300">Siga a gente:
          <a href="#" className="ml-1 underline text-white hover:text-coffee-100">Instagram</a> &middot;
          <a href="#" className="ml-1 underline text-white hover:text-coffee-100">Facebook</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
