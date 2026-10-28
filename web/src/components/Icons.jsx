const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9.3 8.4c.3-.4.9-.4 1.1 0l.7 1.5c.1.3 0 .6-.2.8l-.5.4c.6 1.2 1.5 2.1 2.7 2.7l.4-.5c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.8 0 1.1-.7.6-1.8.8-3.2.1a8 8 0 0 1-3.6-3.6c-.6-1.3-.4-2.4.3-3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BallLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#D8EC3E" stroke="#0F2A21" strokeWidth="2.2" />
      <path d="M6 12c8 4 8 12 0 16" stroke="#0F2A21" strokeWidth="2.2" />
      <path d="M34 12c-8 4-8 12 0 16" stroke="#0F2A21" strokeWidth="2.2" />
    </svg>
  );
}
