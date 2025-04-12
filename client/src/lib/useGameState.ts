import { useState, useCallback, useEffect } from 'react';
import { 
  GameState, 
  INITIAL_GAME_STATE, 
  Player, 
  Category, 
  Difficulty 
} from '../types/game';
import { getLivesByDifficulty, isWordComplete, playSound } from '../utils/gameUtils';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return {
      ...INITIAL_GAME_STATE,
      theme: savedTheme === 'dark' ? 'dark' : 'light'
    };
  });

  // Start a new game from the welcome screen
  const startGame = useCallback(() => {
    const player1Name = gameState.players.player1.name.trim();
    const player2Name = gameState.players.player2.name.trim();

    // Validate player names
    if (!player1Name || !player2Name) {
      alert('Por favor ingresa los nombres de ambos jugadores.');
      return;
    }

    if (player1Name === player2Name) {
      alert('Los jugadores deben tener nombres diferentes.');
      return;
    }

    // Update lives based on difficulty
    const lives = getLivesByDifficulty(gameState.currentRound.difficulty);

    setGameState(prev => ({
      ...prev,
      players: {
        player1: { name: player1Name, score: 0 },
        player2: { name: player2Name, score: 0 }
      },
      currentRound: {
        ...prev.currentRound,
        lives
      },
      currentScreen: 'wordInput'
    }));
  }, [gameState.players.player1.name, gameState.players.player2.name, gameState.currentRound.difficulty]);

  // Confirm the secret word and start playing
  const confirmWord = useCallback(() => {
    const secretWord = gameState.currentRound.secretWord.trim().toUpperCase();

    // Validate secret word
    if (!secretWord) {
      alert('Por favor ingresa una palabra secreta.');
      return;
    }

    // Spanish regex including Ñ
    if (!/^[A-ZÑ]+$/.test(secretWord)) {
      alert('La palabra solo debe contener letras (sin acentos, espacios ni caracteres especiales).');
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentRound: {
        ...prev.currentRound,
        secretWord,
        showWord: false
      },
      currentScreen: 'game'
    }));
  }, [gameState.currentRound.secretWord]);

  // Process a letter guess
  const guessLetter = useCallback((letter: string) => {
    // Don't allow guessing if not on the game screen
    if (gameState.currentScreen !== 'game') return;
    
    // Don't do anything if this letter was already guessed
    if (gameState.currentRound.guessedLetters.includes(letter)) return;

    // Add to guessed letters list
    const newGuessedLetters = [...gameState.currentRound.guessedLetters, letter];
    
    const secretWord = gameState.currentRound.secretWord;
    let newCorrectLetters = [...gameState.currentRound.correctLetters];
    let newIncorrectLetters = [...gameState.currentRound.incorrectLetters];
    let newLives = gameState.currentRound.lives;
    
    // Update player scores
    const { player1, player2 } = gameState.players;
    const guesser = gameState.currentRound.wordGuesser;
    let newPlayers = { ...gameState.players };
    
    if (secretWord.includes(letter)) {
      // Correct guess
      newCorrectLetters = [...newCorrectLetters, letter];
      
      // +2 points for correct letter
      if (guesser === 'player1') {
        newPlayers.player1 = { ...player1, score: player1.score + 2 };
      } else {
        newPlayers.player2 = { ...player2, score: player2.score + 2 };
      }
      
      // Play correct sound
      playSound('correct', gameState.soundEnabled);
    } else {
      // Incorrect guess
      newIncorrectLetters = [...newIncorrectLetters, letter];
      newLives--;
      
      // -1 point for incorrect letter (minimum 0)
      if (guesser === 'player1') {
        newPlayers.player1 = { 
          ...player1, 
          score: Math.max(0, player1.score - 1) 
        };
      } else {
        newPlayers.player2 = { 
          ...player2, 
          score: Math.max(0, player2.score - 1) 
        };
      }
      
      // Play wrong sound
      playSound('wrong', gameState.soundEnabled);
    }
    
    // Update game state with new values
    setGameState(prev => ({
      ...prev,
      players: newPlayers,
      currentRound: {
        ...prev.currentRound,
        guessedLetters: newGuessedLetters,
        correctLetters: newCorrectLetters,
        incorrectLetters: newIncorrectLetters,
        lives: newLives
      }
    }));
    
    // Check win condition after state update
    if (isWordComplete(secretWord, newCorrectLetters)) {
      handleWin();
    } 
    // Check lose condition after state update
    else if (newLives <= 0) {
      handleLoss();
    }
  }, [
    gameState.currentScreen, 
    gameState.currentRound.secretWord, 
    gameState.currentRound.guessedLetters,
    gameState.currentRound.correctLetters,
    gameState.currentRound.incorrectLetters,
    gameState.currentRound.lives,
    gameState.currentRound.wordGuesser,
    gameState.players,
    gameState.soundEnabled
  ]);

  // Handle win condition
  const handleWin = useCallback(() => {
    // Add points for winning
    const guesser = gameState.currentRound.wordGuesser;
    const { player1, player2 } = gameState.players;
    let newPlayers = { ...gameState.players };
    
    // +10 points for win
    if (guesser === 'player1') {
      newPlayers.player1 = { ...player1, score: player1.score + 10 };
    } else {
      newPlayers.player2 = { ...player2, score: player2.score + 10 };
    }
    
    // Play win sound
    playSound('win', gameState.soundEnabled);
    
    // Update state and show win modal
    setGameState(prev => ({
      ...prev,
      players: newPlayers,
      showWinModal: true,
      isWin: true
    }));
  }, [gameState.currentRound.wordGuesser, gameState.players, gameState.soundEnabled]);

  // Handle loss condition
  const handleLoss = useCallback(() => {
    // Play lose sound
    playSound('lose', gameState.soundEnabled);
    
    // Show lose modal
    setGameState(prev => ({
      ...prev,
      showLoseModal: true,
      isWin: false
    }));
  }, [gameState.soundEnabled]);

  // Start next round
  const nextRound = useCallback(() => {
    // Switch roles
    const newWordCreator = gameState.currentRound.wordGuesser;
    const newWordGuesser = gameState.currentRound.wordCreator;
    
    // Reset round state but keep scores and settings
    setGameState(prev => ({
      ...prev,
      currentRound: {
        ...prev.currentRound,
        wordCreator: newWordCreator,
        wordGuesser: newWordGuesser,
        secretWord: '',
        lives: getLivesByDifficulty(prev.currentRound.difficulty),
        guessedLetters: [],
        correctLetters: [],
        incorrectLetters: [],
        showWord: false
      },
      currentScreen: 'wordInput'
    }));
  }, [gameState.currentRound.wordCreator, gameState.currentRound.wordGuesser, gameState.currentRound.difficulty]);

  // Restart game from scratch
  const restartGame = useCallback(() => {
    setGameState(prev => ({
      ...INITIAL_GAME_STATE,
      theme: prev.theme,
      soundEnabled: prev.soundEnabled
    }));
  }, []);

  // Show instructions modal
  const showInstructions = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showInstructionsModal: true
    }));
  }, []);

  // Hide instructions modal
  const hideInstructions = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showInstructionsModal: false
    }));
  }, []);

  // Hide win modal and show result screen
  const hideWinModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showWinModal: false,
      currentScreen: 'result'
    }));
  }, []);

  // Hide lose modal and show result screen
  const hideLoseModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showLoseModal: false,
      currentScreen: 'result'
    }));
  }, []);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  }, []);

  // Helper functions for updating specific parts of game state
  const gameActions = {
    setPlayer1Name: (name: string) => {
      setGameState(prev => ({
        ...prev,
        players: {
          ...prev.players,
          player1: {
            ...prev.players.player1,
            name
          }
        }
      }));
    },
    
    setPlayer2Name: (name: string) => {
      setGameState(prev => ({
        ...prev,
        players: {
          ...prev.players,
          player2: {
            ...prev.players.player2,
            name
          }
        }
      }));
    },
    
    setDifficulty: (difficulty: Difficulty) => {
      setGameState(prev => ({
        ...prev,
        currentRound: {
          ...prev.currentRound,
          difficulty,
          lives: getLivesByDifficulty(difficulty)
        }
      }));
    },
    
    setCategory: (category: Category) => {
      setGameState(prev => ({
        ...prev,
        currentRound: {
          ...prev.currentRound,
          category
        }
      }));
    },
    
    setSecretWord: (word: string) => {
      setGameState(prev => ({
        ...prev,
        currentRound: {
          ...prev.currentRound,
          secretWord: word
        }
      }));
    },
    
    toggleShowWord: () => {
      setGameState(prev => ({
        ...prev,
        currentRound: {
          ...prev.currentRound,
          showWord: !prev.currentRound.showWord
        }
      }));
    },
    
    guessLetter
  };

  return {
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
  };
};
