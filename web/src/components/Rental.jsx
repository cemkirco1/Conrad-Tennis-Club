import { useRef } from 'react';
import { RENTALS, waLink } from '../content.js';
import { gsap, useGSAP, EASE_EXPO, MOTION_OK } from '../lib/gsap.js';
import { riseHeadings } from '../lib/motion.js';
import WaButton from './WaButton.jsx';

// Kort, ölçeğiyle çizilir (23,77 × 10,97 m; yüksekliği okunabilirlik için biraz açıldı).
// Seçenekler sahadaki bölgelere çapraz bir vuruşun izini sürerek yerleşir: sol dip, sol servis, sağ servis, sağ dip.
const W = 2377;
const H = 1250;
const ALLEY = 137 * (H / 1097);
const NET = W / 2;
const SERVICE_L = NET - 640;
const SERVICE_R = NET + 640;

const LINES = [
  { d: `M4 4 H${W - 4} V${H - 4} H4 Z`, key: 'outer' },
  { d: `M0 ${ALLEY} H${W}`, key: 'side-top' },
  { d: `M0 ${H - ALLEY} H${W}`, key: 'side-bottom' },
  { d: `M${SERVICE_L} ${ALLEY} V${H - ALLEY}`, key: 'service-l' },
  { d: `M${SERVICE_R} ${ALLEY} V${H - ALLEY}`, key: 'service-r' },
  { d: `M${SERVICE_L} ${H / 2} H${SERVICE_R}`, key: 'center' },
  { d: `M0 ${H / 2} H22 M${W - 22} ${H / 2} H${W}`, key: 'marks' },
];

function Option({ r, className }) {
  return (
    <div className={`zone ${className}`}>
      <h3 className="zone__title">{r.title}</h3>
      <p className="zone__lead">{r.lead}</p>
      <ul className="zone__items">
        {r.items.map((i) => <li key={i}>{i}</li>)}
      </ul>
      <a className="zone__action" href={waLink(r.message)} target="_blank" rel="noopener noreferrer">
        {r.cta}
      </a>
    </div>
  );
}

export default function Rental() {
  const root = useRef(null);
  const [single, pack, member] = RENTALS;

  // İmza hareketi: kort çizgileri, kil kort bakımında olduğu gibi tek tek çekilir; sonra yazılar gelir.
  useGSAP(() => {
    riseHeadings(root.current);
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.court', start: 'top 80%', once: true },
        defaults: { ease: 'power2.inOut' },
      });
      tl.fromTo('.court__line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08 })
        .fromTo('.court__net', { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: EASE_EXPO }, 0.35)
        .from('.zone', { y: 18, autoAlpha: 0, duration: 0.7, ease: EASE_EXPO, stagger: 0.09 }, 0.55);
    });
  }, { scope: root });

  return (
    <section id="kiralama" className="chapter chapter--clay" ref={root}>
      <div className="frame">
        <div className="intro">
          <h2 className="h2" data-rise>Kort kiralama</h2>
          <p className="intro__text">
            Kendi partnerinizle oynamak için saatlik kiralama ya da düzenli oyuncular için paketler.
            Uygun saatleri WhatsApp'tan sorun, kortu sizin için ayıralım.
          </p>
        </div>

        <div className="court">
          <svg className="court__lines" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {LINES.map((l) => (
              <path key={l.key} className="court__line" d={l.d} pathLength="1" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <span className="court__net" aria-hidden="true" />
          <span className="court__note court__note--base">Dip çizgi</span>
          <span className="court__note court__note--service">Servis çizgisi</span>
          <span className="court__note court__note--net">File</span>

          <Option r={single} className="zone--a" />
          <Option r={pack} className="zone--b" />
          <Option r={member} className="zone--c" />
          <div className="zone zone--d">
            <p className="zone__title">Hangisi size uygun?</p>
            <p className="zone__lead">Oynama sıklığınızı yazın, en mantıklı seçeneği birlikte bulalım.</p>
            <WaButton message="Merhaba, kort kiralama seçenekleri hakkında bilgi almak istiyorum. Haftada yaklaşık … kez oynuyorum.">
              Kortu sorun
            </WaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
