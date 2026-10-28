import { useRef, useState } from 'react';
import { PROGRAMS, waLink } from '../content.js';
import { useGSAP, ScrollTrigger } from '../lib/gsap.js';
import { riseHeadings } from '../lib/motion.js';
import { ArrowIcon } from './Icons.jsx';

// Sabit duran resim, yanından geçen programlar: ekranın ortasındaki program aydınlanır, resmi gösterilir.
export default function Programs() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    riseHeadings(root.current);
    root.current.querySelectorAll('.program').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  }, { scope: root });

  return (
    <section id="egitimler" className="chapter chapter--chalk" ref={root}>
      <div className="frame">
        <div className="intro">
          <h2 className="h2" data-rise>Eğitim programları</h2>
          <p className="intro__text">
            Yaşa ve hedefe göre kurgulanmış dönemsel programlar. Kontenjanlar sınırlı; yer ayırtmak için
            bir mesaj yeterli.
          </p>
        </div>

        <div className="story">
          <figure className="story__media" aria-hidden="true">
            <div className="story__pictures">
              {PROGRAMS.map((p, i) => (
                <img key={p.title} src={p.image} alt="" className={i === active ? 'is-on' : ''} />
              ))}
            </div>
            <figcaption className="story__count">
              {active + 1}. program, toplam {PROGRAMS.length}: {PROGRAMS[active].title}
            </figcaption>
          </figure>

          <ol className="story__list">
            {PROGRAMS.map((p, i) => (
              <li key={p.title} className={`program ${i === active ? 'is-active' : ''}`}>
                <img className="program__picture" src={p.image} alt={p.alt} loading="lazy" />
                <h3 className="program__title">{p.title}</h3>
                <p className="program__who">{p.who}</p>
                <p className="program__text">{p.text}</p>
                <a className="textlink textlink--arrow" href={waLink(p.message)} target="_blank" rel="noopener noreferrer">
                  Kayıt için yazın <ArrowIcon />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
