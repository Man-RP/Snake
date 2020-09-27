import { useState, useEffect } from 'react';

import { createBoard, BOARD_SIZE } from '../Utils'

const useBoard = (snake, food) => {
    const [board, setBoard] = useState(createBoard());
    

    useEffect(() => {
        const getUpdatedBoard = () => {
            const newBoard = createBoard();
            //insert snake cells
            if (snake.cells)
                snake.cells.map(snakeCell => {
                    newBoard[snakeCell.y][snakeCell.x] = 'S';
                });
            
            //insert food cells
            if (food)
                newBoard[food.y][food.x] = 'F';

            return newBoard;
        }
        setBoard(getUpdatedBoard());
    }, [snake.cells[0].x, snake.cells[0].y, food]);
    return board;
}

export default useBoard;