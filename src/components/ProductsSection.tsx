
import { ShoppingCart } from 'lucide-react';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Café Especial da Casa',
      description: 'Blend exclusivo com notas de chocolate e caramelo, perfeito para começar o dia.',
      price: 'R$ 8,50',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Cafés'
    },
    {
      id: 2,
      name: 'Cappuccino Artesanal',
      description: 'Espresso encorpado com leite cremoso e espuma aveludada, finalizado com arte latte.',
      price: 'R$ 7,00',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Bebidas'
    },
    {
      id: 3,
      name: 'Torta de Café',
      description: 'Sobremesa tradicional da casa, feita com café especial e cobertura cremosa.',
      price: 'R$ 12,00',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Doces'
    },
    {
      id: 4,
      name: 'Pão de Açúcar',
      description: 'Pão artesanal fresquinho, perfeito para acompanhar nossos cafés especiais.',
      price: 'R$ 5,00',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Pães'
    },
    {
      id: 5,
      name: 'Cold Brew Premium',
      description: 'Café extraído a frio por 12 horas, resultando em sabor suave e refrescante.',
      price: 'R$ 9,00',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Bebidas'
    },
    {
      id: 6,
      name: 'Cookies de Café',
      description: 'Cookies crocantes com pedaços de café e chocolate, ideais para um lanche.',
      price: 'R$ 4,50',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Doces'
    }
  ];

  return (
    <section id="products" className="py-16 lg:py-24 bg-coffee-50" aria-labelledby="products-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-slide-in">
          <h2
            id="products-title"
            className="font-playfair text-3xl lg:text-section-title font-semibold text-coffee-500 mb-6 animate-fade-slide-in"
          >
            Nossos Produtos
          </h2>
          <p className="font-inter text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-slide-in animation-delay-200">
            Descubra nossa seleção cuidadosamente preparada de cafés especiais, bebidas artesanais 
            e deliciosos acompanhamentos, todos feitos com ingredientes de primeira qualidade no Keys Café.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-fade-slide-in hover:scale-105"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.description}`}
                  className="w-full h-48 object-cover group-hover:brightness-105 transition-transform duration-500 animate-fade-in"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="absolute top-4 left-4 animate-fade-in">
                  <span className="bg-coffee-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium animate-pulse-subtle">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3 group-hover:text-coffee-500 transition-colors duration-300 animate-fade-slide-in">
                  {product.name}
                </h3>
                <p className="font-inter text-gray-700 mb-4 leading-relaxed group-hover:text-gray-900 transition-colors duration-300 animate-fade-slide-in animation-delay-300">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-inter text-2xl font-bold text-coffee-500 animate-price-highlight">
                    {product.price}
                  </span>
                  <button
                    className="bg-coffee-500 hover:bg-coffee-600 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 hover:scale-110 animate-bounce-subtle"
                    aria-label={`Adicionar ${product.name} ao carrinho`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-slide-in animation-delay-800">
          <button className="bg-navy-500 hover:bg-navy-600 text-white font-inter font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-navy-500 focus:ring-offset-2 shadow-lg animate-pulse-glow hover:animate-none">
            Ver Cardápio Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
