import React, { useState } from 'react';
import { TICKETS, STATS, TECNICOS } from '../data/mockData';

const BAR_DATA = [
  { mes: 'Ene', tickets: 18, completados: 15 },
  { mes: 'Feb', tickets: 24, completados: 20 },
  { mes: 'Mar', tickets: 19, completados: 17 },
  { mes: 'Abr', tickets: 31, completados: 8 },
  { mes: 'May', tickets: 0, completados: 0 },
  { mes: 'Jun', tickets: 0, completados: 0 },
];

const CATEGORY_DATA = [
  { cat: 'Hardware', count: 12, color: '#00d4ff' },
  { cat: 'Software', count: 9, color: '#3b82f6' },
  { cat: 'Redes', count: 6, color: '#8b5cf6' },
  { cat: 'Mantenimiento', count: 4, color: '#10b981' },
  { cat: 'Otro', count: 2, color: '#f59e0b' },
];

const total = CATEGORY_DATA.reduce((s, c) => s + c.count, 0);

export default function Reportes() {
  const [periodo, setPeriodo] = useState('mensual');
  const maxVal = Math.max(...BAR_DATA.map(d => d.tickets), 1);

  const kpis = [
    { label: 'Total Tickets (Mes)', value: STATS.ticketsAbiertos + STATS.ticketsEnProceso + STATS.ticketsCompletados, prev: 19, color: '#00d4ff' },
    { label: 'Resueltos', value: STATS.ticketsCompletados, prev: 17, color: '#10b981' },
    { label: 'Tiempo Promedio', value: STATS.tiempoPromedioResolucion, prev: '4.1h', color: '#f59e0b', text: true },
    { label: 'Satisfacción', value: STATS.satisfaccionCliente, prev: '91%', color: '#8b5cf6', text: true },
  ];

  return (
    <div style={styles.root}>
      {/* Period selector */}
      <div style={styles.topBar}>
        <span style={styles.pageTitle}>Análisis y Reportes</span>
        <div style={styles.periodRow}>
          {['semanal', 'mensual', 'anual'].map(p => (
            <button key={p} style={{ ...styles.periodBtn, ...(periodo === p ? styles.periodActive : {}) }} onClick={() => setPeriodo(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={styles.kpiGrid}>
        {kpis.map(k => (
          <div key={k.label} style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{k.label}</div>
            <div style={{ ...styles.kpiValue, color: k.color }}>{k.value}</div>
            <div style={styles.kpiPrev}>anterior: {k.prev}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={styles.chartsRow}>
        {/* Bar chart */}
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Tickets por Mes</div>
          <div style={styles.barChart}>
            {BAR_DATA.map((d, i) => (
              <div key={i} style={styles.barGroup}>
                <div style={styles.barPair}>
                  <div style={{ ...styles.bar, height: `${(d.tickets / maxVal) * 100}%`, background: '#3b82f6' }} title={`Tickets: ${d.tickets}`} />
                  <div style={{ ...styles.bar, height: `${(d.completados / maxVal) * 100}%`, background: '#10b981' }} title={`Completados: ${d.completados}`} />
                </div>
                <div style={styles.barLabel}>{d.mes}</div>
              </div>
            ))}
          </div>
          <div style={styles.legend}>
            <span style={styles.legendItem}><span style={{ ...styles.legendDot, background: '#3b82f6' }} />Tickets</span>
            <span style={styles.legendItem}><span style={{ ...styles.legendDot, background: '#10b981' }} />Completados</span>
          </div>
        </div>

        {/* Category donut */}
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Tickets por Categoría</div>
          <div style={styles.donutContainer}>
            <svg viewBox="0 0 120 120" style={styles.donutSvg}>
              {CATEGORY_DATA.reduce((acc, cat, i) => {
                const pct = cat.count / total;
                const angle = pct * 360;
                const startAngle = acc.current;
                const endAngle = startAngle + angle;
                const r = 45;
                const cx = 60; const cy = 60;
                const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180);
                const largeArc = angle > 180 ? 1 : 0;
                const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                acc.current = endAngle;
                acc.paths.push(<path key={i} d={path} fill={cat.color} opacity={0.85} />);
                return acc;
              }, { current: 0, paths: [] }).paths}
              <circle cx="60" cy="60" r="28" fill="#0d1629" />
              <text x="60" y="57" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{total}</text>
              <text x="60" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">tickets</text>
            </svg>
            <div style={styles.donutLegend}>
              {CATEGORY_DATA.map(c => (
                <div key={c.cat} style={styles.donutLegendItem}>
                  <span style={{ ...styles.legendDot, background: c.color }} />
                  <span style={styles.donutCat}>{c.cat}</span>
                  <span style={styles.donutCount}>{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technician performance table */}
      <div style={styles.tableCard}>
        <div style={styles.chartTitle}>Rendimiento por Técnico</div>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Técnico', 'Tickets', 'Completados', 'En Proceso', 'Tasa de Resolución', 'Rating'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TECNICOS.map(t => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.tdUser}>
                    <div style={styles.tdAvatar}>{t.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                    {t.nombre}
                  </div>
                </td>
                <td style={styles.tdNum}>{t.tickets}</td>
                <td style={{ ...styles.tdNum, color: '#10b981' }}>{t.completados}</td>
                <td style={{ ...styles.tdNum, color: '#3b82f6' }}>{t.enProceso}</td>
                <td style={styles.td}>
                  <div style={styles.progCell}>
                    <div style={styles.progBar}>
                      <div style={{ ...styles.progFill, width: `${Math.round((t.completados / t.tickets) * 100)}%` }} />
                    </div>
                    <span style={styles.progPct}>{Math.round((t.completados / t.tickets) * 100)}%</span>
                  </div>
                </td>
                <td style={{ ...styles.tdNum, color: '#f59e0b' }}>★ {t.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: 800, color: '#fff' },
  periodRow: { display: 'flex', gap: '0.5rem' },
  periodBtn: {
    padding: '0.4rem 0.9rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent', color: 'rgba(255,255,255,0.4)',
    fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
  },
  periodActive: { background: 'rgba(0,212,255,0.15)', borderColor: '#00d4ff', color: '#00d4ff' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  kpiCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.25rem',
  },
  kpiLabel: { fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8 },
  kpiValue: { fontSize: 30, fontWeight: 800, lineHeight: 1, marginBottom: 6 },
  kpiPrev: { fontSize: 10, color: 'rgba(255,255,255,0.25)' },
  chartsRow: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' },
  chartCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.5rem',
  },
  chartTitle: { fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: '1.25rem', letterSpacing: 0.3 },
  barChart: { display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 140, padding: '0 0 0.5rem' },
  barGroup: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' },
  barPair: { display: 'flex', gap: 3, alignItems: 'flex-end', flex: 1, width: '100%' },
  bar: { flex: 1, borderRadius: '4px 4px 0 0', minHeight: 2, transition: 'height 0.5s' },
  barLabel: { fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700 },
  legend: { display: 'flex', gap: '1rem', marginTop: '0.75rem' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  legendDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  donutContainer: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  donutSvg: { width: 120, height: 120, flexShrink: 0 },
  donutLegend: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 },
  donutLegendItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 12 },
  donutCat: { flex: 1, color: 'rgba(255,255,255,0.6)' },
  donutCount: { fontWeight: 800, color: '#fff' },
  tableCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.5rem',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1, textTransform: 'uppercase', textAlign: 'left',
    padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
  td: { padding: '0.75rem', fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  tdNum: { padding: '0.75rem', fontSize: 14, fontWeight: 800, color: '#fff', textAlign: 'center' },
  tdUser: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 },
  tdAvatar: {
    width: 28, height: 28, borderRadius: '50%', background: '#3b82f6',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 9, fontWeight: 800, color: '#fff',
  },
  progCell: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  progBar: { flex: 1, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' },
  progFill: { height: '100%', background: 'linear-gradient(90deg, #10b981, #00d4ff)', borderRadius: 3 },
  progPct: { fontSize: 12, fontWeight: 800, color: '#10b981', whiteSpace: 'nowrap' },
};
