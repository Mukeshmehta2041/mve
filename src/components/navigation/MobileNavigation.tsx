import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationData, contactData } from '../../data';
import { ASSETS } from '../../lib/assets';
import { Button, IconButton } from '../ui';
import { cn } from '../../lib/utils';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [productsExpanded, setProductsExpanded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const verifiedPhones = contactData.phones.filter((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  // Toggle products accordion
  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setProductsExpanded((prev) => !prev);
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened
      const focusable = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      if (focusable && focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    } else {
      document.body.style.overflow = '';
      // Restore focus to the trigger button
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, triggerRef]);

  // Focus Trapping and Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;

        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        const focusableElements = Array.from(focusable).filter(
          (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
        );

        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // If shift + tab and active on first element, wrap to last
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          // If tab and active on last element, wrap to first
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
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

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={cn(
          'absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-floating flex flex-col p-6 transition-transform duration-300 ease-out transform safe-bottom',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <span className="font-bold text-navy-950 font-heading text-lg">Menu</span>
          <IconButton ariaLabel="Close menu" onClick={onClose} className="hover:bg-slate-100">
            <svg className="w-6 h-6 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        {/* Scrollable menu links */}
        <nav className="flex-grow overflow-y-auto space-y-3.5 text-left pr-2">
          {navigationData.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (item.isCta) {
              return (
                <div key={item.name} className="pt-4 border-t border-border">
                  <Button
                    href={item.href}
                    variant="primary"
                    fullWidth
                    className="font-bold uppercase tracking-wider h-[46px] text-sm"
                    onClick={onClose}
                  >
                    {item.name}
                  </Button>
                </div>
              );
            }

            if (hasChildren) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    type="button"
                    onClick={handleProductsClick}
                    aria-expanded={productsExpanded}
                    className="w-full flex items-center justify-between text-base font-bold text-navy-950 py-2 px-2 hover:bg-slate-55 rounded-sm transition-colors text-left cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <svg
                      className={cn(
                        'w-4 h-4 transition-transform duration-200 text-slate-500',
                        productsExpanded ? 'rotate-180 text-primary' : ''
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Collapsible Accordion Submenu */}
                  <div
                    className={cn(
                      'pl-4 border-l border-slate-200 space-y-2.5 overflow-hidden transition-all duration-300',
                      productsExpanded ? 'max-h-[500px] py-1.5 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
                    )}
                  >
                    <NavLink
                      to="/products"
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'block text-sm font-bold text-slate-500 hover:text-primary transition-colors py-1 px-2',
                          isActive ? 'text-primary' : ''
                        )
                      }
                    >
                      View All Products
                    </NavLink>
                    {item.children?.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'block text-sm font-medium text-slate-600 hover:text-primary transition-colors py-1 px-2',
                            isActive ? 'text-primary font-bold' : ''
                          )
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'block text-base font-bold text-navy-950 hover:text-primary py-2 px-2 hover:bg-slate-50 rounded-sm transition-colors',
                    isActive ? 'text-primary bg-primary-soft/10' : ''
                  )
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Contact actions inside menu (Call and WhatsApp) */}
        <div className="mt-auto border-t border-border pt-4 text-xs text-slate-550 space-y-3.5">
          <div className="flex flex-col gap-2.5">
            {verifiedPhones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center text-sm font-bold text-navy-950 hover:text-primary bg-slate-50 border border-border p-2.5 rounded-card transition-all"
              >
                <img src={ASSETS.icons.phone} alt="" className="w-4 h-4 mr-2.5 text-primary" />
                <span>Call: {phone}</span>
              </a>
            ))}

            {hasWhatsapp && (
              <a
                href={contactData.whatsappMessageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-bold text-white bg-success hover:bg-green-600 p-2.5 rounded-card transition-all"
              >
                <img src={ASSETS.icons.whatsapp} alt="" className="w-4 h-4 mr-2.5 brightness-0 invert" />
                <span>WhatsApp Message</span>
              </a>
            )}
          </div>

          <div className="pt-2 text-slate-500 text-center">
            <p className="font-semibold text-navy-950">Maa Vindhawasini Enterprises</p>
            <p className="text-[11px] mt-0.5">Patna, Bihar, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileNavigation;
