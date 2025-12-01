import { useState, useEffect } from 'react';
import { useSection, useUpdateSection } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import type { FooterSectionContent } from '@/types/cms';

const FooterEditor = () => {
  const { data: section, isLoading } = useSection('footer');
  const updateSection = useUpdateSection();
  const [content, setContent] = useState<FooterSectionContent>({
    description: '',
    address: '',
    phone: '',
    email: '',
    copyright: '',
    socialLinks: [],
    links: [],
  });

  useEffect(() => {
    if (section?.content) {
      setContent(section.content as FooterSectionContent);
    }
  }, [section]);

  const handleSave = async () => {
    try {
      await updateSection.mutateAsync({
        sectionKey: 'footer',
        content,
      });
      toast.success('Seção Footer salva com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar seção');
    }
  };

  const addSocialLink = () => {
    setContent({
      ...content,
      socialLinks: [...content.socialLinks, { platform: '', url: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    setContent({
      ...content,
      socialLinks: content.socialLinks.filter((_, i) => i !== index),
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...content.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContent({ ...content, socialLinks: newLinks });
  };

  const addLink = () => {
    setContent({
      ...content,
      links: [...content.links, { label: '', href: '' }],
    });
  };

  const removeLink = (index: number) => {
    setContent({
      ...content,
      links: content.links.filter((_, i) => i !== index),
    });
  };

  const updateLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...content.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContent({ ...content, links: newLinks });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-coffee-600 dark:text-coffee-300">
          Editar Footer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure o rodapé do site
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                value={content.address}
                onChange={(e) => setContent({ ...content, address: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={content.email}
              onChange={(e) => setContent({ ...content, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright</Label>
            <Input
              id="copyright"
              value={content.copyright}
              onChange={(e) => setContent({ ...content, copyright: e.target.value })}
              placeholder="© 2024 Keys Café. Todos os direitos reservados."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Links Sociais</Label>
              <Button type="button" onClick={addSocialLink} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
            {content.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-end">
                <Input
                  placeholder="Plataforma (ex: Instagram)"
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  variant="destructive"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Links do Footer</Label>
              <Button type="button" onClick={addLink} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
            {content.links.map((link, index) => (
              <div key={index} className="flex gap-2 items-end">
                <Input
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => updateLink(index, 'label', e.target.value)}
                />
                <Input
                  placeholder="Link"
                  value={link.href}
                  onChange={(e) => updateLink(index, 'href', e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => removeLink(index)}
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

export default FooterEditor;

