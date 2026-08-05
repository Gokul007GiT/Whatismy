import type { IPVersion, DualIP, IPInfo } from './types';

/**
 * Fetch the visitor's IPv4 address via the IPv4-only endpoint.
 * Resolves to null when the visitor has no IPv4 connectivity.
 */
export async function fetchIPv4(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    return data.ip ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch the visitor's IPv6 address via the IPv6-only endpoint.
 * Resolves to null when the visitor has no IPv6 connectivity.
 */
export async function fetchIPv6(): Promise<string | null> {
  try {
    const res = await fetch('https://api64.ipify.org?format=json', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    const ip = data.ip ?? null;
    // api64 returns an IPv6 when available, otherwise falls back to IPv4.
    if (ip && ip.includes(':')) return ip;
    return null;
  } catch {
    return null;
  }
}

export async function fetchDualIP(): Promise<DualIP> {
  const [ipv4, ipv6] = await Promise.all([fetchIPv4(), fetchIPv6()]);
  return { ipv4, ipv6 };
}

export function classifyVersion(ip: string): IPVersion {
  return ip.includes(':') ? 'IPv6' : 'IPv4';
}

interface IpWhoIsResponse {
  ip: string;
  success: boolean;
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

/**
 * Fetch geolocation + network details for a specific IP (v4 or v6).
 * Falls back to the caller's own IP when no IP is supplied.
 */
export async function fetchIPInfo(ip?: string): Promise<IPInfo> {
  const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : 'https://ipwho.is/';
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`IP lookup failed (${res.status})`);
  const data = (await res.json()) as IpWhoIsResponse;
  if (!data.success) {
    throw new Error(data.message || 'IP lookup returned an error');
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
