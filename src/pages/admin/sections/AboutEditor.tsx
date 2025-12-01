import { useState, useEffect } from 'react';
import { useSection, useUpdateSection } from '@/hooks/useCMS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { AboutSectionContent } from '@/types/cms';

const AboutEditor = () => {
  const { data: section, isLoading } = useSection('about');
  const updateSection = useUpdateSection();
  const [content, setContent] = useState<AboutSectionContent>({
    title: '',
    description: '',
    stats: {
      years: 10,
      yearsLabel: 'anos de tradição',
      coffees: 50,
      coffeesLabel: 'cafés e receitas',
      rating: 4.5,
      ratingLabel: 'de avaliação',
    },
  });

  useEffect(() => {
    if (section?.content) {
      setContent(section.content as AboutSectionContent);
    }
  }, [section]);

  const handleSave = async () => {
    try {
      await updateSection.mutateAsync({
        sectionKey: 'about',
        content,
      });
      toast.success('Seção Sobre salva com sucesso!');
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
          Editar Seção Sobre
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure o conteúdo da seção sobre
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
              placeholder="Sobre o Keys Café"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="Tradicional, acolhedor e inovador..."
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Estatísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="years">Anos</Label>
                <Input
                  id="years"
                  type="number"
                  value={content.stats.years}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, years: parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <Input
                  value={content.stats.yearsLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, yearsLabel: e.target.value },
                    })
                  }
                  placeholder="anos de tradição"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coffees">Cafés</Label>
                <Input
                  id="coffees"
                  type="number"
                  value={content.stats.coffees}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, coffees: parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <Input
                  value={content.stats.coffeesLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, coffeesLabel: e.target.value },
                    })
                  }
                  placeholder="cafés e receitas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Avaliação</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  value={content.stats.rating}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, rating: parseFloat(e.target.value) || 0 },
                    })
                  }
                />
                <Input
                  value={content.stats.ratingLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      stats: { ...content.stats, ratingLabel: e.target.value },
                    })
                  }
                  placeholder="de avaliação"
                />
              </div>
            </div>
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

export default AboutEditor;

