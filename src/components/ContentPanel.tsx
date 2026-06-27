import React, { useState } from 'react';
import { useApp } from '../context';
import { CHS } from '../types';

export default function ContentPanel({ goHooks, goFormats }: { goHooks: () => void, goFormats: () => void }) {
  const { curCh, setCurCh, voz, setStats, setLastContent, showToast, queue, setQueue, generateContent } = useApp();
  const [plat, setPlat] = useState('YouTube — Video largo');
  const [fmt, setFmt] = useState('Educativo');
  const [tema, setTema] = useState('');
  const [cta, setCta] = useState('');
  const [humanLvl, setHumanLvl] = useState(40);
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<{ raw: string, html: JSX.Element[] } | null>(null);

  const getVozPrompt = () => voz.q1 ? `\n\nVOZ DE MARCA:\n- Quién soy: ${voz.q1}\n- A quién le hablo: ${voz.q2}\n- Prohibido: ${voz.q3}` : '';
  const humanPrompt = (v: number) => {
    if (v < 25) return 'Escribe de forma muy conversacional, como si lo dijera una persona real grabando con el celular. Imperfecto, directo, sin adornos. Cero palabras corporativas.';
    if (v < 50) return 'Escribe de forma natural y cercana, con personalidad real. Algo informal pero claro. Como un emprendedor que sabe de lo que habla pero no trata de impresionar.';
    if (v < 75) return 'Escribe de forma clara y profesional, con un toque humano. Balance entre credibilidad y cercanía.';
    return 'Escribe de forma pulida y profesional. Claro, estructurado, inspirador. Lenguaje cuidado pero sin sonar robótico.';
  };

  const humanLabels = ['— Muy crudo/real', '— Crudo y auténtico', '— Equilibrado', '— Profesional', '— Muy pulido'];

  const generate = async () => {
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 5, 85)), 200);
    
    const ch = CHS[curCh];
    const prompt = `Eres AURA, agente de contenido de ConnectX / Alquimia CX.
CANAL: ${ch.name}
PERSONALIDAD: ${ch.persona}
PLATAFORMA: ${plat}
TIPO: ${fmt}
${tema ? 'TEMA: ' + tema : 'ELIGE el tema más relevante y viral para este canal hoy.'}
${cta ? 'CTA: ' + cta : 'CTA: connectx.mx'}
ESTILO DE ESCRITURA: ${humanPrompt(humanLvl)}
${getVozPrompt()}

Genera la pieza COMPLETA en español mexicano:

🎯 TÍTULO VIRAL
[máximo 68 caracteres]

🪝 HOOK DE APERTURA
[2 oraciones que paran el scroll en ${plat}]

📜 GUIÓN COMPLETO
[${plat.includes('Short') || plat.includes('Reel') || plat.includes('TikTok') ? '80-120 palabras para video corto' : 'mínimo 350 palabras con indicaciones entre corchetes [PAUSA][MOSTRAR PANTALLA]'}]

📝 DESCRIPCIÓN SEO
[máximo 180 palabras para ${plat}]

🖼 PROMPT MINIATURA EN INGLÉS
[descripción detallada para IA de imagen]

📌 TEXTO THUMBNAIL
[máximo 6 palabras, impacto visual]

#️⃣ HASHTAGS
${ch.tags.join(' ')} [agrega 2 más relevantes]

📅 PUBLICAR
[día y hora óptima México]`;

    try {
      const txt = await generateContent(prompt, 1900);
      clearInterval(iv);
      setProgress(100);
      
      const SECS = [
        { e: '🎯', l: 'TÍTULO VIRAL', m: false }, { e: '🪝', l: 'HOOK DE APERTURA', m: false },
        { e: '📜', l: 'GUIÓN COMPLETO', m: false }, { e: '📝', l: 'DESCRIPCIÓN SEO', m: false },
        { e: '🖼', l: 'PROMPT MINIATURA', m: true }, { e: '📌', l: 'TEXTO THUMBNAIL', m: false },
        { e: '#️⃣', l: 'HASHTAGS', m: true }, { e: '📅', l: 'PUBLICAR', m: false }
      ];

      const parts = txt.split(/(?=🎯|🪝|📜|📝|🖼|📌|#️⃣|📅)/g);
      const htmlNodes: JSX.Element[] = [];
      
      parts.forEach((p: string, idx: number) => {
        if (!p.trim()) return;
        const s = SECS.find(x => p.startsWith(x.e));
        if (s) {
          const c = p.replace(s.e, '').replace(s.l, '').trim();
          htmlNodes.push(
            <div key={idx} className="sblock">
              <div className="slbl">{s.e} {s.l}</div>
              <div className={`stxt ${s.m ? 'mono' : ''}`}>{c}</div>
            </div>
          );
        } else {
          htmlNodes.push(<div key={idx} className="stxt">{p}</div>);
        }
      });
      
      setOutput({ raw: txt, html: htmlNodes });
      setLastContent({ text: txt, ch, plat });
      setStats(s => ({ ...s, total: s.total + 1, tepic: curCh === 0 ? s.tepic + 1 : s.tepic, rp: curCh === 1 ? s.rp + 1 : s.rp, mig: curCh === 2 ? s.mig + 1 : s.mig }));
      
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  const handleQueue = () => {
    if (!output) return;
    const lines = output.raw.split('\n');
    const tl = lines.find(l => l.includes('🎯')) || lines[0];
    const title = tl.replace(/🎯|TÍTULO VIRAL/g, '').trim() || 'Contenido';
    setQueue([...queue, {
      type: 'content',
      chId: CHS[curCh].id,
      chName: CHS[curCh].name,
      color: CHS[curCh].color,
      title: title.slice(0, 80),
      plat,
      status: 'ready',
      date: new Date().toLocaleDateString('es-MX')
    }]);
    showToast('💾 Guardado en cola');
  };

  return (
    <div className="panel on">
      <div className="two">
        <div className="card">
          <div className="card-t">⚙ Configuración</div>
          <div className="fr">
            <label>Canal</label>
            <select value={curCh} onChange={(e) => setCurCh(Number(e.target.value))}>
              <option value={0}>🏛 Tepic Digital</option>
              <option value={1}>🚛 RoutePro</option>
              <option value={2}>👤 Miguel Fundador</option>
            </select>
          </div>
          <div className="fr">
            <label>Plataforma</label>
            <select value={plat} onChange={(e) => setPlat(e.target.value)}>
              <option>YouTube — Video largo</option>
              <option>YouTube Short (60s)</option>
              <option>Facebook — Video</option>
              <option>Facebook — Post/Carrusel</option>
              <option>Instagram Reel</option>
              <option>TikTok</option>
            </select>
          </div>
          <div className="fr">
            <label>Tipo</label>
            <div className="chips">
              {['Educativo', 'Caso de éxito', 'Noticia local', 'Tutorial', 'Opinión', 'Tendencia IA'].map(t => (
                <button key={t} className={`chip ${fmt === t ? 'on' : ''}`} onClick={() => setFmt(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-t">💡 Tema y tono</div>
          <div className="fr">
            <label>Tema (vacío = AURA elige)</label>
            <textarea value={tema} onChange={e => setTema(e.target.value)} placeholder="Ej: Por qué los negocios de Tepic todavía usan cuadernos..."></textarea>
          </div>
          <div className="fr">
            <label>CTA específico</label>
            <input value={cta} onChange={e => setCta(e.target.value)} placeholder="Ej: Agenda demo en connectx.mx/ruta" />
          </div>
          <div className="fr">
            <label>🧠 Modo Humano <span style={{ color: 'var(--gold)', fontSize: '10px' }}>{humanLabels[Math.floor(humanLvl / 25)] || '— Equilibrado'}</span></label>
            <div className="human-slider-wrap">
              <div className="human-labels">
                <span className="hl-lbl">🎙 Crudo / Real</span>
                <span className="hl-lbl">✨ Pulido / Profesional</span>
              </div>
              <input type="range" min="0" max="100" value={humanLvl} onChange={e => setHumanLvl(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <div className="pbar">
        <div className="pfill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <button className="gbtn" onClick={generate} disabled={loading}>
        {loading ? 'GENERANDO...' : '⚗ GENERAR CONTENIDO AURA'}
      </button>

      <div className="out-box">
        <div className="out-hdr">
          <div className="out-title">📄 Pieza generada</div>
          <div className="out-acts">
            <button className="abtn" onClick={() => output && navigator.clipboard.writeText(output.raw).then(() => showToast('Copiado'))}>📤 Copiar</button>
            <button className="abtn" onClick={handleQueue}>💾 Cola</button>
            <button className="abtn" onClick={goHooks}>🪝 Hooks</button>
            <button className="abtn" onClick={goFormats}>📐 Formatos</button>
            <button className="abtn" onClick={generate}>🔄 Regenerar</button>
          </div>
        </div>
        <div className="out-body">
          {!output && !loading && (
            <div className="empty">
              <div className="empty-ico">⚗</div>
              <div>Configura y genera</div>
            </div>
          )}
          {loading && !output && (
             <div className="empty">
              <div style={{ fontSize: '26px' }}>⚗</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--gold)' }}>AURA destilando...</div>
             </div>
          )}
          {output && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border2)' }}>
                <div style={{ width: '3px', height: '18px', background: CHS[curCh].color, borderRadius: '2px' }}></div>
                <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', color: 'var(--muted2)' }}>{CHS[curCh].emoji} {CHS[curCh].name} · {new Date().toLocaleDateString('es-MX')}</div>
              </div>
              {output.html}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
