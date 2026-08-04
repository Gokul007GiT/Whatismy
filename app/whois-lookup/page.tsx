import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
  title: 'WHOIS Lookup',
  description:
    'Retrieve registration and ownership records for any domain name with our free WHOIS lookup tool.',
};

export default function WhoisLookupPage() {
  return (
    <ComingSoon
      title="WHOIS Lookup"
      description="Look up the registration, ownership, and expiry details for any domain name. Query the global WHOIS database in seconds."
      icon={FileText}
    />
  );
}
