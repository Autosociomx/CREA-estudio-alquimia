import { useEffect, useRef } from 'react';

const EVENTS = [
  { icon: '💍', name: 'Bodas',         desc: 'El día más especial merece el espacio más especial. Creamos la boda de tus sueños.' },
  { icon: '👸', name: 'Quinceañeras',  desc: 'Celebra tus XV años con todo el esplendor que mereces en un ambiente mágico.' },
  { icon: '🎓', name: 'Graduaciones',  desc: 'Un logro que merece una gran celebración. Brindemos por el nuevo capítulo.' },
  { icon: '🎉', name: 'Fiestas',       desc: 'Cumpleaños, aniversarios, despedidas de soltera y más. Cualquier motivo es bueno.' },
  { icon: '💼', name: 'Corporativos',  desc: 'Presentaciones, reuniones de empresa y convenciones en un ambiente único.' },
  { icon: '🍼', name: 'Bautizos',      desc: 'Celebra la llegada de los nuevos integrantes de la familia con estilo.' },
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
    <section id="eventos" className="section section-light" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="sec-eyebrow sec-eyebrow-dark reveal">Tipos de Eventos</span>
          <h2 className="sec-title reveal reveal-delay-1" style={{ color: 'var(--dark-text)' }}>
            Celebraciones de <em style={{ color: 'var(--terra)' }}>todo tipo</em>, un solo lugar
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ color: 'var(--mid-text)', margin: '0 auto' }}>
            Desde bodas íntimas hasta grandes fiestas, adaptamos nuestro espacio
            y servicios a cada tipo de celebración.
          </p>
        </div>

        <div className="events-grid">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className={`event-card reveal reveal-delay-${(i % 3) + 1}`}
              onClick={() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="event-icon">{ev.icon}</span>
              <div className="event-name">{ev.name}</div>
              <div className="event-desc">{ev.desc}</div>
              <div style={{
                marginTop: 20, fontSize: 11, fontWeight: 700,
                letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Cotizar →
              </div>
            </div>
          ))}
        </div>

        {/* Divider band */}
        <div style={{
          marginTop: 80, padding: '40px 60px',
          background: 'linear-gradient(135deg, var(--terra), var(--gold))',
          borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }} className="reveal">
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#fff', marginBottom: 6 }}>
              ¿Tu evento no está en la lista?
            </div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
              Contáctanos y creamos algo especial para ti.
            </div>
          </div>
          <button
            className="btn-primary"
            style={{ background: '#fff', color: 'var(--terra)' }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  );
}
