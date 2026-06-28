const GALLERY = `${import.meta.env.BASE_URL}venue-gallery.png`;

export default function Hero() {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="hero">
      {/* LEFT — content */}
      <div className="hero-left">
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
          <button className="btn-green" onClick={() => scroll('cotizador')}>
            ✦ Cotizar Evento
          </button>
          <button className="btn-outline-green" onClick={() => scroll('galeria')}>
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

      {/* RIGHT — venue photo (salón con luces colgantes, top-left of collage) */}
      <div className="hero-right">
        <div style={{
          width: '100%', height: '100%',
          backgroundImage: `url(${GALLERY})`,
          backgroundSize: '400% 200%',
          backgroundPosition: '0% 0%',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Light overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(14,74,66,0.1) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />

        {/* Floating tag */}
        <div style={{
          position: 'absolute', bottom: 32, right: 32,
          background: 'rgba(249,246,241,0.93)', backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)', borderRadius: 'var(--r)',
          padding: '14px 20px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--green3)', marginBottom: 4 }}>
            Jardín Principal
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'var(--dark-text)' }}>
            Hasta 200 personas
          </div>
        </div>
      </div>
    </section>
  );
}
