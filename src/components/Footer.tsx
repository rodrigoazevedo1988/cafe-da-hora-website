
import { Coffee, Facebook, Instagram, Youtube, MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Produtos', href: '#products' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' }
  ];

  const services = [
    'Café Artesanal',
    'Eventos Privados',
    'Cursos de Barista',
    'Delivery',
    'Catering'
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/keyscafe',
      ariaLabel: 'Visite nossa página no Facebook'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/keyscafe',
      ariaLabel: 'Siga-nos no Instagram'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/keyscafe',
      ariaLabel: 'Assista nossos vídeos no YouTube'
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-coffee-900 text-white animate-fade-in-on-scroll" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 animate-slide-in-left">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-coffee-500 p-2 rounded-full hover:bg-coffee-400 transition-all duration-300 hover:scale-110 animate-pulse-subtle">
                <Coffee className="h-6 w-6 text-white animate-spin-slow" aria-hidden="true" />
              </div>
              <h3 className="font-playfair text-2xl font-bold hover:text-coffee-300 transition-colors duration-300">Keys Café</h3>
            </div>
            <p className="font-inter text-coffee-200 leading-relaxed mb-6 animate-fade-in-up animation-delay-200">
              Há mais de 15 anos servindo o melhor café artesanal da cidade. 
              Qualidade, tradição e sabor em cada xícara.
            </p>
            
            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-inter font-semibold text-lg mb-3 animate-fade-in-up animation-delay-300">Redes Sociais</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-coffee-800 hover:bg-coffee-700 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-coffee-900 hover:scale-110 animate-bounce-subtle"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="h-5 w-5 hover:animate-spin-once" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in-up animation-delay-200">
            <h4 className="font-inter font-semibold text-lg mb-6 animate-fade-in-up">Links Rápidos</h4>
            <nav aria-label="Links rápidos do footer">
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name} className="animate-fade-in-left" style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="font-inter text-coffee-200 hover:text-white transition-all duration-300 focus:outline-none focus:underline hover:translate-x-2"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="animate-slide-in-up animation-delay-400">
            <h4 className="font-inter font-semibold text-lg mb-6 animate-fade-in-up">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service} className="font-inter text-coffee-200 hover:text-white transition-colors duration-300 animate-fade-in-left" style={{ animationDelay: `${500 + index * 100}ms` }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-in-right animation-delay-600">
            <h4 className="font-inter font-semibold text-lg mb-6 animate-fade-in-up">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 animate-fade-in-up animation-delay-700">
                <MapPin className="h-5 w-5 text-coffee-400 mt-1 flex-shrink-0 animate-bounce-subtle" aria-hidden="true" />
                <address className="font-inter text-coffee-200 not-italic">
                  Rua dos Cafés, 123<br />
                  Vila Madalena, São Paulo - SP<br />
                  CEP: 05433-100
                </address>
              </div>
              
              <div className="flex items-center space-x-3 animate-fade-in-up animation-delay-800">
                <Phone className="h-5 w-5 text-coffee-400 flex-shrink-0 animate-wiggle" aria-hidden="true" />
                <div className="font-inter text-coffee-200">
                  <a href="tel:+5511999999999" className="hover:text-white transition-colors duration-300">
                    (11) 99999-9999
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-fade-in-up animation-delay-900">
                <Clock className="h-5 w-5 text-coffee-400 mt-1 flex-shrink-0 animate-spin-slow" aria-hidden="true" />
                <div className="font-inter text-coffee-200">
                  <p>Seg - Sex: 7h às 19h</p>
                  <p>Sáb - Dom: 8h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-coffee-800 py-8 animate-fade-in-up animation-delay-1000">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-inter text-coffee-300 text-center md:text-left">
              <p>&copy; 2024 Keys Café. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="font-inter text-coffee-300 hover:text-white transition-colors focus:outline-none focus:underline hover:animate-pulse">
                Política de Privacidade
              </a>
              <a href="#" className="font-inter text-coffee-300 hover:text-white transition-colors focus:outline-none focus:underline hover:animate-pulse">
                Termos de Uso
              </a>
              <a href="/sitemap.xml" className="font-inter text-coffee-300 hover:text-white transition-colors focus:outline-none focus:underline hover:animate-pulse">
                Mapa do Site
              </a>
            </div>
          </div>
          
          {/* Credits */}
          <div className="mt-4 text-center animate-fade-in-up animation-delay-1200">
            <p className="font-inter text-coffee-400 text-sm animate-pulse-subtle">
              Desenvolvido com ❤️ para os amantes de café
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
