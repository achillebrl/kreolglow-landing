export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-brand-primary/10"
      style={{ backgroundColor: '#EDE4D3' }}
    >
      <div className="max-w-5xl mx-auto px-4 h-[120px] flex items-center justify-between">
        {/* Logo full size */}
        <a href="/" aria-label="Kréol Glow — accueil" className="hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Kréol Glow" style={{ height: '118px', width: 'auto', display: 'block' }} />
        </a>

        {/* Instagram link */}
        <a
          href="https://instagram.com/kreolglow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
          aria-label="Suivre @kreolglow sur Instagram"
        >
          {/* Inline Instagram SVG icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          @kreolglow
        </a>
      </div>
    </nav>
  )
}
