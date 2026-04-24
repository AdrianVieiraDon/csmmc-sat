import React, { useState } from 'react';
import { useAuth, USERS, ROLE_COLORS } from '../context/AuthContext';

export default function Login() {
  const { login, error, setError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(username, password);
    setLoading(false);
  };

  const fillUser = (u) => {
    setUsername(u.username);
    setPassword(u.password);
    setError('');
    setShowUsers(false);
  };

  return (
    <div style={styles.root}>
      {/* Left panel */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <div style={styles.logoBlock}>
            <div style={styles.logoIcon}>
              <span style={styles.logoText}>CS</span>
            </div>
            <div>
              <div style={styles.logoName}>CSMMC</div>
              <div style={styles.logoSub}>Sistema SAT</div>
            </div>
          </div>
          <h1 style={styles.headline}>
            Gestión de<br />
            <span style={styles.headlineAccent}>Servicio Técnico</span><br />
            Profesional
          </h1>
          <p style={styles.desc}>
            Plataforma integral para el control, seguimiento y resolución de tickets de soporte técnico empresarial.
          </p>
          <div style={styles.featureList}>
            {['Tickets en tiempo real', 'Control de SLA', 'Gestión de técnicos', 'Reportes avanzados'].map(f => (
              <div key={f} style={styles.feature}>
                <span style={styles.featureDot} />
                {f}
              </div>
            ))}
          </div>
          {/* Decorative grid */}
          <div style={styles.grid}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ ...styles.gridDot, opacity: Math.random() * 0.6 + 0.1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Iniciar Sesión</h2>
            <p style={styles.formSubtitle}>Accede a tu panel de control</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Usuario</label>
              <input
                style={styles.input}
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="tu.usuario"
                required
                autoComplete="username"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contraseña</label>
              <input
                style={styles.input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? (
                <span style={styles.spinner}>●</span>
              ) : 'Ingresar al Sistema'}
            </button>
          </form>

          {/* Demo users */}
          <div style={styles.demoSection}>
            <button style={styles.demoToggle} onClick={() => setShowUsers(!showUsers)}>
              {showUsers ? '▲' : '▼'} Usuarios de demostración
            </button>
            {showUsers && (
              <div style={styles.userGrid}>
                {USERS.map(u => (
                  <button key={u.id} style={styles.userChip} onClick={() => fillUser(u)}>
                    <span style={{ ...styles.avatar, background: ROLE_COLORS[u.role].bg }}>
                      {u.avatar}
                    </span>
                    <div style={styles.userInfo}>
                      <div style={styles.userName}>{u.name}</div>
                      <div style={{ ...styles.roleBadge, background: ROLE_COLORS[u.role].light, color: ROLE_COLORS[u.role].bg }}>
                        {u.roleLabel}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Syne', sans-serif",
    background: '#0a0f1e',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #0f1b3a 0%, #0a0f1e 50%, #1a0a2e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '1px solid rgba(255,255,255,0.05)',
  },
  leftContent: { maxWidth: 480, position: 'relative', zIndex: 2 },
  logoBlock: {
    display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem',
  },
  logoIcon: {
    width: 52, height: 52, background: '#00d4ff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  },
  logoText: { fontSize: 18, fontWeight: 800, color: '#0a0f1e' },
  logoName: { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' },
  logoSub: { fontSize: 11, color: '#00d4ff', letterSpacing: 3, textTransform: 'uppercase' },
  headline: {
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    letterSpacing: '-1px',
  },
  headlineAccent: { color: '#00d4ff' },
  desc: { color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, marginBottom: '2rem' },
  featureList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  feature: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  featureDot: { width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 },
  grid: {
    position: 'absolute', bottom: '-2rem', right: '-3rem',
    display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12,
    zIndex: 1,
  },
  gridDot: { width: 4, height: 4, borderRadius: '50%', background: '#00d4ff' },
  rightPanel: {
    flex: '0 0 480px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', background: '#0a0f1e',
  },
  formCard: {
    width: '100%', maxWidth: 400,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '2.5rem',
    backdropFilter: 'blur(20px)',
  },
  formHeader: { marginBottom: '2rem' },
  formTitle: { fontSize: 26, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.5px' },
  formSubtitle: { color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: '0.4rem 0 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' },
  input: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '0.85rem 1rem',
    color: '#fff', fontSize: 14,
    fontFamily: "'Space Mono', monospace",
    outline: 'none', transition: 'border-color 0.2s',
  },
  errorBox: {
    background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.3)',
    borderRadius: 8, padding: '0.75rem 1rem',
    color: '#ff6b6b', fontSize: 13, display: 'flex', gap: '0.5rem', alignItems: 'center',
  },
  btn: {
    background: 'linear-gradient(135deg, #00d4ff, #0088cc)',
    border: 'none', borderRadius: 10,
    padding: '1rem', color: '#0a0f1e',
    fontFamily: "'Syne', sans-serif",
    fontSize: 15, fontWeight: 700, cursor: 'pointer',
    marginTop: '0.5rem', transition: 'opacity 0.2s',
    letterSpacing: 0.5,
  },
  spinner: { animation: 'spin 1s linear infinite', display: 'inline-block' },
  demoSection: { marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem' },
  demoToggle: {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
    fontSize: 12, cursor: 'pointer', fontFamily: "'Syne', sans-serif",
    letterSpacing: 0.5, padding: 0, marginBottom: '1rem',
  },
  userGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10, padding: '0.6rem 0.75rem', cursor: 'pointer',
    textAlign: 'left', transition: 'background 0.2s',
  },
  avatar: {
    width: 34, height: 34, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0,
  },
  userInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
  userName: { fontSize: 12, fontWeight: 700, color: '#fff' },
  roleBadge: { fontSize: 10, padding: '1px 6px', borderRadius: 4, fontWeight: 700, width: 'fit-content' },
};
