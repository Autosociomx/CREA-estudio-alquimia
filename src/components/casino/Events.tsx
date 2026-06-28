import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const EVENTS = [
  { num: '01', name: 'Bodas',           tag: 'La celebración de tu vida',        desc: 'El día más especial merece el espacio más especial. Diseñamos cada detalle para que tu boda sea exactamente como lo soñaste — desde la ceremonia hasta el último baile.' },
  { num: '02', name: 'Quinceañeras',    tag: 'Tu momento de brillar',            desc: 'Celebra tus XV años con todo el esplendor que mereces. Un ambiente mágico que combina tradición y modernidad para hacer de tu quinceañera una noche única.' },
  { num: '03', name: 'Graduaciones',    tag: 'El inicio de un nuevo capítulo',   desc: 'Un logro que merece una gran celebración. Brindemos juntos por los nuevos caminos que comienzan y los sueños que apenas empiezan a hacerse realidad.' },
  { num: '04', name: 'Fiestas Privadas',tag: 'Cualquier motivo, una gran fiesta',desc: 'Cumpleaños, aniversarios, despedidas de soltera y cualquier razón para reunir a los que más quieres en un espacio que hace cada momento especial.' },
  { num: '05', name: 'Corporativos',    tag: 'Negocios con estilo',              desc: 'Convenciones, presentaciones de empresa y cenas ejecutivas en un ambiente que inspira, sorprende y deja una impresión duradera a tus clientes y equipo.' },
  { num: '06', name: 'Bautizos',        tag: 'La bienvenida más especial',       desc: 'Celebra la llegada de los nuevos integrantes de la familia en un espacio íntimo y cálido, rodeado de naturaleza y de las personas más importantes.' },
];

export default function Events() {
  const [open, setOpen] = useState<number | null>(null);
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
    <section id="eventos" className="section section-dark" ref={sectionRef} style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 80 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <span className="sec-eyebrow reveal">Tipos de Eventos</span>
            <h2 className="sec-title reveal" style={{ marginBottom: 0 }}>
              Cada celebración,<br /><em>a tu medida</em>
            </h2>
          </div>
          <p className="reveal" style={{ fontSize: 15, fontWeight: 300, color: 'var(--muted)', maxWidth: 340, lineHeight: 1.8 }}>
            Sin importar el tipo de evento, adaptamos nuestros espacios, servicios y atención para que tu celebración sea exactamente como la imaginaste.
          </p>
        </div>

        {/* Numbered accordion list */}
        <div style={{ borderTop: '1px solid var(--border-dark)' }}>
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                borderBottom: '1px solid var(--border-dark)',
                transition: 'background 0.3s',
                background: open === i ? 'rgba(200,164,68,0.04)' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 40, padding: '28px 0',
                transition: 'padding 0.3s',
              }}>
                {/* Number */}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: '2px',
                  color: open === i ? 'var(--gold)' : 'var(--muted)',
                  width: 28,
                  flexShrink: 0,
                  transition: 'color 0.3s',
                }}>
                  {ev.num}
                </span>

                {/* Name */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(22px, 3.5vw, 34px)',
                    fontWeight: 400,
                    color: open === i ? 'var(--light-text)' : 'rgba(240,226,200,0.7)',
                    transition: 'color 0.3s, font-size 0.3s',
                  }}>
                    {ev.name}
                  </div>
                  {open === i && (
                    <div style={{
                      paddingTop: 16, paddingBottom: 8,
                      display: 'grid', gridTemplateColumns: '1fr auto',
                      gap: 32, alignItems: 'start',
                    }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
                          {ev.tag}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 540 }}>
                          {ev.desc}
                        </div>
                      </div>
                      <button
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          background: 'var(--gold)', border: 'none',
                          borderRadius: 50, padding: '12px 22px',
                          color: 'var(--bg)', fontSize: 11, fontWeight: 700,
                          letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer',
                          whiteSpace: 'nowrap', flexShrink: 0,
                          fontFamily: "'Lato', sans-serif",
                          transition: 'background 0.2s',
                        }}
                        onClick={e => { e.stopPropagation(); document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' }); }}
                      >
                        Cotizar <ArrowUpRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Tag (desktop) */}
                <span style={{
                  fontSize: 12, letterSpacing: 2, color: 'var(--muted)',
                  display: open === i ? 'none' : 'block',
                  fontWeight: 300, minWidth: 180, textAlign: 'right',
                }}>
                  {ev.tag}
                </span>

                {/* Arrow */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid var(--border-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 0.35s, border-color 0.3s',
                  borderColor: open === i ? 'var(--gold)' : '',
                }}>
                  <span style={{ fontSize: 14, color: open === i ? 'var(--gold)' : 'var(--muted)' }}>+</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }} className="reveal">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ✦ Cotizar mi evento
          </button>
        </div>
      </div>
    </section>
  );
}
