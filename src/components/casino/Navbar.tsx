import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#nosotros',    label: 'Nosotros'  },
  { href: '#espacios',    label: 'Espacios'  },
  { href: '#eventos',     label: 'Eventos'   },
  { href: '#galeria',     label: 'Galería'   },
  { href: '#cotizador',   label: 'Cotizar'   },
  { href: '#contacto',    label: 'Contacto', cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#inicio" className="nav-logo" onClick={e => { e.preventDefault(); handleLink('#inicio'); }}>
          <div className="nav-logo-icon">🎋</div>
          Casino Bambú
        </a>

        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={l.cta ? 'nav-cta' : ''}
                onClick={e => { e.preventDefault(); handleLink(l.href); }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen
            ? <X size={24} color="var(--light-text)" />
            : <Menu size={24} color="var(--light-text)" />
          }
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); handleLink(l.href); }}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
