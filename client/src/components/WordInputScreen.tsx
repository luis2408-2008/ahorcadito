import React from 'react';
import { GameState } from '../types/game';
import { getCategoryName } from '../utils/gameUtils';

interface WordInputScreenProps {
  gameState: GameState;
  confirmWord: () => void;
  setSecretWord: (word: string) => void;
  toggleShowWord: () => void;
}

const WordInputScreen: React.FC<WordInputScreenProps> = ({
  gameState,
  confirmWord,
  setSecretWord,
  toggleShowWord
}) => {
  const creatorName = gameState.players[gameState.currentRound.wordCreator].name;
  const categoryName = getCategoryName(gameState.currentRound.category);

  return (
    <div id="word-input-screen" className="w-full max-w-md mx-auto px-4 py-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-2" id="word-input-player-name">
            {creatorName}
          </h2>
          <p className="mb-6">Es tu turno de elegir una palabra</p>
          
          <div className="alert alert-info shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <span id="category-display">Categoría: {categoryName}</span>
            </div>
          </div>
          
          <div className="form-control w-full max-w-xs mb-8">
            <label className="label">
              <span className="label-text">Tu palabra secreta</span>
            </label>
            <input 
              type={gameState.currentRound.showWord ? "text" : "password"} 
              id="secret-word-input" 
              placeholder="Ingresa la palabra" 
              className="input input-bordered w-full" 
              value={gameState.currentRound.secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">Usa solo letras sin acentos, sin espacios ni caracteres especiales.</span>
            </label>
          </div>
          
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">Mostrar palabra mientras escribo</span> 
              <input 
                type="checkbox" 
                id="show-word-toggle" 
                className="toggle toggle-primary"
                checked={gameState.currentRound.showWord}
                onChange={toggleShowWord}
              />
            </label>
          </div>
          
          <div className="card-actions mt-6">
            <button 
              id="confirm-word" 
              className="btn btn-primary font-bold px-8"
              onClick={confirmWord}
            >
              Confirmar Palabra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordInputScreen;
