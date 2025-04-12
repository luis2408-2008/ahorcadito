import React, { useEffect } from 'react';
import { GameState } from '../types/game';
import { getCategoryName } from '../utils/gameUtils';
import HangmanSvg from './HangmanSvg';
import VirtualKeyboard from './VirtualKeyboard';

interface GameScreenProps {
  gameState: GameState;
  onGuessLetter: (letter: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onGuessLetter }) => {
  const guesserName = gameState.players[gameState.currentRound.wordGuesser].name;
  const secretWord = gameState.currentRound.secretWord;
  const correctLetters = gameState.currentRound.correctLetters;
  const incorrectLetters = gameState.currentRound.incorrectLetters;
  const lives = gameState.currentRound.lives;
  const categoryName = getCategoryName(gameState.currentRound.category);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.currentScreen === 'game') {
        const key = event.key.toUpperCase();
        if (/^[A-ZÑ]$/.test(key)) {
          onGuessLetter(key);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState.currentScreen, onGuessLetter]);

  return (
    <div id="game-screen" className="w-full px-4 py-2">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Left side - Hangman and player info */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="stats shadow mb-4">
                <div className="stat">
                  <div className="stat-title" id="current-player-label">Adivinando</div>
                  <div className="stat-value text-primary" id="current-player-name">{guesserName}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Vidas</div>
                  <div className="stat-value" id="lives-counter">{lives}</div>
                </div>
              </div>
              
              {/* SVG Hangman illustration */}
              <div className="w-60 h-60 relative">
                <HangmanSvg incorrectGuesses={incorrectLetters.length} />
              </div>
              
              <div className="badge badge-lg mt-2" id="category-badge">Categoría: {categoryName}</div>
            </div>
            
            {/* Right side - Word display and keyboard */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              {/* Word display */}
              <div className="my-6 min-h-16 flex justify-center items-center">
                <div id="word-display" className="flex flex-wrap justify-center gap-1">
                  {secretWord.split('').map((letter, index) => (
                    <div key={index} className="letter-box border-primary">
                      {correctLetters.includes(letter) ? letter : '_'}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Used letters display */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-center mb-2">Letras utilizadas:</h3>
                <div id="used-letters" className="flex flex-wrap justify-center gap-1 text-xs">
                  {incorrectLetters.map((letter, index) => (
                    <span key={index} className="px-2 py-1 rounded bg-error/20 text-error font-bold">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Virtual keyboard */}
              <VirtualKeyboard 
                correctLetters={correctLetters}
                incorrectLetters={incorrectLetters}
                onLetterClick={onGuessLetter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
