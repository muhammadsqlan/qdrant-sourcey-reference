import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let parserPath;
try { parserPath = createRequire(import.meta.url).resolve('htmlparser2'); }
catch { parserPath = createRequire(path.resolve(root, '../../tools/sourcey-3.6.12/package/package.json')).resolve('htmlparser2'); }
const { Parser } = await import(parserPath);
const buildDir = path.resolve(root, process.env.RUNX_INPUT_BUILD_DIR || 'site');
const baseUrl = '/' + (process.env.RUNX_INPUT_BASE_URL || '').replace(/^\/+|\/+$/g, '');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const specBytes = fs.readFileSync(path.join(root, 'upstream/openapi.json'));
const spec = JSON.parse(specBytes);
const pages = new Map();
const checks = [];
const check = (name, passed, detail) => checks.push({ name, passed, detail });
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
for (const file of walk(buildDir).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set(), refs = [];
  const parser = new Parser({ onopentag(name, attributes) {
    if (attributes.id) ids.add(attributes.id);
    for (const attr of ['href', 'src']) if (attributes[attr]) refs.push(attributes[attr]);
  } }, { decodeEntities: true });
  parser.write(html); parser.end();
  pages.set(path.relative(buildDir, file), { html, ids, refs, size: Buffer.byteLength(html), sha256: sha256(html) });
}
const broken = [];
function verifyRef(from, ref) {
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) return;
  const url = new URL(ref, 'http://local' + (baseUrl === '/' ? '/' : baseUrl + '/') + from);
  let pathname = decodeURIComponent(url.pathname);
  if (baseUrl !== '/' && (pathname === baseUrl || pathname.startsWith(baseUrl + '/'))) pathname = pathname.slice(baseUrl.length);
  const local = pathname.replace(/^\//, '') || 'index.html';
  const target = path.resolve(buildDir, local);
  if (!target.startsWith(buildDir + path.sep) || !fs.existsSync(target)) {
    broken.push({ from, ref, reason: 'missing target' }); return;
  }
  if (url.hash && pages.has(local) && !pages.get(local).ids.has(decodeURIComponent(url.hash.slice(1)))) {
    broken.push({ from, ref, reason: 'missing anchor' });
  }
}
for (const [file, data] of pages) for (const ref of data.refs) verifyRef(file, ref);
const search = JSON.parse(fs.readFileSync(path.join(buildDir, 'search-index.json')));
for (const entry of search) verifyRef('index.html', entry.url);
const operations = Object.entries(spec.paths).flatMap(([url, item]) => Object.entries(item)
  .filter(([method]) => ['get','put','post','delete','patch','head','options','trace'].includes(method))
  .map(([method, operation]) => ({ method, url, id: operation.operationId })));
const endpointSearch = search.filter(e => e.category === 'Endpoints');
const missingOperations = operations.filter(op => !endpointSearch.some(e => e.method === op.method && e.path === op.url));
check('source hash', sha256(specBytes) === '22a890a799743906f5337588bb8e5ee3fccc518825e7bb5012add1ce579aa174', sha256(specBytes));
check('minimum API coverage', operations.length >= 20 && missingOperations.length === 0, { upstream: operations.length, searchable: endpointSearch.length, missingOperations });
check('links and search anchors', broken.length === 0, broken);
check('public landing size', pages.get('index.html')?.size < 1000000, pages.get('index.html')?.size);
check('source attribution', pages.get('source.html')?.html.includes('016542aa5deb6c66380bb137badf73d54f742bde'), 'Pinned upstream revision displayed');
check('license preserved', fs.readFileSync(path.join(root, 'upstream/LICENSE'), 'utf8').includes('Apache License'), 'Apache-2.0');
check('guide examples', pages.get('query.html')?.html.includes('points/query') && pages.get('query.html')?.html.includes('points/scroll'), 'Query and scroll examples rendered');
check('theme assets', ['sourcey.css','sourcey.js','search-index.json','sitemap.xml','llms.txt','llms-full.txt'].every(f => fs.statSync(path.join(buildDir, f)).size > 0), 'Required assets nonempty');
const result = {
  verified: checks.every(c => c.passed),
  summary: 'Validation of Sourcey output against all 69 operations in the pinned Qdrant OpenAPI snapshot.',
  checks,
  pages: [...pages].map(([name, data]) => ({ name, bytes: data.size, sha256: data.sha256 })),
  operation_count: operations.length,
};
process.stdout.write(JSON.stringify({ validation: result }) + '\n');
if (!result.verified) process.exitCode = 1;
