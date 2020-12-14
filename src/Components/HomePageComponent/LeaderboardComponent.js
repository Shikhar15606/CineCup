import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(movie,votes) {
  return { movie,votes };
}

const rows = [
  createData('Avengers', 159),
  createData('Avatar', 237),
  createData('Star Wars', 262),
  createData('Inception', 305),
  createData('Martian', 356),
];

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    width:"100%",
    alignSelf:"center",
    justifySelf:"center",
   
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{maxWidth:600,}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Movie</StyledTableCell>
            
            <StyledTableCell align="center">Votes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.movie}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.movie}
              </StyledTableCell>
              <StyledTableCell align="center">{row.votes}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}