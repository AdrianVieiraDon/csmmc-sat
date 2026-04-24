import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Carlos Mendoza',
    role: 'admin',
    roleLabel: 'Administrador',
    email: 'admin@csmmc.com',
    avatar: 'CM',
    department: 'Dirección General',
  },
  {
    id: 2,
    username: 'gerente',
    password: 'gerente123',
    name: 'Laura Ríos',
    role: 'gerente',
    roleLabel: 'Gerente',
    email: 'gerente@csmmc.com',
    avatar: 'LR',
    department: 'Gerencia',
  },
  {
    id: 3,
    username: 'supervisor',
    password: 'super123',
    name: 'Miguel Torres',
    role: 'supervisor',
    roleLabel: 'Supervisor Técnico',
    email: 'supervisor@csmmc.com',
    avatar: 'MT',
    department: 'Supervisión Técnica',
  },
  {
    id: 4,
    username: 'tecnico',
    password: 'tecnico123',
    name: 'Andrés Pérez',
    role: 'tecnico',
    roleLabel: 'Servicio Técnico',
    email: 'tecnico@csmmc.com',
    avatar: 'AP',
    department: 'Taller Técnico',
  },
  {
    id: 5,
    username: 'cliente',
    password: 'cliente123',
    name: 'Sofía Vargas',
    role: 'cliente',
    roleLabel: 'Cliente',
    email: 'cliente@csmmc.com',
    avatar: 'SV',
    department: 'Externo',
  },
];

export const ROLE_COLORS = {
  admin: { bg: '#ff4d4d', text: '#fff', light: 'rgba(255,77,77,0.15)' },
  gerente: { bg: '#f59e0b', text: '#fff', light: 'rgba(245,158,11,0.15)' },
  supervisor: { bg: '#3b82f6', text: '#fff', light: 'rgba(59,130,246,0.15)' },
  tecnico: { bg: '#10b981', text: '#fff', light: 'rgba(16,185,129,0.15)' },
  cliente: { bg: '#8b5cf6', text: '#fff', light: 'rgba(139,92,246,0.15)' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = (username, password) => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      setError('');
      return true;
    }
    setError('Usuario o contraseña incorrectos.');
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
