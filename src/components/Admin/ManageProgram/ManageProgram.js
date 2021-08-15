import { useState, useEffect } from "react";
import { firestore } from '../../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNavbar/AdminNav';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

//Table
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
    myBtns:{
        color:'#D92A1D',
        '&:hover':{
            color:'#fff',
            background:'#D92A1D',
        }
      }
  }))



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#D92A1D",
      color: theme.palette.common.white,
      textTransform:'uppercase',
      fontWeight:'bold',
      letterSpacing:1, 
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
 
function ManageProgram() {
    var history = useHistory();
    const [programData, setProgramData] = useState([])
    const classes = useStyles();

    async function deleteProgram(id)
    {
        await firestore.collection("programs").doc(id).delete().then((value)=>{
    //gets all programs and sets state
       firestore.collection("programs").get().then((courses) => {
        setProgramData(courses.docs.map((course => course.data())));
    })
        });
   
    }
    useEffect(() => {
        firestore.collection("programs").get().then((programs) => {
            setProgramData(programs.docs.map((program => program.data())));
        })
    }, [])
    console.log(programData);
    return (
        <div className={classes.root}>
            <AdminNav/>
            <main className={classes.content}>
            <h2>Manage Programs</h2>
            {/* <table>
            <thead>
                <th> Program Name</th>
                <th>Program Id</th>
                <th>Program Department</th>
                <th>Program Description</th>
            </thead>
            <tbody id="programData">
                <Link to="/createProgram"> Create Program </Link>

                {programData.map((program) => {
                    console.log(program);
                    return( 
                    <tr>
                        <td>
                            <h4> {program.programName}</h4>
                        </td>
                        <td>
                            <h4> {program.id}</h4>
                        </td>
                        <td>
                            <h4> {program.departmentName}</h4>
                        </td>
                        <td>
                            <h4> {program.programDescription}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteProgram(program.id)}>Delete Program</button>
                        </td>
                        { <td>
                            <button onClick={()=> history.push("/updateProgram/"+ program.id )}> Update Program Information</button>
                        </td> }
                    </tr>
                    )
                }
                )}
            </tbody>
        </table> */}

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Program Name</StyledTableCell>
                        <StyledTableCell align="left">Program Id</StyledTableCell>                        
                        <StyledTableCell align="left">Program Department</StyledTableCell>
                        <StyledTableCell align="left">Program Description</StyledTableCell>
                        <StyledTableCell align="left">Edit</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                {programData.map((program) => {
                    console.log(program);
                    return( 
                    <StyledTableRow>
                        <StyledTableCell>
                            <h4> {program.programName}</h4>
                        </StyledTableCell>

                        <StyledTableCell>
                            <h4> {program.id}</h4>
                        </StyledTableCell>

                        <StyledTableCell>
                            <h4> {program.departmentName}</h4>
                        </StyledTableCell>
                        <StyledTableCell>
                            <h4> {program.programDescription}</h4>
                        </StyledTableCell>

                        <StyledTableCell>
                            <Button onClick={()=>deleteProgram(program.id)} className={classes.myBtns}>Delete Program</Button>
                            <br/>
                            <br/>
                            <Button onClick={()=> history.push("/updateProgram/"+ program.id )} className={classes.myBtns}> Update Program</Button>
                        </StyledTableCell> 
                    </StyledTableRow>
                    )
                }
                )}
                        
                    </TableBody>
                </Table>
            </TableContainer>

            </main>
        </div>
        
    )
}

export default ManageProgram;