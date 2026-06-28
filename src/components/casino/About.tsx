import { useEffect, useRef } from 'react';

const GALLERY = `${import.meta.env.BASE_URL}venue-gallery.png`;

const CARDS = [
  { icon: '🎋', title: 'Arquitectura Natural', desc: 'Madera, piedra y vegetación tropical crean una atmósfera única e irrepetible.' },
  { icon: '✨', title: 'Iluminación Mágica', desc: 'Luces colgantes que transforman cada espacio al caer la noche.' },
  { icon: '🌸', title: 'Jardines en Flor', desc: 'Bugambilias, agaves y jardines curados con vista a la montaña.' },
  { icon: '👨‍🍳', title: 'Servicio Completo', desc: 'Coordinación total con equipo dedicado a cada detalle de tu evento.' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="nosotros" className="section section-cream" ref={sectionRef} style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        <div className="about-grid">
          {/* Left — photo from collage (jardín con bugambilias, bottom-right) */}
          <div className="reveal">
            <div style={{ position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '4/5' }}>
              <div style={{
                width: '100%', height: '100%',
                backgroundImage: `url(${GALLERY})`,
                backgroundSize: '400% 200%',
                backgroundPosition: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }} />
              {/* Badge */}
              <div style={{
                position: 'absolute', bottom: 24, left: 24,
                background: 'var(--green)', borderRadius: 'var(--r)',
                padding: '16px 22px',
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>2024</div>
                <div style={{ fontSize: 11, fontWeight: 300, color: 'rgba(240,237,232,.7)', marginTop: 4, letterSpacing: 1 }}>Apertura en Nayarit</div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span className="sec-eyebrow reveal">Nuestra Historia</span>
            <h2 className="sec-title reveal reveal-delay-1">
              Más que un lugar,<br />creamos <em>recuerdos</em>
            </h2>
            <div className="divider-gold reveal reveal-delay-1" style={{ maxWidth: 200 }}>
              <span>✦</span>
            </div>
            <p className="sec-desc reveal reveal-delay-2" style={{ marginBottom: 20 }}>
              Casino Bambú nació con la visión de ofrecer a las familias nayaritas un espacio
              donde la naturaleza, la elegancia y el calor humano se fusionan para crear
              celebraciones únicas e irrepetibles.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: 'var(--mid-text)', marginBottom: 40 }} className="reveal reveal-delay-2">
              Ubicados a pasos de la Universidad Tecnológica de Nayarit, somos el resultado
              de años de sueños y meses de trabajo para ofrecerte un lugar donde cada
              detalle importa y cada momento se convierte en recuerdo.
            </p>

            <div className="about-cards reveal reveal-delay-3">
              {CARDS.map((c, i) => (
                <div key={i} className="about-card">
                  <span className="about-card-icon">{c.icon}</span>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
