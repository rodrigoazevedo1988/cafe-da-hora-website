import { useState, useEffect } from 'react';
import { useSection, useUpdateSection } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { ContactSectionContent } from '@/types/cms';

const ContactEditor = () => {
  const { data: section, isLoading } = useSection('contact');
  const updateSection = useUpdateSection();
  const [content, setContent] = useState<ContactSectionContent>({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    formFields: [],
  });

  useEffect(() => {
    if (section?.content) {
      setContent(section.content as ContactSectionContent);
    }
  }, [section]);

  const handleSave = async () => {
    try {
      await updateSection.mutateAsync({
        sectionKey: 'contact',
        content,
      });
      toast.success('Seção Contato salva com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar seção');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
          Editar Seção Contato
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure o conteúdo da seção de contato
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="Entre em Contato"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="Estamos sempre prontos para atendê-lo..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={content.email}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
                placeholder="contato@keyscafe.com.br"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                placeholder="(99) 99999-9999"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea
              id="address"
              value={content.address}
              onChange={(e) => setContent({ ...content, address: e.target.value })}
              placeholder="Rua dos Grãos, 123, Centro, Sua Cidade - Brasil"
              rows={2}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={updateSection.isPending}
            className="w-full bg-coffee-500 hover:bg-coffee-600"
          >
            {updateSection.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactEditor;

