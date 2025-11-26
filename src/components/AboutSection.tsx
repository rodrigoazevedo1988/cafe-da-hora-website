
import React, { useRef, useEffect, useState } from 'react';

// Hook animador dos big numbers
function useAnimatedCountUp(to: number, duration = 1200, decimal = false) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let raf: number;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          
          function step(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            let value = decimal
              ? +(progress * to)
              : Math.floor(progress * to);

            if (ref.current) {
              ref.current.innerText = decimal ? value.toFixed(1) : `${value}`;
            }
            if (progress < 1) {
              raf = requestAnimationFrame(step);
            } else if (ref.current) {
              ref.current.innerText = decimal ? to.toFixed(1) : `${to}`;
            }
          }
          raf = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      observer.disconnect();
    };
  }, [to, duration, decimal, hasAnimated]);

  return ref;
}

const AboutSection = () => {
  const anosRef = useAnimatedCountUp(10, 1500);
  const cafesRef = useAnimatedCountUp(50, 1400);
  const avaliacaoRef = useAnimatedCountUp(4.5, 1800, true);

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-coffee-100 dark:bg-coffee-900 relative transition-colors duration-300"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="about-title"
          className="font-playfair text-3xl lg:text-section-title font-bold text-coffee-600 dark:text-coffee-300 mb-6 opacity-0 animate-fade-in text-gradient"
          style={{ animationFillMode: 'forwards' }}
        >
          Sobre o Keys Café
        </h2>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-200 mx-auto mb-8 max-w-2xl leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Tradicional, acolhedor e inovador: somos apaixonados por café e por criar experiências únicas.
          Desde o aroma fresco da manhã até aquele espresso perfeito para encerrar o dia, o Keys Café é seu lugar para momentos especiais.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="flex-1 opacity-0 animate-fade-in hover-lift cursor-default" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <strong className="text-3xl text-coffee-500 dark:text-coffee-400 block font-playfair mb-2 hover:scale-110 transition-transform inline-block">
              +<span ref={anosRef}>10</span>
            </strong>
            <span className="text-gray-800 dark:text-gray-200 font-inter font-semibold">anos de tradição</span>
          </div>
          <div className="flex-1 opacity-0 animate-fade-in hover-lift cursor-default" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <strong className="text-3xl text-coffee-500 dark:text-coffee-400 block font-playfair mb-2 hover:scale-110 transition-transform inline-block">
              +<span ref={cafesRef}>50</span>
            </strong>
            <span className="text-gray-800 dark:text-gray-200 font-inter font-semibold">cafés e receitas</span>
          </div>
          <div className="flex-1 opacity-0 animate-fade-in hover-lift cursor-default" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <strong className="text-3xl text-coffee-500 dark:text-coffee-400 block font-playfair mb-2 hover:scale-110 transition-transform inline-block">
              +<span ref={avaliacaoRef}>4.5</span>
            </strong>
            <span className="text-gray-800 dark:text-gray-200 font-inter font-semibold">de avaliação</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
