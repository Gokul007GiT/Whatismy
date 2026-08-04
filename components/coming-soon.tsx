import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ElementType;
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20 md:py-32">
      <div className="flex flex-col items-center text-center">
        {Icon && (
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary animate-fade-in">
            <Icon className="h-8 w-8" />
          </div>
        )}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary animate-fade-in-up">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight animate-fade-in-up delay-100 sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-xl text-base text-muted-foreground animate-fade-in-up delay-200">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-in-up delay-300">
          <Link href="/">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="outline">View All Tools</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
