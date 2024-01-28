import { set } from 'firebase/database';
import React, { use, useEffect, useState } from 'react';
import { Chess } from 'chess.js'


// Chess piece icons
const pieceIcons: Record<string, string> = {
    'k': '♔',
    'q': '♕',
    'r': '♖',
    'b': '♗',
    'n': '♘',
    'p': '♙',
    'K': '♚',
    'Q': '♛',
    'R': '♜',
    'B': '♝',
    'N': '♞',
    'P': '♟',
};

// Chess board dimensions
const boardSize = 8;

// Initial chess board setup
// Corrected initial chess board setup
const initialBoard: string[][] = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    Array(8).fill(''),
    Array(8).fill(''),
    Array(8).fill(''),
    Array(8).fill(''),
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const whitePieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
const blackPieces = ['p', 'r', 'n', 'b', 'q', 'k'];

const kings = ['K', 'k'];



// ChessGameComponent
const ChessGameComponent: React.FC = () => {
    const [board, setBoard] = useState<string[][]>(initialBoard);
    const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
    const [deadPieces, setDeadPieces] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [legalMoves, setLegalMoves] = useState<[number, number][]>([]);


    const handleSquareClick = (row: number, col: number): void => {
        if (!selectedSquare) {
            // Select the piece to move
            if (board[row][col] !== '' && blackPieces.includes(board[row][col])) {
                const moves = calculateLegalMoves(board, [row, col]);
                if(moves.length === 0) {
                    return;
                }
                setLegalMoves(moves);
                setSelectedSquare([row, col]);
            }
        } else {
            if (makeMove(board, selectedSquare, row, col)) {
                setSelectedSquare(null);
                setLegalMoves([]); // Clear legal moves after making a move
                const botMove = generateBotMove(board);
                if (botMove) {
                    makeMove(board, [botMove[0], botMove[1]], botMove[2], botMove[3]);
                }
            } else {
                console.error('Invalid user move!');
            }
        }
    };

    const renderSquare = (piece: string, row: number, col: number) => (
        <div key={`${row}-${col}`}
            className={`square ${selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col ? 'selected' : ''} ${legalMoves.some(move => move[0] === row && move[1] === col) ? 'legal' : ''} hover:cursor-pointer rounded-lg`}
            onClick={() => handleSquareClick(row, col)}>
            {pieceIcons[piece]}
        </div>
    );

    const renderRow = (row: string[], rowIndex: number) => (
        <div key={rowIndex} className="board-row">
            {row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex))}
        </div>
    );

    function isValidMove(board: string[][], start: [number, number], end: [number, number]): boolean {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;

        // Implement basic validation (within board boundaries)
        if (startRow < 0 || startRow >= 8 || startCol < 0 || startCol >= 8) {
            return false;
        }

        if (endRow < 0 || endRow >= 8 || endCol < 0 || endCol >= 8) {
            return false;
        }

        const piece = board[startRow][startCol];
        const targetPiece = board[endRow][endCol];

        if (targetPiece !== '' && CheckSameTeam(piece, targetPiece)) {

            return false;
        }

        if (piece === targetPiece) {
            return false;
        }

        // Implement additional validation based on specific piece movements
        switch (piece.toLowerCase()) {
            case 'p':
                // Pawn moves
                const direction = piece === 'p' ? 1 : -1;
                const forwardOne: [number, number] = [startRow + direction, startCol];
                const forwardTwo: [number, number] = [startRow + 2 * direction, startCol];
                const captureLeft: [number, number] = [startRow + direction, startCol - 1];
                const captureRight: [number, number] = [startRow + direction, startCol + 1];

                // Check if the target square is within pawn's allowed moves
                if (
                    (endRow === forwardOne[0] && endCol === forwardOne[1] && !targetPiece) ||
                    (endRow === forwardTwo[0] && endCol === forwardTwo[1] && startRow === (piece === 'p' ? 1 : 6) && !targetPiece) ||
                    (endRow === captureLeft[0] && endCol === captureLeft[1] && targetPiece && targetPiece.toUpperCase() !== piece) ||
                    (endRow === captureRight[0] && endCol === captureRight[1] && targetPiece && targetPiece.toUpperCase() !== piece)
                ) {
                    return true;
                }
                break;

            case 'r':
                // Rook moves
                if ((endRow === startRow || endCol === startCol) && isPathClear(board, start, end)) {
                    return true;
                }
                // Rook moves for castling (rook can't have moved previously)
                break;

            case 'b':
                // Bishop moves
                if (isDiagonalMove(start, end) && isPathClearDiagonal(board, start, end)) {
                    return true;
                }
                break;

            case 'q':
                // Queen moves (combination of rook and bishop)
                if (
                    (endRow === startRow || endCol === startCol) && // Rook moves
                    isPathClear(board, start, end)
                ) {
                    return true;
                } else if (
                    isDiagonalMove(start, end) && // Bishop moves
                    isPathClearDiagonal(board, start, end)
                ) {
                    return true;
                }
                break;

            case 'n':
                // Knight moves
                const knightMoves = [
                    [startRow - 2, startCol - 1],
                    [startRow - 2, startCol + 1],
                    [startRow - 1, startCol - 2],
                    [startRow - 1, startCol + 2],
                    [startRow + 1, startCol - 2],
                    [startRow + 1, startCol + 2],
                    [startRow + 2, startCol - 1],
                    [startRow + 2, startCol + 1],
                ];


                // Check if the target square is a valid knight move
                if (knightMoves.some(([row, col]) => row === endRow && col === endCol)) {
                    return true;
                }
                break;

            case 'k':
                // King moves
                const kingMoves: [number, number][] = [
                    [startRow - 1, startCol - 1],
                    [startRow - 1, startCol],
                    [startRow - 1, startCol + 1],
                    [startRow, startCol - 1],
                    [startRow, startCol + 1],
                    [startRow + 1, startCol - 1],
                    [startRow + 1, startCol],
                    [startRow + 1, startCol + 1],
                ];

                // Check if the target square is a valid king move
                if (kingMoves.some(([row, col]) => row === endRow && col === endCol)) {

                    return true; // Normal king move
                }
                break;

            default:
                break;
        }

        return false;
    }


    
    const calculateLegalMoves = (board: string[][], selectedPiece: [number, number]): [number, number][] => {
        const legalMoves: [number, number][] = [];

        // Iterate through the board and check if each move is valid
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (isValidMove(board, selectedPiece, [row, col])) {
                    legalMoves.push([row, col]);
                }
            }
        }

        return legalMoves;
    };

    function CheckSameTeam(piece: string, targetPiece: string): boolean {
        if (whitePieces.includes(piece) && whitePieces.includes(targetPiece)) {
            return true;
        }

        if (blackPieces.includes(piece) && blackPieces.includes(targetPiece)) {
            return true;
        }
        return false;

    }

    function isDiagonalMove(start: [number, number], end: [number, number]): boolean {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;

        return Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
    }

    // Function to check if the path between two squares is clear for a bishop or queen
    function isPathClearDiagonal(board: string[][], start: [number, number], end: [number, number]): boolean {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        const rowStep = startRow < endRow ? 1 : -1;
        const colStep = startCol < endCol ? 1 : -1;

        for (let row = startRow + rowStep, col = startCol + colStep; row !== endRow; row += rowStep, col += colStep) {
            if (board[row][col] !== '') {
                return false;
            }
        }

        return true;
    }
    // Function to check if the path between two squares is clear for a rook
    function isPathClear(board: string[][], start: [number, number], end: [number, number]): boolean {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;

        if (startRow === endRow) {
            // Horizontal move
            const step = startCol < endCol ? 1 : -1;
            for (let col = startCol + step; col !== endCol; col += step) {
                if (board[startRow][col] !== '') {
                    return false;
                }
            }
        } else {
            // Vertical move
            const step = startRow < endRow ? 1 : -1;
            for (let row = startRow + step; row !== endRow; row += step) {
                if (board[row][startCol] !== '') {
                    return false;
                }
            }
        }

        return true;
    }
    // Function to make a move on the board
    function makeMove(board: string[][], start: [number, number], endRow: number, endCol: number): boolean {
        const [startRow, startCol] = start;
        const piece = board[startRow][startCol];

        // Validate the move
        if (!isValidMove(board, start, [endRow, endCol])) {
            console.error('Invalid move!');
            return false;
        }

        // Make the move
        if (board[endRow][endCol] !== '') {
            setDeadPieces([...deadPieces, board[endRow][endCol]]);
            if (kings.includes(board[endRow][endCol])) {
                if (board[endRow][endCol] === 'k') {
                    alert('Black wins!');
                }
                else {
                    alert('White wins!');
                }
                setGameOver(true);
            }
        }
        board[endRow][endCol] = piece;
        board[startRow][startCol] = '';

        return true;
    }

    function getRook(kingPiece: string): string {
        return kingPiece.toLowerCase() === 'k' ? 'r' : 'R';
    }

    useEffect(() => {
        const newBoard: string[][] = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            Array(8).fill(''),
            Array(8).fill(''),
            Array(8).fill(''),
            Array(8).fill(''),
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ];
        if (gameOver) {
            setDeadPieces([]);
            setBoard(newBoard);
        }
    }, [gameOver]);

    function generateBotMove(board: string[][]): [number, number, number, number] | null {
        const possibleMoves: [number, number, number, number][] = [];



        // Iterate through the board and find all possible moves for black pieces
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board[row][col] !== '' && whitePieces.includes(board[row][col])) {
                    for (let endRow = 0; endRow < 8; endRow++) {
                        for (let endCol = 0; endCol < 8; endCol++) {
                            const start: [number, number] = [row, col];
                            const end: [number, number] = [endRow, endCol];
                            if (isValidMove(board, start, end)) {
                                possibleMoves.push([...start, ...end]);
                            }
                        }
                    }
                }
            }
        }

        // Select a random move from the list of possible moves
        if (possibleMoves.length > 0) {
            const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
            return possibleMoves[randomMoveIndex];
        }
        return null; // No valid moves found
    }
    return (
        <>
            <h1 className="text-2xl font-bold pb-4 md:text-xl sm:text-sm" >Play Chess Against a Dumb BOT 🤖</h1>
            <div className='flex flex-row md:flex-col'>
                <div className="wrapper mr-2 md:mb-2 flex flex-col md:flex-row md:ml-2">
                    {deadPieces.map((piece, index) => (
                        <div key={index} className="dead-piece">{pieceIcons[piece]}</div>
                    ))}
                </div>
                <div className='wrapper'>
                    <div className="chess-board">
                        {board.map((row, rowIndex) => renderRow(row, rowIndex))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default ChessGameComponent;
