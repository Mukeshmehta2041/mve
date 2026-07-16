import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string; // Required for accessibility, empty string indicates decorative
  ratio?: '4:3' | '16:9' | '16:8' | '1:1' | 'auto';
  wrapperClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  ratio = 'auto',
  className,
  wrapperClassName,
  loading = 'lazy',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const ratioClasses = {
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '16:8': 'aspect-[16/8]',
    '1:1': 'aspect-square',
    'auto': '',
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100 w-full',
        ratio !== 'auto' ? ratioClasses[ratio] : '',
        wrapperClassName
      )}
    >
      {/* Loading Shimmer/Spinner */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Fallback */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-400">
          <svg className="w-8 h-8 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt === '' ? undefined : alt}
          role={alt === '' ? 'presentation' : undefined}
          aria-hidden={alt === '' ? true : undefined}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};
export default ResponsiveImage;
