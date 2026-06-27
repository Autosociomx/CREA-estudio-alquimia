import React, { useState } from 'react';
import { callAI } from '../lib/api';
import { useApp } from '../context';
import { CHS } from '../types';

export default function HooksPanel({ goContent }: { goContent: () => void }) {
  const { curCh, voz, showToast, lastContent } = useApp();
  
  const [tema, setTema] = useState(lastContent ? (lastContent.text.split('\n').find((l: string) => l.includes('🎯')) || '').replace('🎯', '').replace('TÍTULO VIRAL', '').trim() : '');
  const [plat, setPlat] = useState('Facebook / Instagram Reel');
  const [emo, setEmo] = useState('Curiosidad');
  const [humanLvl, setHumanLvl] = useState(30);
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hooks, setHooks] = useState<any[]>([]);
  const [selHook, setSelHook] = useState<any>(null);

  const humanLabels = ['— Muy crudo/real', '— Crudo y auténtico', '— Equilibrado', '— Profesional', '— Muy pulido'];

  const getVozPrompt = () => voz.q1 ? `\n\nVOZ DE MARCA:\n- Quién soy: ${voz.q1}\n- A quién le hablo: ${voz.q2}\n- Prohibido: ${voz.q3}` : '';
  const humanPrompt = (v: number) => {
    if (v < 25) return 'Escribe de forma muy conversacional, como si lo dijera una persona real grabando con el celular. Imperfecto, directo, sin adornos. Cero palabras corporativas.';
    if (v < 50) return 'Escribe de forma natural y cercana, con personalidad real. Algo informal pero claro. Como un emprendedor que sabe de lo que habla pero no trata de impresionar.';
    if (v < 75) return 'Escribe de forma clara y profesional, con un toque humano. Balance entre credibilidad y cercanía.';
    return 'Escribe de forma pulida y profesional. Claro, estructurado, inspirador. Lenguaje cuidado pero sin sonar robótico.';
  };

  const generate = async () => {
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 5, 85)), 200);
    
    const prompt = `Eres un experto en hooks virales para redes sociales en México.
TEMA: ${tema || CHS[curCh].name}
PLATAFORMA: ${plat}
EMOCIÓN OBJETIVO: ${emo}
ESTILO: ${humanPrompt(humanLvl)}
${getVozPrompt()}

Genera exactamente 5 hooks para los primeros 2-3 segundos de un video/post. Para cada uno:
- Score de potencial viral (0-100)
- Tipo de hook (curiosidad/urgencia/dolor/dato/pregunta/historia)
- El texto exacto del hook (máximo 15 palabras, listo para decir o escribir)
- Por qué funciona (1 oración)

Responde SOLO JSON válido sin markdown:
{"hooks":[
  {"score":0,"tipo":"","texto":"","razon":""},
  {"score":0,"tipo":"","texto":"","razon":""},
  {"score":0,"tipo":"","texto":"","razon":""},
  {"score":0,"tipo":"","texto":"","razon":""},
  {"score":0,"tipo":"","texto":"","razon":""}
]}

Ordénalos de mayor a menor score. Lenguaje mexicano natural.`;

    try {
      let raw = await callAI(prompt, 1000);
      raw = raw.replace(/\`\`\`json|\`\`\`/g, '').trim();
      const parsed = JSON.parse(raw);
      clearInterval(iv);
      setProgress(100);
      setHooks(parsed.hooks || []);
      setSelHook(null);
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  const useHook = () => {
    if (!selHook) return;
    showToast('🪝 Hook copiado al portapapeles');
    navigator.clipboard.writeText(selHook.texto);
    // User can go to content panel and paste
    goContent();
  };

  return (
    <div className="panel on">
      <div className="two" style={{ marginBottom: '14px' }}>
        <div className="card">
          <div className="card-t">🪝 Analizar hooks para...</div>
          <div className="fr">
            <label>Producto o tema</label>
            <input value={tema} onChange={e => setTema(e.target.value)} placeholder="Ej: RoutePro para panaderías de Tepic" />
          </div>
          <div className="fr">
            <label>Plataforma destino</label>
            <select value={plat} onChange={e => setPlat(e.target.value)}>
              <option>Facebook / Instagram Reel</option>
              <option>YouTube Short</option>
              <option>YouTube Video largo</option>
              <option>TikTok</option>
            </select>
          </div>
          <div className="fr">
            <label>Emoción objetivo</label>
            <div className="chips">
              {['Curiosidad', 'Urgencia', 'Dolor real', 'Inspiración', 'Dato impactante', 'Pregunta directa'].map(t => (
                <button key={t} className={`chip ${emo === t ? 'on' : ''}`} onClick={() => setEmo(t)}>
                  {t === 'Curiosidad' ? '🤔' : t === 'Urgencia' ? '⚡' : t === 'Dolor real' ? '😫' : t === 'Inspiración' ? '🌟' : t === 'Dato impactante' ? '📊' : '❓'} {t}
                </button>
              ))}
            </div>
          </div>
          <div className="fr">
            <label>🧠 Modo Humano <span style={{ color: 'var(--gold)', fontSize: '10px' }}>{humanLabels[Math.floor(humanLvl / 25)] || '— Equilibrado'}</span></label>
            <input type="range" min="0" max="100" value={humanLvl} onChange={e => setHumanLvl(Number(e.target.value))} />
          </div>
        </div>
        <div className="card">
          <div className="card-t">💡 Por qué el hook es el 80%</div>
          <div style={{ fontSize: '12px', color: 'var(--muted2)', lineHeight: 1.75 }}>
            <div style={{ marginBottom: '10px' }}>📱 <strong style={{ color: 'var(--text)' }}>1.7 segundos</strong> — la atención promedio en móvil antes de seguir scrolleando.</div>
            <div style={{ marginBottom: '10px' }}>🎬 <strong style={{ color: 'var(--text)' }}>3 segundos</strong> — lo que Facebook/YouTube mide para decidir si distribuyen tu video.</div>
            <div style={{ marginBottom: '10px' }}>📈 <strong style={{ color: 'var(--text)' }}>135% más alcance</strong> obtienen los Reels vs fotos cuando el hook detiene el scroll.</div>
            <div>🤖 AURA genera 5 variantes con <strong style={{ color: 'var(--gold)' }}>score de potencial viral</strong> para que elijas el mejor antes de grabar.</div>
          </div>
        </div>
      </div>

      <div className="pbar">
        <div className="pfill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <button className="gbtn" onClick={generate} disabled={loading}>
        {loading ? 'ANALIZANDO...' : '🪝 GENERAR 5 HOOKS CON SCORE VIRAL'}
      </button>

      <div>
        <div className="out-box">
          <div className="out-body">
            {!hooks.length && !loading && (
              <div className="empty">
                <div className="empty-ico">🪝</div>
                <div>Ingresa el tema y genera tus 5 hooks</div>
              </div>
            )}
            {loading && !hooks.length && (
              <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--gold)' }}>
                🪝 Generando 5 hooks con score viral...
              </div>
            )}
            {hooks.length > 0 && (
              <>
                <div style={{ marginBottom: '10px', fontSize: '11px', color: 'var(--muted2)' }}>Toca un hook para usarlo como base de tu contenido ↓</div>
                <div className="hook-grid">
                  {hooks.map((h, i) => {
                    const col = i < 2 ? '#22C55E' : i < 3 ? '#EAB308' : 'var(--muted2)';
                    return (
                      <div key={i} className={`hook-card ${selHook === h ? 'sel' : ''}`} onClick={() => setSelHook(h)}>
                        <div className="hook-score-wrap">
                          <div className="hook-score" style={{ color: col }}>{h.score}</div>
                          <div className="hook-score-lbl">viral</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="hook-txt">"{h.texto}"</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                            <span className="hook-type" style={{ color: col, borderColor: col, background: `${col}18` }}>{h.tipo}</span>
                            <span style={{ fontSize: '10px', color: 'var(--muted2)' }}>{h.razon}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selHook && (
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button className="gbtn sm" onClick={useHook}>⚗ COPIAR ESTE HOOK E IR A CONTENIDO</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
