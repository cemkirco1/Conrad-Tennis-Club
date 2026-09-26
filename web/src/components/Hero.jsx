import { MARQUEE } from '../content.js';
import { WaButton } from './Common.jsx';

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="wrap grid-2 hero__grid">
          <div className="hero__copy">
            <span className="pill">
              <span className="pill__ball" />
              Conrad Istanbul Bosphorus · Beşiktaş
            </span>
            <h1 className="h1">
              Şehrin ortasında, <em>toprak kortta</em> tenis.
            </h1>
            <p className="hero__lead">
              Profesyonel antrenörlerle özel dersler, çocuk ve yetişkin eğitim programları, esnek kort
              kiralama. Size uygun olanı seçin, WhatsApp'tan yazın — gerisini biz planlayalım.
            </p>
            <div className="hero__actions">
              <WaButton
                message="Merhaba, tenis dersi almak istiyorum. Uygun saatler hakkında bilgi alabilir miyim?"
                size="lg"
                className="btn--shadow"
              >
                Ders için WhatsApp
              </WaButton>
              <a className="btn btn--ghost btn--lg" href="#kiralama">Kort Kiralama</a>
            </div>
            <div className="hero__facts">
              <span>Profesyonel antrenörler</span>
              <span>Çocuk &amp; yetişkin</span>
              <span>Hafta içi &amp; hafta sonu</span>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__photo hero__photo--main">
              <img src="/img/kort-perspektif.svg" alt="Ağaçlarla çevrili toprak tenis kortu" />
            </div>
            <div className="hero__photo hero__photo--small">
              <img src="/img/raket-toplar.svg" alt="Toprak kortta raket ve tenis topları" />
            </div>
            <div className="hero__badge">
              <span className="hero__badge-label">Zemin</span>
              <span className="hero__badge-value">Toprak kort</span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="marquee__item">
              {word}
              <span className="marquee__dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
