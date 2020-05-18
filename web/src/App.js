import React from 'react'
import {useSelector} from 'react-redux'
import {spinnerLoading} from './Components/SpinnerLoading'
import LoginWidget from './Widgets/LoginWidget/Index'
import HeaderWidget from './Widgets/HeaderWidget/Index'
import Body from './Widgets/BodyWidget/Index'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import {Route, Redirect} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  appContainer: {
    margin: 'auto',
    backgroundColor: '#f3f1f1',
    height: window.innerHeight-73
  },
  appGrid: {
    marginTop: '64px',
    height: 'inherit'
  },
  appBottom: {
    width: '300px'
  }
}));



const Authenticate = (isLogged) => {
  return isLogged.isLogged === 0 && document.cookie.length === 0 ? (
  <>
  <Redirect to={{pathname: 'login'}}/>
  <Route path='/login'><Grid item><LoginWidget /></Grid></Route>
  </>
  ) : (
    <>
  <Redirect to={{pathname: 'dashboard'}} />
  <Grid container><Body /></Grid>
  </>
  )
}

const App = () => {
  const {isLoading, isLogged} = useSelector(state => state.AppReducer)
  const styles = useStyles();

  return(
    <Container className={styles.appContainer} maxWidth="xl">
       <Box>
        <HeaderWidget />
      </Box>
      <Grid className={styles.appGrid} container spacing={4} direction="row" justify="center" alignItems= {isLogged === 0 && document.cookie.length === 0 ? 'center': 'top'}>
           <Authenticate isLogged={isLogged} />
          {isLoading === 1 && (spinnerLoading())}
      </Grid>
   </Container>
  )
}

  export default App

  App.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLogged: PropTypes.bool.isRequired
  }