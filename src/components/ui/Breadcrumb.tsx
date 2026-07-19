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
      {/* -my-1.5 keeps the visual rhythm while the links themselves carry a
          real vertical hit area rather than bare 16px text */}
      <ol className="flex flex-wrap items-center gap-x-2 -my-1.5">
        <li>
          <a
            href="/"
            className={cn(
              'inline-flex items-center py-1.5 rounded-sm focus-ring transition-colors',
              onDark ? 'hover:text-primary' : 'hover:text-primary-ink'
            )}
          >
            Home
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href ?? item.label} className="flex items-center gap-x-2">
              {/* Separator symbol */}
              <span
                aria-hidden="true"
                className={cn('select-none text-xs', onDark ? 'text-slate-500' : 'text-slate-400')}
              >
                /
              </span>
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className={cn(
                    'font-medium font-sans truncate max-w-[150px] md:max-w-xs py-1.5',
                    onDark ? 'text-white' : 'text-navy-950'
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'inline-block py-1.5 rounded-sm focus-ring transition-colors truncate max-w-[150px] md:max-w-xs',
                    onDark ? 'hover:text-primary' : 'hover:text-primary-ink'
                  )}
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
