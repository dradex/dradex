import { useState } from "react";

type Player = 'X' | 'O' | '';
type GameStatus = 'playing' | 'playerWin' | 'aiWin' | 'draw';
type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  board: Player[];
  currentPlayer: Player;
  gameStatus: GameStatus;
  isAiThinking: boolean;
  scores: {
    player: number;
    ai: number;
    draws: number;
  };
  difficulty: Difficulty;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameStatus: 'playing',
    isAiThinking: false,
    scores: { player: 0, ai: 0, draws: 0 },
    difficulty: 'easy'
  });

  // Customizable win link - you can change this URL
  const winLink = "https://parwics.com/"; // Change this to your desired link

  const checkWinner = (board: Player[]): { winner: Player | 'draw' | null, winningLine?: number[] } => {
    // Check for winning combinations
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: combination };
      }
    }

    // Check for draw
    if (board.every(cell => cell !== '')) {
      return { winner: 'draw' };
    }

    return { winner: null };
  };

  const makeAIMove = (board: Player[]): number => {
    // Easy AI: just pick a random empty cell
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null) as number[];
    
    if (emptyCells.length === 0) return -1;
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] !== '' || gameState.gameStatus !== 'playing' || gameState.isAiThinking) {
      return;
    }

    // Player makes move
    const newBoard = [...gameState.board];
    newBoard[index] = 'X';

    const result = checkWinner(newBoard);
    
    if (result.winner === 'X') {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        gameStatus: 'playerWin',
        scores: { ...prev.scores, player: prev.scores.player + 1 }
      }));
      return;
    }

    if (result.winner === 'draw') {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        gameStatus: 'draw',
        scores: { ...prev.scores, draws: prev.scores.draws + 1 }
      }));
      return;
    }

    // Set AI thinking state
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: 'O',
      isAiThinking: true
    }));

    // AI makes move after delay
    setTimeout(() => {
      const aiMoveIndex = makeAIMove(newBoard);
      
      if (aiMoveIndex !== -1) {
        newBoard[aiMoveIndex] = 'O';
        
        const aiResult = checkWinner(newBoard);
        
        if (aiResult.winner === 'O') {
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            gameStatus: 'aiWin',
            currentPlayer: 'X',
            isAiThinking: false,
            scores: { ...prev.scores, ai: prev.scores.ai + 1 }
          }));
        } else if (aiResult.winner === 'draw') {
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            gameStatus: 'draw',
            currentPlayer: 'X',
            isAiThinking: false,
            scores: { ...prev.scores, draws: prev.scores.draws + 1 }
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            currentPlayer: 'X',
            isAiThinking: false
          }));
        }
      }
    }, 800);
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(''),
      currentPlayer: 'X',
      gameStatus: 'playing',
      isAiThinking: false
    }));
  };

  const changeDifficulty = (difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty
    }));
  };



  // Show win screen when player wins
  if (gameState.gameStatus === 'playerWin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <a 
          href={winLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
        >
          {winLink}
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-sm">
        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 aspect-square">
          {gameState.board.map((cell, index) => (
            <div
              key={index}
              className={`group relative bg-white border-2 border-slate-300 rounded-lg transition-all duration-200 flex items-center justify-center aspect-square select-none ${
                cell === '' && gameState.gameStatus === 'playing' && !gameState.isAiThinking
                  ? 'hover:border-blue-400 hover:bg-blue-50 cursor-pointer hover:scale-105'
                  : 'cursor-not-allowed'
              }`}
              onClick={() => handleCellClick(index)}
            >
              {cell && (
                <span className={`text-5xl font-bold ${cell === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                  {cell}
                </span>
              )}
              
              {/* Hover indicator for empty cells */}
              {cell === '' && gameState.gameStatus === 'playing' && !gameState.isAiThinking && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none">
                  <span className="text-4xl font-bold text-blue-400">X</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
