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
 
function ViewDepartments() {
    var history = useHistory();
    const [departmentData, setDepartmentData] = useState([])
    const classes = useStyles();

    function deleteDepartment(id)
    {
        firestore.collection("department").doc(id).delete().then((value)=>{
            console.log("delteteted")
        });
        //gets all department and sets state
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
    }
    useEffect(() => {
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
    }, [])
    return (
        <div className={classes.root}>
        <AdminNav/>
            <main className={classes.content}>
            <h2>Manage Departments</h2>
            {/* <table>
            <thead>
                <th> Department Name</th>
                <th>Department Id</th>
            </thead>
            <tbody id="departmentData">
                <Link to="/createDepartment"> Create Department </Link>

                {departmentData.map((department) => {
                    console.log(department);
                    return( 
                    <tr>
                        <td>
                            <h4> {department.departmentName}</h4>
                        </td>

                        <td>
                            <h4> {department.id}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteDepartment(department.id)}>Delete Department</button>
                        </td>
                        <td>
                            <button onClick={()=> history.push("/updateDepartment/"+ department.id )}> Update Department Information</button>
                        </td>
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
                            <StyledTableCell>Department Name</StyledTableCell>
                            <StyledTableCell align="left">Department Id</StyledTableCell>                        
                            <StyledTableCell align="left">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {departmentData.map((department) => {
                        console.log(department);
                        return( 
                        <StyledTableRow>
                            <StyledTableCell>
                                <h4> {department.departmentName}</h4>
                            </StyledTableCell>

                            <StyledTableCell>
                                <h4> {department.id}</h4>
                            </StyledTableCell>

                            <StyledTableCell>
                                <Button className={classes.myBtns} onClick={()=>deleteDepartment(department.id)}>Delete Department</Button>
                                <Button className={classes.myBtns} onClick={()=> history.push("/updateDepartment/"+ department.id )}> Update Department Information</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                        )
                    })}
                        
                    </TableBody>
                </Table>
            </TableContainer>

            
            <p>Would you like to create a new department: <Link to="/createDepartment"> Create Department </Link></p>

            </main>
        </div>

        
    )
}

export default ViewDepartments;