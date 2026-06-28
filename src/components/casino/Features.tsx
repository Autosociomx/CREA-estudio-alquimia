const FEATURES = [
  { icon: '🌿', title: 'Naturaleza & Elegancia', desc: 'Bambú, madera y jardines tropicales' },
  { icon: '🛡️', title: 'Espacios Seguros', desc: 'Instalaciones certificadas y vigiladas' },
  { icon: '🤝', title: 'Atención Personalizada', desc: 'Coordinador dedicado a tu evento' },
  { icon: '⚡', title: 'Respuesta Rápida', desc: 'Cotización en 24 horas o menos' },
  { icon: '✨', title: 'A Tu Medida', desc: 'Cada detalle adaptado a tus sueños' },
];

export default function Features() {
  return (
    <div className="container" style={{ position: 'relative', zIndex: 10 }}>
      <div className="features-bar">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-item">
            <div className="feature-icon">{f.icon}</div>
            <div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
