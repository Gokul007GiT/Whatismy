import { IPDashboard } from '@/components/ip-dashboard';

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <p className="mb-3 animate-fade-in text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Live IP Lookup Dashboard
          </p>
          <h1
            className="animate-fade-in-up text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ animationDelay: '0.08s' }}
          >
            Public IPv4 &amp; IPv6 visibility with a cleaner, faster interface.
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl animate-fade-in-up text-sm leading-6 text-muted-foreground sm:text-base"
            style={{ animationDelay: '0.14s' }}
          >
            View your public network identity, approximate location, provider,
            browser, and device details in one responsive dashboard.
          </p>
        </section>

        <IPDashboard />
      </div>
    </div>
  );
}
