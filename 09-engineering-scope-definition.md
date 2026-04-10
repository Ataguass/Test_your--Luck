# Engineering Scope Definition

## 1. In Scope for MVP
- **Frontend App**: React 18+ Single Page Application.
- **Responsive Layout**: Designed specifically to look like a native application on Mobile (iOS/Android browsers/PWA) and function as a centered widget on Desktop browsers.
- **Dynamic CSS Wheel**: Generating the roulette wheel slices dynamically using `conic-gradient` via CSS based on the options array.
- **React State Management**: In-memory state tracking utilizing standard Hooks (`useState`, `useEffect`).
- **Animation**: Utilizing CSS hardware-accelerated `transform: rotate(...)` over a fixed duration with `ease-out` timing function.
- **App Hosting**: Free tier static hosting utilizing Vercel or Netlify edge networks.
- **PWA Features**: Service worker setup to cache the `index.html`, JS, and CSS chunks for offline availability.

## 2. Out of Scope for MVP (Deferred to Phase 2)
- Server-side infrastructure (Node/Python/Ruby, etc.).
- Relational or Document databases (SQL/NoSQL).
- Authentication, Sign-in, or User accounts mechanisms.
- Saving lists securely to the cloud or sharing links with preset lists via URL parameters.
- WebSockets, WebRTC, or any real-time synchronization between multiple devices.
- Complex animation libraries (Three.js, WebGL) unless strictly required for performance; CSS is preferred.
- Non-equal slice distributions (Weighted options).
