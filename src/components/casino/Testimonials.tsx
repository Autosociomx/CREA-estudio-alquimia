const TESTIMONIALS = [
  {
    text: 'Casino Bambú superó todas nuestras expectativas. El jardín estaba absolutamente mágico con las luces colgantes, y el equipo estuvo atento a cada detalle.',
    name: 'Valeria & Rodrigo',
    event: 'Boda · Marzo 2025',
    initial: 'V',
  },
  {
    text: 'Mi quinceañera fue perfecta. El espacio de bambú le dio un toque único que nadie más tenía. Mis invitados no paraban de hablar del lugar toda la noche.',
    name: 'Sofía Martínez',
    event: 'Quinceañera · Feb 2025',
    initial: 'S',
  },
  {
    text: 'Organizamos el evento corporativo de fin de año aquí y fue un éxito total. Ambiente completamente diferente a cualquier salón convencional. Nuestros clientes quedaron impresionados.',
    name: 'Carlos Vega',
    event: 'Corporativo · Dic 2024',
    initial: 'C',
  },
];

export default function Testimonials() {
  return (
    <div className="testi-3-grid">
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="testi-card">
          <div className="testi-card-quote">"</div>
          <p className="testi-card-text">"{t.text}"</p>
          <div className="testi-card-author">
            <div className="testi-card-avatar">{t.initial}</div>
            <div>
              <div className="testi-card-name">{t.name}</div>
              <div className="testi-card-event">{t.event}</div>
              <div className="testi-card-stars">★★★★★</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
