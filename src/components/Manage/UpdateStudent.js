import { Formik } from "formik";
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateStudent()
{
    let { id } = useParams();
    console.log("id: " + id);

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }

    
    let [error,setError] = useState("");
    console.log(id)
    return(
        <article>
        <Grid>
            <Paper elavation="20" style={paperStyle}>
                <Grid >
                    <h2>Update Student</h2>
                </Grid>
                <Formik initialValues={{ firstname: '' }} onSubmit={async (values, props) => {
                    console.log(values)
                    firestore.collection("student")
                    .where("first", "==", values.firstname)
                    .get()
                    .then((queryResult) => {
                        if (!queryResult.empty) {
                            setError("The First name is the same")
                        }
                        else {
                            console.log("works :)")
                            setError("")
                            firestore.collection("student").doc(id).update({
                                firstname: values.firstname
                            })
                        }
                    });
            

                }} validateOnChange={true}
                    validateOnBlur={true}>
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <label htmlFor="firstname">First Name</label>
                            <input type="text"
                                name="firstname"
                                placeholder={props.firstname}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.name}
                                required>
                            </input>
                            <h1>{error}</h1>
                            <button type="submit">Submit</button>
                            <button type="reset">Reset</button>
                            <button> Test </button>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    </article>
)
}

export default UpdateStudent;