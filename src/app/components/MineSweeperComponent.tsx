import React, { useState, useEffect, use } from 'react';

// Define icons for UI elements
const bombIcon = '💣';
const flagIcon = '🚩';

interface Cell {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

interface MineSweeperProps {
  rows: number;
  columns: number;
  bombs: number;
}

const MineSweeperComponent: React.FC<MineSweeperProps> = ({ rows, columns, bombs }) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);

const initializeBoard = () => {
    const newBoard: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
      }))
    );

    // Place bombs randomly
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * columns);

      if (!newBoard[randomRow][randomCol].isBomb) {
        newBoard[randomRow][randomCol].isBomb = true;
        bombsPlaced++;
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    //console.log(newBoard);
  };

  // Initialize the board
  useEffect(() => {
    initializeBoard();
  }, [rows, columns, bombs]);

  useEffect(() => {
    if(gameOver){
        setTimeout(() => {
            initializeBoard();
        }, 2000);
    }
  }, [board]);

  // Function to reveal a cell
  const revealCell = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed || board[row][col].isFlagged) return;
  
    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;
  
    if (newBoard[row][col].isBomb) {
      // Game Over: reveal all bombs
      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((r) =>
          r.map((cell) => ({
            ...cell,
            isRevealed: true,
          }))
        );
        return updatedBoard;
      });
      const prompt = window.confirm('Game Over, You stepped on a BOMB! Play again?');
      if (prompt) {
        setGameOver(true);
      }
    } else {
      setBoard(newBoard);
    
    const nonBombCells = rows * columns - bombs;
    let revealedCells = 0;

    newBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isRevealed && !cell.isBomb) {
          revealedCells++;
        }
      });
    });

    if (revealedCells === nonBombCells) {
      // User has 
      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((r) =>
          r.map((cell) => ({
            ...cell,
            isRevealed: true,
          }))
        );
        return updatedBoard;
      });
      const prompt = window.confirm('Congratulations! You won! Play again?');
      if (prompt) {
        setGameOver(true);
      }
    }
    }
  };  

  // Function to flag/unflag a cell
  const toggleFlag = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  // Render the game board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`cell ${cell.isRevealed ? 'revealed' : ' '} rounded-lg`}
            onClick={() => revealCell(rowIndex, colIndex)}
            onContextMenu={(e) => {
              e.preventDefault();
              toggleFlag(rowIndex, colIndex);
            }}
          >
            {cell.isRevealed
              ? cell.isBomb
                ? bombIcon
                : countAdjacentBombs(rowIndex, colIndex).toString()
              : cell.isFlagged
              ? flagIcon
              : ' '}
          </div>
        ))}
      </div>
    ));
  };

  // Function to count adjacent bombs
  const countAdjacentBombs = (row: number, col: number) => {
    let count = 0;
    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(columns - 1, col + 1); j++) {
        if (board[i][j].isBomb) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <div className="mineSweeper wrapperMine items-center">
      {gameOver ? <h1 className="text-2xl pb-1 md:text-xl smm:text-sm mt-2">Game Over! Restarting...</h1> : <h1 className="text-2xl font-bold pb-1 md:text-xl smm:text-sm mt-2">Mine Sweeper</h1>}
      <div
       className='rounded-lg text-black px-4 mt-2'>
        <h3 className='text-[12px] mr-1 bg-gray-800 p-2 rounded text-white xs:text-[10px]'>How to Play</h3>
                <ul className='md:hidden text-[12px] text-left mb-1 mt-1'>
                    <li> - Single click a cell to reveal its content.</li>
                    <li> - Click with two fingers to flag/unflag a cell.</li>
                    <li> - Revealed cells show the number of nearby bombs.</li>
                </ul>
                <ul className='hidden md:block text-[12px] text-left xs:text-[10px] mt-1'>
                    <li> - Touch a cell to reveal its content.</li>
                    <li> - Hold to flag/unflag a cell.</li>
                    <li> - Revealed cells show the number of nearby bombs.</li>
                </ul>
      </div>
      <div className="mineBoard">{renderBoard()}</div>
    </div>
  );
};

export default MineSweeperComponent;
