export type IPVersion = 'IPv4' | 'IPv6';

export interface IPInfo {
  ip: string;
  version: IPVersion;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  isp: string | null;
  asn: string | null;
  org: string | null;
}

export interface ClientInfo {
  browser: string;
  browserVersion: string;
  os: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  userAgent: string;
}

export interface NetworkData {
  ipInfo: IPInfo | null;
  client: ClientInfo | null;
  error: string | null;
}
