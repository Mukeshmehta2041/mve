import React from 'react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('text-xs md:text-sm text-slate-400 py-3 block', className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <a href="/" className="hover:text-primary transition-colors flex items-center">
            Home
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              {/* Separator symbol */}
              <span className="text-slate-350 select-none text-[10px] md:text-xs">/</span>
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="font-medium text-navy-950 font-sans truncate max-w-[150px] md:max-w-xs"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-xs"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
