import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
  title: 'IP Lookup',
  description:
    'Look up the location, ISP, and ASN for any IP address. Free and fast IP geolocation tool.',
};

export default function IPLookupPage() {
  return (
    <ComingSoon
      title="IP Lookup Tool"
      description="Soon you will be able to look up the geographic location, ISP, ASN, and network details for any public IP address — not just your own. Enter an IP, get instant results."
      icon={Search}
    />
  );
}
