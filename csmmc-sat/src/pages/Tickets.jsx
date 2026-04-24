import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TICKETS } from '../data/mockData';

const PRIORIDAD_COLOR = { critica: '#ff4d4d', alta: '#f59e0b', media: '#3b82f6', baja: '#10b981' };
const ESTADO_COLOR = { abierto: '#f59e0b', en_proceso: '#3b82f6', completado: '#10b981' };
const ESTADO_LABEL = { abierto: 'Abierto', en_proceso: 'En Proceso', completado: 'Completado' };
const FILTERS = ['todos', 'abierto', 'en_proceso', 'completado'];

export default function Tickets() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ titulo: '', descripcion: '', prioridad: 'media', categoria: 'Hardware' });
  const [tickets, setTickets] = useState(TICKETS);

  const visibles = tickets.filter(t => {
    const matchFiltro = filtro === 'todos' || t.estado === filtro;
    const matchBusqueda = t.titulo.toLowerCase().includes(busqueda.toLowerCase()) || t.cliente.toLowerCase().includes(busqueda.toLowerCase());
    if (user.role === 'tecnico') return matchFiltro && matchBusqueda && t.tecnico === 'Andrés Pérez';
    if (user.role === 'cliente') return matchFiltro && matchBusqueda && t.cliente === 'Sofía Vargas';
    return matchFiltro && matchBusqueda;
  });

  const crearTicket = () => {
    const t = {
      id: `TK-00${tickets.length + 1}`,
      ...newTicket, cliente: user.name, tecnico: 'Sin asignar',
      estado: 'abierto', fecha: new Date().toISOString().split('T')[0],
    };
    setTickets([t, ...tickets]);
    setShowForm(false);
    setNewTicket({ titulo: '', descripcion: '', prioridad: 'media', categoria: 'Hardware' });
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, estado: nuevoEstado } : t));
    if (selected?.id === id) setSelected(prev => ({ ...prev, estado: nuevoEstado }));
  };

  return (
    <div style={styles.root}>
      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.filterRow}>
          {FILTERS.map(f => (
            <button
              key={f}
              style={{ ...styles.filterBtn, ...(filtro === f ? styles.filterActive : {}) }}
              onClick={() => setFiltro(f)}
            >
              {f === 'todos' ? 'Todos' : ESTADO_LABEL[f]}
            </button>
          ))}
        </div>
        <div style={styles.controlsRight}>
          <input
            style={styles.search}
            placeholder="🔍 Buscar tickets..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          {['admin', 'supervisor', 'cliente'].includes(user.role) && (
            <button style={styles.createBtn} onClick={() => setShowForm(true)}>
              + Nuevo Ticket
            </button>
          )}
        </div>
      </div>

      {/* New ticket form */}
      {showForm && (
        <div style={styles.formOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.formModal} onClick={e => e.stopPropagation()}>
            <h3 style={styles.formTitle}>Crear Nuevo Ticket</h3>
            <div style={styles.formGrid}>
              <div style={styles.formField}>
                <label style={styles.formLabel}>Título</label>
                <input style={styles.formInput} value={newTicket.titulo} onChange={e => setNewTicket({ ...newTicket, titulo: e.target.value })} placeholder="Descripción breve del problema" />
              </div>
              <div style={styles.formField}>
                <label style={styles.formLabel}>Categoría</label>
                <select style={styles.formInput} value={newTicket.categoria} onChange={e => setNewTicket({ ...newTicket, categoria: e.target.value })}>
                  {['Hardware', 'Software', 'Redes', 'Mantenimiento', 'Otro'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={styles.formField}>
                <label style={styles.formLabel}>Prioridad</label>
                <select style={styles.formInput} value={newTicket.prioridad} onChange={e => setNewTicket({ ...newTicket, prioridad: e.target.value })}>
                  {['baja', 'media', 'alta', 'critica'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ ...styles.formField, gridColumn: '1/-1' }}>
                <label style={styles.formLabel}>Descripción</label>
                <textarea style={{ ...styles.formInput, height: 80, resize: 'vertical' }} value={newTicket.descripcion} onChange={e => setNewTicket({ ...newTicket, descripcion: e.target.value })} placeholder="Detalla el problema..." />
              </div>
            </div>
            <div style={styles.formActions}>
              <button style={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancelar</button>
              <button style={styles.submitBtn} onClick={crearTicket} disabled={!newTicket.titulo}>Crear Ticket</button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.mainLayout}>
        {/* Ticket list */}
        <div style={styles.list}>
          <div style={styles.listHeader}>
            <span style={styles.listCount}>{visibles.length} tickets</span>
          </div>
          {visibles.map(t => (
            <div
              key={t.id}
              style={{ ...styles.ticketCard, ...(selected?.id === t.id ? styles.ticketCardActive : {}) }}
              onClick={() => setSelected(t)}
            >
              <div style={styles.cardTop}>
                <span style={styles.ticketId}>{t.id}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ ...styles.badge, background: PRIORIDAD_COLOR[t.prioridad] + '22', color: PRIORIDAD_COLOR[t.prioridad] }}>
                    {t.prioridad.toUpperCase()}
                  </span>
                  <span style={{ ...styles.badge, background: ESTADO_COLOR[t.estado] + '22', color: ESTADO_COLOR[t.estado] }}>
                    {ESTADO_LABEL[t.estado]}
                  </span>
                </div>
              </div>
              <div style={styles.cardTitle}>{t.titulo}</div>
              <div style={styles.cardMeta}>
                <span>👤 {t.cliente}</span>
                <span>🔧 {t.tecnico}</span>
                <span>📅 {t.fecha}</span>
              </div>
              <div style={styles.cardCategory}>{t.categoria}</div>
            </div>
          ))}
          {visibles.length === 0 && (
            <div style={styles.empty}>No se encontraron tickets</div>
          )}
        </div>

        {/* Detail */}
        {selected ? (
          <div style={styles.detail}>
            <div style={styles.detailHeader}>
              <div>
                <div style={styles.detailId}>{selected.id}</div>
                <h2 style={styles.detailTitle}>{selected.titulo}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>

            <div style={styles.detailBadges}>
              <span style={{ ...styles.bigBadge, background: PRIORIDAD_COLOR[selected.prioridad] + '22', color: PRIORIDAD_COLOR[selected.prioridad] }}>
                ⚡ {selected.prioridad.toUpperCase()}
              </span>
              <span style={{ ...styles.bigBadge, background: ESTADO_COLOR[selected.estado] + '22', color: ESTADO_COLOR[selected.estado] }}>
                ● {ESTADO_LABEL[selected.estado]}
              </span>
              <span style={{ ...styles.bigBadge, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>
                🗂 {selected.categoria}
              </span>
            </div>

            <div style={styles.detailSection}>
              <div style={styles.detailSectionTitle}>Descripción</div>
              <p style={styles.detailDesc}>{selected.descripcion}</p>
            </div>

            <div style={styles.detailGrid}>
              {[
                { label: 'Cliente', value: selected.cliente, icon: '👤' },
                { label: 'Técnico', value: selected.tecnico, icon: '🔧' },
                { label: 'Fecha', value: selected.fecha, icon: '📅' },
                { label: 'Categoría', value: selected.categoria, icon: '🗂' },
              ].map(f => (
                <div key={f.label} style={styles.detailField}>
                  <div style={styles.detailFieldLabel}>{f.icon} {f.label}</div>
                  <div style={styles.detailFieldValue}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            {['admin', 'supervisor', 'tecnico'].includes(user.role) && (
              <div style={styles.detailActions}>
                <div style={styles.detailSectionTitle}>Cambiar Estado</div>
                <div style={styles.actionBtns}>
                  {['abierto', 'en_proceso', 'completado'].map(e => (
                    <button
                      key={e}
                      style={{
                        ...styles.actionBtn,
                        ...(selected.estado === e ? { background: ESTADO_COLOR[e] + '33', borderColor: ESTADO_COLOR[e], color: ESTADO_COLOR[e] } : {}),
                      }}
                      onClick={() => cambiarEstado(selected.id, e)}
                    >
                      {ESTADO_LABEL[e]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div style={styles.detailSection}>
              <div style={styles.detailSectionTitle}>Historial</div>
              <div style={styles.timeline}>
                {[
                  { msg: 'Ticket creado', time: selected.fecha, color: '#00d4ff' },
                  ...(selected.estado !== 'abierto' ? [{ msg: 'Asignado a técnico', time: selected.fecha, color: '#3b82f6' }] : []),
                  ...(selected.estado === 'completado' ? [{ msg: 'Ticket completado', time: selected.fecha, color: '#10b981' }] : []),
                ].map((ev, i) => (
                  <div key={i} style={styles.timelineItem}>
                    <div style={{ ...styles.timelineDot, background: ev.color }} />
                    <div style={styles.timelineContent}>
                      <div style={styles.timelineMsg}>{ev.msg}</div>
                      <div style={styles.timelineTime}>{ev.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.emptyDetail}>
            <div style={styles.emptyDetailIcon}>◈</div>
            <div style={styles.emptyDetailText}>Selecciona un ticket para ver los detalles</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' },
  controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' },
  filterRow: { display: 'flex', gap: '0.5rem' },
  filterBtn: {
    padding: '0.4rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent', color: 'rgba(255,255,255,0.4)',
    fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
  },
  filterActive: { background: 'rgba(0,212,255,0.15)', borderColor: '#00d4ff', color: '#00d4ff' },
  controlsRight: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  search: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '0.5rem 1rem', color: '#fff',
    fontFamily: "'Syne', sans-serif", fontSize: 13, outline: 'none', width: 220,
  },
  createBtn: {
    background: 'linear-gradient(135deg, #00d4ff, #0088cc)',
    border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem',
    color: '#0a0f1e', fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, cursor: 'pointer',
  },
  formOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  formModal: {
    background: '#0d1629', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16, padding: '2rem', width: '90%', maxWidth: 520,
  },
  formTitle: { margin: '0 0 1.5rem', fontSize: 18, fontWeight: 800, color: '#fff' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  formField: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  formLabel: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' },
  formInput: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '0.6rem 0.75rem', color: '#fff',
    fontFamily: "'Syne', sans-serif", fontSize: 13, outline: 'none',
  },
  formActions: { display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' },
  cancelBtn: {
    padding: '0.6rem 1.25rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
    background: 'none', color: 'rgba(255,255,255,0.5)', fontFamily: "'Syne', sans-serif", fontSize: 13, cursor: 'pointer',
  },
  submitBtn: {
    padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none',
    background: '#00d4ff', color: '#0a0f1e', fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, cursor: 'pointer',
  },
  mainLayout: { display: 'grid', gridTemplateColumns: '380px 1fr', gap: '1.5rem', flex: 1, minHeight: 0 },
  list: { display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 240px)' },
  listHeader: { display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' },
  listCount: { fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700 },
  ticketCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12, padding: '1rem', cursor: 'pointer', transition: 'all 0.15s',
  },
  ticketCardActive: { border: '1px solid rgba(0,212,255,0.4)', background: 'rgba(0,212,255,0.05)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  ticketId: { fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" },
  badge: { fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4 },
  cardTitle: { fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.4 },
  cardMeta: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: 10, color: 'rgba(255,255,255,0.35)' },
  cardCategory: { marginTop: '0.5rem', fontSize: 10, color: '#00d4ff', fontWeight: 700 },
  empty: { textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.25)', fontSize: 13 },
  detail: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 240px)',
  },
  detailHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  detailId: { fontSize: 11, fontWeight: 800, color: '#00d4ff', fontFamily: "'Space Mono', monospace", marginBottom: 4 },
  detailTitle: { margin: 0, fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' },
  closeBtn: { background: 'rgba(255,255,255,0.07)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', flexShrink: 0 },
  detailBadges: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  bigBadge: { fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 6 },
  detailSection: { marginBottom: '1.5rem' },
  detailSectionTitle: { fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.75rem' },
  detailDesc: { margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  detailField: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8, padding: '0.75rem',
  },
  detailFieldLabel: { fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 4 },
  detailFieldValue: { fontSize: 13, fontWeight: 700, color: '#fff' },
  detailActions: { marginBottom: '1.5rem' },
  actionBtns: { display: 'flex', gap: '0.5rem' },
  actionBtn: {
    padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
    background: 'none', color: 'rgba(255,255,255,0.5)',
    fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
  },
  timeline: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  timelineItem: { display: 'flex', gap: '0.75rem', alignItems: 'flex-start' },
  timelineDot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 2 },
  timelineContent: {},
  timelineMsg: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' },
  timelineTime: { fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" },
  emptyDetail: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)',
    borderRadius: 14, gap: '1rem',
  },
  emptyDetailIcon: { fontSize: 48, color: 'rgba(255,255,255,0.1)' },
  emptyDetailText: { fontSize: 13, color: 'rgba(255,255,255,0.25)' },
};
