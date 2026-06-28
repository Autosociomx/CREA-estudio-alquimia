/* Scrolling ticker strip — editorial / premium feel */
const ITEMS = ['Bodas', 'Quinceañeras', 'Graduaciones', 'Bodas Civiles', 'Corporativos', 'Fiestas Privadas', 'Bautizos', 'Aniversarios'];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div style={{
      background: 'var(--gold)',
      overflow: 'hidden',
      padding: '14px 0',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', animation: 'marquee 28s linear infinite', width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(9,5,3,0.85)',
            paddingRight: 52,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: 52,
          }}>
            {item}
            <span style={{ fontSize: 8, opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
