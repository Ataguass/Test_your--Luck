import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ResultModalProps {
  winner: string | null;
  question: string;
  onClose: () => void;
  eliminationMode: boolean;
  onEliminate: () => void;
}

export const ResultModal = ({ winner, question, onClose, eliminationMode, onEliminate }: ResultModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [ejectionTextVisible, setEjectionTextVisible] = useState(false);

  useEffect(() => {
    if (winner) {
      setMounted(true);
      
      if (!eliminationMode) {
        // ONLY FIRE CONFETTI ON WINNING
        const duration = 2500;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 8, angle: 60, spread: 55, origin: { x: 0 },
            colors: ['#00e5ff', '#ff0055', '#ffea00', '#b000ff']
          });
          confetti({
            particleCount: 8, angle: 120, spread: 55, origin: { x: 1 },
            colors: ['#00e5ff', '#ff0055', '#ffea00', '#b000ff']
          });

          if (Date.now() < end) requestAnimationFrame(frame);
        };
        setTimeout(frame, 100);
      } else {
        // Ejection text delays to let the ghost float by
        const t = setTimeout(() => {
           setEjectionTextVisible(true);
        }, 2200);
        return () => clearTimeout(t);
      }

    } else {
      setTimeout(() => {
        setMounted(false);
        setEjectionTextVisible(false);
      }, 400); // Wait for transition out
    }
  }, [winner, eliminationMode]);

  if (!winner && !mounted) return null;

  const isImage = winner?.startsWith('data:image/');

  if (eliminationMode && winner) {
    return (
      <div className={`modal-overlay ejection-overlay ${winner ? 'visible' : ''}`} style={{ background: 'rgba(0,0,0,0.95)' }}>
        <div className="ejection-layer">
          <div className="ejection-drifter">
             {isImage ? (
                <img src={winner} alt="ejected" className="ejection-image" />
             ) : (
                <span className="ejection-text">{winner}</span>
             )}
          </div>
          {ejectionTextVisible && (
            <div className="ejection-subtext-layer">
              <div className="ejection-subtext">
                {isImage ? 'The Impostor was ejected.' : `${winner} was ejected.`}
              </div>
              <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={onEliminate}
                  className="modal-close-btn"
                  style={{ background: '#ff1111', color: '#fff', border: '3px solid #880000', width: 'auto' }}
                >
                  Confirm Elimination ⚔️
                </button>
                <button 
                  onClick={onClose}
                  className="modal-close-btn"
                  style={{ background: '#444', color: '#fff', border: '3px solid #222', width: 'auto' }}
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`modal-overlay ${winner ? 'visible' : ''}`}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎉</div>
        <h2 className="modal-title">We have a winner!</h2>
        
        {question && <p className="modal-question-text">{question}</p>}
        
        <div className="modal-winner-box" style={{ padding: isImage ? '2rem' : undefined }}>
          {isImage ? (
              <img src={winner!} alt="winner" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '4px solid white', margin: '0 auto', display: 'block' }} />
          ) : (
              <p className="modal-winner-text">{winner}</p>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={onClose}
            className="modal-close-btn"
          >
            Close & Spin Again
          </button>
        </div>
      </div>
    </div>
  );
};
