import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'
import MaterialTable from '../../Components/MaterialTable'
import Button from '@material-ui/core/Button';
import {getData, crudOperation, loadFile} from  '../../Redux/actions'

const Index  = () => {
    const [dataLoaded, setDataLoaded] = useState({state:false, data: {}})
    const [updatePrashadData, setUpdatePrashadData] = useState({state:false, data:{}})
    const [addPrashadData, setAddPrashadData] = useState({state:false, data:{}})
    const [removePrashadData, setRemovePrashadData] = useState({state:false, data:{}})
    const [loadExcelPrashadData,setLoadExcelPrashadData] = useState({state:false,data:{}})

    const dispatch = useDispatch()

    const columnsMans = [
        {title: 'Datum', field:'datum', editComponent: props => (createCalendar(props))},
        {title: '1 jméno', field: 'jmeno_1.jmeno',editComponent: props =>(createSelectBox(data, props))},
        {title: '2 jméno', field: 'jmeno_2.jmeno',editComponent: props =>(createSelectBox(data, props))},
        {title: '3 jméno', field: 'jmeno_3.jmeno',editComponent: props =>(createSelectBox(data, props))},
        {title: '4 jméno', field: 'jmeno_4.jmeno',editComponent: props =>(createSelectBox(data, props))}
      ]

    const {data} = useSelector(state => state.PrashadReducer)

      useEffect(()=> {
        if(!dataLoaded.state){
          dispatch(getData('/getPrashadData'))
          return () => setDataLoaded(false)
        }
      }, [dataLoaded])

      useEffect(()=>{
        if(updatePrashadData.state) {
          dispatch(crudOperation('/updatePrashadData','/getPrashadData',updatePrashadData.data))
          return () => setUpdatePrashadData({state:false, data:{}})
        }

      },[updatePrashadData])

      useEffect(()=>{
        if(addPrashadData.state) {
          dispatch(crudOperation('/addPrashadData','/getPrashadData',addPrashadData.data))
          return () => setAddPrashadData({state:false, data:{}})
        }

      },[addPrashadData])

      useEffect(()=>{
        if(removePrashadData.state) {
          dispatch(crudOperation('/removePrashadData','/getPrashadData',removePrashadData.data))
          return () => setRemovePrashadData({state:false, data:{}})
        }

      },[removePrashadData])

      useEffect(() => {
        if(loadExcelPrashadData.state) {
          dispatch(loadFile('/loadExcelPrashadData','/getPrashadData', loadExcelPrashadData.data))
          return () => setLoadExcelPrashadData({state:false, data:{}})
        }
      }, [loadExcelPrashadData])


    const createSelectBox = (data,props) => (
      <select id="contacts" onChange={e => props.onChange(e.target.value)}>
        <option value='0'>-- Vyber žáka --</option>
          {
            JSON.parse(data.contacts.mans).map(item =><option value={item.id}>{item.jmeno}</option>)
          } 
          {
            JSON.parse(data.contacts.females).map(item =><option value={item.id}>{item.jmeno}</option>)
          }
      </select>
      )
    
    const createCalendar = (props) => (
      <input type="date" onChange={e => props.onChange(e.target.value)} id="calendarContainer" name="calendar" />
    )

    return(
        <Box style={{display: 'flex', flexDirection: 'column', maxWidth: '992px',margin: 'auto'}}>
          <Box style={{margin: '30px 0'}}>
          <Button variant="contained" component="label">Načíst data z excelu <input type="file" name="excelLoader" onChange={(e) => 
          setLoadExcelPrashadData({state:true, data: new FormData().append('file', e.target.files[0]) })}
          style={{ display: "none" }} />
          </Button>
          </Box>
        {
            data && (
                    <Box style={{margin: '50px 0'}}> 
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
                            setAddData={(newRowData) => {const finalDataToAdd = {...newRowData, maxGroupCount: +data.maxGroupCount}; return setAddPrashadData({state:true,data: finalDataToAdd})}}
                            setUpdateData={(newData, oldData) => setUpdatePrashadData({state:true, data:newData})}
                            setRemoveData={(data)=> setRemovePrashadData({state:true,data:data.skupina})}
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