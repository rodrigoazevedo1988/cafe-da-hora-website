
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => (
  <footer className="py-10 bg-coffee-500 border-t-4 border-coffee-700">
    <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col mb-6 md:mb-0">
        <span className="font-playfair text-3xl text-white mb-2">Keys Café</span>
        <span className="text-coffee-200 text-base">Rua dos Grãos, 123, Centro</span>
        <span className="text-coffee-200 text-base">Sua Cidade, Brasil</span>
        <span className="text-coffee-300 text-xs mt-2">
          Aberto: Seg a Sáb <b>08h-19h</b>. Dom <b>09h-13h</b>
        </span>
        <span className="text-coffee-300 text-xs">WhatsApp: (99) 99999-9999</span>
      </div>
      <div className="flex flex-col items-start md:items-end">
        <nav className="flex flex-wrap gap-x-8 gap-y-2 mb-3">
          <a href="#home" className="text-white text-lg hover:underline">Início</a>
          <a href="#about" className="text-white text-lg hover:underline">Sobre</a>
          <a href="#products" className="text-white text-lg hover:underline">Produtos</a>
          <a href="#testimonials" className="text-white text-lg hover:underline">Depoimentos</a>
          <a href="#contact" className="text-white text-lg hover:underline">Contato</a>
        </nav>
        <div className="flex gap-4 mb-2">
          <a href="#" title="Instagram" className="text-white hover:text-coffee-100 transition"><Instagram className="w-6 h-6" /></a>
          <a href="#" title="Facebook" className="text-white hover:text-coffee-100 transition"><Facebook className="w-6 h-6" /></a>
          <a href="#" title="Youtube" className="text-white hover:text-coffee-100 transition"><Youtube className="w-6 h-6" /></a>
        </div>
        <div className="text-coffee-100 text-xs md:text-right">
          © {new Date().getFullYear()} Keys Café. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
