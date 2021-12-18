import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableFilters from '../components/table_filters'


export default function ErrorLogTable() {

  const [ errorLogData, setErrorLogData ] = useState()
  const [ resultsLimit , setResultsLimit ] = useState(20)
  const [ userIdFilter , setUserIdFilter ] = useState(-1)

  useEffect(() => {
    const url = `https://data.my-motion.de/log/v1/search/-1/${userIdFilter ? userIdFilter : '-1'}/-1/-1/-1/-1/-1/-1/-1/${resultsLimit}/-1`
    axios.post(url)
      .then((res) => { 
        setErrorLogData(res.data)
        
      })
      .catch((err) => { 
        console.log(err) 
      })
  }, [resultsLimit , userIdFilter])

  const handleResultsLimitValue = (e) => {
      const userValue = e.target.value
      setResultsLimit(userValue)
  }

  const handleUserIdValue = (e) => {
    const userValue = e.target.value
    setUserIdFilter(userValue)
}

    return (
      <>
        <TableFilters resultsLimitValue={handleResultsLimitValue} userIdValue={handleUserIdValue} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="datum-cell">Datum</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Quelle</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Firma</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Fahrzeug ID</TableCell>
                <TableCell>Data ID</TableCell>
                <TableCell>Protokoll ID</TableCell>
                <TableCell>Portal</TableCell>
                <TableCell className="message-cell">Kurzbeschreibung</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { errorLogData && errorLogData.map(
                (data,index) => {
                  return(
                    <TableRow className="table-row" key={index}>
                      <TableCell className='datum-row' component="th" scope="row">
                        {new Date(data.date).toUTCString()}
                      </TableCell>
                      <TableCell className='level-row'>{data.level}</TableCell>
                      <TableCell className='quelle-row'>{data.quelle}</TableCell>
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
      </> 
    )
}