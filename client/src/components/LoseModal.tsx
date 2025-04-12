import React from 'react';

interface LoseModalProps {
  isOpen: boolean;
  secretWord: string;
  onContinue: () => void;
}

const LoseModal: React.FC<LoseModalProps> = ({ isOpen, secretWord, onContinue }) => {
  return (
    <div id="lose-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-title text-lg text-error">¡Te has quedado sin vidas!</h3>
        <div className="py-4 text-center">
          <p className="mb-4">La palabra correcta era:</p>
          <div className="text-3xl font-bold mb-4" id="lose-word">{secretWord}</div>
          <div className="badge badge-error gap-2 my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>0 puntos</span>
          </div>
        </div>
        <div className="modal-action">
          <button 
            id="continue-after-lose" 
            className="btn btn-error"
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseModal;
