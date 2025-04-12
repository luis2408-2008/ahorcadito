import React from 'react';

interface HangmanSvgProps {
  incorrectGuesses: number;
}

const HangmanSvg: React.FC<HangmanSvgProps> = ({ incorrectGuesses }) => {
  // Determine which parts should be visible based on incorrect guesses
  const shouldShowPart = (partIndex: number) => {
    return incorrectGuesses > partIndex ? 'opacity-100' : 'opacity-0';
  };

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" className="hangman-svg stroke-2">
      {/* Base */}
      <line x1="40" y1="180" x2="160" y2="180" />
      {/* Pole */}
      <line x1="60" y1="20" x2="60" y2="180" />
      {/* Top */}
      <line x1="60" y1="20" x2="120" y2="20" />
      {/* Rope */}
      <line 
        x1="120" y1="20" x2="120" y2="40" 
        id="hangman-rope" 
        className={shouldShowPart(0)} 
      />
      {/* Head */}
      <circle 
        cx="120" cy="55" r="15" 
        fill="none" 
        id="hangman-head" 
        className={shouldShowPart(1)} 
      />
      {/* Body */}
      <line 
        x1="120" y1="70" x2="120" y2="120" 
        id="hangman-body" 
        className={shouldShowPart(2)} 
      />
      {/* Left Arm */}
      <line 
        x1="120" y1="80" x2="100" y2="100" 
        id="hangman-left-arm" 
        className={shouldShowPart(3)} 
      />
      {/* Right Arm */}
      <line 
        x1="120" y1="80" x2="140" y2="100" 
        id="hangman-right-arm" 
        className={shouldShowPart(4)} 
      />
      {/* Left Leg */}
      <line 
        x1="120" y1="120" x2="100" y2="150" 
        id="hangman-left-leg" 
        className={shouldShowPart(5)} 
      />
      {/* Right Leg */}
      <line 
        x1="120" y1="120" x2="140" y2="150" 
        id="hangman-right-leg" 
        className={shouldShowPart(6)} 
      />
    </svg>
  );
};

export default HangmanSvg;
