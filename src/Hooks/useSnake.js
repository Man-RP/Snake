import { useState, useCallback } from 'react';
import { BOARD_SIZE, getPositionAhead, comparePositions } from '../Utils'

export const useSnake = () => {
    const [snake, setSnake] = useState(
        {
            cells: [{x: 0, y: 0}],
            direction: null,
            eatCells: [],
        }
    );

    const advanceSnake = (feed) => {
        setSnake(old => {
            const newSnake = {...old};
            //get next cell position
            const nextCell = getPositionAhead(old.cells[0], old.direction);
            //feed if need to
            if(feed)    newSnake.eatCells.push(nextCell);
            //move snake's head to next position
            newSnake.cells.unshift(nextCell);
            //check if the snake needs to be extended
            comparePositions(newSnake.cells[newSnake.cells.length - 1], newSnake.eatCells[0]) ?
                //extend = leave the tail in place
                newSnake.eatCells.shift() :
                //don't extend = erase current tail
                newSnake.cells.pop();
            return newSnake;
        });
    }

    const changeSnakeDirection = dir => {
        setSnake(old => {
            const newSnake = {...old};
            newSnake.direction = dir;
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
    return [snake, advanceSnake, changeSnakeDirection, resetSnake];
}

export default useSnake;