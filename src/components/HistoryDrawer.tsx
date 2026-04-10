export interface LogEntry {
  id: string;
  winner: string;
  action: 'Won' | 'Eliminated';
  question: string;
  timestamp: Date;
}

interface HistoryDrawerProps {
  history: LogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryDrawer = ({ history, isOpen, onClose }: HistoryDrawerProps) => {
  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`history-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Captain's Log</h2>
          <button className="drawer-close" onClick={onClose}>&times;</button>
        </div>
        <div className="drawer-content">
          {history.length === 0 ? (
            <div className="empty-log">No entries yet. Spin to record fate.</div>
          ) : (
            <ul className="log-list">
              {history.map((entry, idx) => {
                const isImage = entry.winner.startsWith('data:image/');
                const isEliminated = entry.action === 'Eliminated';
                
                return (
                  <li key={entry.id} className="log-item">
                    <div className="log-index">#{history.length - idx}</div>
                    <div className="log-details">
                      <div className="log-question">{entry.question}</div>
                      <div className="log-outcome">
                        {isImage ? (
                          <img src={entry.winner} alt="face" className="log-image" />
                        ) : (
                          <span className={`log-winner ${isEliminated ? 'eliminated' : 'won'}`}>
                            {entry.winner}
                          </span>
                        )}
                        <span className={`log-badge ${isEliminated ? 'badge-red' : 'badge-green'}`}>
                          {entry.action}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
