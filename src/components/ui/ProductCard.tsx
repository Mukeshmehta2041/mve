import React from 'react';
import type { Product } from '../../types';
import { Card } from './Card';
import { Button } from './Button';
import { cn, getQuoteUrl } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col h-full', className)}>
      {/* 
        Product Card Image Ratio: 4:3 (design.md Section 7)
      */}
      <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-slate-100 mb-4 relative">
        <img
          src={product.image}
          alt={`${product.name} - ${product.category || 'Industrial Steel Fabrication'}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-navy-950/85 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
            {product.category}
          </span>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-navy-950 leading-tight mb-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Key specs — one per row so values stay readable at narrow card widths */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-auto pt-3 border-t border-border mb-4 space-y-1.5">
            {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
              <div key={key} className="text-xs leading-snug">
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  {key}
                </span>
                <span className="text-navy-950">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Button
            variant="secondary"
            size="sm"
            href={`/products/${product.slug}`}
            className="w-full sm:flex-1 text-xs whitespace-nowrap"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            href={getQuoteUrl({ product: product.slug })}
            className="w-full sm:flex-1 text-xs whitespace-nowrap"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;
