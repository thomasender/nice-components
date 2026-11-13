// tsc keeps side-effect `import './x.css'` lines in the emitted .d.ts files, but the CSS is
// bundled into dist/styles.css and those paths don't exist. Remove them so consumers' type
// resolution (node16/bundler) doesn't hit unresolved imports.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.d.ts')) yield path;
  }
}

for (const file of walk('dist')) {
  const source = readFileSync(file, 'utf8');
  const cleaned = source.replace(/^import\s+['"][^'"]+\.css['"];?\r?\n/gm, '');
  if (cleaned !== source) writeFileSync(file, cleaned);
}
