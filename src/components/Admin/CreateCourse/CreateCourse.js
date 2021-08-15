import { Formik  } from "formik";
import { Container, Paper, TextField, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../../firebase";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import AdminNav from '../AdminNavbar/AdminNav';



const CourseSchema = Yup.object().shape({
    programName: Yup.string()
    .required("Select a program name please"),
    courseName: Yup.string()
    .min(5,"Must be at least 5 Charecters")
    .max(50,'Must be less than 50 Charecters')
    .required('Required'),
    courseDescription: Yup.string()
        .min(20, 'Must be at least 20 Charecters')
        .max(50, 'Must be less than  50 Charecters')
        .required('Required'),
        courseDescription: Yup.string()
            .min(20, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
            courseCode:Yup.string()
            .min(6, 'Too Short!')
            .max(6,'Course code cannot be more than 6 charecters')
            .required('Required')
            // to check if the course code is unique
            .test('checkCourseCodeUnique', 'This course is already registered',async value =>{
                let isCourseCodeUnique = false;
                if(!value)
                {
                    value = " "
                }
                console.log(value)
                await firestore.collection("courses").where("courseCode", "==", value).get().then((val)=>{
                    isCourseCodeUnique = val.empty;
                })
                return isCourseCodeUnique;
            }),
    
});
function CreateCourse() {
    const paperStyle = { padding: 20, height: 'auto', width: 280, margin: "20px auto" }


    let [error, setError] = useState("");
    let [programId,setProgramId] = useState("");
    let [professorData, setProfessorData] = useState([]);
    let [programData, setProgramData] = useState([]);

    useEffect(() => {
        //set the initial data for the select buttons to gather from
        firestore.collection("professors").get().then((professors) => {
            setProfessorData(professors.docs.map((professor => professor.data())));
        })
        firestore.collection("programs").get().then((programs) => {
            setProgramData(programs.docs.map((program => program.data())));
        })
    }, [])

    return (

        <article>
            <AdminNav/>
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Container>
                    <h2>Create Course</h2>
                    
                        <Formik validationSchema={CourseSchema} initialValues={{ courseName: '', courseCode: '', courseDescription: '',professorName: '', programName: '',semester:0,capacity:0}} onSubmit={async (values, props) => {
                            console.log(values)
                            props.setSubmitting(true);
                            await firestore.collection("courses").add({
                                "courseName":values.courseName,
                                "courseDescription":values.courseDescription,
                                "courseCode":values.courseCode,
                                "professorName":values.professorName,
                                "programName":values.programName,
                                "semester":values.semester,
                                "capacity":values.capacity,
                                "programId":programId



                            }).then(async(val)=>{
                            await val.update({ "id": val.id });
                            if(programId!="")
                            {
                            await firestore.collection("programs").doc(programId).collection("courses").add({
                                "courseName":values.courseName,
                                "courseDescription":values.courseDescription,
                                "courseCode":values.courseCode,
                                "professorName":values.professorName,
                                "courseId":val.id
                            })
                            }


                                alert("Course Successfully Created")
                            }).catch((err)=>{
                                console.log(err);
                            })


                        }} validateOnChange={true}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    {/* <label htmlFor="courseName">Course Name</label> */}
                                    <TextField type="text"
                                        margin="dense"
                                        label="Course Name"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        name="courseName"
                                        onChange={props.handleChange}
                                        value={props.values.courseName}
                                        helperText={props.errors.courseName}
                                        error={props.errors.courseName}
                                    />

                                    <br/>
                                    <br/>
                                    {/* <label htmlFor="courseCode">Course Code</label> */}
                                    <TextField type="text"
                                        margin="dense"
                                        label="Course Code"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        name="courseCode"
                                        onChange={props.handleChange}
                                        value={props.values.courseCode}
                                        helperText={props.errors.courseCode}
                                        error={props.errors.courseCode}
                                    />
                                    <br/>
                                    <br/>

                                    <label> Professor Name</label>
                                    <br></br>
                                    <select  onChange={(value)=>{props.values.professorName = value.target.value; console.log(props.values.professorName)}}>
                                        {professorData.map((professor) =>
                                        <option key={professor.email}> {professor.firstname} {professor.lastname}</option>)};
                                    </select>
                                    <br/>
                                    <br/>

                                    <label> Program Name</label>
                                    <br/>
                                    <select  error={props.errors.programName}  onChange={(value) => { props.values.programName = value.target.value; 
                                    console.log(props.values.programName)
                                        let selectedIndex = value.target.options.selectedIndex;
                                        setProgramId(value.target.options[selectedIndex].getAttribute('program-id'));
                                    }}>
                                        {programData.map((program) =>
                                            <option key={program.id} program-id={program.id}> {program.programName} </option>)};
                                    </select>

                                    <br/>
                                    <br/>

                                    {/* <label> Course Description</label> */}
                                    <TextField type="text"
                                        margin="dense"
                                        label="Course Description"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        multiline={true}
                                        name="courseDescription"
                                        onChange={props.handleChange}
                                        value={props.values.courseDescription}
                                        helperText={props.errors.courseDescription}
                                        error={!!props.errors.courseDescription}
                                    />
                                    <br></br><br></br>      
                                        
                                    {/* <label> Capacity</label> */} 
                                        <TextField type="number"
                                        margin="dense"
                                        label="Course Capacity"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        multiline={true}
                                        name="capacity"
                                        onChange={props.handleChange}
                                        value={props.values.capacity}
                                    />
                                    <br/>
                                    <br/>
                                    {/* <label> Semester </label> */}
                                        <TextField type="number"
                                        margin="dense"
                                        label="Semester"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        multiline={true}
                                        name="semester"
                                        onChange={props.handleChange}
                                        value={props.values.semester}
                                    />
                                    <br></br><br></br>  
                                    <Button color="primary" variant="outlined" type="submit">Submit</Button>
                                    <h3> {props.errors.programName}</h3>
                                </form>
                            )}
                        </Formik>
                    </Container>
                    
                    
                </Paper>
            </Grid>
        </article>
    )
}

export default CreateCourse;