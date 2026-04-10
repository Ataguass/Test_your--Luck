import { useState, useEffect } from 'react';
import { WheelContainer } from './components/Wheel/WheelContainer';
import { InputManager } from './components/Input/InputManager';
import { ResultModal } from './components/Modal/ResultModal';
import { calculateWinner } from './utils/calculateWinner';
import { startTickLoop, startAmbientEngine } from './utils/audio';
import { HistoryDrawer } from './components/HistoryDrawer';
import type { LogEntry } from './components/HistoryDrawer';
import { ScrollText } from 'lucide-react';

const PRESETS = [
  { title: "What to eat?", options: ['Pizza', 'Burgers', 'Sushi', 'Tacos', 'Pasta', 'Salad'] },
  { title: "Who's paying?", options: ['Player 1', 'Player 2', 'Player 3', 'Player 4'] },
  { title: "Movie Genre?", options: ['Action', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Thriller'] },
  { title: "Weekend Plan?", options: ['Movie Night', 'Board Games', 'Go Out', 'Video Games', 'Read', 'Sleep'] }
];

function App() {
  const [options, setOptions] = useState<string[]>(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [question, setQuestion] = useState<string>("Who is the Impostor?");
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  // Game Modes & Logs
  const [eliminationMode, setEliminationMode] = useState(false);
  const [historyLog, setHistoryLog] = useState<LogEntry[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Starts ambient ship engine noise quietly in the background upon first user interaction globally to bypass autoplay
  useEffect(() => {
    const unlockAudio = () => {
      startAmbientEngine();
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    return () => window.removeEventListener('pointerdown', unlockAudio);
  }, []);

  const startSpin = () => {
    if (options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);
    startAmbientEngine(); // Fallback trigger
    
    // Spin Math
    const baseRotations = 360 * (Math.floor(Math.random() * 5) + 8);
    const randomOffset = Math.floor(Math.random() * 360);
    const nextRotation = rotation + baseRotations + randomOffset;
    
    setRotation(nextRotation);

    startTickLoop(5000); 
  };

  const handleTransitionEnd = (finalRotation: number) => {
    setIsSpinning(false);
    const winningOption = calculateWinner(options, finalRotation);
    setWinner(winningOption);
    
    if (!winningOption) return;

    // Record history
    setHistoryLog(prev => [{
      id: Math.random().toString(),
      action: eliminationMode ? 'Eliminated' : 'Won',
      winner: winningOption,
      question: question,
      timestamp: new Date()
    }, ...prev]);

    // Result Audio
    if (!eliminationMode) {
      try {
        const winAudio = new Audio('/faa-sound.mp3');
        winAudio.volume = 0.8;
        winAudio.play().catch(e => console.log(e));
      } catch {}
    }
  };

  const handleEliminateAndSpin = () => {
    if (!winner) return;
    setWinner(null);
    setOptions(prev => prev.filter(opt => opt !== winner));
    
    setTimeout(() => {
      startSpin();
    }, 300);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Spin Decide</h1>
        
        <div className="question-container">
          <input 
            type="text" 
            className="question-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isSpinning}
            placeholder="Type your question..."
          />
           <div className="preset-chips">
            {PRESETS.map((preset, idx) => (
              <button 
                key={idx} 
                className="preset-chip"
                onClick={() => {
                  setQuestion(preset.title);
                  setOptions(preset.options);
                }}
                disabled={isSpinning}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Floating Log Button */}
      <button className="log-toggle-btn" onClick={() => setIsDrawerOpen(true)}>
        <ScrollText size={24} />
      </button>

      <HistoryDrawer 
         history={historyLog} 
         isOpen={isDrawerOpen} 
         onClose={() => setIsDrawerOpen(false)} 
      />

      <div className="app-content">
        <div className="wheel-section">
          <WheelContainer 
            options={options} 
            rotation={rotation} 
            onTransitionEnd={handleTransitionEnd} 
          />
          
          <div className="action-area" style={{ flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <button 
              className="spin-button" 
              onClick={startSpin} 
              disabled={isSpinning || options.length < 2}
            >
              {isSpinning ? 'FINDING IMPOSTOR...' : '🚨 EMERGENCY SPIN 🚨'}
            </button>
            
            {/* Elimination Mode Toggle */}
            <label className="elimination-toggle">
              <input 
                type="checkbox" 
                checked={eliminationMode}
                onChange={e => setEliminationMode(e.target.checked)}
                disabled={isSpinning}
              />
              <span className="toggle-text">⚔️ Survivor Mode (Elimination)</span>
            </label>

          </div>
        </div>

        <div className="input-section">
          <InputManager 
            options={options} 
            setOptions={setOptions} 
            isSpinning={isSpinning} 
          />
        </div>
      </div>

      <ResultModal 
        winner={winner} 
        question={question} 
        onClose={() => setWinner(null)} 
        eliminationMode={eliminationMode}
        onEliminate={handleEliminateAndSpin}
      />
    </div>
  );
}

export default App;
