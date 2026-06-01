# Vinay Portfolio

Production-ready developer portfolio built with Next.js App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/Radix UI primitives, Resend, and Zod.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment

Create a local `.env` file with:

```bash
RESEND_API_KEY=your_resend_api_key
```

The API routes validate this value at runtime before sending email. Missing or invalid server email configuration returns a generic client error and logs details only on the server.

## Package Manager

This project uses npm only. `package-lock.json` is the source of truth, and `bun.lock` was removed to avoid dependency drift.

## Routes

- `/` - portfolio landing page
- `/projects` - all projects
- `/projects/[id]` - project details
- `/experience` - work experience
- `/resume` - current resume PDF
- `/contact` - full contact form
- `/blogs` - placeholder blog route
- `/api/send` - contact email endpoint
- `/api/feedback` - feedback email endpoint

## Production Checks

Before deploying, run:

```bash
npm run lint
npm run typecheck
npm audit
npm run build
```

See [docs/production-audit.md](docs/production-audit.md) for the latest codebase audit, risk assessment, implementation roadmap, and file-by-file change log.
