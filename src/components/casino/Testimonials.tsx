import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: 'Casino Bambú superó todas nuestras expectativas. El jardín estaba absolutamente mágico con las luces colgantes, y el equipo de coordinación estuvo atento a cada detalle. Fue exactamente la boda que siempre soñé.',
    name: 'Valeria & Rodrigo',
    event: 'Boda',
    date: 'Marzo 2025',
    initial: 'V',
  },
  {
    text: 'Mi quinceañera fue perfecta. El espacio de bambú le dio un toque único que nadie más tenía. Mis invitados no paraban de hablar del lugar toda la noche. Un espacio que te hace sentir especial desde que llegas.',
    name: 'Sofía Martínez',
    event: 'Quinceañera',
    date: 'Febrero 2025',
    initial: 'S',
  },
  {
    text: 'Organizamos el evento corporativo de fin de año aquí y fue un éxito total. El ambiente es completamente diferente a cualquier salón convencional. La naturaleza y la elegancia en perfecta armonía — nuestros clientes quedaron impresionados.',
    name: 'Carlos Vega',
    event: 'Evento Corporativo',
    date: 'Diciembre 2024',
    initial: 'C',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const go = (dir: 1 | -1) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIdx(i => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      setAnimating(false);
    }, 250);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section className="section" ref={sectionRef} style={{ background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(160px, 22vw, 320px)',
        fontStyle: 'italic',
        fontWeight: 700,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(200,164,68,0.06)',
        letterSpacing: -8,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}>
        Clientes
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 80px' }}>
          <span className="sec-eyebrow reveal">Testimonios</span>
          <h2 className="sec-title reveal" style={{ marginBottom: 0 }}>
            Lo que dicen<br />nuestros <em>clientes</em>
          </h2>
        </div>

        {/* Main quote */}
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }} className="reveal">
          {/* Big quote mark */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 120,
            lineHeight: 0.7,
            color: 'var(--gold)',
            opacity: 0.3,
            marginBottom: 20,
          }}>
            "
          </div>

          {/* Quote text */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--light-text)',
            lineHeight: 1.7,
            marginBottom: 48,
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.25s ease',
          }}>
            "{t.text}"
          </p>

          {/* Author */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            opacity: animating ? 0 : 1, transition: 'opacity 0.25s ease',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold), var(--terra))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: 'italic', color: '#fff',
            }}>
              {t.initial}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--light-text)', marginBottom: 2 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)' }}>
                {t.event} · {t.date}
              </div>
            </div>
          </div>

          {/* Stars */}
          <div style={{ marginTop: 28, color: 'var(--gold)', fontSize: 16, letterSpacing: 4 }}>
            ★★★★★
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 48 }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setIdx(i); setAnimating(false); }, 250); } }}
                  style={{
                    width: i === idx ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === idx ? 'var(--gold)' : 'rgba(200,164,68,0.25)',
                    border: 'none', cursor: 'pointer',
                    transition: 'width 0.3s, background 0.3s', padding: 0,
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: 10, marginLeft: 20 }}>
              <button
                onClick={() => go(-1)}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'transparent', border: '1px solid var(--border-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-dark)'; }}
                aria-label="Anterior"
              >
                <ArrowLeft size={16} color="var(--muted)" />
              </button>
              <button
                onClick={() => go(1)}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--gold)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                aria-label="Siguiente"
              >
                <ArrowRight size={16} color="var(--bg)" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 80 }} className="reveal">
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
