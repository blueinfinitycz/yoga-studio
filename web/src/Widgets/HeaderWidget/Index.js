import React , {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import {logoutAct} from '../../Redux/actions'
import logoScheduler from './logo.png'

const useStyles = makeStyles((theme) => ({
  accountBtIcon: {
    position: 'absolute',
    right: '30px'
  },
}));



const Index = () => {
  const [isLogout, setLogOut] = useState(false)
  const {isLogged, user} = useSelector(state => state.LoginReducer)
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(()=>{
    if(isLogout) { dispatch(logoutAct());}
    return setLogOut(false)
  },[isLogout])

  const clickLogOut = () =>{
    setLogOut(true)
  }

  const userData = user === undefined ? document.cookie.split('userName=')[1] : user

    return(
      <AppBar style={{backgroundColor: '#27347d'}}>
          <Toolbar>
          <Typography variant="h5" noWrap>
            <img src={logoScheduler} />
          </Typography>
          { (isLogged === 1 || document.cookie.length>0) && (<IconButton edge="end" className={classes.accountBtIcon} color="inherit">
            <AccountCircle />
            <Box component="span" style={{fontSize:'15px',marginLeft: '10px`'}}>{userData}</Box>
            <PowerSettingsNew onClick={clickLogOut} style={{marginLeft: '20px'}} />
          </IconButton>  )}
          </Toolbar>
      </AppBar>
    )
}

export default Index