import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid'
import TableFilters from './table_filters'
import DarkModeIsOnTheme from './dark_mode_theme'


export default function ErrorLogTable() {

  const [ data , setData ] = useState([])
  const [ darkModeIsOn , setDarkModeIsOn ] = useState(true)
  const [ resultsLimit , setResultsLimit ] = useState(20)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)
  const [ quelleFilter , setQuelleFilter ] = useState()
  const [ dateFromFilter , setDateFromFilter ] = useState('Sat Jan 01 2001')
  const [ dateToFilter , setDateToFilter ] = useState()

  useEffect(() => {
    const url = `https://data.my-motion.de/log/v1/search/-1/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/-1/${quelleFilter ? quelleFilter : '-1'}/-1/-1/${resultsLimit}/-1`
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

  function quelleString(quelle){
    if (quelle.value == 9) return 'HOMEPAGE-TOOL'
    else if (quelle.value == 10) return 'SHOW-ROOOOM'
    else return quelle.value
  }

  const rows = [...data]

  const columns = [
    { field: 'datum', headerName: 'Datum', type: 'date', 
      valueFormatter: (date) => {
        const dateFormatted = new Date(date.value).toUTCString();
          return `${dateFormatted}`;
        },
      width: 210 },
    { field: 'level', headerName: 'Level', type: 'number', width: 110},
    { field: 'quelle', headerName: 'Quelle', valueGetter: quelleString, width: 140 },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'id_firma', headerName: 'Firma', width: 110 },
    { field: 'id_user', headerName: 'User ID', width: 120 },
    { field: 'id_car', headerName: 'Fahrzeug ID', width: 150 },
    { field: 'id_data', headerName: 'Data ID', width: 120 },
    { field: 'id_proto', headerName: 'Protokoll ID', width: 140 },
    { field: 'id_portal', headerName: 'Portal', width: 110 },
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

  const handleDateFromValue = (value) => {
    const dateFromValue = value
    setDateFromFilter(dateFromValue)
  }

  const handleDateToValue = (value) => {
    const dateToValue = value
    setDateToFilter(dateToValue)
  }

  const handleDarkModeSwitch = () => {
    setDarkModeIsOn(!darkModeIsOn)
  }

useEffect(() => {
  console.log(dateFromFilter)
}, [dateFromFilter])

  return (
    <>
      <TableFilters 
        resultsLimitFilterValue={handleResultsLimitFilterValue} 
        userIdFilterValue={handleUserIdFilterValue} 
        quelleFilterValue={handleQuelleFilterValue} 
        quelleFilter={quelleFilter}
        darkModeSwitch={handleDarkModeSwitch}
        darkModeIsOn={darkModeIsOn}
        dateFromValue={handleDateFromValue}
        dateFromFilter={dateFromFilter}
        dateToFilter={dateToFilter}
      />
      <div style={{ height: 921, width: '100%', padding: "1rem" }}>
        { data &&
          <DataGrid
            className="data-grid-container"
            rows={rows}
            columns={columns}
            pageSize={15}
          />
        }
      </div>
      { darkModeIsOn && <DarkModeIsOnTheme /> }
    </> 
  )
}