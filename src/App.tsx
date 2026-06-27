import React, { useEffect, useRef, useState } from 'react';
import { AppProvider, useApp } from './context';
import { CHS } from './types';

// Panels
import DailyPanel from './components/DailyPanel';
import ContentPanel from './components/ContentPanel';
import HooksPanel from './components/HooksPanel';
import FormatsPanel from './components/FormatsPanel';
import AdsPanel from './components/AdsPanel';
import CalendarPanel from './components/CalendarPanel';
import QueuePanel from './components/QueuePanel';
import BrandVoicePanel from './components/BrandVoicePanel';

const MainLayout = () => {
  const { curCh, setCurCh, queue, voz } = useApp();
  const [activeTab, setActiveTab] = useState('daily');
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const iv = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const cvsRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const cv = cvsRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    
    let pts: any[] = [];
    const rcv = () => { cv.width = innerWidth; cv.height = innerHeight; };
    rcv();
    window.addEventListener('resize', rcv);
    
    for (let i = 0; i < 50; i++) {
      pts.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - .5) * .25,
        vy: (Math.random() - .5) * .25,
        h: Math.random() > .5 ? 45 : 190
      });
    }

    let animId: number;
    const ap = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
        if (p.y < 0) p.y = cv.height;
        if (p.y > cv.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},75%,60%,.6)`;
        ctx.fill();
      });
      animId = requestAnimationFrame(ap);
    };
    ap();
    
    return () => {
      window.removeEventListener('resize', rcv);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas id="cvs" ref={cvsRef}></canvas>
      <div className="z1">
        {/* HEADER */}
        <div className="hdr">
          <div className="hdr-logo">
            <div className="hdr-mark">⚗</div>
            <div>
              <div className="hdr-name">AURA FACTORY v3</div>
              <div className="hdr-ver">Contenido · Publicidad · ConnectX</div>
            </div>
          </div>
          <div className="hdr-right">
            <div className="pulse-badge"><div className="pulse-dot"></div>IA ACTIVA</div>
            <div id="clock">{time}</div>
          </div>
        </div>

        {/* NAV */}
        <nav className="nav-bar">
          <button className={`ntab ${activeTab === 'daily' ? 'on' : ''}`} onClick={() => setActiveTab('daily')}>☀️ Hoy</button>
          <button className={`ntab ${activeTab === 'content' ? 'on' : ''}`} onClick={() => setActiveTab('content')}>⚗ Contenido</button>
          <button className={`ntab ${activeTab === 'hooks' ? 'on' : ''}`} onClick={() => setActiveTab('hooks')}>🪝 Hooks</button>
          <button className={`ntab ${activeTab === 'formats' ? 'on' : ''}`} onClick={() => setActiveTab('formats')}>📐 Formatos</button>
          <button className={`ntab ${activeTab === 'ads' ? 'on' : ''}`} onClick={() => setActiveTab('ads')}>📢 Anuncios</button>
          <button className={`ntab ${activeTab === 'calendar' ? 'on' : ''}`} onClick={() => setActiveTab('calendar')}>📅 Calendario</button>
          <button className={`ntab ${activeTab === 'queue' ? 'on' : ''}`} onClick={() => setActiveTab('queue')}>📋 Cola <span className="nbadge">{queue.length}</span></button>
          <button className={`ntab ${activeTab === 'marca' ? 'on' : ''}`} onClick={() => setActiveTab('marca')}>🎙 Voz de Marca</button>
        </nav>

        {/* LAYOUT */}
        <div className="layout">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sg">
              <div className="sl">Canales</div>
              {CHS.map((ch, idx) => (
                <button key={ch.id} className={`sb ${curCh === idx ? 'on' : ''}`} onClick={() => setCurCh(idx)}>
                  <div className="chdot" style={{ background: ch.color }}></div>{ch.name}
                </button>
              ))}
            </div>
            <div className="sdiv"></div>
            <div className="sg">
              <div className="sl">Accesos rápidos</div>
              <button className="sb" onClick={() => setActiveTab('content')}><span className="sb-ico">🎬</span>Reel 60s</button>
              <button className="sb" onClick={() => setActiveTab('content')}><span className="sb-ico">📱</span>YouTube Short</button>
              <button className="sb" onClick={() => setActiveTab('content')}><span className="sb-ico">🎥</span>Video largo</button>
              <button className="sb" onClick={() => setActiveTab('content')}><span className="sb-ico">📄</span>Post Facebook</button>
            </div>
            <div className="sdiv"></div>
            <div className="sg">
              <div className="sl">Productos</div>
              <button className="sb" onClick={() => setActiveTab('ads')}><span className="sb-ico">🚛</span>RoutePro</button>
              <button className="sb" onClick={() => setActiveTab('ads')}><span className="sb-ico">🏪</span>MostradorPro</button>
              <button className="sb" onClick={() => setActiveTab('ads')}><span className="sb-ico">🍽</span>MesaPro</button>
              <button className="sb" onClick={() => setActiveTab('ads')}><span className="sb-ico">🛒</span>MercadoVivo</button>
            </div>
            <div className="sdiv"></div>
            <div className="sg">
              <div className="sl">Voz de marca</div>
              <div style={{ padding: '6px 14px', fontSize: '11px', color: 'var(--muted)' }}>
                {voz.q1 ? <div className="vm-tag">🎙 {voz.q1.split(' ').slice(0, 4).join(' ')}...</div> : 'Sin configurar'}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="content">
            {activeTab === 'daily' && <DailyPanel />}
            {activeTab === 'content' && <ContentPanel goHooks={() => setActiveTab('hooks')} goFormats={() => setActiveTab('formats')} />}
            {activeTab === 'hooks' && <HooksPanel goContent={() => setActiveTab('content')} />}
            {activeTab === 'formats' && <FormatsPanel />}
            {activeTab === 'ads' && <AdsPanel />}
            {activeTab === 'calendar' && <CalendarPanel />}
            {activeTab === 'queue' && <QueuePanel />}
            {activeTab === 'marca' && <BrandVoicePanel />}
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
