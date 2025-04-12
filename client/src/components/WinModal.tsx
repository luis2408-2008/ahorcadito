import React from 'react';

interface WinModalProps {
  isOpen: boolean;
  secretWord: string;
  onContinue: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, secretWord, onContinue }) => {
  return (
    <div id="win-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-title text-lg text-success">¡Palabra adivinada correctamente!</h3>
        <div className="py-4 text-center">
          <div className="text-3xl font-bold mb-4" id="win-word">{secretWord}</div>
          <div className="badge badge-success gap-2 my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span id="win-points">+10 puntos</span>
          </div>
        </div>
        <div className="modal-action">
          <button 
            id="continue-after-win" 
            className="btn btn-success"
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
