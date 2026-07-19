import React from 'react';
import { cn } from '../../lib/utils';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center text-primary-ink hover:text-primary-ink-hover font-semibold transition group focus-ring rounded-sm',
        className
      )}
      {...props}
    >
      <span className="border-b border-transparent group-hover:border-primary-hover transition duration-150">
        {children}
      </span>
      {/* 
        Arrow SVG moving on hover (design.md Section 11):
        Underline or arrow movement on hover.
      */}
      <svg
        className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  );
};
export default TextLink;
