import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationData } from '../../data/navigation';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const DesktopNavigation: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape closes the dropdown. Bound at the document rather than on the panel:
  // the previous panel-level handler only fired once focus was already inside,
  // so Escape did nothing while focus sat on the trigger itself.
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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
              className="font-bold uppercase tracking-wider text-xs whitespace-nowrap"
              icon={
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              }
              iconPosition="right"
            >
              {item.name}
            </Button>
          );
        }

        if (hasChildren) {
          return (
            <div key={item.name} className="relative">
              <button
                ref={buttonRef}
                type="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={cn(
                  'flex items-center text-sm font-semibold py-2 transition-all cursor-pointer focus-ring rounded-sm text-slate-600 hover:text-navy-950',
                  dropdownOpen ? 'text-primary-ink' : ''
                )}
              >
                <span>{item.name}</span>
                <svg
                  className={cn(
                    'w-4 h-4 ml-1.5 transition-transform duration-200',
                    dropdownOpen ? 'rotate-180 text-primary-ink' : 'text-slate-500'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {/* Accessible Dropdown Menu */}
              <div
                ref={dropdownRef}
                className={cn(
                  'absolute top-full left-0 w-64 bg-white border border-border shadow-floating rounded-card py-2 mt-1.5 z-50 transition-all duration-150 origin-top-left',
                  dropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                )}
                role="menu"
                aria-label="Products Submenu"
              >
                <NavLink
                  to="/products"
                  end
                  onClick={() => setDropdownOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-2 text-sm font-bold border-b border-border/55 text-slate-600 hover:text-primary-ink hover:bg-slate-50 transition-colors',
                      isActive ? 'text-primary-ink bg-primary-soft/10' : ''
                    )
                  }
                  role="menuitem"
                >
                  View All Products
                </NavLink>
                
                {item.children?.map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.href}
                    onClick={() => setDropdownOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-ink hover:bg-slate-50 transition-colors',
                        isActive ? 'text-primary-ink font-semibold bg-primary-soft/10' : ''
                      )
                    }
                    role="menuitem"
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        }

        // Anchor links (e.g. "/#industries") would otherwise match the "/" route and
        // render as active alongside Home. Render them as plain links instead.
        if (item.href.includes('#')) {
          return (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold py-2 transition-all relative group focus-ring rounded-sm text-slate-600 hover:text-navy-950"
            >
              <span>{item.name}</span>
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          );
        }

        return (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                'text-sm font-semibold py-2 transition-all relative group focus-ring rounded-sm',
                isActive ? 'text-slate-800 font-bold' : 'text-slate-600 hover:text-navy-950'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.name}</span>
                {/* Active Underline Indicator */}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100',
                    isActive ? 'scale-x-100' : ''
                  )}
                  aria-hidden="true"
                ></span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
export default DesktopNavigation;
