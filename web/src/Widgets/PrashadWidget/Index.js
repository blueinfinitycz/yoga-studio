import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'
import MaterialTable from '../../Components/MaterialTable'
import {getData, updateData, addData, removeData} from  '../../Redux/actions'
import {firstLetterUpperCase} from '../../Utils/strUtil'

const Index  = () => {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [updatePrashadData, setUpdatePrashadData] = useState({state:false, data:{}})
    const [addPrashadData, setAddPrashadData] = useState({state:false, data:{}})
    const [removePrashadData, setRemovePrashadData] = useState({state:false, data:{}})

    const dispatch = useDispatch()

    const columnsMans = [
        {title: 'Datum', field:'datum'},
        {title: '1 jméno', field: 'jmeno_1.jmeno',editComponent: props =>(createSelectBox(data.contacts.mans, props))},
        {title: '2 jméno', field: 'jmeno_2.jmeno',editComponent: props =>(createSelectBox(data.contacts.mans, props))},
        {title: '3 jméno', field: 'jmeno_3.jmeno',editComponent: props =>(createSelectBox(data.contacts.mans, props))},
        {title: '4 jméno', field: 'jmeno_4.jmeno',editComponent: props =>(createSelectBox(data.contacts.mans, props))}
      ]

    const {data} = useSelector(state => state.PrashadReducer)

      useEffect(()=> {
        if(!dataLoaded){
          dispatch(getData('/getPrashadData'))
          return () => setDataLoaded(false)
        }
      }, [dataLoaded])

      useEffect(()=>{
        if(updatePrashadData.state) {
          dispatch(updateData('/updatePrashadData','/getPrashadData',updatePrashadData.data))
          return () => setUpdatePrashadData({state:false, data:{}})
        }

      },[updatePrashadData])

    //   useEffect(()=>{
    //     if(addPrashadData.state) {
    //       dispatch(addData('/addPrashadData','/getPrashadData',addPrashadData.data))
    //       return () => setAddPrashadData({state:false, data:{}})
    //     }

    //   },[addPrashadData])

    //   useEffect(()=>{
    //     if(removePrashadData.state) {
    //       dispatch(removeData('/removePrashadData','/getPrashadData',removePrashadData.data))
    //       return () => setRemovePrashadData({state:false, data:{}})
    //     }

    //   },[removePrashadData])
      // let updatedData

    const createSelectBox = (data,props) => (<select id="contacts" onChange={e => props.onChange(e.target.value)}>{JSON.parse(data).map(item =><option value={item.id}>{item.jmeno}</option> )}</select>)

    return(
        <Box style={{display: 'flex', flexDirection: 'column', maxWidth: '992px',margin: 'auto'}}>
        {
            data && (
                    <Box style={{margin: '50px 0'}}>
                        {createSelectBox(data.contacts.mans)}
                        {createSelectBox(data.contacts.females)}
                        <MaterialTable 
                            title="Prashádový seznam" 
                            columns={columnsMans}
                            data= {JSON.parse(data.groupes).map(item => {return {
                              skupina:item.skupina, 
                              datum:item.datum.split('T')[0],
                              jmeno_1:item.jmeno_1,
                              jmeno_2:item.jmeno_2,
                              jmeno_3:item.jmeno_3,
                              jmeno_4:item.jmeno_4,
                              } 
                              })}
                            // setAddData={(data)=> {
                            //     const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1, gender: 'male'};setAddPrashadData({state:true, data:dataContainer})
                            // }} 
                             setUpdateData={(newData, oldData) => setUpdatePrashadData({state:true, data:newData})}
                            //     const dataContainer={...data,name: firstLetterUpperCase(data.name), surname:firstLetterUpperCase(data.surname),exist:1};
                            //     setUpdatePrashadData({state:true, data:dataContainer})
                            // }}
                            // setRemoveData={(data)=> setRemovePrashadData({state:true,data:data})}
                        />
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