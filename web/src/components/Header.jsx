import { NAV, GENERAL_MESSAGE } from '../content.js';
import { BallLogo } from './Icons.jsx';
import WaButton from './WaButton.jsx';

export default function Header() {
  return (
    <header className="bar">
      <a href="#top" className="wordmark" aria-label="Conrad Tennis Club, sayfanın başı">
        <BallLogo size={30} />
        <span>Conrad Tennis Club</span>
      </a>
      <nav className="bar__nav" aria-label="Ana menü">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <WaButton message={GENERAL_MESSAGE} className="bar__action">WhatsApp</WaButton>
    </header>
  );
}
