import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'primary' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-pill text-[12px] md:text-sm font-medium tracking-wide';
  
  const variantClasses = {
    neutral: 'bg-slate-100 text-slate-600',
    primary: 'bg-primary-soft text-primary-ink',
    success: 'bg-success-ink/10 text-success-ink border border-success-ink/20',
    warning: 'bg-warning-soft text-warning border border-warning/20',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  icon?: string; // Icon image/SVG URL
  description?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  label,
  value,
  icon,
  description,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-start p-4 bg-white border border-border rounded-card hover:shadow-card transition duration-200',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex-shrink-0 w-10 h-10 mr-3.5 bg-primary-soft rounded-sm flex items-center justify-center text-primary">
          <img src={icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" width={20} height={20} decoding="async" />
        </div>
      )}
      <div>
        <span className="text-[12px] leading-none tracking-wider text-slate-500 font-semibold uppercase block mb-1">
          {label}
        </span>
        <h4 className="text-base font-bold text-navy-950 leading-tight mb-1">
          {value}
        </h4>
        {description && (
          <p className="text-sm text-slate-600 leading-normal mt-1.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
