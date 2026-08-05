import type { Metadata } from 'next';
import { Lock } from 'lucide-react';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
  title: 'SSL Checker',
  description:
    'Inspect the SSL/TLS certificate chain, expiry, and configuration for any domain. Free SSL checker.',
};

export default function SslCheckerPage() {
  return (
    <ComingSoon
      title="SSL Certificate Checker"
      description="Inspect the SSL/TLS certificate chain, issuer, validity period, expiry date, and configuration for any domain. Make sure your HTTPS setup is secure and up to date."
      icon={Lock}
    />
  );
}
