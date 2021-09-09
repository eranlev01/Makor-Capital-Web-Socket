import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './Table.css'
import { useEffect, useState } from 'react';

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  bid: {
    color: theme.palette.success.main
  },
  ask: {
    color: theme.palette.secondary.main
  }
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.names}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                B2C2
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantities</TableCell>
                    <TableCell>Ask</TableCell>
                    <TableCell>Bid</TableCell>
                    <TableCell>Ask date</TableCell>
                    <TableCell>Bid date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.entries(row.quantities).map(([key, val]) => (

                      <TableRow key={key}>
                        <TableCell>
                          {key}
                        </TableCell>
                        {
                          val.b2c2 && val.b2c2.ask && <TableCell className={classes.ask}>${val.b2c2.ask.price}</TableCell>
                        }
                        {
                          val.b2c2 && val.b2c2.bid && <TableCell className={classes.bid}>${val.b2c2.bid.price}</TableCell>
                        }
                        {
                          val.b2c2 && val.b2c2.ask && <TableCell className={classes.ask}>{val.b2c2.ask.ts.replace('T', ' ').replaceAll('-', '/').slice(0, val.b2c2.ask.ts.lastIndexOf("."))}</TableCell>
                        }
                        {
                          val.b2c2 && val.b2c2.bid && <TableCell className={classes.bid}>{val.b2c2.bid.ts.replace('T', ' ').replaceAll('-', '/').slice(0, val.b2c2.bid.ts.lastIndexOf("."))}</TableCell>
                        }
                      </TableRow>
                    ))
                  }

                </TableBody>
              </Table>
            </Box>
          </Collapse>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Galaxy
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantities</TableCell>
                    <TableCell>Ask</TableCell>
                    <TableCell>Bid</TableCell>
                    <TableCell>Ask date</TableCell>
                    <TableCell>Bid date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.entries(row.quantities).map(([key, val]) => (

                      <TableRow key={key}>
                        <TableCell>
                          {key}
                        </TableCell>
                        {
                          val.galaxy && val.galaxy.ask && <TableCell className={classes.ask}>${val.galaxy.ask.price}</TableCell>
                        }
                        {
                          val.galaxy && val.galaxy.bid && <TableCell className={classes.bid}>${val.galaxy.bid.price}</TableCell>
                        }
                        {
                          val.galaxy && val.galaxy.ask && <TableCell className={classes.ask}>{val.galaxy.ask.ts.replace('T', ' ').replaceAll('-', '/').slice(0, val.galaxy.ask.ts.lastIndexOf("."))}</TableCell>
                        }
                        {
                          val.galaxy && val.galaxy.bid && <TableCell className={classes.bid}>{val.galaxy.bid.ts.replace('T', ' ').replaceAll('-', '/').slice(0, val.galaxy.bid.ts.lastIndexOf("."))}</TableCell>
                        }
                      </TableRow>
                    ))
                  }

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable({ message, loading }) {
  const classes = useRowStyles();
  const [rows, setRows] = useState();

  useEffect(() => {
    if (!message) return;
    const prices = Object.entries(message.prices).map(p => p).map(e => {
      let element = {
        'names': e[0],
        'quantities': e[1]
      }
      return element;
    });
    setRows(prices)
  }, [message])

  return (
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell align="center">{loading ? 'Loading content...' : 'Names'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <Row key={row.names} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
