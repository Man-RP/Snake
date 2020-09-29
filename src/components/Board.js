import React, { useState, useEffect } from 'react'

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BOARD_SIZE } from '../Utils'



const useStyles = makeStyles((theme) => ({
    boardContainer: {
        display: 'grid',
        gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        gridGap: '1px',
    },
    Paper: {
        boxSizing: 'border-box',
        height: '15px',
        width:'15px',
        background: (props) => {
            switch (props.cellType) {
                case 0:
                    return '#335C67';
                case 'S':
                    return '#eae2b7';
                case 'F':
                    return '#9E2A2B';
            }
        },
    }
}));

const Cell = React.memo((props) => {
    const { cellType, ...other } = props;
    const classes = useStyles(props);
    console.log('Cell');
    return <Paper elevation={3} variant="outlined" className={classes.Paper} {...other} />
});

const Board = ( {board} ) => {
    const classes = useStyles();
    console.log('Board');
    return (
        <div className={classes.boardContainer}>
            {board.map( (row,rowIndex) => row.map((cell, cellIndex) =>
                <Cell key={cellIndex} cellType={cell} />
            ))}
        </div>
    );
}

export default Board;


