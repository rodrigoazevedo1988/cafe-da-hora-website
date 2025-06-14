
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      location: 'São Paulo, SP',
      rating: 5,
      comment: 'O melhor café que já tomei na vida! O ambiente do Keys Café é acolhedor e o atendimento é excepcional. Recomendo a todos!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format&q=80'
    },
    {
      id: 2,
      name: 'João Santos',
      location: 'Rio de Janeiro, RJ',
      rating: 5,
      comment: 'Keys Café realmente faz jus ao nome! A qualidade dos grãos é impressionante e você sente a diferença em cada gole.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80'
    },
    {
      id: 3,
      name: 'Ana Costa',
      location: 'Belo Horizonte, MG',
      rating: 5,
      comment: 'Lugar perfeito para trabalhar ou encontrar amigos. O cappuccino artesanal do Keys Café é uma obra de arte e o sabor é divino!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=80'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current animate-star-twinkle' : 'text-gray-300'} transition-all duration-300`}
        style={{ animationDelay: `${index * 0.2}s` }}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white animate-fade-in-on-scroll" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 
            id="testimonials-title"
            className="font-playfair text-3xl lg:text-section-title font-semibold text-coffee-500 mb-6 animate-typing"
          >
            O que nossos clientes dizem
          </h2>
          <p className="font-inter text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            A satisfação dos nossos clientes é nossa maior recompensa. Veja o que eles têm a dizer 
            sobre a experiência no Keys Café.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article 
              key={testimonial.id}
              className="bg-coffee-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up hover:animate-float"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center mb-4 animate-slide-in-left" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <blockquote className="font-inter text-gray-700 mb-6 leading-relaxed animate-fade-in-up animation-delay-300">
                "{testimonial.comment}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center animate-slide-in-right animation-delay-400">
                <img
                  src={testimonial.avatar}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover mr-4 hover:scale-110 transition-transform duration-300 animate-fade-in"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div>
                  <cite className="font-inter font-semibold text-gray-900 not-italic hover:text-coffee-500 transition-colors duration-300">
                    {testimonial.name}
                  </cite>
                  <p className="font-inter text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { number: '15+', label: 'Anos de tradição' },
            { number: '50k+', label: 'Clientes satisfeitos' },
            { number: '200+', label: 'Tipos de café' },
            { number: '4.9★', label: 'Avaliação média' }
          ].map((stat, index) => (
            <div key={index} className="animate-fade-in-up hover:animate-bounce-subtle" style={{ animationDelay: `${600 + index * 100}ms` }}>
              <div className="font-playfair text-4xl lg:text-5xl font-bold text-coffee-500 mb-2 animate-count-up hover:animate-pulse">
                {stat.number}
              </div>
              <div className="font-inter text-gray-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
