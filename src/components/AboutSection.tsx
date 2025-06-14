
import { Coffee, Star, Clock } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Grãos Selecionados',
      description: 'Trabalhamos apenas com os melhores grãos, cuidadosamente selecionados de fazendas brasileiras.'
    },
    {
      icon: Star,
      title: 'Qualidade Premium',
      description: 'Nosso compromisso é oferecer sempre a mais alta qualidade em cada xícara servida.'
    },
    {
      icon: Clock,
      title: 'Tradição e Inovação',
      description: 'Combinamos métodos tradicionais com técnicas modernas para criar sabores únicos.'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white animate-fade-in-on-scroll" aria-labelledby="about-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h2 
                id="about-title"
                className="font-playfair text-3xl lg:text-section-title font-semibold text-coffee-500 mb-6 animate-fade-in-up"
              >
                Sobre o Keys Café
              </h2>
              <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6 animate-fade-in-up animation-delay-200">
                Há mais de 15 anos, o Keys Café tem sido o ponto de encontro dos amantes de café. 
                Nossa paixão pela bebida nos levou a criar um espaço único, onde cada detalhe é 
                pensado para proporcionar a melhor experiência possível.
              </p>
              <p className="font-inter text-lg text-gray-700 leading-relaxed animate-fade-in-up animation-delay-400">
                Desde a seleção criteriosa dos grãos até o momento em que o café chega à sua mesa, 
                cada etapa é cuidadosamente executada por nossa equipe de especialistas. Nosso objetivo 
                é simples: servir o melhor café que você já experimentou.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 animate-fade-in-up hover:animate-scale-up transition-all duration-300" style={{ animationDelay: `${600 + index * 200}ms` }}>
                  <div className="bg-coffee-100 p-3 rounded-full flex-shrink-0 hover:bg-coffee-200 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    <feature.icon className="h-6 w-6 text-coffee-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2 hover:text-coffee-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=800&fit=crop&auto=format&q=80"
              alt="Interior acolhedor do Keys Café com mesas de madeira e decoração rústica"
              className="rounded-lg shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-500 animate-fade-in"
              loading="lazy"
              width="600"
              height="800"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/20 to-transparent rounded-lg animate-gradient-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
