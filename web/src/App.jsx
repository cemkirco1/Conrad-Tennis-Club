import RallyBackground from './components/RallyBackground.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Lessons, Programs, Rentals, Gallery, Steps, Contact } from './components/Sections.jsx';
import { NAV, GENERAL_MESSAGE, INSTAGRAM_URL, waLink } from './content.js';
import { WhatsAppIcon } from './components/Icons.jsx';

export default function App() {
  return (
    <div className="page">
      <RallyBackground />
      <div className="page__content">
        <Header />
        <main>
          <Hero />
          <Lessons />
          <Programs />
          <Rentals />
          <Gallery />
          <Steps />
          <Contact />
        </main>
        <footer className="footer">
          <div className="wrap footer__inner">
            <span>© {new Date().getFullYear()} Conrad Tennis Club · Beşiktaş, İstanbul</span>
            <div className="footer__links">
              {NAV.slice(0, 3).map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
      <a
        className="fab"
        href={waLink(GENERAL_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın"
      >
        <WhatsAppIcon size={30} />
      </a>
    </div>
  );
}
