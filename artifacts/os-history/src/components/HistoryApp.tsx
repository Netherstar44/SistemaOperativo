import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, CircleHelp, GitBranch, Layers3, Menu, MonitorPlay, Search, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { connections, families, historyNodes, routeLinuxIds, type HistoryNode, bibliographicReferences, type Reference } from '@/data/os-history';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'timeline' | 'route' | 'compare';

const nodeMap = Object.fromEntries(historyNodes.map((node) => [node.id, node])) as Record<string, HistoryNode>;

function Logo() {
  return <Link href="/" className="brand-mark" data-testid="link-home">
    <span className="brand-symbol" style={{ border: 'none', background: 'none', overflow: 'hidden', borderRadius: '6px' }}>
      <img src="/logo.png" alt="Línea del Tiempo Digital logo" style={{ width: '28px', height: '28px', objectFit: 'contain', display: 'block' }} />
    </span>
    <span className="brand-copy"><strong>LÍNEA DEL TIEMPO</strong><span>Sistemas Operativos</span></span>
  </Link>;
}

function Topbar({ view, onSearch, onPresent, onOpenReferences }: { view: View; onSearch: () => void; onPresent: () => void; onOpenReferences: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="topbar">
    <Logo />
    <nav className="topnav" aria-label="Navegación principal">
      <Link href="/" aria-current={view === 'timeline' ? 'page' : undefined} data-testid="link-timeline">Línea del tiempo</Link>
      <Link href="/ruta-linux" aria-current={view === 'route' ? 'page' : undefined} data-testid="link-route">Ruta Linux</Link>
      <Link href="/comparar" aria-current={view === 'compare' ? 'page' : undefined} data-testid="link-compare">Comparar</Link>
      <button onClick={onPresent} data-testid="button-presentation"><MonitorPlay size={14} /> Presentación</button>
      <button onClick={onOpenReferences} data-testid="button-references"><BookOpen size={14} /> Referencias</button>
    </nav>
    <div className="topbar-actions">
      <button className="search-trigger" onClick={onSearch} data-testid="button-search"><Search size={15} /><span>Buscar</span><kbd>⌘ K</kbd></button>
      <button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú" aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
    </div>
    {menuOpen && <div className="mobile-nav" style={{ position: 'absolute', top: '62px', left: 0, right: 0, padding: '1rem', background: 'hsl(227 25% 11%)', borderBottom: '1px solid hsl(var(--border))', display: 'grid', gap: '.25rem', zIndex: 100 }}>
      <Link href="/" onClick={() => setMenuOpen(false)} data-testid="mobile-link-timeline" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Línea del tiempo</Link>
      <Link href="/ruta-linux" onClick={() => setMenuOpen(false)} data-testid="mobile-link-route" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Ruta Linux</Link>
      <Link href="/comparar" onClick={() => setMenuOpen(false)} data-testid="mobile-link-compare" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Comparar sistemas</Link>
      <button onClick={() => { onPresent(); setMenuOpen(false); }} style={{ textAlign: 'left', color: 'hsl(var(--foreground))', background: 'none', border: 0, padding: '.7rem' }} data-testid="mobile-button-presentation">Modo presentación</button>
      <button onClick={() => { onOpenReferences(); setMenuOpen(false); }} style={{ textAlign: 'left', color: 'hsl(var(--foreground))', background: 'none', border: 0, padding: '.7rem' }} data-testid="mobile-button-references">Referencias bibliográficas</button>
    </div>}
  </header>;
}

function SearchOverlay({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (node: HistoryNode) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return historyNodes.slice(0, 6);
    return historyNodes.filter((node) => `${node.name} ${node.tagline} ${node.family} ${node.year}`.toLowerCase().includes(clean));
  }, [query]);
  useEffect(() => { if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); onClose(); } if (event.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [onClose, open]);
  return <div className={`search-overlay ${open ? 'is-open' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Buscar en la historia">
    <div className="search-dialog">
      <div className="search-input-wrap"><Search size={18} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca un sistema, una persona o una década…" className="search-input" data-testid="input-global-search" /><button className="icon-button" onClick={onClose} aria-label="Cerrar búsqueda" data-testid="button-close-search"><X size={16} /></button></div>
      <div className="search-results">{results.length ? results.map((node) => <button className="search-result" key={node.id} onClick={() => { onSelect(node); onClose(); }} data-testid={`search-result-${node.id}`}><span className="search-result-year">{node.year}</span><span><strong>{node.name}</strong><span>{node.tagline}</span></span><ChevronRight size={15} color="hsl(var(--muted-foreground))" /></button>) : <div className="empty-search">No encontramos un nodo con esa búsqueda. Prueba con «Unix», «móvil» o «1991».</div>}</div>
    </div>
  </div>;
}

function ReferencesOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [onClose, open]);

  return <div className={`references-overlay ${open ? 'is-open' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Referencias bibliográficas">
    <div className="references-dialog">
      <div className="references-header">
        <div className="references-header-left">
          <BookOpen size={20} className="text-primary" />
          <h2 className="display-font">Referencias Bibliográficas</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Cerrar referencias" data-testid="button-close-references"><X size={16} /></button>
      </div>
      <div className="references-body">
        <p className="references-intro">
          Listado de las fuentes históricas, libros fundamentales y portales de documentación técnica que sustentan los datos expuestos en esta línea del tiempo digital:
        </p>
        <div className="references-grid">
          {bibliographicReferences.map((ref, idx) => (
            <div key={idx} className="reference-item">
              <div className="reference-meta">
                <span className={`ref-badge category-${ref.category.toLowerCase().replace(' ', '-')}`}>{ref.category}</span>
                <span className="ref-year">{ref.year}</span>
              </div>
              <h3 className="reference-title">{ref.title}</h3>
              <p className="reference-author">{ref.author}</p>
              <p className="reference-desc">{ref.description}</p>
              {ref.url && <a href={ref.url} target="_blank" rel="noopener noreferrer" className="reference-link">Ver sitio original ↗</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>;
}

function StationMathCanvas({ nodeId, themeClass, color, height = 130 }: { nodeId: string; themeClass: string; color: string; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = containerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const handleResize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (rect.width || 400) * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(wrap);

    const render = () => {
      t += 0.03;
      const w = wrap.clientWidth || 400;
      const h = height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // ── Per-Station Unique Alusive Math Visuals ──────────────────────────────

      if (nodeId === 'multics') {
        // MULTICS: 4 Concentric Protection Rings (Ring 0 Kernel -> Ring 3 User)
        const rings = [14, 26, 38, 50];
        rings.forEach((r, idx) => {
          ctx.strokeStyle = `hsl(205, 50%, ${45 + idx * 10}%)`;
          ctx.lineWidth = idx === 0 ? 3 : 1.5;
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

          const pAngle = t * (idx % 2 === 0 ? 1 : -1) + idx * 1.5;
          const px = cx + Math.cos(pAngle) * r;
          const py = cy + Math.sin(pAngle) * r;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
        });

      } else if (nodeId === 'os360') {
        // IBM OS/360: Dual Mainframe Magnetic Tape Reels
        const offset = Math.min(cx * 0.3, 50);
        [cx - offset, cx + offset].forEach((reelX, idx) => {
          ctx.strokeStyle = '#889eb0';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(reelX, cy, 28, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(reelX, cy, 8, 0, Math.PI * 2); ctx.stroke();

          for (let s = 0; s < 3; s++) {
            const a = (s * Math.PI * 2) / 3 + t * (idx === 0 ? 1.5 : -1.5);
            ctx.beginPath();
            ctx.moveTo(reelX + Math.cos(a) * 8, cy + Math.sin(a) * 8);
            ctx.lineTo(reelX + Math.cos(a) * 26, cy + Math.sin(a) * 26);
            ctx.stroke();
          }
        });
        ctx.strokeStyle = '#54d9c0'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - offset, cy - 28); ctx.lineTo(cx + offset, cy - 28); ctx.stroke();

      } else if (nodeId === 'unix') {
        // UNIX: Command Pipeline (cat | grep | wc)
        const spacing = Math.min(cx * 0.52, 90);
        const stageNames = ['cat file', 'grep "fn"', 'wc -l'];
        const stageXs = [cx - spacing, cx, cx + spacing];
        const bw = 54;
        stageXs.forEach((sx, idx) => {
          ctx.strokeStyle = '#54d9c0';
          ctx.fillStyle = 'rgba(84, 217, 192, 0.12)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(sx - bw / 2, cy - 16, bw, 32);
          ctx.fillRect(sx - bw / 2, cy - 16, bw, 32);

          ctx.fillStyle = '#54d9c0';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(stageNames[idx], sx, cy + 3);
        });

        for (let p = 0; p < 2; p++) {
          const pipeStartX = stageXs[p] + bw / 2;
          const pipeEndX = stageXs[p + 1] - bw / 2;
          ctx.strokeStyle = 'rgba(84, 217, 192, 0.4)';
          ctx.beginPath(); ctx.moveTo(pipeStartX, cy); ctx.lineTo(pipeEndX, cy); ctx.stroke();

          const pulseX = pipeStartX + ((t * 60 + p * 25) % (pipeEndX - pipeStartX));
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(pulseX, cy, 3, 0, Math.PI * 2); ctx.fill();
        }

      } else if (nodeId === 'cp-m') {
        // CP/M: 8-Inch Floppy Disk Sector Sweep & Head Read
        ctx.strokeStyle = '#d99d61'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke();

        const sweepAngle = t * 2;
        ctx.strokeStyle = '#ffff55';
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweepAngle) * 34, cy + Math.sin(sweepAngle) * 34); ctx.stroke();

      } else if (nodeId === 'bsd') {
        // BSD: Berkeley Sockets Network Mesh
        const nodes: [number, number][] = [
          [cx - 55, cy - 18], [cx, cy - 30], [cx + 55, cy - 18],
          [cx - 35, cy + 20], [cx + 35, cy + 20]
        ];
        ctx.strokeStyle = 'rgba(102, 182, 213, 0.45)'; ctx.lineWidth = 1.2;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            ctx.beginPath(); ctx.moveTo(nodes[i][0], nodes[i][1]); ctx.lineTo(nodes[j][0], nodes[j][1]); ctx.stroke();
          }
        }
        nodes.forEach(([nx, ny]) => {
          ctx.fillStyle = '#66b6d5';
          ctx.beginPath(); ctx.arc(nx, ny, 5.5, 0, Math.PI * 2); ctx.fill();
        });

      } else if (nodeId === 'vms') {
        // VAX/VMS: Dave Cutler Virtual Memory Page Table Mapping (Centered bounds)
        ctx.font = '9px monospace';
        ctx.fillStyle = '#a292bf';
        ctx.textAlign = 'center';
        for (let i = 0; i < 4; i++) {
          const vAddr = `VPN_0x${(0x800 + i * 4).toString(16).toUpperCase()}`;
          const pAddr = `PFN_0x${(0x100 + ((i + Math.floor(t)) % 4) * 4).toString(16).toUpperCase()}`;
          const yPos = cy - 22 + i * 14;
          ctx.fillText(`${vAddr}  →  [ ${pAddr} ]`, cx, yPos);
        }

      } else if (nodeId === 'msdos') {
        // MS-DOS: C:\> Command Prompt & Directory Listing (Safe text bounds)
        ctx.fillStyle = '#00ff00';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('C:\\> DIR /B', cx, cy - 14);
        ctx.fillText('COMMAND.COM  MSDOS.SYS  IO.SYS', cx, cy + 6);

        if (Math.floor(t * 3) % 2 === 0) {
          ctx.fillRect(cx + 42, cy - 23, 7, 11);
        }

      } else if (nodeId === 'mac-system1') {
        // System 1: 1-bit Classic Macintosh Desktop Window & Mouse Pointer
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#1a1a1a'; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 55, cy - 26, 110, 52);
        ctx.fillRect(cx - 55, cy - 26, 110, 52);

        ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 55, cy - 26, 110, 11);
        ctx.fillStyle = '#000000'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('System 1.0', cx, cy - 18);

        const mX = cx - 15 + Math.sin(t * 1.2) * 25;
        const mY = cy - 6 + Math.cos(t * 1.2) * 12;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(mX, mY); ctx.lineTo(mX + 9, mY + 9); ctx.lineTo(mX + 3, mY + 9); ctx.closePath();
        ctx.fill();

      } else if (nodeId === 'nextstep') {
        // NeXTSTEP: WorldWideWeb Tim Berners-Lee Server
        ctx.strokeStyle = '#b28ecf'; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 65, cy - 20, 130, 40);

        ctx.fillStyle = '#b28ecf'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('HTTP/1.0 200 OK', cx, cy - 5);
        ctx.fillText('WorldWideWeb NeXT Workstation', cx, cy + 9);

      } else if (nodeId === 'gnu-hurd') {
        // GNU Hurd: Mach Translators & Server Ports
        ctx.fillStyle = '#54d9c0';
        ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('Mach', cx, cy + 3);

        const trans = ['ext2fs', 'pfinet', 'exec', 'auth'];
        trans.forEach((tr, idx) => {
          const a = (idx * Math.PI) / 2 + t * 0.6;
          const tx = cx + Math.cos(a) * 44;
          const ty = cy + Math.sin(a) * 24;

          ctx.strokeStyle = 'rgba(84, 217, 192, 0.6)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tx, ty); ctx.stroke();

          ctx.fillStyle = '#54d9c0'; ctx.fillRect(tx - 18, ty - 7, 36, 14);
          ctx.fillStyle = '#000000'; ctx.font = '7px monospace';
          ctx.fillText(tr, tx, ty + 3);
        });

      } else if (nodeId === 'minix') {
        // MINIX: Tanenbaum Isolated Microkernel IPC Architecture
        ctx.fillStyle = '#54d9c0';
        ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#08060f'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('KERNEL', cx, cy + 3);

        const servers = ['FS', 'MM', 'INIT', 'TTY'];
        servers.forEach((name, sIdx) => {
          const sAngle = (sIdx * Math.PI) / 2 + t * 0.5;
          const sX = cx + Math.cos(sAngle) * 46;
          const sY = cy + Math.sin(sAngle) * 28;

          ctx.strokeStyle = '#54d9c0'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(sX, sY); ctx.stroke();
          ctx.fillStyle = '#54d9c0'; ctx.beginPath(); ctx.arc(sX, sY, 9, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#000000'; ctx.font = '7px monospace'; ctx.fillText(name, sX, sY + 2.5);
        });

      } else if (nodeId === 'linux') {
        // Linux Kernel: Monolithic Core with Loaded .ko Modules
        ctx.strokeStyle = '#f4bf5f'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#f4bf5f'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('vmlinuz', cx, cy + 3);

        for (let m = 0; m < 4; m++) {
          const mA = (m * Math.PI) / 2 + t * 0.8;
          const mX = cx + Math.cos(mA) * 50;
          const mY = cy + Math.sin(mA) * 26;

          ctx.fillStyle = '#f4bf5f'; ctx.fillRect(mX - 14, mY - 7, 28, 14);
          ctx.fillStyle = '#000000'; ctx.font = '7.5px monospace';
          ctx.fillText(['ext4', 'net', 'kvm', 'usb'][m], mX, mY + 3);
        }

      } else if (nodeId === 'windows') {
        // Windows NT: Dave Cutler HAL Architecture Stack
        const layers = ['Win32 Apps', 'Executive Services', 'HAL (Hardware Abstraction)'];
        layers.forEach((layer, lIdx) => {
          const lY = cy - 25 + lIdx * 18;
          ctx.fillStyle = lIdx === 2 ? '#d99d61' : 'rgba(217, 157, 97, 0.2)';
          ctx.strokeStyle = '#d99d61'; ctx.lineWidth = 1.2;
          ctx.fillRect(cx - 80, lY, 160, 14);
          ctx.strokeRect(cx - 80, lY, 160, 14);

          ctx.fillStyle = lIdx === 2 ? '#000000' : '#ffffff';
          ctx.font = '8.5px monospace'; ctx.textAlign = 'center';
          ctx.fillText(layer, cx, lY + 10);
        });

      } else if (nodeId === 'darwin') {
        // Darwin / macOS: XNU Hybrid Kernel (Mach IPC + BSD Syscalls)
        ctx.strokeStyle = '#c9a7ed'; ctx.lineWidth = 1.8;
        ctx.strokeRect(cx - 60, cy - 22, 120, 44);
        ctx.beginPath(); ctx.moveTo(cx, cy - 22); ctx.lineTo(cx, cy + 22); ctx.stroke();

        ctx.fillStyle = '#c9a7ed'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('Mach IPC', cx - 30, cy + 3);
        ctx.fillText('BSD Sys', cx + 30, cy + 3);

      } else if (nodeId === 'debian') {
        // Debian: The Famous Archimedean Red Spiral
        ctx.strokeStyle = '#e60000'; ctx.shadowColor = '#e60000';
        ctx.shadowBlur = 8; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 4; a += 0.08) {
          const r = a * 3.2;
          const pX = cx + Math.cos(a + t) * r;
          const pY = cy + Math.sin(a + t) * r;
          if (a === 0) ctx.moveTo(pX, pY);
          else ctx.lineTo(pX, pY);
        }
        ctx.stroke(); ctx.shadowBlur = 0;

      } else if (nodeId === 'redhat') {
        // Red Hat: 3D RPM Package Matrix & SELinux Security Shield
        ctx.strokeStyle = '#ff3333'; ctx.lineWidth = 2;
        ctx.strokeRect(cx - 40, cy - 25, 80, 50);

        ctx.fillStyle = '#ff3333'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
        ctx.fillText('RPM / SELinux', cx, cy + 3);

        const shieldA = t * 1.5;
        const sX = cx + Math.cos(shieldA) * 55;
        const sY = cy + Math.sin(shieldA) * 22;
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(sX, sY, 4, 0, Math.PI * 2); ctx.fill();

      } else if (nodeId === 'ubuntu') {
        // Ubuntu: Circle of Friends Embracing Arc
        ctx.strokeStyle = '#e95420'; ctx.shadowColor = '#e95420';
        ctx.shadowBlur = 8; ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;

        for (let u = 0; u < 3; u++) {
          const uA = (u * Math.PI * 2) / 3 + t * 0.6;
          const uX = cx + Math.cos(uA) * 28;
          const uY = cy + Math.sin(uA) * 28;

          ctx.fillStyle = '#f9a825';
          ctx.beginPath(); ctx.arc(uX, uY, 6, 0, Math.PI * 2); ctx.fill();
        }

      } else if (nodeId === 'symbian') {
        // Symbian: Nokia Mobile Radio Carrier Signal Wave & Active Objects
        ctx.strokeStyle = '#7ed6a7'; ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = cy + Math.sin(x * 0.05 + t * 3) * 20;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#7ed6a7'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('EPOC Active Objects', cx, cy - 25);

      } else if (nodeId === 'android') {
        // Android: 4 Architecture Layers & Binder IPC Beams
        const aLayers = ['APPS', 'FRAMEWORK', 'ART RUNTIME', 'LINUX KERNEL'];
        aLayers.forEach((lName, aIdx) => {
          const aY = cy - 26 + aIdx * 14;
          ctx.fillStyle = aIdx === 3 ? '#7ed6a7' : 'rgba(126, 214, 167, 0.18)';
          ctx.strokeStyle = '#7ed6a7'; ctx.lineWidth = 1;
          ctx.fillRect(cx - 70, aY, 140, 12);
          ctx.strokeRect(cx - 70, aY, 140, 12);

          ctx.fillStyle = aIdx === 3 ? '#000000' : '#7ed6a7';
          ctx.font = '8px monospace'; ctx.textAlign = 'center';
          ctx.fillText(lName, cx, aY + 9);
        });

      } else if (nodeId === 'ios') {
        // iOS: Multi-Touch Capacitive Ripple & App Sandbox Enclosure
        ctx.strokeStyle = '#7ed6a7'; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 55, cy - 25, 110, 50);

        const t1X = cx - 20, t2X = cx + 20;
        [t1X, t2X].forEach((tX) => {
          const ripR = (t * 18) % 20;
          ctx.strokeStyle = `rgba(126, 214, 167, ${1 - ripR / 20})`;
          ctx.beginPath(); ctx.arc(tX, cy, ripR, 0, Math.PI * 2); ctx.stroke();
        });

      } else if (nodeId === 'cloud') {
        // Cloud: Kubernetes Distributed Container Cluster Mesh
        ctx.fillStyle = '#8b5cf6'; ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.lineWidth = 1.2;

        const kPods: [number, number][] = [];
        for (let p = 0; p < 6; p++) {
          const pA = (p * Math.PI * 2) / 6 + t * 0.7;
          const pX = cx + Math.cos(pA) * 50;
          const pY = cy + Math.sin(pA * 1.4) * 22;
          kPods.push([pX, pY]);
          ctx.shadowColor = '#8b5cf6'; ctx.shadowBlur = 6;
          ctx.beginPath(); ctx.arc(pX, pY, 4.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.shadowBlur = 0;

        for (let i = 0; i < kPods.length; i++) {
          for (let j = i + 1; j < kPods.length; j++) {
            ctx.beginPath(); ctx.moveTo(kPods[i][0], kPods[i][1]); ctx.lineTo(kPods[j][0], kPods[j][1]); ctx.stroke();
          }
        }

      } else if (nodeId === 'amigaos') {
        // AmigaOS: 3D Bouncing Red-White Checkered Boing Ball
        const ballR = 24;
        const bX = cx + Math.sin(t * 1.5) * 50;
        const bY = cy + Math.abs(Math.sin(t * 2)) * -18 + 8;

        ctx.save();
        ctx.beginPath(); ctx.arc(bX, bY, ballR, 0, Math.PI * 2); ctx.clip();
        for (let i = -ballR; i < ballR; i += 7) {
          for (let j = -ballR; j < ballR; j += 7) {
            ctx.fillStyle = ((Math.floor((i + t * 18) / 7) + Math.floor(j / 7)) % 2 === 0) ? '#cc0000' : '#ffffff';
            ctx.fillRect(bX + i, bY + j, 7, 7);
          }
        }
        ctx.restore();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(bX, bY, ballR, 0, Math.PI * 2); ctx.stroke();

      } else if (nodeId === 'beos') {
        // BeOS: BFS File System & Multi-core Audio Stream Equalizer
        ctx.fillStyle = '#ffff55';
        for (let b = 0; b < 12; b++) {
          const barH = 10 + Math.abs(Math.sin(t * 3 + b * 0.5)) * 22;
          const barX = cx - 48 + b * 8;
          ctx.fillRect(barX, cy + 12 - barH, 5, barH);
        }
        ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('BFS Multi-thread Audio', cx, cy - 18);

      } else if (nodeId === 'systemv') {
        // System V: IPC Shared Memory Ring & Semaphores
        ctx.strokeStyle = '#54d9c0'; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 50, cy - 18, 100, 36);

        ctx.fillStyle = '#54d9c0'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('System V IPC', cx, cy - 3);
        ctx.fillText('shmget | semop', cx, cy + 9);

      } else if (nodeId === 'os2') {
        // OS/2: Presentation Manager Dual Window Task Scheduler
        ctx.strokeStyle = '#889eb0'; ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 50, cy - 18, 45, 36);
        ctx.strokeRect(cx + 5, cy - 18, 45, 36);

        ctx.fillStyle = '#889eb0'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('IBM OS/2', cx - 27, cy + 3);
        ctx.fillText('Win16', cx + 27, cy + 3);

      } else if (nodeId === 'aix') {
        // AIX: IBM LVM (Logical Volume Manager) Disk Strips
        const disks = ['PV 0', 'PV 1', 'VG 0'];
        disks.forEach((dName, dIdx) => {
          const dX = cx - 50 + dIdx * 50;
          ctx.strokeStyle = '#889eb0'; ctx.lineWidth = 1.2;
          ctx.strokeRect(dX - 18, cy - 15, 36, 30);

          ctx.fillStyle = '#889eb0'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
          ctx.fillText(dName, dX, cy + 3);
        });

      } else if (nodeId === 'solaris') {
        // Solaris: ZFS Merkle Hash Tree & DTrace Real-time Probe Sparks
        ctx.strokeStyle = '#78c8c2'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(cx - 35, cy + 8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(cx + 35, cy + 8); ctx.stroke();

        [ [cx, cy - 20], [cx - 35, cy + 8], [cx + 35, cy + 8] ].forEach(([nx, ny]) => {
          ctx.fillStyle = '#78c8c2'; ctx.beginPath(); ctx.arc(nx, ny, 5.5, 0, Math.PI * 2); ctx.fill();
        });

        const sparkA = t * 3;
        const spX = cx + Math.sin(sparkA) * 30;
        const spY = cy + Math.cos(sparkA) * 12;
        ctx.fillStyle = '#ffff55'; ctx.beginPath(); ctx.arc(spX, spY, 3, 0, Math.PI * 2); ctx.fill();

      } else if (nodeId === 'plan9') {
        // Plan 9: 9P Protocol Virtual File Tree ("/net", "/dev", "/proc")
        ctx.fillStyle = '#78c8c2'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText('9P Protocol Tree', cx, cy - 16);

        const fNodes = ['/net', '/dev', '/proc'];
        fNodes.forEach((fn, fIdx) => {
          const fX = cx - 45 + fIdx * 45;
          ctx.strokeStyle = '#78c8c2'; ctx.lineWidth = 1;
          ctx.strokeRect(fX - 16, cy - 2, 32, 16);
          ctx.fillText(fn, fX, cy + 9);
        });

      } else {
        // Default Generic Theme Fallback
        ctx.strokeStyle = color || '#f4bf5f'; ctx.shadowColor = color || '#f4bf5f';
        ctx.shadowBlur = 8; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(cx, cy, 40, 20, t * 0.6, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = color || '#f4bf5f'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [nodeId, themeClass, color, height]);

  return (
    <div className="station-math-canvas-wrap" ref={containerRef} style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} className="station-math-canvas" />
      <span className="station-math-badge">⚙ Animación alusiva / {nodeId.toUpperCase()}</span>
    </div>
  );
}

function StationDisplay({
  node,
  onClose,
  onSelectNode,
}: {
  node: HistoryNode;
  onClose: () => void;
  onSelectNode: (node: HistoryNode) => void;
}) {
  const nodeIndex = historyNodes.findIndex((n) => n.id === node.id);
  const prevStation = nodeIndex > 0 ? historyNodes[nodeIndex - 1] : null;
  const nextStation = nodeIndex < historyNodes.length - 1 ? historyNodes[nodeIndex + 1] : null;

  const themeClass = node.themeClass || 'theme-tux';
  const related = [...node.influences, ...node.descendants]
    .map((id) => nodeMap[id])
    .filter(Boolean);

  return (
    <motion.aside
      key={node.id}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 25 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`station-right-panel ${themeClass}`}
      data-era={node.era || 'open'}
    >
      <div className="theme-styled-window">
        {themeClass === 'theme-win95' && (
          <div className="win95-titlebar">
            <span className="win95-title">C:\MUSEO\{node.name.toUpperCase()}.EXE</span>
            <button className="win95-close-btn" onClick={onClose} aria-label="Cerrar estación">x</button>
          </div>
        )}
        {themeClass === 'theme-crt-green' && (
          <div className="crt-terminal-header">
            <span>[STATION_ONLINE] :: {node.name.toUpperCase()} ({node.year})</span>
            <button className="icon-button-sm" onClick={onClose} aria-label="Cerrar estación"><X size={14} /></button>
          </div>
        )}
        {themeClass === 'theme-dos-blue' && (
          <div className="dos-titlebar">
            <span>C:\&gt; RUN {node.name.toUpperCase()}</span>
            <button className="icon-button-sm" onClick={onClose} aria-label="Cerrar estación"><X size={14} /></button>
          </div>
        )}
        {themeClass === 'theme-aqua' && (
          <div className="aqua-titlebar">
            <div className="aqua-traffic-lights">
              <span className="light red" onClick={onClose} />
              <span className="light yellow" />
              <span className="light green" />
            </div>
            <span className="aqua-title">{node.name} — {node.type}</span>
          </div>
        )}
        {themeClass === 'theme-mobile' && (
          <div className="mobile-app-header">
            <span>📱 Estación Móvil / {node.name}</span>
            <button className="icon-button-sm" onClick={onClose} aria-label="Cerrar estación"><X size={14} /></button>
          </div>
        )}
        {themeClass !== 'theme-win95' && themeClass !== 'theme-crt-green' && themeClass !== 'theme-dos-blue' && themeClass !== 'theme-aqua' && themeClass !== 'theme-mobile' && (
          <div className="generic-theme-header">
            <div className="eyebrow" style={{ color: node.color }}>{node.family} / {node.type}</div>
            <button className="icon-button-sm" onClick={onClose} aria-label="Cerrar estación"><X size={14} /></button>
          </div>
        )}

        <div className="theme-styled-body station-body">
          <div className="station-header-row">
            <div>
              <span className="station-year-tag" style={{ background: `${node.color}22`, color: node.color, borderColor: `${node.color}55` }}>
                {node.year}
              </span>
              <h2 className="station-name">{node.name}</h2>
              <p className="station-tagline">&quot;{node.tagline}&quot;</p>
            </div>
          </div>

          {/* Mathematical 2D/3D Procedural Canvas Visualizer */}
          <StationMathCanvas nodeId={node.id} themeClass={themeClass} color={node.color} />

          <p className="station-description">{node.description}</p>

          <div className="theme-visual-cue">
            <span className="cue-icon">✦</span>
            <span className="cue-text">{node.why}</span>
          </div>

          <div className="station-info-grid">
            <div className="info-block">
              <h4>El Contexto Histórico</h4>
              <p>{node.context}</p>
            </div>
            <div className="info-block">
              <h4>Qué Cambió Técnicamente</h4>
              <p>{node.technical}</p>
            </div>
            <div className="info-block">
              <h4>Personas y Equipos</h4>
              <p>{node.people}</p>
            </div>
            <div className="info-block">
              <h4>Legado</h4>
              <p>{node.legacy}</p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="station-related-wrap">
              <h4>Conexiones en la línea del tiempo</h4>
              <div className="station-related-buttons">
                {related.map((item) => (
                  <button
                    key={item.id}
                    className="related-chip"
                    onClick={() => onSelectNode(item)}
                    style={{ '--chip-color': item.color } as CSSProperties}
                  >
                    <span>{item.name} ({item.year})</span>
                    <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="station-footer-actions">
            <a href={node.source.href} target="_blank" rel="noopener noreferrer" className="station-source-link">
              Fuente oficial ↗
            </a>
          </div>

          {/* Station Stepper Navigation */}
          <div className="station-nav-bar">
            <button
              className="ghost-button station-nav-btn"
              disabled={!prevStation}
              onClick={() => prevStation && onSelectNode(prevStation)}
            >
              <ArrowLeft size={13} />
              <span>{prevStation ? prevStation.name : 'Inicio'}</span>
            </button>
            <span className="station-counter">
              {nodeIndex + 1} / {historyNodes.length}
            </span>
            <button
              className="ghost-button station-nav-btn"
              disabled={!nextStation}
              onClick={() => nextStation && onSelectNode(nextStation)}
            >
              <span>{nextStation ? nextStation.name : 'Fin'}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function DetailPanel({ node, onClose, onSelect }: { node: HistoryNode | null; onClose: () => void; onSelect: (node: HistoryNode) => void }) {
  const related = [...node?.influences ?? [], ...node?.descendants ?? []].map((id) => nodeMap[id]).filter(Boolean);
  return <div className={`detail-overlay ${node ? 'is-open' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-hidden={!node}>
    <aside className="detail-panel" aria-label={node ? `Detalles de ${node.name}` : undefined}>
      {node && <><div className="detail-top"><div><div className="eyebrow" style={{ color: node.color }}>{node.family} / {node.type}</div><h2 className="detail-title">{node.name}</h2><div className="detail-year">{node.year}</div></div><button className="icon-button" onClick={onClose} aria-label="Cerrar detalles" data-testid="button-close-detail"><X size={17} /></button></div>
        <p className="detail-description">{node.description}</p>
        <div className="detail-block"><h4>El contexto</h4><p>{node.context}</p></div>
        <div className="detail-block"><h4>Qué cambió técnicamente</h4><p>{node.technical}</p></div>
        <div className="detail-block"><h4>Personas y equipos</h4><p>{node.people}</p></div>
        <div className="detail-block"><h4>¿Por qué importa?</h4><p>{node.why}</p></div>
        <div className="detail-block"><h4>Legado</h4><p>{node.legacy}</p></div>
        {related.length > 0 && <div className="detail-block"><h4>Conexiones en el mapa</h4><div className="detail-links">{related.map((item) => <button className="related-link" key={item.id} onClick={() => onSelect(item)} data-testid={`related-link-${item.id}`}>{item.name} <ChevronRight size={12} style={{ verticalAlign: 'middle' }} /></button>)}</div></div>}
        <a className="source-link" href={node.source.href} target="_blank" rel="noreferrer">Fuente: {node.source.label} ↗</a>
      </>}
    </aside>
  </div>;
}

// ── Lane assignment ──────────────────────────────────────────────────────
// Row 0 (top)    = Apple + BSD lineage
// Row 1 (center) = UNIX + Linux core
// Row 2 (bottom) = Microsoft + microcomputers
const LANE_FAMILIES: Record<string, number> = {
  'Orígenes': 1, 'UNIX': 1, 'Linux': 1, 'Plan 9': 1, 'Solaris': 0,
  'Apple': 0, 'BSD': 0, 'Móvil': 0,
  'Microsoft': 2, 'IBM': 2, 'Personal': 2, 'DEC': 2,
  'Cloud': 1,
};
const LANE_OVERRIDES: Record<string, number> = {
  'multics': 1, 'unix': 1, 'minix': 1, 'gnu-hurd': 1,
  'linux': 1, 'debian': 1, 'ubuntu': 1, 'redhat': 1, 'cloud': 1,
  'bsd': 0, 'nextstep': 0, 'darwin': 0, 'ios': 0, 'mac-system1': 0,
  'systemv': 1, 'plan9': 1, 'solaris': 0, 'aix': 0,
  'android': 1,
  'cp-m': 2, 'msdos': 2, 'windows': 2, 'vms': 2, 'os360': 2,
  'os2': 2, 'amigaos': 2, 'beos': 2, 'symbian': 2,
};
function getLane(node: HistoryNode): number {
  if (LANE_OVERRIDES[node.id] !== undefined) return LANE_OVERRIDES[node.id];
  return LANE_FAMILIES[node.family] ?? 1;
}
function getX(year: number): number {
  const min = 1960, max = 2015;
  return 3 + ((year - min) / (max - min)) * 93;
}
const LANE_Y = [17, 50, 83];

function TimelineMap({ activeFamily, onNode, selected, routeMode, onlyTrunk = true, setOnlyTrunk }: { activeFamily: string; onNode: (node: HistoryNode) => void; selected: HistoryNode | null; routeMode?: boolean; onlyTrunk?: boolean; setOnlyTrunk?: (val: boolean) => void }) {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const visibleNodes = historyNodes.filter((node) =>
    (activeFamily === 'Todos' || node.family === activeFamily) &&
    (!onlyTrunk || node.isTrunk)
  );
  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const activeIds = routeMode ? routeLinuxIds : visibleNodes.map((node) => node.id);
  const relatedIds = selected ? [selected.id, ...selected.influences, ...selected.descendants] : [];

  const filteredConnections = connections.filter(
    (conn) => visibleIds.has(conn.from) && visibleIds.has(conn.to)
  );

  const posMap = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    for (const node of historyNodes) {
      m[node.id] = { x: getX(node.yearNum), y: LANE_Y[getLane(node)] };
    }
    return m;
  }, []);

  // Smooth scroll left timeline to position selected station on the left side
  useEffect(() => {
    if (selected && scrollWrapRef.current) {
      const wrap = scrollWrapRef.current;
      const pos = posMap[selected.id];
      if (pos) {
        const contentWidth = wrap.scrollWidth;
        const targetX = (pos.x / 100) * contentWidth - wrap.clientWidth * 0.15;
        wrap.scrollTo({ left: Math.max(0, targetX), behavior: 'smooth' });
      }
    }
  }, [selected, posMap]);

  return <div className="map-section">
    <div className="map-header">
      <div>
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
          <span>Visualización Genealógica / 01</span>
          <span className="scroll-hint-badge">↔ Desliza la barra horizontal para recorrer 1960–2015</span>
        </div>
        <h2>Mapa Evolutivo de Sistemas Operativos</h2>
        <p>Las conexiones representan líneas de influencia técnica y derivaciones de código.</p>
      </div>
      <div className="map-header-controls">
        {setOnlyTrunk && (
          <div className="toggle-trunk-wrap">
            <span className="toggle-trunk-hint">Vista:</span>
            <div className="toggle-group-custom">
              <button className={`toggle-btn ${onlyTrunk ? 'active' : ''}`} onClick={() => setOnlyTrunk(true)}>Troncos Principales</button>
              <button className={`toggle-btn ${!onlyTrunk ? 'active' : ''}`} onClick={() => setOnlyTrunk(false)}>Ver Todo (Ramas)</button>
            </div>
          </div>
        )}
        <div className="map-legend">
          <span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#f4bf5f' } as CSSProperties} />Linux</span>
          <span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#54d9c0' } as CSSProperties} />Unix</span>
          <span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#c9a7ed' } as CSSProperties} />Apple</span>
          <span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#d99d61' } as CSSProperties} />Microsoft</span>
        </div>
      </div>
    </div>
    
    <div className="map-scroll-wrap" ref={scrollWrapRef} tabIndex={0} aria-label="Contenedor deslizable de la línea del tiempo">
      <div className="map-scroll-content">
        <div className="map-canvas" aria-label="Mapa interactivo de la historia de sistemas operativos">
          {/* Visual lane guides for the 3 horizontal trunk lines */}
          <div className="map-lanes-bg">
            <div className="map-lane-track track-apple"><span className="lane-label">● Apple &amp; Propietarios</span></div>
            <div className="map-lane-track track-unix"><span className="lane-label">● UNIX &amp; Código Abierto (GNU/Linux)</span></div>
            <div className="map-lane-track track-personal"><span className="lane-label">● Microsoft &amp; Microordenadores</span></div>
          </div>

          {/* SVG connections — smooth uniform S-curves passing through station node centers */}
          <svg className="map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {filteredConnections.map((connection) => {
              const from = nodeMap[connection.from];
              const to   = nodeMap[connection.to];
              if (!from || !to) return null;

              const p1 = posMap[from.id];
              const p2 = posMap[to.id];
              if (!p1 || !p2) return null;

              const x1 = p1.x, y1 = p1.y;
              const x2 = p2.x, y2 = p2.y;

              const related     = relatedIds.includes(connection.from) && relatedIds.includes(connection.to);
              const isTrunkConn = from.isTrunk && to.isTrunk;
              const dim         = selected ? !related : (routeMode && (!routeLinuxIds.includes(connection.from) || !routeLinuxIds.includes(connection.to)));

              let d: string;
              const dx = x2 - x1;
              const dy = y2 - y1;

              if (Math.abs(dy) < 0.5) {
                // Straight horizontal line in the same lane
                d = `M${x1},${y1} L${x2},${y2}`;
              } else {
                // Smooth, sweeping S-curve with fluid curvature connecting lanes
                const curvature = Math.max(Math.abs(dx) * 0.48, 3.5);
                const cp1x = x1 + curvature;
                const cp1y = y1;
                const cp2x = x2 - curvature;
                const cp2y = y2;
                d = `M${x1},${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
              }

              const cls = [
                'conn-path',
                related                 ? 'is-related'  : '',
                isTrunkConn && !related ? 'is-trunk'    : '',
                dim                     ? 'is-dim'      : '',
              ].filter(Boolean).join(' ');

              return (
                <path
                  key={`${connection.from}-${connection.to}`}
                  d={d}
                  className={cls}
                />
              );
            })}
          </svg>

          {/* Nodes — centered precisely on node-orbit circle via margins */}
          <AnimatePresence>
            {visibleNodes.map((node) => {
              const pos    = posMap[node.id] || { x: node.x, y: node.y };
              const dimmed = !visibleIds.has(node.id) || (routeMode && !routeLinuxIds.includes(node.id));
              return (
                <motion.button
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: dimmed ? 0.23 : 1, scale: selected?.id === node.id ? 1.09 : 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                  className={`map-node ${selected?.id === node.id ? 'is-selected' : ''} ${dimmed ? 'is-dim' : ''}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    '--node-color': node.color,
                    '--node-size': node.size === 'major' ? '46px' : '32px'
                  } as CSSProperties}
                  onClick={() => onNode(node)}
                  aria-label={`Abrir detalles de ${node.name}`}
                  data-testid={`map-node-${node.id}`}
                >
                  <span className="node-orbit" />
                  <div className="node-labels-wrap">
                    <span className="node-label">{node.name}</span>
                    <span className="node-year">{node.year}</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Horizontal Timeline Ruler Axis */}
        <div className="timeline-ruler-bar" aria-label="Eje cronológico por años">
          <div className="ruler-line" />
          {[1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015].map((yr) => (
            <div key={yr} className="ruler-tick" style={{ left: `${getX(yr)}%` }}>
              <span className="tick-mark" />
              <span className="tick-label">{yr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="mobile-timeline">
      {historyNodes.filter((node) => activeIds.includes(node.id)).sort((a, b) => a.yearNum - b.yearNum).map((node) => <button className="mobile-node" key={node.id} style={{ '--node-color': node.color } as CSSProperties} onClick={() => onNode(node)} data-testid={`mobile-node-${node.id}`}><span className="mobile-node-year">{node.year}</span><span className="mobile-node-content"><strong>{node.name}</strong><span>{node.tagline}</span></span></button>)}
    </div>
    <div className="map-caption"><CircleHelp size={14} /><span>Haz clic en un nodo para ver los detalles. El modo &quot;Troncos Principales&quot; resalta el camino evolutivo principal, ocultando ramificaciones menores.</span></div>
  </div>;
}

// ── OS Terminal Simulator ─────────────────────────────────────────────────

type TerminalCmd = { label: string; description: string; output: string };
type OsTerminalDef = {
  id: string; name: string; subtitle: string; accent: string; bg: string;
  headerBg: string; headerLabel?: string; headerDots?: string[];
  prompt: string; commands: TerminalCmd[];
};

const OS_TERMINAL_DEFS: OsTerminalDef[] = [
  {
    id: 'unix', name: 'UNIX / Bash', subtitle: '1969 · Bell Labs', accent: '#33ff77',
    bg: '#0a0f0a', headerBg: '#1c2a1c', headerDots: ['#ff5f56','#ffbd2e','#27c93f'],
    prompt: 'user@unix:~$',
    commands: [
      { label: 'uname -a', description: 'Información del kernel',
        output: 'Linux unix-machine 5.15.0-generic #72 SMP x86_64 GNU/Linux' },
      { label: 'whoami', description: 'Usuario actual',
        output: 'root' },
      { label: 'ls -la /', description: 'Listar directorio raíz',
        output: 'total 72\ndrwxr-xr-x  18 root root  4096 /\ndrwxr-xr-x   2 root root  4096 bin\ndrwxr-xr-x   3 root root  4096 boot\ndrwxr-xr-x 132 root root  4096 etc\ndrwxr-xr-x   3 root root  4096 home\ndrwxr-xr-x  22 root root  4096 lib\ndrwxr-xr-x   5 root root  4096 usr\ndrwxr-xr-x  13 root root  4096 var' },
      { label: 'ps aux | head', description: 'Procesos activos',
        output: 'USER     PID %CPU %MEM COMMAND\nroot       1  0.0  0.1 /sbin/init\nroot       2  0.0  0.0 [kthreadd]\nroot       3  0.0  0.0 [rcu_gp]\nbash    4096  0.1  0.2 -bash' },
      { label: 'df -h', description: 'Espacio en disco',
        output: 'Filesystem   Size  Used Avail Use% Mounted\n/dev/sda1     40G  8.2G   30G  22% /\ntmpfs        2.0G     0  2.0G   0% /dev/shm\n/dev/sda2    100G   45G   50G  47% /home' },
      { label: 'ifconfig lo', description: 'Interfaz de red loopback',
        output: 'lo: flags=73<UP,LOOPBACK>  mtu 65536\n    inet 127.0.0.1  netmask 255.0.0.0\n    inet6 ::1  prefixlen 128\n    TX packets 1000  bytes 96000' },
      { label: 'cat /proc/version', description: 'Versión del kernel Linux',
        output: 'Linux version 5.15.0-generic (gcc version 11.3.0) #72-Ubuntu SMP' },
      { label: 'echo $SHELL', description: 'Shell activo',
        output: '/bin/bash' },
    ],
  },
  {
    id: 'windows', name: 'Windows CMD', subtitle: '1993 · Microsoft NT',
    accent: '#c8c8c8', bg: '#0c0c0c', headerBg: '#0078d7',
    headerLabel: 'C:\\Windows\\System32\\cmd.exe', prompt: 'C:\\Users\\Admin>',
    commands: [
      { label: 'ver', description: 'Versión de Windows',
        output: '\nMicrosoft Windows [Version 10.0.19044.2006]\n(c) Microsoft Corporation. All rights reserved.' },
      { label: 'ipconfig', description: 'Configuración de red',
        output: 'Windows IP Configuration\n\nEthernet adapter Ethernet:\n   IPv4 Address. . : 192.168.1.10\n   Subnet Mask . . : 255.255.255.0\n   Default Gateway : 192.168.1.1' },
      { label: 'systeminfo', description: 'Información del sistema',
        output: 'Host Name:    DESKTOP-MUSEO\nOS Name:      Microsoft Windows 10 Pro\nOS Version:   10.0.19044 Build 19044\nSystem Type:  x64-based PC\nTotal RAM:    16,384 MB\nAvail RAM:     8,192 MB' },
      { label: 'tasklist', description: 'Lista de procesos activos',
        output: 'Image Name          PID  Session\n=================== ==== =======\nSystem                4  Services\nsmss.exe            376  Services\nexplorer.exe       4256  Console\ncmd.exe            5120  Console' },
      { label: 'dir C:\\', description: 'Directorio del sistema',
        output: ' Directory of C:\\\n\n08/09/2022  <DIR>  Windows\n08/09/2022  <DIR>  Program Files\n08/09/2022  <DIR>  Users\n\n  4 Dir(s)  125,432,221,696 bytes free' },
      { label: 'netstat -n', description: 'Conexiones de red activas',
        output: 'Active Connections\n\n  Proto  Local Address      Foreign Address    State\n  TCP    127.0.0.1:5173    0.0.0.0:0          LISTENING\n  TCP    192.168.1.10:443  142.250.80.46:443  ESTABLISHED' },
      { label: 'set OS', description: 'Variable de entorno OS',
        output: 'OS=Windows_NT' },
      { label: 'echo %PROCESSOR_ARCHITECTURE%', description: 'Arquitectura del procesador',
        output: 'AMD64' },
    ],
  },
  {
    id: 'msdos', name: 'MS-DOS 6.22', subtitle: '1981 · IBM PC',
    accent: '#e0e0e0', bg: '#000080', headerBg: '#000066',
    headerLabel: 'MS-DOS Prompt', prompt: 'C:\\>',
    commands: [
      { label: 'VER', description: 'Versión de MS-DOS',
        output: '\nMS-DOS Version 6.22\n' },
      { label: 'MEM', description: 'Memoria disponible',
        output: 'Memory Type     Total   Used    Free\n──────────────  ─────── ─────── ───────\nConventional     640K    85K     555K\nUpper             64K    32K      32K\nExtended      15,360K  2,048K 13,312K\n────────────────────────────────────\nTotal:        16,064K  2,165K 13,899K' },
      { label: 'DIR', description: 'Directorio actual',
        output: ' Volume in drive C is MS-DOS_622\n\nDirectory of C:\\\n\nCOMMAND  COM    54,645 09-30-93\nAUTOEXEC BAT       256 08-01-94\nCONFIG   SYS       512 08-01-94\nDOS      <DIR>         08-01-94\n  3 file(s)    55,413 bytes free' },
      { label: 'CHKDSK C:', description: 'Verificar disco',
        output: 'Volume MS-DOS_622 created 08-01-1994\n\n  209,715,200 bytes total disk space\n      614,400 bytes in 5 directories\n   10,223,616 bytes in 28 user files\n  198,877,184 bytes available' },
      { label: 'SET', description: 'Variables de entorno',
        output: 'COMSPEC=C:\\COMMAND.COM\nPATH=C:\\;C:\\DOS\nPROMPT=$p$g\nTEMP=C:\\TEMP' },
      { label: 'TYPE AUTOEXEC.BAT', description: 'Ver archivo de arranque',
        output: '@ECHO OFF\nPATH C:\\;C:\\DOS\nSET TEMP=C:\\TEMP\nPROMPT $P$G\nC:\\DOS\\SMARTDRV.EXE\nLH C:\\DOS\\MSCDEX.EXE /D:MSCD001' },
      { label: 'TIME', description: 'Hora actual del sistema',
        output: 'Current time is  9:00:00.00a\nEnter new time: _' },
      { label: 'DATE', description: 'Fecha actual del sistema',
        output: 'Current date is Wed 08-09-1994\nEnter new date (mm-dd-yy): _' },
    ],
  },
  {
    id: 'macos', name: 'macOS Terminal', subtitle: '2001 · Apple Darwin/XNU',
    accent: '#64d2ff', bg: '#1e1e2e', headerBg: '#313244',
    headerDots: ['#ff5f56','#ffbd2e','#27c93f'], prompt: 'user@MacBook ~ %',
    commands: [
      { label: 'sw_vers', description: 'Versión de macOS',
        output: 'ProductName:    macOS\nProductVersion: 13.0.1\nBuildVersion:   22A400' },
      { label: 'uname -a', description: 'Información del kernel XNU',
        output: 'Darwin MacBook.local 22.1.0 Darwin Kernel Version 22.1.0; root:xnu-8792.41.9~2/RELEASE_X86_64 x86_64' },
      { label: 'sysctl -n machdep.cpu.brand_string', description: 'CPU del sistema',
        output: 'Apple M1 Pro' },
      { label: 'system_profiler SPSoftwareDataType', description: 'Perfil del software',
        output: 'Software:\n  System Software Overview:\n    System Version: macOS 13.0.1 (22A400)\n    Kernel Version: Darwin 22.1.0\n    Boot Mode: Normal\n    Computer Name: MacBook Pro' },
      { label: 'ls -la ~', description: 'Directorio home',
        output: 'total 0\ndrwxr-xr-x+ 25 user staff  800 Aug  9 Desktop\ndrwxr-xr-x+ 12 user staff  384 Aug  9 Documents\ndrwxr-xr-x+ 10 user staff  320 Aug  9 Downloads\ndrwxr-xr-x+  4 user staff  128 Aug  9 Library' },
      { label: 'networksetup -listallhardwareports', description: 'Puertos de red',
        output: 'Hardware Port: Wi-Fi\nDevice: en0\nEthernet Address: aa:bb:cc:dd:ee:ff\n\nHardware Port: Bluetooth PAN\nDevice: en3' },
      { label: 'brew --version', description: 'Versión de Homebrew',
        output: 'Homebrew 3.6.3' },
      { label: 'uptime', description: 'Tiempo de actividad',
        output: ' 9:00  up 3 days,  2:15, 1 user, load averages: 0.80 0.71 0.62' },
    ],
  },
];

type TerminalEntry = { cmd: string; output: string };

function OsTerminalCard({ def }: { def: OsTerminalDef }) {
  const [history, setHistory] = useState<TerminalEntry[]>([
    { cmd: '', output: `${def.name} — Terminal interactiva del museo\nHaz clic en cualquier comando de la lista para ejecutarlo.` },
  ]);
  const [running, setRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const run = (cmd: TerminalCmd) => {
    if (running) return;
    setRunning(true);
    setHistory((h) => [...h, { cmd: cmd.label, output: '...' }]);
    setTimeout(() => {
      setHistory((h) => {
        const copy = [...h];
        copy[copy.length - 1] = { cmd: cmd.label, output: cmd.output };
        return copy;
      });
      setRunning(false);
    }, 320);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const clear = () => setHistory([{ cmd: '', output: `${def.name} — Terminal interactiva del museo\nHaz clic en cualquier comando de la lista para ejecutarlo.` }]);

  return (
    <div className="os-term-card">
      {/* Terminal window */}
      <div className="os-term-window" style={{ '--term-accent': def.accent, '--term-bg': def.bg } as CSSProperties}>
        {/* Window chrome */}
        <div className="os-term-chrome" style={{ background: def.headerBg }}>
          {def.headerDots ? (
            <div className="os-term-dots">
              {def.headerDots.map((c, i) => <span key={i} style={{ background: c }} />)}
            </div>
          ) : null}
          <span className="os-term-title">{def.headerLabel || def.name}</span>
          <button className="os-term-clear" onClick={clear} title="Limpiar terminal">⌫</button>
        </div>
        {/* Output */}
        <div className="os-term-output" ref={outputRef} style={{ background: def.bg }}>
          {history.map((entry, i) => (
            <div key={i} className="os-term-entry">
              {entry.cmd && (
                <div className="os-term-cmd-line">
                  <span className="os-term-prompt">{def.prompt}</span>
                  <span className="os-term-typed">{entry.cmd}</span>
                </div>
              )}
              <pre className="os-term-result">{entry.output}</pre>
            </div>
          ))}
          <div className="os-term-cursor-line">
            <span className="os-term-prompt">{def.prompt}</span>
            <span className={`os-term-cursor ${running ? '' : 'is-blinking'}`}>▋</span>
          </div>
        </div>
      </div>
      {/* Command list */}
      <div className="os-term-cmdlist">
        <div className="os-term-cmdlist-header">
          <span>Comandos disponibles</span>
          <span className="os-term-os-badge" style={{ color: def.accent }}>{def.subtitle}</span>
        </div>
        <ul>
          {def.commands.map((cmd) => (
            <li key={cmd.label}>
              <button
                className={`os-term-cmd-btn ${running ? 'is-disabled' : ''}`}
                onClick={() => run(cmd)}
                disabled={running}
                title={cmd.description}
              >
                <code>{cmd.label}</code>
                <span>{cmd.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OsTerminals() {
  return (
    <section className="os-terminals-section">
      <div className="os-terminals-header">
        <div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>Laboratorio interactivo</div>
        <h2>Terminales de sistemas operativos</h2>
        <p>Explora cómo cada sistema operativo presenta su información al usuario. Haz clic en cualquier comando para ver la salida simulada.</p>
      </div>
      <div className="os-terminals-grid">
        {OS_TERMINAL_DEFS.map((def) => (
          <OsTerminalCard key={def.id} def={def} />
        ))}
      </div>
    </section>
  );
}

function Landing({ onNode, onSearch, onPresent, onRoute }: { onNode: (node: HistoryNode) => void; onSearch: () => void; onPresent: () => void; onRoute: () => void }) {
  const [family, setFamily] = useState<string>('Todos');
  const [selected, setSelected] = useState<HistoryNode | null>(null);
  const [onlyTrunk, setOnlyTrunk] = useState<boolean>(true); // Default to clean trunk view
  const select = (node: HistoryNode) => { setSelected(node); onNode(node); };
  return <><main className="page-wrap">
    <section className="hero"><div className="fade-up"><div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>Archivo vivo / 1950 — presente</div><h1>La historia de los<br /><span>sistemas operativos.</span></h1><p>Un mapa interactivo diseñado para entender cómo viajan las ideas: de los primeros mainframes a Unix, del microkernel a Linux y del kernel a la nube distribuida.</p><div className="hero-meta"><span className="meta-pill"><Layers3 size={12} /> {historyNodes.length} hitos</span><span className="meta-pill"><GitBranch size={12} /> {connections.length} conexiones</span><span className="meta-pill"><BookOpen size={12} /> lectura guiada</span></div></div><div className="hero-note fade-up delay-1"><strong>Camino principal y Ramificaciones.</strong> Los troncos representan las grandes autopistas evolutivas. Las ramas laterales muestran evoluciones e inventos concretos de cada época.</div></section>
    <div className="toolbar fade-up delay-2"><div className="filter-row" role="tablist" aria-label="Filtrar por familia">{families.map((item) => <button key={item} className={`filter-chip ${family === item ? 'is-active' : ''}`} onClick={() => setFamily(item)} role="tab" aria-selected={family === item} data-testid={`filter-${item.toLowerCase()}`}>{item}</button>)}</div><div className="toolbar-right"><button className="ghost-button" onClick={onRoute} data-testid="button-start-route"><GitBranch size={14} /> Ruta Linux</button><button className="ghost-button" onClick={onPresent} data-testid="button-start-presentation"><MonitorPlay size={14} /></button></div></div>
    <div className={`map-split-layout ${selected ? 'has-station-open' : ''} fade-up delay-3`}>
      <div className="map-left-col">
        <TimelineMap activeFamily={family} onNode={select} selected={selected} onlyTrunk={onlyTrunk} setOnlyTrunk={setOnlyTrunk} />
      </div>
      {selected && (
        <AnimatePresence mode="wait">
          <StationDisplay
            key={selected.id}
            node={selected}
            onClose={() => setSelected(null)}
            onSelectNode={select}
          />
        </AnimatePresence>
      )}
    </div>
    <section className="content-grid"><article className="info-card linux-route-card"><div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>Recorrido recomendado</div><h2>La historia de Linux</h2><p>Una ruta de ocho estaciones para seguir el hilo completo: el lenguaje de Unix, la lección de MINIX, el kernel, las comunidades y la nube.</p><div className="route-steps">{routeLinuxIds.map((id, index) => <span className="route-step" key={id}><b>{String(index + 1).padStart(2, '0')}</b><span>{nodeMap[id].name}</span>{index < routeLinuxIds.length - 1 && <i className="route-line" />}</span>)}</div><button className="primary-button" style={{ marginTop: '1.4rem', position: 'relative', zIndex: 1 }} onClick={onRoute} data-testid="button-enter-linux-route">Entrar en la ruta <ArrowRight size={15} /></button></article><article className="info-card"><div className="eyebrow">El archivo en números</div><h2>Muchas ramas, una conversación</h2><p>Las familias no evolucionan aisladas. Comparten ideas, compiten por usuarios y remezclan soluciones de épocas anteriores.</p><div className="stat-list"><div className="stat"><strong>75+</strong><span>años de historia</span></div><div className="stat"><strong>10+</strong><span>familias visibles</span></div><div className="stat"><strong>∞</strong><span>nuevos caminos</span></div></div><button className="ghost-button" style={{ marginTop: '1.4rem' }} onClick={onSearch} data-testid="button-explore-search"><Search size={14} /> Explorar el archivo</button></article></section>
    <OsTerminals />
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <img src="/logo.png" alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          <span><strong>Línea del Tiempo Digital</strong> · Sistemas Operativos</span>
        </div>
        <div className="site-footer-credits">
          <span>Desarrollado por</span>
          <span className="site-footer-authors">
            <strong>Simón Santiago Puentes Peña</strong>
            <span className="footer-sep">&amp;</span>
            <strong>José David Correa Núñez</strong>
          </span>
        </div>
        <div className="site-footer-copy">
          Proyecto académico · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  </main></>;
}

function LinuxRoute({ onNode, onPresent }: { onNode: (node: HistoryNode) => void; onPresent: () => void }) {
  const [index, setIndex] = useState(0);
  const current = nodeMap[routeLinuxIds[index]];
  const previousNode = index > 0 ? nodeMap[routeLinuxIds[index - 1]] : null;
  const nextNode = index < routeLinuxIds.length - 1 ? nodeMap[routeLinuxIds[index + 1]] : null;
  const previous = () => setIndex((value) => Math.max(0, value - 1));
  const next = () => { if (index < routeLinuxIds.length - 1) setIndex((value) => value + 1); else onPresent(); };

  const currentTheme = current?.themeClass || 'theme-tux';

  return <main className={`page-wrap route-page ${currentTheme}`} data-era={current?.era ?? 'open'}>
    <div className="theme-frame-decorator" aria-hidden="true">
      {currentTheme === 'theme-crt-green' && <div className="crt-scanlines"></div>}
      {currentTheme === 'theme-win95' && <div className="win95-desktop-bg"></div>}
    </div>
    
    <section className="route-intro">
      <div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>Ruta Linux / recorrido guiado</div>
      <h1>De una habitación<br />a <span>todo el planeta.</span></h1>
      <p>Ocho estaciones, en orden histórico, para distinguir una influencia real de una simple coincidencia: Unix abre la puerta, MINIX enseña, Linux conecta y la infraestructura escala.</p>
    </section>
    
    <div className="route-progress" aria-label={`Progreso: estación ${index + 1} de ${routeLinuxIds.length}`}>
      <span className="progress-label">{String(index + 1).padStart(2, '0')} / {String(routeLinuxIds.length).padStart(2, '0')}</span>
      <div className="progress-track"><div className="progress-value" style={{ width: `${((index + 1) / routeLinuxIds.length) * 100}%` }} /></div>
      <span className="progress-label">{current?.year}</span>
    </div>
    
    <div className="route-station-rail" role="list" aria-label="Estaciones de la Ruta Linux">
      {routeLinuxIds.map((id, stationIndex) => { 
        const station = nodeMap[id]; 
        return <button key={id} className={`station-stop ${stationIndex < index ? 'is-complete' : ''} ${stationIndex === index ? 'is-active' : ''}`} onClick={() => setIndex(stationIndex)} role="listitem" aria-current={stationIndex === index ? 'step' : undefined} data-testid={`route-station-${id}`}><b>{String(stationIndex + 1).padStart(2, '0')}</b><span>{station.name}</span></button>; 
      })}
    </div>
    
    <div className="station-transition" aria-live="polite">
      {previousNode ? `Desde ${previousNode.name}` : 'Punto de partida'} · {nextNode ? `sigue ${nextNode.name}` : 'última estación'}
    </div>
    
    <AnimatePresence mode="wait">
      <motion.article 
        key={current?.id} 
        className="route-story-frame"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
      >
        <div className="theme-styled-window">
          {currentTheme === 'theme-win95' && (
            <div className="win95-titlebar">
              <span className="win95-title">C:\WINDOWS\SYSTEM\STATION_{current.name.toUpperCase()}.EXE</span>
              <button className="win95-close-btn" disabled>x</button>
            </div>
          )}
          {currentTheme === 'theme-crt-green' && (
            <div className="crt-terminal-header">
              <span>SYS_INIT: {current.name.toUpperCase()} (ONLINE)</span>
            </div>
          )}
          <div className="theme-styled-body">
            <div className="route-story-year">{current?.year}</div>
            <StationMathCanvas nodeId={current?.id || 'linux'} themeClass={currentTheme} color={current?.color || '#f4bf5f'} height={135} />
            <div className="story-content-grid">
              <div>
                <div className="eyebrow" style={{ color: current?.color }}>{current?.family} / {current?.type}</div>
                <h2>{current?.name}: {current?.tagline}</h2>
                <p className="description-text">{current?.description}</p>
                
                <div className="theme-visual-cue">
                  <span className="cue-icon">✦</span>
                  <span className="cue-text">{current?.why}</span>
                </div>

                <div className="route-actions">
                  <button className="ghost-button" onClick={() => onNode(current)} data-testid="button-route-details">Abrir ficha <ChevronRight size={14} /></button>
                  <button className="primary-button" onClick={next} data-testid="button-route-next">{index === routeLinuxIds.length - 1 ? 'Ver en presentación' : 'Siguiente estación'} <ArrowRight size={15} /></button>
                </div>
              </div>
              <aside className="route-story-aside">
                <strong>La conexión</strong>
                <p>{current?.context}</p>
                <strong style={{ marginTop: '1.1rem' }}>Legado técnico</strong>
                <p>{current?.legacy}</p>
              </aside>
            </div>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>

    <div className="route-actions-bottom">
      <button className="ghost-button" onClick={previous} disabled={index === 0} data-testid="button-route-previous"><ArrowLeft size={14} /> Anterior</button>
      <button className="ghost-button" onClick={onPresent} data-testid="button-route-presentation"><MonitorPlay size={14} /> Presentar ruta</button>
    </div>
  </main>;
}

function ComparePage() {
  const [left, setLeft] = useState('linux');
  const [right, setRight] = useState('windows');
  const a = nodeMap[left]; const b = nodeMap[right];
  const rows: [string, string, string][] = [['Origen', a.context.split('.')[0], b.context.split('.')[0]], ['Año de referencia', a.year, b.year], ['Arquitectura', a.technical.split('.')[0], b.technical.split('.')[0]], ['Propósito', a.type, b.type], ['Personas clave', a.people, b.people], ['Influencia', a.legacy, b.legacy], ['La idea central', a.why, b.why]];
  return <main className="page-wrap compare-page"><section className="compare-title"><div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>Mesa de comparación / archivo 02</div><h1>Dos sistemas.<br /><span style={{ color: 'hsl(var(--primary))' }}>Dos respuestas.</span></h1><p>Comparar no es decidir cuál gana. Es observar qué problema resolvía cada sistema y qué mundo técnico imaginaba.</p></section><div className="compare-selectors"><select className="compare-select" value={left} onChange={(event) => setLeft(event.target.value)} aria-label="Primer sistema" data-testid="select-compare-left">{historyNodes.map((node) => <option key={node.id} value={node.id}>{node.name} — {node.year}</option>)}</select><div className="versus">VS</div><select className="compare-select" value={right} onChange={(event) => setRight(event.target.value)} aria-label="Segundo sistema" data-testid="select-compare-right">{historyNodes.map((node) => <option key={node.id} value={node.id}>{node.name} — {node.year}</option>)}</select></div><div className="compare-table">{rows.map(([label, first, second]) => <div className="compare-row" key={label}><div className="compare-label">{label}</div><div className="compare-value" style={{ borderTop: `2px solid ${a.color}` }}>{first}</div><div className="compare-value" style={{ borderTop: `2px solid ${b.color}` }}>{second}</div></div>)}</div></main>;
}

function Presentation({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const node = historyNodes[index];
  const move = (delta: number) => setIndex((value) => Math.min(historyNodes.length - 1, Math.max(0, value + delta)));
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); });

  const currentTheme = node?.themeClass || 'theme-tux';

  return <div className={`presentation ${currentTheme}`}>
    <div className="theme-frame-decorator" aria-hidden="true">
      {currentTheme === 'theme-crt-green' && <div className="crt-scanlines"></div>}
      {currentTheme === 'theme-win95' && <div className="win95-desktop-bg"></div>}
    </div>

    <AnimatePresence mode="wait">
      <motion.div 
        key={node.id}
        className="presentation-card-wrap"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
      >
        <div className="theme-styled-window">
          {currentTheme === 'theme-win95' && (
            <div className="win95-titlebar">
              <span className="win95-title">Exhibición - {node.name}</span>
              <button className="win95-close-btn" onClick={onClose}>x</button>
            </div>
          )}
          {currentTheme === 'theme-crt-green' && (
            <div className="crt-terminal-header">
              <span>EXHIBIT_SLIDE: {node.name.toUpperCase()} (SYS_INFO)</span>
            </div>
          )}
          <div className="theme-styled-body">
            <div className="presentation-card">
              <div className="eyebrow" style={{ color: node.color }}>{node.family} / {node.year}</div>
              <h1 className="display-font">{node.name}</h1>
              <StationMathCanvas nodeId={node.id} themeClass={currentTheme} color={node.color} height={150} />
              <p className="presentation-tagline"><strong>{node.tagline}</strong></p>
              <p className="presentation-desc">{node.description}</p>
              
              <div className="presentation-details-grid">
                <div className="pres-detail-block">
                  <span>El Impacto</span>
                  <p>{node.why}</p>
                </div>
                <div className="pres-detail-block">
                  <span>Arquitectura</span>
                  <p>{node.technical}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

    <div className="presentation-controls">
      <button className="icon-button" onClick={() => move(-1)} aria-label="Anterior" data-testid="presentation-previous"><ArrowLeft size={17} /></button>
      <span className="presentation-count">{String(index + 1).padStart(2, '0')} — {String(historyNodes.length).padStart(2, '0')}</span>
      <button className="icon-button" onClick={() => move(1)} aria-label="Siguiente" data-testid="presentation-next"><ArrowRight size={17} /></button>
      <button className="icon-button" onClick={onClose} aria-label="Salir de presentación" data-testid="presentation-close"><X size={17} /></button>
    </div>
    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'hsl(var(--muted-foreground))', font: '.62rem var(--app-font-mono)', zIndex: 10 }}>ESC para salir</div>
  </div>;
}

export function HistoryApp() {
  const [location, setLocation] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [detail, setDetail] = useState<HistoryNode | null>(null);
  const [presentation, setPresentation] = useState(false);
  const [referencesOpen, setReferencesOpen] = useState(false);
  const view: View = location === '/ruta-linux' ? 'route' : location === '/comparar' ? 'compare' : 'timeline';
  
  useEffect(() => { const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  
  const selectNode = (node: HistoryNode) => { setDetail(node); if (view !== 'timeline') setLocation('/'); };
  
  return <div className="museum-app">
    <Topbar view={view} onSearch={() => setSearchOpen(true)} onPresent={() => setPresentation(true)} onOpenReferences={() => setReferencesOpen(true)} />
    {view === 'timeline' && <Landing onNode={selectNode} onSearch={() => setSearchOpen(true)} onPresent={() => setPresentation(true)} onRoute={() => setLocation('/ruta-linux')} />}
    {view === 'route' && <LinuxRoute onNode={selectNode} onPresent={() => setPresentation(true)} />}
    {view === 'compare' && <ComparePage />}
    
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={selectNode} />
    <ReferencesOverlay open={referencesOpen} onClose={() => setReferencesOpen(false)} />
    
    {view !== 'timeline' && <DetailPanel node={detail} onClose={() => setDetail(null)} onSelect={selectNode} />}
    {presentation && <Presentation onClose={() => setPresentation(false)} />}
  </div>;
}