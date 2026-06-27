import React, { createContext, useContext, useState } from 'react';
import { VozMarca, QueueItem } from './types';

interface AppState {
  curCh: number;
  setCurCh: (val: number) => void;
  voz: VozMarca;
  setVoz: (val: VozMarca) => void;
  queue: QueueItem[];
  setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>;
  stats: { total: number; tepic: number; rp: number; mig: number };
  setStats: React.Dispatch<React.SetStateAction<{ total: number; tepic: number; rp: number; mig: number }>>;
  lastContent: any;
  setLastContent: (val: any) => void;
  toastMsg: string;
  showToast: (msg: string) => void;
  generateContent: (prompt: string, maxTokens?: number, model?: string) => Promise<string>;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curCh, setCurCh] = useState(0);
  const [voz, setVoz] = useState<VozMarca>({ q1: '', q2: '', q3: '' });
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [stats, setStats] = useState({ total: 0, tepic: 0, rp: 0, mig: 0 });
  const [lastContent, setLastContent] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  const generateContent = async (prompt: string, maxTokens: number = 2000, model: string = 'gemini-1.5-flash-8b-exp'): Promise<string> => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, maxTokens, model })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.content;
  };

  return (
    <AppContext.Provider value={{ curCh, setCurCh, voz, setVoz, queue, setQueue, stats, setStats, lastContent, setLastContent, toastMsg, showToast, generateContent }}>
      {children}
      {toastMsg && <div className="toast show">{toastMsg}</div>}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
