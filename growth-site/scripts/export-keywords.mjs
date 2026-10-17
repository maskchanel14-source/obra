import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { KEYWORDS } from '../content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(path.join(root, 'data'), { recursive: true });
await writeFile(path.join(root, 'data/keywords.json'), `${JSON.stringify(KEYWORDS, null, 2)}\n`);
console.log(`Exported ${KEYWORDS.length} keyword hypotheses to data/keywords.json`);
