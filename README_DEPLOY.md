Deployment notes — Next.js (production) and Railway

This repo is configured to run as a Next.js standalone app and includes a Dockerfile and Procfile for deployment.

Quick local production run (build + start on port 4000):

```bash
# Build
npm run build

# Start production server on port 4000
PORT=4000 npm run start
```

Railway (managed) notes:
- Railway will detect the presence of a `Dockerfile` and build using it. The `railway.toml` contains a `startCommand` fallback.
- Ensure environment variables are set in Railway (OPENAI_API_KEY, MONGODB_ATLAS_URI, etc.).

Docker notes:
- The provided `Dockerfile` uses the Next.js standalone output. The `next.config.js` already sets `output: 'standalone'`.
- Build locally with `docker build -t jeremyedwards-cv .` and run with `docker run -p 3000:3000 -e PORT=3000 jeremyedwards-cv`.

If you want me to also add a small Github Actions workflow to build and push the image, I can add that next.
