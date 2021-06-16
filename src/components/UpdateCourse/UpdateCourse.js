import { Formik } from "formik";
import { Paper,TextField  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";



function UpdateCourse() {
    let { id } = useParams();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }


    let [error, setError] = useState("");
    let [courseName, setCourseName] = useState("");
    let empty = true;
    console.log(id)

    const CourseSchema = Yup.object().shape({
        courseDescription: Yup.string()
            .min(20, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
            courseCode:Yup.string()
            .min(6, 'Too Short!')
            .required('Required')
            // to check if the course code is unique
            .test('checkCourseCodeUnique', 'This course is already registered', value =>{
                let isCourseCodeUnique = false;
                if(!value)
                {
                    value = " "
                }
                console.log(value)
                firestore.collection("courses").where("courseCode", "==", value).get().then((val)=>{
                    isCourseCodeUnique = val.empty;
                })
                return !isCourseCodeUnique;
            }),
    });
    useEffect(() => {
        firestore.collection("courses").doc(id).get().then((courses) => {
          var temp =  courses.data();
          console.log("temp is" + temp.courseName)
          setCourseName(temp.courseName)
        })
    }, [])
    return (
        <article>
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Grid >
                        <h2>Update Course</h2>
                    </Grid>
                    <Formik validationSchema={CourseSchema} initialValues={{ courseName: '', courseCode: '' }} onSubmit={async (values, props) => {
                        console.log(values)
                        firestore.collection("courses").doc(id).update({
                            courseName:values.courseName,
                            courseCode:values.courseCode
                        }).then((val)=>{
                            alert("success in creatring")
                        }).catch((err)=>{
                            console.log("err is" + err);
                        })

                    }} validateOnChange={true}
                        validateOnBlur={true}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="courseName">Course Name</label>
                                <input type="text"
                                    name="courseName"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    // value={props.values.courseName}
                                    defaultValue={courseName}
                                    required>
                                </input>
                                <br></br>
                                <label htmlFor="courseCode">Course Code</label>
                                <TextField type="text"
                                    name="courseCode"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.courseCode}
                                    required
                                    helperText={props.errors.courseCode}
                                    error={!!props.errors.courseCode}/>
                                <label> Course Description</label>
                                <TextField type="text"
                                    multiline={true}
                                    name="courseDescription"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.courseDescription}
                                    helperText={props.errors.courseDescription}
                                    error={!!props.errors.courseDescription}
                                />
                                <br></br><br></br>
                                <button type="submit">Submit</button>
                                <button type="reset">Reset</button>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </article>
    )
}

export default UpdateCourse;