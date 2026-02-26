# stellae.socials

Social media asset generator for the Stellae ecosystem. Generate branded social media graphics for all 8 Stellae products across 5 platform sizes.

## Features

- **6 Templates**: Announcement, Feature Highlight, Stat Card, Testimonial, Comparison, Product Launch
- **8 Brands**: stellae.design, .tokens, .drift, .import, .studio, .scale, .flow, .theme
- **5 Platforms**: Twitter (1200×675), LinkedIn (1200×627), Instagram Post (1080×1080), Instagram Story (1080×1920), Facebook (1200×630)
- **Real-time Preview**: Live Satori rendering in the editor
- **Batch Export**: Generate all platform sizes at once
- **API-first**: Full REST API for agent/automation access

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS
- Satori + @resvg/resvg-js for image rendering
- Sharp for format conversion (PNG/JPG/WebP)
- SQLite + Drizzle ORM
- Local filesystem storage (R2-ready)

## Getting Started

```bash
# Clone
git clone https://github.com/prosenik/stellae-socials.git
cd stellae-socials

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
DATABASE_PATH=./data/stellae.db
STORAGE_DIR=./storage
```

Optional R2 config (for production):
```env
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

## API

### Generate Single Asset
```bash
POST /api/generate
{
  "templateId": "announcement",
  "brandId": "stellae-studio",
  "platform": "twitter",
  "variables": { "headline": "Hello World" },
  "format": "png"
}
```

### Batch Generate (All Platforms)
```bash
POST /api/generate/batch
{
  "templateId": "announcement",
  "brandId": "stellae-studio",
  "variables": { "headline": "Hello World" }
}
```

### List Templates
```bash
GET /api/templates
GET /api/templates/:id
```

### List Brands
```bash
GET /api/brands
GET /api/brands/:id
```

### Assets
```bash
GET /api/assets/:id
GET /api/assets/:id/download
```

## Docker

```bash
docker compose up -d
```

## Architecture

Templates are React components rendered via Satori (JSX → SVG → PNG). Each template accepts `{ brand, variables, width, height }` props and adapts to any platform dimension. Brand configs define colors, fonts, and logos. The rendering pipeline: Satori → resvg (PNG) → Sharp (format conversion) → storage.
