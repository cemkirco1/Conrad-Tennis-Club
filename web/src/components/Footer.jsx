import { useRef } from 'react';
import { INSTAGRAM_URL, MAPS_URL, NAV, PHONE_DISPLAY, WHATSAPP_NUMBER, GENERAL_MESSAGE } from '../content.js';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap.js';
import WaButton from './WaButton.jsx';

export default function Footer() {
  const root = useRef(null);

  // Kapanış: kulübün adı tam genişlikte geri döner ve kaydırmayla yerine oturur.
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo('.closing__name', { yPercent: 35, scale: 0.94 }, {
        yPercent: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.closing__name', start: 'top bottom', end: 'bottom bottom', scrub: true },
      });
    });
  }, { scope: root });

  return (
    <footer id="iletisim" className="closing" ref={root}>
      <div className="frame closing__grid">
        <div className="closing__lead">
          <h2 className="h2">Kortta görüşelim</h2>
          <p>Sorularınızı, uygun saatlerinizi ya da çocuğunuzun yaşını yazın; aynı gün dönüyoruz.</p>
          <WaButton message={GENERAL_MESSAGE}>WhatsApp'tan yazın</WaButton>
        </div>
        <dl className="closing__facts">
          <div>
            <dt>Adres</dt>
            <dd>
              Conrad Istanbul Bosphorus<br />Cihannüma Mah., Beşiktaş, İstanbul<br />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Yol tarifi al</a>
            </dd>
          </div>
          <div>
            <dt>Telefon ve WhatsApp</dt>
            <dd><a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a></dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@conradtennisclub</a></dd>
          </div>
          <div>
            <dt>Sayfada</dt>
            <dd className="closing__nav">
              {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            </dd>
          </div>
        </dl>
      </div>
      <p className="closing__name" aria-hidden="true">Conrad Tennis Club</p>
      <p className="frame closing__fine">© {new Date().getFullYear()} Conrad Tennis Club. Sayfadaki görseller temsilidir.</p>
    </footer>
  );
}
