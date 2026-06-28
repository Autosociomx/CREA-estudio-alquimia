import { useEffect, useRef } from 'react';

const STRIPS = [
  { w: 200, h: 240, bg: 'linear-gradient(160deg, #C8D8C0 0%, #A8C0A0 100%)', icon: '💍', label: 'Boda' },
  { w: 160, h: 240, bg: 'linear-gradient(160deg, #D8C8D0 0%, #C0A0B0 100%)', icon: '👸', label: 'Quinceañera' },
  { w: 220, h: 240, bg: 'linear-gradient(160deg, #C0D0C8 0%, #A0B8A8 100%)', icon: '🌿', label: 'Jardín' },
  { w: 160, h: 240, bg: 'linear-gradient(160deg, #D0C8B8 0%, #B8A898 100%)', icon: '🎉', label: 'Fiesta' },
  { w: 190, h: 240, bg: 'linear-gradient(160deg, #C8D0C0 0%, #A8B8A0 100%)', icon: '✨', label: 'Noche' },
];

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
              Cada foto cuenta una historia de amor, alegría y celebración
              dentro de nuestros espacios.
            </p>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--muted)', lineHeight: 1.8,
              borderLeft: '2px solid var(--gold)', paddingLeft: 16,
            }}>
              📸 Galería completa<br />próximamente<br />
              <span style={{ fontWeight: 300, fontSize: 11 }}>Síguenos en redes</span>
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {[
                { href: 'https://instagram.com', icon: '📸', label: 'Instagram' },
                { href: 'https://facebook.com', icon: '📘', label: 'Facebook' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px',
                    background: 'var(--white)', border: '1px solid var(--border)',
                    borderRadius: 50, fontSize: 12, color: 'var(--mid-text)',
                    fontWeight: 700, textDecoration: 'none',
                    transition: 'border-color .2s, color .2s',
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — horizontal strip */}
          <div className="gallery-strip reveal reveal-delay-2">
            {STRIPS.map((s, i) => (
              <div key={i} className="gallery-strip-item" style={{ width: s.w, height: s.h }}>
                <div
                  className="gallery-strip-img"
                  style={{ background: s.bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <div style={{ fontSize: 32, opacity: .5 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--mid-text)', opacity: .6 }}>{s.label}</div>
                </div>
                <div className="gallery-overlay">
                  <span>Ver foto</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
