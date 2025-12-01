import { useState, useEffect } from 'react';
import { useSection, useUpdateSection } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import type { HeaderSectionContent } from '@/types/cms';

const HeaderEditor = () => {
  const { data: section, isLoading } = useSection('header');
  const updateSection = useUpdateSection();
  const [content, setContent] = useState<HeaderSectionContent>({
    logoText: '',
    menuItems: [],
  });

  useEffect(() => {
    if (section?.content) {
      setContent(section.content as HeaderSectionContent);
    }
  }, [section]);

  const handleSave = async () => {
    try {
      await updateSection.mutateAsync({
        sectionKey: 'header',
        content,
      });
      toast.success('Seção Header salva com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar seção');
    }
  };

  const addMenuItem = () => {
    setContent({
      ...content,
      menuItems: [...content.menuItems, { label: '', href: '' }],
    });
  };

  const removeMenuItem = (index: number) => {
    setContent({
      ...content,
      menuItems: content.menuItems.filter((_, i) => i !== index),
    });
  };

  const updateMenuItem = (index: number, field: 'label' | 'href', value: string) => {
    const newItems = [...content.menuItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({ ...content, menuItems: newItems });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
          Editar Header
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure o cabeçalho do site
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoText">Texto do Logo</Label>
            <Input
              id="logoText"
              value={content.logoText}
              onChange={(e) => setContent({ ...content, logoText: e.target.value })}
              placeholder="Keys Café"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo (Imagem)</Label>
            <ImageUpload
              currentImageUrl={content.logoUrl}
              onImageUploaded={(url) => setContent({ ...content, logoUrl: url })}
              onImageRemoved={() => setContent({ ...content, logoUrl: undefined })}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Itens do Menu</Label>
              <Button type="button" onClick={addMenuItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </Button>
            </div>
            {content.menuItems.map((item, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Label (ex: Início)"
                    value={item.label}
                    onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Link (ex: #home)"
                    value={item.href}
                    onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
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

export default HeaderEditor;

