import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableFilters from '../components/table_filters'


export default function ErrorLogTable() {

  const [ data , setData ] = useState('')
  const [ resultsLimit , setResultsLimit ] = useState(20)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)
  const [ quelleFilter , setQuelleFilter ] = useState(-1)

  useEffect(() => {
    const url = `https://data.my-motion.de/log/v1/search/-1/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/-1/${quelleFilter}/-1/-1/${resultsLimit}/-1`
    axios.post(url)
      .then((res) => { 
        setData(res.data)
        console.log(res.data)
        
      })
      .catch((err) => { 
        console.log(err) 
      })
  }, [resultsLimit , userIdFilter , quelleFilter])

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
        <TableFilters resultsLimitFilterValue={handleResultsLimitFilterValue} userIdFilterValue={handleUserIdFilterValue} quelleFilterValue={handleQuelleFilterValue} />
        <TableContainer className="table-container" component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="datum-table-head">Datum</TableCell>
                <TableCell className="level-table-head">Level</TableCell>
                <TableCell className="quelle-table-head">Quelle</TableCell>
                <TableCell className="status-table-head">Status</TableCell>
                <TableCell className="firma-table-head">Firma</TableCell>
                <TableCell className="user-table-head">User</TableCell>
                <TableCell className="fahreuz-table-head">Fahrzeug ID</TableCell>
                <TableCell className="data-table-head">Data ID</TableCell>
                <TableCell className="protokoll-table-head">Protokoll ID</TableCell>
                <TableCell className="portal-table-head">Portal</TableCell>
                <TableCell className="message-table-head">Kurzbeschreibung</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data && data.map(
                (data,index) => {
                  return(
                    <TableRow className="table-row" key={index}>
                      <TableCell className='datum-row' component="th" scope="row">
                        {new Date(data.date).toUTCString()}
                      </TableCell>
                      <TableCell className='level-row'>{data.level}</TableCell>
                      <TableCell className='quelle-row'>
                        {data.quelle}
                        {data.quelle == 9 && ' - HOMEPAGE-TOOL'}
                        {data.quelle == 10 && ' - SHOW-ROOOOM'}
                      </TableCell>
                      <TableCell className='status-row'>{data.status}</TableCell>
                      <TableCell className='firma-row'>{data.id_firma}</TableCell>
                      <TableCell className='user-id-row'>{data.id_user}</TableCell>
                      <TableCell className='fahrzeug-id-row'>{data.id_car}</TableCell>
                      <TableCell className='data-id-row'>{data.id_data}</TableCell>
                      <TableCell className='protokoll-id-row'>{data.id_proto}</TableCell>
                      <TableCell className='portal-row'>{data.id_portal}</TableCell>
                      <TableCell className='message-row'>{data.msg}</TableCell>
                    </TableRow>
                  )
                })
              }    
            </TableBody>
          </Table>
        </TableContainer>
        {
          data && data.length === 0 ? 
          <div className="table-row no-results-found">
            <p>No matches found</p>
          </div>
          :
          ""
        }
        {
          !data && 
          <div className="table-row no-results-found">
            <p>Searching...</p>
          </div>
        }
      </> 
    )
}