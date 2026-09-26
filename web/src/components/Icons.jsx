const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
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

export function BallLogo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#D6E04A" stroke="#16382B" strokeWidth="2" />
      <path d="M6 12c8 4 8 12 0 16" stroke="#16382B" strokeWidth="2" />
      <path d="M34 12c-8 4-8 12 0 16" stroke="#16382B" strokeWidth="2" />
    </svg>
  );
}

export function PeopleIcon({ kind }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      {kind === 'single' && (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
        </>
      )}
      {kind === 'pair' && (
        <>
          <circle cx="8" cy="8" r="3.2" />
          <circle cx="16.5" cy="8" r="3.2" />
          <path d="M2 20c.7-3.2 3-5 6-5s5.3 1.8 6 5" />
          <path d="M14.5 15.2c.6-.1 1.3-.2 2-.2 3 0 5.3 1.8 6 5" />
        </>
      )}
      {kind === 'group' && (
        <>
          <circle cx="6" cy="9" r="2.6" />
          <circle cx="12" cy="7" r="2.6" />
          <circle cx="18" cy="9" r="2.6" />
          <path d="M2 19c.5-2.5 2-4 4-4M22 19c-.5-2.5-2-4-4-4M7.5 20c.6-3 2.4-5 4.5-5s3.9 2 4.5 5" />
        </>
      )}
    </svg>
  );
}
