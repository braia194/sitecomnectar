#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Criar componente ImageOptimized para lazy loading
const imageComponent = `import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  // Converter PNG/JPG para WebP
  const webpSrc = src.replace(/\\.(png|jpg|jpeg)$/i, '.webp');
  
  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      {/* Fallback for older browsers */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
}
`;

const componentPath = path.join(__dirname, 'client/src/components/OptimizedImage.tsx');
fs.writeFileSync(componentPath, imageComponent, 'utf-8');

console.log('✓ Componente OptimizedImage criado com sucesso');
console.log('✓ Lazy loading implementado');
console.log('✓ WebP com fallback configurado');
console.log('\nPróximos passos:');
console.log('1. Converter imagens PNG/JPG para WebP usando: cwebp -q 80 input.png -o output.webp');
console.log('2. Usar componente OptimizedImage em vez de <img> tags');
console.log('3. Exemplo: <OptimizedImage src="/logo.webp" alt="Logo" width={100} height={100} />');
