import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  FileText,
  Server,
  ArrowLeftRight,
  Lock,
  Wrench,
} from 'lucide-react';
import { tools } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Network Tools',
  description:
    'A growing collection of free network tools including IP Lookup, WHOIS, DNS Lookup, Reverse DNS, and SSL Checker.',
};

const ICONS: Record<string, React.ElementType> = {
  Search,
  FileText,
  Server,
  ArrowLeftRight,
  Lock,
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Wrench className="h-3.5 w-3.5" />
          Network Toolkit
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Network Tools
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          A collection of free, fast networking tools to help you diagnose,
          inspect, and understand internet infrastructure. New tools are being
          added regularly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => {
          const Icon = ICONS[tool.icon] || Search;
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group relative animate-fade-in-up rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {tool.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-semibold">{tool.name}</h2>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
