/**
 * Sprint 5b.31 – Anti-Rückfall: Warnt, wenn in app/ wieder style.display oder style.transform
 * für UI-State verwendet wird. Nach Abschluss des Audits: 0 Treffer.
 * Ausführung: node scripts/check-ui-state.js  (oder npm run check:ui-state)
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, '..', 'app');

/** style.display-Zeilen, in deren Nähe (bis zu 5 Zeilen davor) dieser Kommentar steht, sind erlaubt (robust bei Leerzeilen). */
const WHITELIST_COMMENT = 'intentional best-effort UI recovery';
const LOOKBACK = 5;

const displayRe = /\.style\.display\s*[=!]/;
const transformRe = /\.style\.transform\s*=/;
const opacityRe = /\.style\.opacity\s*=/;

const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build'];

function walk(dir, ext, list = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.includes(e.name)) continue;
      walk(full, ext, list);
    } else if (e.name.endsWith(ext)) {
      list.push(full);
    }
  }
  return list;
}

const jsFiles = walk(appDir, '.js');
let displayHits = [];
let transformHits = [];
let opacityHits = [];

for (const file of jsFiles) {
  const rel = file.replace(appDir + (process.platform === 'win32' ? '\\' : '/'), '');
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    let allowed = false;
    for (let j = 1; j <= LOOKBACK; j++) {
      const prev = lines[i - j] || '';
      if (prev.includes(WHITELIST_COMMENT)) { allowed = true; break; }
    }
    if (displayRe.test(line)) displayHits.push({ file: rel, line: i + 1, content: line.trim().slice(0, 80), allowed });
    if (transformRe.test(line)) transformHits.push({ file: rel, line: i + 1, content: line.trim().slice(0, 80) });
    if (opacityRe.test(line)) opacityHits.push({ file: rel, line: i + 1, content: line.trim().slice(0, 80) });
  });
}

const displayFiltered = displayHits.filter(h => !h.allowed);

const total = displayFiltered.length + transformHits.length + opacityHits.length;
if (total === 0) {
  console.log('check-ui-state: 0 Treffer (style.display / style.transform / style.opacity). OK.');
  process.exit(0);
}

console.error('Sprint 5b.31 – Inline UI-State gefunden (migriere zu show/hide/setVisible oder CSS-Variablen):');
if (displayFiltered.length) {
  console.error('\nstyle.display:');
  displayFiltered.forEach(h => console.error(`  ${h.file}:${h.line}  ${h.content}`));
}
if (transformHits.length) {
  console.error('\nstyle.transform:');
  transformHits.forEach(h => console.error(`  ${h.file}:${h.line}  ${h.content}`));
}
if (opacityHits.length) {
  console.error('\nstyle.opacity:');
  opacityHits.forEach(h => console.error(`  ${h.file}:${h.line}  ${h.content}`));
}
console.error('\nSiehe docs/sprint-5b31-audit-checklist.md und .cursor/rules/sprint-5b31-finalize-ui-state.mdc');
process.exit(1);
