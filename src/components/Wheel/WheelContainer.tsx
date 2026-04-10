import { WheelSlice } from './WheelSlice';

interface WheelContainerProps {
  options: string[];
  rotation: number;
  onTransitionEnd: (finalRotation: number) => void;
}

export const WheelContainer = ({ options, rotation, onTransitionEnd }: WheelContainerProps) => {

  const generateConicGradient = () => {
    const N = options.length;
    if (N === 0) return 'transparent';
    if (N === 1) return '#2563eb';
    
    // Iconic Among Us Crewmate Palette
    const PREMIUM_PALETTE = [
      '#C51111', // Red
      '#132ED1', // Blue
      '#117F2D', // Green
      '#ED54BA', // Pink
      '#F07D0D', // Orange
      '#F6F657', // Yellow
      '#3F474E', // Black (Dark)
      '#D6DFE0', // White
      '#6B2FBC', // Purple
      '#71491E', // Brown
      '#38FEDB', // Cyan
      '#50EF39', // Lime
    ];
    
    let gradientParts = [];
    const slicePercentage = 100 / N;
    
    for (let i = 0; i < N; i++) {
        // We pick colors and make sure the last color doesn't exactly match the first if N is odd
        let colorIndex = i % PREMIUM_PALETTE.length;
        if (i === N - 1 && N % 2 !== 0 && PREMIUM_PALETTE[colorIndex] === PREMIUM_PALETTE[0]) {
           colorIndex = (colorIndex + 1) % PREMIUM_PALETTE.length;
        }
        const color = PREMIUM_PALETTE[colorIndex];
        
        // Add a harsh stop to create crisp lines without blurring
        gradientParts.push(`${color} ${i * slicePercentage}% ${(i + 1) * slicePercentage}%`);
    }
    
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer"></div>
      
      <div 
        className="wheel-circle"
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: rotation === 0 ? '0s' : '5s',
          background: generateConicGradient()
        }}
        onTransitionEnd={() => onTransitionEnd(rotation)}
      >
        {options.map((opt, idx) => (
          <WheelSlice key={idx} label={opt} index={idx} totalSlices={options.length} />
        ))}
        {/* Adds 3D spherical shading to the entire wheel */}
        <div className="wheel-overlay"></div>
      </div>
      
      <div className="wheel-center-cap"></div>
    </div>
  );
};
