import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', evento: '', fecha: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const set = (k: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: ev.target.value }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contacto" className="section section-light" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 70px' }}>
          <span className="sec-eyebrow sec-eyebrow-dark reveal">Contacto</span>
          <h2 className="sec-title reveal reveal-delay-1" style={{ color: 'var(--dark-text)' }}>
            Hagamos realidad <em style={{ color: 'var(--terra)' }}>tu celebración</em>
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ color: 'var(--mid-text)', margin: '0 auto', textAlign: 'center' }}>
            Escríbenos y un coordinador te contactará en menos de 24 horas.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="reveal">
            <div className="contact-info-item">
              <div className="contact-icon" style={{ background: 'rgba(176,96,48,0.08)', borderColor: 'rgba(176,96,48,0.15)' }}>
                <MapPin size={20} color="var(--terra)" />
              </div>
              <div>
                <div className="contact-info-label">Ubicación</div>
                <div className="contact-info-value" style={{ color: 'var(--dark-text)' }}>
                  Carretera Federal 200, cerca de la Universidad Tecnológica de Nayarit<br />
                  Nayarit, México
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon" style={{ background: 'rgba(176,96,48,0.08)', borderColor: 'rgba(176,96,48,0.15)' }}>
                <Phone size={20} color="var(--terra)" />
              </div>
              <div>
                <div className="contact-info-label">Teléfono / WhatsApp</div>
                <div className="contact-info-value" style={{ color: 'var(--dark-text)' }}>
                  +52 322 123 4567<br />
                  <a href="https://wa.me/523221234567" target="_blank" rel="noreferrer" style={{ color: '#25D366', fontSize: 13, fontWeight: 700 }}>
                    Abrir WhatsApp →
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon" style={{ background: 'rgba(176,96,48,0.08)', borderColor: 'rgba(176,96,48,0.15)' }}>
                <Clock size={20} color="var(--terra)" />
              </div>
              <div>
                <div className="contact-info-label">Horario de atención</div>
                <div className="contact-info-value" style={{ color: 'var(--dark-text)' }}>
                  Lunes a Viernes: 9:00 – 18:00<br />
                  Sábados: 10:00 – 15:00
                </div>
              </div>
            </div>

            {/* Google Maps — embed centrado en UTN Nayarit hasta confirmar registro */}
            <div style={{ marginTop: 32, borderRadius: 'var(--r)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <iframe
                title="Ubicación Casino Bambú"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.8!2d-104.8914!3d21.4931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842748c8f1d2db55%3A0x7c8e1a0e6bde4ef3!2sUniversidad%20Tecnol%C3%B3gica%20de%20Nayarit!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="260"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{
                background: 'var(--cream)',
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 12, color: 'var(--mid-text)', fontWeight: 300 }}>
                  📍 Junto a Universidad Tecnológica de Nayarit · Próximamente en Google Maps
                </span>
                <a
                  href="https://maps.app.goo.gl/UTNNayarit"
                  target="_blank" rel="noreferrer"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--terra)', textDecoration: 'none' }}
                >
                  Cómo llegar →
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="c-form-section reveal reveal-delay-2">
            {sent ? (
              <div style={{
                textAlign: 'center', padding: '60px 40px',
                background: '#fff', borderRadius: 'var(--r-lg)',
                border: '1px solid var(--cream3)',
              }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--dark-text)', marginBottom: 12 }}>
                  ¡Mensaje enviado!
                </h3>
                <p style={{ fontSize: 15, color: 'var(--mid-text)', fontWeight: 300, lineHeight: 1.7 }}>
                  Gracias por contactar a Casino Bambú. Un coordinador se pondrá en contacto contigo en menos de 24 horas.
                </p>
                <button
                  style={{ marginTop: 28, background: 'none', border: '1px solid var(--cream3)', borderRadius: 8, padding: '10px 24px', color: 'var(--mid-text)', cursor: 'pointer', fontSize: 13 }}
                  onClick={() => setSent(false)}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 40, border: '1px solid var(--cream3)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="contact-form-field">
                    <label className="c-label">Nombre completo *</label>
                    <input className="c-input" required placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} />
                  </div>
                  <div className="contact-form-field">
                    <label className="c-label">Teléfono / WhatsApp *</label>
                    <input className="c-input" required placeholder="+52 322 123 4567" value={form.telefono} onChange={set('telefono')} />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="c-label">Correo electrónico</label>
                  <input className="c-input" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="contact-form-field">
                    <label className="c-label">Tipo de evento *</label>
                    <select className="c-select" required value={form.evento} onChange={set('evento')}>
                      <option value="">Selecciona...</option>
                      <option>Boda</option>
                      <option>Quinceañera</option>
                      <option>Graduación</option>
                      <option>Fiesta Privada</option>
                      <option>Corporativo</option>
                      <option>Bautizo</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="contact-form-field">
                    <label className="c-label">Fecha tentativa</label>
                    <input className="c-input" type="date" value={form.fecha} onChange={set('fecha')} min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="c-label">Mensaje o preguntas</label>
                  <textarea className="c-textarea" placeholder="Cuéntanos sobre tu evento, número de invitados, presupuesto..." value={form.mensaje} onChange={set('mensaje')} />
                </div>
                <button type="submit" className="c-submit" disabled={sending}>
                  {sending
                    ? <><span className="spinner" /> Enviando...</>
                    : <><Send size={15} style={{ display: 'inline', marginRight: 8 }} /> Enviar Solicitud</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
