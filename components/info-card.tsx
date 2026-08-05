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
      className={`group relative animate-fade-in-up rounded-2xl border border-black/5 glass shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg ${className ?? ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {label}
            </span>
          </div>
          {copyValue && (
            <button
              onClick={handleCopy}
              aria-label={`Copy ${label}`}
              className="text-muted-foreground opacity-0 transition-all hover:text-foreground group-hover:opacity-100"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <div className="mt-3 break-words text-[15px] font-semibold text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}
