# Information Architecture

## 1. Overview
The Information Architecture for Spin Decide is designed as a single-page view. Since the application is highly focused on a singular utility—spinning a wheel to choose an option—the architecture prioritizes immediate access to core functions.

## 2. Sitemap / Component Hierarchy

*   **App Root** *(Global State Manager)*
    *   **Header**
        *   App Logo/Title
    *   **Main Application View**
        *   **Wheel Container**
            *   Wheel Visualizer Element
            *   Wheel Slices (Generated dynamically)
            *   Center Pivot/Indicator (Points to Winner)
        *   **Controls Area**
            *   Spin Action Button
        *   **Input Manager (Options List)**
            *   New Option Input Field
            *   "Add" Button
            *   List of entered Options
                *   Option Text Display
                *   Remove/Delete Button
    *   **Overlay Elements**
        *   **Result Modal**
            *   Winning Option Text Highlight
            *   "Done" / "Spin Again" actions

## 3. User Navigation Flow
1. **Entry**: User loads the URL. They see a default wheel with sample options (e.g., "Yes", "No").
2. **Setup**: User scrolls or tabs to the Input Manager to clear defaults and add their own options. Wheel reflects changes instantly.
3. **Execution**: User clicks "Spin" in the middle of the screen. Interface becomes read-only.
4. **Resolution**: Wheel stops. Result Modal appears overlaying the screen.
5. **Reset**: User clicks "Close Modal" or taps outside it and returns to the Setup state to spin again or modify options.
