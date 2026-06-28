import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Photos from venue-gallery.png (4×2 collage, background-size:400% 200%)
 * Photo 1 (0%   0%) = Salón con luces colgantes  → Jardín del Bambú
 * Photo 7 (66% 100%) = Jardín vista montaña       → Terraza Los Olivos
 * Photo 3 (66%  0%) = Salón interior madera       → Salón Bugambilia
 */
const GALLERY = `${import.meta.env.BASE_URL}venue-gallery.png`;

const SPACES = [
  {
    tag: 'Espacio Principal',
    name: 'Jardín del Bambú',
    cap: 'Hasta 200 personas',
    bgPos: '0% 0%',
  },
  {
    tag: 'Jardín & Terraza',
    name: 'Terraza Los Olivos',
    cap: 'Hasta 120 personas',
    bgPos: '66.67% 100%',
  },
  {
    tag: 'Salón Interior',
    name: 'Salón Bugambilia',
    cap: 'Hasta 80 personas',
    bgPos: '66.67% 0%',
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
              className={`space-card reveal reveal-delay-${i}`}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Photo cropped from collage */}
              <div
                style={{
                  width: '100%', height: '100%',
                  backgroundImage: `url(${GALLERY})`,
                  backgroundSize: '400% 200%',
                  backgroundPosition: s.bgPos,
                  transition: 'transform .6s',
                }}
                className="space-card-img"
              />
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
