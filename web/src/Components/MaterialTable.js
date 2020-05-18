import React from 'react'
import MaterialTable from 'material-table';

const CreateTable = ({title,columns,data, setUpdateData, setAddData, setRemoveData}) => {
    
    return(
      <MaterialTable title={title} columns={columns} data={data} editable={{
        onRowAdd: (newData) => new Promise((resolve, reject) => {setAddData(newData);resolve()}),
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {setUpdateData(newData,oldData);resolve()}),
        onRowDelete: (oldData) => new Promise((resolve, reject) => {setRemoveData(oldData);resolve()}),
      }}
  />
    )
  }

  export default CreateTable