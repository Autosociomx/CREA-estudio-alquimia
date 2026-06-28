import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const SPACES = [
  {
    tag: 'Espacio Principal',
    name: 'Jardín del Bambú',
    cap: 'Hasta 200 personas',
    img: '/venue-hero.png',
    gradient: 'linear-gradient(160deg, #1A3830 0%, #0E2820 100%)',
  },
  {
    tag: 'Jardín',
    name: 'Terraza Los Olivos',
    cap: 'Hasta 120 personas',
    img: '/venue-jardin.png',
    gradient: 'linear-gradient(160deg, #1C3428 0%, #102818 100%)',
  },
  {
    tag: 'Salón Interior',
    name: 'Salón Bugambilia',
    cap: 'Hasta 80 personas',
    img: '',
    gradient: 'linear-gradient(160deg, #2A3828 0%, #1A2E1A 100%)',
  },
];

export default function Spaces() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="espacios" className="section section-light" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
          <span className="sec-eyebrow reveal">Nuestros Espacios</span>
          <h2 className="sec-title reveal reveal-delay-1">
            Tres ambientes,<br /><em>una experiencia</em> única
          </h2>
        </div>

        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <div
              key={i}
              className="space-card reveal"
              style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {s.img ? (
                <img
                  src={s.img}
                  alt={s.name}
                  className="space-card-img"
                  onError={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement as HTMLElement;
                    parent.style.background = s.gradient;
                  }}
                />
              ) : (
                <div className="space-card-gradient" style={{ background: s.gradient }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 56, opacity: 0.15 }}>🌿</div>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(240,237,232,.25)', textTransform: 'uppercase' }}>Foto próximamente</div>
                  </div>
                </div>
              )}
              <div className="space-card-overlay" />
              <div className="space-card-content">
                <div className="space-card-cap">{s.tag}</div>
                <div className="space-card-name">{s.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'rgba(240,237,232,.6)', fontWeight: 300 }}>{s.cap}</span>
                  <button className="space-card-btn">
                    Conocer <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
