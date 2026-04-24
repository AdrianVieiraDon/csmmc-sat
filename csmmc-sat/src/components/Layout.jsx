import React, { useState } from 'react';
import { useAuth, ROLE_COLORS } from '../context/AuthContext';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦', roles: ['admin', 'gerente', 'supervisor', 'tecnico', 'cliente'] },
  { key: 'tickets', label: 'Tickets', icon: '◈', roles: ['admin', 'gerente', 'supervisor', 'tecnico', 'cliente'] },
  { key: 'equipos', label: 'Equipos', icon: '◉', roles: ['admin', 'gerente', 'supervisor', 'tecnico'] },
  { key: 'tecnicos', label: 'Técnicos', icon: '◎', roles: ['admin', 'gerente', 'supervisor'] },
  { key: 'reportes', label: 'Reportes', icon: '◐', roles: ['admin', 'gerente'] },
];

export default function Layout({ children, currentPage, onNavigate }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const roleColor = ROLE_COLORS[user.role];
  const visibleNav = NAV_ITEMS.filter(n => n.roles.includes(user.role));

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: collapsed ? 72 : 240, transition: 'width 0.25s' }}>
        {/* Logo */}
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarLogo}>
            <div style={styles.logoHex}>
              <span style={styles.logoHexText}>CS</span>
            </div>
            {!collapsed && (
              <div style={styles.logoLabels}>
                <div style={styles.logoTitle}>CSMMC</div>
                <div style={styles.logoSubtitle}>SAT System</div>
              </div>
            )}
          </div>
          <button style={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div style={{ ...styles.roleBanner, background: roleColor.light, borderLeft: `3px solid ${roleColor.bg}` }}>
            <span style={{ color: roleColor.bg, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
              {user.roleLabel}
            </span>
          </div>
        )}

        {/* Nav */}
        <nav style={styles.nav}>
          {visibleNav.map(item => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                ...styles.navItem,
                ...(currentPage === item.key ? { ...styles.navActive, background: roleColor.light, color: roleColor.bg } : {}),
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              title={collapsed ? item.label : ''}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
              {currentPage === item.key && !collapsed && (
                <span style={{ ...styles.navDot, background: roleColor.bg }} />
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={styles.sidebarBottom}>
          <div style={styles.userCard}>
            <div style={{ ...styles.userAvatar, background: roleColor.bg }}>{user.avatar}</div>
            {!collapsed && (
              <div style={styles.userMeta}>
                <div style={styles.userNameText}>{user.name}</div>
                <div style={styles.userEmailText}>{user.email}</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button style={styles.logoutBtn} onClick={logout}>
              ⏻ Salir
            </button>
          )}
          {collapsed && (
            <button style={{ ...styles.logoutBtn, padding: '0.5rem', width: 40, height: 40, borderRadius: 8 }} onClick={logout} title="Salir">
              ⏻
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Top bar */}
        <header style={styles.topbar}>
          <div style={styles.pageTitle}>
            <div style={styles.breadcrumb}>Sistema SAT</div>
            <h1 style={styles.pageName}>{visibleNav.find(n => n.key === currentPage)?.label}</h1>
          </div>
          <div style={styles.topRight}>
            <div style={styles.notifBell}>🔔 <span style={styles.notifBadge}>3</span></div>
            <div style={styles.topUser}>
              <div style={{ ...styles.topAvatar, background: roleColor.bg }}>{user.avatar}</div>
              <span style={styles.topUserName}>{user.name.split(' ')[0]}</span>
            </div>
          </div>
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  root: { display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Syne', sans-serif" },
  sidebar: {
    background: '#0d1629', borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
    overflow: 'hidden',
  },
  sidebarTop: {
    padding: '1.25rem 1rem', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  sidebarLogo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  logoHex: {
    width: 36, height: 36, background: '#00d4ff', flexShrink: 0,
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoHexText: { fontSize: 11, fontWeight: 900, color: '#0a0f1e' },
  logoLabels: {},
  logoTitle: { fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' },
  logoSubtitle: { fontSize: 9, color: '#00d4ff', letterSpacing: 2, textTransform: 'uppercase' },
  collapseBtn: {
    background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.4)',
    width: 24, height: 24, borderRadius: 6, cursor: 'pointer', fontSize: 10, flexShrink: 0,
  },
  roleBanner: { margin: '0.75rem 1rem', padding: '0.4rem 0.75rem', borderRadius: 6 },
  nav: { flex: 1, padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.7rem 0.75rem', borderRadius: 10, border: 'none', background: 'none',
    color: 'rgba(255,255,255,0.45)', cursor: 'pointer', width: '100%',
    fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
    transition: 'all 0.15s', position: 'relative',
  },
  navActive: { color: '#fff' },
  navIcon: { fontSize: 16, flexShrink: 0 },
  navLabel: {},
  navDot: { width: 6, height: 6, borderRadius: '50%', marginLeft: 'auto', flexShrink: 0 },
  sidebarBottom: { padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  userCard: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  userAvatar: {
    width: 34, height: 34, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0,
  },
  userMeta: {},
  userNameText: { fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 },
  userEmailText: { fontSize: 10, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 },
  logoutBtn: {
    background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)',
    borderRadius: 8, padding: '0.5rem 0.75rem', color: '#ff6b6b',
    fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 240, transition: 'margin-left 0.25s', minHeight: '100vh' },
  topbar: {
    background: 'rgba(13,22,41,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50,
  },
  pageTitle: {},
  breadcrumb: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.2rem' },
  pageName: { margin: 0, fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' },
  topRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  notifBell: { position: 'relative', fontSize: 18, cursor: 'pointer' },
  notifBadge: {
    position: 'absolute', top: -4, right: -6,
    background: '#ff4d4d', color: '#fff', fontSize: 9, fontWeight: 800,
    width: 16, height: 16, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  topUser: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  topAvatar: {
    width: 32, height: 32, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 800, color: '#fff',
  },
  topUserName: { fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' },
  content: { flex: 1, padding: '2rem', overflowY: 'auto' },
};
