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

function ManageCourse() {
    var history = useHistory();
    const [courseData, setCourseData] = useState([])
    const classes = useStyles();

    async function deleteCourse(id)
    {
        await firestore.collection("courses").doc(id).delete().then((value)=>{
            console.log("delteteted")
                 //gets all courses and sets state
       firestore.collection("courses").get().then((courses) => {
        setCourseData(courses.docs.map((course => course.data())));
    })
        });
   
    }
    useEffect(() => {
        firestore.collection("courses").get().then((courses) => {
            setCourseData(courses.docs.map((course => course.data())));
        })
    }, [])
    return (
        <div className={classes.root}>
            <AdminNav/>
            <main className={classes.content}>
            <h2>Manage Courses</h2>
            {/* <table>
            <thead>
                <th> Course Name</th>
                <th>Course Id</th>
                <th>Course Description</th>
            </thead>
            <tbody id="departmentData">
                <Link to="/createCourse"> Create Course </Link>

                {courseData.map((course) => {
                    console.log(course);
                    return( 
                    <tr>
                        <td>
                            <h4> {course.courseName}</h4>
                        </td>
                        <td>
                            <h4> {course.courseDescription}</h4>
                        </td>
                        <td>
                            <h4> {course.id}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteCourse(course.id)}>Delete Course</button>
                        </td>
                        <td>
                            <button onClick={()=> history.push("/updateCourse/"+ course.id )}> Update Course Information</button>
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
                            <StyledTableCell>Course Name</StyledTableCell>
                            <StyledTableCell align="left">Course Id</StyledTableCell>
                            <StyledTableCell align="left">Course Description</StyledTableCell>
                            <StyledTableCell align="left">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseData.map((course) => {
                            console.log(course);
                            return( 
                                <StyledTableRow>
                                    <StyledTableCell>
                                        <h4> {course.courseName}</h4>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <h4> {course.courseDescription}</h4>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <h4> {course.id}</h4>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Button className={classes.myBtns} onClick={()=>deleteCourse(course.id)}>Delete Course</Button>
                                        <Button className={classes.myBtns} onClick={()=> history.push("/updateCourse/"+ course.id )}> Update Course Information</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                        
                    </TableBody>
                </Table>
            </TableContainer>

            <p>Would you like to create a new course: <Link to="/createCourse"> Create Course </Link></p>

            </main>
        </div>
        
    )
}

export default ManageCourse;