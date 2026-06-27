import React, { useState } from 'react';
import { useApp } from '../context';

export default function QueuePanel() {
  const { queue, stats } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredQueue = filter === 'all' ? queue : queue.filter(q => q.chId === filter);

  return (
    <div className="panel on">
      <div className="stats-row">
        <div className="sc"><div className="sv">{stats.total}</div><div className="sl2">Total generado</div></div>
        <div className="sc"><div className="sv" style={{ color: 'var(--ch1)' }}>{stats.tepic}</div><div className="sl2">Tepic Digital</div></div>
        <div className="sc"><div className="sv" style={{ color: 'var(--ch2)' }}>{stats.rp}</div><div className="sl2">RoutePro</div></div>
        <div className="sc"><div className="sv" style={{ color: 'var(--ch3)' }}>{stats.mig}</div><div className="sl2">Miguel</div></div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: '22px', color: 'var(--gold)' }}>COLA DE CONTENIDO</div>
        <div className="pills">
          <button className={`pill ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>Todos</button>
          <button className={`pill ${filter === 'tepic' ? 'on' : ''}`} onClick={() => setFilter('tepic')}>Tepic</button>
          <button className={`pill ${filter === 'routepro' ? 'on' : ''}`} onClick={() => setFilter('routepro')}>RoutePro</button>
          <button className={`pill ${filter === 'miguel' ? 'on' : ''}`} onClick={() => setFilter('miguel')}>Miguel</button>
        </div>
      </div>

      <div>
        {!filteredQueue.length ? (
          <div className="empty" style={{ padding: '40px 0' }}>
            <div className="empty-ico">📋</div>
            <div>Genera y guarda contenido aquí</div>
          </div>
        ) : (
          filteredQueue.map((q, i) => (
            <div key={i} className="qi">
              <div className="qbar" style={{ background: q.color }}></div>
              <div style={{ flex: 1 }}>
                <div className="qt">{q.title}</div>
                <div className="qm">{q.chName} · {q.plat} · {q.date}</div>
              </div>
              <span className={`qs ${q.status === 'ready' ? 'sr' : 'sp'}`}>
                {q.status === 'ready' ? 'LISTO' : 'PEND'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
