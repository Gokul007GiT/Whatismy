import type { Metadata } from 'next';
import { Server } from 'lucide-react';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
  title: 'DNS Lookup',
  description:
    'Query DNS records including A, AAAA, MX, NS, TXT, and CNAME for any domain. Free DNS lookup tool.',
};

export default function DnsLookupPage() {
  return (
    <ComingSoon
      title="DNS Lookup"
      description="Query any DNS record type — A, AAAA, MX, NS, TXT, CNAME, SOA, and more — for any domain name. Perfect for debugging and verifying DNS configuration."
      icon={Server}
    />
  );
}
