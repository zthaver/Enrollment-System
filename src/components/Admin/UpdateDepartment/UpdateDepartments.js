import { Formik } from "formik";
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateDepartments()
{
    let { id } = useParams();
    console.log("id me mate" + id);

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }

    
    let [error,setError] = useState("");
console.log(id)
    return(
        <article>
        <Grid>
            <Paper elavation="20" style={paperStyle}>
                <Grid >
                    <h2>Update Department</h2>
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
                            firestore.collection("department").doc(id).update({
                                departmentName: values.departmentName
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

export default UpdateDepartments;