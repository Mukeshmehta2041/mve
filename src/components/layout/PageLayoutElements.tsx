import React from 'react';
import { Container } from '../ui/Container';
import { cn } from '../../lib/utils';

// PageMain: wraps main content with accessibility targets (Skip to Content target)
type PageMainProps = React.HTMLAttributes<HTMLElement>;

export const PageMain: React.FC<PageMainProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        // Padding bottom prevents MobileStickyActionBar from covering standard elements
        'flex-grow pb-16 lg:pb-0 focus:outline-none text-left',
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

// ContentContainer: standard card/centering for text-heavy content like policies or terms
interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardStyle?: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  cardStyle = true,
  ...props
}) => {
  return (
    <Container className="my-8 md:my-12">
      <div
        className={cn(
          'max-w-3xl mx-auto text-left font-sans',
          cardStyle ? 'bg-white border border-border p-6 md:p-10 rounded-card shadow-card' : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Container>
  );
};

// ContentSection: standardized semantic section with paddings
interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: 'light' | 'muted' | 'dark' | 'transparent';
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className,
  background = 'transparent',
  ...props
}) => {
  const bgClasses = {
    light: 'bg-white text-foreground',
    muted: 'bg-surface-muted text-foreground',
    dark: 'bg-navy-950 text-white border-slate-800',
    transparent: '',
  };

  return (
    <section
      className={cn(
        'py-10 md:py-14 lg:py-20 relative overflow-hidden',
        bgClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

// MobileActionSpacer: adds spacing to offset the sticky bar height at the bottom of viewports
export const MobileActionSpacer: React.FC = () => {
  return <div className="h-16 lg:hidden" aria-hidden="true" />;
};
