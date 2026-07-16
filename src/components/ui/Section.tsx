import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  background?: 'light' | 'muted' | 'dark' | 'transparent';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  as: Component = 'section',
  background = 'transparent',
  ...props
}) => {
  const bgClasses = {
    light: 'bg-white text-foreground',
    muted: 'bg-surface-muted text-foreground',
    dark: 'bg-navy-950 text-white',
    transparent: '',
  };

  return (
    <Component
      className={cn(
        // Responsive vertical padding (design.md Section 5)
        'py-10 md:py-14 lg:py-20 xl:py-24 relative overflow-hidden',
        bgClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
export default Section;
