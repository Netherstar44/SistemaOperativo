import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Share2, 
  Zap, 
  Crown, 
  Cpu, 
  Radio, 
  Check, 
  Bomb,
  Award
} from 'lucide-react';

export const SimonBrainrotEgg: React.FC = () => {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sigmaCount, setSigmaCount] = useState<number>(67);
  const [copied, setCopied] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [activeSpeech, setActiveSpeech] = useState<string>("¡TUNG TUNG TUNG SAHUR! Despertando el kernel a las 3 AM...");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const speeches = [
    "🔥 ¡TUNG TUNG TUNG SAHUR! Despertando el kernel a las 3 AM...",
    "🧠 Nivel de Rizz: 67 millones de MegaHertzios.",
    "👑 El creador definitivo de la arquitectura Monorepo Sigma.",
    "⚡ Compilando Linux Kernel versión Mewing 67.4...",
    "🗿 Un verdadero Sigma no reinicia el SO: el SO se adapta a él.",
    "🥁 ¡TUNG TUNG TUNG! ¡SAHUR SAHUR! ¡Hora de levantar el Docker!",
    "💥 Advertencia: Exceso de Gyatt en la memoria swap.",
  ];

  // Synthesize custom meme audio using Web Audio API (100% offline & reliable)
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playDrumHit = (freq: number, decay: number, type: OscillatorType = 'sine') => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + decay);

      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + decay);
    } catch {
      // Audio fallback
    }
  };

  const playVineBoom = () => {
    try {
      const ctx = getAudioContext();
      // Low boom
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      setShake(true);
      setTimeout(() => setShake(false), 500);
    } catch {
      // Audio fallback
    }
  };

  const playTungPattern = () => {
    // 3 rhythmic "Tung" hits followed by a low drum
    playDrumHit(440, 0.18, 'triangle'); // Tung
    setTimeout(() => playDrumHit(440, 0.18, 'triangle'), 220); // Tung
    setTimeout(() => playDrumHit(580, 0.25, 'triangle'), 440); // TUNG!
    setTimeout(() => playDrumHit(180, 0.45, 'sine'), 680); // Sahur bass drop
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playTungPattern();
      loopIntervalRef.current = setInterval(() => {
        playTungPattern();
      }, 1400);
    }
  };

  useEffect(() => {
    return () => {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleSigmaClick = () => {
    setSigmaCount(prev => prev + 1);
    playDrumHit(350 + (sigmaCount % 20) * 15, 0.15, 'square');
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setActiveSpeech(randomSpeech);
    setShake(true);
    setTimeout(() => setShake(false), 200);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#070913] text-white flex flex-col items-center justify-center p-4 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Animated Brainrot Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),rgba(168,85,247,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Floating Action Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between z-20 mb-6">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-amber-400 font-semibold text-sm shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Museo OS
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {isPlaying ? 'TUNG TUNG ACTIVO 🔊' : 'Música Sahur 🔇'}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium shadow-lg backdrop-blur-md transition-all hover:scale-105"
            title="Copiar enlace secreto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Secret Brainrot Card */}
      <div 
        className={`w-full max-w-md relative z-10 rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-purple-500 to-emerald-400 shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-transform duration-200 ${
          shake ? 'scale-105 rotate-1' : 'hover:scale-[1.01]'
        }`}
      >
        <div className="bg-[#0b0e1b]/95 rounded-[22px] p-6 backdrop-blur-xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Top Meme Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wider uppercase mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            BRAINROT EASTER EGG #67
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Title Header */}
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200 bg-clip-text text-transparent mb-1 flex items-center gap-2">
            <Crown className="w-7 h-7 text-amber-400 inline animate-spin" style={{ animationDuration: '6s' }} />
            SIMÓN 67
          </h1>
          <p className="text-xs text-purple-300 font-mono font-medium tracking-wide mb-5">
            // TUNG TUNG SAHUR SIGMA EDITION //
          </p>

          {/* Simon Image Container with Auras */}
          <div className="relative group my-2">
            {/* Rotating Glow Rings */}
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-purple-600 to-emerald-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-spin" style={{ animationDuration: '10s' }} />
            
            <div className="relative w-48 h-48 rounded-full p-1.5 bg-gradient-to-b from-amber-400 via-purple-500 to-emerald-400 overflow-hidden shadow-2xl">
              <img
                src="/simon67.png"
                alt="Simón 67 Easter Egg"
                onError={(e) => {
                  // Fallback to .jpg if .png has an issue
                  (e.target as HTMLImageElement).src = '/simon67.jpg';
                }}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500 cursor-pointer"
                onClick={handleSigmaClick}
              />
            </div>

            {/* Floating Level Badge */}
            <div className="absolute -bottom-2 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border-2 border-slate-900 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              LVL 67
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="w-full mt-5 mb-4 p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-medium italic min-h-[48px] flex items-center justify-center">
            "{activeSpeech}"
          </div>

          {/* Brainrot Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-2 my-2 text-left">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase">
                <Cpu className="w-3 h-3" />
                Clock Speed
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                67,000,000 GHz
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-purple-400 text-[10px] font-bold uppercase">
                <Radio className="w-3 h-3" />
                Kernel Type
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                Tung-Sahur-v67
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase">
                <Flame className="w-3 h-3" />
                Rizz Aura
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                +999,999 Sigma
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-bold uppercase">
                <Award className="w-3 h-3" />
                Dev Status
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                Master Architect
              </div>
            </div>
          </div>

          {/* Interactive Meme Buttons */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              onClick={handleSigmaClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
            >
              <Flame className="w-4 h-4 fill-current" />
              ¡AUMENTAR SIGMA (+1)! : {sigmaCount}
            </button>

            <button
              onClick={playVineBoom}
              className="w-full py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Bomb className="w-3.5 h-3.5 text-red-400" />
              VINE BOOM IMPACT
            </button>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-slate-500 font-mono mt-4">
            Línea del Tiempo de Sistemas Operativos • Simón Puentes & José Correa
          </p>
        </div>
      </div>
    </div>
  );
};
