import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';

// three.js sahnesini ayrı bir parça olarak yükler; ilk ekran beklemeden okunur, sahne hazır olunca belirir.
export default function RallyScene() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let api = null;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('../three/rally.js')
      .then(({ createRally }) => {
        if (cancelled) return;
        api = createRally(canvasRef.current, { reduced });
        if (api) gsap.to(canvasRef.current, { opacity: 1, duration: reduced ? 0 : 0.9, ease: 'power2.out' });
      })
      .catch(() => {});

    // İlk ekrandan sonra sahne geri çekilir; metnin önüne geçmez
    const dim = gsap.to(wrapRef.current, {
      opacity: 0.42,
      ease: 'none',
      scrollTrigger: { trigger: '#top', start: '55% top', end: 'bottom top', scrub: true },
    });

    return () => {
      cancelled = true;
      dim.scrollTrigger?.kill();
      dim.kill();
      api?.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={wrapRef} className="rally" aria-hidden="true">
      <canvas ref={canvasRef} className="rally__canvas" />
    </div>
  );
}
