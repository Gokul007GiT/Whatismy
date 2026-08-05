import type { Metadata } from 'next';
import { ArrowLeftRight } from 'lucide-react';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
  title: 'Reverse DNS Lookup',
  description:
    'Resolve a hostname from an IP address using reverse DNS (PTR record) lookups. Free and fast.',
};

export default function ReverseDnsPage() {
  return (
    <ComingSoon
      title="Reverse DNS Lookup"
      description="Resolve a hostname from any IP address using reverse DNS (PTR record) lookups. Identify the domain associated with an IP in real time."
      icon={ArrowLeftRight}
    />
  );
}
