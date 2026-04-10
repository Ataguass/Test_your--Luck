import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { OptionItem } from './OptionItem';
import { Plus, ImagePlus } from 'lucide-react';

interface InputManagerProps {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  isSpinning: boolean;
}

export const InputManager = ({ options, setOptions, isSpinning }: InputManagerProps) => {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddString = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    if (options.length >= 50) return alert('Maximum 50 options allowed.');
    
    setOptions([...options, inputValue.trim()]);
    setInputValue('');
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (options.length >= 50) return alert('Maximum 50 options allowed.');

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Str = event.target?.result as string;
      setOptions(prev => [...prev, base64Str]);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="input-manager">
      <form onSubmit={handleAddString} className="input-form">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isSpinning}
          placeholder="Type or paste Emojis 😎..."
          className="input-field"
        />
        
        {/* Adds Hidden File Input */}
        <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
        />
        <button 
           type="button" 
           disabled={isSpinning}
           className="input-add-btn"
           style={{ padding: '0 1rem', background: 'var(--surface-opaque)' }}
           onClick={() => fileInputRef.current?.click()}
           title="Add an Image Face!"
        >
            <ImagePlus size={20} />
        </button>

        <button 
          type="submit"
          disabled={isSpinning || !inputValue.trim()}
          className="input-add-btn"
          aria-label="Add option"
        >
          <Plus size={20} />
        </button>
      </form>
      
      <div className="options-list">
        {options.map((option, idx) => (
          <OptionItem 
            key={`${idx}-${option.substring(0,20)}`} 
            label={option} 
            onRemove={() => handleRemove(idx)} 
            disabled={isSpinning}
          />
        ))}
        {options.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0', fontWeight: 'bold' }}>
            Add options or pictures to spin!
          </div>
        )}
      </div>
    </div>
  );
};
