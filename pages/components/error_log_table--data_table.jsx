import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import SearchBox from './search_box'
import { DataGrid } from '@material-ui/data-grid'
import TableFilters from './table_filters'
import DarkModeTheme from './dark_mode_theme'
import DarkModeSwitch from './dark_mode_switch';
import SelectedRowDialog from './selected_row_dialog'
import ErrorDialog from './error_dialog'
import moment from 'moment'
import 'moment/locale/de'

export default function ErrorLogTable() {

  const [ data , setData ] = useState([])
  const [ isLoadingData , setIsLoadingData ] = useState(true)
  const [ onError , setOnError ] = useState(false)
  const [ darkModeIsOn , setDarkModeIsOn ] = useState(true)
  const [ searchInput , setSearchInput ] = useState('')
  const [ firmaFilter , setFirmaFilter ] = useState(-1)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)
  const [ quelleFilter , setQuelleFilter ] = useState(-1)
  const [ levelFilter , setLevelFilter ] = useState()
  const [ dateFromFilter , setDateFromFilter ] = useState(978318000000)
  const [ dateToFilter , setDateToFilter ] = useState(Date.now())
  const [ resultsLimit , setResultsLimit ] = useState(1000)
  const [ selectedRowData , setSelectedRowData ] = useState()
  const [ selectedRowDialogIsOpen , setSelectedRowDialogIsOpen ] = useState(false)

  useEffect(() => {
    setIsLoadingData(true)
    const url = `https://data.my-motion.de/log/v1/search/${firmaFilter ? firmaFilter : '-1'}/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/${levelFilter == undefined ? '-1' : levelFilter}/${quelleFilter ? quelleFilter : '-1'}/${dateFromFilter ? dateFromFilter : '-1'}/${dateToFilter ? dateToFilter : '-1'}/${resultsLimit}/-1`
    axios.post(url, searchInput)
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

        setData([...data_json])

        setIsLoadingData(false)

      })
      .catch((err) => { 
        console.log(err)
        setOnError(true)
      })
      
  }, [searchInput , firmaFilter , userIdFilter , levelFilter , quelleFilter, dateFromFilter, dateToFilter , resultsLimit])

  const rows = [...data]

  const columns = [
    { field: 'datum', headerName: 'Datum', type: 'date', minWidth: 145,
      valueFormatter: (date) => {
        const dateFormatted = moment(date.value).locale('de').format("DD.MM.YYYY - hh:mm") + " Uhr.";
          return `${dateFormatted}`;
        }},
    { field: 'level', headerName: 'Level', valueGetter: levelStringFormatter, minWidth: 96 },
    { field: 'msg', headerName: 'Kurzbsechreibung', sortable: false, minWidth: 320, flex: 2 },
    { field: 'quelle', headerName: 'Quelle', headerAlign: 'right', align: 'right', valueGetter: quelleStringFormatter, minWidth: 135, maxWidth: 190 },
    { field: 'id_user', headerName: 'User ID', headerAlign: 'right', align: 'right', minWidth: 135 },
    { field: 'id_firma', headerName: 'Firma', headerAlign: 'right', align: 'right', minWidth: 135 },
    { field: 'status', hide: true, headerName: 'Status', headerAlign: 'right', align: 'right', minWidth: 106, flex: 1 },
    { field: 'id_car', hide: true, headerName: 'Fahrzeug ID', headerAlign: 'right', align: 'right', minWidth: 130, flex: 1 },
    { field: 'id_data', hide: true, headerName: 'Data ID', headerAlign: 'right', align: 'right', minWidth: 106, flex: 1 },
    { field: 'id_proto', hide: true, headerName: 'Protokoll ID', headerAlign: 'right', align: 'right', minWidth: 130, flex: 1 },
    { field: 'id_portal', hide: true, headerName: 'Portal', headerAlign: 'right', align: 'right', minWidth: 100, flex: 1 }
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
    quelleFilterValue == -1 ? setResultsLimit(1000) : setResultsLimit(-1)
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

  const handleSearchInputValue = (e) => {
    const searchInputValue = e.target.value
    setSearchInput(searchInputValue)
  }

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData)
    setSelectedRowDialogIsOpen(true)
  }

  const handleDarkModeSwitch = () => {
    setDarkModeIsOn(!darkModeIsOn)
  }

  const deutschDataGridLocaleText = {
    noRowsLabel: 'Keine Ergebnisse gefunden.',
    noResultsOverlayLabel: 'Keine Ergebnisse gefunden.',
    errorOverlayDefaultLabel: 'Es ist ein Fehler aufgetreten.',
    columnMenuLabel: 'Men??',
    columnMenuShowColumns: 'Kolumne anzeigen',
    columnMenuFilter: 'Filter',
    columnMenuHideColumn: 'Ausblenden',
    columnMenuUnsort: 'Unsortieren',
    columnMenuSortAsc: 'Sortieren nach ASC',
    columnMenuSortDesc: 'Sortieren nach DESC',
    footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} von ${totalCount.toLocaleString()}`,

  }

  return (
    <>
      <Head>
        <link key="API_Preconnect" rel="preconnect" href="https://data.my-motion.de" />
        <link key="ApiDNS_Prefetch" rel="dns-prefetch" href="https://data.my-motion.de" />
        <link key="googleAPI_Preconnect" rel="preconnect" href="https://fonts.googleapis.com" />
        <link key="fontsGstatic_Preconnect" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link key="robotoFont_Preload" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap" rel="stylesheet" />
      </Head>
      <div className="top-pannel-container">
        <SearchBox
          searchInputValue={handleSearchInputValue}
        />
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
            pageSize={25}
            autoHeight
            density="compact"
            localeText={deutschDataGridLocaleText}
            onRowClick={handleRowClick}
            rowsPerPageOptions={[15]}
            loading={isLoadingData}
            onError={() => alert('puto')}
          />
        }
      </div>

      <SelectedRowDialog selectedRowData={selectedRowData} selectedRowDialogIsOpen={selectedRowDialogIsOpen} setSelectedRowDialogIsOpen={setSelectedRowDialogIsOpen} />

      { onError && <ErrorDialog /> }

      <TableFilters 
        resultsLimit={resultsLimit}
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