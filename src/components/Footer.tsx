
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useSection } from '@/hooks/useCMS';
import type { FooterSectionContent } from '@/types/cms';

const Footer = () => {
  const { data: section } = useSection('footer');
  const defaultContent: FooterSectionContent = {
    description: '',
    address: 'Rua dos Grãos, 123, Centro\nSua Cidade, Brasil',
    phone: '(99) 99999-9999',
    email: 'contato@keyscafe.com.br',
    copyright: `© ${new Date().getFullYear()} Keys Café. Todos os direitos reservados.`,
    socialLinks: [],
    links: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre', href: '#about' },
      { label: 'Produtos', href: '#products' },
      { label: 'Depoimentos', href: '#testimonials' },
      { label: 'Contato', href: '#contact' },
    ],
  };
  
  const sectionContent = section?.content as FooterSectionContent | undefined;
  const content: FooterSectionContent = {
    description: sectionContent?.description || defaultContent.description,
    address: sectionContent?.address || defaultContent.address,
    phone: sectionContent?.phone || defaultContent.phone,
    email: sectionContent?.email || defaultContent.email,
    copyright: sectionContent?.copyright || defaultContent.copyright,
    socialLinks: sectionContent?.socialLinks || defaultContent.socialLinks,
    links: sectionContent?.links || defaultContent.links,
  };

  return (
  <footer className="py-10 bg-coffee-500 border-t-4 border-coffee-700">
    <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col mb-6 md:mb-0">
        <span className="font-playfair text-3xl text-white mb-2">Keys Café</span>
        {content.description && (
          <p className="text-coffee-200 text-sm mb-2">{content.description}</p>
        )}
        <span className="text-coffee-200 text-base whitespace-pre-line">{content.address}</span>
        <span className="text-coffee-300 text-xs mt-2">Telefone: {content.phone}</span>
        <span className="text-coffee-300 text-xs">E-mail: {content.email}</span>
      </div>
      <div className="flex flex-col items-start md:items-end">
        <nav className="flex flex-wrap gap-x-8 gap-y-2 mb-3">
          {(content.links || []).map((link) => (
            <a key={link.href} href={link.href} className="text-white text-lg hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        {(content.socialLinks || []).length > 0 && (
          <div className="flex gap-4 mb-2">
            {(content.socialLinks || []).map((social) => {
              const platform = social.platform.toLowerCase();
              const Icon = platform.includes('instagram') ? Instagram : 
                          platform.includes('facebook') ? Facebook : 
                          platform.includes('youtube') ? Youtube : Instagram;
              return (
                <a
                  key={social.url}
                  href={social.url}
                  title={social.platform}
                  className="text-white hover:text-coffee-100 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        )}
        <div className="text-coffee-100 text-xs md:text-right">
          {content.copyright || `© ${new Date().getFullYear()} Keys Café. Todos os direitos reservados.`}
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
