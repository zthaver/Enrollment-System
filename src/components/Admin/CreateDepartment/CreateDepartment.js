import { Formik } from "formik";
import { Button, Container, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../../firebase";
import AdminNav from "../AdminNavbar/AdminNav";
import * as Yup from "yup";
import { useState, useEffect } from "react";

const DepartmentSchema = Yup.object().shape({
    departmentName: Yup.string()
    .required("Select a department name please")
    .max(50,"Cannot be more than 50 charecters")

});

function CreateDepartment() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }

    let [error, setError] = useState("");
    let [programId, setProgramId] = useState("");
    let [programData, setProgramData] = useState([]);

    //get data for programs
    useEffect(() => {
        firestore.collection("programs").get().then((programs) => {
            setProgramData(programs.docs.map((program => program.data())));
        })
    }, [])
    return (

        <article>
            <AdminNav />
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Container>
                        <h2>Create Department</h2>

                            <Formik validationSchema={DepartmentSchema} initialValues={{ departmentName: ''}} onSubmit={async (values, props) => {
                            console.log(values)
                            props.setSubmitting(true);
                            firestore.collection("department").where("departmentName", "==", values.departmentName).get().then((queryResult) => {

                                if (!queryResult.empty) {
                                    setError("The department name already exists")
                                }
                                else {
                                    console.log("thing bork")
                                    setError("")
                                    firestore.collection("department").add({
                                        "departmentName": values.departmentName,
                                        "id": ""
                                    }).then((value) => {

                                        value.update({ "id": value.id })
                                        alert("department successfully created")

                                    })


                                }})
                        }}



                        validateOnChange={true}

                        validateOnBlur={true}>
                        {formikProps => (
                            <form onSubmit={formikProps.handleSubmit}>
                                <TextField type="text"
                                margin="dense"
                                label="Department Name"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                    name="departmentName"
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.name}
                                    error={!!formikProps.errors.departmentName}
                                    helperText={formikProps.errors.departmentName}
                                />
                                <br></br><br></br>
                                <br></br>
                                {/* <select onChange={(value) => {
                                    formikProps.values.programName = value.target.value;
                                    let selectedIndex = value.target.options.selectedIndex;
                                    setProgramId(value.target.options[selectedIndex].getAttribute('program-id'));

                                }}>
                                    {programData.map((program) =>
                                        <option key={program.id} program-id={program.id}> {program.programName} </option>)};
                                    <br></br><br></br>
                                </select> */}

                                <h1>{formikProps.errors.programName}</h1>
                                <br></br><br></br>
                                <Button color="primary" variant="outlined" type="submit">Submit</Button>

                            </form>
                        )}
                        </Formik>
                    </Container>

                    
                </Paper>
            </Grid>
        </article >
    )
}

export default CreateDepartment;