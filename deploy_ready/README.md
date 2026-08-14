# Instituto G+ — Website

Static React + Vite website prepared for deployment on Vercel, Netlify, Cloudflare Pages, or any static host.

## Build

```bash
npm install
npm run build
```

The production files are generated in `dist/`.

## Supabase

The booking form uses the browser Supabase client. Set these Vite environment variables in the hosting provider:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Do **not** expose a Supabase service-role key in frontend environment variables.
