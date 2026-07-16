import React, { useState } from 'react';
import { navigationData } from '../../data/navigation';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const DesktopNavigation: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-7">
      {navigationData.map((item) => {
        const hasChildren = item.children && item.children.length > 0;

        if (item.isCta) {
          return (
            <Button
              key={item.name}
              href={item.href}
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs"
            >
              {item.name}
            </Button>
          );
        }

        if (hasChildren) {
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                aria-expanded={activeDropdown === item.name}
                aria-haspopup="true"
                className={cn(
                  'flex items-center text-sm font-semibold py-2 transition-all cursor-pointer focus-ring rounded-sm',
                  activeDropdown === item.name ? 'text-primary' : 'text-slate-600 hover:text-navy-950'
                )}
              >
                <span>{item.name}</span>
                <svg
                  className={cn(
                    'w-4 h-4 ml-1 transition-transform duration-200',
                    activeDropdown === item.name ? 'rotate-180 text-primary' : 'text-slate-400'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu (design.md Section 11) */}
              <div
                className={cn(
                  'absolute top-full left-0 w-64 bg-white border border-border shadow-floating rounded-card py-2 mt-1 z-50 transition-all duration-150 origin-top-left',
                  activeDropdown === item.name
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                )}
                role="menu"
              >
                {item.children?.map((subItem) => (
                  <a
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                    role="menuitem"
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </div>
          );
        }

        // Standard link with active state underline animation (design.md Section 7)
        const isHome = item.href === '/';
        const isPathActive = isHome 
          ? window.location.pathname === '/' 
          : window.location.pathname.startsWith(item.href);

        return (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'text-sm font-semibold py-2 transition-all relative group focus-ring rounded-sm',
              isPathActive ? 'text-primary' : 'text-slate-600 hover:text-navy-950'
            )}
          >
            <span>{item.name}</span>
            {/* Active state underline indicator */}
            <span
              className={cn(
                'absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100',
                isPathActive ? 'scale-x-100' : ''
              )}
            ></span>
          </a>
        );
      })}
    </nav>
  );
};
export default DesktopNavigation;
