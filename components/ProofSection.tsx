export function ProofSection() {
  const groups = [
    { name: 'Beaute Reunion', members: '45k membres' },
    { name: 'Mode & Style Réunion', members: '32k membres' },
    { name: 'Mamans Reunionnaises', members: '28k membres' },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Counter */}
        <div className="mb-8">
          <p className="font-heading text-5xl font-bold text-brand-primary mb-2">50+</p>
          <p className="text-brand-muted">femmes reunionnaises deja inscrites</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-brand-muted text-sm">Communauté beauté La Réunion</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Facebook group badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {groups.map((group) => (
            <div
              key={group.name}
              className="flex items-center gap-2 bg-brand-bg rounded-full px-4 py-2 text-sm"
            >
              {/* Facebook icon inline SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium text-brand-text">{group.name}</span>
              <span className="text-brand-muted">{group.members}</span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="font-script text-xl text-brand-secondary">
          &quot;La beaute pei merite une boutique pei&quot; 🌺
        </p>
      </div>
    </section>
  )
}
