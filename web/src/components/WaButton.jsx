import { waLink } from '../content.js';
import { WhatsAppIcon } from './Icons.jsx';

// tone: ball (sarı, ana eylem) | chalk | ink
export default function WaButton({ message, children, tone = 'ball', className = '', ...rest }) {
  return (
    <a
      className={`button button--${tone} ${className}`}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <WhatsAppIcon size={20} />
      <span>{children}</span>
    </a>
  );
}
