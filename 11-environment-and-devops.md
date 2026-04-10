# Environment and DevOps

## 1. Local Development Environment
- **Node.js**: version `20.x` (LTS) or higher.
- **Package Manager**: `npm` or `yarn` standard.
- **Local Dev Server**: Vite using `npm run dev`. Features Hot-Module Replacement (HMR) for instant previewing.
- **Linting & Formatting**: ESLint and Prettier configs integrated with IDEs (VSCode/Cursor).

## 2. CI/CD Pipeline
- **Provider**: Vercel Git Integration.
- **Process**:
    1. Developer pushes a commit to the `main` branch on GitHub.
    2. Vercel automatically detects the push via Webhooks.
    3. Vercel initiates a build (`npm run build`), generating static assets.
    4. Upon successful build, artifacts are instantly deployed across Vercel’s global Edge Network.
- **Pull Request Previews**: Vercel will automatically build ephemeral preview environments for any branch/PR created, providing a unique URL for testing before merging to `main`.

## 3. Environments
Since this is an API-less MVP, environments are extremely simple.
- **Development**: `localhost:5173` (Running locally via Vite)
- **Preview/Staging**: `*.vercel.app` (PR specific deployment links)
- **Production**: Custom domain (e.g., `spindecide.com`) or standard production Vercel project link.

## 4. Error Logging (Optional add-on)
- Integration of a lightweight frontend error tracking tool like Sentry or LogRocket to monitor JS crashes or wheel calculation anomalies on varied mobile devices. If omitted for MVP, browser console serves as the primary diagnostic tool.
