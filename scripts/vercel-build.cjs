const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting Vercel build script...');

// 1. Run Vite build
execSync('pnpm --filter os-history-museum build', { stdio: 'inherit' });

// 2. Locate built dist output
const curDist = path.resolve('artifacts/os-history/dist');
const altDist = path.resolve('dist');
const targetDist = fs.existsSync(curDist) ? curDist : (fs.existsSync(altDist) ? altDist : null);

if (targetDist) {
  const targets = [
    path.resolve(process.cwd(), 'dist'),
    path.resolve(process.cwd(), 'artifacts/os-history/dist'),
    path.resolve(process.cwd(), 'artifacts/os-history/artifacts/os-history/dist')
  ];
  targets.forEach((p) => {
    if (p !== targetDist) {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.cpSync(targetDist, p, { recursive: true });
    }
  });
  console.log('Build output successfully synced across Vercel paths.');
} else {
  console.error('Error: Build output directory not found.');
  process.exit(1);
}
