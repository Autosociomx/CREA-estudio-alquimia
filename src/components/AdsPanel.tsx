import React, { useState } from 'react';
import { callAI } from '../lib/api';
import { useApp } from '../context';
import { FI } from '../types';

export default function AdsPanel() {
  const { voz, showToast, queue, setQueue, setStats } = useApp();
  const [curProd, setCurProd] = useState('RoutePro');
  const [tone, setTone] = useState('pas');
  const [humanLvl, setHumanLvl] = useState(35);
  const [ctxText, setCtxText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ads, setAds] = useState<any[]>([]);
  const [selAdIdx, setSelAdIdx] = useState(0);

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
    
    const f = FI[curProd];
    const toneDesc: any = {
      pas: 'PAS — abre con el dolor real, agita la consecuencia, presenta la solución.',
      aida: 'AIDA — captura atención, genera interés, crea deseo, llama a la acción.',
      story: 'StoryBrand — el cliente es el héroe, ConnectX es el guía que lo lleva al éxito.',
      '4u': '4U — Urgente + Único + Útil + Ultra-específico. Sin relleno.'
    };

    const prompt = `Eres experto en publicidad digital con PNL y neuromarketing para PYMEs mexicanas.
PRODUCTO: ${curProd}
${Object.entries(f).map(([k, v]) => `${k}: ${v}`).join('\n')}
FRAMEWORK: ${toneDesc[tone] || tone}
${ctxText ? 'CONTEXTO: ' + ctxText : ''}
ESTILO: ${humanPrompt(humanLvl)}
${getVozPrompt()}

Genera 4 variantes de anuncio para Facebook/Instagram. SOLO JSON sin markdown:
{"ads":[
  {"framework":"PAS","hook":"","cuerpo":"","cta":""},
  {"framework":"AIDA","hook":"","cuerpo":"","cta":""},
  {"framework":"StoryBrand","hook":"","cuerpo":"","cta":""},
  {"framework":"4U","hook":"","cuerpo":"","cta":""}
]}
- hook: máximo 12 palabras, impacto inmediato
- cuerpo: 3-4 oraciones, lenguaje mexicano natural, precio ${f.precio}
- cta: acción específica, máximo 8 palabras`;

    try {
      let raw = await callAI(prompt, 1000);
      raw = raw.replace(/\`\`\`json|\`\`\`/g, '').trim();
      const parsed = JSON.parse(raw);
      clearInterval(iv);
      setProgress(100);
      setAds(parsed.ads || []);
      setSelAdIdx(0);
      setStats(s => ({ ...s, total: s.total + 4 }));
    } catch (e: any) {
      clearInterval(iv);
      showToast('Error: ' + e.message);
    } finally {
      setTimeout(() => { setProgress(0); setLoading(false); }, 500);
    }
  };

  const selAd = ads[selAdIdx];
  const bgs = ['#0D1B2A', '#1A0800', '#071A0D', '#130D1A'];

  const handleQueue = () => {
    if (!selAd) return;
    setQueue([...queue, {
      type: 'ad',
      chId: 'routepro', // Defaulting since ads are product-focused
      chName: 'RoutePro',
      color: 'var(--ch2)',
      title: selAd.hook.slice(0, 80),
      plat: 'Facebook/Instagram',
      status: 'ready',
      date: new Date().toLocaleDateString('es-MX')
    }]);
    showToast('💾 Guardado en cola');
  };

  return (
    <div className="panel on">
      <div className="two">
        <div className="card">
          <div className="card-t">🏪 Producto ConnectX</div>
          <div className="pills" style={{ marginBottom: '10px' }}>
            {Object.keys(FI).map(p => (
              <button key={p} className={`pill ${curProd === p ? 'on' : ''}`} onClick={() => setCurProd(p)}>
                {p === 'RoutePro' ? '🚛' : p === 'MostradorPro' ? '🏪' : p === 'MesaPro' ? '🍽' : p === 'MercadoVivo' ? '🛒' : '⚡'} {p}
              </button>
            ))}
          </div>
          <div className="ficha">
            <strong>📦 {curProd}</strong><br />
            {FI[curProd].desc}<br /><br />
            <strong>😟 Dolor:</strong> {FI[curProd].dolor}<br />
            <strong>✅ Ben:</strong> {FI[curProd].ben}<br />
            <strong>💰</strong> {FI[curProd].precio}
          </div>
          <div className="fr">
            <label>Tono PNL</label>
            <select value={tone} onChange={e => setTone(e.target.value)}>
              <option value="pas">🔴 PAS — Dolor → Agitación → Solución</option>
              <option value="aida">✨ AIDA — Atención → Interés → Deseo → Acción</option>
              <option value="story">📖 StoryBrand — Cliente como héroe</option>
              <option value="4u">⚡ 4U — Urgente, Único, Útil, Ultra-específico</option>
            </select>
          </div>
          <div className="fr">
            <label>🧠 Modo Humano <span style={{ color: 'var(--gold)', fontSize: '10px' }}>{humanLabels[Math.floor(humanLvl / 25)] || '— Equilibrado'}</span></label>
            <input type="range" min="0" max="100" value={humanLvl} onChange={e => setHumanLvl(Number(e.target.value))} />
          </div>
          <div className="fr">
            <label>Contexto local</label>
            <input value={ctxText} onChange={e => setCtxText(e.target.value)} placeholder="Ej: negocio en Tepic, 5 repartidores..." />
          </div>
        </div>
        <div className="card">
          <div className="card-t">🎬 Vista previa</div>
          <div className="kprev" style={{ background: ads.length ? bgs[selAdIdx % 4] : '#000' }}>
            <div className="kprev-in">
              <div className="kh">{selAd ? selAd.hook : 'Genera un anuncio para ver la preview'}</div>
              <div className="kb">{selAd ? selAd.cuerpo : ''}</div>
              <div className="kc">{selAd ? selAd.cta : ''}</div>
            </div>
            <div className="kbadge">{curProd}</div>
          </div>
          <button className="rec">
            <div className="rdot"></div><span>● GRABAR PANTALLA</span>
          </button>
          <div className="share-row">
            <button className="shr" onClick={() => selAd && navigator.clipboard.writeText(`${selAd.hook}\\n\\n${selAd.cuerpo}\\n\\n${selAd.cta}`).then(() => showToast('Copiado'))}>📤 Copiar Anuncio</button>
            <button className="shr" onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://connectx.mx', '_blank')}>📘 Facebook</button>
            <button className="shr" onClick={handleQueue}>💾 Guardar</button>
          </div>
        </div>
      </div>

      <div className="pbar">
        <div className="pfill" style={{ width: `${progress}%` }}></div>
      </div>
      <button className="gbtn" onClick={generate} disabled={loading}>
        {loading ? 'GENERANDO...' : '📢 GENERAR 4 ANUNCIOS CON IA'}
      </button>

      <div>
        {!ads.length && !loading && (
          <div className="out-box"><div className="out-body"><div className="empty"><div className="empty-ico">📢</div><div>Selecciona producto y genera</div></div></div></div>
        )}
        {loading && !ads.length && (
          <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--gold)' }}>📢 Generando 4 variantes...</div>
        )}
        {ads.length > 0 && (
          <div className="ad-cards">
            {ads.map((ad, i) => (
              <div key={i} className={`ad-card ${selAdIdx === i ? 'sel' : ''}`} onClick={() => setSelAdIdx(i)}>
                <div className="ad-fw">{ad.framework}</div>
                <div className="ad-hook">{ad.hook}</div>
                <div className="ad-body">{ad.cuerpo}</div>
                <div className="ad-cta">→ {ad.cta}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
