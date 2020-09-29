import React, { useState, useEffect } from 'react';
import { Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        marginTop: '10px'
    },
    statDiv: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '250px'
    },
    statTypography: {
        flexGrow: 1,
        padding: '0'
    },
    LinearProgress: {
        width: '180px',
        height: '15px'
    },
}));


const Stat = ({label, statValue}) => {

    const classes = useStyles();
    
    console.log('Stat');
    return (<div className={classes.statDiv}>
        <Typography 
            variant='h6'
            align='center'
            color='secondary' 
            className={classes.statTypography} >
            {label} 
        </Typography>
        <LinearProgress 
            value={statValue} 
            variant={'determinate'}
            className={classes.LinearProgress} />
    </div>);

}

const StatsPanel = React.memo(({ score, advanceTime }) => {
    const classes = useStyles();
    
    console.log('StatsPanel');
    return (
        <div className={classes.root} >
            <Stat label={'Score'} statValue={score} />
            <Stat label={'Speed'} statValue={advanceTime} />
        </div>
    )
});

export default StatsPanel
