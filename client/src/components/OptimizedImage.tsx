import { ImgHTMLAttributes } from 'react';

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
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
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
