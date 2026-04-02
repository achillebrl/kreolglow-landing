export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-bg-dark text-white py-10 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-baseline justify-center gap-1 mb-6">
          <span className="font-heading font-bold text-xl text-brand-primary tracking-wide">KREOL</span>
          <span className="font-script text-2xl text-brand-accent">Glow</span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-sm mb-6">La beaute pei, livree chez ou</p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Instagram */}
          <a
            href="https://instagram.com/kreolglow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-primary transition-colors"
            aria-label="Instagram @kreolglow"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://facebook.com/kreolglow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-primary transition-colors"
            aria-label="Facebook Kreol Glow"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:kreolglow@gmail.com"
            className="text-gray-400 hover:text-brand-primary transition-colors"
            aria-label="Email kreolglow@gmail.com"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Contact email visible */}
        <a
          href="mailto:kreolglow@gmail.com"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-brand-primary transition-colors text-xs mb-6"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          kreolglow@gmail.com
        </a>

        <p className="text-gray-600 text-xs">
          &copy; {year} KREOL GLOW — La beaute pei, livree chez ou
        </p>
      </div>
    </footer>
  )
}
