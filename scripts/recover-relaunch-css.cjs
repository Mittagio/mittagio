const fs = require('fs');
const path = require('path');

const transcript = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/c-Users-admin-mittagio/agent-transcripts/c6c6f152-f414-4fbc-bd81-c905fa07090d/c6c6f152-f414-4fbc-bd81-c905fa07090d.jsonl'
);
const stylePath = path.join(__dirname, '..', 'app', 'style.css');
const outPath = path.join(__dirname, '..', '_recovered-relaunch.css');

const markers = [
  'ui-nav-premium',
  'Phase 2: Customer',
  'pickup-pass-phase3',
  'inserat-applite',
  'Phase 5: Dashboard',
  'Phase 6:',
];

const lines = fs.readFileSync(transcript, 'utf8').split('\n');
const chunks = new Set();

for (const line of lines) {
  if (!line.includes('style.css')) continue;
  const hasMarker = markers.some((m) => line.includes(m));
  if (!hasMarker) continue;

  const patchRe = /\*\*\* Begin Patch[\s\S]*?Update File:[^\n]*style\.css[\s\S]*?\n([\s\S]*?)\*\*\* End Patch/g;
  let m;
  while ((m = patchRe.exec(line)) !== null) {
    const adds = m[1]
      .split('\n')
      .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
      .map((l) => l.slice(1))
      .join('\n');
    if (adds.trim() && !adds.includes('<section') && !adds.includes('<nav')) chunks.add(adds.trim());
  }

  const strRe = /"new_string":"((?:\\.|[^"\\])*)"/g;
  while ((m = strRe.exec(line)) !== null) {
    let s = m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    if (markers.some((mk) => s.includes(mk)) && !s.includes('<section') && !s.includes('<nav')) chunks.add(s.trim());
  }
}

const recovered = [...chunks].join('\n\n');
fs.writeFileSync(outPath, recovered);
console.log('Recovered', recovered.length, 'bytes,', chunks.size, 'chunks');

const base = fs.readFileSync(stylePath, 'utf8');
const missing = [...chunks].filter((c) => !base.includes(c.slice(0, 80)));
console.log('Chunks not in current style.css:', missing.length);
if (missing.length) {
  fs.appendFileSync(stylePath, '\n\n' + missing.join('\n\n') + '\n');
  console.log('Appended to', stylePath);
}
