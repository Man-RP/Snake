import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Board from './Board';
import StatsPanel from './StatsPanel';
import ButtonsPanel from './ButtonsPanel';


import useInterval from '../Hooks/useInterval'
import useSnake from '../Hooks/useSnake';
import useBoard from '../Hooks/useBoard';
import useKeyPress from '../Hooks/useKeyPress';

import theme from './styles/theme';

import { BOARD_SIZE, checkFoodAhead, checkAccident, premittedDirectionChangeCheck } from '../Utils';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'min-content',
        // paddingBottom: '5px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '3px solid #E09F3E',
        backgroundColor: '#00283d',
        borderRadius: '5px',
    },
}));

const Snake = () => {
    const classes = useStyles();
    //States:
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);
    const [advanceTime, setAdvanceTime] = useState(null);
    const [gameOver, setgameOver] = useState(false)
    
    //Custom Hooks:
    const [snake, advanceSnake, changeSnakeDirection, resetSnake] = useSnake();
    const board = useBoard(snake, food);


    const startGame = useCallback(() => {
        setScore(0);
        setgameOver(false);
        resetSnake();
        placeNewFood({ x: BOARD_SIZE/2 +3, y: BOARD_SIZE/2 });
        setAdvanceTime(500);
    },[]);

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
        // console.log(board)
        if (!checkAccident(snake)) {
            const isFoodAhead = checkFoodAhead(snake, food);   
            advanceSnake(isFoodAhead);
            if (isFoodAhead) {
                setScore(oldScore => oldScore + 1);
                placeNewFood();
            }  
        }
        else {
            //gameOver
            setAdvanceTime(null);
            setgameOver(true);
        }
    }
    
    const toggleGame = useCallback(() => {
        (advanceTime != null) ? setAdvanceTime(null) : setAdvanceTime(500);
    }, [advanceTime])

    useKeyPress(key => {
        const keyDirections = {
            'D': 'right',
            'A': 'left',
            'W': 'up',
            'S': 'down'
        }
        //one of the four keys above AND premitted direction
        if (keyDirections.hasOwnProperty(key) && premittedDirectionChangeCheck(snake.direction, keyDirections[key])) 
            changeSnakeDirection(keyDirections[key]); 
    });

    

    useInterval(advance, advanceTime);
    
    console.log('Snake');
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Board board={board} />
                <StatsPanel score={score} advanceTime={advanceTime} />
                <ButtonsPanel reset={startGame} toggleGame={toggleGame} />
            </div>
        </ThemeProvider>
    )
}

export default Snake
