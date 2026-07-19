import React from 'react';
import { cn } from '../../lib/utils';

export interface ProcessTimelineStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

interface ProcessTimelineProps {
  steps: ProcessTimelineStep[];
  /** 4-across (shorter lists) or 6-across (longer workflows). */
  columns?: 4 | 6;
  /** Horizontal connector line behind the circles on large screens. */
  showConnector?: boolean;
  className?: string;
}

/**
 * A numbered-circle process/workflow list.
 *
 * Three pages (custom fabrication, product detail, quality) each hand-rolled
 * this same markup with small drifts - a 44px vs 48px circle, a missing white
 * ring on one badge, an 11px description on another. One implementation now;
 * column count and the connector line are the only real per-page variables.
 */
export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  columns = 6,
  showConnector = true,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {showConnector && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-slate-100 z-0"
        />
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-6 relative z-10',
          columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-6'
        )}
      >
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="bg-slate-50 lg:bg-transparent border border-border lg:border-none p-5 lg:p-0 rounded-card flex flex-col items-start"
          >
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500">
                <img
                  src={step.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5 object-contain"
                  width={20}
                  height={20}
                  decoding="async"
                />
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-navy-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {step.stepNumber}
              </span>
            </div>
            <h3 className="font-bold text-sm text-navy-950 mb-1.5 leading-snug">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProcessTimeline;
