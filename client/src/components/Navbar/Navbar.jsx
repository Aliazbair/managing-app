import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import {LOGOUT} from '../../constants/actionTypes'
import memories from '../../images/memories.png'
import useStyles from './styles'
const Navbar = () => {
  // user state to get user from localstroge
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  // dispatch the action
  const dispatch = useDispatch()

  // use location router
  const location = useLocation()

  // use history router
  const history = useHistory()

  // useStyles
  const classes = useStyles()

  //  create logout function
  const logout = () => {
    dispatch({ type: LOGOUT })
    history.push('/auth')
    // set user to null
    setUser(null)
  }

  // useEffect
  useEffect(() => {
    const token = user?.token
    // check the token
    if (token) {
      // decoded thetoken
      const decodedToken = decode(token)
      // remove the token after 1 hour
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    // get data from profile and set its to setUser state
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h6'
          align='center'>
          Managing App
        </Typography>
        <img className={classes.image} src={memories} alt='icon' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {/* here dispaly user info comping in loclastroge */}
        {user?.result ? (
          <div className={classes.profile}>
            {/* put user data here */}
            <Avatar className={classes.purple} src={user?.result.imageUrl}  alt={user?.result.name} >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button color="secondary" variant="contained" className={classes.logout}
            onClick={logout}>LogOut</Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
