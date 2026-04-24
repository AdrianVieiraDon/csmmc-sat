import React from 'react';
import { TECNICOS, TICKETS } from '../data/mockData';

export default function Tecnicos() {
  const getTicketsTecnico = (nombre) => TICKETS.filter(t => t.tecnico === nombre);

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={styles.title}>Equipo Técnico</span>
        <span style={styles.sub}>{TECNICOS.length} técnicos activos</span>
      </div>

      <div style={styles.grid}>
        {TECNICOS.map(tec => {
          const sus = getTicketsTecnico(tec.nombre);
          const pct = Math.round((tec.completados / (tec.tickets || 1)) * 100);
          return (
            <div key={tec.id} style={styles.card}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>{tec.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                <div>
                  <div style={styles.name}>{tec.nombre}</div>
                  <div style={styles.dept}>Técnico de Campo</div>
                </div>
                <div style={styles.rating}>★ {tec.rating}</div>
              </div>

              {/* Stats */}
              <div style={styles.statsRow}>
                {[
                  { label: 'Total', value: tec.tickets, color: '#00d4ff' },
                  { label: 'En proceso', value: tec.enProceso, color: '#3b82f6' },
                  { label: 'Completados', value: tec.completados, color: '#10b981' },
                ].map(s => (
                  <div key={s.label} style={styles.statBox}>
                    <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
                    <div style={styles.statLbl}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div style={styles.progressSection}>
                <div style={styles.progressLabel}>
                  <span>Tasa de resolución</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>{pct}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${pct}%` }} />
                </div>
              </div>

              {/* Tickets list */}
              <div style={styles.ticketSection}>
                <div style={styles.ticketSectionTitle}>Tickets asignados</div>
                {sus.length === 0
                  ? <div style={styles.noTickets}>Sin tickets asignados</div>
                  : sus.slice(0, 3).map(t => (
                    <div key={t.id} style={styles.ticketRow}>
                      <span style={styles.ticketId}>{t.id}</span>
                      <span style={styles.ticketTitle}>{t.titulo.slice(0, 28)}...</span>
                      <span style={{
                        fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                        background: t.estado === 'completado' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)',
                        color: t.estado === 'completado' ? '#10b981' : '#3b82f6',
                      }}>
                        {t.estado === 'completado' ? '✓' : '↻'}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 800, color: '#fff' },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.35)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' },
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
  },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  avatar: {
    width: 44, height: 44, borderRadius: '50%',
    background: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0,
  },
  name: { fontSize: 15, fontWeight: 800, color: '#fff' },
  dept: { fontSize: 11, color: '#00d4ff', marginTop: 2 },
  rating: { marginLeft: 'auto', fontSize: 13, fontWeight: 800, color: '#f59e0b' },
  statsRow: { display: 'flex', gap: '0.75rem' },
  statBox: {
    flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 10, padding: '0.75rem', textAlign: 'center',
  },
  statVal: { fontSize: 22, fontWeight: 800, lineHeight: 1 },
  statLbl: { fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 700 },
  progressSection: {},
  progressLabel: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 },
  progressBar: { height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #10b981, #00d4ff)', borderRadius: 3 },
  ticketSection: {},
  ticketSectionTitle: { fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.6rem' },
  noTickets: { fontSize: 12, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' },
  ticketRow: {
    display: 'flex', gap: '0.5rem', alignItems: 'center',
    padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11,
  },
  ticketId: { fontFamily: "'Space Mono', monospace", color: '#00d4ff', fontSize: 10, flexShrink: 0 },
  ticketTitle: { flex: 1, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
};
