# CSMMC — Sistema de Gestión de Servicio Técnico

## 📋 Descripción

**CSMMC** es un sistema tipo SAT (Software de Asistencia Técnica) desarrollado en React para la gestión integral de tickets de soporte, equipos, técnicos y reportes dentro de una empresa de servicio técnico.

### ✨ Funcionalidades principales

- **Autenticación con roles** — 5 roles diferentes con permisos específicos
- **Dashboard interactivo** — KPIs en tiempo real, carga de técnicos, notificaciones
- **Gestión de Tickets** — Crear, filtrar, buscar, cambiar estado y ver historial
- **Inventario de Equipos** — Registro y seguimiento de dispositivos por cliente
- **Panel de Técnicos** — Carga de trabajo, tasa de resolución y performance
- **Reportes y Analytics** — Gráficas de barras, donut chart y tabla de rendimiento

---

## 👥 Usuarios de Demostración

| Usuario | Contraseña | Rol | Acceso |
|---------|------------|-----|--------|
| `admin` | `admin123` | Administrador | Todo el sistema |
| `gerente` | `gerente123` | Gerente | Dashboard, Tickets, Equipos, Técnicos, Reportes |
| `supervisor` | `super123` | Supervisor Técnico | Dashboard, Tickets, Equipos, Técnicos |
| `tecnico` | `tecnico123` | Servicio Técnico | Dashboard, Tickets (sus asignados), Equipos |
| `cliente` | `cliente123` | Cliente | Dashboard, Tickets (los propios) |

---

## 🚀 Instalación y Uso Local

### Prerrequisitos

- [Node.js](https://nodejs.org/) v16 o superior
- npm v7 o superior (incluido con Node.js)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/csmmc-sat.git
cd csmmc-sat

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm start
```

La aplicación abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

### Construir para producción

```bash
npm run build
```

Genera la carpeta `build/` lista para desplegar.

---

## 📁 Estructura del Proyecto

```
csmmc-sat/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout.jsx        # Sidebar + Topbar + navegación
│   ├── context/
│   │   └── AuthContext.js    # Autenticación y usuarios mock
│   ├── data/
│   │   └── mockData.js       # Datos de prueba (tickets, equipos, etc.)
│   ├── pages/
│   │   ├── Login.jsx         # Pantalla de inicio de sesión
│   │   ├── Dashboard.jsx     # Panel principal con KPIs
│   │   ├── Tickets.jsx       # Gestión de tickets
│   │   ├── Equipos.jsx       # Inventario de equipos
│   │   ├── Tecnicos.jsx      # Panel de técnicos
│   │   └── Reportes.jsx      # Reportes y analíticas
│   ├── App.js                # Componente raíz y enrutamiento
│   ├── index.js              # Punto de entrada
│   └── index.css             # Estilos globales
├── package.json
└── README.md
```

---

## 🔐 Sistema de Roles

### Administrador
- Acceso completo a todas las vistas
- Puede crear, editar y eliminar tickets
- Gestión de técnicos y reportes completos

### Gerente
- Acceso a Dashboard, Tickets, Equipos, Técnicos y Reportes
- Visualización de todos los datos del sistema
- No puede gestionar configuración de sistema

### Supervisor Técnico
- Dashboard, Tickets, Equipos y panel de Técnicos
- Puede reasignar y cambiar estado de tickets
- Vista de carga de trabajo del equipo

### Servicio Técnico (Técnico)
- Dashboard y sus tickets asignados
- Puede cambiar estado de tickets a "En proceso" o "Completado"
- Vista de equipos del sistema

### Cliente
- Dashboard personalizado con sus propios tickets
- Puede crear nuevos tickets de soporte
- Seguimiento del estado de sus solicitudes

---

## 🛠️ Tecnologías Utilizadas

- **React 18** — Framework UI
- **Context API** — Gestión de estado global
- **CSS-in-JS** — Estilos inline con sistema de diseño consistente
- **Google Fonts** — Syne (display) + Space Mono (código)
- **Lucide React** — Iconografía

---

## ☁️ Despliegue en Vercel

### Opción 1 — Desde la CLI de Vercel

```bash
# Instala Vercel CLI globalmente
npm install -g vercel

# Desde la raíz del proyecto
vercel

# Sigue las instrucciones:
# - Set up and deploy: Y
# - Which scope: (selecciona tu cuenta)
# - Link to existing project: N
# - Project name: csmmc-sat (o el que prefieras)
# - Directory: ./
# - Override build settings: N

# Para producción
vercel --prod
```

### Opción 2 — Desde la interfaz web de Vercel

1. Sube tu proyecto a GitHub (ver instrucciones abajo)
2. Ve a [vercel.com](https://vercel.com) y crea una cuenta (gratis)
3. Haz clic en **"Add New Project"**
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto React (Create React App)
6. Haz clic en **"Deploy"** — ¡listo!

> 💡 Vercel asignará automáticamente una URL del tipo `csmmc-sat.vercel.app`

---

## 📤 Subir a GitHub

```bash
# 1. Inicializa Git en la carpeta del proyecto
git init

# 2. Agrega todos los archivos
git add .

# 3. Primer commit
git commit -m "feat: inicial CSMMC SAT System"

# 4. Crea un repositorio en GitHub (github.com > New repository)
#    Nombre sugerido: csmmc-sat
#    No inicialices con README (ya tienes uno)

# 5. Conecta con el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/csmmc-sat.git

# 6. Sube el código
git branch -M main
git push -u origin main
```

---

## 🎨 Diseño

El sistema usa una paleta dark mode con acentos en cian (`#00d4ff`) y tipografía distintiva:
- **Syne** — Fuente principal (headings y UI)
- **Space Mono** — Fuente monospace (IDs, códigos, datos técnicos)

---

## 📄 Licencia

MIT © 2026 CSMMC — Sistema de Gestión de Servicio Técnico
