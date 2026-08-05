'use client';

import * as React from 'react';
import {
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
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  Loader2,
  Network,
} from 'lucide-react';
import { InfoCard } from '@/components/info-card';
import { Button } from '@/components/ui/button';
import { useMapExperience } from '@/components/map-experience';

function DeviceIcon({ device }: { device: string }) {
  if (device === 'Mobile') return <Smartphone className="h-4 w-4" />;
  if (device === 'Tablet') return <Tablet className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

function countryFlag(code: string): string {
  if (code.length !== 2) return '';
  const upper = code.toUpperCase();
  const codePoints = [upper.charCodeAt(0), upper.charCodeAt(1)].map(
    (c) => 0x1f1e6 + c - 65
  );
  return String.fromCodePoint(...codePoints);
}

function IPBlock({
  label,
  sublabel,
  address,
  accentClasses,
  delay,
}: {
  label: string;
  sublabel: string;
  address: string | null;
  accentClasses: string;
  delay: number;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const present = !!address;

  return (
    <div
      className="group relative animate-fade-in-up flex flex-1 flex-col rounded-3xl border border-black/5 glass shadow-premium transition-all duration-300 hover:shadow-premium-lg"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex h-7 items-center rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.1em] ${accentClasses}`}
          >
            {label}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {sublabel}
          </span>
        </div>
        {present && (
          <button
            onClick={handleCopy}
            aria-label={`Copy ${label} address`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:scale-110 hover:bg-black/5 hover:text-foreground active:scale-95"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 items-center px-5 pb-6 pt-3">
        {present ? (
          <p className="select-all break-all font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-[28px] md:leading-tight">
            {address}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Not detected on this network
          </p>
        )}
      </div>
    </div>
  );
}

export function IPDashboard() {
  const {
    dual,
    ipInfo,
    client,
    loading,
    refreshing,
    error,
    refresh,
  } = useMapExperience();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !ipInfo || !client) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-destructive/20 bg-white/80 p-8 text-center backdrop-blur-xl shadow-premium">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-muted-foreground">
          {error || 'Unable to load IP information.'}
        </p>
        <Button onClick={refresh} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* ===== Hero — dual IP focal point ===== */}
      <div className="animate-fade-in-up">
        <div className="mb-7 flex flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-premium">
            <span className="relative flex h-2 w-2">
              <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Active
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Public IP Address
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
 Discover your IP and connection details instantly.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <IPBlock
            label="IPv4"
            sublabel="Internet Protocol v4"
            address={dual.ipv4}
            accentClasses="bg-primary/10 text-primary"
            delay={0.05}
          />
          <IPBlock
            label="IPv6"
            sublabel="Internet Protocol v6"
            address={dual.ipv6}
            accentClasses="bg-emerald-500/10 text-emerald-600"
            delay={0.12}
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-premium backdrop-blur-md transition-all hover:shadow-premium-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 text-primary ${refreshing ? 'animate-spin-slow' : ''}`}
            />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* ===== Location & Network ===== */}
      <div>
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Location &amp; Network
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="Country"
            value={
              ipInfo.country ? (
                <span className="flex items-center gap-2">
                  {ipInfo.countryCode && (
                    <span className="text-lg leading-none">
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
            delay={0.15}
          />
          <InfoCard
            label="Region"
            value={ipInfo.region || 'N/A'}
            icon={MapPin}
            delay={0.2}
          />
          <InfoCard
            label="City"
            value={ipInfo.city || 'N/A'}
            icon={MapPin}
            delay={0.25}
          />
          <InfoCard
            label="Coordinates"
            value={
              ipInfo.latitude != null && ipInfo.longitude != null
                ? `${ipInfo.latitude.toFixed(2)}, ${ipInfo.longitude.toFixed(2)}`
                : 'N/A'
            }
            icon={Compass}
            copyValue={
              ipInfo.latitude != null && ipInfo.longitude != null
                ? `${ipInfo.latitude.toFixed(4)}, ${ipInfo.longitude.toFixed(4)}`
                : undefined
            }
            delay={0.3}
          />
          <InfoCard
            label="Timezone"
            value={ipInfo.timezone || 'N/A'}
            icon={Clock}
            delay={0.35}
          />
          <InfoCard
            label="ISP"
            value={ipInfo.isp || 'N/A'}
            icon={Building2}
            delay={0.4}
          />
          <InfoCard
            label="ASN"
            value={ipInfo.asn || 'N/A'}
            icon={Hash}
            delay={0.45}
          />
        </div>
      </div>

      {/* ===== Device & Browser ===== */}
      <div>
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
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
            delay={0.5}
          />
          <InfoCard
            label="Operating System"
            value={client.os}
            icon={Monitor}
            delay={0.55}
          />
          <InfoCard
            label="Device Type"
            value={
              <span className="flex items-center gap-2">
                <DeviceIcon device={client.device} />
                {client.device}
              </span>
            }
            icon={Network}
            delay={0.6}
          />
        </div>
      </div>

      {/* ===== User Agent ===== */}
      <div>
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
          User Agent
        </h2>
        <div
          className="animate-fade-in-up rounded-2xl border border-black/5 glass p-5 shadow-premium"
          style={{ animationDelay: '0.65s' }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Compass className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
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
    <div className="space-y-12">
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 backdrop-blur-md">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            Detecting your connection
          </span>
        </div>
        <div className="h-9 w-56 animate-pulse rounded-xl bg-black/5" />
        <div className="h-4 w-72 animate-pulse rounded bg-black/5" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="h-32 flex-1 animate-pulse rounded-3xl bg-black/5" />
        <div className="h-32 flex-1 animate-pulse rounded-3xl bg-black/5" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-black/5"
          />
        ))}
      </div>
    </div>
  );
}
