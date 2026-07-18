import React from 'react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Set on the dark navy page heroes, where the default navy current-page label is invisible */
  onDark?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onDark = false,
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'text-xs md:text-sm py-3 block',
        onDark ? 'text-slate-400' : 'text-slate-500',
        className
      )}
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
              <span className={cn('select-none text-xs', onDark ? 'text-slate-500' : 'text-slate-400')}>/</span>
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className={cn(
                    'font-medium font-sans truncate max-w-[150px] md:max-w-xs',
                    onDark ? 'text-white' : 'text-navy-950'
                  )}
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
