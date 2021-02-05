import React, { useState } from 'react'
import {
  Grid,
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
} from '@material-ui/core'
import { GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from '../Helpers/Input'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
 import Icon from './icon'
 import {AUTH} from '../../constants/actionTypes'
import useStyles from './styles'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignUp = () => {
  // form state
  const [form, setForm] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)

  // isSining state
  const [isSignUp, setIsSignup] = useState(false)

  // dispatch auth
  const dispatch=useDispatch()

  // history router
  const history=useHistory()

  // classes styles
  const classes = useStyles()

  // showPassword state

  //  handle showPassword
  const handleShowPassword = () => {
      setShowPassword(!showPassword)
  }

  // switchMode state
  const switchMode=()=>{
    //   clear from data
    setForm(initialState)
      setIsSignup((prevIsSignup)=> !prevIsSignup)
    //   set showpassword to false
    setShowPassword(false)
  }

  // handleSubmit
  const handleSubmit = (e) => {
      e.prevetDefault()

      // check the siginup state
      if(isSignUp){
        // MAKE siginUp action
      }
      else{
        // MAKE siginIn action

      }
      
  }

  // google success function
  const googleSuccess=(res)=>{
    // get user profile from req object
    const result = res?.profileObj

    // get user token 
    const token = res?.tokenId

    // dispatch the auth action
    try {
      // dispatch auth action
      dispatch({type:AUTH,data:{result,token}})
      history.push('/')
      
    } catch (error) {
      console.log(error);
    }

  }

  // google errors function
  const googlError=()=>{
    alert('Google Sign In was unsuccessfull 😥 Try again Later')
  }

  // handelChange function
  const handleChange = (e) => {
      setForm({...form,[e.target.name]:e.target.value})
  }





  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isSignUp ? 'Sign Up' : 'Sign In'}{' '}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* make singIn OR signUp from */}
              {isSignUp && (
                <>
                  {/* create signIn */}
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                </>
              )}
              {/* create signUp */}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name='confiremPassword'
                  label='Repeat Password'
                  handleChange={handleChange}
                  type='password'
                />
              )}
            </Grid>
            {/* create submit button */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            {/* google button put here */}
            <GoogleLogin 
              clientId="1043108994227-u4r8d3uiihke8cb1hdrtsqda3sgcufjs.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googlError}
              cookiePolicy="single_host_origin"

            />
            <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default SignUp
