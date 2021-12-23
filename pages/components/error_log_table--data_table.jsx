import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBox from './search_box'
import { DataGrid } from '@material-ui/data-grid'
import TableFilters from './table_filters'
import DarkModeTheme from './dark_mode_theme'
import DarkModeSwitch from './dark_mode_switch';
import ErrorDialog from './error_dialog'


export default function ErrorLogTable() {

  const [ data , setData ] = useState([])
  const [ isLoadingData , setIsLoadingData ] = useState(true)
  const [ onError , setOnError ] = useState(false)
  const [ darkModeIsOn , setDarkModeIsOn ] = useState(true)
  const [ firmaFilter , setFirmaFilter ] = useState(-1)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)
  const [ quelleFilter , setQuelleFilter ] = useState()
  const [ levelFilter , setLevelFilter ] = useState()
  const [ dateFromFilter , setDateFromFilter ] = useState(978318000000)
  const [ dateToFilter , setDateToFilter ] = useState(Date.now())
  const [ resultsLimit , setResultsLimit ] = useState(20)

  useEffect(() => {
    setIsLoadingData(true)
    const url = `https://data.my-motion.de/log/v1/search/${firmaFilter ? firmaFilter : '-1'}/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/${levelFilter == undefined ? '-1' : levelFilter}/${quelleFilter ? quelleFilter : '-1'}/${dateFromFilter ? dateFromFilter : '-1'}/${dateToFilter ? dateToFilter : '-1'}/${resultsLimit}/-1`
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
        setIsLoadingData(false)
      })
      .catch((err) => { 
        console.log(err)
        setOnError(true)
      })
  }, [firmaFilter , userIdFilter , levelFilter , quelleFilter, dateFromFilter, dateToFilter , resultsLimit])
  
  const rows = [...data]

  const columns = [
    { field: 'datum', headerName: 'Datum', type: 'date', 
      valueFormatter: (date) => {
        const dateFormatted = new Date(date.value).toUTCString();
          return `${dateFormatted}`;
        },
      width: 210 },
    { field: 'level', headerName: 'Level', valueGetter: levelStringFormatter, width: 110},
    { field: 'quelle', headerName: 'Quelle', valueGetter: quelleStringFormatter, width: 140 },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'id_firma', headerName: 'Firma', width: 110 },
    { field: 'id_user', headerName: 'User ID', width: 120 },
    { field: 'id_car', headerName: 'Fahrzeug ID', width: 150 },
    { field: 'id_data', headerName: 'Data ID', width: 120 },
    { field: 'id_proto', headerName: 'Protokoll ID', width: 140 },
    { field: 'id_portal', headerName: 'Portal', width: 110 },
    { field: 'msg', headerName: 'Kurzbsechreibung', sortable: false, width:500 }
  ];

  function quelleStringFormatter(quelle){
    if (quelle.value == 9) return 'HOMEPAGE-TOOL'
    else if (quelle.value == 10) return 'SHOW-ROOOOM'
    else return quelle.value
  }
  function levelStringFormatter(level){
    if (level.value == 0) return 'Unknown'
    else if (level.value == 1) return 'Critical Error'
    else if (level.value == 2) return 'Error'
    else if (level.value == 3) return 'Warning'
    else if (level.value == 4) return 'Info'
    else return level.value
  }
  
  const handleFirmaFilterValue = (e) => {
    const firmaValue = e.target.value
    setFirmaFilter(firmaValue)
  }

  const handleUserIdFilterValue = (e) => {
    const userIdValue = e.target.value
    setUserIdFilter(userIdValue)
  }

  const handleQuelleFilterValue = (e) => {
    const quelleFilterValue = e.target.value
    setQuelleFilter(quelleFilterValue)
  }

  const handleLevelFilterValue = (e) => {
    const levelFilterValue = e.target.value
    setLevelFilter(levelFilterValue)
  }

  const handleDateFromValue = (value) => {
    const dateFromValue = value.getTime()
    setDateFromFilter(dateFromValue)
  }

  const handleDateToValue = (value) => {
    const dateToValue = value.getTime()
    setDateToFilter(dateToValue)
  }

  const handleResultsLimitFilterValue = (e) => {
    const resultsLimitValue = e.target.value
    setResultsLimit(resultsLimitValue)
}

  const handleDarkModeSwitch = () => {
    setDarkModeIsOn(!darkModeIsOn)
  }

  return (
    <>

      <div className="top-pannel-container">
        <SearchBox />
        <DarkModeSwitch
          darkModeSwitch={handleDarkModeSwitch}
          darkModeIsOn={darkModeIsOn} 
        />
      </div>
      
      <div style={{ width: '100%', padding: "0 1rem" }}>
        { data &&
          <DataGrid
            className="data-grid-container"
            rows={rows}
            columns={columns}
            pageSize={15}
            autoHeight
            rowsPerPageOptions={[15]}
            loading={isLoadingData}
          />
        }
      </div>

      { onError && <ErrorDialog /> }

      <TableFilters 
        resultsLimitFilterValue={handleResultsLimitFilterValue} 
        userIdFilterValue={handleUserIdFilterValue} 
        quelleFilterValue={handleQuelleFilterValue} 
        quelleFilter={quelleFilter}
        levelFilterValue={handleLevelFilterValue} 
        levelFilter={levelFilter}
        dateFromValue={handleDateFromValue}
        dateFromFilter={dateFromFilter}
        dateToFilter={dateToFilter}
        dateToValue={handleDateToValue}
        firmaFilterValue={handleFirmaFilterValue}
      />

      { darkModeIsOn && <DarkModeTheme /> }

    </> 
  )
}