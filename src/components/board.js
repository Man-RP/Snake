import React, { useState, useEffect } from 'react'

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    emptyPaper: {
      height: 25,
      width: 25,
    },
    snakePaper: {
        height: 25,
        width: 25,
        backgroundColor: 'black',
    },
    foodPaper: {
        height: 25,
        width: 25,
        backgroundColor: 'red',   
    }
}));


const Board = ( {board} ) => {

    const classes = useStyles();

    const setCellType = sign => {
        switch (sign) {
            case 0:
                return classes.emptyPaper;
            case 'S':
                return classes.snakePaper;
            case 'F':
                return classes.foodPaper;
        }
    }

    const BoardRows = board.map( (row,rowIndex) => {
        return(<Grid item container justify="center" alignItems="center" key={rowIndex}>
            {
                row.map( (column,columnIndex) => {
                    return (
                        <Grid item key={columnIndex}>
                            <Paper elevation={3} variant="outlined" className={setCellType(column)} /> 
                        </Grid>
                    )
                })
            }
        </Grid>)
    });

    return (
        <>
            <Grid item container direction='column' alignItems="center">
                {BoardRows}
            </Grid>
        </>
    )
}

export default Board;
