import { useState, useEffect } from "react";
import { firestore } from '../../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField } from '@material-ui/core';
import StudentNav from '../StudentNavbar/StudentNav';
import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        marginLeft: '240px',
    },
}))

function SearchCourses() {
    const CourseSchema = Yup.object().shape({
        courseName: Yup.string()
            .required('Please enter a course name')
    })

    var history = useHistory();
    const [courseData, setCourseData] = useState([])
    const [error, setError] = useState("")
    const classes = useStyles();

    useEffect(() => {
        firestore.collection("courses").get().then((courses) => {
            setCourseData(courses.docs.map((course => course.data())));
        })
    }, [])
    return (
        <div className={classes.root}>
            <StudentNav />
            <main className={classes.content}>
                <h2>Manage Courses</h2>
                <Formik validateOnChange={false} validateOnBlur={false} validationSchema={CourseSchema} initialValues={{courseName:''}}        onSubmit={async (values, props) => {
                    await firestore.collection("courses").where("courseName","==",values.courseName).get().then((val)=>{
                        console.log(val.docs.length);
                        if(val.docs.length == 0)
                        {
                            setCourseData([]);
                            setError("No course with that name exists");
                        }
                        else
                        {
                            setCourseData(val.docs.map((course => course.data())));
                        }
                    })
                }}
                >
                    {props=>(
                        <form onSubmit={props.handleSubmit}>
                          <TextField type="text"
                                    name="courseName"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    placeholder="Enter Course Name"
                                    helperText={props.errors.courseName}
                                    error={!!props.errors.courseName} />
                                    <button type="submit">Submit</button>
                        </form>
                    )}

                </Formik>
                <h1> {error}</h1>
                <table>
                    <thead>
                        <th> Course Name</th>
                        <th>Course Description</th>
                        <th>Course Id</th>
                    </thead>
                    <tbody id="courseData">

                        {courseData.map((course) => {
                            console.log(course);
                            return (
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

export default SearchCourses;