import React from 'react';
import {Link} from 'react-router-dom'
import {AppBar,Typography,Toolbar,Avatar,Button } from '@material-ui/core'

import memories from '../../images/memories.png';
import useStyles from './styles'
const Navbar = () => {
    // user state to get user from localstroge

    // dispatch the action

    // use location router

    // use history router

    // useStyles
    const classes=useStyles()

    //  create logout function

    // useEffect
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align="center">Managing App</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {/* here dispaly user info comping in loclastroge */}

                <Typography classNamr={classes.userName} variant="h6">Ali</Typography>
                
            </Toolbar>
            
        </AppBar>
    );
}

export default Navbar;
