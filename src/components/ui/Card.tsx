import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  as: Component = 'div',
  hoverable = true,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'bg-white border border-border rounded-card p-5 md:p-6 text-left',
        // Card hover: translateY(-3px) and slightly increase shadow (design.md Section 6 & 11)
        hoverable && 'hover:-translate-y-[3px] hover:shadow-floating transition-all duration-200 shadow-card',
        !hoverable && 'shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
export default Card;
