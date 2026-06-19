import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function DecorativeMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: true,
      touchZoom: true,
      dragging: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(mapRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, []);

  return (
    <section className="w-full px-6 py-12 md:px-10" aria-labelledby="decorative-map-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b919d]">Map preview</p>
          <h2 id="decorative-map-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
            Explore the view
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e6470] opacity-80">
            A lightweight open-source map preview using Leaflet and OpenStreetMap tiles.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/70 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-4">
          <div
            ref={mapRef}
            className="h-[320px] w-full overflow-hidden rounded-[1.5rem] bg-[#e8ecef] md:h-[420px]"
            aria-label="Decorative interactive map"
          />
        </div>
      </div>
    </section>
  );
}
