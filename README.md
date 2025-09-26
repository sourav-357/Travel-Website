# Wanderly – Travel Website

Frontend: vanilla HTML/CSS/JS. Backend: Node.js + Express.

## Run locally

1. Install Node 18+
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm run dev
```
Then open http://localhost:3000

## API endpoints
- GET /api/destinations
- GET /api/packages
- GET /api/blog
- GET /api/search?q=paris&type=city
- POST /api/contact { name, email, message }
- POST /api/newsletter { email }

Submissions are appended to storage/contact.jsonl and storage/newsletter.jsonl

## Notes
- Static assets served from project root
- Security: helmet, rate limiting; Performance: compression; Logging: morgan
- PWA: manifest + service worker (basic offline shell)
