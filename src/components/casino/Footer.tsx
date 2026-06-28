export default function Footer() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div className="footer-logo">🎋 Casino Bambú</div>
          <p className="footer-tagline">
            El espacio ideal para que tus celebraciones se conviertan en recuerdos imborrables.
            Naturaleza, elegancia y calidez en un solo lugar.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
              📘
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
              📸
            </a>
            <a href="https://wa.me/523221234567" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
              📱
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="TikTok">
              🎵
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <div className="footer-col-title">Navegación</div>
          <ul className="footer-links">
            {[['inicio','Inicio'],['nosotros','Nosotros'],['espacios','Espacios'],['eventos','Tipos de Eventos'],['galeria','Galería']].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); scroll(id); }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Eventos */}
        <div>
          <div className="footer-col-title">Eventos</div>
          <ul className="footer-links">
            {['Bodas','Quinceañeras','Graduaciones','Fiestas Privadas','Corporativos','Bautizos'].map(e => (
              <li key={e}>
                <a href="#cotizador" onClick={ev => { ev.preventDefault(); scroll('cotizador'); }}>{e}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <div className="footer-col-title">Contacto</div>
          <ul className="footer-links" style={{ gap: 14 }}>
            <li style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 300, lineHeight: 1.6 }}>
              📍 Carretera Fed. 200, cerca de UTN<br />Nayarit, México
            </li>
            <li>
              <a href="https://wa.me/523221234567" target="_blank" rel="noreferrer">
                📱 +52 322 123 4567
              </a>
            </li>
            <li>
              <a href="#cotizador" onClick={e => { e.preventDefault(); scroll('cotizador'); }}>
                ✦ Cotizar mi evento
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Casino Bambú — Salón de Eventos · Nayarit, México</span>
        <div className="footer-credit">
          Diseño por <a href="#" target="_blank" rel="noreferrer">Estudio Alquimia</a> ✦ Potenciado con IA
        </div>
      </div>
    </footer>
  );
}
