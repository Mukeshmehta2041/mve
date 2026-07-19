import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  darkBg?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  darkBg = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-8 md:mb-12',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            'text-[12px] leading-[18px] tracking-[0.1em] uppercase font-semibold block mb-3',
            // Base orange is 5.90:1 on navy but only 3.02:1 on white
            darkBg ? 'text-primary' : 'text-primary-ink'
          )}
        >
          {eyebrow}
        </span>
      )}
      
      {/* 
        H2 Type scale (design.md Section 4):
        Desktop: 36px/44px, Mobile: 28px/36px, Weight 600-700
      */}
      <h2
        className={cn(
          'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2]',
          darkBg ? 'text-white' : 'text-navy-950'
        )}
      >
        {title}
      </h2>
      
      {description && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed',
            darkBg ? 'text-slate-400' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
export default SectionHeader;
