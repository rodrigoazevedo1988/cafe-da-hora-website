import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { radb } from '@/lib/radb';
import { toast } from 'sonner';

interface ImageUploadProps {
  bucket?: string;
  currentImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  onImageRemoved?: () => void;
  maxSizeMB?: number;
  accept?: string;
}

export const ImageUpload = ({
  bucket = 'cms-uploads',
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  maxSizeMB = 5,
  accept = 'image/*',
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`Imagem muito grande. Tamanho máximo: ${maxSizeMB}MB`);
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem');
      return;
    }

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomStr}.${extension}`;
      const path = fileName;

      const { data, error } = await radb.storage.from(bucket).upload(path, file);

      if (error) {
        throw error;
      }

      // Obter URL pública
      const { data: urlData } = radb.storage.from(bucket).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
      toast.success('Imagem enviada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      toast.error(error.message || 'Erro ao fazer upload da imagem');
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (onImageRemoved) {
      onImageRemoved();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-coffee-200 dark:border-coffee-700"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="h-4 w-4 mr-2" />
              Remover
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClick}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Trocar
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-coffee-300 dark:border-coffee-700 rounded-lg p-8 text-center cursor-pointer hover:border-coffee-500 dark:hover:border-coffee-500 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-coffee-500 animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Enviando...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-coffee-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clique para fazer upload de uma imagem
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Máximo: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

