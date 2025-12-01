import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { radb } from '@/lib/radb';
import type {
  CMSSection,
  SectionKey,
  SectionContent,
  CMSProduct,
  CMSProductInput,
  CMSTestimonial,
  CMSTestimonialInput,
} from '@/types/cms';

// ============================================
// Hooks para Seções
// ============================================

export const useSection = (sectionKey: SectionKey) => {
  return useQuery({
    queryKey: ['cms-section', sectionKey],
    queryFn: async () => {
      const { data, error } = await radb
        .from('cms_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .execute();

      if (error) throw error;
      return (data?.[0] as CMSSection) || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sectionKey,
      content,
    }: {
      sectionKey: SectionKey;
      content: SectionContent;
    }) => {
      // Verificar se a seção existe
      const { data: existing } = await radb
        .from('cms_sections')
        .select('id')
        .eq('section_key', sectionKey)
        .execute();

      if (existing && existing.length > 0) {
        // Atualizar
        const { data, error } = await radb
          .from('cms_sections')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('section_key', sectionKey)
          .execute();

        if (error) throw error;
        return data;
      } else {
        // Criar
        const { data, error } = await radb
          .from('cms_sections')
          .insert({
            section_key: sectionKey,
            content,
          })
          .execute();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cms-section', variables.sectionKey] });
    },
  });
};

// ============================================
// Hooks para Produtos
// ============================================

export const useProducts = (includeInactive = false) => {
  return useQuery({
    queryKey: ['cms-products', includeInactive],
    queryFn: async () => {
      let query = radb.from('cms_products').select('*');
      
      if (!includeInactive) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query.order('order', { ascending: true }).execute();

      if (error) {
        console.error('❌ Erro ao buscar produtos:', error);
        throw error;
      }
      
      // Garantir que sempre retornamos um array
      if (Array.isArray(data)) {
        return data as CMSProduct[];
      }
      
      // Se a resposta vier como objeto com data, extrair o array
      if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
        return data.data as CMSProduct[];
      }
      
      return [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['cms-product', id],
    queryFn: async () => {
      const { data, error } = await radb
        .from('cms_products')
        .select('*')
        .eq('id', id)
        .execute();

      if (error) throw error;
      return (data?.[0] as CMSProduct) || null;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CMSProductInput) => {
      const { data, error } = await radb
        .from('cms_products')
        .insert({
          ...product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...product }: Partial<CMSProductInput> & { id: string }) => {
      const { data, error } = await radb
        .from('cms_products')
        .update({
          ...product,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cms-products'] });
      queryClient.invalidateQueries({ queryKey: ['cms-product', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await radb
        .from('cms_products')
        .delete()
        .eq('id', id)
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-products'] });
    },
  });
};

// ============================================
// Hooks para Depoimentos
// ============================================

export const useTestimonials = (includeInactive = false) => {
  return useQuery({
    queryKey: ['cms-testimonials', includeInactive],
    queryFn: async () => {
      let query = radb.from('cms_testimonials').select('*');
      
      if (!includeInactive) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query.order('order', { ascending: true }).execute();

      if (error) {
        console.error('❌ Erro ao buscar depoimentos:', error);
        throw error;
      }
      
      // Garantir que sempre retornamos um array
      if (Array.isArray(data)) {
        return data as CMSTestimonial[];
      }
      
      // Se a resposta vier como objeto com data, extrair o array
      if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
        return data.data as CMSTestimonial[];
      }
      
      return [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: ['cms-testimonial', id],
    queryFn: async () => {
      const { data, error } = await radb
        .from('cms_testimonials')
        .select('*')
        .eq('id', id)
        .execute();

      if (error) throw error;
      return (data?.[0] as CMSTestimonial) || null;
    },
    enabled: !!id,
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: CMSTestimonialInput) => {
      const { data, error } = await radb
        .from('cms_testimonials')
        .insert({
          ...testimonial,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-testimonials'] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...testimonial }: Partial<CMSTestimonialInput> & { id: string }) => {
      const { data, error } = await radb
        .from('cms_testimonials')
        .update({
          ...testimonial,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cms-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['cms-testimonial', variables.id] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await radb
        .from('cms_testimonials')
        .delete()
        .eq('id', id)
        .execute();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-testimonials'] });
    },
  });
};

