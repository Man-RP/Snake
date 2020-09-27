import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" >
                Snake
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
