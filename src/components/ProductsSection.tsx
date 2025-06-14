
import React from 'react';
import { ShoppingCart } from "lucide-react";

const productsData = [
  {
    id: 1,
    name: 'Café Expresso Tradicional',
    description: 'Um clássico irresistível, perfeito para começar o dia com energia.',
    price: 5.5,
    image: 'https://source.unsplash.com/400x300/?coffee,espresso&sig=1',
  },
  {
    id: 2,
    name: 'Cappuccino Cremoso',
    description: 'A combinação ideal de café, leite e um toque de cacau.',
    price: 8.0,
    image: 'https://source.unsplash.com/400x300/?coffee,cappuccino&sig=2',
  },
  {
    id: 3,
    name: 'Latte Avelã',
    description: 'Uma bebida sofisticada com avelã e aveludado creme de leite.',
    price: 9.5,
    image: 'https://source.unsplash.com/400x300/?coffee,latte&sig=3',
  },
  {
    id: 4,
    name: 'Mocha Chocolate',
    description: 'Para os amantes de chocolate, um café intenso e delicioso.',
    price: 10.0,
    image: 'https://source.unsplash.com/400x300/?coffee,mocha&sig=4',
  },
  {
    id: 5,
    name: 'Café Gelado Tropical',
    description: 'Refrescante e exótico, perfeito para os dias mais quentes.',
    price: 7.0,
    image: 'https://source.unsplash.com/400x300/?coffee,iced&sig=5',
  },
  {
    id: 6,
    name: 'Macchiato Caramelo',
    description: 'Camadas de sabor em um café elegante e equilibrado.',
    price: 8.5,
    image: 'https://source.unsplash.com/400x300/?coffee,macchiato&sig=6',
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
            className="transition-all duration-500 bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 group relative hover:ring-4 hover:ring-coffee-100"
          >
            <img
              src={prod.image}
              alt={`Foto de ${prod.name}`}
              className="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-playfair text-xl text-coffee-700 mb-2">{prod.name}</h3>
              <p className="text-gray-700 mb-3 text-base">{prod.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-bold text-coffee-500 animate-price-highlight">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                <button
                  className="flex items-center bg-coffee-500 hover:bg-coffee-600 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 shadow-md outline-none focus:ring-2 focus:ring-coffee-400 focus:ring-offset-2"
                  aria-label={`Adicionar ${prod.name} ao carrinho`}
                >
                  <ShoppingCart className="w-5 h-5 mr-1" />
                  <span className="ml-1">Adicionar</span>
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
