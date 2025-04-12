import { Category, Difficulty } from "../types/game";

// Get category name for display
export const getCategoryName = (categoryId: Category): string => {
  const categories: Record<Category, string> = {
    'random': 'Aleatorio',
    'animals': 'Animales',
    'food': 'Comida',
    'countries': 'Países',
    'movies': 'Películas'
  };
  
  return categories[categoryId] || 'Desconocida';
};

// Get lives count based on difficulty
export const getLivesByDifficulty = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 8;
    case 'medium':
      return 6;
    case 'hard':
      return 4;
    default:
      return 6;
  }
};

// Play sound effect if sound is enabled
export const playSound = (type: 'correct' | 'wrong' | 'win' | 'lose', soundEnabled: boolean) => {
  if (!soundEnabled) return;
  
  // Map of sound effects
  const sounds = {
    correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2/2.wav'),
    wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/19/19.wav'),
    win: new Audio('https://assets.mixkit.co/active_storage/sfx/270/270.wav'),
    lose: new Audio('https://assets.mixkit.co/active_storage/sfx/533/533.wav')
  };
  
  // Play the sound
  try {
    sounds[type].play();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

// Check if word is completely guessed
export const isWordComplete = (secretWord: string, correctLetters: string[]): boolean => {
  // Check if all letters in the word have been guessed
  for (const letter of secretWord) {
    if (!correctLetters.includes(letter)) {
      return false;
    }
  }
  return true;
};

// Add these custom styles to make the game look exactly like the design
document.head.insertAdjacentHTML('beforeend', `
<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* Custom font classes */
  .font-title {
    font-family: 'Fredoka One', cursive;
  }
  
  .font-body {
    font-family: 'Poppins', sans-serif;
  }
  
  .font-mono {
    font-family: 'Space Mono', monospace;
  }
  
  /* Dark theme hangman SVG adjustments */
  [data-theme="dark"] .hangman-svg {
    stroke: #f7fafc;
  }
  [data-theme="light"] .hangman-svg {
    stroke: #2d3748;
  }
  
  /* Letter box styling */
  .letter-box {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    border-bottom: 3px solid;
    font-family: 'Space Mono', monospace;
    font-weight: bold;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  
  /* Keyboard button styling */
  .keyboard-btn {
    width: 40px;
    height: 40px;
    margin: 4px;
    font-weight: bold;
    transition: all 0.2s;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .keyboard-btn {
      width: 32px;
      height: 32px;
      font-size: 14px;
      margin: 2px;
    }
    .letter-box {
      width: 30px;
      height: 30px;
      font-size: 1.2rem;
      margin: 0 2px;
    }
  }
  
  /* Animation classes */
  .btn-pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
`);
