import { useRef } from 'react';
import { LESSONS, MARQUEE } from '../content.js';
import { useGSAP } from '../lib/gsap.js';
import { riseHeadings, arrive } from '../lib/motion.js';
import { ArrowIcon } from './Icons.jsx';
import { waLink } from '../content.js';

export default function Lessons() {
  const root = useRef(null);

  useGSAP(() => {
    riseHeadings(root.current);
    arrive('.lesson', '.lessons__list', { stagger: 0.09 });
  }, { scope: root });

  return (
    <section id="dersler" className="chapter chapter--green" ref={root}>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="marquee__word">{word}</span>
          ))}
        </div>
      </div>

      <div className="frame">
        <div className="intro">
          <h2 className="h2" data-rise>Özel dersler</h2>
          <p className="intro__text">
            İlk kez raket tutanlardan turnuva oyuncularına, her seviyeye birebir ilgi. Dersinizi seçin,
            uygun saati WhatsApp'tan birlikte ayarlayalım.
          </p>
        </div>

        <ul className="lessons__list">
          {LESSONS.map((l) => (
            <li key={l.title} className="lesson">
              <h3 className="lesson__title">{l.title}</h3>
              <p className="lesson__text">{l.text}</p>
              <ul className="lesson__facts">
                {l.facts.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a className="lesson__action" href={waLink(l.message)} target="_blank" rel="noopener noreferrer">
                <span>Bu dersi sor</span>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
