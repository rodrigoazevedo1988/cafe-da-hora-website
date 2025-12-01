
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSection } from '@/hooks/useCMS';
import type { ContactSectionContent } from '@/types/cms';

const ContactSection = () => {
  const { data: section } = useSection('contact');
  const content = (section?.content as ContactSectionContent) || {
    title: 'Entre em Contato',
    description: 'Estamos sempre prontos para atendê-lo. Entre em contato conosco para dúvidas, sugestões ou para reservar sua mesa.',
    email: 'contato@keyscafe.com.br',
    phone: '(99) 99999-9999',
    address: 'Rua dos Grãos, 123\nCentro, Sua Cidade - Brasil',
    formFields: [],
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-coffee-900 transition-colors duration-300" aria-labelledby="contact-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="contact-title"
            className="font-playfair text-3xl lg:text-section-title font-bold text-coffee-600 dark:text-coffee-300 mb-6 opacity-0 animate-fade-in text-gradient"
            style={{ animationFillMode: 'forwards' }}
          >
            {content.title}
          </h2>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <div className="space-y-8">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <h3 className="font-playfair text-2xl font-semibold text-coffee-600 dark:text-coffee-300 mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-coffee-500 dark:text-coffee-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100">Endereço</h4>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{content.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-coffee-500 dark:text-coffee-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100">Telefone</h4>
                    <p className="text-gray-600 dark:text-gray-300">{content.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-coffee-500 dark:text-coffee-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100">E-mail</h4>
                    <p className="text-gray-600 dark:text-gray-300">{content.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-coffee-500 dark:text-coffee-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100">Horário de Funcionamento</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Segunda a Sábado: 08h às 19h<br />
                      Domingo: 09h às 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa (placeholder) */}
            <div className="bg-gray-200 dark:bg-coffee-800 h-64 rounded-lg flex items-center justify-center opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <p className="text-gray-500 dark:text-gray-400 font-inter">Mapa da localização</p>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <h3 className="font-playfair text-2xl font-semibold text-coffee-600 dark:text-coffee-300 mb-6">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-coffee-700 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors bg-white dark:bg-coffee-800 text-gray-900 dark:text-gray-100"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-coffee-700 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors bg-white dark:bg-coffee-800 text-gray-900 dark:text-gray-100"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Assunto *
                </label>
                <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 dark:border-coffee-700 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors bg-white dark:bg-coffee-800 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="Selecione o assunto da sua mensagem" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-coffee-800 border border-gray-300 dark:border-coffee-700 shadow-lg z-50">
                    <SelectItem value="duvida" className="hover:bg-coffee-50 dark:hover:bg-coffee-700">Dúvida sobre produtos</SelectItem>
                    <SelectItem value="reserva" className="hover:bg-coffee-50 dark:hover:bg-coffee-700">Reserva de mesa</SelectItem>
                    <SelectItem value="sugestao" className="hover:bg-coffee-50 dark:hover:bg-coffee-700">Sugestão</SelectItem>
                    <SelectItem value="reclamacao" className="hover:bg-coffee-50 dark:hover:bg-coffee-700">Reclamação</SelectItem>
                    <SelectItem value="outro" className="hover:bg-coffee-50 dark:hover:bg-coffee-700">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-coffee-700 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors resize-vertical bg-white dark:bg-coffee-800 text-gray-900 dark:text-gray-100"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-coffee-500 hover:bg-coffee-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coffee-500 focus:ring-offset-2 shadow-lg hover:shadow-xl btn-shimmer ripple overflow-hidden relative group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enviar Mensagem
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
