import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'
import MaterialTable from '../../Components/MaterialTable'
import {getData, updateData, addData, removeData} from  '../../Redux/actions'

const Index  = () => {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [updateEventsData, setUpdateEventsData] = useState({state:false, data:{}})
    const [addEventsData, setAddEventsData] = useState({state:false, data:{}})
    const [removeEventsData, setRemoveEventsData] = useState({state:false, data:{}})

    const dispatch = useDispatch()

    const columns = [{title: 'Akce', field:'event'}, {title: 'Popis', field: 'description'},{title: 'Datum', field: 'date'}]
    const {data} = useSelector(state => state.EventsReducer)

      useEffect(()=> {
        if(!dataLoaded){
          dispatch(getData('/getEventsData'))
          return () => setDataLoaded(false)
        }
      }, [dataLoaded])

      useEffect(()=>{
        if(updateEventsData.state) {
          dispatch(updateData('/updateEventsData','/getEventsData',updateEventsData.data))
          return () => setUpdateEventsData({state:false, data:{}})
        }

      },[updateData])

      useEffect(()=>{
        if(addEventsData.state) {
          dispatch(addData('/addEventsData','/getEventsData',addEventsData.data))
          return () => setAddEventsData({state:false, data:{}})
        }

      },[addData])

      useEffect(()=>{
        if(removeEventsData.state) {
          dispatch(removeData('/removeEventsData','/getEventsData',removeEventsData.data))
          return () => setRemoveEventsData({state:false, data:{}})
        }

      },[removeData])
    return(
        <Box style={{display: 'flex', flexDirection: 'column', maxWidth: '992px',margin: 'auto'}}>
        {
            data && (
          <>
            <Box style={{margin: '50px 0'}}>
              <MaterialTable 
                title="Lokální akce" 
                columns={columns}
                data={JSON.parse(data.local)} 
                setAddData={(data)=> {const dataContainer={...data,local:1,global:0,state:1,exist:1};setAddEventsData({state:true, data:dataContainer})}} 
                setUpdateData={(data) => setUpdateEventsData({state:true,data:data})}
                setRemoveData={(data)=> setRemoveEventsData({state:true,data:data})}
                />
            </Box>
            
            <Box style={{margin: '50px 0'}}>
                  <MaterialTable 
                    title="Globální akce"
                    columns={columns}
                    data={JSON.parse(data.global)} 
                    setAddData={(data)=> {const dataContainer={...data,local:1,global:0,state:1,exist:1};setAddEventsData({state:true, data:dataContainer})}} 
                    setUpdateData={(data) => setUpdateEventsData({state:true,data:data})}
                    setRemoveData={(data)=> setRemoveEventsData({state:true,data:data})}
                />
            </Box>
          </>
            )
        }
    </Box>

    )
}

Index.propTypes = {
  data:PropTypes.object.isRequired
}

export default Index