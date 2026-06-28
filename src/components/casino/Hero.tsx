export default function Hero() {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="hero">
      {/* LEFT — content */}
      <div className="hero-left">
        {/* Botanical leaf top-left */}
        <div className="leaf-deco leaf-tl" style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 280\'%3E%3Cellipse cx=\'100\' cy=\'140\' rx=\'70\' ry=\'130\' fill=\'%230E4A42\' opacity=\'.6\'/%3E%3Cellipse cx=\'100\' cy=\'140\' rx=\'40\' ry=\'120\' fill=\'none\' stroke=\'%230E4A42\' stroke-width=\'1\' opacity=\'.4\'/%3E%3Cline x1=\'100\' y1=\'20\' x2=\'100\' y2=\'260\' stroke=\'%230E4A42\' stroke-width=\'1.5\' opacity=\'.5\'/%3E%3C/svg%3E") center/contain no-repeat',
        }} />

        <span className="hero-eyebrow">Salón de Eventos · Nayarit, México</span>

        <h1 className="hero-title">
          Casino
          <em>Bambú</em>
        </h1>

        <div className="hero-divider" />

        <p className="hero-desc">
          Un espacio donde la naturaleza, la elegancia y el calor humano
          se fusionan para crear celebraciones únicas e irrepetibles.
          Bodas, quinceañeras, graduaciones y más.
        </p>

        <div className="hero-btns">
          <button
            className="btn-green"
            onClick={() => scroll('cotizador')}
          >
            ✦ Cotizar Evento
          </button>
          <button
            className="btn-outline-green"
            onClick={() => scroll('galeria')}
          >
            Ver Galería
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40, marginTop: 52, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          {[['200+', 'Cap. máxima'], ['3', 'Espacios únicos'], ['100%', 'Personalizado']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: 'var(--green)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — venue photo */}
      <div className="hero-right">
        <img src="/venue-hero.png" alt="Casino Bambú — Salón principal" className="space-card-img" />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(14,74,66,0.15) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />
        {/* Floating tag */}
        <div style={{
          position: 'absolute', bottom: 32, right: 32,
          background: 'rgba(249,246,241,0.92)', backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)', borderRadius: 'var(--r)',
          padding: '14px 20px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--green3)', marginBottom: 4 }}>Jardín Principal</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'var(--dark-text)' }}>Hasta 200 personas</div>
        </div>
      </div>
    </section>
  );
}
