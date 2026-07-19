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
        // One elevation language, not two. This previously paired a 1px border
        // with a 28px-blur shadow (escalating to 50px on hover) - the shadow
        // already reads as elevation, so the border on top read as a stray
        // outline. Resting state is the border; hover firms the border and
        // lifts, which suits a precision-fabrication brand better than a float.
        'bg-white border border-border rounded-card p-5 md:p-6 text-left',
        hoverable &&
          'hover:-translate-y-[3px] hover:border-slate-500 transition-[transform,border-color] duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
export default Card;
