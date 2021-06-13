import { Formik } from "formik";
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../firebase";
import * as Yup from "yup";
import { useState } from "react";


function CreateDepartment() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }

    
           let [error,setError] = useState("");
         
     
    return (

        <article>
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Grid >
                        <h2>Create Department</h2>
                    </Grid>
                    <Formik initialValues={{ departmentName: '' }} onSubmit={async (values, props) => {
                        console.log(values)
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
        
        
                                })
                            }
                        });
                

                    }} validateOnChange={true}
                        validateOnBlur={true}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="departmentName">Department Name</label>
                                <input type="text"
                                    name="departmentName"
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.name}
                                    required>
                                </input>
                                <h1>{error}</h1>
                                <button type="submit">Submit</button>
                                <button type="reset">reeset</button>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </article>
    )
}

export default CreateDepartment;