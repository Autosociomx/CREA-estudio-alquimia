import React, { useState } from 'react';
import { callAI } from '../lib/api';
import { useApp } from '../context';

export default function CalendarPanel() {
  const { queue, showToast, voz } = useApp();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState('');

  const n = new Date();
  const y = n.getFullYear();
  const m = n.getMonth();
  const today = n.getDate();
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();

  const dots: Record<number, string[]> = {};
  queue.forEach(q => {
    const d = parseInt((q.date || '1').split('/')[0]);
    if (!dots[d]) dots[d] = [];
    dots[d].push(q.color);
  });

  const blanks = Array.from({ length: first }, (_, i) => <div key={`b-${i}`} />);
  const daysEls = Array.from({ length: days }, (_, i) => {
    const d = i + 1;
    const isToday = d === today;
    const hasDots = dots[d] && dots[d].length > 0;
    return (
      <div key={d} className={`cday ${isToday ? 'td' : ''} ${hasDots ? 'hc' : ''}`}>
        <div style={{ fontWeight: 600, fontSize: '11px' }}>{d}</div>
        <div className="cdots">
          {(dots[d] || []).slice(0, 3).map((c, idx) => <div key={idx} className="cdot" style={{ background: c }}></div>)}
        </div>
      </div>
    );
  });

  const getVozPrompt = () => voz.q1 ? `\n\nVOZ DE MARCA:\n- Quién soy: ${voz.q1}\n- A quién le hablo: ${voz.q2}\n- Prohibido: ${voz.q3}` : '';

  const generate = async () => {
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 5, 85)), 200);

    const prompt = `Eres AURA, agente editorial de ConnectX (Miguel, Tepic, Nayarit).
${getVozPrompt()}
Plan editorial 7 días para:
🏛 TEPIC DIGITAL — gobernanza, LNETB, municipio
🚛 ROUTEPRO — PYMEs distribuidoras
👤 MIGUEL FUNDADOR — liderazgo tech, IA

Por día: 1 pieza por canal.
Formato por día:
📆 [DÍA]
🏛 [título · plataforma · tipo]
🚛 [título · plataforma · tipo]
👤 [título · plataforma · tipo]

Final: 📊 ESTRATEGIA DE LA SEMANA [3 acciones clave]
Español mexicano, títulos reales y específicos.`;

    try {
      const txt = await callAI(prompt, 2000);
      clearInterval(iv);
      setProgress(100);
      setPlan(txt);
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  return (
    <div className="panel on">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: 'var(--gold)' }}>
            {n.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }).toUpperCase()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted2)' }}>Plan editorial — 3 canales activos</div>
        </div>
        <button className="gbtn sm" onClick={generate} disabled={loading}>
          {loading ? 'PLANIFICANDO...' : '⚗ GENERAR SEMANA'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="cal-hdr">
          <div className="cdl">LUN</div><div className="cdl">MAR</div><div className="cdl">MIÉ</div>
          <div className="cdl">JUE</div><div className="cdl">VIE</div><div className="cdl">SÁB</div><div className="cdl">DOM</div>
        </div>
        <div className="cal-body">
          {blanks}
          {daysEls}
        </div>
      </div>

      {(loading || plan) && (
        <div>
          <div className="pbar"><div className="pfill" style={{ width: `${progress}%` }}></div></div>
          <div className="out-box">
            <div className="out-hdr">
              <div className="out-title">📅 Plan semanal</div>
              <div className="out-acts">
                <button className="abtn" onClick={() => navigator.clipboard.writeText(plan).then(() => showToast('Copiado'))}>📤 Copiar</button>
              </div>
            </div>
            <div className="out-body">
              {loading && !plan ? (
                <div className="empty">
                  <div style={{ fontSize: '24px' }}>⚗</div>
                  <div>Planificando semana...</div>
                </div>
              ) : (
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: 1.85, color: 'var(--text)' }}>
                  {plan}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
