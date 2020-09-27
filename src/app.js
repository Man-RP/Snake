import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Snake from './components/Snake';
import Navbar from './components/Navbar';

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
    },
  });


function App() {
    const classes = useStyles();
    console.log('render');
    
    return (
    <div className={classes.root}>
        {/* <Navbar />  */}
        <Snake />

    </div>
    );
}

export default App
