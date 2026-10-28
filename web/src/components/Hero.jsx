import { useRef } from 'react';
import { gsap, useGSAP, EASE_EXPO, EASE_OUT, MOTION_OK } from '../lib/gsap.js';
import WaButton from './WaButton.jsx';

export default function Hero() {
  const root = useRef(null);

  // Yükleme dizisi: başlık satırları maskelerinden yükselir, cümle ve düğme gelir; 1,2 sn içinde biter.
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });
      tl.from('[data-line]', { yPercent: 108, duration: 0.9, stagger: 0.11 }, 0.1)
        .from('[data-load]', { y: 14, autoAlpha: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.06 }, 0.42);
    });
  }, { scope: root });

  return (
    <section id="top" className="hero" ref={root}>
      <h1 className="hero__title">
        <span className="mask"><span data-line>Toprak kortta</span></span>
        <span className="mask"><span data-line>tenis.</span></span>
      </h1>
      <div className="hero__copy">
        <p className="hero__place" data-load>Conrad Istanbul Bosphorus, Beşiktaş</p>
        <p className="hero__lead" data-load>
          Otelin yeşillikleri içindeki kortlarda özel dersler, çocuk ve yetişkin programları ve kort
          kiralama. Ne istediğinizi seçin, tek bir WhatsApp mesajıyla gerisini birlikte ayarlayalım.
        </p>
        <div className="hero__actions" data-load>
          <WaButton message="Merhaba, tenis dersi almak istiyorum. Uygun saatler hakkında bilgi alabilir miyim?">
            Ders için yazın
          </WaButton>
          <a className="textlink" href="#mesaj">Mesajı birlikte hazırlayalım</a>
        </div>
      </div>
    </section>
  );
}
