import React from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <div id="instructions-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-title text-lg">Cómo jugar al Ahorcado</h3>
        <div className="py-4">
          <div className="mb-4">
            <h4 className="font-bold mb-2">Reglas básicas:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Un jugador elige una palabra secreta</li>
              <li>El otro jugador intenta adivinarla letra por letra</li>
              <li>Cada error añade una parte al dibujo del ahorcado</li>
              <li>Si el ahorcado se completa antes de adivinar la palabra, pierdes</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-bold mb-2">Puntuación:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>+10 puntos por adivinar la palabra</li>
              <li>+2 puntos por cada letra correcta</li>
              <li>-1 punto por cada letra incorrecta</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-bold mb-2">Niveles de dificultad:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Fácil: 8 vidas</li>
              <li>Medio: 6 vidas</li>
              <li>Difícil: 4 vidas</li>
            </ul>
          </div>
        </div>
        <div className="modal-action">
          <button id="close-instructions" className="btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
