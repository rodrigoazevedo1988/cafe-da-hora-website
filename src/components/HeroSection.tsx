import { useSection } from '@/hooks/useCMS';
import type { HeroSectionContent } from '@/types/cms';

const HeroSection = () => {
  const { data: section } = useSection('hero');
  const content = (section?.content as HeroSectionContent) || {
    title: 'O melhor café que você poderia tomar',
    subtitle: 'Descubra o sabor único do nosso café artesanal, preparado com grãos selecionados e torrefação especial para uma experiência inesquecível no Keys Café.',
    primaryButtonText: 'Experimente nossos deliciosos cafés',
    primaryButtonAction: '#products',
    secondaryButtonText: 'Saiba mais sobre nós',
    secondaryButtonAction: '#about',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
  };

  const scrollToSection = (action: string) => {
    const element = document.querySelector(action);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-coffee-100 dark:bg-coffee-950 transition-colors duration-300"
      role="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(139,69,19,0.5), rgba(139,69,19,0.3)), url('${content.backgroundImageUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80'}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-coffee-500 text-white px-4 py-2 rounded-md z-50"
      >
        Pular para o conteúdo principal
      </a>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg mb-6 animate-text-glow">
          <span className="inline-block opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>{content.title}</span>
        </h1>
        <p className="font-inter text-lg sm:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <button
            onClick={() => scrollToSection(content.primaryButtonAction)}
            className="group relative bg-coffee-500 hover:bg-coffee-600 text-white font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 shadow-lg hover:shadow-2xl btn-shimmer ripple overflow-hidden"
            aria-label={`${content.primaryButtonText} - ir para seção de produtos`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.primaryButtonText}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => scrollToSection(content.secondaryButtonAction)}
            className="group relative border-2 border-white text-white hover:bg-white hover:text-coffee-500 font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 hover:scale-110 hover:shadow-xl btn-shimmer ripple overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.secondaryButtonText}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
