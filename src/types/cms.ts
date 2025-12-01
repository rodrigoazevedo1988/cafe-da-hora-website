// Tipos TypeScript para o CMS

// ============================================
// Seções do CMS
// ============================================

export type SectionKey = 
  | 'hero' 
  | 'about' 
  | 'header' 
  | 'footer' 
  | 'contact';

export interface CMSSection {
  id: string;
  section_key: SectionKey;
  content: SectionContent;
  updated_at: string;
  updated_by?: string;
  created_at: string;
}

// ============================================
// Conteúdo das Seções
// ============================================

export interface HeroSectionContent {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonAction: string;
  secondaryButtonText: string;
  secondaryButtonAction: string;
  backgroundImageUrl: string;
}

export interface AboutSectionContent {
  title: string;
  description: string;
  stats: {
    years: number;
    yearsLabel: string;
    coffees: number;
    coffeesLabel: string;
    rating: number;
    ratingLabel: string;
  };
}

export interface HeaderSectionContent {
  logoUrl?: string;
  logoText: string;
  menuItems: Array<{
    label: string;
    href: string;
  }>;
}

export interface FooterSectionContent {
  description: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  copyright: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface ContactSectionContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  formFields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
  }>;
}

export type SectionContent = 
  | HeroSectionContent 
  | AboutSectionContent 
  | HeaderSectionContent 
  | FooterSectionContent 
  | ContactSectionContent;

// ============================================
// Produtos
// ============================================

export interface CMSProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSProductInput {
  name: string;
  description: string;
  price: number;
  image_url?: string | null;
  order?: number;
  is_active?: boolean;
}

// ============================================
// Depoimentos
// ============================================

export interface CMSTestimonial {
  id: string;
  author_name: string;
  author_role?: string | null;
  content: string;
  rating: number | null;
  image_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSTestimonialInput {
  author_name: string;
  author_role?: string | null;
  content: string;
  rating?: number | null;
  image_url?: string | null;
  order?: number;
  is_active?: boolean;
}

// ============================================
// Respostas da API
// ============================================

export interface APIResponse<T> {
  data: T | null;
  error: {
    message: string;
    code?: string;
    details?: any;
  } | null;
}

// ============================================
// Auth
// ============================================

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  access_token?: string;
  refresh_token?: string;
}

// ============================================
// Storage
// ============================================

export interface StorageUploadResponse {
  path: string;
  fullPath: string;
}

export interface StoragePublicUrl {
  publicUrl: string;
}

