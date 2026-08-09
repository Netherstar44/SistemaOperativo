import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, CircleHelp, GitBranch, Layers3, Menu, MonitorPlay, Network, Search, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { connections, families, getNode, historyNodes, routeLinuxIds, type Family, type HistoryNode } from '@/data/os-history';

type View = 'timeline' | 'route' | 'compare';

const nodeMap = Object.fromEntries(historyNodes.map((node) => [node.id, node])) as Record<string, HistoryNode>;

function Logo() {
  return <Link href="/" className="brand-mark" data-testid="link-home">
    <span className="brand-symbol"><Network size={15} /></span>
    <span className="brand-copy"><strong>LA HISTORIA</strong><span>de los sistemas operativos</span></span>
  </Link>;
}

function Topbar({ view, onSearch, onPresent }: { view: View; onSearch: () => void; onPresent: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="topbar">
    <Logo />
    <nav className="topnav" aria-label="Navegación principal">
      <Link href="/" aria-current={view === 'timeline' ? 'page' : undefined} data-testid="link-timeline">Línea del tiempo</Link>
      <Link href="/ruta-linux" aria-current={view === 'route' ? 'page' : undefined} data-testid="link-route">Ruta Linux</Link>
      <Link href="/comparar" aria-current={view === 'compare' ? 'page' : undefined} data-testid="link-compare">Comparar</Link>
      <button onClick={onPresent} data-testid="button-presentation"><MonitorPlay size={14} /> Presentación</button>
    </nav>
    <div className="topbar-actions">
      <button className="search-trigger" onClick={onSearch} data-testid="button-search"><Search size={15} /><span>Buscar</span><kbd>⌘ K</kbd></button>
      <button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú" aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
    </div>
    {menuOpen && <div className="mobile-nav" style={{ position: 'absolute', top: '62px', left: 0, right: 0, padding: '1rem', background: 'hsl(227 25% 11%)', borderBottom: '1px solid hsl(var(--border))', display: 'grid', gap: '.25rem' }}>
      <Link href="/" onClick={() => setMenuOpen(false)} data-testid="mobile-link-timeline" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Línea del tiempo</Link>
      <Link href="/ruta-linux" onClick={() => setMenuOpen(false)} data-testid="mobile-link-route" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Ruta Linux</Link>
      <Link href="/comparar" onClick={() => setMenuOpen(false)} data-testid="mobile-link-compare" style={{ color: 'hsl(var(--foreground))', textDecoration: 'none', padding: '.7rem' }}>Comparar sistemas</Link>
      <button onClick={() => { onPresent(); setMenuOpen(false); }} style={{ textAlign: 'left', color: 'hsl(var(--foreground))', background: 'none', border: 0, padding: '.7rem' }} data-testid="mobile-button-presentation">Modo presentación</button>
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

function TimelineMap({ activeFamily, onNode, selected, routeMode }: { activeFamily: string; onNode: (node: HistoryNode) => void; selected: HistoryNode | null; routeMode?: boolean }) {
  const visible = historyNodes.filter((node) => activeFamily === 'Todos' || node.family === activeFamily);
  const activeIds = routeMode ? routeLinuxIds : visible.map((node) => node.id);
  const relatedIds = selected ? [selected.id, ...selected.influences, ...selected.descendants] : [];
  return <div className="map-section">
    <div className="map-header"><div><div className="eyebrow">Grafo temporal / 01</div><h2>Una genealogía de decisiones</h2><p>Las líneas muestran influencia, no solo continuidad de versiones.</p></div><div className="map-legend"><span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#f4bf5f' } as CSSProperties} />Linux</span><span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#54d9c0' } as CSSProperties} />Unix</span><span className="legend-item"><i className="legend-dot" style={{ '--legend-color': '#d99d61' } as CSSProperties} />Otros</span></div></div>
    <div className="map-canvas" aria-label="Mapa interactivo de la historia de sistemas operativos">
      <svg className="map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{connections.map((connection) => { const from = nodeMap[connection.from]; const to = nodeMap[connection.to]; if (!from || !to) return null; const related = relatedIds.includes(connection.from) && relatedIds.includes(connection.to); const dim = routeMode && (!routeLinuxIds.includes(connection.from) || !routeLinuxIds.includes(connection.to)); return <line key={`${connection.from}-${connection.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`${related ? 'is-related' : ''} ${dim ? 'is-dim' : ''}`} />; })}</svg>
      {historyNodes.map((node) => { const visibleNode = visible.includes(node); const dimmed = !visibleNode || (routeMode && !routeLinuxIds.includes(node.id)); return <button key={node.id} className={`map-node ${selected?.id === node.id ? 'is-selected' : ''} ${dimmed ? 'is-dim' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.color, '--node-size': node.size === 'major' ? '46px' : '32px' } as CSSProperties} onClick={() => onNode(node)} aria-label={`Abrir detalles de ${node.name}`} data-testid={`map-node-${node.id}`}><span className="node-orbit" /><span className="node-label">{node.name}</span><span className="node-year">{node.year}</span></button>; })}
    </div>
    <div className="mobile-timeline">{historyNodes.filter((node) => activeIds.includes(node.id)).sort((a, b) => a.yearNum - b.yearNum).map((node) => <button className="mobile-node" key={node.id} style={{ '--node-color': node.color } as CSSProperties} onClick={() => onNode(node)} data-testid={`mobile-node-${node.id}`}><span className="mobile-node-year">{node.year}</span><span className="mobile-node-content"><strong>{node.name}</strong><span>{node.tagline}</span></span></button>)}</div>
    <div className="map-caption"><CircleHelp size={14} /><span>Selecciona cualquier nodo para abrir su ficha. En móvil, la red se convierte en una línea temporal vertical.</span></div>
  </div>;
}

function Landing({ onNode, onSearch, onPresent, onRoute }: { onNode: (node: HistoryNode) => void; onSearch: () => void; onPresent: () => void; onRoute: () => void }) {
  const [family, setFamily] = useState<string>('Todos');
  const [selected, setSelected] = useState<HistoryNode | null>(null);
  const select = (node: HistoryNode) => { setSelected(node); onNode(node); };
  return <><main className="page-wrap">
    <section className="hero"><div className="fade-up"><div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>Archivo vivo / 1950 — presente</div><h1>La historia de los<br /><span>sistemas operativos.</span></h1><p>Un mapa para entender cómo las ideas viajan: de los mainframes a Unix, de Unix a Linux y del kernel a la infraestructura que sostiene el mundo digital.</p><div className="hero-meta"><span className="meta-pill"><Layers3 size={12} /> {historyNodes.length} hitos</span><span className="meta-pill"><GitBranch size={12} /> {connections.length} conexiones</span><span className="meta-pill"><BookOpen size={12} /> lectura guiada</span></div></div><div className="hero-note fade-up delay-1"><strong>Un museo, no una lista de fechas.</strong> Cada nodo cuenta una decisión: qué problema resolvía, quién lo imaginó y qué caminos abrió después.</div></section>
    <div className="toolbar fade-up delay-2"><div className="filter-row" role="tablist" aria-label="Filtrar por familia">{families.map((item) => <button key={item} className={`filter-chip ${family === item ? 'is-active' : ''}`} onClick={() => setFamily(item)} role="tab" aria-selected={family === item} data-testid={`filter-${item.toLowerCase()}`}>{item}</button>)}</div><div className="toolbar-right"><button className="ghost-button" onClick={onRoute} data-testid="button-start-route"><GitBranch size={14} /> Ruta Linux</button><button className="ghost-button" onClick={onPresent} data-testid="button-start-presentation"><MonitorPlay size={14} /></button></div></div>
    <div className="fade-up delay-3"><TimelineMap activeFamily={family} onNode={select} selected={selected} /></div>
    <section className="content-grid"><article className="info-card linux-route-card"><div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>Recorrido recomendado</div><h2>La historia de Linux</h2><p>Una ruta de ocho estaciones para seguir el hilo completo: el lenguaje de Unix, la lección de MINIX, el kernel, las comunidades y la nube.</p><div className="route-steps">{routeLinuxIds.map((id, index) => <span className="route-step" key={id}><b>{String(index + 1).padStart(2, '0')}</b><span>{nodeMap[id].name}</span>{index < routeLinuxIds.length - 1 && <i className="route-line" />}</span>)}</div><button className="primary-button" style={{ marginTop: '1.4rem', position: 'relative', zIndex: 1 }} onClick={onRoute} data-testid="button-enter-linux-route">Entrar en la ruta <ArrowRight size={15} /></button></article><article className="info-card"><div className="eyebrow">El archivo en números</div><h2>Muchas ramas, una conversación</h2><p>Las familias no evolucionan aisladas. Comparten ideas, compiten por usuarios y remezclan soluciones de épocas anteriores.</p><div className="stat-list"><div className="stat"><strong>70+</strong><span>años de historia</span></div><div className="stat"><strong>8</strong><span>familias visibles</span></div><div className="stat"><strong>∞</strong><span>nuevos caminos</span></div></div><button className="ghost-button" style={{ marginTop: '1.4rem' }} onClick={onSearch} data-testid="button-explore-search"><Search size={14} /> Explorar el archivo</button></article></section>
  </main><DetailPanel node={selected} onClose={() => setSelected(null)} onSelect={(node) => { setSelected(node); onNode(node); }} /></>;
}

function LinuxRoute({ onNode, onPresent }: { onNode: (node: HistoryNode) => void; onPresent: () => void }) {
  const [index, setIndex] = useState(0);
  const current = nodeMap[routeLinuxIds[index]];
  const previous = () => setIndex((value) => Math.max(0, value - 1));
  const next = () => { if (index < routeLinuxIds.length - 1) setIndex((value) => value + 1); else onPresent(); };
  return <main className="page-wrap route-page"><section className="route-intro"><div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>Ruta Linux / recorrido guiado</div><h1>De una habitación<br />a <span>todo el planeta.</span></h1><p>Una narración breve para seguir las ideas que conectan Unix, MINIX, el kernel Linux y las infraestructuras que hoy casi nunca vemos.</p></section><div className="route-progress"><span className="progress-label">{String(index + 1).padStart(2, '0')} / {String(routeLinuxIds.length).padStart(2, '0')}</span><div className="progress-track"><div className="progress-value" style={{ width: `${((index + 1) / routeLinuxIds.length) * 100}%` }} /></div><span className="progress-label">{current.year}</span></div><article className="route-story"><div className="route-story-year">{current.year}</div><div><div className="eyebrow" style={{ color: current.color }}>{current.family} / {current.type}</div><h2>{current.name}: {current.tagline}</h2><p>{current.description}</p><div className="route-actions"><button className="ghost-button" onClick={() => onNode(current)} data-testid="button-route-details">Abrir ficha <ChevronRight size={14} /></button><button className="primary-button" onClick={next} data-testid="button-route-next">{index === routeLinuxIds.length - 1 ? 'Ver en presentación' : 'Siguiente estación'} <ArrowRight size={15} /></button></div></div></article><div className="route-actions"><button className="ghost-button" onClick={previous} disabled={index === 0} data-testid="button-route-previous"><ArrowLeft size={14} /> Anterior</button><button className="ghost-button" onClick={onPresent} data-testid="button-route-presentation"><MonitorPlay size={14} /> Presentar ruta</button></div></main>;
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
  return <div className="presentation"><div className="presentation-card"><div className="eyebrow" style={{ color: node.color }}>{node.family} / {node.year}</div><h1>{node.name}</h1><p>{node.tagline} {node.description}</p></div><div className="presentation-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Anterior" data-testid="presentation-previous"><ArrowLeft size={17} /></button><span className="presentation-count">{String(index + 1).padStart(2, '0')} — {String(historyNodes.length).padStart(2, '0')}</span><button className="icon-button" onClick={() => move(1)} aria-label="Siguiente" data-testid="presentation-next"><ArrowRight size={17} /></button><button className="icon-button" onClick={onClose} aria-label="Salir de presentación" data-testid="presentation-close"><X size={17} /></button></div><div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'hsl(var(--muted-foreground))', font: '.62rem var(--app-font-mono)' }}>ESC para salir</div></div>;
}

export function HistoryApp() {
  const [location, setLocation] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [detail, setDetail] = useState<HistoryNode | null>(null);
  const [presentation, setPresentation] = useState(false);
  const view: View = location === '/ruta-linux' ? 'route' : location === '/comparar' ? 'compare' : 'timeline';
  useEffect(() => { const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  const selectNode = (node: HistoryNode) => { setDetail(node); if (view !== 'timeline') setLocation('/'); };
  return <div className="museum-app"><Topbar view={view} onSearch={() => setSearchOpen(true)} onPresent={() => setPresentation(true)} />{view === 'timeline' && <Landing onNode={selectNode} onSearch={() => setSearchOpen(true)} onPresent={() => setPresentation(true)} onRoute={() => setLocation('/ruta-linux')} />}{view === 'route' && <LinuxRoute onNode={selectNode} onPresent={() => setPresentation(true)} />}{view === 'compare' && <ComparePage />}<SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={selectNode} />{view !== 'timeline' && <DetailPanel node={detail} onClose={() => setDetail(null)} onSelect={selectNode} />}{presentation && <Presentation onClose={() => setPresentation(false)} />}</div>;
}