import React from 'react';
import { GameState, Category, Difficulty } from '../types/game';

interface WelcomeScreenProps {
  gameState: GameState;
  startGame: () => void;
  setPlayer1Name: (name: string) => void;
  setPlayer2Name: (name: string) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setCategory: (category: Category) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  gameState,
  startGame,
  setPlayer1Name,
  setPlayer2Name,
  setDifficulty,
  setCategory
}) => {
  return (
    <div id="welcome-screen" className="w-full max-w-md mx-auto px-4 py-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title font-title text-3xl mb-6 text-primary">¡Bienvenidos al Ahorcado!</h2>
          <p className="mb-6">Un juego clásico para dos jugadores</p>
          
          <div className="form-control w-full max-w-xs mb-6">
            <label className="label">
              <span className="label-text">Nombre del Jugador 1</span>
            </label>
            <input 
              type="text" 
              id="player1-name" 
              placeholder="Ingresa tu nombre" 
              className="input input-bordered w-full" 
              value={gameState.players.player1.name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-6">
            <label className="label">
              <span className="label-text">Nombre del Jugador 2</span>
            </label>
            <input 
              type="text" 
              id="player2-name" 
              placeholder="Ingresa tu nombre" 
              className="input input-bordered w-full" 
              value={gameState.players.player2.name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
          
          <div className="form-control w-full max-w-xs mb-6">
            <label className="label">
              <span className="label-text">Dificultad</span>
            </label>
            <select 
              className="select select-bordered w-full" 
              id="difficulty-select"
              value={gameState.currentRound.difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">Fácil (8 vidas)</option>
              <option value="medium">Medio (6 vidas)</option>
              <option value="hard">Difícil (4 vidas)</option>
            </select>
          </div>
          
          <div className="form-control w-full max-w-xs mb-8">
            <label className="label">
              <span className="label-text">Categoría</span>
            </label>
            <select 
              className="select select-bordered w-full" 
              id="category-select"
              value={gameState.currentRound.category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="random">Aleatorio</option>
              <option value="animals">Animales</option>
              <option value="food">Comida</option>
              <option value="countries">Países</option>
              <option value="movies">Películas</option>
            </select>
          </div>
          
          <div className="card-actions">
            <button 
              id="start-game" 
              className="btn btn-primary btn-pulse font-bold px-8"
              onClick={startGame}
            >
              ¡Comenzar Juego!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
