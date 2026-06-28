import { useEffect, useRef } from 'react';

const FEATURES = [
  { icon: '🎋', title: 'Arquitectura Natural', desc: 'Bambú, madera y piedra crean una atmósfera única que conecta con la naturaleza.' },
  { icon: '✨', title: 'Iluminación Encantadora', desc: 'Miles de luces colgantes que transforman el espacio al caer la noche.' },
  { icon: '🌸', title: 'Jardines en Flor', desc: 'Áreas verdes con buganvilias, plantas tropicales y senderos de grava.' },
  { icon: '👨‍🍳', title: 'Servicio Personalizado', desc: 'Coordinación completa de tu evento con equipo dedicado a cada detalle.' },
];

const STATS = [
  { num: '500+', label: 'Eventos realizados' },
  { num: '98%', label: 'Clientes satisfechos' },
  { num: '3',   label: 'Espacios únicos' },
  { num: '∞',   label: 'Memorias creadas' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* STATS BAR */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="nosotros" className="section section-light" ref={sectionRef}>
        <div className="container">
          <div className="about-grid">
            {/* Image stack */}
            <div className="about-img-stack reveal">
              <div className="about-img-main">
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>
                  <div style={{ fontSize: 64, opacity: 0.2 }}>🌿</div>
                  <p style={{ fontSize: 12, letterSpacing: 3, marginTop: 12, opacity: 0.4, textTransform: 'uppercase' }}>Fotografía del Venue</p>
                </div>
              </div>
              <div className="about-img-accent" />
              <div className="about-img-badge">
                <div className="about-badge-num">2024</div>
                <div className="about-badge-text">Apertura oficial en Nayarit</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="sec-eyebrow sec-eyebrow-dark reveal">Nuestra Historia</span>
              <h2 className="sec-title reveal reveal-delay-1" style={{ color: 'var(--dark-text)' }}>
                Un espacio nacido del <em style={{ color: 'var(--terra)' }}>amor</em> por los momentos especiales
              </h2>
              <div className="gold-divider reveal reveal-delay-2">
                <span className="gold-divider-icon" style={{ color: 'var(--terra)' }}>✦</span>
              </div>
              <p className="sec-desc reveal reveal-delay-2" style={{ color: 'var(--mid-text)' }}>
                Casino Bambú nació con la visión de ofrecer a las familias nayaritas un espacio
                donde la naturaleza, la elegancia y el calor humano se fusionan para crear
                celebraciones únicas e irrepetibles.
              </p>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: 'var(--mid-text)', marginTop: 16 }} className="reveal reveal-delay-3">
                Ubicados a pasos de la Universidad Tecnológica de Nayarit, nuestro casino de
                eventos es el resultado de años de sueños y meses de trabajo para ofrecerte
                un lugar donde cada detalle importa.
              </p>

              <div className="about-features">
                {FEATURES.map((f, i) => (
                  <div key={i} className={`about-feature reveal reveal-delay-${i + 2}`}>
                    <div className="about-feature-icon" style={{ background: 'rgba(176,96,48,0.08)', borderColor: 'rgba(176,96,48,0.15)' }}>
                      {f.icon}
                    </div>
                    <div>
                      <div className="about-feature-title">{f.title}</div>
                      <div className="about-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
