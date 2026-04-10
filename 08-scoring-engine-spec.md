# Scoring & Logic Engine Spec

While Spin Decide doesn't have a traditional point-scoring engine, the core algorithm for generating randomized spins and determining the victor falls under this spec.

## 1. Slice Calculation
The wheel MUST always be a perfect 360-degree circle evenly divided.
*   **Input**: `N` (number of options)
*   **Function**: `SliceAngle = 360 / N`
*   **Render Logic**: Start from 0 degrees. For each option `i`, render a conic gradient CSS slice spanning from `i * SliceAngle` to `(i + 1) * SliceAngle`.

## 2. The Spin Randomizer
To ensure the spin feels significant and randomized:
*   **Base Rotations**: Add 5 to 10 full rotations so the animation takes 3-5 seconds.
    `BaseSpin = 360 * 5`
*   **Variable Target**: Generate a random degree.
    `RandomAngle = Math.floor(Math.random() * 360)`
*   **New Target Rotation**: 
    `NextRotation = CurrentRotation + BaseSpin + RandomAngle`

## 3. Winner Resolution Path
When the CSS `onTransitionEnd` event fires, the visual angle must be mapped back to the options array.

**Algorithm (`calculateWinner.ts`)**:
1. Get the final absolute rotation: `Rotation`
2. Normalize it to a single circle: `Normalized = Rotation % 360`
3. Accounting for the pointer marker. If the pointer marker is at the very top (270 degrees in CSS or straight up), adjust the offset based on your CSS transform origin.
    *(Assuming pointer is at 0 degrees top)*
4. Calculate the winning index:
    *   Reverse the direction of the rotation math (since the wheel spins clockwise, the option passing the top goes counter-clockwise relative to the wheel).
    *   `winnerAngle = (360 - Normalized) % 360`
    *   `winnerIndex = Math.floor(winnerAngle / SliceAngle)`
5. Return `options[winnerIndex]`
