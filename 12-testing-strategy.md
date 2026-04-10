# Testing Strategy

## 1. Unit Testing
The mathematical core of the application must be perfectly reliable. Let React handle rendering logic, but extract calculations.
- **Tool:** Jest or Vitest.
- **Targets:**
    - `calculateWinner(finalAngle, numberOfSlice)` should correctly identify index 0, 1, 2, etc., based on given rotational offsets.
    - Validate logic handles the 360-degree wrap-around threshold properly.
    - Test boundary cases (Exactly on the line between two slices).

## 2. Integration / Component Testing
Ensure the UI components behave correctly with state changes.
- **Tool:** React Testing Library.
- **Targets:**
    - Adding a new valid option increments the list size.
    - Attempting to spin with < 2 options prevents the action or shows a warning.
    - Clicking the 'Delete' button on an option successfully removes it.

## 3. End-to-End (E2E) Testing
Simulate a real user session traversing the complete path.
- **Tool:** Cypress or Playwright.
- **Flow:**
    1. Load application URL.
    2. Add "Pizza", "Burgers", "Sushi" to inputs.
    3. Assert Wheel visually displays 3 partitions.
    4. Click 'Spin' button.
    5. Assert Spin button is disabled.
    6. Wait `X` seconds for CSS transition to end.
    7. Assert `ResultModal` is visible and text matches one of the three options.

## 4. Manual QA & Device Fragmentation
Due to heavy reliance on CSS animations and physical layout constraints, manual visual testing is crucial.
- **Devices:**
    - Minimum iPhone (iOS Safari)
    - Minimum Android (Chrome Android)
    - Large Desktop Monitor (Verify it centers and doesn't stretch weirdly).
- **Offline Check:** Disconnect from WiFi/Cellular on mobile and refresh the page to verify the Service Worker successfully loads the app from the PWA cache.
