'use client';

import * as React from 'react';
import type { IPInfo, ClientInfo, DualIP } from '@/lib/types';
import { parseUserAgent } from '@/lib/useragent';
import { fetchDualIP, fetchIPInfo } from '@/lib/geo-data';

export interface MapExperienceState {
  dual: DualIP;
  ipInfo: IPInfo | null;
  client: ClientInfo | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  longitude: number | null;
  latitude: number | null;
  animKey: number;
  refresh: () => void;
}

const MapExperienceContext = React.createContext<MapExperienceState | null>(
  null
);

export function useMapExperience() {
  const ctx = React.useContext(MapExperienceContext);
  if (!ctx) {
    throw new Error('useMapExperience must be used within MapExperience');
  }
  return ctx;
}

const EMPTY_DUAL: DualIP = { ipv4: null, ipv6: null };

export function MapExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dual, setDual] = React.useState<DualIP>(EMPTY_DUAL);
  const [ipInfo, setIpInfo] = React.useState<IPInfo | null>(null);
  const [client, setClient] = React.useState<ClientInfo | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [animKey, setAnimKey] = React.useState(0);
  const [coords, setCoords] = React.useState({
    longitude: null as number | null,
    latitude: null as number | null,
  });

  const load = React.useCallback(async (isRefresh: boolean) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError(null);

    try {
      const resolved = await fetchDualIP();
      setDual(resolved);

      const lookupIp = resolved.ipv4 ?? resolved.ipv6 ?? undefined;

      const info = await fetchIPInfo(lookupIp);
      setIpInfo(info);

      setClient(
        parseUserAgent(
          typeof navigator !== 'undefined' ? navigator.userAgent : ''
        )
      );

      setCoords({
        longitude: info.longitude,
        latitude: info.latitude,
      });

      setAnimKey((k) => k + 1);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to load IP information.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    load(false);
  }, [load]);

  const refresh = React.useCallback(() => load(true), [load]);

  const value = React.useMemo<MapExperienceState>(
    () => ({
      dual,
      ipInfo,
      client,
      loading,
      refreshing,
      error,
      longitude: coords.longitude,
      latitude: coords.latitude,
      animKey,
      refresh,
    }),
    [
      dual,
      ipInfo,
      client,
      loading,
      refreshing,
      error,
      coords,
      animKey,
      refresh,
    ]
  );

  return (
    <MapExperienceContext.Provider value={value}>
      {children}
    </MapExperienceContext.Provider>
  );
}
