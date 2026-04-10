1. High-Level Architecture
For the MVP, the application will be a purely Client-Side Single Page Application (SPA). There is no requirement for a backend database or API for the initial launch, ensuring lightning-fast performance and zero server costs.

2. Technology Stack

Frontend Framework: React (Function components with Hooks).

Styling: CSS Modules or Tailwind CSS (for fast, responsive mobile layouts).

Animation: Standard CSS transitions (transform, rotate) or framer-motion for advanced easing.

Deployment & Hosting: Vercel (for automatic CI/CD from GitHub, global edge CDN, and built-in PWA support).

3. Component Architecture

App: The root container managing global state.

Header: App title and simple settings (if any).

WheelContainer: Calculates slice sizes and handles the rotation styles.

WheelSlice: Renders individual CSS conic-gradients and text labels.

Controls: Houses the "Spin" button.

InputManager: Manages the list of options.

OptionItem: Individual list items with a delete toggle.

ResultModal: Displays the final winner.