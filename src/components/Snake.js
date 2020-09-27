import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Board from './Board';
import Popup from './Popup'
import Score from './score'

import useInterval from '../Hooks/useInterval'
import useSnake from '../Hooks/useSnake';
import useBoard from '../Hooks/useBoard';
import useKeyPress from '../Hooks/useKeyPress';

import { BOARD_SIZE, checkFoodAhead, checkAccident } from '../Utils';

const Snake = () => {
    //States:
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);
    const [advanceTime, setAdvanceTime] = useState(null);
    const [gameOver, setgameOver] = useState(false)
    
    //Custom Hooks:
    const [snake, advanceSnake, changeSnakeDirection, resetSnake] = useSnake();
    const board = useBoard(snake, food);


    const startGame = () => {
        setScore(0);
        setgameOver(false);
        resetSnake();
        placeNewFood({ x: BOARD_SIZE/2 + 2, y: BOARD_SIZE/2 });
        setAdvanceTime(500);
    }

    const placeNewFood = (pos) => {
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
        if (!checkAccident(snake)) {

            const isFoodAhead = checkFoodAhead(snake, food);   
            if (isFoodAhead) {
                setScore(oldScore => oldScore + 1);
                placeNewFood();
            }
            advanceSnake(isFoodAhead); 
        }
        else {
            //gameOver
            setAdvanceTime(null);
            setgameOver(true);
        }
    }
    
    useKeyPress(key => {
        switch (key) {
            case'D':
                changeSnakeDirection('right');
                break;
            case 'A':
                changeSnakeDirection('left');
                break;
            case 'W':
                changeSnakeDirection('up');
                break;
            case 'S':
                changeSnakeDirection('down');
                break;
        }
    });

    useEffect(() => {
        startGame();
    }, []);

    useInterval(advance, advanceTime);

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>panel!</Grid>
            <Grid item>
                {!advanceTime && <Popup callback={startGame} gameOver={gameOver} score={score} />}
                <Board board={board} />
            </Grid>
            <Grid item><Score score={score} /></Grid>
        </Grid>
    )
}

export default Snake
