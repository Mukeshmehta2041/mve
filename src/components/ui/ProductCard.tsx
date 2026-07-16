import React from 'react';
import type { Product } from '../../types';
import { Card } from './Card';
import { Button } from './Button';
import { cn } from '../../lib/utils';

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
          alt={product.name}
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

        {/* Small Technical Specs Overview */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-auto pt-3 border-t border-border mb-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Specifications
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-600">
              {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
                <div key={key} className="truncate">
                  <span className="font-medium text-navy-950">{key}:</span> {val}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            variant="secondary"
            size="sm"
            href={`/products/${product.slug}`}
            className="text-xs"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            href={`/quote?product=${product.slug}`}
            className="text-xs"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;
