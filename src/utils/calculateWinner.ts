export const calculateWinner = (options: string[], finalRotation: number): string | null => {
  if (options.length === 0) return null;
  const sliceAngle = 360 / options.length;
  
  // Normalize the rotation to 0 - 359 degrees
  // This gives us how far the wheel *currently* is from its start position
  const normalizedRotation = finalRotation % 360;
  
  // Because the wheel spins clockwise, the option that passes the top point
  // rotates relative to the offset angle.
  // E.g. If wheel rotates 1 degree clockwise, the 359th degree is now at the top.
  const offsetAngle = (360 - normalizedRotation) % 360;
  
  // We determine the index based on the calculated angle
  const index = Math.floor(offsetAngle / sliceAngle);
  
  return options[index];
};
