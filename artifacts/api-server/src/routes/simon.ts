import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";

const router: IRouter = Router();

// Load image base64 if available
let imageBase64 = "";
try {
  const imgPath = path.join(__dirname, "../../../os-history/public/simon67.jpg");
  if (fs.existsSync(imgPath)) {
    imageBase64 = fs.readFileSync(imgPath).toString("base64");
  }
} catch (e) {
  // fallback
}

router.get("/simon67", (_req, res) => {
  const imgSrc = imageBase64
    ? `data:image/jpeg;base64,${imageBase64}`
    : "https://sistema-operativo-six.vercel.app/simon67.jpg";

  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>👑 ZONA SECRETA — Simón Santiago Puentes (472 ICFES)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: radial-gradient(circle at 50% 30%, #1e1b4b 0%, #0f172a 60%, #020617 100%);
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      text-align: center;
      overflow-x: hidden;
    }
    .crown {
      font-size: 0.8rem;
      font-weight: 700;
      color: #f59e0b;
      letter-spacing: 0.18em;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      padding: 0.3rem 0.9rem;
      border-radius: 2rem;
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: clamp(2.2rem, 6vw, 3.8rem);
      font-weight: 800;
      line-height: 1.05;
      margin: 0.4rem 0;
    }
    h1 span {
      background: linear-gradient(135deg, #a855f7, #ec4899, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.sub {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
    .frame-wrap {
      position: relative;
      margin: 1rem 0;
      cursor: pointer;
    }
    .neon-frame {
      padding: 8px;
      border-radius: 1.2rem;
      background: linear-gradient(45deg, #ff007f, #00f0ff, #7000ff, #ff007f);
      background-size: 300% 300%;
      animation: neon-glow 4s ease infinite;
      box-shadow: 0 0 25px rgba(255, 0, 127, 0.5), 0 0 50px rgba(0, 240, 255, 0.3);
    }
    @keyframes neon-glow {
      0% { background-position: 0% 50%; box-shadow: 0 0 25px rgba(255, 0, 127, 0.6), 0 0 50px rgba(0, 240, 255, 0.4); }
      50% { background-position: 100% 50%; box-shadow: 0 0 35px rgba(0, 240, 255, 0.7), 0 0 60px rgba(112, 0, 255, 0.5); }
      100% { background-position: 0% 50%; box-shadow: 0 0 25px rgba(255, 0, 127, 0.6), 0 0 50px rgba(0, 240, 255, 0.4); }
    }
    img.photo {
      display: block;
      width: min(380px, 85vw);
      height: auto;
      max-height: 420px;
      object-fit: cover;
      border-radius: 0.9rem;
      border: 2px solid #0f172a;
    }
    .badge {
      position: absolute;
      bottom: -12px;
      right: -12px;
      background: linear-gradient(135deg, #ef4444, #f59e0b);
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 800;
      padding: 0.4rem 1rem;
      border-radius: 2rem;
      border: 3px solid #0f172a;
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.5);
      animation: bounce 2s infinite ease-in-out;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0) rotate(3deg); }
      50% { transform: translateY(-6px) rotate(-2deg); }
    }
    .facts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 0.8rem;
      max-width: 650px;
      width: 100%;
      margin: 1.5rem 0;
      text-align: left;
    }
    .fact {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.15);
      padding: 0.85rem 1rem;
      border-radius: 0.7rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-size: 0.82rem;
      color: #cbd5e1;
    }
    .fact strong { color: #f59e0b; }
    .btn {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.7rem 1.4rem;
      background: #3b82f6;
      color: #fff;
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background 0.2s;
    }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="crown">👑 ZONA SECRETA 👑</div>
  <h1><span>¡El</span> genio del <span>ICFES</span></h1>
  <p class="sub">Has encontrado la página secreta del más cráck de toda Neiva</p>
  
  <div class="frame-wrap" onclick="this.style.transform='scale(1.08)'; setTimeout(() => this.style.transform='scale(1)', 200)">
    <div class="neon-frame">
      <img src="${imgSrc}" alt="Simón Santiago Puentes" class="photo" />
    </div>
    <div class="badge">472 🧠</div>
  </div>

  <div class="facts">
    <div class="fact"><span>💻</span> <span>Creador de la Línea del Tiempo Digital de SO</span></div>
    <div class="fact"><span>🏆</span> <span>Puntaje ICFES: <strong>472</strong> puntos</span></div>
    <div class="fact"><span>🚀</span> <span>Orgullo de Neiva, Huila</span></div>
    <div class="fact"><span>🐧</span> <span>Servidor API Server — Vercel Active</span></div>
  </div>

  <a href="https://sistema-operativo-six.vercel.app/" class="btn">← Ir al Museo de Sistemas Operativos</a>
</body>
</html>`);
});

export default router;
