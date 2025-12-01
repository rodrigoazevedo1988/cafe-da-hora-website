import { useState, useEffect } from 'react';
import { useSection, useUpdateSection } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import type { HeroSectionContent } from '@/types/cms';

const HeroEditor = () => {
  const { data: section, isLoading } = useSection('hero');
  const updateSection = useUpdateSection();
  const [content, setContent] = useState<HeroSectionContent>({
    title: '',
    subtitle: '',
    primaryButtonText: '',
    primaryButtonAction: '',
    secondaryButtonText: '',
    secondaryButtonAction: '',
    backgroundImageUrl: '',
  });

  useEffect(() => {
    if (section?.content) {
      setContent(section.content as HeroSectionContent);
    }
  }, [section]);

  const handleSave = async () => {
    try {
      await updateSection.mutateAsync({
        sectionKey: 'hero',
        content,
      });
      toast.success('Seção Hero salva com sucesso!');
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
          Editar Seção Hero
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure o conteúdo principal da página inicial
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título Principal</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="O melhor café que você poderia tomar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              placeholder="Descubra o sabor único do nosso café artesanal..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryButtonText">Texto do Botão Primário</Label>
              <Input
                id="primaryButtonText"
                value={content.primaryButtonText}
                onChange={(e) => setContent({ ...content, primaryButtonText: e.target.value })}
                placeholder="Experimente nossos deliciosos cafés"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryButtonAction">Ação do Botão Primário</Label>
              <Input
                id="primaryButtonAction"
                value={content.primaryButtonAction}
                onChange={(e) => setContent({ ...content, primaryButtonAction: e.target.value })}
                placeholder="#products"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secondaryButtonText">Texto do Botão Secundário</Label>
              <Input
                id="secondaryButtonText"
                value={content.secondaryButtonText}
                onChange={(e) => setContent({ ...content, secondaryButtonText: e.target.value })}
                placeholder="Saiba mais sobre nós"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryButtonAction">Ação do Botão Secundário</Label>
              <Input
                id="secondaryButtonAction"
                value={content.secondaryButtonAction}
                onChange={(e) => setContent({ ...content, secondaryButtonAction: e.target.value })}
                placeholder="#about"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imagem de Fundo</Label>
            <ImageUpload
              currentImageUrl={content.backgroundImageUrl}
              onImageUploaded={(url) => setContent({ ...content, backgroundImageUrl: url })}
              onImageRemoved={() => setContent({ ...content, backgroundImageUrl: '' })}
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

export default HeroEditor;

