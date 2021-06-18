import { Formik } from "formik";
import { Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../firebase";
import AdminNav from "../AdminNavbar/AdminNav";


import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Select } from '@material-ui/core';


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
                    <Grid >
                        <h2>Create Department</h2>
                    </Grid>
                    <Formik initialValues={{ departmentName: '', programName: '' }} onSubmit={async (values, props) => {
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

                                }).then((val) => {
                                    if (programId != "") {
                                        firestore.collection("programs").doc(programId).collection("departments").add({
                                            "programId": programId,
                                            "programName": values.programName

                                        }).then(() => {
                                            alert("department successfully created")
                                        })
                                            }


                                });
                            }
                        })
                        }}
                        validateOnChange={true}>
                        {formikProps => (
                            <form onSubmit={formikProps.handleSubmit}>
                                <label htmlFor="departmentName">Department Name</label>
                                <TextField type="text"
                                    name="departmentName"

                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.name}
                                    required/>
                                    <br></br><br></br>
                                    <select onChange={(value) => {
                                        formikProps.values.programName = value.target.value;
                                        let selectedIndex = value.target.options.selectedIndex;
                                        setProgramId(value.target.options[selectedIndex].getAttribute('program-id'));

                                    }}>
                                        {programData.map((program) =>
                                            <option key={program.id} program-id={program.id}> {program.programName} </option>)};
                                    <br></br><br></br>
                                    </select>
                                    <br></br><br></br>
                                    <h1>{error}</h1>
                                    <button type="submit">Submit</button>

                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </article>
    )
}

export default CreateDepartment;