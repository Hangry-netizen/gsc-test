import React, { useState, useEffect } from 'react';
import ContactedRow from './ContactedRow';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1e365c',
    color: theme.palette.common.white,
    fontFamily: 'Josefin Sans',
    maxWidth: '300px',
    '&:nth-of-type(1)': {
      position: 'sticky',
      left: 0,
      maxWidth: '100px',
      zIndex: 3,
    },
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
    fontFamily: 'Josefin Sans',
    fontWeight: 200,
    padding: '5px 10px',
  },
}))(TableCell)

export default function ContactedTable({ currentGsc, saidHellos, receivedHellos }) {
  const [contactedHellos, setContactedHellos] = useState([]);
  const [check_duplicate, setCheckDuplicate] = useState([]);

  const setContacted = (gsc) => {
    if (check_duplicate.includes(gsc.id)) {
      return null
    }
    else {
      setCheckDuplicate(existing => [...existing, gsc.id])
      setContactedHellos(existing => [...existing, gsc])
    }
  }

  useEffect(() => {
    saidHellos.map((gsc) => {
      if (gsc.hello_contacted === true) {
        setContacted(gsc)
        return null
      }
      return null
    })

    receivedHellos.map((gsc) => {
      if (gsc.hello_contacted === true) {
        setContacted(gsc)
        return null
      }
      return null
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedHellos, saidHellos])

  return (
    <div>
      <TableContainer componenet={Paper} style={{maxHeight:"70vh", overflowX:"auto"}}>
        <Table stickyHeader id="gsc-database-table">
          <TableHead>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Age range</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Willingness to relocate</StyledTableCell>
            <StyledTableCell>Height</StyledTableCell>
            <StyledTableCell>Languages</StyledTableCell>
            <StyledTableCell>Nationality/ Ethnicity</StyledTableCell>
            <StyledTableCell style={{paddingRight: '150px'}}>Descriptors</StyledTableCell>
            <StyledTableCell>Personality/ Temperament</StyledTableCell>
            <StyledTableCell>Church background</StyledTableCell>
            <StyledTableCell style={{paddingRight: '100px'}}>Spiritual maturity</StyledTableCell>
            <StyledTableCell style={{paddingRight: '150px'}}>Spiritual characteristics</StyledTableCell>
            <StyledTableCell style={{whiteSpace:'nowrap'}}>Why do you think your GSCF would make <br /> a good partner?</StyledTableCell>
            <StyledTableCell style={{whiteSpace:'nowrap'}}>What kind of person would make a good <br /> match for your GSCF?</StyledTableCell>
            <StyledTableCell style={{whiteSpace:'nowrap', paddingRight: '300px'}}>Words from the GSC</StyledTableCell>
          </TableHead>
          <TableBody>
          {
            contactedHellos.map((gsc, i) => {
              return (
                <ContactedRow
                  key={i}
                  gsc={gsc}
                  StyledTableCell={StyledTableCell}
                  currentGsc={currentGsc}
                />
              )
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
