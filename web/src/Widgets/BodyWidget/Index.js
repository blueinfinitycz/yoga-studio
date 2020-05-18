import React from 'react'
import {useSelector} from 'react-redux' 
import Grid from '@material-ui/core/Grid';
import {Route} from "react-router-dom";
import MenuWidget from '../MenuWidget/Index'
import DashboardWidget from '../DashboardWidget/Index'
import EventsWidget from  '../EventsWidget/Index'
import PrashadWidget from '../PrashadWidget/Index'
import CleaningWidget from  '../CleaningWidget/Index'
import ContactsWidget from '../ContactsWidget/Index'

const Index = () => {

    const components = [[DashboardWidget, '/dashboard'],[EventsWidget,'/events'],[PrashadWidget,'/prashad'],[CleaningWidget,'/cleaning'],[ContactsWidget, '/contacts']]
    const {data} = useSelector(state => state.MainMenuReducer)
        return (
            <>
                <Grid xs={2} item style={{backgroundColor: '#3f51b5',marginLeft: '-16px',textAlign: 'center'}}>
                    <MenuWidget />
                </Grid>
                <Grid xs={10} item >
                    {data && (data.map((item, index) => (<Route path={components[index][1]} component={components[index][0]} />)))}
                </Grid>
            </>
        )
}

export default Index