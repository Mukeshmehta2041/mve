import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline-light' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string; // If provided, behaves like an anchor tag
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  href,
  type = 'button',
  target,
  rel,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-card transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
    secondary: 'bg-white border-2 border-navy-950 text-navy-950 hover:border-primary hover:text-primary',
    // For use on the dark navy page heroes, where `secondary` would be white-on-white
    'outline-light': 'bg-transparent border-2 border-white/70 text-white hover:border-primary hover:text-primary',
    ghost: 'bg-transparent text-navy-950 hover:bg-slate-100 hover:text-primary',
    whatsapp: 'bg-success text-white hover:bg-green-600 shadow-sm',
  };

  const sizeClasses = {
    // Normal minimum sizes: 48px desktop (h-12), 46px mobile (h-[46px])
    sm: 'h-10 px-4 text-sm',
    md: 'h-[46px] md:h-12 px-[22px] md:px-[26px] text-base',
    lg: 'h-14 px-8 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2 inline-flex">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2 inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], widthClass, className)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorProps}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], widthClass, className)}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(({
  children,
  className,
  ariaLabel,
  href,
  type = 'button',
  target,
  rel,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-card hover:bg-slate-100 transition-all duration-150 focus-ring cursor-pointer text-navy-950';

  if (href) {
    const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={cn(baseClasses, className)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cn(baseClasses, className)}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';

export default Button;
