'use client';

import * as React from 'react';
import { MAP_WIDTH, MAP_HEIGHT, projectGeo } from '@/lib/geo';

interface MapMarkerProps {
  longitude: number | null;
  latitude: number | null;
  /** Changes per detection to retrigger the fly-in animation. */
  animKey: string | number;
}

const START: [number, number] = projectGeo(0, 20);
const DURATION = 1500;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function MapMarker({ longitude, latitude, animKey }: MapMarkerProps) {
  const target =
    longitude != null && latitude != null
      ? projectGeo(longitude, latitude)
      : null;

  const [pos, setPos] = React.useState<[number, number]>(START);
  const [progress, setProgress] = React.useState(0);
  const raf = React.useRef<number | null>(null);
  const fromRef = React.useRef<[number, number]>(START);

  React.useEffect(() => {
    if (!target) return;
    const from = fromRef.current;
    const to = target;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const e = easeOutCubic(t);
      const x = from[0] + (to[0] - from[0]) * e;
      const y = from[1] + (to[1] - from[1]) * e;
      setPos([x, y]);
      setProgress(e);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey, target]);

  const [cx, cy] = pos;
  const arrived = progress >= 1 && !!target;
  const visible = !!target;
  // Fading connection trail from origin to marker
  const lineOpacity = visible ? Math.max(0, 0.4 * (1 - progress)) : 0;

  return (
    <svg
      className="world-map-marker"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Connection line — fades as marker arrives */}
        {visible && (
          <line
            x1={START[0]}
            y1={START[1]}
            x2={cx}
            y2={cy}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeDasharray="4 8"
            strokeLinecap="round"
            style={{ opacity: lineOpacity }}
          />
        )}

        {/* Expanding ripple rings once arrived */}
        {arrived && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r={10}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="marker-ripple"
            />
            <circle
              cx={cx}
              cy={cy}
              r={10}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="marker-ripple marker-ripple-delayed"
            />
          </>
        )}

        {/* Soft glow halo */}
        <circle
          cx={cx}
          cy={cy}
          r={arrived ? 16 : 6}
          fill="currentColor"
          style={{ opacity: arrived ? 0.18 : 0.5 }}
        />

        {/* Pulsing core dot */}
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill="currentColor"
          className={arrived ? 'marker-core' : ''}
        />
        {/* White inner highlight */}
        <circle cx={cx} cy={cy} r={2.2} fill="white" />
      </g>
    </svg>
  );
}
