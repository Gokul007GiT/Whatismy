import fs from 'node:fs';
import path from 'node:path';
import { MAP_WIDTH, MAP_HEIGHT } from '@/lib/geo';

const svgPath = path.join(process.cwd(), 'public', 'world-map.svg');
const svgRaw = fs.readFileSync(svgPath, 'utf8');

export function WorldMapBackground() {
  return (
    <div
      aria-hidden="true"
      className="world-map-layer"
      dangerouslySetInnerHTML={{ __html: svgRaw }}
    />
  );
}

export { MAP_WIDTH, MAP_HEIGHT };
