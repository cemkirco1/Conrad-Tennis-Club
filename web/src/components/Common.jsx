import { waLink } from '../content.js';
import { WhatsAppIcon } from './Icons.jsx';

// variant: dark | light | lime | ghost
export function WaButton({ message, children, variant = 'dark', size = 'md', className = '' }) {
  return (
    <a
      className={`btn btn--${variant} btn--${size} ${className}`}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={size === 'lg' ? 22 : 20} />
      {children}
    </a>
  );
}

export function SectionHead({ index, eyebrow, title, accent, text, dark = false, children }) {
  return (
    <div className="section-head">
      <div className="section-head__title">
        <span className={`eyebrow ${dark ? 'eyebrow--lime' : ''}`}>
          {index} — {eyebrow}
        </span>
        <h2 className={`h2 ${dark ? 'on-dark' : ''}`}>
          {title} <em>{accent}</em>
        </h2>
      </div>
      {text && <p className={`lead ${dark ? 'lead--dark' : ''}`}>{text}</p>}
      {children}
    </div>
  );
}
