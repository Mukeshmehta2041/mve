import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position and moves focus to the main landmark on navigation.
 *
 * Without this, a client-side route change leaves the viewport mid-scroll and
 * leaves screen-reader focus on the now-unmounted link, so the new page is
 * never announced. Hash links are left alone so in-page anchors still work.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

    // Focus the main landmark so assistive tech lands on the new page content.
    // preventScroll keeps this from fighting the scroll above.
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
