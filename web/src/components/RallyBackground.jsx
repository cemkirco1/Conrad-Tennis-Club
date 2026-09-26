import { useEffect, useRef } from 'react';

// Arka planda iki raket, sayfa kaydırıldıkça topu birbirine atar.
// Her karede React render etmemek için transform'lar doğrudan ref'lere yazılır.

const RALLY_PX = 1200; // bir tam gidiş-dönüş için kaydırma mesafesi

// Raketin açısı; vuruş anı f = 0.5
function angleAt(f) {
  if (f < 0.42) return -25 - 30 * (f / 0.42);
  if (f < 0.56) {
    const t = (f - 0.42) / 0.14;
    return -55 + 125 * (1 - Math.pow(1 - t, 3));
  }
  return 70 - 95 * ((f - 0.56) / 0.44);
}

function Racket({ gripColor, stripeColor, clipId }) {
  const vertical = [36, 52, 68, 84, 100, 116, 132, 148, 164];
  const horizontal = [45, 63, 81, 99, 117, 135, 153, 171, 189, 207, 225];
  return (
    <svg width="200" height="520" viewBox="0 0 200 520" fill="none">
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="100" cy="135" rx="78" ry="108" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} stroke="#16382B" strokeWidth="2.2">
        {vertical.map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="260" />)}
        {horizontal.map((y) => <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} />)}
      </g>
      <ellipse cx="100" cy="135" rx="84" ry="115" stroke="#16382B" strokeWidth="11" />
      <path d="M42 222 L92 330 M158 222 L108 330" stroke="#16382B" strokeWidth="10" strokeLinecap="round" />
      <rect x="87" y="322" width="26" height="190" rx="11" fill={gripColor} />
      <path d="M87 360 L113 350 M87 390 L113 380 M87 420 L113 410 M87 450 L113 440 M87 480 L113 470" stroke={stripeColor} strokeWidth="3" />
    </svg>
  );
}

export default function RallyBackground() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const ballRef = useRef(null);
  const flashLRef = useRef(null);
  const flashRRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const draw = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = Math.min(window.innerHeight, 1000);
      const y = reduce ? 0 : window.scrollY;
      const s = Math.max(0.6, Math.min(1.4, vw / 1050, vh / 620));
      const p = y / RALLY_PX;
      const u = p - Math.floor(p);
      // Sol raket u=0'da, sağ raket u=0.5'te topa vurur
      const aL = angleAt((u + 0.5) % 1);
      const aR = angleAt(u);
      const pxL = vw * 0.05;
      const pxR = vw * 0.95;
      const py = vh * 1.02;
      const a0 = (angleAt(0.5) * Math.PI) / 180;
      const reach = 375 * s * Math.sin(a0) + 26 * s;
      const cxL = pxL + reach;
      const cxR = pxR - reach;
      const cy = py - 375 * s * Math.cos(a0);
      const hp = vh * 0.34;

      let bx;
      let by;
      if (u < 0.5) {
        const t = u / 0.5;
        bx = cxL + (cxR - cxL) * t;
        by = cy - hp * Math.sin(Math.PI * t);
      } else {
        const t = (u - 0.5) / 0.5;
        bx = cxR + (cxL - cxR) * t;
        by = cy - hp * 0.8 * Math.sin(Math.PI * t);
      }
      const flashL = Math.max(0, 1 - Math.min(u, 1 - u) / 0.06);
      const flashR = Math.max(0, 1 - Math.abs(u - 0.5) / 0.06);

      leftRef.current.style.transform = `translate(${pxL - 100}px, ${py - 510}px) rotate(${aL}deg) scale(${s})`;
      rightRef.current.style.transform = `translate(${pxR - 100}px, ${py - 510}px) rotate(${-aR}deg) scale(${-s}, ${s})`;
      ballRef.current.style.transform = `translate(${bx - 22}px, ${by - 22}px) rotate(${p * 900}deg) scale(${s * 1.15})`;
      flashLRef.current.style.transform = `translate(${cxL - 40}px, ${cy - 40}px) scale(${0.6 + 0.9 * (1 - flashL)})`;
      flashLRef.current.style.opacity = flashL;
      flashRRef.current.style.transform = `translate(${cxR - 40}px, ${cy - 40}px) scale(${0.6 + 0.9 * (1 - flashR)})`;
      flashRRef.current.style.opacity = flashR;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rally" aria-hidden="true">
      <div ref={rightRef} className="rally__racket">
        <Racket gripColor="#16382B" stripeColor="#D6E04A" clipId="rally-head-r" />
      </div>
      <div ref={leftRef} className="rally__racket">
        <Racket gripColor="#B4522D" stripeColor="#F3ECE1" clipId="rally-head-l" />
      </div>
      <div ref={flashLRef} className="rally__flash" />
      <div ref={flashRRef} className="rally__flash" />
      <div ref={ballRef} className="rally__ball">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" fill="#D6E04A" stroke="#AEB832" strokeWidth="2" />
          <path d="M5 13c8 4 8 14 0 18" stroke="#FBF8EE" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M39 13c-8 4-8 14 0 18" stroke="#FBF8EE" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
