# Monorepo / Directory Structure

Since the MVP is a straightforward React application, a flat but organized directory structure using a standard Vite or Create React App scaffold is sufficient. 

```text
/spin-decide           (Root Directory)
├── public/            (Static assets, PWA manifest)
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.ico
│   └── service-worker.js
├── src/
│   ├── assets/        (Images, global icons)
│   ├── components/    (Reusable React components)
│   │   ├── Wheel/
│   │   │   ├── WheelContainer.tsx
│   │   │   ├── WheelSlice.tsx
│   │   │   └── Wheel.css     (Or module.css)
│   │   ├── Input/
│   │   │   ├── InputManager.tsx
│   │   │   └── OptionItem.tsx
│   │   └── Modal/
│   │       └── ResultModal.tsx
│   ├── hooks/         (Custom React Hooks)
│   │   └── useWheelMath.ts   (Handles angle conversions)
│   ├── utils/         (Helper functions)
│   │   └── calculateWinner.ts
│   ├── App.tsx        (Main layout and state orchestrator)
│   ├── index.tsx      (Entry point)
│   └── index.css      (Global styles/CSS Variables)
├── package.json
├── tsconfig.json
├── vite.config.ts     (If using Vite)
└── README.md
```

## Key Files
- **`App.tsx`**: Holds the global `options`, `isSpinning`, and `winner` states.
- **`calculateWinner.ts`**: Pure mathematical function crucial for testing the validity of the spin mechanic independently of the UI.
- **`manifest.json`**: Essential for the PWA "Add to Home Screen" prompt to work.
