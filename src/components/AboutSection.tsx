import React from 'react';

const AboutSection = () => (
  <section
    id="about"
    className="py-20 md:py-32 bg-coffee-100 relative animate-fade-in-on-scroll"
    aria-labelledby="about-title"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2
        id="about-title"
        className="font-playfair text-3xl lg:text-section-title font-bold text-coffee-600 mb-6 animate-fade-slide-in"
      >
        Sobre o Keys Café
      </h2>
      <p className="font-inter text-lg text-gray-700 mx-auto mb-8 max-w-2xl leading-relaxed animate-fade-slide-in animation-delay-200">
        Tradicional, acolhedor e inovador: somos apaixonados por café e por criar experiências únicas.
        Desde o aroma fresco da manhã até aquele espresso perfeito para encerrar o dia, o Keys Café é seu lugar para momentos especiais.
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <div className="flex-1 animate-fade-slide-in animation-delay-400">
          <strong className="text-3xl text-coffee-500 block font-playfair mb-2 animate-count-up-highlight">+10</strong>
          <span className="text-gray-800 font-inter font-semibold">anos de tradição</span>
        </div>
        <div className="flex-1 animate-fade-slide-in animation-delay-600">
          <strong className="text-3xl text-coffee-500 block font-playfair mb-2 animate-count-up-highlight">+50</strong>
          <span className="text-gray-800 font-inter font-semibold">cafés e receitas</span>
        </div>
        <div className="flex-1 animate-fade-slide-in animation-delay-800">
          <strong className="text-3xl text-coffee-500 block font-playfair mb-2 animate-count-up-highlight">+4.5</strong>
          <span className="text-gray-800 font-inter font-semibold">de avaliação</span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
