export default function Footer() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* Pre-footer CTA */}
      <div className="prefooter">
        <div className="prefooter-items">
          {[
            { icon: '📍', title: 'Carretera Federal 200', sub: 'Junto a UTN · Nayarit, México' },
            { icon: '📱', title: '+52 322 123 4567', sub: 'WhatsApp disponible' },
            { icon: '🗓️', title: 'Agenda tu visita', sub: 'Coordinador disponible hoy' },
          ].map((item, i) => (
            <div key={i} className="prefooter-item">
              <div className="prefooter-icon">{item.icon}</div>
              <div className="prefooter-text">
                <p>{item.title}</p>
                <p>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-outline-white" onClick={() => scroll('contacto')}>
          Reservar Fecha →
        </button>
      </div>

      <footer className="footer">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo-text">🎋 Casino Bambú</div>
            <p className="footer-tagline">
              El espacio ideal para que tus celebraciones se conviertan
              en recuerdos imborrables. Naturaleza, elegancia y calidez.
            </p>
            <div className="footer-social">
              {[
                { href: 'https://facebook.com', icon: '📘', label: 'Facebook' },
                { href: 'https://instagram.com', icon: '📸', label: 'Instagram' },
                { href: 'https://wa.me/523221234567', icon: '📱', label: 'WhatsApp' },
                { href: 'https://tiktok.com', icon: '🎵', label: 'TikTok' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="fsoc-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <div className="footer-col-title">Navegación</div>
            <ul className="footer-links">
              {[['inicio','Inicio'],['nosotros','Nosotros'],['espacios','Espacios'],['eventos','Eventos'],['galeria','Galería']].map(([id, label]) => (
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
              {['Bodas','Quinceañeras','Graduaciones','Fiestas','Corporativos','Bautizos'].map(e => (
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
              <li style={{ color: 'rgba(240,237,232,.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.7 }}>
                📍 Carretera Fed. 200<br />cerca de UTN · Nayarit
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

          {/* Horarios */}
          <div>
            <div className="footer-col-title">Horarios</div>
            <ul className="footer-links" style={{ gap: 12 }}>
              <li style={{ color: 'rgba(240,237,232,.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.8 }}>
                Lun – Vie<br />9:00 – 18:00
              </li>
              <li style={{ color: 'rgba(240,237,232,.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.8 }}>
                Sábados<br />10:00 – 15:00
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
    </>
  );
}
