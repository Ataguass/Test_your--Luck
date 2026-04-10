# Development Phases

## Phase 1: Repository Setup & Skeleton (Days 1)
*   Initialize Git repository.
*   Setup React project using Vite (TypeScript + SWC).
*   Add CSS boilerplate (or configure Tailwind CSS).
*   Create directory structure and empty placeholder components.
*   Deploy "Hello World" to Vercel to establish the CI/CD pipeline immediately.

## Phase 2: State & Input Management (Days 2-3)
*   Implement `App.tsx` global state (`options`).
*   Build `InputManager` and `OptionItem` components.
*   Implement Add/Edit/Delete logic for the array state.
*   Write unit tests to enforce Minimum (2) and Maximum (50) boundaries.

## Phase 3: The Wheel Visualization (Days 4-5)
*   Implement the mathematical slice calculations (`360 / N`).
*   Build `WheelContainer` and `WheelSlice` components.
*   Dynamically generate the CSS `conic-gradient` background to paint the wheel.
*   Position the text labels using localized CSS rotation per slice.

## Phase 4: Mechanics and Logic (Days 6-7)
*   Implement the randomizer math (Base spins + random angle).
*   Wire the "Spin" button to apply the CSS `transform` style dynamically.
*   Implement `onTransitionEnd` capturing.
*   Build the `calculateWinner.ts` utility to extract the final winner based on angles.
*   Build the `ResultModal` component to display the winner.

## Phase 5: Polish & PWA (Day 8)
*   Add animations to list additions/deletions.
*   Configure `manifest.json` with generated Favicons and app icons.
*   Use Vite-PWA plugin to generate service workers for offline caching.
*   Manual UX testing on iOS Safari and Chrome Android.

## Future Phase (Post-Launch)
*   Introduce Node.js WebSocket Server.
*   Add "Start Live Session" functionality.
*   Move to a persistent database model.
