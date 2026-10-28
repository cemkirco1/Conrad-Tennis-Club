import { useId, useMemo, useRef, useState } from 'react';
import { COMPOSER, composeMessage, waLink, PHONE_DISPLAY } from '../content.js';
import { useGSAP } from '../lib/gsap.js';
import { riseHeadings, arrive } from '../lib/motion.js';
import { WhatsAppIcon } from './Icons.jsx';

function Choice({ name, value, checked, onChange, children }) {
  return (
    <label className={`choice ${checked ? 'is-checked' : ''}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <span>{children}</span>
    </label>
  );
}

// Sayfadaki "canlı şey": ziyaretçi ne istediğini seçer, gönderilecek mesaj anında yazılır.
export default function Composer() {
  const root = useRef(null);
  const ids = useId();
  const [kind, setKind] = useState(COMPOSER.kinds[0].id);
  const current = COMPOSER.kinds.find((k) => k.id === kind);
  const [option, setOption] = useState(current.options[0]);
  const [time, setTime] = useState(COMPOSER.times[1]);
  const [name, setName] = useState('');

  const pickKind = (id) => {
    setKind(id);
    setOption(COMPOSER.kinds.find((k) => k.id === id).options[0]);
  };

  const message = useMemo(() => composeMessage({ kind, option, time, name }), [kind, option, time, name]);

  useGSAP(() => {
    riseHeadings(root.current);
    arrive('.composer__form fieldset, .composer__form .field, .composer__preview', '.composer', { stagger: 0.06 });
  }, { scope: root });

  return (
    <section id="mesaj" className="chapter chapter--green" ref={root}>
      <div className="frame">
        <div className="intro">
          <h2 className="h2" data-rise>Mesajınızı hazırlayalım</h2>
          <p className="intro__text">
            Üç seçim yapın; WhatsApp'a gidecek mesaj yanda kendiliğinden yazılır. Gönderdiğinizde uygun saatleri
            paylaşıyoruz.
          </p>
        </div>

        <div className="composer">
          <form className="composer__form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Ne için yazıyorsunuz?</legend>
              <div className="choices">
                {COMPOSER.kinds.map((k) => (
                  <Choice key={k.id} name={`${ids}-kind`} value={k.id} checked={kind === k.id} onChange={pickKind}>
                    {k.label}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Hangisi?</legend>
              <div className="choices">
                {current.options.map((o) => (
                  <Choice key={o} name={`${ids}-option`} value={o} checked={option === o} onChange={setOption}>
                    {o}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Ne zaman size uygun?</legend>
              <div className="choices">
                {COMPOSER.times.map((t) => (
                  <Choice key={t} name={`${ids}-time`} value={t} checked={time === t} onChange={setTime}>
                    {t}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor={`${ids}-name`}>Adınız</label>
              <input
                id={`${ids}-name`}
                type="text"
                autoComplete="given-name"
                placeholder="İsterseniz yazın"
                value={name}
                maxLength={40}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </form>

          <div className="composer__preview" data-ui>
            <p className="preview__to">Conrad Tennis Club · {PHONE_DISPLAY}</p>
            <p className="preview__bubble" aria-live="polite">{message}</p>
            <a className="button button--ball preview__send" href={waLink(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} />
              <span>WhatsApp'ta gönder</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
