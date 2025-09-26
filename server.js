import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import Joi from 'joi';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api/', apiLimiter);

// Static
const publicDir = __dirname;
app.use(express.static(publicDir, { maxAge: '1d', extensions: ['html'] }));

// Helpers to read JSON data
function readData(rel) {
  const p = path.join(publicDir, rel);
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

// APIs
app.get('/api/destinations', (req, res) => {
  res.json(readData('assets/data/destinations.json'));
});

app.get('/api/packages', (req, res) => {
  res.json(readData('assets/data/packages.json'));
});

app.get('/api/blog', (req, res) => {
  res.json(readData('assets/data/blog.json'));
});

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toString().toLowerCase();
  const type = (req.query.type || '').toString();
  const packages = readData('assets/data/packages.json');
  let out = packages;
  if (q) out = out.filter(p => (p.title + ' ' + p.destination).toLowerCase().includes(q));
  if (type) out = out.filter(p => p.type === type);
  res.json(out);
});

// Storage dirs
const storageDir = path.join(__dirname, 'storage');
if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(5).max(2000).required()
});

const newsletterSchema = Joi.object({ email: Joi.string().email().required() });

app.post('/api/contact', (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const entry = { ...value, receivedAt: new Date().toISOString(), ip: req.ip };
  const file = path.join(storageDir, 'contact.jsonl');
  fs.appendFileSync(file, JSON.stringify(entry) + '\n');
  res.json({ ok: true });
});

app.post('/api/newsletter', (req, res) => {
  const { error, value } = newsletterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const entry = { ...value, subscribedAt: new Date().toISOString(), ip: req.ip };
  const file = path.join(storageDir, 'newsletter.jsonl');
  fs.appendFileSync(file, JSON.stringify(entry) + '\n');
  res.json({ ok: true });
});

// Package detail SSR
app.get('/packages/:id', (req, res) => {
  const id = req.params.id;
  const packages = readData('assets/data/packages.json');
  const p = packages.find((x) => x.id === id);
  if (!p) return res.status(404).send('<h1>Package not found</h1>');
  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${p.title} – Wanderly</title>
    <meta name="description" content="${p.title} in ${p.destination}. ${p.duration} · ${p.type}">
    <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/css/style.css">
  </head>
  <body>
    <header id="header"></header>
    <main class="section"><div class="container">
      <a href="/packages.html" class="link">← Back to packages</a>
      <h1>${p.title}</h1>
      <div class="card" style="overflow:hidden">
        <div class="card__media"><img src="/${p.image}" alt="${p.title}"></div>
        <div class="card__body">
          <div class="card__meta"><span class="pill">${p.destination}</span><span class="pill">${p.duration}</span><span class="pill">${p.type}</span></div>
          <p class="card__desc">Handpicked hotels, included transfers, guided activities, and free time. Flexible dates available.</p>
          <div class="card__meta"><strong class="price">$${p.price}</strong><span class="muted"> / person</span></div>
        </div>
      </div>
      <section class="section" style="padding-top:24px">
        <div class="steps">
          <div class="step"><h3>Inclusions</h3><p>Stays, airport transfers, select meals, guided tours as listed.</p></div>
          <div class="step"><h3>Highlights</h3><p>Top sights, local experiences, and optional add-ons.</p></div>
          <div class="step"><h3>Policies</h3><p>Transparent pricing and clear cancellation terms before checkout.</p></div>
        </div>
      </section>
    </div></main>
    <footer id="footer"></footer>
    <script src="/assets/js/components.js" defer></script>
  </body></html>`;
  res.send(html);
});

// Fallback to index.html for non-file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wanderly server running at http://localhost:${PORT}`);
});


