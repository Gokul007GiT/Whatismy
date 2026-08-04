'use client';

import * as React from 'react';
import {
  Globe,
  MapPin,
  Building2,
  Clock,
  Globe2,
  Compass,
  Hash,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Fingerprint,
  Copy,
  Check,
  RefreshCw,
  Wifi,
  AlertCircle,
} from 'lucide-react';
import type { IPInfo, IPVersion, ClientInfo } from '@/lib/types';
import { parseUserAgent } from '@/lib/useragent';
import { InfoCard } from '@/components/info-card';
import { Button } from '@/components/ui/button';

function classifyVersion(ip: string): IPVersion {
  return ip.includes(':') ? 'IPv6' : 'IPv4';
}

interface IpWhoIsResponse {
  ip: string;
  success: boolean;
  type: string;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  timezone: { id: string | null } | null;
  latitude: number | null;
  longitude: number | null;
  connection: {
    asn: number | null;
    org: string | null;
    isp: string | null;
  } | null;
  message?: string;
}

interface IpApiCoResponse {
  ip: string;
  city: string | null;
  region: string | null;
  country_name: string | null;
  country_code: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  org: string | null;
  asn: string | null;
  error?: boolean;
  reason?: string;
}

async function fetchWithTimeout(
  url: string,
  timeoutMs = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromIpWhoIs(): Promise<IPInfo> {
  const res = await fetchWithTimeout('https://ipwho.is/');
  if (!res.ok) throw new Error(`ipwho.is failed (${res.status})`);
  const data = (await res.json()) as IpWhoIsResponse;
  if (!data.success || !data.ip) {
    throw new Error(data.message || 'ipwho.is returned an error');
  }
  const conn = data.connection;
  return {
    ip: data.ip,
    version: classifyVersion(data.ip),
    city: data.city,
    region: data.region,
    country: data.country,
    countryCode: data.country_code,
    timezone: data.timezone?.id ?? null,
    latitude: data.latitude,
    longitude: data.longitude,
    isp: conn?.isp || conn?.org || null,
    asn: conn?.asn ? `AS${conn.asn}` : null,
    org: conn?.org ?? null,
  };
}

async function fetchFromIpApiCo(): Promise<IPInfo> {
  const res = await fetchWithTimeout('https://ipapi.co/json/');
  if (!res.ok) throw new Error(`ipapi.co failed (${res.status})`);
  const data = (await res.json()) as IpApiCoResponse;
  if (data.error || !data.ip) {
    throw new Error(data.reason || 'ipapi.co returned an error');
  }
  return {
    ip: data.ip,
    version: classifyVersion(data.ip),
    city: data.city,
    region: data.region,
    country: data.country_name,
    countryCode: data.country_code,
    timezone: data.timezone,
    latitude: data.latitude,
    longitude: data.longitude,
    isp: data.org,
    asn: data.asn,
    org: data.org,
  };
}

// Try multiple providers in order so a single outage or rate limit doesn't
// break the page. The first provider that resolves successfully wins.
async function fetchIPInfo(): Promise<IPInfo> {
  const providers = [fetchFromIpWhoIs, fetchFromIpApiCo];
  let lastError: unknown;

  for (const provider of providers) {
    try {
      return await provider();
    } catch (e) {
      lastError = e;
    }
  }

  throw new Error(
    lastError instanceof Error
      ? lastError.message
      : 'Unable to reach any IP lookup provider.'
  );
}

function DeviceIcon({ device }: { device: string }) {
  if (device === 'Mobile') return <Smartphone className="h-4 w-4" />;
  if (device === 'Tablet') return <Tablet className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

export function IPDashboard() {
  const [ipInfo, setIpInfo] = React.useState<IPInfo | null>(null);
  const [client, setClient] = React.useState<ClientInfo | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await fetchIPInfo();
      setIpInfo(info);
      setClient(
        parseUserAgent(
          typeof navigator !== 'undefined' ? navigator.userAgent : ''
        )
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to load IP information.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleCopyIP = async () => {
    if (!ipInfo?.ip) return;
    try {
      await navigator.clipboard.writeText(ipInfo.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !ipInfo || !client) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-muted-foreground">
          {error || 'Unable to load IP information.'}
        </p>
        <Button onClick={load} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero IP display */}
      <div className="relative animate-fade-in-up overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 text-center md:p-12">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Wifi className="h-3.5 w-3.5 text-primary" />
            Your Public IP Address
          </div>
          <div className="group relative inline-block">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {ipInfo.ip}
            </h1>
            <button
              onClick={handleCopyIP}
              aria-label="Copy IP address"
              className="absolute -right-12 top-1/2 hidden -translate-y-1/2 rounded-lg border border-border/60 bg-background/80 p-2.5 text-muted-foreground transition-all hover:text-foreground hover:shadow-md sm:block"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Globe className="h-3.5 w-3.5" />
              {ipInfo.version}
            </span>
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Location & Network cards */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Location &amp; Network
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="Country"
            value={
              ipInfo.country ? (
                <span className="flex items-center gap-2">
                  {ipInfo.countryCode && (
                    <span className="text-lg">
                      {countryFlag(ipInfo.countryCode)}
                    </span>
                  )}
                  {ipInfo.country}
                </span>
              ) : (
                'N/A'
              )
            }
            icon={Globe2}
            delay={0.1}
          />
          <InfoCard
            label="Region / State"
            value={ipInfo.region || 'N/A'}
            icon={MapPin}
            delay={0.15}
          />
          <InfoCard
            label="City"
            value={ipInfo.city || 'N/A'}
            icon={MapPin}
            delay={0.2}
          />
          <InfoCard
            label="Timezone"
            value={ipInfo.timezone || 'N/A'}
            icon={Clock}
            delay={0.25}
          />
          <InfoCard
            label="ISP"
            value={ipInfo.isp || 'N/A'}
            icon={Building2}
            delay={0.3}
          />
          <InfoCard
            label="ASN"
            value={ipInfo.asn || 'N/A'}
            icon={Hash}
            delay={0.35}
          />
        </div>
      </div>

      {/* Device & Browser cards */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Device &amp; Browser
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="Browser"
            value={
              client.browserVersion
                ? `${client.browser} ${client.browserVersion}`
                : client.browser
            }
            icon={Chrome}
            delay={0.4}
          />
          <InfoCard
            label="Operating System"
            value={client.os}
            icon={Monitor}
            delay={0.45}
          />
          <InfoCard
            label="Device Type"
            value={
              <span className="flex items-center gap-2">
                <DeviceIcon device={client.device} />
                {client.device}
              </span>
            }
            icon={Fingerprint}
            delay={0.5}
          />
        </div>
      </div>

      {/* User Agent */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          User Agent
        </h2>
        <div
          className="animate-fade-in-up rounded-2xl border border-border/50 bg-card p-5"
          style={{ animationDelay: '0.55s' }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Full User Agent String
            </span>
          </div>
          <p className="mt-3 break-all font-mono text-sm text-muted-foreground">
            {client.userAgent}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 text-center md:p-12">
        <div className="mx-auto mb-4 h-6 w-40 animate-pulse rounded-full bg-muted" />
        <div className="mx-auto h-16 w-72 animate-pulse rounded-2xl bg-muted" />
        <div className="mx-auto mt-4 h-8 w-32 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-border/50 bg-card"
          />
        ))}
      </div>
    </div>
  );
}

function countryFlag(code: string): string {
  if (code.length !== 2) return '';
  const upper = code.toUpperCase();
  const codePoints = [upper.charCodeAt(0), upper.charCodeAt(1)].map(
    (c) => 0x1f1e6 + c - 65
  );
  return String.fromCodePoint(...codePoints);
}
