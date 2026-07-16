import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  wide = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        wide ? 'max-w-[1360px]' : 'max-w-[1200px]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
export default Container;
