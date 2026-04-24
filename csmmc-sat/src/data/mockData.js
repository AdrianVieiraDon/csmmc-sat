export const TICKETS = [
  { id: 'TK-001', titulo: 'Fallo en impresora HP LaserJet', cliente: 'Empresa ABC', tecnico: 'Andrés Pérez', prioridad: 'alta', estado: 'en_proceso', fecha: '2026-04-20', categoria: 'Hardware', descripcion: 'La impresora no enciende y emite olor a quemado.' },
  { id: 'TK-002', titulo: 'Error en sistema ERP', cliente: 'Distribuidora XYZ', tecnico: 'Andrés Pérez', prioridad: 'critica', estado: 'abierto', fecha: '2026-04-21', categoria: 'Software', descripcion: 'El módulo de facturación no genera PDF.' },
  { id: 'TK-003', titulo: 'Configuración de red WiFi', cliente: 'Consultora DEF', tecnico: 'Sin asignar', prioridad: 'media', estado: 'abierto', fecha: '2026-04-22', categoria: 'Redes', descripcion: 'Ampliar cobertura WiFi a segundo piso.' },
  { id: 'TK-004', titulo: 'Mantenimiento preventivo servidores', cliente: 'Banco Nacional', tecnico: 'Andrés Pérez', prioridad: 'baja', estado: 'completado', fecha: '2026-04-18', categoria: 'Mantenimiento', descripcion: 'Limpieza y actualización de firmware.' },
  { id: 'TK-005', titulo: 'PC no arranca - pantalla azul', cliente: 'Sofía Vargas', tecnico: 'Sin asignar', prioridad: 'alta', estado: 'abierto', fecha: '2026-04-23', categoria: 'Hardware', descripcion: 'BSOD al iniciar Windows 11.' },
  { id: 'TK-006', titulo: 'Instalación antivirus corporativo', cliente: 'LogisTrans S.A.', tecnico: 'Andrés Pérez', prioridad: 'media', estado: 'completado', fecha: '2026-04-17', categoria: 'Software', descripcion: 'Deploy de Kaspersky en 30 equipos.' },
  { id: 'TK-007', titulo: 'Backup fallido - servidor NAS', cliente: 'Pharma Corp', tecnico: 'Andrés Pérez', prioridad: 'critica', estado: 'en_proceso', fecha: '2026-04-22', categoria: 'Redes', descripcion: 'El sistema de respaldo automático falla a las 2am.' },
  { id: 'TK-008', titulo: 'Cambio de pantalla laptop Dell', cliente: 'Sofía Vargas', tecnico: 'Sin asignar', prioridad: 'baja', estado: 'abierto', fecha: '2026-04-23', categoria: 'Hardware', descripcion: 'Pantalla rota por caída.' },
];

export const TECNICOS = [
  { id: 1, nombre: 'Andrés Pérez', tickets: 5, completados: 2, enProceso: 2, rating: 4.8 },
  { id: 2, nombre: 'Javier Luna', tickets: 3, completados: 1, enProceso: 2, rating: 4.5 },
  { id: 3, nombre: 'Patricia Gómez', tickets: 4, completados: 3, enProceso: 1, rating: 4.9 },
];

export const STATS = {
  ticketsAbiertos: 5,
  ticketsEnProceso: 2,
  ticketsCompletados: 2,
  ticketsCriticos: 2,
  tiempoPromedioResolucion: '3.2h',
  satisfaccionCliente: '94%',
  tecnicosActivos: 3,
  equiposRegistrados: 87,
};

export const EQUIPOS = [
  { id: 'EQ-001', tipo: 'Laptop', marca: 'Dell', modelo: 'Inspiron 15', serie: 'DL2024-001', cliente: 'Sofía Vargas', estado: 'En reparación', ultimoServicio: '2026-04-23' },
  { id: 'EQ-002', tipo: 'Servidor', marca: 'HP', modelo: 'ProLiant DL360', serie: 'HP2023-482', cliente: 'Pharma Corp', estado: 'Activo', ultimoServicio: '2026-04-22' },
  { id: 'EQ-003', tipo: 'Impresora', marca: 'HP', modelo: 'LaserJet Pro M404', serie: 'HP2024-031', cliente: 'Empresa ABC', estado: 'En diagnóstico', ultimoServicio: '2026-04-20' },
  { id: 'EQ-004', tipo: 'PC Escritorio', marca: 'Lenovo', modelo: 'ThinkCentre M920', serie: 'LN2023-881', cliente: 'Banco Nacional', estado: 'Activo', ultimoServicio: '2026-04-18' },
];

export const NOTIFICACIONES = [
  { id: 1, tipo: 'critica', mensaje: 'Ticket TK-002 sin asignar - Prioridad Crítica', tiempo: 'hace 10 min' },
  { id: 2, tipo: 'info', mensaje: 'Ticket TK-004 completado por Andrés Pérez', tiempo: 'hace 2h' },
  { id: 3, tipo: 'warning', mensaje: 'SLA próximo a vencer: TK-007', tiempo: 'hace 30 min' },
  { id: 4, tipo: 'info', mensaje: 'Nuevo cliente registrado: Pharma Corp', tiempo: 'hace 5h' },
];
