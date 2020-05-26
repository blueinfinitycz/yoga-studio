import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import {getData} from  '../../Redux/actions'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  }));

const Index  = () => {
    const classes = useStyles()
    const [dataLoaded, setDataLoaded] = useState(false)
    const dispatch = useDispatch()

      const {data} = useSelector(state => state.DashboardReducer)

      useEffect(()=> {
        if(!dataLoaded){
          dispatch(getData('/getDashboardData'))
          return () => setDataLoaded(true)
        }
      }, [dataLoaded])


    return(
        <Box style={{display: 'flex', justifyContent:'center'}}>
        {
            data !== undefined && (
                JSON.parse(data.statistics).map(item => 
                    <Box style={{width: '200px', textAlign:'center',fontFamily: 'Arial'}}>
                        <Paper className={classes.paper} style={{padding: '10px'}}>
                            <h3 style={{textTransform: 'capitalize'}}>{Object.keys(item)}</h3>
                            <h2>{item.downloads}</h2>
                        </Paper>
                    </Box>
                    )
            )
        }
    </Box>
    )
}

Index.propTypes = {
  data:PropTypes.object.isRequired
}

export default Index