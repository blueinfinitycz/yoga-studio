import React, { useState, useRef, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {getMainMenu} from  '../../Redux/actions'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles((theme) => ({
    bt__active: {
      backgroundColor:'#f3f1f1',
      color: '#27347d',
      fontWeight: 'bold',
    },
    bt__default: {
        width: '100%',
        color: 'white',
        fontSize: '16px',
        textDecoration: 'none',
        margin: '5px 0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,.2)',
    },
    menuItemIcon: {
      display:'inline-block',
      margin: '0 22px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Index  = () => {
    const classes = useStyles();
    const [dataLoaded, setDataLoaded] = useState(false)
    const dispatch = useDispatch()

      const {data} = useSelector(state => state.MainMenuReducer)

      useEffect(()=> {
        if(!dataLoaded) dispatch(getMainMenu())
        return () => setDataLoaded(true)
      }, [dataLoaded])
      
      let linkIcon = [DashboardIcon,DirectionsRunIcon,FastfoodIcon,BathtubIcon,ImportContactsIcon]

    return(
        <Box style={{marginTop: '50px'}}>
        { 
          data !==undefined && (data.map((menuItem,index) =>{
              const Comp = linkIcon[index]
            return(
              <Box>
                <Link className={classes.bt__default} to={menuItem.route} >
                  {<Comp className={classes.menuItemIcon} />}
                  {menuItem.item}
                </Link>
              </Box>
            )
          }))
        }
   </Box>
    )
}

export default Index