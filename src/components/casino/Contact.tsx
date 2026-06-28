import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import Testimonials from './Testimonials';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', evento: '', fecha: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
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
    <section id="contacto" className="section section-cream" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 60px' }}>
          <span className="sec-eyebrow reveal">Reservaciones</span>
          <h2 className="sec-title reveal reveal-delay-1">
            Hagamos realidad <em>tu celebración</em>
          </h2>
          <p className="sec-desc reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
            Escríbenos y un coordinador te contactará en menos de 24 horas.
          </p>
        </div>

        <div className="quote-contact-grid">
          {/* Form */}
          <div className="reveal">
            {sent ? (
              <div className="qc-form" style={{ textAlign: 'center', padding: '60px 40px' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--dark-text)', marginBottom: 12 }}>
                  ¡Mensaje enviado!
                </h3>
                <p style={{ fontSize: 15, color: 'var(--mid-text)', fontWeight: 300, lineHeight: 1.7 }}>
                  Gracias por contactar a Casino Bambú. Un coordinador se pondrá en contacto contigo en menos de 24 horas.
                </p>
                <button
                  style={{ marginTop: 28, background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 24px', color: 'var(--mid-text)', cursor: 'pointer', fontSize: 13 }}
                  onClick={() => setSent(false)}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="qc-form">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--dark-text)', marginBottom: 24 }}>
                  Solicitar información
                </h3>
                <div className="qc-form-row">
                  <div className="qf-field">
                    <label className="qf-label">Nombre completo *</label>
                    <input className="qf-input" required placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} />
                  </div>
                  <div className="qf-field">
                    <label className="qf-label">WhatsApp *</label>
                    <input className="qf-input" required placeholder="+52 322 123 4567" value={form.telefono} onChange={set('telefono')} />
                  </div>
                </div>
                <div className="qf-field">
                  <label className="qf-label">Correo electrónico</label>
                  <input className="qf-input" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="qc-form-row">
                  <div className="qf-field">
                    <label className="qf-label">Tipo de evento *</label>
                    <select className="qf-select" required value={form.evento} onChange={set('evento')}>
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
                  <div className="qf-field">
                    <label className="qf-label">Fecha tentativa</label>
                    <input className="qf-input" type="date" value={form.fecha} onChange={set('fecha')} min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className="qf-field">
                  <label className="qf-label">Mensaje</label>
                  <textarea className="qf-textarea" placeholder="Cuéntanos sobre tu evento, número de invitados, presupuesto..." value={form.mensaje} onChange={set('mensaje')} />
                </div>
                <button type="submit" className="qf-submit" disabled={sending}>
                  {sending
                    ? <><span className="spinner" /> Enviando...</>
                    : <><Send size={15} /> Enviar Solicitud</>
                  }
                </button>
              </form>
            )}

            {/* Contact info below form */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: MapPin, text: 'Carretera Federal 200, cerca de UTN · Nayarit, México' },
                { Icon: Phone, text: '+52 322 123 4567 — WhatsApp disponible' },
                { Icon: Clock, text: 'Lun–Vie 9:00–18:00 · Sáb 10:00–15:00' },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    background: 'rgba(14,74,66,0.08)', border: '1px solid var(--border)',
                    borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} color="var(--green)" />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--mid-text)', fontWeight: 300, lineHeight: 1.6, paddingTop: 2 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div style={{ marginTop: 24, borderRadius: 'var(--r)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <iframe
                title="Ubicación Casino Bambú"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.8!2d-104.8914!3d21.4931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842748c8f1d2db55%3A0x7c8e1a0e6bde4ef3!2sUniversidad%20Tecnol%C3%B3gica%20de%20Nayarit!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: '10px 16px', background: 'var(--white)', fontSize: 11, color: 'var(--muted)', fontWeight: 300 }}>
                📍 Junto a UTN · Próximamente en Google Maps
              </div>
            </div>
          </div>

          {/* Testimonials side */}
          <div className="reveal reveal-delay-2">
            <span className="sec-eyebrow" style={{ marginBottom: 24, display: 'block' }}>Lo que dicen nuestros clientes</span>
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
}
