import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'
import MaterialTable from '../../Components/MaterialTable'
import {getData, updateData, addData, removeData} from  '../../Redux/actions'
import {firstLetterUpperCase} from '../../Utils/strUtil'

const Index  = () => {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [updateContactsData, setUpdateContactsData] = useState({state:false, data:{}})
    const [addContactsData, setAddContactsData] = useState({state:false, data:{}})
    const [removeContactsData, setRemoveContactsData] = useState({state:false, data:{}})

    const dispatch = useDispatch()

    const columns = [{title: 'Jméno', field:'name'}, {title: 'Příjmení', field: 'surname'},{title: 'Email', field: 'email'},{title: 'Telefon', field: 'tel'}]
    const {data} = useSelector(state => state.ContactsReducer)

      useEffect(()=> {
        if(!dataLoaded){
          dispatch(getData('/getContactsData'))
          return () => setDataLoaded(false)
        }
      }, [dataLoaded])

      useEffect(()=>{
        if(updateContactsData.state) {
          dispatch(updateData('/updateContactsData','/getContactsData',updateContactsData.data))
          return () => setUpdateContactsData({state:false, data:{}})
        }

      },[updateContactsData])

      useEffect(()=>{
        if(addContactsData.state) {
          dispatch(addData('/addContactsData','/getContactsData',addContactsData.data))
          return () => setAddContactsData({state:false, data:{}})
        }

      },[addContactsData])

      useEffect(()=>{
        if(removeContactsData.state) {
          dispatch(removeData('/removeContactsData','/getContactsData',removeContactsData.data))
          return () => setRemoveContactsData({state:false, data:{}})
        }

      },[removeContactsData])

    return(
        <Box style={{display: 'flex', flexDirection: 'column', maxWidth: '992px',margin: 'auto'}}>
        {
            data && (
                <Box>
                    <Box style={{margin: '50px 0'}}>
                        <MaterialTable 
                            title="Kontakty - chlapci" 
                            columns={columns}
                            data={JSON.parse(data.male)} 
                            setAddData={(data)=> {
                                const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1, gender: 'male'};setAddContactsData({state:true, data:dataContainer})
                            }} 
                            setUpdateData={(data) => {
                                const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1};
                                setUpdateContactsData({state:true, data:dataContainer})
                            }}
                            setRemoveData={(data)=> setRemoveContactsData({state:true,data:data})}
                        />
                    </Box>
                    <Box style={{margin: '50px 0'}}>
                        <MaterialTable 
                            title="Kontakty - dívky" 
                            columns={columns}
                            data={JSON.parse(data.female)} 
                            setAddData={(data)=> {
                                const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1, gender: 'female'};setAddContactsData({state:true, data:dataContainer})
                            }} 
                            setUpdateData={(data) => {
                            const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1};
                                setUpdateContactsData({state:true, data:dataContainer})
                            }}
                            setRemoveData={(data)=> setRemoveContactsData({state:true,data:data})}
                        />
                    </Box>
                </Box>
            )
        }
    </Box>

    )
}

Index.propTypes = {
  data:PropTypes.object.isRequired
}

export default Index