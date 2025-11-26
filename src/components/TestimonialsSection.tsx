
import React from 'react';

// Ajuste na foto da Ana Clara
const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    feedback: 'Um lugar incrível! O Keys Café tem os melhores grãos que já provei. Atendimento impecável e ambiente super aconchegante. Recomendo para todos os amantes de café!',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=facearea&facepad=2&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'João Pereira',
    feedback: 'O melhor cappuccino que já tomei! O Keys Café superou minhas expectativas. Ambiente agradável e serviço de alta qualidade.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=facearea&facepad=2&q=80',
    rating: 4,
  },
  {
    id: 3,
    name: 'Ana Clara',
    feedback: 'Adoro o ambiente do Keys Café! Perfeito para relaxar e saborear um bom café. Os funcionários são muito atenciosos e os produtos de alta qualidade.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=facearea&facepad=2&q=80',
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-white dark:bg-coffee-900 transition-colors duration-300" aria-labelledby="testimonials-title">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 id="testimonials-title" className="font-playfair text-3xl lg:text-section-title font-bold text-coffee-600 dark:text-coffee-300 mb-12 animate-fade-slide-in text-gradient">
        Depoimentos
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-slide-in">
        {testimonials.map((testimonial, idx) => (
          <div key={testimonial.id} className="card-hover bg-coffee-50 dark:bg-coffee-800 rounded-lg shadow-md p-8 flex flex-col items-center animate-fade-slide-in cursor-default" style={{animationDelay: `${idx * 140}ms`}}>
            <img
              src={testimonial.image}
              alt={`Foto de ${testimonial.name}`}
              className="w-20 h-20 object-cover rounded-full border-4 border-coffee-400 mb-4 animate-fade-in"
              loading="lazy"
              width="80"
              height="80"
            />
            <p className="italic text-coffee-700 dark:text-coffee-200 mb-3 animate-fade-slide-in animation-delay-300">&quot;{testimonial.feedback}&quot;</p>
            <span className="text-coffee-800 dark:text-coffee-100 font-semibold animate-fade-slide-in animation-delay-400">{testimonial.name}</span>
            <div className="flex mt-2 animate-fade-in">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} width="18" height="18" fill="#E7B07B" viewBox="0 0 24 24"><path d="M12 17.75l-6.517 4.02 1.71-7.337-5.445-4.69 7.395-.621L12 2.5l2.857 6.623 7.395.621-5.445 4.69 1.71 7.337z"/></svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
