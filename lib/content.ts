import {
  Zap,
  ShieldCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const featureList: Feature[] = [
  {
    title: 'Lightning Fast',
    description:
      'Your IP details are fetched and rendered in milliseconds using a globally distributed network of edge servers.',
    icon: Zap,
  },
  {
    title: 'Privacy First',
    description:
      'We never log, store, or sell your IP information. Every lookup is processed in real time and immediately discarded.',
    icon: ShieldCheck,
  },
  {
    title: 'Detailed Insights',
    description:
      'See your public IP, ISP, ASN, approximate location, timezone, browser, operating system, and device type in one view.',
    icon: Globe,
  },
];

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
  status: 'available' | 'coming-soon';
}

export const tools: Tool[] = [
  {
    slug: 'ip-lookup',
    name: 'IP Lookup',
    description:
      'Look up the location, ISP, and ASN for any IP address, not just your own.',
    icon: 'Search',
    status: 'coming-soon',
  },
  {
    slug: 'whois-lookup',
    name: 'WHOIS Lookup',
    description:
      'Retrieve registration and ownership records for any domain name.',
    icon: 'FileText',
    status: 'coming-soon',
  },
  {
    slug: 'dns-lookup',
    name: 'DNS Lookup',
    description:
      'Query DNS records including A, AAAA, MX, NS, TXT, and CNAME for any domain.',
    icon: 'Server',
    status: 'coming-soon',
  },
  {
    slug: 'reverse-dns',
    name: 'Reverse DNS',
    description:
      'Resolve a hostname from an IP address using reverse DNS (PTR record) lookups.',
    icon: 'ArrowLeftRight',
    status: 'coming-soon',
  },
  {
    slug: 'ssl-checker',
    name: 'SSL Checker',
    description:
      'Inspect the SSL/TLS certificate chain, expiry, and configuration for any domain.',
    icon: 'Lock',
    status: 'coming-soon',
  },
];
