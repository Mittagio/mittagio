import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'dist-react');
const appDir = join(root, 'app');
const destApp = join(outDir, 'app');

if (!existsSync(appDir)) {
  console.warn('scripts/copy-app.js: app/ nicht gefunden, überspringe.');
  process.exit(0);
}
if (!existsSync(outDir)) {
  console.warn('scripts/copy-app.js: dist-react/ noch nicht vorhanden (Vite build zuerst).');
  process.exit(1);
}
mkdirSync(destApp, { recursive: true });
cpSync(appDir, destApp, { recursive: true });
console.log('app/ nach dist-react/app/ kopiert.');
