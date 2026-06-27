import React, { useState } from 'react';
import { callAI } from '../lib/api';
import { useApp } from '../context';
import { CHS } from '../types';

export default function FormatsPanel() {
  const { voz, showToast, lastContent, setQueue, queue } = useApp();
  const [baseText, setBaseText] = useState(lastContent ? lastContent.text : '');
  const [chName, setChName] = useState('Tepic Digital');
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formats, setFormats] = useState<any>(null);

  const getVozPrompt = () => voz.q1 ? `\n\nVOZ DE MARCA:\n- Quién soy: ${voz.q1}\n- A quién le hablo: ${voz.q2}\n- Prohibido: ${voz.q3}` : '';

  const generate = async () => {
    if (!baseText.trim()) { showToast('Pega el guión o idea base primero'); return; }
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 5, 85)), 200);
    
    const prompt = `Eres AURA, especialista en adaptación de contenido para redes sociales.
CANAL: ${chName}
PIEZA BASE:
${baseText}
${getVozPrompt()}

Adapta esta pieza a 4 formatos distintos. Responde SOLO JSON sin markdown:
{
  "reel15":{"titulo":"","texto":"","notas":""},
  "short60":{"titulo":"","texto":"","notas":""},
  "postFB":{"titulo":"","texto":"","notas":""},
  "carrusel":{"titulo":"","slides":["","","","",""]}
}

REGLAS:
- reel15: Solo hook de 2 oraciones + CTA. Máximo 30 palabras. Para ver sin sonido.
- short60: Hook + 3 puntos clave numerados + CTA. 90-110 palabras.
- postFB: Texto nativo Facebook con emojis. Sin links en el cuerpo. 120-180 palabras. Cierra con pregunta para engagement.
- carrusel: 5 slides — slide 1: portada con pregunta fuerte, slides 2-4: un punto cada uno, slide 5: CTA. Máximo 15 palabras por slide.
Lenguaje mexicano natural.`;

    try {
      let raw = await callAI(prompt, 1200);
      raw = raw.replace(/\`\`\`json|\`\`\`/g, '').trim();
      const parsed = JSON.parse(raw);
      clearInterval(iv);
      setProgress(100);
      setFormats(parsed);
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  const handleQueue = (key: string, title: string) => {
    const ch = CHS.find(c => c.name === chName) || CHS[0];
    setQueue([...queue, {
      type: 'content',
      chId: ch.id,
      chName: ch.name,
      color: ch.color,
      title: title.slice(0, 80),
      plat: key,
      status: 'ready',
      date: new Date().toLocaleDateString('es-MX')
    }]);
    showToast('💾 Guardado en cola');
  };

  return (
    <div className="panel on">
      <div className="card" style={{ marginBottom: '14px' }}>
        <div className="card-t">📐 Adaptar una pieza a 4 formatos automáticamente</div>
        <div className="two">
          <div>
            <div className="fr">
              <label>Pieza base (pega tu guión o idea)</label>
              <textarea rows={6} value={baseText} onChange={e => setBaseText(e.target.value)} placeholder="Pega aquí el guión o idea base que quieres adaptar a todos los formatos..."></textarea>
            </div>
            <div className="fr">
              <label>Canal / producto</label>
              <select value={chName} onChange={e => setChName(e.target.value)}>
                {CHS.map(ch => <option key={ch.name}>{ch.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted2)', lineHeight: 1.75, paddingTop: '4px' }}>
            <div style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--cyan)' }}>📱 Reel 15s</strong> — Solo el hook + CTA. Máximo impacto visual.</div>
            <div style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--gold)' }}>⏱ Short 60s</strong> — Hook + 3 puntos clave + CTA. Completo y rápido.</div>
            <div style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--green)' }}>📘 Post Facebook</strong> — Texto nativo con emojis, sin links en el cuerpo.</div>
            <div><strong style={{ color: 'var(--purple)' }}>🎴 Carrusel</strong> — 5 slides: portada + 3 puntos + CTA final.</div>
          </div>
        </div>
        <div className="pbar">
          <div className="pfill" style={{ width: `${progress}%` }}></div>
        </div>
        <button className="gbtn" onClick={generate} disabled={loading}>
          {loading ? 'ADAPTANDO...' : '📐 ADAPTAR A 4 FORMATOS'}
        </button>
      </div>

      <div>
        {loading && !formats && (
          <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--gold)' }}>📐 Adaptando a 4 formatos...</div>
        )}
        {formats && (
          <div className="fmt-cards">
            {[
              { key: 'reel15', ico: '📱', lbl: 'REEL 15S', color: 'var(--cyan)', nota: 'Solo hook + CTA' },
              { key: 'short60', ico: '⏱', lbl: 'SHORT 60S', color: 'var(--gold)', nota: 'Hook + 3 puntos + CTA' },
              { key: 'postFB', ico: '📘', lbl: 'POST FACEBOOK', color: '#2563EB', nota: 'Nativo FB, sin links' },
              { key: 'carrusel', ico: '🎴', lbl: 'CARRUSEL', color: 'var(--purple)', nota: '5 slides listos' }
            ].map(f => {
              const item = formats[f.key] || {};
              const contentToCopy = item.texto || item.slides?.join('\\n') || '';
              return (
                <div key={f.key} className="fmt-card">
                  <div className="fmt-badge" style={{ color: f.color }}>{f.ico} {f.lbl}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted2)', marginBottom: '8px' }}>{f.nota}</div>
                  {item.titulo && <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '7px' }}>{item.titulo}</div>}
                  {f.key === 'carrusel' && item.slides ? (
                    item.slides.map((s: string, i: number) => (
                      <div key={i} style={{ background: 'var(--bg2)', borderRadius: '5px', padding: '6px 8px', marginBottom: '4px', fontSize: '11px' }}>
                        <span style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono', marginRight: '6px' }}>{i + 1}</span>{s}
                      </div>
                    ))
                  ) : (
                    <div className="fmt-txt">{item.texto || item.titulo}</div>
                  )}
                  <div className="fmt-actions">
                    <button className="abtn" onClick={() => navigator.clipboard.writeText(contentToCopy).then(() => showToast('Copiado'))}>📤 Copiar</button>
                    <button className="abtn" onClick={() => handleQueue(f.key, item.titulo || f.lbl)}>💾 Cola</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
