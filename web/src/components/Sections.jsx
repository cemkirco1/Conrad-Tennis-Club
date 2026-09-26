import {
  LESSONS, PROGRAMS, RENTALS, GALLERY, STEPS, GENERAL_MESSAGE,
  INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_NUMBER, waLink,
} from '../content.js';
import { PeopleIcon, InstagramIcon } from './Icons.jsx';
import { WaButton, SectionHead } from './Common.jsx';

export function Lessons() {
  return (
    <section id="dersler" className="section section--first">
      <div className="wrap stack">
        <SectionHead
          index="01" eyebrow="Dersler" title="Özel tenis" accent="dersleri"
          text="İlk kez raket tutanlardan turnuva oyuncularına, her seviyeye birebir ilgi. Dersi seçin, uygun saati WhatsApp'tan birlikte ayarlayalım."
        />
        <div className="grid-3">
          {LESSONS.map((l) => (
            <article key={l.title} className={`card lift ${l.featured ? 'card--dark' : ''}`}>
              {l.featured && <span className="card__badge">Favori</span>}
              <div className="card__icon"><PeopleIcon kind={l.icon} /></div>
              <h3 className="h3">{l.title}</h3>
              <p className="card__text">{l.text}</p>
              <div className="tags">
                {l.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <WaButton message={l.message} variant={l.featured ? 'lime' : 'dark'} className="card__cta">
                Bilgi &amp; Randevu
              </WaButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Programs() {
  return (
    <section id="egitimler" className="section">
      <div className="wrap stack">
        <SectionHead
          index="02" eyebrow="Eğitimler" title="Eğitim" accent="programları"
          text="Yaşa ve hedefe göre kurgulanmış dönemsel programlar. Kontenjanlar sınırlı — yer ayırtmak için bir mesaj yeterli."
        />
        <div className="grid-2">
          {PROGRAMS.map((p) => (
            <article key={p.title} className="program lift">
              <div className="program__image"><img src={p.image} alt={p.alt} loading="lazy" /></div>
              <div className="program__body">
                <span className="eyebrow eyebrow--sm">{p.eyebrow}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="card__text">{p.text}</p>
                <a className="link-cta" href={waLink(p.message)} target="_blank" rel="noopener noreferrer">
                  Kayıt için WhatsApp →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Rentals() {
  return (
    <section id="kiralama" className="section section--dark">
      <div className="wrap stack">
        <SectionHead
          dark index="03" eyebrow="Kort Kiralama" title="Kortu ayırtın," accent="oyuna gelin"
          text="Kendi partnerinizle oynamak için saatlik kiralama ya da düzenli oyuncular için paketler. Uygunluk ve detaylar için yazın."
        />
        <div className="grid-3">
          {RENTALS.map((r) => (
            <article key={r.title} className={`rental lift ${r.highlight ? 'rental--lime' : ''}`}>
              <span className="rental__big">{r.big}<small> {r.unit}</small></span>
              <h3 className="h3">{r.title}</h3>
              <ul className="rental__list">
                {r.items.map((i) => <li key={i}>— {i}</li>)}
              </ul>
              <WaButton message={r.message} variant={r.highlight ? 'dark' : 'light'} className="rental__cta">
                {r.cta}
              </WaButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="galeri" className="section">
      <div className="wrap stack">
        <SectionHead index="04" eyebrow="Galeri" title="Kortlardan" accent="kareler">
          <a className="btn btn--ghost btn--md" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> @conradtennisclub
          </a>
        </SectionHead>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <div key={i} className={`gallery__item lift ${g.size ? `gallery__item--${g.size}` : ''}`}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="section section--steps">
      <div className="wrap stack">
        <h2 className="h2 center">Üç adımda <em className="clay">kortta</em></h2>
        <div className="grid-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="step">
              <span className="step__num">{i + 1}</span>
              <h3 className="h3 h3--sm">{s.title}</h3>
              <p className="card__text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="iletisim" className="contact">
      <div className="wrap grid-2">
        <div className="contact__cta">
          <svg className="contact__deco" width="260" height="260" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
            <path d="M6 12c8 4 8 12 0 16" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
            <path d="M34 12c-8 4-8 12 0 16" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
          </svg>
          <h2 className="h2 on-dark">Sorunuz mu var? <em>Bir mesaj</em> uzağınızdayız.</h2>
          <WaButton message={GENERAL_MESSAGE} variant="white" size="lg">WhatsApp'tan Yazın</WaButton>
        </div>
        <div className="contact__info">
          <div className="info">
            <span className="info__label">Adres</span>
            <span className="info__value">Conrad Istanbul Bosphorus<br />Cihannüma Mah., Beşiktaş, İstanbul</span>
          </div>
          <div className="info">
            <span className="info__label">Telefon / WhatsApp</span>
            <a className="info__value" href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
          </div>
          <div className="info">
            <span className="info__label">Instagram</span>
            <a className="info__value" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@conradtennisclub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
