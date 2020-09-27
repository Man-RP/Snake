export const BOARD_SIZE = 10;


export const createBoard = () =>
    Array.from(Array(BOARD_SIZE), () => Array(BOARD_SIZE).fill(0));


export const getPositionAhead = (pos, dir) => {
    switch (dir) {
        case 'right':
            if (pos.x < (BOARD_SIZE - 1))
                return { x: pos.x + 1, y: pos.y };
        case 'left':
            if (pos.x > 0)
                return { x: pos.x - 1, y: pos.y };
        case 'up':
            if (pos.y > 0)
                return { x: pos.x, y: pos.y - 1 };
        case 'down':
            if (pos.y < (BOARD_SIZE - 1))
                return { x: pos.x, y: pos.y + 1 };
    }
    return null;
}

export const checkFoodAhead = (snake, food) => {
    //true if snake's head before food
    const nextCell = getPositionAhead(snake.cells[0], snake.direction);
    if (nextCell&&((nextCell.x == food.x)&&(nextCell.y == food.y))) return true;
    return false;

}

export const comparePositions = (pos1, pos2) => (JSON.stringify(pos1) == JSON.stringify(pos2)) ? true : false;

export const checkAccident = (snake) => {
    //switch direction
    //  check if next cell is boundary
    //  check if next cell is snake's cell
    
    const nextCell = getPositionAhead(snake.cells[0], snake.direction);
    if (!nextCell) return true;
    if (snake.cells.some(cell =>comparePositions(cell, nextCell))) return true;
    return false;



}