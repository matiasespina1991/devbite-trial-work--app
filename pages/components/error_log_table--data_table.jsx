import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid'
import TableFilters from './table_filters'


export default function ErrorLogTable() {

  const [ data , setData ] = useState([])
  const [ resultsLimit , setResultsLimit ] = useState(20)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)
  const [ quelleFilter , setQuelleFilter ] = useState(-1)

  useEffect(() => {
    const url = `https://data.my-motion.de/log/v1/search/-1/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/-1/${quelleFilter}/-1/-1/${resultsLimit}/-1`
    axios.post(url)
      .then((res) => { 
        const data_json = res.data.map((res, index) => (
          {
            id: index,
            datum: res.date, 
            level: res.level,
            quelle: res.quelle,
            status: res.status,
            id_firma: res.id_firma,
            id_user: res.id_user,
            id_car: res.id_car,
            id_data: res.id_data,
            id_proto: res.id_proto,
            id_portal: res.id_portal,
            msg: res.msg,
          }
        ));
        setData([...data_json]);

      })
      .catch((err) => { 
        console.log(err) 
      })
  }, [resultsLimit , userIdFilter , quelleFilter])

  const rows = [...data]

  const columns = [
    { field: 'datum', headerName: 'Datum', type: 'date', width: 130 },
    { field: 'level', headerName: 'Level', type: 'number', width: 130},
    { field: 'quelle', headerName: 'Quelle', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'id_firma', headerName: 'Firma', width: 130 },
    { field: 'id_user', headerName: 'User ID', width: 130 },
    { field: 'id_car', headerName: 'Fahrzeug ID', width: 130 },
    { field: 'id_proto', headerName: 'Data ID', width: 130 },
    { field: 'id_proto', headerName: 'Protokoll ID', width: 130 },
    { field: 'id_portal', headerName: 'Portal', width: 130 },
    { field: 'msg', headerName: 'Kurzbsechreibung', sortable: false, width:500 }
  ];

  const handleResultsLimitFilterValue = (e) => {
      const resultsLimitValue = e.target.value
      setResultsLimit(resultsLimitValue)
  }

  const handleUserIdFilterValue = (e) => {
    const userIdValue = e.target.value
    setUserIdFilter(userIdValue)
}

  const handleQuelleFilterValue = (e) => {
    const quelleFilterValue = e.target.value
    console.log(e.target.value)
    setQuelleFilter(quelleFilterValue)
  }

    return (
      <>
        <TableFilters 
          resultsLimitFilterValue={handleResultsLimitFilterValue} 
          userIdFilterValue={handleUserIdFilterValue} 
          quelleFilterValue={handleQuelleFilterValue} 
        />
        <div style={{ height: 684, width: '100%' }}>
          { data &&
            <DataGrid
              className="data-grid-container"
              rows={rows}
              columns={columns}
              pageSize={11}
              rowsPerPageOptions={[resultsLimit]}
            />
          }
          
        </div>
      </> 
    )
}