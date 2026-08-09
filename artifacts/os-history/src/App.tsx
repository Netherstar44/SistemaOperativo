import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { HistoryApp } from '@/components/HistoryApp';

const queryClient = new QueryClient();

function Intro() {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('os-history-intro') === 'seen');
  const enter = () => { sessionStorage.setItem('os-history-intro', 'seen'); setDismissed(true); };
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === 'Enter' && !dismissed) enter(); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [dismissed]);
  return <div className={`intro-screen ${dismissed ? 'is-dismissed' : ''}`} aria-hidden={dismissed}><div className="intro-content"><div className="intro-kicker eyebrow">Línea del Tiempo Digital / sala 01</div><h1 className="intro-title">La historia de los<br /><em>sistemas operativos.</em></h1><p className="intro-subtitle">De los primeros mainframes al kernel que mueve gran parte del mundo digital.</p><div className="intro-graph"><svg viewBox="0 0 840 88" preserveAspectRatio="none"><path d="M0 69 C130 69 139 21 245 43 S370 79 463 35 S628 12 840 25" /><path d="M0 18 C115 11 192 57 298 45 S473 5 585 47 S728 76 840 53" /><circle cx="0" cy="69" r="3" /><circle cx="245" cy="43" r="3" /><circle cx="463" cy="35" r="3" /><circle cx="690" cy="24" r="3" /><circle cx="840" cy="25" r="3" /></svg></div><button className="intro-button" onClick={enter} data-testid="button-enter-museum">Explorar la historia <span>↗</span></button><div className="eyebrow" style={{ marginTop: '1.4rem' }}>Pulsa Enter para comenzar</div><div className="intro-credits"><span>Desarrollado por</span><strong>Simón Santiago Puentes Peña</strong><span>&amp;</span><strong>José David Correa Núñez</strong></div></div></div>;
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={HistoryApp} /><Route path="/ruta-linux" component={HistoryApp} /><Route path="/comparar" component={HistoryApp} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base="/"><Intro /><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;