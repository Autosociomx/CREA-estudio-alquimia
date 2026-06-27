import React, { useState } from 'react';
import { callAI } from '../lib/api';
import { useApp } from '../context';
import { CHS } from '../types';

export default function DailyPanel() {
  const { voz, setStats, queue, setQueue, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const getVozPrompt = () => voz.q1 ? `\n\nVOZ DE MARCA:\n- Quién soy: ${voz.q1}\n- A quién le hablo: ${voz.q2}\n- Prohibido: ${voz.q3}` : '';

  const generate = async () => {
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 5, 85)), 200);
    
    const n = new Date();
    const fecha = n.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
    
    const prompt = `Eres AURA, el agente de contenido de ConnectX (Miguel, Tepic, Nayarit).
Hoy es ${fecha}.
${getVozPrompt()}

Genera el PLAN DE CONTENIDO DEL DÍA para estos 3 canales. Una pieza por canal, lista para producir hoy.

Para cada pieza incluye:
- CANAL y PLATAFORMA recomendada
- TÍTULO VIRAL (máximo 65 caracteres)
- HOOK (las primeras 2 oraciones que paran el scroll)
- GUIÓN RÁPIDO (150-200 palabras, listo para grabar)
- CTA
- HORARIO ÓPTIMO DE PUBLICACIÓN (hora México)

Formato:

🏛 TEPIC DIGITAL
📱 Plataforma: [...]
🎯 Título: [...]
🪝 Hook: [...]
📜 Guión: [...]
→ CTA: [...]
🕐 Publicar: [...]

🚛 ROUTEPRO
[mismo formato]

👤 MIGUEL FUNDADOR
[mismo formato]

Sé específico, creativo, y con lenguaje mexicano natural.`;

    try {
      const res = await callAI(prompt, 2200);
      clearInterval(iv);
      setProgress(100);
      
      const blocks = res.split(/(?=🏛|🚛|👤)/g).filter((b: string) => b.trim());
      const chMap: any = { '🏛': 'tepic', '🚛': 'routepro', '👤': 'miguel' };
      
      const parsed = blocks.map((blk: string) => {
        const ico = blk.trim()[0];
        const chId = chMap[ico] || 'tepic';
        const ch = CHS.find(c => c.id === chId) || CHS[0];
        const titleLine = blk.split('\n')[0];
        return {
          ch,
          title: titleLine,
          body: blk.replace(titleLine, '').trim(),
          raw: blk
        };
      });
      
      setOutput(parsed);
      setStats(s => ({ ...s, total: s.total + 3, tepic: s.tepic + 1, rp: s.rp + 1, mig: s.mig + 1 }));
      
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  const saveToQueue = (ch: any, title: string) => {
    setQueue([...queue, {
      type: 'content',
      chId: ch.id,
      chName: ch.name,
      color: ch.color,
      title: title.slice(0, 80),
      plat: 'Multi-formato',
      status: 'ready',
      date: new Date().toLocaleDateString('es-MX')
    }]);
    showToast('💾 Guardado en cola');
  };

  return (
    <div className="panel on">
      <div className="daily-header">
        <div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '26px', color: 'var(--gold)' }}>
            BUENOS DÍAS — HOY
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted2)', marginTop: '2px' }}>
            {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <button className="gbtn sm" onClick={generate} disabled={loading}>
          {loading ? 'GENERANDO...' : '☀️ GENERAR PLAN DEL DÍA'}
        </button>
      </div>

      <div className="pbar">
        <div className="pfill" style={{ width: `${progress}%` }}></div>
      </div>

      <div>
        {!output.length && !loading && (
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 'var(--r)', padding: '22px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>☀️</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>Presiona "Generar Plan del Día"</div>
            <div style={{ fontSize: '12px', color: 'var(--muted2)', maxWidth: '360px', margin: '0 auto', lineHeight: 1.6 }}>
              AURA analiza tus 3 canales y genera 3 piezas listas para aprobar y producir hoy. Sin empezar desde cero.
            </div>
          </div>
        )}
        
        {loading && !output.length && (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--muted2)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>
            ⚗ AURA preparando tu día...
          </div>
        )}

        {output.map((item, i) => (
          <div key={i} className={`day-card ${i === 0 ? 'td' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '3px', height: '20px', background: item.ch.color, borderRadius: '2px', flexShrink: 0 }}></div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.title}</div>
              <div style={{ flex: 1 }}></div>
              <button className="abtn" onClick={() => navigator.clipboard.writeText(item.raw).then(() => showToast('Copiado al portapapeles'))}>📤 Copiar</button>
              <button className="abtn" onClick={() => saveToQueue(item.ch, item.title)}>💾 Cola</button>
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
