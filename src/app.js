import React, { useState, useEffect } from 'react'
import { Grid, Button, Box } from '@material-ui/core';


import Board from './components/Board';
import Popup from './components/Popup'

import useInterval from './Hooks/useInterval'
import useSnake from './Hooks/useSnake';
import useBoard from './Hooks/useBoard';

import { BOARD_SIZE, checkFoodAhead, checkAccident } from './Utils';

function App() {
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);
    const [advanceTime, setAdvanceTime] = useState(null);
    const [gameOver, setgameOver] = useState(false)


    const [snake, advanceSnake, changeSnakeDirection, feedSnake, expandSnake, resetSnake] = useSnake();
    const board = useBoard(snake, food);



    const startGame = () => {
        setScore(0);
        setgameOver(false);
        resetSnake();
        placeFood({ x: BOARD_SIZE/2 + 2, y: BOARD_SIZE/2 });
        setAdvanceTime(1000);
    }


    const placeFood = (pos) => {
        !pos?setFood(
            { 
                x: Math.floor(Math.random() * Math.floor(BOARD_SIZE)), 
                y: Math.floor(Math.random() * Math.floor(BOARD_SIZE)) 
            }
        ):setFood(
            { 
                x: pos.x,
                y: pos.y 
            }
        );
    }

    const advance = () => {
        //if !checkaccident -> 
        //      if checkFoodAhead
        //          Result + 1
        //          
        //      else
        //          if checkFoodLast
        //              snakeExpand
        //       snakeAdvance
        //else
        //      gameOver

        if (!checkAccident(snake)) {
            if (checkFoodAhead(snake, food)) {
                setScore(oldScore => oldScore + 1);
                placeFood();
                feedSnake();
            }
            // else if (checkFoodLast(snake, food))
            //     expandSnake();
            advanceSnake(food); 
        }
        else {
            //gameOver
            setAdvanceTime(null);
            setgameOver(true);
        }
    }
    useEffect(() => {
        startGame();
    }, []);

    useInterval(advance, advanceTime);
    console.log('render')
    return (
        <Grid container direction='column' alignItems="center">
            <Grid item>Header</Grid>
            <Grid item container justify="center" alignItems="center">
                <Grid item>panel!</Grid>
                <Grid item>
                    {!advanceTime && <Popup callback={startGame} gameOver={gameOver} score={score} />}
                    <Board board={board} />
                </Grid>
                <Grid item>score!</Grid>
            </Grid>
        </Grid>
    );
}

export default App
