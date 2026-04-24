import React, { useState } from 'react';
import { EQUIPOS } from '../data/mockData';

const ESTADO_COLOR = { 'En reparación': '#f59e0b', 'Activo': '#10b981', 'En diagnóstico': '#3b82f6' };

export default function Equipos() {
  const [busqueda, setBusqueda] = useState('');
  const [selected, setSelected] = useState(null);

  const visibles = EQUIPOS.filter(e =>
    e.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={styles.root}>
      <div style={styles.controls}>
        <input style={styles.search} placeholder="🔍 Buscar equipos..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        <span style={styles.count}>{visibles.length} equipos registrados</span>
      </div>
      <div style={styles.grid}>
        {visibles.map(eq => (
          <div
            key={eq.id}
            style={{ ...styles.card, ...(selected?.id === eq.id ? styles.cardActive : {}) }}
            onClick={() => setSelected(selected?.id === eq.id ? null : eq)}
          >
            <div style={styles.cardIcon}>{eq.tipo === 'Laptop' ? '💻' : eq.tipo === 'Servidor' ? '🖥️' : eq.tipo === 'Impresora' ? '🖨️' : '🖥️'}</div>
            <div style={styles.cardBody}>
              <div style={styles.cardId}>{eq.id}</div>
              <div style={styles.cardName}>{eq.marca} {eq.modelo}</div>
              <div style={styles.cardType}>{eq.tipo}</div>
              <div style={styles.cardClient}>👤 {eq.cliente}</div>
              <div style={{ ...styles.estadoBadge, background: (ESTADO_COLOR[eq.estado] || '#888') + '22', color: ESTADO_COLOR[eq.estado] || '#888' }}>
                ● {eq.estado}
              </div>
            </div>
            {selected?.id === eq.id && (
              <div style={styles.cardDetail}>
                <div style={styles.detailRow}><span>Serie</span><span style={styles.detailVal}>{eq.serie}</span></div>
                <div style={styles.detailRow}><span>Último servicio</span><span style={styles.detailVal}>{eq.ultimoServicio}</span></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  search: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '0.5rem 1rem', color: '#fff',
    fontFamily: "'Syne', sans-serif", fontSize: 13, outline: 'none', width: 260,
  },
  count: { fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' },
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.25rem', cursor: 'pointer', transition: 'all 0.15s',
  },
  cardActive: { border: '1px solid rgba(0,212,255,0.4)', background: 'rgba(0,212,255,0.04)' },
  cardIcon: { fontSize: 32, marginBottom: '0.75rem' },
  cardBody: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  cardId: { fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" },
  cardName: { fontSize: 15, fontWeight: 800, color: '#fff' },
  cardType: { fontSize: 11, color: '#00d4ff', fontWeight: 700 },
  cardClient: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  estadoBadge: { fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 5, width: 'fit-content', marginTop: 4 },
  cardDetail: {
    marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)',
    display: 'flex', flexDirection: 'column', gap: '0.4rem',
  },
  detailRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  detailVal: { color: '#fff', fontWeight: 700, fontFamily: "'Space Mono', monospace", fontSize: 11 },
};
