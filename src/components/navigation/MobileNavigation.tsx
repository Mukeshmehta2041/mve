import React, { useEffect } from 'react';
import { navigationData } from '../../data/navigation';
import { Button, IconButton } from '../ui';
import { cn } from '../../lib/utils';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-all duration-300 lg:hidden',
        isOpen ? 'visible' : 'invisible pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-navy-950/40 backdrop-blur-xs transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel (design.md Section 7) */}
      <div
        className={cn(
          'absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-floating flex flex-col p-6 transition-transform duration-300 ease-out transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <span className="font-bold text-navy-950 font-heading text-lg">Menu</span>
          <IconButton ariaLabel="Close menu" onClick={onClose} className="hover:bg-slate-100">
            <svg className="w-6 h-6 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        {/* Scrollable menu links */}
        <nav className="flex-grow overflow-y-auto space-y-4 text-left">
          {navigationData.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (item.isCta) {
              return (
                <div key={item.name} className="pt-4 border-t border-border">
                  <Button href={item.href} variant="primary" fullWidth className="font-bold uppercase tracking-wider">
                    {item.name}
                  </Button>
                </div>
              );
            }

            return (
              <div key={item.name} className="space-y-2">
                {hasChildren ? (
                  <>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                      {item.name}
                    </span>
                    <div className="pl-3 border-l-2 border-border/70 space-y-3 py-1">
                      {item.children?.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={onClose}
                          className="block text-sm font-semibold text-slate-650 hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block text-base font-bold text-navy-950 hover:text-primary py-2 px-2 hover:bg-slate-50 rounded-sm transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        {/* Info footer in mobile menu */}
        <div className="mt-auto border-t border-border pt-4 text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-navy-950">Maa Vindhawasini Enterprises</p>
          <p>Patna, Bihar, India</p>
        </div>
      </div>
    </div>
  );
};
export default MobileNavigation;
