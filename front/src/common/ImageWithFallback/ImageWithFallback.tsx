import { useState, type ImgHTMLAttributes } from 'react';
import './ImageWithFallback.scss';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  showPlaceholder?: boolean;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  showPlaceholder = true,
  className = '',
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error && !fallbackSrc && showPlaceholder) {
    return (
      <div className={`image-fallback-placeholder ${className}`}>
        <div className="placeholder-icon">🖼️</div>
        <div className="placeholder-text">Изображение недоступно</div>
      </div>
    );
  }

  return (
    <div className={`image-with-fallback ${className}`}>
      {loading && showPlaceholder && (
        <div className="image-loading-placeholder">
          <div className="loading-spinner-image"></div>
        </div>
      )}
      <img
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={loading ? 'image-loading' : 'image-loaded'}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
