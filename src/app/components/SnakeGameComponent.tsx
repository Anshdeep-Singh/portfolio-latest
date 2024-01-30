import React, { use, useEffect, useRef, useState } from 'react';


const SnakeGameComponent: React.FC = () => {

  const calculateTileSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 600) {
      return 30;
    } else if (screenWidth >= 500) {
      return 25;
    } else {
      return 20;
    }
  };


  let TILE_SIZE = calculateTileSize();
  const BOARD_SIZE = Math.min(15, Math.floor(window.innerWidth / TILE_SIZE));
  const canvasWidth = TILE_SIZE * BOARD_SIZE;
  const canvasHeight = TILE_SIZE * BOARD_SIZE;

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [snake, setSnake] = useState<{ x: number; y: number; direction: string }[]>([{ x: 0, y: 0, direction: 'RIGHT' }]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5 * TILE_SIZE, y: 5 * TILE_SIZE });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const oppositeDirectionMap: Record<string, string> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };

  useEffect(() => {
    TILE_SIZE = calculateTileSize();
    console.log(TILE_SIZE);
  }, [window.innerWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      setCtx(context);
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      drawBoard();
      if (!gameOver) {
        drawSnake();
        drawFood();
      } else {
        drawGameOver();
      }
    }
  }, [ctx, snake, food, gameOver]);


  const drawBoard = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a more visually appealing grid
    for (let x = 0; x < canvasWidth; x += TILE_SIZE) {
      for (let y = 0; y < canvasHeight; y += TILE_SIZE) {
        ctx.fillStyle = (x / TILE_SIZE + y / TILE_SIZE) % 2 === 0 ? '#dfdfdf' : '#d8d8d8';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  };

  const drawSnake = () => {
    if (!ctx) return;
    const snakeColor = '#000000'; // Dark green
    snake.forEach((segment) => {
      const snakeX = segment.x + TILE_SIZE / 2 - TILE_SIZE / 4;
      const snakeY = segment.y + TILE_SIZE / 2 - TILE_SIZE / 4;

      ctx.fillStyle = snakeColor;
      ctx.fillRect(snakeX, snakeY, TILE_SIZE / 2, TILE_SIZE / 2);
    });
  };

  const drawFood = () => {
    if (!ctx) return;
    const foodEmoji = '🍎';
    const textX = food.x + TILE_SIZE / 2 - ctx.measureText(foodEmoji).width / 2;
    let textY = 0;
    if(TILE_SIZE === 20) {
        ctx.font = `10px Arial`;
        textY = food.y + TILE_SIZE / 2 + 4;
    }
    else if(TILE_SIZE === 25) {
        ctx.font = `12px Arial`;
        textY = food.y + TILE_SIZE / 2 + 4;

    }
    else {
        ctx.font = `24px Arial`;
        textY = food.y + TILE_SIZE / 2 + 8;
    }



    ctx.fillText(foodEmoji, textX, textY);
  };

  const drawGameOver = () => {
    if (!ctx) return;
    const prompt = window.confirm(`Game Over! Play again? Score: ${snake.length - 1}`);
    if (prompt) {
      restartGame();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameOver) return;
  
    switch (event.key) {
      case 'ArrowUp':
        setDirection((prevDirection) => (prevDirection !== 'DOWN' ? 'UP' : prevDirection));
        break;
      case 'ArrowDown':
        setDirection((prevDirection) => (prevDirection !== 'UP' ? 'DOWN' : prevDirection));
        break;
      case 'ArrowLeft':
        setDirection((prevDirection) => (prevDirection !== 'RIGHT' ? 'LEFT' : prevDirection));
        break;
      case 'ArrowRight':
        setDirection((prevDirection) => (prevDirection !== 'LEFT' ? 'RIGHT' : prevDirection));
        break;
      default:
        break;
    }
  };
  

  const handleButtonPress = (newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver) return;
    setDirection(newDirection);
  };

  const checkGameOver = () => {
    const head = snake[0];
  
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
      setGameOver(true);
      return;
    }
  
    // Check for collision with any segment of the snake's body
    for (let i = 1; i < snake.length; i++) {
      // Check if head collides with the body segment (including the last tail segment)
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
        return;
      }
    }
  };
  

  const moveSnake = () => {
    if (gameOver) return;
  
    const newSnake = [...snake];
    let head = { ...newSnake[0], direction };
  
    switch (direction) {
      case 'UP':
        head.y -= TILE_SIZE;
        break;
      case 'DOWN':
        head.y += TILE_SIZE;
        break;
      case 'LEFT':
        head.x -= TILE_SIZE;
        break;
      case 'RIGHT':
        head.x += TILE_SIZE;
        break;
      default:
        break;
    }
  
    // Check if the new direction is opposite to the current direction
    if (direction !== oppositeDirectionMap[newSnake[1]?.direction] || newSnake.length === 1) {
      if (!gameOver && head.x === food.x && head.y === food.y) {
        setFood(generateRandomFoodPosition(newSnake));
      } else {
        newSnake.pop();
      }
  
      setSnake([head, ...newSnake]);
  
      checkGameOver(); // Move the collision check here
    } else {
      // If the new direction is opposite, allow the U-turn without checking for collisions
      setSnake([head, ...newSnake]);
      if (!gameOver && head.x === food.x && head.y === food.y) {
        setFood(generateRandomFoodPosition(newSnake));
      }
    }
  };
  
  
  const generateRandomFoodPosition = (snakeSegments: { x: number; y: number; direction: string }[]) => {
    let randomX = Math.floor(Math.random() * BOARD_SIZE) * TILE_SIZE;
    let randomY = Math.floor(Math.random() * BOARD_SIZE) * TILE_SIZE;

    // Ensure food doesn't appear on top of the snake
    while (snakeSegments.some((segment) => segment.x === randomX && segment.y === randomY)) {
      randomX = Math.floor(Math.random() * BOARD_SIZE) * TILE_SIZE;
      randomY = Math.floor(Math.random() * BOARD_SIZE) * TILE_SIZE;
    }

    return { x: randomX, y: randomY };
  };

  const restartGame = () => {
    setSnake([{ x: 0, y: 0, direction: 'RIGHT' }]);
    setDirection('RIGHT');
    setFood(generateRandomFoodPosition([{ x: 0, y: 0, direction: 'RIGHT' }]));
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      moveSnake();
    }, 150);
  
    return () => {
      clearInterval(gameLoop);
    };
  }, [direction, snake, gameOver]);

  return (
    <>
    {gameOver ? <h1 className='text-2xl pb-1 md:text-xl smm:text-sm mt-2'>Game Over! Press Start To Play</h1> : <h1 className='text-2xl font-bold pb-1 md:text-xl smm:text-sm mt-2'>Snake Game</h1>}
    <div className='wrapper flex flex-col items-center'>
      <canvas id="snakeCanvas" ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
        <button className='w-full fit-content bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 text-sm sm:text-xs' onClick={() => restartGame()}>Start</button>
      <div className='wrapperSnake items-right hidden md:flex mt-2'>
        <div className='flex flex-row'>
          <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2' onClick={() => handleButtonPress('LEFT')}>Left</button>
          <div className='flex flex-col'>
            <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 mx-1' onClick={() => handleButtonPress('UP')}>Up</button>
            <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 mx-1' onClick={() => handleButtonPress('DOWN')}>Down</button>
          </div>
          <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2' onClick={() => handleButtonPress('RIGHT')}>Right</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SnakeGameComponent;