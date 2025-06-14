
import AnimatedCoffeeIcon from "./AnimatedCoffeeIcon";
import { ArrowDown } from "lucide-react";

// Imagem de café quente para background
const coffeeBg =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

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
      // Usa imagem de fundo realista de café, overlay marrom translúcido suave por acessibilidade e branding.
      className="relative min-h-screen flex items-center justify-center bg-coffee-100"
      role="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(252,245,236,0.84), rgba(193,158,117,0.46)), url('${coffeeBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sobreposição escura suave extra se quiser mais contraste para o texto */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
      
      {/* Ícone animado café, centralizado acima do título */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10">
        <AnimatedCoffeeIcon />
      </div>

      {/* Skip Link para acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-coffee-500 text-white px-4 py-2 rounded-md z-50 animate-fade-in"
      >
        Pular para o conteúdo principal
      </a>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-hero font-bold text-coffee-800 drop-shadow-lg mb-6 animate-fade-slide-in animation-delay-200">
          O melhor café que você poderia tomar
        </h1>
        <p className="font-inter text-lg sm:text-xl lg:text-2xl text-coffee-900 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-slide-in animation-delay-400">
          Descubra o sabor único do nosso café artesanal, preparado com grãos selecionados
          e torrefação especial para uma experiência inesquecível no Keys Café.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-slide-in animation-delay-600">
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
          <ArrowDown className="h-7 w-7 text-coffee-700 animate-pulse" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
