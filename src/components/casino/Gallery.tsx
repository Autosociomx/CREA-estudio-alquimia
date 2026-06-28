import { useState, useEffect, useRef } from 'react';

type Filter = 'todos' | 'bodas' | 'xv' | 'fiestas' | 'espacios';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos',     label: 'Todos'      },
  { id: 'bodas',     label: 'Bodas'      },
  { id: 'xv',        label: 'Quinceañeras' },
  { id: 'fiestas',   label: 'Fiestas'    },
  { id: 'espacios',  label: 'Espacios'   },
];

/* Placeholder gallery items — heights vary to create masonry feel */
const ITEMS = [
  { id: 1, cat: 'bodas',    h: 320, bg: 'linear-gradient(160deg, #E8D5C0 0%, #D4BFA0 100%)', label: 'Boda · Jardín del Bambú', icon: '💍' },
  { id: 2, cat: 'xv',       h: 240, bg: 'linear-gradient(160deg, #F0D8C8 0%, #DDBC9C 100%)', label: 'Quinceañera · Salón Bugambilia', icon: '👸' },
  { id: 3, cat: 'espacios', h: 200, bg: 'linear-gradient(160deg, #E0CDB0 0%, #CDB890 100%)', label: 'Vista general · Terraza', icon: '🌿' },
  { id: 4, cat: 'fiestas',  h: 280, bg: 'linear-gradient(160deg, #EDDBBD 0%, #D9C08A 100%)', label: 'Celebración familiar', icon: '🎉' },
  { id: 5, cat: 'bodas',    h: 360, bg: 'linear-gradient(160deg, #E6D2B8 0%, #CCBA96 100%)', label: 'Ceremonia al atardecer', icon: '🌅' },
  { id: 6, cat: 'espacios', h: 220, bg: 'linear-gradient(160deg, #F2E4CC 0%, #E0CC9C 100%)', label: 'Decoración nocturna', icon: '✨' },
  { id: 7, cat: 'xv',       h: 300, bg: 'linear-gradient(160deg, #EEDFC5 0%, #D8C492 100%)', label: 'XV años · Entrada', icon: '🌸' },
  { id: 8, cat: 'fiestas',  h: 240, bg: 'linear-gradient(160deg, #F0DFC2 0%, #D4BE8C 100%)', label: 'Aniversario · Vista jardín', icon: '🎊' },
  { id: 9, cat: 'espacios', h: 280, bg: 'linear-gradient(160deg, #E8D8B8 0%, #C8B688 100%)', label: 'Bambú estructural', icon: '🎋' },
];

export default function Gallery() {
  const [active, setActive] = useState<Filter>('todos');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = active === 'todos' ? ITEMS : ITEMS.filter(i => i.cat === active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="galeria" className="section section-mid" ref={sectionRef}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <span className="sec-eyebrow sec-eyebrow-dark reveal">Galería</span>
            <h2 className="sec-title reveal reveal-delay-1" style={{ color: 'var(--dark-text)' }}>
              Momentos que <em style={{ color: 'var(--terra)' }}>inspiran</em>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--mid-text)', maxWidth: 300, fontWeight: 300, lineHeight: 1.6 }} className="reveal reveal-delay-2">
            Pronto compartiremos la galería completa de nuestros eventos. ¡Muy pronto!
          </p>
        </div>

        {/* Filter bar */}
        <div className="gallery-filter reveal reveal-delay-2">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`gf-btn ${active === f.id ? 'active' : ''}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="gallery-coming">
            <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
            <div>Próximamente — subiendo fotos</div>
          </div>
        ) : (
          <div className="gallery-masonry reveal">
            {filtered.map(item => (
              <div key={item.id} className="gallery-item">
                <div
                  className="gallery-item-img"
                  style={{ height: item.h, background: item.bg }}
                >
                  <div style={{ textAlign: 'center', opacity: 0.5 }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--mid-text)' }}>
                      {item.label}
                    </div>
                  </div>
                  <div className="gallery-item-overlay">
                    <span>Ver foto</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming-soon note */}
        <div style={{
          textAlign: 'center', marginTop: 60, padding: '32px 40px',
          background: 'rgba(176,96,48,0.06)',
          border: '1px dashed rgba(176,96,48,0.25)',
          borderRadius: 'var(--r)', color: 'var(--mid-text)',
          fontSize: 14, fontWeight: 300,
        }} className="reveal">
          📸 &nbsp;Nuestras fotos profesionales están en camino. ¡Síguenos en redes para ser el primero en verlas!
        </div>
      </div>
    </section>
  );
}
