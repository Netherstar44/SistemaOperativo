const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting Vercel build script...');
console.log('Current CWD:', process.cwd());

// Find repository root by searching upward for pnpm-workspace.yaml
let rootDir = process.cwd();
while (rootDir !== path.dirname(rootDir) && !fs.existsSync(path.join(rootDir, 'pnpm-workspace.yaml'))) {
  rootDir = path.dirname(rootDir);
}
console.log('Detected Repository Root:', rootDir);

// 1. Run Vite build from repository root
execSync('pnpm --filter os-history-museum build', { cwd: rootDir, stdio: 'inherit' });

// 2. Locate built output
const builtDist = path.join(rootDir, 'artifacts/os-history/dist');

if (fs.existsSync(builtDist)) {
  // Copy built output to process.cwd()/dist (where Vercel is looking) AND root/dist
  const targetDirs = [
    path.join(process.cwd(), 'dist'),
    path.join(rootDir, 'dist'),
    path.join(rootDir, 'artifacts/os-history/dist'),
    path.join(rootDir, 'artifacts/api-server/dist')
  ];

  targetDirs.forEach((dir) => {
    if (dir !== builtDist) {
      fs.mkdirSync(path.dirname(dir), { recursive: true });
      fs.cpSync(builtDist, dir, { recursive: true });
    }
  });
  console.log('Build output successfully synced across all Vercel target directories.');
} else {
  console.error('Error: Build output directory not found at', builtDist);
  process.exit(1);
}
