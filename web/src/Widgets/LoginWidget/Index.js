import React, { useState, useRef, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loginAct} from '../../Redux/actions'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    inptField: {
        width: '350px',
        margin: '10px 0'
    }
  }));

const Index  = () => {
    const classes = useStyles();
    const inptLogin = useRef(null);
    const inptPass = useRef(null);

    const [submitLogin, setSubmitLogin] = useState(false);
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });
  
    const dispatch = useDispatch()

      const {isLogged} = useSelector(state => state.LoginReducer)
      useEffect(()=> {
        if(submitLogin) dispatch(loginAct({login:inptLogin.current.value, pass: inptPass.current.value}))
        return () => setSubmitLogin(false)
      })

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleSubmit = () => {  
          inptLogin.current.value !== '' && inptPass.current.value !=='' ? setSubmitLogin(true) : setError(true)
      }
    return(
        <Grid container>
            <Grid item>
        <Box>
            <Paper className={classes.paper}>
               <Box>
                <FormControl className={clsx(classes.inptField)} variant="outlined">
                    <InputLabel htmlFor="email">Login</InputLabel>
                        <OutlinedInput autoFocus inputRef={inptLogin} id="mail" type='email' />
                </FormControl>
                </Box>
                <Box>
                <FormControl className={clsx(classes.inptField)} variant="outlined">
                    <InputLabel htmlFor="password">Heslo</InputLabel>
                        <OutlinedInput inputRef={inptPass} id="password" type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                                    }
                        />
                </FormControl>
                </Box>
                <Box>
                <FormControl className={clsx(classes.inptField)} variant="outlined">
                <Box><Button onClick={handleSubmit} variant="contained" color="primary">Přihlásit se</Button></Box>
                {error && (
                  <Box>Vyplnte obe pole</Box>
                )}
                {
                  (isLogged === 0 && document.cookie.length>0) && (
                    <Box style={{color: 'red',fontSize: '15px', fontWeight:'bolder',marginTop: '10px', fontFamily: 'Arial'}}>Přihlašovací údaje jsou neplatné</Box>
                  )
                }
                </FormControl>
                </Box>
            </Paper>
        </Box>
        </Grid>
        </Grid>
    )
}

Index.propTypes = {
  isLogged:PropTypes.bool.isRequired
}

export default Index