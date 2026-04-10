# System Architecture

## 1. High-Level Architecture
For the MVP, "Spin Decide" is a purely **Client-Side Single Page Application (SPA)**. There is no backend database or API requirement for the initial launch.

**System Context Diagram:**
`User Device (Mobile/Desktop Browser)` <----> `Vercel Edge Network (Static Hosting)`

All compute, state management, mathematical randomization, and rendering happen directly within the user's browser DOM.

## 2. Technology Stack
- **Frontend Framework:** React (Function components with Hooks).
- **Styling:** Vanilla CSS, CSS Modules, or Tailwind CSS (for fast, responsive layouts focusing on mobile-first sizing).
- **Animation:** Standard CSS transitions (`transform`, `rotate`) using the browser's hardware-accelerated rendering.
- **Build Tool:** Vite or Next.js (Static Export).
- **Deployment & Hosting:** Vercel (for automatic CI/CD from GitHub, global edge CDN, and out-of-the-box performance).
- **PWA Capabilities:** Local `manifest.json` and a Service Worker for offline capability.

## 3. Data Flow
1. **Input:** User inputs a string option -> React updates the `options` state array.
2. **Render:** React recalculates slice sizes (`360 / options.length`) -> updates the DOM with new CSS conic-gradients and text angles.
3. **Action:** User clicks "Spin" -> React sets `isSpinning` state to `true` -> calculates a randomized target degree -> updates `rotation` state.
4. **Animation:** Browser engine transitions the CSS `transform` rotation over a duration (e.g., 4000ms using an ease-out bezier curve).
5. **Resolution:** The transition ends (`onTransitionEnd` event) -> React calculates the winner array index using the final modulo angle -> updates `winner` state -> Result Modal component mounts and renders.

## 4. Future Scalability (Phase 2 - Real-time)
If the project scales to "Shared Group Sessions" (where all users watch the same wheel spinning across phones simultaneously):
- **Real-time Server:** Introduce a Node.js/Fastify server or a managed service like Supabase Realtime / WebSocket.
- **Sync Flow:** The host presses Spin. The server dictates the final randomized target degree and broadcasts it. All client devices trigger their CSS transition synchronized by the server payload.
