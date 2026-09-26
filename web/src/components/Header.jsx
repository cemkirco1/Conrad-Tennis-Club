import { NAV, GENERAL_MESSAGE } from '../content.js';
import { BallLogo } from './Icons.jsx';
import { WaButton } from './Common.jsx';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="logo">
          <BallLogo />
          <span className="logo__text">
            <span className="logo__name">Conrad</span>
            <span className="logo__sub" lang="en">Tennis Club</span>
          </span>
        </a>
        <nav className="nav" aria-label="Ana menü">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <WaButton message={GENERAL_MESSAGE} size="sm">WhatsApp</WaButton>
      </div>
    </header>
  );
}
