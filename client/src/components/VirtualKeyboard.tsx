import React from 'react';

interface VirtualKeyboardProps {
  correctLetters: string[];
  incorrectLetters: string[];
  onLetterClick: (letter: string) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  correctLetters,
  incorrectLetters,
  onLetterClick
}) => {
  // Define the keyboard layout
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Determine the appropriate CSS class for each letter button
  const getButtonClass = (letter: string) => {
    let className = "btn btn-sm keyboard-btn";
    
    if (correctLetters.includes(letter)) {
      className += " btn-success btn-disabled";
    } else if (incorrectLetters.includes(letter)) {
      className += " btn-error btn-disabled";
    }
    
    return className;
  };

  return (
    <div id="virtual-keyboard" className="flex flex-col items-center gap-1 mb-4">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((letter) => (
            <button
              key={letter}
              className={getButtonClass(letter)}
              data-letter={letter}
              onClick={() => onLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
