import React from 'react';
import { cn } from '../../lib/utils';

interface BaseInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

// Input component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = `${inputId}-error`;
    return (
      <div className="w-full text-left mb-4">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-navy-950 mb-1.5"
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full h-12 px-4 rounded-sm border border-border bg-white text-navy-950 placeholder-slate-500 focus-ring transition-colors focus:border-primary focus:outline-none text-base',
            error ? 'border-error focus:border-error' : '',
            className
          )}
          {...props}
        />
        {error && <FormErrorMessage message={error} id={errorId} />}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Select component
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseInputProps {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = `${selectId}-error`;
    return (
      <div className="w-full text-left mb-4">
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-navy-950 mb-1.5"
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full h-12 pl-4 pr-10 rounded-sm border border-border bg-white text-navy-950 focus-ring transition-colors focus:border-primary focus:outline-none text-base appearance-none cursor-pointer',
              error ? 'border-error focus:border-error' : '',
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            {/* Custom down chevron arrow */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <FormErrorMessage message={error} id={errorId} />}
      </div>
    );
  }
);
Select.displayName = 'Select';

// Textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseInputProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = `${textareaId}-error`;
    return (
      <div className="w-full text-left mb-4">
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-navy-950 mb-1.5"
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            // Minimum height 140px (design.md Section 7)
            'w-full min-h-[140px] p-4 rounded-sm border border-border bg-white text-navy-950 placeholder-slate-500 focus-ring transition-colors focus:border-primary focus:outline-none text-base resize-y',
            error ? 'border-error focus:border-error' : '',
            className
          )}
          {...props}
        />
        {error && <FormErrorMessage message={error} id={errorId} />}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// Checkbox component
export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Omit<BaseInputProps, 'label'> {
  label: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    // useId, not Math.random: the previous id changed on every render, so the
    // label/input association silently broke after the first re-render.
    const generatedId = React.useId();
    const checkboxId = id || `checkbox-${generatedId}`;
    const errorId = `${checkboxId}-error`;
    return (
      <div className="w-full text-left mb-4">
        <div className="flex items-start">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-5 h-5 mt-0.5 text-primary-ink border-border rounded focus-ring cursor-pointer',
              error ? 'border-error' : '',
              className
            )}
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className="ml-2.5 text-sm cursor-pointer select-none font-medium text-navy-950"
          >
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        </div>
        {error && <FormErrorMessage message={error} className="mt-1" id={errorId} />}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// File Upload component shell
export interface FileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {
  formatsLabel?: string;
  maxSizeLabel?: string;
  selectedFile?: File | null;
  onClearFile?: () => void;
  /** Draws attention to the dropzone itself, so callers don't wrap it in another card. */
  highlighted?: boolean;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      required,
      formatsLabel = 'PDF, DOCX, JPG, PNG',
      maxSizeLabel = '10MB',
      selectedFile,
      onClearFile,
      highlighted = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const fileId = id || `file-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = `${fileId}-error`;
    return (
      <div className="w-full text-left mb-4">
        <label htmlFor={fileId} className="block text-sm font-semibold text-navy-950 mb-1.5">
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
        <div
          className={cn(
            'border-2 border-dashed border-border rounded-card p-5 bg-surface-muted hover:bg-slate-100/50 hover:border-slate-500 transition-colors flex flex-col items-center justify-center text-center relative cursor-pointer',
            highlighted && !error ? 'border-primary bg-primary-soft' : '',
            error ? 'border-error bg-error/5' : ''
          )}
        >
          <input
            id={fileId}
            type="file"
            ref={ref}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn('absolute inset-0 w-full h-full opacity-0 cursor-pointer', className)}
            {...props}
          />
          
          <svg
            className="w-8 h-8 text-slate-500 mb-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 16.5 4.5H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          {selectedFile ? (
            <div className="relative z-10 flex items-center bg-white border border-border px-3 py-1.5 rounded-sm">
              <span className="text-sm font-medium text-navy-950 truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              {onClearFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClearFile();
                  }}
                  // 44px hit area: a near-miss on the old 16px icon fell through
                  // to the full-cover file input behind it and reopened the picker
                  className="ml-1 -mr-1.5 inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-slate-500 hover:text-error focus-ring rounded-sm"
                  aria-label={`Remove ${selectedFile.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <>
              <span className="text-sm font-semibold text-navy-950">
                Click to upload drawing or document
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Accepted: {formatsLabel} (Max: {maxSizeLabel})
              </span>
            </>
          )}
        </div>
        {error && <FormErrorMessage message={error} id={errorId} />}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';

// Form Error Message component.
// `id` is what each control points its aria-describedby at, so the message is
// read out with the field rather than being visual-only.
export const FormErrorMessage: React.FC<{ message: string; className?: string; id?: string }> = ({
  message,
  className,
  id,
}) => {
  return (
    <p
      id={id}
      className={cn('text-sm text-error font-medium flex items-center mt-1.5', className)}
    >
      <svg
        className="w-4 h-4 mr-1 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
};

// Form Success Message component
export const FormSuccessMessage: React.FC<{ message: string; className?: string }> = ({
  message,
  className,
}) => {
  return (
    <div
      role="status"
      className={cn(
        'p-4 bg-success-ink/5 border border-success-ink/20 text-navy-950 rounded-card flex items-start text-left',
        className
      )}
    >
      <svg
        className="w-5 h-5 text-success-ink mr-2.5 mt-0.5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="text-base font-bold leading-tight">Submission Successful</p>
        <p className="text-sm text-slate-600 leading-normal mt-1">{message}</p>
      </div>
    </div>
  );
};
