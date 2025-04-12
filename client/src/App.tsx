import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useGameState } from "./lib/useGameState";
import WelcomeScreen from "./components/WelcomeScreen";
import WordInputScreen from "./components/WordInputScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import InstructionsModal from "./components/InstructionsModal";
import WinModal from "./components/WinModal";
import LoseModal from "./components/LoseModal";
import NotFound from "@/pages/not-found";

function GameContainer() {
  const {
    gameState,
    startGame,
    confirmWord,
    nextRound,
    restartGame,
    toggleSound,
    toggleTheme,
    gameActions,
    showInstructions,
    hideInstructions,
    hideWinModal,
    hideLoseModal
  } = useGameState();

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // When theme changes in gameState, update document and localStorage
  useEffect(() => {
    const theme = gameState.theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [gameState.theme]);

  return (
    <div id="game-container" className="min-h-screen flex flex-col items-center transition-all duration-300">
      {/* Header with title and theme toggle */}
      <header className="w-full p-4 flex justify-between items-center">
        <h1 className="font-title text-2xl md:text-4xl text-primary">El Ahorcado</h1>
        <div className="flex items-center gap-2">
          <button 
            id="sound-toggle" 
            className={`btn btn-circle btn-sm btn-ghost ${gameState.soundEnabled ? 'btn-active' : ''}`} 
            aria-label="Toggle sound"
            onClick={toggleSound}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
          <label className="swap swap-rotate">
            <input 
              type="checkbox" 
              id="theme-toggle" 
              className="theme-controller" 
              checked={gameState.theme === 'dark'}
              onChange={toggleTheme}
            />
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          </label>
          <button 
            id="info-button" 
            className="btn btn-circle btn-sm btn-ghost" 
            aria-label="Game instructions"
            onClick={showInstructions}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow w-full max-w-4xl px-4 py-6 flex flex-col items-center">
        {/* Game Screens - Only one is visible at a time */}
        {gameState.currentScreen === 'welcome' && (
          <WelcomeScreen 
            startGame={startGame} 
            gameState={gameState}
            setPlayer1Name={(name) => gameActions.setPlayer1Name(name)}
            setPlayer2Name={(name) => gameActions.setPlayer2Name(name)}
            setDifficulty={(difficulty) => gameActions.setDifficulty(difficulty)}
            setCategory={(category) => gameActions.setCategory(category)}
          />
        )}

        {gameState.currentScreen === 'wordInput' && (
          <WordInputScreen 
            gameState={gameState}
            confirmWord={confirmWord} 
            setSecretWord={(word) => gameActions.setSecretWord(word)}
            toggleShowWord={() => gameActions.toggleShowWord()} 
          />
        )}

        {gameState.currentScreen === 'game' && (
          <GameScreen 
            gameState={gameState}
            onGuessLetter={(letter) => gameActions.guessLetter(letter)}
          />
        )}

        {gameState.currentScreen === 'result' && (
          <ResultScreen 
            gameState={gameState}
            nextRound={nextRound}
            restartGame={restartGame}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center opacity-70 text-sm">
        <p>Juego del Ahorcado &copy; 2023 - Un juego para dos jugadores</p>
      </footer>

      {/* Modals */}
      <InstructionsModal 
        isOpen={gameState.showInstructionsModal} 
        onClose={hideInstructions} 
      />
      
      <WinModal 
        isOpen={gameState.showWinModal}
        secretWord={gameState.currentRound.secretWord}
        onContinue={hideWinModal}
      />
      
      <LoseModal 
        isOpen={gameState.showLoseModal}
        secretWord={gameState.currentRound.secretWord}
        onContinue={hideLoseModal}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={GameContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
