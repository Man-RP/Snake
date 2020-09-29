import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
        
    },
    button: {
        height: '30px',
        width: '120px',
        margin: '15px'
    },
    statTypography: {

    },
}));


const ButtonsPanel = React.memo(({ reset, toggleGame }) => {
    const classes = useStyles();

    console.log('ButtonsPanel');
    return (
        <div className={classes.root} >
            <Button 
                onClick={toggleGame}
                variant="contained" 
                color="secondary"
                className={classes.button} >
                    Pause
            </Button>
            <Button 
                onClick={reset}
                variant="contained" 
                color="secondary"
                className={classes.button} >
                    Restart
            </Button>
        </div>
    )
});

export default ButtonsPanel
