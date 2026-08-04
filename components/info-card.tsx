import { Copy, Check } from 'lucide-react';
import * as React from 'react';

interface InfoCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
  copyValue?: string;
  className?: string;
  delay?: number;
}

export function InfoCard({
  label,
  value,
  icon: Icon,
  copyValue,
  className,
  delay = 0,
}: InfoCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`group relative animate-fade-in-up rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${className ?? ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        {copyValue && (
          <button
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
            className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      <div className="mt-3 break-words text-base font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}
