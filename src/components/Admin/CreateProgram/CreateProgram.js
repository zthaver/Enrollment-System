import { Formik } from "formik";
import { Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../../firebase";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';

const CourseSchema = Yup.object().shape({
    programDescription: Yup.string()
        .min(20, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    programCode: Yup.string()
        .min(6, 'Too Short!')
        .required('Required')
        // to check if the course code is unique
        .test('checkCourseCodeUnique', 'This course is already registered', async value => {
            let isProgramCodeUnique = false;
            if (!value) {
                value = " "
            }
            console.log(value)
            await firestore.collection("programs").where("programCode", "==", value).get().then((val) => {
                isProgramCodeUnique = val.empty;
            })
            return isProgramCodeUnique;
        }),

});
function CreateProgram() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }


    let [departmentDaata, setDepartmentData] = useState([]);

    useEffect(() => {
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
    }, [])

    return (

        <article>
            <AdminNav/>
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Grid >
                        <h2>Create Program</h2>
                    </Grid>
                    <Formik validationSchema={CourseSchema} initialValues={{ programName: '', programCode: '', programDescription: '', departmentName: '' }} onSubmit={async (values, props) => {
                        console.log(values)
                        props.setSubmitting(true);
                        await firestore.collection("programs").add({
                            "programName": values.programName,
                            "programDescription": values.programDescription,
                            "programCode": values.programCode,
                            "departmentName": values.departmentName,



                        }).then(async (val) => {
                            await val.update({ "id": val.id });


                            alert("Program Successfully Created")
                        }).catch((err) => {
                            console.log(err);
                        })


                    }} validateOnChange={true}
                        validateOnBlur={true}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="programName">Program Name</label>
                                <TextField type="text"
                                    name="programName"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.programName}
                                />
                                <label htmlFor="programCode">Program Code</label>
                                <TextField type="text"
                                    name="programCode"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.programCode}
                                    helperText={props.errors.programCode}
                                    error={props.errors.programCode}
                                />
                                <label> Department Name</label>
                                <br></br>
                                <br></br>
                                <select onChange={(value) => { props.values.departmentName = value.target.value; }}>
                                    {departmentDaata.map((department) =>
                                        <option key={department.id}> {department.departmentName} </option>)};
                             </select>
                                <br></br><br></br>
                                <label> Program Description</label>
                                <TextField type="text"
                                    multiline={true}
                                    name="programDescription"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.programDescription}
                                    helperText={props.errors.programDescription}
                                    error={!!props.errors.programDescription}
                                />
                                <button type="submit">Submit</button>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </article>
    )
}

export default CreateProgram;