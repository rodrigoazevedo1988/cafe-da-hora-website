
import AnimatedCoffeeIcon from "./AnimatedCoffeeIcon";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-coffee-50 to-coffee-100"
      role="banner"
    >
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1920&h=1080&fit=crop&auto=format&q=80')`
        }}
        aria-hidden="true"
      />

      {/* Skip Link para Acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-coffee-500 text-white px-4 py-2 rounded-md z-50 animate-fade-in"
      >
        Pular para o conteúdo principal
      </a>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ícone animado de café */}
        <div className="flex justify-center mb-4">
          <AnimatedCoffeeIcon />
        </div>

        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-hero font-bold text-coffee-500 mb-6 animate-fade-slide-in">
          O melhor café que você poderia tomar
        </h1>

        <p className="font-inter text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-slide-in animation-delay-200">
          Descubra o sabor único do nosso café artesanal, preparado com grãos selecionados
          e torrefação especial para uma experiência inesquecível no Keys Café.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-slide-in animation-delay-400">
          <button
            onClick={scrollToProducts}
            className="bg-coffee-500 hover:bg-coffee-600 text-white font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 shadow-lg animate-pulse-glow hover:animate-none"
            aria-label="Experimente nossos deliciosos cafés - ir para seção de produtos"
          >
            Experimente nossos deliciosos cafés
          </button>

          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-coffee-500 text-coffee-500 hover:bg-coffee-500 hover:text-white font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 hover:scale-105 animate-border-dance"
          >
            Saiba mais sobre nós
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ArrowDown className="h-6 w-6 text-coffee-500 animate-pulse" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
