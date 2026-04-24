import React from 'react';
import { useAuth, ROLE_COLORS } from '../context/AuthContext';
import { STATS, TICKETS, NOTIFICACIONES, TECNICOS } from '../data/mockData';

const PRIORIDAD_COLOR = { critica: '#ff4d4d', alta: '#f59e0b', media: '#3b82f6', baja: '#10b981' };
const ESTADO_COLOR = { abierto: '#f59e0b', en_proceso: '#3b82f6', completado: '#10b981' };
const ESTADO_LABEL = { abierto: 'Abierto', en_proceso: 'En Proceso', completado: 'Completado' };

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const rc = ROLE_COLORS[user.role];
  const recentTickets = TICKETS.slice(0, 5);

  const statCards = [
    { label: 'Tickets Abiertos', value: STATS.ticketsAbiertos, icon: '◈', color: '#f59e0b' },
    { label: 'En Proceso', value: STATS.ticketsEnProceso, icon: '↻', color: '#3b82f6' },
    { label: 'Completados', value: STATS.ticketsCompletados, icon: '✓', color: '#10b981' },
    { label: 'Críticos', value: STATS.ticketsCriticos, icon: '⚡', color: '#ff4d4d' },
  ];

  const infoCards = [
    { label: 'Tiempo Promedio', value: STATS.tiempoPromedioResolucion, icon: '⏱', color: '#8b5cf6' },
    { label: 'Satisfacción', value: STATS.satisfaccionCliente, icon: '★', color: '#00d4ff' },
    { label: 'Técnicos Activos', value: STATS.tecnicosActivos, icon: '◎', color: '#10b981' },
    { label: 'Equipos Reg.', value: STATS.equiposRegistrados, icon: '◉', color: '#f59e0b' },
  ];

  return (
    <div style={styles.root}>
      {/* Welcome */}
      <div style={{ ...styles.welcomeBanner, borderLeft: `4px solid ${rc.bg}` }}>
        <div>
          <div style={styles.welcomeLabel}>Bienvenido de vuelta,</div>
          <div style={styles.welcomeName}>{user.name}</div>
          <div style={{ ...styles.welcomeRole, color: rc.bg }}>{user.roleLabel} · {user.department}</div>
        </div>
        <div style={styles.welcomeDate}>
          <div style={styles.dateDay}>{new Date().getDate()}</div>
          <div style={styles.dateMon}>{new Date().toLocaleString('es', { month: 'long' })}</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={styles.statsGrid}>
        {statCards.map(s => (
          <div key={s.label} style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: s.color + '22', color: s.color }}>{s.icon}</div>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Info row */}
      <div style={styles.statsGrid}>
        {infoCards.map(s => (
          <div key={s.label} style={{ ...styles.statCard, background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ ...styles.statIcon, background: s.color + '22', color: s.color }}>{s.icon}</div>
            <div style={{ ...styles.statValue, fontSize: 22 }}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lower grid */}
      <div style={styles.lowerGrid}>
        {/* Recent tickets */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelTitle}>Tickets Recientes</span>
            <button style={styles.panelLink} onClick={() => onNavigate('tickets')}>Ver todos →</button>
          </div>
          <div style={styles.ticketList}>
            {recentTickets.map(t => (
              <div key={t.id} style={styles.ticketRow}>
                <div style={styles.ticketLeft}>
                  <span style={{ ...styles.prioTag, background: PRIORIDAD_COLOR[t.prioridad] + '22', color: PRIORIDAD_COLOR[t.prioridad] }}>
                    {t.prioridad.toUpperCase()}
                  </span>
                  <div>
                    <div style={styles.ticketTitle}>{t.titulo}</div>
                    <div style={styles.ticketMeta}>{t.id} · {t.cliente}</div>
                  </div>
                </div>
                <span style={{ ...styles.estadoTag, background: ESTADO_COLOR[t.estado] + '22', color: ESTADO_COLOR[t.estado] }}>
                  {ESTADO_LABEL[t.estado]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={styles.rightColumn}>
          {/* Notifications */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <span style={styles.panelTitle}>Notificaciones</span>
              <span style={styles.notifCount}>{NOTIFICACIONES.length}</span>
            </div>
            {NOTIFICACIONES.map(n => (
              <div key={n.id} style={styles.notifRow}>
                <span style={{ fontSize: 16 }}>{n.tipo === 'critica' ? '🔴' : n.tipo === 'warning' ? '🟡' : '🔵'}</span>
                <div>
                  <div style={styles.notifMsg}>{n.mensaje}</div>
                  <div style={styles.notifTime}>{n.tiempo}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Technician overview if role allows */}
          {['admin', 'gerente', 'supervisor'].includes(user.role) && (
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <span style={styles.panelTitle}>Carga de Técnicos</span>
              </div>
              {TECNICOS.map(t => (
                <div key={t.id} style={styles.tecnicoRow}>
                  <div style={styles.tecAvatar}>{t.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                  <div style={styles.tecInfo}>
                    <div style={styles.tecName}>{t.nombre}</div>
                    <div style={styles.tecBar}>
                      <div style={{ ...styles.tecBarFill, width: `${(t.tickets / 6) * 100}%` }} />
                    </div>
                    <div style={styles.tecStats}>{t.tickets} tickets · ★ {t.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  welcomeBanner: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.5rem 2rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  welcomeLabel: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 },
  welcomeName: { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' },
  welcomeRole: { fontSize: 13, fontWeight: 600, marginTop: 4 },
  welcomeDate: { textAlign: 'right' },
  dateDay: { fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1 },
  dateMon: { fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  statCard: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },
  statIcon: { width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  statValue: { fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1 },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600 },
  lowerGrid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' },
  panel: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.25rem', marginBottom: '1rem',
  },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  panelTitle: { fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: 0.5 },
  panelLink: { background: 'none', border: 'none', color: '#00d4ff', fontSize: 11, cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 700 },
  notifCount: {
    background: '#ff4d4d', color: '#fff', fontSize: 10, fontWeight: 800,
    width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  ticketList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  ticketRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '0.75rem',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  ticketLeft: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  prioTag: { fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 5, whiteSpace: 'nowrap' },
  ticketTitle: { fontSize: 13, fontWeight: 700, color: '#fff' },
  ticketMeta: { fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 },
  estadoTag: { fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5, whiteSpace: 'nowrap' },
  rightColumn: { display: 'flex', flexDirection: 'column' },
  notifRow: { display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  notifMsg: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600 },
  notifTime: { fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 },
  tecnicoRow: { display: 'flex', gap: '0.75rem', padding: '0.5rem 0', alignItems: 'center' },
  tecAvatar: {
    width: 32, height: 32, borderRadius: '50%', background: '#3b82f6',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
  },
  tecInfo: { flex: 1 },
  tecName: { fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 4 },
  tecBar: { height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 3 },
  tecBarFill: { height: '100%', background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', borderRadius: 2, transition: 'width 0.5s' },
  tecStats: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },
};
