import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          bg-[var(--surface-2)] border border-[var(--border)]
          text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
          focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30
          transition-all duration-200
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          bg-[var(--surface-2)] border border-[var(--border)]
          text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
          focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30
          transition-all duration-200 resize-none
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}