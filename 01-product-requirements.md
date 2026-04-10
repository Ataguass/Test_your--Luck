# Product Requirements Document (PRD)

## 1. Product Overview
**Name:** Spin Decide (Working Title)
**Concept:** A lightweight, mobile-first Progressive Web App (PWA) that helps groups or individuals make decisions (like who pays the bill or where to eat) via a customizable, spinning roulette wheel.
**Target Audience:** Friends, colleagues, and individuals looking for a fast, fun, and fair way to settle minor disputes or make arbitrary choices.

## 2. Problem Statement
Making group decisions (who pays, what to eat, what movie to watch) often leads to awkward pauses or endless debates. Existing solutions are either too complex or require downloading a native app.

## 3. Goals & Success Metrics
**Goal:** Provide an instant, frictionless decision-making tool accessible via a single URL.
**Metric:** Time-to-spin (users should be able to load the app, enter 3 options, and spin within 15 seconds).

## 4. MVP Core Features
- **Dynamic Option Entry:** Users can add, edit, and delete text options. Minimum of 2 options, maximum of 50.
- **Dynamic Wheel Visualization:** A circular wheel UI that automatically divides into equal slices based on the number of inputted options.
- **Spin Mechanic:** A button to trigger a randomized, physics-based spinning animation.
- **Winner Declaration:** A clear visual announcement of the selected option once the wheel stops.
- **Offline Capability:** Using a Service Worker to allow functionality even when offline.

## 5. Future/Out of Scope for MVP
- Saved/Pre-built lists (e.g., "Favorite Restaurants").
- Weighted probabilities (making one slice bigger than others).
- User accounts and backend storage.
- Real-time Shared Group Sessions.
