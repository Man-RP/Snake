import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Snake from './components/Snake';
import Navbar from './components/Navbar';

const useStyles = makeStyles({
    root: {
        boxSizing: 'border-box',
        // height: '95vh',
        // width: '100vw',
        margin: 0,
        padding: 0,
        
    },
  });


function App() {
    const classes = useStyles();
    
    return (
        
        <div className={classes.root}>
            {/* <Navbar />  */}
            <Snake />
        </div>
        
    );
}

export default App
