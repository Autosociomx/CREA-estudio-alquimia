import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number; alphaDir: number;
  hue: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    /* Warm firefly particles — like string lights */
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.05,
      r: Math.random() * 2.5 + 0.8,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 0.006 : -0.006,
      hue: 35 + Math.random() * 25,   /* warm gold to amber */
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha >= 1 || p.alpha <= 0.05) p.alphaDir *= -1;
        if (p.x < 0) p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
        if (p.y < 0) p.y = cv.height;
        if (p.y > cv.height) p.y = 0;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `hsla(${p.hue},90%,72%,${p.alpha})`);
        grd.addColorStop(1, `hsla(${p.hue},90%,72%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const scroll = () => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" />
      <div className="hero-bg-overlay" />
      <canvas ref={canvasRef} id="hero-canvas" />

      <div className="hero-content">
        <div className="hero-eyebrow">Nayarit · México</div>

        <h1 className="hero-title">
          Casino <em>Bambú</em>
        </h1>

        <p className="hero-subtitle">Donde cada celebración se convierte en recuerdo eterno</p>

        <p className="hero-desc">
          Un espacio rústico y elegante rodeado de naturaleza, diseñado para dar vida
          a tus momentos más especiales. Bodas, quinceañeras, graduaciones y más.
        </p>

        <div className="hero-btns">
          <a
            href="#contacto"
            className="btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            ✦ Reservar Fecha
          </a>
          <a
            href="#galeria"
            className="btn-secondary"
            onClick={e => { e.preventDefault(); document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Ver Galería
          </a>
        </div>
      </div>

      <button className="hero-scroll" onClick={scroll} aria-label="Scroll">
        <span>Explorar</span>
        <div className="hero-scroll-line" />
        <ChevronDown size={14} />
      </button>
    </section>
  );
}
