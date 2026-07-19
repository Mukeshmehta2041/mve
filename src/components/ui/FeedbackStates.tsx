import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center py-10 text-slate-500', className)}
      {...props}
    >
      <div
        className={cn(
          'border-primary border-t-transparent rounded-full animate-spin mb-3',
          sizeClasses[size]
        )}
      ></div>
      {message && <span className="text-sm font-semibold tracking-wide uppercase">{message}</span>}
    </div>
  );
};

interface EmptyGuardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export const EmptyGuard: React.FC<EmptyGuardProps> = ({
  title = 'No Content Available',
  message = 'The requested information is currently being compiled or verified. Please check back later.',
  actionText,
  onActionClick,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 md:p-12 border border-dashed border-slate-400 rounded-card bg-slate-50 text-center max-w-lg mx-auto my-6',
        className
      )}
      {...props}
    >
      <div className="w-12 h-12 bg-slate-200/60 rounded-full flex items-center justify-center text-slate-500 mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008h-.008v-.008Z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-navy-950 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 leading-normal mb-5">{message}</p>
      {actionText && onActionClick && (
        <button
          type="button"
          onClick={onActionClick}
          className="text-sm font-bold text-primary-ink hover:text-primary-ink-hover focus-ring px-3 py-1.5 rounded-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
