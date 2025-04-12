import React from 'react';
import { GameState } from '../types/game';
import { getCategoryName } from '../utils/gameUtils';

interface ResultScreenProps {
  gameState: GameState;
  nextRound: () => void;
  restartGame: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  gameState,
  nextRound,
  restartGame
}) => {
  const { players, currentRound, isWin } = gameState;
  const secretWord = currentRound.secretWord;
  const categoryName = getCategoryName(currentRound.category);

  return (
    <div id="result-screen" className="w-full max-w-lg mx-auto px-4 py-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className={`card-title text-2xl mb-2 ${isWin ? 'text-success' : 'text-error'}`} id="result-title">
            {isWin ? '¡Palabra adivinada!' : 'La palabra no fue adivinada'}
          </h2>
          
          <div className="divider"></div>
          
          <div className="stats shadow stats-vertical lg:stats-horizontal w-full mb-4">
            <div className="stat">
              <div className="stat-title">Palabra</div>
              <div className="stat-value font-mono text-lg md:text-2xl" id="result-word">{secretWord}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Categoría</div>
              <div className="stat-value text-lg md:text-2xl" id="result-category">{categoryName}</div>
            </div>
          </div>
          
          <div className="stats shadow mb-6 w-full">
            <div className="stat">
              <div className="stat-title">Puntuación</div>
              <div className="stat-value text-primary" id="player1-score">{players.player1.score}</div>
              <div className="stat-desc" id="player1-name-display">{players.player1.name}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Puntuación</div>
              <div className="stat-value text-secondary" id="player2-score">{players.player2.score}</div>
              <div className="stat-desc" id="player2-name-display">{players.player2.name}</div>
            </div>
          </div>
          
          <div className="card-actions justify-center gap-4">
            <button 
              id="next-round" 
              className="btn btn-primary"
              onClick={nextRound}
            >
              Siguiente Ronda
            </button>
            <button 
              id="restart-game" 
              className="btn btn-outline"
              onClick={restartGame}
            >
              Reiniciar Juego
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
