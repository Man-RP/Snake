import { useState, useCallback } from 'react';
import { BOARD_SIZE, getPositionAhead  } from '../Utils'

export const useSnake = () => {
    const [snake, setSnake] = useState(
        {
            cells: [{x: 0, y: 0}],
            direction: null,
            eatCells: [],
        }
    );

    const advanceSnake = (food) => {
        setSnake(old => {
            const newSnake = {...old};
            const nextCell = getPositionAhead(old.cells[0], old.direction);
            newSnake.cells.unshift(nextCell);
            if(!newSnake.eatCells||(!(nextCell.x == food.x)&&(nextCell.y == food.y))){
                newSnake.cells.pop();
                newSnake.eatCells.shift();
            } 
            return newSnake;
        });
    }

    const changeSnakeDirection = dir => {
        setSnake(old => {
            const newSnake = [...old];
            newSnake.direction = dir;
            return newSnake;
        });
    }

    
    const expandSnake = () => {
        setSnake(old => {
            const newSnake = [...old];
            newSnake.cells.unshift(getPositionAhead(old.cells[old.cells.length, old.direction]));
            switch (snake.direction) {
                case 'right':
                    newSnake.cells.shift({
                        x: old.cells[newSnake.cells.length - 1].x - 1,
                        y: old.cells[newSnake.cells.length - 1].y,
                    });
                    break;
                case 'left':
                    newSnake.cells.shift({
                        x: old.cells[newSnake.cells.length - 1].x + 1,
                        y: old.cells[newSnake.cells.length - 1].y,
                    });
                    break;
                case 'up':
                    newSnake.cells.shift({
                        x: old.cells[newSnake.cells.length - 1].x,
                        y: old.cells[newSnake.cells.length - 1].y + 1,
                    });
                    break;
                case 'down':
                    newSnake.cells.shift({
                        x: old.cells[newSnake.cells.length - 1].x,
                        y: old.cells[newSnake.cells.length - 1].y - 1,
                    });
                    break;
            }
            return newSnake;
        });
    }

    const feedSnake = () => {
        setSnake(old => {
            const newSnake = {...old};
            newSnake.eatCells.push(getPositionAhead(old.cells[0], old.direction));
            return newSnake;
        });
    }

    const resetSnake = useCallback(() => {
        setSnake({
            cells: [{ x: BOARD_SIZE/2, y: BOARD_SIZE/2 }],
            direction: 'right',
            eatCells: []
        });
      }, []);

    return [snake, advanceSnake, changeSnakeDirection, feedSnake, expandSnake, resetSnake];
}

export default useSnake;