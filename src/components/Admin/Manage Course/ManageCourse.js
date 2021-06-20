import { useState, useEffect } from "react";
import { firestore } from '../../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
  }))

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
            <table>
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
        </table>
            </main>
        </div>
        
    )
}

export default ManageCourse;