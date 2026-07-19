import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
  /** Whether the overlay is currently open. */
  isOpen: boolean;
  /** Ref to the element that contains the trapped content. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Called on Escape, and on backdrop dismissal by the caller. */
  onClose: () => void;
  /**
   * Element to return focus to on close. Defaults to whatever was focused when
   * the overlay opened, which is correct for most triggers.
   */
  restoreFocusTo?: React.RefObject<HTMLElement | null>;
}

/**
 * Modal overlay behaviour: focus trap, body scroll lock, Escape to close, and
 * focus restoration on close.
 *
 * Shared by the mobile nav drawer and the product image lightbox so the two
 * don't drift. Escape is bound at the window, so it works regardless of whether
 * focus is currently inside the container.
 */
export function useFocusTrap({
  isOpen,
  containerRef,
  onClose,
  restoreFocusTo,
}: FocusTrapOptions): void {
  // What had focus before we opened; used when no explicit trigger is given.
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // Guards the initial mount: without this, the close path runs on first render
  // and steals focus to the trigger before the user has interacted at all.
  const hasOpened = useRef(false);

  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      focusable?.[0]?.focus();
    } else {
      document.body.style.overflow = '';

      if (hasOpened.current) {
        const target = restoreFocusTo?.current ?? previouslyFocused.current;
        target?.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, containerRef, restoreFocusTo]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, containerRef, onClose]);
}
