import { useEffect, useRef } from 'react';
import { Users, ArrowRight } from 'lucide-react';

const SPACES = [
  {
    tag: 'Espacio Principal',
    name: 'Jardín del Bambú',
    desc: 'Nuestro espacio estrella bajo arquitectura de bambú y cubierta de teja. Ideal para ceremonias y recepciones al aire libre con el toque rústico-elegante que nos distingue.',
    cap: '200 personas',
    icon: '🎋',
    features: ['Cubierta de teja', 'Luz natural', 'Área de bar', 'Pista de baile'],
    gradient: 'linear-gradient(160deg, #1C1009 0%, #261508 100%)',
    accent: 'var(--gold)',
  },
  {
    tag: 'Terraza',
    name: 'Terraza Los Olivos',
    desc: 'Espacio semi-abierto con jardín curado, área de cocina exterior y el encanto natural de los olivos centenarios que crean un ambiente íntimo y especial.',
    cap: '120 personas',
    icon: '🌿',
    features: ['Jardín de olivos', 'Cocina exterior', 'Decoración flora'],
    gradient: 'linear-gradient(160deg, #160D08 0%, #1C1009 100%)',
    accent: 'var(--terra)',
  },
  {
    tag: 'Salón Interior',
    name: 'Salón Bugambilia',
    desc: 'Salón climatizado con decoración ecléctica y acceso privado independiente. La opción ideal para eventos más íntimos, presentaciones y reuniones exclusivas.',
    cap: '80 personas',
    icon: '💐',
    features: ['Climatizado', 'Acceso independiente', 'Pantalla LED'],
    gradient: 'linear-gradient(160deg, #1C1009 0%, #130B06 100%)',
    accent: 'var(--green2)',
  },
];

export default function Spaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section id="espacios" className="section section-dark" ref={sectionRef} style={{ paddingBottom: 100, overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
          <div>
            <span className="sec-eyebrow reveal">Nuestros Espacios</span>
            <h2 className="sec-title reveal" style={{ marginBottom: 0 }}>
              Tres ambientes,<br /><em>una experiencia</em> única
            </h2>
          </div>
          {/* Scroll controls (visible on desktop) */}
          <div style={{ display: 'flex', gap: 10 }} className="reveal">
            <button
              onClick={() => scroll(-1)}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'transparent', border: '1px solid var(--border-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'border-color 0.2s',
              }}
              aria-label="Anterior"
            >
              <ArrowRight size={18} color="var(--muted)" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button
              onClick={() => scroll(1)}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--gold)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Siguiente"
            >
              <ArrowRight size={18} color="var(--bg)" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container — overflows container for cinematic feel */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: 20,
          overflowX: 'auto', overflowY: 'visible',
          paddingLeft: 'max(24px, calc((100vw - 1180px) / 2 + 24px))',
          paddingRight: 'max(24px, calc((100vw - 1180px) / 2 + 24px))',
          paddingBottom: 20,
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
        className="spaces-hscroll"
      >
        {SPACES.map((s, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 'clamp(300px, 38vw, 480px)',
              scrollSnapAlign: 'start',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
            }}
            className="reveal"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Image placeholder */}
            <div style={{
              width: '100%', aspectRatio: '4/5',
              background: s.gradient,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12,
              transition: 'transform 0.5s ease',
              position: 'relative',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
            >
              <div style={{ fontSize: 64, opacity: 0.18 }}>{s.icon}</div>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.25, color: 'var(--light-text)' }}>
                Foto próximamente
              </div>

              {/* Top tag */}
              <div style={{
                position: 'absolute', top: 20, left: 20,
                background: 'rgba(9,5,3,0.7)', backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-dark)',
                borderRadius: 50, padding: '6px 14px',
                fontSize: 10, fontWeight: 700, letterSpacing: 3,
                textTransform: 'uppercase', color: 'var(--gold)',
              }}>
                {s.tag}
              </div>
            </div>

            {/* Content bar */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--bg2)',
              borderTop: `2px solid ${s.accent}`,
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, fontWeight: 400,
                color: 'var(--light-text)', marginBottom: 8,
              }}>
                {s.name}
              </div>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)' }}>
                  <Users size={14} /> {s.cap}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {s.features.slice(0, 2).map(f => (
                    <span key={f} style={{
                      fontSize: 10, padding: '3px 10px',
                      background: 'rgba(200,164,68,0.1)',
                      border: '1px solid rgba(200,164,68,0.18)',
                      borderRadius: 20, color: 'var(--gold)', letterSpacing: 1,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--muted)', letterSpacing: 3, textTransform: 'uppercase' }}>
        ← Desliza para explorar →
      </div>
    </section>
  );
}
