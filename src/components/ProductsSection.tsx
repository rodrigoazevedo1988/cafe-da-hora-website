
import React from 'react';
import { ShoppingCart } from "lucide-react";

// Fotos reais de cafés do Unsplash (diferentes visuais)
const productsData = [
  {
    id: 1,
    name: 'Café Expresso Tradicional',
    description: 'Um clássico irresistível para começar seu dia.',
    price: 5.5,
    image: 'https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Cappuccino Cremoso',
    description: 'Café, leite vaporizado e espuma cremosa com um toque extra.',
    price: 8.0,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Latte Avelã',
    description: 'Avelã com creme leite aveludado, sofisticado.',
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Mocha Chocolate',
    description: 'Para os amantes de chocolate: café intenso, leite e cacau.',
    price: 10.0,
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Café Gelado Tropical',
    description: 'Refrescante e exótico, perfeito para os dias quentes.',
    price: 7.0,
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Macchiato Caramelo',
    description: 'Camadas de espresso com doce de caramelo e espuma.',
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
];

const ProductsSection = () => (
  <section
    id="products"
    className="py-16 bg-coffee-50"
    aria-labelledby="products-title"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="products-title"
        className="font-playfair text-3xl lg:text-section-title font-bold text-coffee-600 mb-10 text-center animate-fade-slide-in"
      >
        Produtos
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {productsData.map((prod, idx) => (
          <div
            key={prod.id}
            className="transition-all duration-500 bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 group relative hover:ring-4 hover:ring-coffee-100 animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <img
              src={prod.image}
              alt={`Foto de ${prod.name}`}
              className="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
              width={400}
              height={192}
              onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=400&q=80')}
            />
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-playfair text-xl text-coffee-700 mb-2 animate-fade-slide-in">{prod.name}</h3>
              <p className="text-gray-700 mb-3 text-base animate-fade-slide-in">{prod.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-coffee-500 animate-price-highlight">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                <button
                  className="flex items-center gap-2 bg-coffee-500 hover:bg-coffee-600 text-white px-5 py-2 rounded-full transition-all duration-200 shadow-md outline-none focus:ring-2 focus:ring-coffee-400 focus:ring-offset-2 font-inter font-semibold text-base"
                  aria-label={`Adicionar ${prod.name} ao carrinho`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
            <span className="block absolute top-2 right-2 text-xs bg-coffee-100 text-coffee-700 rounded px-2 py-1 group-hover:bg-coffee-200 transition-all">Novidade</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
