import { useEffect, useRef } from 'react';

/**
 * venue-gallery.png is a 4×2 collage.
 * We extract each photo via background-size:400% 200% + background-position.
 * Cols: 0% | 33.33% | 66.67% | 100%   Rows: 0% | 100%
 */
const PHOTOS = [
  { x: '0%',      y: '0%',    label: 'Salón con luces',       cat: 'espacios' },
  { x: '33.33%',  y: '0%',    label: 'Área cubierta',          cat: 'espacios' },
  { x: '66.67%',  y: '0%',    label: 'Salón interior',         cat: 'espacios' },
  { x: '100%',    y: '0%',    label: 'Mesa rústica',           cat: 'espacios' },
  { x: '0%',      y: '100%',  label: 'Barra de servicio',      cat: 'espacios' },
  { x: '33.33%',  y: '100%',  label: 'Área lounge',            cat: 'espacios' },
  { x: '66.67%',  y: '100%',  label: 'Jardín · Vista montaña', cat: 'bodas'   },
  { x: '100%',    y: '100%',  label: 'Terraza & bugambilias',  cat: 'bodas'   },
];

const GALLERY_IMG = `${import.meta.env.BASE_URL}venue-gallery.png`;
const HEIGHTS = [260, 200, 240, 220, 200, 260, 240, 220];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="galeria" className="section section-light" ref={sectionRef}>
      <div className="container">
        <div className="gallery-layout">
          {/* Left — text */}
          <div className="reveal">
            <span className="sec-eyebrow">Galería</span>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              Momentos que <em>inspiran</em>
            </h2>
            <p className="sec-desc" style={{ marginBottom: 32, fontSize: 15 }}>
              Espacios únicos donde cada celebración cobra vida —
              madera, naturaleza y elegancia en perfecta armonía.
            </p>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--muted)', lineHeight: 1.8,
              borderLeft: '2px solid var(--gold)', paddingLeft: 16,
            }}>
              📸 {PHOTOS.length} fotos reales<br />del venue<br />
              <span style={{ fontWeight: 300, fontSize: 11 }}>Más próximamente</span>
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {[
                { href: 'https://instagram.com', label: '📸 Instagram' },
                { href: 'https://facebook.com', label: '📘 Facebook' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', background: 'var(--white)',
                    border: '1px solid var(--border)', borderRadius: 50,
                    fontSize: 12, color: 'var(--mid-text)', fontWeight: 700,
                    textDecoration: 'none', transition: 'border-color .2s',
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — horizontal photo strip */}
          <div className="gallery-strip reveal reveal-delay-2">
            {PHOTOS.slice(0, 5).map((p, i) => (
              <div
                key={i}
                className="gallery-strip-item"
                style={{ width: i === 2 ? 220 : 170, height: HEIGHTS[i] }}
              >
                <div
                  className="gallery-strip-img"
                  style={{
                    width: '100%', height: '100%',
                    backgroundImage: `url(${GALLERY_IMG})`,
                    backgroundSize: '400% 200%',
                    backgroundPosition: `${p.x} ${p.y}`,
                  }}
                />
                <div className="gallery-overlay">
                  <span>{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row — full width masonry */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }} className="reveal reveal-delay-3">
          {PHOTOS.slice(5).map((p, i) => (
            <div
              key={i}
              style={{
                borderRadius: 'var(--r)', overflow: 'hidden',
                height: 200, cursor: 'pointer', position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%', height: '100%',
                  backgroundImage: `url(${GALLERY_IMG})`,
                  backgroundSize: '400% 200%',
                  backgroundPosition: `${p.x} ${p.y}`,
                  transition: 'transform .4s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 16px 14px',
                background: 'linear-gradient(0deg, rgba(10,40,35,.7) 0%, transparent 100%)',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(240,237,232,.85)', textTransform: 'uppercase' }}>
                  {p.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
