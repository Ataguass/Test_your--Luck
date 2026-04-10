interface WheelSliceProps {
  label: string;
  index: number;
  totalSlices: number;
}

export const WheelSlice = ({ label, index, totalSlices }: WheelSliceProps) => {
  const sliceAngle = 360 / totalSlices;
  const rotation = index * sliceAngle + sliceAngle / 2;

  const isImage = label.startsWith('data:image/');

  return (
    <div
      className="slice-container"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="slice-text-wrapper" style={{ alignItems: 'flex-start' }}>
        {isImage ? (
           <img 
               src={label} 
               alt="slice option" 
               className="slice-image-render"
           />
        ) : (
           <span className="slice-text">
             {label}
           </span>
        )}
      </div>
    </div>
  );
};
