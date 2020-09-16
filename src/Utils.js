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



export const checkAccident = (snake) => {
    //switch direction
    //  check if next cell is boundary
    //  check if next cell is snake's cell

    switch (snake.direction) {
        case 'right':
            if (snake.cells[0].x == (BOARD_SIZE - 1))
                return true;
            else if (snake.cells.some(cell => (cell.x == (snake.cells[0].x + 1))&&(cell.y == (snake.cells[0].y - 1))))
                return true;
        case 'left':
            if (snake.cells[0].x == 0)
                return true;
            else if (snake.cells.some(cell => (cell.x == (snake.cells[0].x - 1))&&(cell.y == (snake.cells[0].y - 1))))
                return true;
        case 'up':
            if (snake.cells[0].y == 0)
                return true;
            else if (snake.cells.some(cell => (cell.y == (snake.cells[0].y - 1))&&(cell.x == (snake.cells[0].x - 1))))
                return true;
        case 'down':
            if (snake.cells[0].y == 0)
                return true;
            else if (snake.cells.some(cell => (cell.y == (snake.cells[0].y + 1))&&(cell.x == (snake.cells[0].x + 1))))
                return true;
    }
    return false;
}


