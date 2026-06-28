import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    text: 'Casino Bambú superó todas nuestras expectativas. El jardín estaba absolutamente mágico con las luces colgantes, y el equipo de coordinación estuvo atento a cada detalle. Fue la boda que siempre soñé.',
    name: 'Valeria & Rodrigo',
    event: 'Boda · Marzo 2025',
    initial: 'V',
  },
  {
    text: 'Mi quinceañera fue perfecta. El espacio de bambú le dio un toque único que nadie más tenía. Mis invitados no paraban de hablar del lugar toda la noche. Totalmente recomendable.',
    name: 'Sofía Martínez',
    event: 'Quinceañera · Febrero 2025',
    initial: 'S',
  },
  {
    text: 'Organizamos el evento corporativo de fin de año aquí y fue un éxito total. El ambiente es diferente a cualquier salón convencional. La naturaleza y la elegancia en perfecta armonía.',
    name: 'Carlos Vega',
    event: 'Evento Corporativo · Diciembre 2024',
    initial: 'C',
  },
];

export default function Testimonials() {
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
    <section className="section section-dark" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="sec-eyebrow reveal">Testimonios</span>
          <h2 className="sec-title reveal reveal-delay-1">
            Lo que dicen nuestros <em>clientes</em>
          </h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testi-card reveal reveal-delay-${i + 1}`}>
              <div className="testi-quote-mark">"</div>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initial}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-event">{t.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div style={{ textAlign: 'center', marginTop: 70 }} className="reveal">
          <p style={{ fontSize: 22, color: 'var(--muted)', fontWeight: 300, marginBottom: 28, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Sé el próximo en vivir la experiencia Casino Bambú
          </p>
          <a
            href="#cotizador"
            className="btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            ✦ Cotizar Mi Evento
          </a>
        </div>
      </div>
    </section>
  );
}
