import { IPDashboard } from '@/components/ip-dashboard';
import { featureList } from '@/lib/content';

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
      <section className="mb-10 text-center">
        <p className="mb-3 animate-fade-in text-sm font-medium text-muted-foreground">
          Free, fast, and private IP detection
        </p>
        <h2 className="sr-only">What is my IP address?</h2>
      </section>

      <IPDashboard />

      {/* Feature highlights */}
      <section className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        {featureList.map((feature, i) => (
          <div
            key={feature.title}
            className="animate-fade-in-up rounded-2xl border border-border/50 bg-card p-6"
            style={{ animationDelay: `${0.6 + i * 0.1}s` }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* FAQ-style info */}
      <section className="mt-20 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 md:p-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          About IP Addresses
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base font-semibold">
              What is a public IP address?
            </h3>
            <p className="text-sm text-muted-foreground">
              A public IP address is the unique identifier assigned to your
              network by your Internet Service Provider. It allows devices
              across the internet to communicate with your connection. Unlike
              private IPs used inside your home or office, your public IP is
              visible to every website and service you connect to.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">
              What is the difference between IPv4 and IPv6?
            </h3>
            <p className="text-sm text-muted-foreground">
              IPv4 uses a 32-bit address space (about 4.3 billion addresses),
              while IPv6 uses a 128-bit space (340 undecillion addresses). IPv6
              was introduced to solve IPv4 exhaustion and supports a vastly
              larger number of connected devices.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">
              Can my IP address reveal my location?
            </h3>
            <p className="text-sm text-muted-foreground">
              Your IP address can be mapped to a general geographic area,
              typically down to the city or region level. It does not provide
              an exact street address. The accuracy depends on the database
              your ISP registers its address blocks against.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">
              Is this tool private?
            </h3>
            <p className="text-sm text-muted-foreground">
              Your IP information is fetched in real time and never stored on
              our servers. We do not log, track, or share your browsing data.
              Every visit is processed and discarded immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
