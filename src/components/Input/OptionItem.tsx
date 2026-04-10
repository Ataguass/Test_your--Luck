import React from 'react';
import { Trash2 } from 'lucide-react';

interface OptionItemProps {
  label: string;
  onRemove: () => void;
  disabled: boolean;
}

export const OptionItem: React.FC<OptionItemProps> = ({ label, onRemove, disabled }) => {
  const isImage = label.startsWith('data:image/');
  const displayLabel = isImage ? `📸 [IMAGE SLICE]` : label;

  return (
    <div className="option-item">
      <span className="option-label" data-is-image={isImage}>{displayLabel}</span>
      <button
        onClick={onRemove}
        disabled={disabled}
        className="option-remove-btn"
        aria-label={`Remove option ${label}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
