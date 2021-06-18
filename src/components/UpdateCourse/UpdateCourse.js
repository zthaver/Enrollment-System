import { Formik } from "formik";
import { Paper, TextField } from '@material-ui/core';
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
    let [defaultCourseCode, setCourseCode] = useState("");
    let [courseDescription, setCourseDescription] = useState("");
    let empty = true;
    console.log(id)

    const CourseSchema = Yup.object().shape({
        courseDescription: Yup.string()
            .min(20, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        courseCode: Yup.string()
            .min(6, 'Too Short!')
            .required('Required')
            // to check if the course code is unique
            .test('checkCourseCodeUnique', 'This course is already registered', async value => {
                let isCourseCodeUnique = false;
                if (!value) {
                    value = " "
                }
                console.log(value)
                await firestore.collection("courses").where("courseCode", "==", value).get().then((val) => {
                    isCourseCodeUnique = val.empty;
                })
                return isCourseCodeUnique;
            }),
    });
    useEffect(() => {
        firestore.collection("courses").doc(id).get().then((courses) => {
            var courseData = courses.data();
            setCourseName(courseData.courseName)
            setCourseCode(courseData.courseCode)
            setCourseDescription(courseData.courseDescription)
            console.log("tamerere" + defaultCourseCode);

        })
    }, [])

    console.log("tamerere 2" + defaultCourseCode);
    return (
        <article>
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Grid >
                        <h2>Update Course</h2>
                    </Grid>
                    {courseDescription != "" &&<Formik validateOnChange={false} validateOnBlur={false} validationSchema={CourseSchema} initialValues={{ courseName: courseName, courseCode: defaultCourseCode, courseDescription: courseDescription }} onSubmit={async (values, props) => {
                        console.log(values)
                        firestore.collection("courses").doc(id).update({
                            courseName: values.courseName,
                            courseCode: values.courseCode,
                            courseDescription:values.courseDescription
                        }).then((val) => {
                            alert("success in creatring")
                        }).catch((err) => {
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
                                    defaultValue={courseName}
                                    required>
                                </input>
                                <br></br>
                                <label htmlFor="courseCode">Course Code</label>
                                <TextField type="text"
                                    multiline={true}
                                    name="courseCode"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    defaultValue={defaultCourseCode}
                                    helperText={props.errors.courseCode}
                                    error={!!props.errors.courseCode} />
                                <label> Course Description</label>
                                <TextField type="text"
                                    multiline={true}
                                    name="courseDescription"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    defaultValue={courseDescription}
                                    helperText={props.errors.courseDescription}
                                    error={!!props.errors.courseDescription}
                                />
                                <br></br><br></br>
                                <button type="submit">Submit</button>
                                <button type="reset">Reset</button>
                            </form>
                        )}
                    </Formik>}
                </Paper>
            </Grid>
        </article>
    )
}

export default UpdateCourse;