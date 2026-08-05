import type { Metadata } from 'next';
import { Zap, ShieldCheck, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about What Is My IP — a free, privacy-first tool for discovering your public IP address and network information.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          About What Is My IP
        </h1>
        <p className="text-base text-muted-foreground">
          A free, fast, and privacy-first tool for discovering your public IP
          address and network details.
        </p>
      </div>

      <div className="prose-neutral space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          What Is My IP is built to give you an instant, clear picture of how
          your device appears to the internet. Whether you are troubleshooting
          a network issue, verifying a VPN connection, or just curious about
          your digital footprint, our tool surfaces the details that matter in
          a single, distraction-free view.
        </p>
        <p>
          We believe network information should be accessible to everyone. That
          is why every feature on this site is free, requires no sign-up, and
          works on any device — desktop, tablet, or mobile.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            icon: Zap,
            title: 'Speed',
            text: 'Built on a modern edge stack for sub-second response times.',
          },
          {
            icon: ShieldCheck,
            title: 'Privacy',
            text: 'No logging, no tracking, no data sales. Your lookups are never stored.',
          },
          {
            icon: Globe,
            title: 'Global',
            text: 'Works anywhere in the world, on any device with a web browser.',
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="animate-fade-in-up rounded-2xl border border-border/50 bg-card p-6 text-center"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 text-center">
        <Heart className="mx-auto mb-3 h-6 w-6 text-primary" />
        <p className="text-sm text-muted-foreground">
          Built with care using Next.js, TypeScript, and Tailwind CSS. A
          growing suite of network tools is on the way — check the Tools page
          for what is coming next.
        </p>
      </div>
    </div>
  );
}
