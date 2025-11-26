# Keys Café - Website

Website institucional moderno e responsivo para o Keys Café, desenvolvido com React, TypeScript e Tailwind CSS.

## 📋 Sobre o Projeto

O Keys Café é um website institucional que apresenta uma cafeteria artesanal com design moderno, animações suaves e suporte completo a modo escuro. O site foi desenvolvido com foco em experiência do usuário, acessibilidade e performance.

## ✨ Funcionalidades

- **Design Responsivo**: Adaptável a todos os dispositivos (mobile, tablet, desktop)
- **Modo Escuro/Claro**: Alternância entre temas com persistência no localStorage
- **Animações Interativas**: Efeitos hover, transições suaves e animações de texto
- **Seções Completas**:
  - Hero Section com call-to-action
  - Sobre com estatísticas animadas
  - Produtos com cards interativos
  - Depoimentos de clientes
  - Formulário de contato
  - Footer com informações e links
- **Acessibilidade**: Suporte a leitores de tela, navegação por teclado e contraste adequado
- **SEO Otimizado**: Meta tags, Schema.org e estrutura semântica

## 🛠️ Tecnologias Utilizadas

### Core
- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.5.3** - Superset JavaScript com tipagem estática
- **Vite 5.4.1** - Build tool e dev server rápido

### Estilização
- **Tailwind CSS 3.4.11** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **tailwindcss-animate** - Animações para Tailwind
- **Lucide React** - Ícones modernos

### Roteamento e Estado
- **React Router DOM 6.26.2** - Roteamento client-side
- **TanStack Query 5.56.2** - Gerenciamento de estado e cache

### Formulários
- **React Hook Form 7.53.0** - Gerenciamento de formulários
- **Zod 3.23.8** - Validação de schemas

### Outras Dependências
- **Radix UI** - Componentes primitivos acessíveis
- **class-variance-authority** - Gerenciamento de variantes de classes
- **clsx** e **tailwind-merge** - Utilitários para classes CSS

## 📁 Estrutura do Projeto

```
cafe-da-hora-website/
├── public/                 # Arquivos estáticos
│   ├── lovable-uploads/   # Imagens do projeto
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/         # Componentes React
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ui/            # Componentes shadcn/ui
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilitários
│   ├── pages/             # Páginas da aplicação
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais e animações
├── index.html             # HTML principal
├── package.json
├── tailwind.config.ts     # Configuração do Tailwind
├── tsconfig.json          # Configuração do TypeScript
└── vite.config.ts         # Configuração do Vite
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd cafe-da-hora-website
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:8080
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run build:dev    # Build em modo desenvolvimento

# Qualidade
npm run lint         # Executa o ESLint

# Preview
npm run preview      # Preview do build de produção
```

## 🎨 Características de Design

### Paleta de Cores
- **Coffee 50-900**: Tons de marrom para o tema do café
- **Gradientes**: Animações de gradiente em textos e elementos
- **Dark Mode**: Cores adaptadas para modo escuro

### Animações
- Fade in/out
- Slide animations
- Hover effects (lift, glow, scale)
- Text animations (shimmer, glow, reveal)
- Button effects (shimmer, ripple)
- Card animations (zoom, hover)

### Tipografia
- **Playfair Display**: Títulos e headings
- **Inter**: Corpo do texto e UI

## 🔧 Configuração

### Variáveis de Ambiente

O projeto não requer variáveis de ambiente no momento, mas você pode adicionar um arquivo `.env` se necessário:

```env
VITE_API_URL=https://api.exemplo.com
```

### Personalização

#### Cores
Edite `tailwind.config.ts` para personalizar as cores do tema:

```typescript
coffee: {
  50: '#FDF7F0',
  100: '#F7E6D3',
  // ... outras cores
}
```

#### Animações
As animações customizadas estão em `src/index.css` na seção `@layer utilities`.

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Navegação por teclado
- Suporte a leitores de tela (ARIA labels)
- Contraste adequado (WCAG AA)
- Skip links para conteúdo principal
- Foco visível em elementos interativos

## 🚢 Deploy

### Vercel / Netlify

1. Conecte seu repositório
2. Configure o build command: `npm run build`
3. Configure o output directory: `dist`
4. Deploy automático a cada push

### Build Manual

```bash
npm run build
```

Os arquivos estarão na pasta `dist/` prontos para deploy em qualquer servidor estático.

## 📝 Licença

Este projeto é privado e pertence ao Keys Café.

## 👥 Contribuindo

Este é um projeto privado. Para sugestões ou melhorias, entre em contato com a equipe de desenvolvimento.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato através do formulário no site.

---

**Desenvolvido com ❤️ para Keys Café**
