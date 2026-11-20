# TenderTrack frontend

React 18 + Vite. Talks to the Flask API on Render: https://backend-tender-trackerr.onrender.com (docs: /apidocs/).

## Install and run
Needs Node 18+ (check with `node -v`).

    npm install
    npm run dev        # http://localhost:5174
    npm test           # vitest suite
    npm run build      # production build in dist/

No `.env` is needed: the app calls the Render API by default. To use a local Flask on port 5000 instead, copy `.env.example` to `.env` and set `VITE_API_URL=/api`.

## Accounts
Register -> paste the emailed token on /verify -> sign in. Accounts already verified on the backend just sign in. Admins are created on the backend with `python seed.py`.

## Deploy (Vercel/Netlify)
Build `npm run build`, output `dist`. `vercel.json` and `public/_redirects` make page refreshes work.
Then on Render set `CORS_ORIGINS` to `http://localhost:5174,https://YOUR-FRONTEND-URL` (comma separated, no spaces, no trailing slash) and redeploy.
