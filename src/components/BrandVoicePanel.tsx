import React, { useState } from 'react';
import { useApp } from '../context';

export default function BrandVoicePanel() {
  const { voz, setVoz, showToast } = useApp();
  const [localVoz, setLocalVoz] = useState(voz);
  const [done, setDone] = useState(!!voz.q1);

  const handleSave = () => {
    if (!localVoz.q1.trim()) {
      showToast('Completa al menos la pregunta 1');
      return;
    }
    setVoz(localVoz);
    setDone(true);
    showToast('✅ Voz de marca guardada — activa en todos los generadores');
  };

  return (
    <div className="panel on">
      <div style={{ maxWidth: '580px' }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: '26px', color: 'var(--gold)', marginBottom: '6px' }}>
          VOZ DE MARCA
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted2)', marginBottom: '20px', lineHeight: 1.6 }}>
          3 preguntas. Todo lo que AURA genere después sonará a tu marca — no a IA genérica.
        </div>

        <div className="setup-step">
          <div className="step-num">01</div>
          <div className="step-q">¿Quién eres y qué haces?</div>
          <div className="step-hint">Escríbelo como se lo dirías a alguien en un elevador. Sin tecnicismos.</div>
          <textarea 
            rows={3} 
            value={localVoz.q1} 
            onChange={e => setLocalVoz({ ...localVoz, q1: e.target.value })}
            placeholder="Ej: Soy Miguel, fundador de ConnectX en Tepic. Ayudo a negocios y gobiernos a dejar de operar con papel y pasar a sistemas digitales en días, no meses."
          ></textarea>
        </div>

        <div className="setup-step">
          <div className="step-num">02</div>
          <div className="step-q">¿A quién le hablas exactamente?</div>
          <div className="step-hint">Tu cliente ideal. Qué hace, qué le duele, qué lo frustra todos los días.</div>
          <textarea 
            rows={3} 
            value={localVoz.q2} 
            onChange={e => setLocalVoz({ ...localVoz, q2: e.target.value })}
            placeholder="Ej: Dueños de negocios en Nayarit que tienen repartidores o meseros, que pierden dinero por no tener control, y que creen que digitalizarse es caro o complicado."
          ></textarea>
        </div>

        <div className="setup-step">
          <div className="step-num">03</div>
          <div className="step-q">¿Cuál es tu palabra o frase prohibida?</div>
          <div className="step-hint">La cosa que nunca dirías. Frases genéricas, palabras corporativas, lo que odias del contenido de IA.</div>
          <textarea 
            rows={2} 
            value={localVoz.q3} 
            onChange={e => setLocalVoz({ ...localVoz, q3: e.target.value })}
            placeholder="Ej: 'Solución integral', 'potenciar', 'ecosistema robusto', 'en el dinámico mundo de...', emojis de cohete 🚀"
          ></textarea>
        </div>

        <button className="gbtn" onClick={handleSave}>🎙 GUARDAR VOZ DE MARCA</button>
        
        {done && (
          <div className="setup-done" style={{ display: 'block' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '20px', color: 'var(--gold)', marginBottom: '6px' }}>VOZ DE MARCA ACTIVADA</div>
            <div style={{ fontSize: '12px', color: 'var(--muted2)' }}>Todo lo que generes a partir de ahora sonará a tu marca.</div>
          </div>
        )}
      </div>
    </div>
  );
}
