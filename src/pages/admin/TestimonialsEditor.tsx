import { useState } from 'react';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { CMSTestimonial, CMSTestimonialInput } from '@/types/cms';

const TestimonialsEditor = () => {
  const { data: testimonials = [], isLoading } = useTestimonials(true);
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const [editingTestimonial, setEditingTestimonial] = useState<CMSTestimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CMSTestimonialInput>({
    author_name: '',
    author_role: null,
    content: '',
    rating: 5,
    image_url: null,
    order: 0,
    is_active: true,
  });

  const handleOpenDialog = (testimonial?: CMSTestimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        author_name: testimonial.author_name,
        author_role: testimonial.author_role,
        content: testimonial.content,
        rating: testimonial.rating || 5,
        image_url: testimonial.image_url,
        order: testimonial.order,
        is_active: testimonial.is_active,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        author_name: '',
        author_role: null,
        content: '',
        rating: 5,
        image_url: null,
        order: testimonials.length,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingTestimonial) {
        await updateTestimonial.mutateAsync({ id: editingTestimonial.id, ...formData });
        toast.success('Depoimento atualizado com sucesso!');
      } else {
        await createTestimonial.mutateAsync(formData);
        toast.success('Depoimento criado com sucesso!');
      }
      setIsDialogOpen(false);
      setEditingTestimonial(null);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar depoimento');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;
    try {
      await deleteTestimonial.mutateAsync(id);
      toast.success('Depoimento excluído com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir depoimento');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
            Gerenciar Depoimentos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Adicione, edite ou remova depoimentos do site
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-coffee-500 hover:bg-coffee-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Depoimento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author_name">Nome do Autor</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author_role">Cargo/Role (opcional)</Label>
                  <Input
                    id="author_role"
                    value={formData.author_role || ''}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value || null })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Depoimento</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Avaliação (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Foto do Autor</Label>
                <ImageUpload
                  currentImageUrl={formData.image_url || undefined}
                  onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                  onImageRemoved={() => setFormData({ ...formData, image_url: null })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
              <Button onClick={handleSave} className="w-full bg-coffee-500 hover:bg-coffee-600">
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              {testimonial.image_url && (
                <img
                  src={testimonial.image_url}
                  alt={testimonial.author_name}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                />
              )}
              <CardTitle className="text-center">{testimonial.author_name}</CardTitle>
              {testimonial.author_role && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {testimonial.author_role}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 italic">
                &quot;{testimonial.content}&quot;
              </p>
              {testimonial.rating && (
                <div className="flex justify-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleOpenDialog(testimonial)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(testimonial.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsEditor;

