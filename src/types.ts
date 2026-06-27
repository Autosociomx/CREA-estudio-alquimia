export interface Channel {
  id: string;
  name: string;
  color: string;
  emoji: string;
  persona: string;
  tags: string[];
}

export const CHS: Channel[] = [
  {
    id: 'tepic', name: 'Tepic Digital', color: 'var(--ch1)', emoji: '🏛',
    persona: 'Representas la modernización digital del municipio de Tepic, Nayarit. Voz institucional pero accesible, directa y cercana. Hablas de gobernanza digital, LNETB, eficiencia municipal, y ConnectX como el socio tecnológico que ya está operando.',
    tags: ['#TepicDigital', '#NayaritDigital', '#GobiernoDigital', '#ConnectX', '#TransformacionDigital']
  },
  {
    id: 'routepro', name: 'RoutePro', color: 'var(--ch2)', emoji: '🚛',
    persona: 'Representas RoutePro, el sistema de rutas para PYMEs mexicanas. Voz directa, práctica, orientada a resultados reales. Hablas como alguien que ya ha trabajado con panaderías, tortillerías y distribuidoras de Nayarit.',
    tags: ['#RoutePro', '#PYMEsMexicanas', '#DistribucionInteligente', '#ConnectX', '#NegociosNayarit']
  },
  {
    id: 'miguel', name: 'Miguel Fundador', color: 'var(--ch3)', emoji: '👤',
    persona: 'Eres Miguel, fundador de ConnectX en Tepic. De cero programación a múltiples productos desplegados en 6 meses usando IA. Voz auténtica, honesta, sin poses. Tecnología para el México real.',
    tags: ['#FundadorTech', '#IAenMéxico', '#ConnectX', '#NayaritTech', '#Emprendimiento']
  }
];

export const FI: Record<string, any> = {
  RoutePro: { desc: 'Control de rutas de distribución para PYMEs. El repartidor captura ventas, el dueño ve todo.', dolor: 'Cuadernos perdidos, dinero sin cuadrar, repartidores sin control.', ben: 'Rutas digitales · Cobro en campo · Reportes automáticos', precio: 'Instalación $8,000 + $500/mes' },
  MostradorPro: { desc: 'POS para negocios con mostrador. Ventas, inventario y corte de caja.', dolor: 'Cobros lentos, inventario perdido, no sabes tu utilidad.', ben: 'POS rápido · Inventario · Corte automático', precio: 'Instalación $8,000 + $500/mes' },
  MesaPro: { desc: 'POS para restaurantes con comandas digitales y pantalla de cocina.', dolor: 'Comandas perdidas, errores de cocina, mesas mal gestionadas.', ben: 'Comanda digital · KDS · Reportes de ventas', precio: 'Instalación $8,000 + $500/mes' },
  MercadoVivo: { desc: 'App para vendedores de tianguis. Convierte carga a precio por pieza.', dolor: 'Perder dinero por no calcular el precio pieza desde el bulto.', ben: 'Conversión carga→pieza · Sin internet · Simple', precio: 'Instalación $5,000 + $300/mes' },
  ConnectX: { desc: 'Ecosistema completo para PYMEs y gobiernos. Hecho en Nayarit.', dolor: 'Tu competencia ya se digitalizó y tú sigues con papel.', ben: 'Suite completa · Soporte local · Instalación en días', precio: 'Desde $5,000 + mantenimiento' }
};

export interface VozMarca {
  q1: string;
  q2: string;
  q3: string;
}

export interface QueueItem {
  type: string;
  chId: string;
  chName: string;
  color: string;
  title: string;
  plat: string;
  status: string;
  date: string;
}
