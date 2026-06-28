import { useEffect, useRef } from 'react';
import { Users, ArrowRight } from 'lucide-react';

const SPACES = [
  {
    tag: 'Espacio Principal',
    name: 'Jardín del Bambú',
    desc: 'Nuestro espacio estrella bajo una arquitectura de bambú y cubierta. Ideal para ceremonias y recepciones al aire libre con toque rústico-elegante.',
    cap: '200 personas',
    icon: '🎋',
    features: ['Cubierta de teja', 'Luz natural', 'Área de bar', 'Pista de baile'],
    gradient: 'linear-gradient(160deg, #1C1009 0%, #261508 100%)',
    tall: true,
  },
  {
    tag: 'Terraza',
    name: 'Terraza Los Olivos',
    desc: 'Espacio semi-abierto con jardín curado, área de cocina y el encanto de los olivos centenarios.',
    cap: '120 personas',
    icon: '🌿',
    features: ['Jardín de olivos', 'Cocina exterior', 'Decoración flora'],
    gradient: 'linear-gradient(160deg, #160D08 0%, #1C1009 100%)',
    tall: false,
  },
  {
    tag: 'Salón Interior',
    name: 'Salón Bugambilia',
    desc: 'Salón climatizado con decoración ecléctica y acceso privado. Perfecto para eventos más íntimos y corporativos.',
    cap: '80 personas',
    icon: '💐',
    features: ['Climatizado', 'Privado', 'Acceso independiente', 'Pantalla LED'],
    gradient: 'linear-gradient(160deg, #1C1009 0%, #130B06 100%)',
    tall: false,
  },
];

export default function Spaces() {
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
    <section id="espacios" className="section section-dark" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          <span className="sec-eyebrow reveal">Nuestros Espacios</span>
          <h2 className="sec-title reveal reveal-delay-1">
            Tres ambientes, <em>una experiencia</em> única
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
            Cada espacio de Casino Bambú está diseñado con su propia personalidad,
            adaptable a tus gustos y al número de invitados.
          </p>
        </div>

        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <div
              key={i}
              className={`space-card reveal reveal-delay-${i + 1}`}
              style={s.tall ? { gridRow: 'span 2' } : {}}
            >
              <div
                className="space-card-img"
                style={{
                  background: s.gradient,
                  aspectRatio: s.tall ? '3/5' : '3/4',
                }}
              >
                <div className="space-card-placeholder">
                  <div style={{ fontSize: 56 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>
                    Foto próximamente
                  </div>
                </div>
              </div>
              <div className="space-card-overlay" />
              <div className="space-card-content">
                <div className="space-card-tag">{s.tag}</div>
                <div className="space-card-name">{s.name}</div>
                <div className="space-card-cap">
                  <Users size={13} />
                  {s.cap}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {s.features.map(f => (
                    <span key={f} style={{
                      fontSize: 10, padding: '3px 10px',
                      background: 'rgba(200,164,68,0.12)',
                      border: '1px solid rgba(200,164,68,0.2)',
                      borderRadius: 20, color: 'var(--gold)',
                      letterSpacing: 1,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginTop: 16,
                    background: 'none', border: 'none', color: 'var(--gold)',
                    fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                    cursor: 'pointer', padding: 0,
                  }}
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver disponibilidad <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
