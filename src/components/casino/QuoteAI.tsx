import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

const EVENT_TYPES = [
  { id: 'boda',       label: 'Boda',            icon: '💍' },
  { id: 'xv',         label: 'Quinceañera',      icon: '👸' },
  { id: 'graduacion', label: 'Graduación',       icon: '🎓' },
  { id: 'fiesta',     label: 'Fiesta Privada',   icon: '🎉' },
  { id: 'corporativo',label: 'Corporativo',      icon: '💼' },
  { id: 'bautizo',    label: 'Bautizo',          icon: '🍼' },
];

const SERVICES = [
  { id: 'salon',       label: 'Salón',             icon: '🏛️' },
  { id: 'catering',    label: 'Catering',          icon: '🍽️' },
  { id: 'decoracion',  label: 'Decoración',        icon: '🌸' },
  { id: 'musica',      label: 'Música / DJ',       icon: '🎵' },
  { id: 'fotografia',  label: 'Fotografía',        icon: '📷' },
  { id: 'coordinacion',label: 'Coordinación',      icon: '📋' },
];

const INFO_ITEMS = [
  { icon: '⚡', title: 'Respuesta Inmediata', desc: 'Nuestra IA analiza tus necesidades y te da una estimación en segundos.' },
  { icon: '🎯', title: 'Personalizado para Ti', desc: 'Cada cotización considera el tipo de evento, invitados y servicios que eliges.' },
  { icon: '💬', title: 'Sin Compromiso', desc: 'Es solo una estimación inicial. Un coordinador te contactará para detalles.' },
  { icon: '📱', title: 'Seguimiento por WhatsApp', desc: 'Después de cotizar, te contactamos directamente para agendar una visita.' },
];

export default function QuoteAI() {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleService = (id: string) => {
    setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const generate = async () => {
    if (!eventType || !guests) return;
    setLoading(true);
    setError('');
    setResult('');
    const selectedServices = SERVICES.filter(s => services.includes(s.id)).map(s => s.label);
    const evLabel = EVENT_TYPES.find(e => e.id === eventType)?.label ?? eventType;

    const prompt = `Eres el coordinador de eventos de Casino Bambú, un exclusivo salón de eventos en Nayarit, México.
El cliente desea cotizar lo siguiente:
- Tipo de evento: ${evLabel}
- Número de invitados: ${guests} personas
- Fecha tentativa: ${date || 'Por definir'}
- Servicios de interés: ${selectedServices.length > 0 ? selectedServices.join(', ') : 'Solo el salón'}

Genera una cotización estimada en pesos mexicanos (MXN) que sea:
1. Amigable y cálida, como un coordinador de lujo
2. Incluya un rango de precio estimado (rango mínimo-máximo)
3. Mencione qué incluye cada servicio seleccionado
4. Sugiera 1 o 2 recomendaciones adicionales para hacer el evento más especial
5. Finalice invitando a agendar una visita al venue

Formato: párrafos cortos, con emojis, en español. Máximo 200 palabras.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, maxTokens: 600 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.content ?? '');
      setStep(3);
    } catch (err: any) {
      setError('No se pudo generar la cotización. Por favor contáctanos directamente por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0); setEventType(''); setGuests(''); setDate('');
    setServices([]); setResult(''); setError('');
  };

  return (
    <section id="cotizador" className="section section-dark" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 60px' }}>
          <span className="sec-eyebrow reveal">Cotizador Inteligente</span>
          <h2 className="sec-title reveal reveal-delay-1">
            Tu cotización en <em>30 segundos</em>
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
            Powered by IA — obtén una estimación personalizada al instante.
          </p>
        </div>

        <div className="quote-wrapper">
          {/* FORM */}
          <div className="quote-form reveal">
            {/* Progress dots */}
            <div className="quote-steps">
              {[0, 1, 2].map(i => (
                <div key={i} className={`quote-step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
              ))}
              {step === 3 && <div className="quote-step-dot done" />}
            </div>

            {/* STEP 0 — Tipo de evento */}
            {step === 0 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--dark-text)', marginBottom: 6 }}>
                  ¿Qué tipo de evento planeas?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--mid-text)', marginBottom: 24, fontWeight: 300 }}>
                  Selecciona el tipo de celebración
                </p>
                <div className="quote-chips" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  {EVENT_TYPES.map(e => (
                    <button
                      key={e.id}
                      className={`quote-chip ${eventType === e.id ? 'selected' : ''}`}
                      onClick={() => setEventType(e.id)}
                    >
                      {e.icon} {e.label}
                    </button>
                  ))}
                </div>
                <button
                  className="quote-submit"
                  disabled={!eventType}
                  onClick={() => setStep(1)}
                  style={{ marginTop: 16 }}
                >
                  Siguiente <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 1 — Invitados y fecha */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--dark-text)', marginBottom: 6 }}>
                  Cuéntanos más detalles
                </h3>
                <p style={{ fontSize: 14, color: 'var(--mid-text)', marginBottom: 24, fontWeight: 300 }}>
                  Número de invitados y fecha tentativa
                </p>
                <label className="quote-label">Número de invitados *</label>
                <input
                  type="number" min={10} max={500} placeholder="Ej. 150"
                  className="quote-input"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                />
                <label className="quote-label">Fecha tentativa (opcional)</label>
                <input
                  type="date" className="quote-input"
                  value={date} onChange={e => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="quote-submit" style={{ background: 'var(--cream3)', color: 'var(--mid-text)', flex: '0 0 auto', width: 'auto', padding: '18px 20px' }} onClick={() => setStep(0)}>
                    <ArrowLeft size={16} />
                  </button>
                  <button className="quote-submit" disabled={!guests} onClick={() => setStep(2)}>
                    Siguiente <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Servicios */}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--dark-text)', marginBottom: 6 }}>
                  ¿Qué servicios necesitas?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--mid-text)', marginBottom: 24, fontWeight: 300 }}>
                  Puedes seleccionar varios (todos opcionales)
                </p>
                <div className="quote-chips">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      className={`quote-chip ${services.includes(s.id) ? 'selected' : ''}`}
                      onClick={() => toggleService(s.id)}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button className="quote-submit" style={{ background: 'var(--cream3)', color: 'var(--mid-text)', flex: '0 0 auto', width: 'auto', padding: '18px 20px' }} onClick={() => setStep(1)}>
                    <ArrowLeft size={16} />
                  </button>
                  <button className="quote-submit" onClick={generate} disabled={loading}>
                    {loading
                      ? <><span className="spinner" /> Generando...</>
                      : <><Sparkles size={16} /> Obtener Cotización</>
                    }
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Resultado */}
            {step === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Sparkles size={20} color="var(--terra)" />
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--dark-text)' }}>
                    Tu cotización estimada
                  </h3>
                </div>
                {result && (
                  <div className="quote-result">{result}</div>
                )}
                {error && (
                  <div className="quote-result" style={{ color: 'var(--terra)', borderColor: 'rgba(176,96,48,0.3)' }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button className="quote-submit" style={{ background: '#25D366' }} onClick={() => window.open('https://wa.me/523221234567?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20Casino%20Bambú', '_blank')}>
                    📱 Contactar por WhatsApp
                  </button>
                </div>
                <button onClick={reset} style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', color: 'var(--mid-text)', fontSize: 13, cursor: 'pointer', padding: 8 }}>
                  ← Nueva cotización
                </button>
              </div>
            )}
          </div>

          {/* INFO SIDE */}
          <div className="quote-info-side reveal reveal-delay-2">
            <span className="sec-eyebrow">¿Por qué cotizar aquí?</span>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: 'var(--light-text)', marginBottom: 16 }}>
              Planea tu evento con <em style={{ color: 'var(--gold)' }}>inteligencia artificial</em>
            </h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
              Nuestra herramienta de IA analiza el tipo de evento, número de invitados
              y servicios para darte una estimación de precio honesta y personalizada
              en segundos.
            </p>
            {INFO_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: 'rgba(200,164,68,0.1)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--light-text)', marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
