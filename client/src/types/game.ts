export type Player = {
  name: string;
  score: number;
};

export type GamePlayers = {
  player1: Player;
  player2: Player;
};

export type CurrentRound = {
  wordCreator: 'player1' | 'player2';
  wordGuesser: 'player1' | 'player2';
  secretWord: string;
  category: Category;
  difficulty: Difficulty;
  lives: number;
  guessedLetters: string[];
  correctLetters: string[];
  incorrectLetters: string[];
  showWord: boolean;
};

export type GameState = {
  players: GamePlayers;
  currentRound: CurrentRound;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  currentScreen: 'welcome' | 'wordInput' | 'game' | 'result';
  showInstructionsModal: boolean;
  showWinModal: boolean;
  showLoseModal: boolean;
  isWin: boolean;
};

export type Category = 'random' | 'animals' | 'food' | 'countries' | 'movies';
export type Difficulty = 'easy' | 'medium' | 'hard';

export const INITIAL_GAME_STATE: GameState = {
  players: {
    player1: { name: '', score: 0 },
    player2: { name: '', score: 0 }
  },
  currentRound: {
    wordCreator: 'player1',
    wordGuesser: 'player2',
    secretWord: '',
    category: 'random',
    difficulty: 'medium',
    lives: 6,
    guessedLetters: [],
    correctLetters: [],
    incorrectLetters: [],
    showWord: false
  },
  soundEnabled: false,
  theme: 'light',
  currentScreen: 'welcome',
  showInstructionsModal: false,
  showWinModal: false,
  showLoseModal: false,
  isWin: false
};
