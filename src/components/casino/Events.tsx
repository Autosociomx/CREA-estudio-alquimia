import { useEffect, useRef } from 'react';

const EVENTS = [
  { icon: '💍', label: 'Bodas' },
  { icon: '👸', label: 'Quinceañeras' },
  { icon: '🎓', label: 'Graduaciones' },
  { icon: '🎉', label: 'Fiestas' },
  { icon: '💼', label: 'Corporativos' },
  { icon: '🍼', label: 'Bautizos' },
];

export default function Events() {
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
    <section id="eventos" className="section section-cream" ref={sectionRef}>
      <div className="container">
        {/* Eyebrow with decorative lines */}
        <div className="events-eyebrow reveal">
          Celebra cada etapa
        </div>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 className="sec-title reveal reveal-delay-1" style={{ marginBottom: 12 }}>
            ¿Cuál es tu <em>ocasión especial?</em>
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
            Adaptamos cada espacio y servicio para que tu evento sea exactamente
            como lo imaginaste — sin importar el tipo de celebración.
          </p>
        </div>

        {/* Icon row */}
        <div className="events-icons reveal reveal-delay-2" style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--white)' }}>
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="event-icon-item"
              onClick={() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="event-icon-circle">{ev.icon}</div>
              <div className="event-icon-label">{ev.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal reveal-delay-3">
          <p style={{ fontSize: 15, color: 'var(--mid-text)', fontWeight: 300, marginBottom: 24 }}>
            ¿No ves tu tipo de evento? Contáctanos — podemos organizarlo todo.
          </p>
          <button
            className="btn-green"
            onClick={() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ✦ Cotizar mi evento
          </button>
        </div>
      </div>
    </section>
  );
}
