# 🏗️ Arquitectura Técnica y Documentación del Proyecto
## **Línea del Tiempo Digital — Historia de los Sistemas Operativos**

> **Autores:** Simón Santiago Puentes Peña & José David Correa Núñez  
> **Proyecto:** Línea del Tiempo Digital de Sistemas Operativos  
> **Repositorio:** [Netherstar44/SistemaOperativo](https://github.com/Netherstar44/SistemaOperativo)

---

## 1. 📐 Nombre y Nombre de la Arquitectura

Este proyecto sigue una arquitectura de tipo **Monorepo Modular Basado en Componentes y Micro-Apps (Monorepo Component-Driven Architecture)**, organizada en tres capas principales:

1. **Arquitectura de Monorepo / Workspaces (`pnpm workspaces`)**: Desacopla el cliente web (frontend SPA), el servidor API backend y el entorno de pruebas en paquetes independientes pero que comparten dependencias y tipos.
2. **Arquitectura Frontend: SPA React Basada en Componentes Declarativos y Lienzo Vectorial de Renderizado Híbrido**:
   - **Renderizado Vectorial SVG Dynamic Graph**: Algoritmo de trazado matemático de curvas de Bézier cúbicas ($S$-curves) para representar relaciones genealógicas entre sistemas operativos.
   - **Lienzo Procedural 2D Canvas (`StationMathCanvas`)**: Motor de gráficos matemáticos en tiempo real que ejecuta simulaciones alusivas a cada estación (anillos de protección de MULTICS, tuberías Unix, módulos de kernel de Linux, registros, etc.).
3. **Arquitectura de Estilos: Sistema Modular de Design Tokens HSL & Retro-Skins Dinámicos (Vanilla CSS + Glassmorphism)**.

---

## 2. 🧰 Stack Tecnológico y Frameworks

### **Frontend (`artifacts/os-history`)**
* **Core & Lenguaje:** React 18 + TypeScript.
* **Empaquetador y Server Dev:** Vite (HMR ultra rápido, compilación ES modules nativa y Rollup para producción).
* **Enrutamiento:** `wouter` (Router declarativo de peso pluma optimizado para SPAs modernas).
* **Gestión de Estado Asíncrono:** `@tanstack/react-query` (React Query) para caché y fetching.
* **Animaciones & Transiciones:** 
  - `framer-motion` (Animación declarativa de componentes, paneles flotantes deslizables, modales y transiciones de estados).
  - `HTML5 Canvas 2D API` (Animaciones matemáticas procedurales por estación).
* **Iconografía:** `lucide-react`.

### **Backend (`artifacts/api-server`)**
* **Entorno de Ejecución:** Node.js + Express con TypeScript.
* **Logging Estructurado:** `pino` & `pino-http`.
* **Seguridad & Middleware:** `cors` (Cross-Origin Resource Sharing).

### **Herramientas de Construcción & CI/CD**
* **Gestor de Paquetes:** `pnpm` v10 con Workspaces (`pnpm-workspace.yaml`).
* **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`).
* **Despliegue / Hosting:** Vercel Production Serverless Edge.

---

## 3. 🎨 Sistema de Diseño y Estilos CSS

El proyecto no utiliza frameworks restrictivos como Tailwind CSS en el núcleo, sino un **Sistema de Diseño Vanilla CSS Personalizado** estructurado mediante:

### **A. Design Tokens con Variables HSL Dinámicas**
Se utilizan variables HSL (`hsl(h s l / alpha)`) para manipular colores, transparencias y sombras de forma matemática:
- `--primary`: Dorado / Ámbar brillante (`hsl(39 100% 64%)`)
- `--accent`: Verde Neón / Menta Tech (`#54d9c0`)
- `--background`: Azul Oscuro Profundo / Deep Navy (`hsl(228 27% 8%)`)
- `--card`: Superficie oscura con opacidad y efecto cristal (`hsl(227 25% 10% / .95)`)

### **B. Efectos Estéticos Avanzados**
* **Glassmorphism:** Paneles superiores y flotantes con `backdrop-filter: blur(18px)` y bordes sutiles en `hsl(var(--border) / .78)`.
* **Micro-animaciones de Nodos:** Pulsaciones glowing (`pulse-node`), órbitas interactivas (`.node-orbit`), e iluminación de rutas activas (`@keyframes conn-flow`) con `stroke-dasharray` animado.
* **Skins/Temas Temáticos Dinámicos por Estación (`themeClass`):**
  - `.theme-crt-green`: Terminal CRT retro con líneas de escaneo analógicas verdes.
  - `.theme-win95`: Barra de título gris estilo Windows 95 con botones retro.
  - `.theme-dos-blue`: Pantalla azul MS-DOS con indicador de prompt `C:\>`.
  - `.theme-aqua`: Estética Mac OS X Aqua con botones semáforo (Traffic lights).
  - `.theme-mobile`: Interfaz limpia estilo dispositivo smartphone.
  - `.theme-tux`: Estética oscura moderna de la familia GNU/Linux.

---

## 4. 🔀 Algoritmos y Componentes Clave

### **A. Algoritmo de Trazado de Curvas SVG ($S$-Curves)**
Para conectar nodos en carriles evolutivos distintos (Apple/Propietarios en Carril 0, UNIX/Linux en Carril 1, Microsoft/Microordenadores en Carril 2), se utiliza una interpolación Bézier cúbica continua:

$$d = \text{M } x_1,y_1 \quad \text{C } (x_1 + \Delta x \cdot 0.48), y_1 \quad (x_2 - \Delta x \cdot 0.48), y_2 \quad x_2, y_2$$

Esto garantiza curvas fluidas que nunca se quiebran visualmente y pasan exactamente por el centro cinemático de los nodos (`margin-left: -50%`, `margin-top: -50%`).

### **B. Panel de Detalle Flotante (`StationDisplay`)**
Implementado como un **Overlay Fijo Deslizable** (`position: fixed; top: 72px; right: 0; bottom: 0; width: min(460px, 100vw)`), lo que permite que el usuario navegue por los detalles técnicos de cualquier sistema operativo sin alterar el tamaño ni romper el scroll horizontal del mapa principal.

### **C. Laboratorio Interactivo de Terminales (`OsTerminals`)**
Simulador de consola multithemed que recrea entornos reales (Unix Bash, Windows CMD, MS-DOS 6.22 y macOS Terminal) ejecutando búferes de salida en tiempo real.

---

## 5. 📁 Estructura del Repositorio

```text
Linea-Digital/
├── artifacts/
│   ├── os-history/              # Frontend Principal (React + Vite + TS)
│   │   ├── public/              # Assets estáticos (Logo del pingüino 🐧, favicon)
│   │   ├── src/
│   │   │   ├── components/      # HistoryApp, Terminals, StationDisplay, MathCanvas
│   │   │   ├── data/            # Grafo de nodos, conexiones y referencias
│   │   │   ├── App.tsx          # Router principal
│   │   │   └── index.css        # Sistema de Diseño CSS completo (1400+ líneas)
│   │   └── vite.config.ts
│   └── api-server/              # Backend API Express
├── scripts/
│   └── vercel-build.cjs         # Script workspace-aware para compilación Vercel
├── .github/workflows/
│   └── deploy.yml               # Pipeline CI/CD GitHub Actions
├── vercel.json                  # Configuración de despliegue en Vercel
├── pnpm-workspace.yaml          # Configuración Monorepo PNPM
└── CORREA.md                    # Documentación Técnica
```

---

## 6. 🚀 Cómo Ejecutar en Local

```bash
# 1. Instalar dependencias del monorepo
pnpm install

# 2. Iniciar el entorno de desarrollo
pnpm run dev
```

---
*Documentación generada para el proyecto académico Línea del Tiempo Digital — Sistemas Operativos.*
