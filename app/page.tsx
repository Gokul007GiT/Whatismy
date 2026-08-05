import { WorldMapBackground } from '@/components/world-map-background';
import { MapExperience } from '@/components/map-experience';
import { IPDashboard } from '@/components/ip-dashboard';

export default function Home() {
  return (
    <>
      <WorldMapBackground />
      <div className="world-map-vignette" />
      <MapExperience>
        <main className="relative z-10 mx-auto max-w-4xl px-5 py-16 md:py-24">
          <IPDashboard />
        </main>
      </MapExperience>
    </>
  );
}
