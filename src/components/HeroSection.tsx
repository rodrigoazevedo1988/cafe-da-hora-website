
import { Coffee } from "lucide-react";

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
      className="relative min-h-screen flex items-center justify-center bg-coffee-100"
      role="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(139,69,19,0.4), rgba(139,69,19,0.2)), url('/lovable-uploads/0dd1a5ee-2e2d-45f2-9abe-805bc3c0d8b4.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-coffee-500 text-white px-4 py-2 rounded-md z-50"
      >
        Pular para o conteúdo principal
      </a>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-hero font-bold text-white drop-shadow-lg mb-6 opacity-0 animate-fade-in">
          O melhor café que você poderia tomar
        </h1>
        <p className="font-inter text-lg sm:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Descubra o sabor único do nosso café artesanal, preparado com grãos selecionados
          e torrefação especial para uma experiência inesquecível no Keys Café.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <button
            onClick={scrollToProducts}
            className="bg-coffee-500 hover:bg-coffee-600 text-white font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 shadow-lg"
            aria-label="Experimente nossos deliciosos cafés - ir para seção de produtos"
          >
            Experimente nossos deliciosos cafés
          </button>
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white hover:bg-white hover:text-coffee-500 font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 hover:scale-105"
          >
            Saiba mais sobre nós
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
