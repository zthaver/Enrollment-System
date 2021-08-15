import { Formik } from "formik";
import { Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { firestore } from "../../../firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import AdminNav from "../AdminNavbar/AdminNav";



function UpdateProgram() {
    let { id } = useParams();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }


    let [error, setError] = useState("");
    let [programName, setProgramName] = useState("");
    let [programCode, setProgramCode] = useState("");
    let [departmentDaata, setDepartmentData] = useState([]);
    let [programDescription, setProgramDescription] = useState("");
    let [departmentName, setDepartmentName] = useState("");
    let empty = true;
    console.log(id)

    const ProgramSchema = Yup.object().shape({
        programDescription: Yup.string()
            .required('Required')
            .min(20, 'Too Short!')
            .max(50, 'Too Long!'),
        programCode: Yup.string()
            .required('Required')
            .min(6, 'Too Short!')
            //to check if the course code is unique
            .test('checkProgramCodeUnique', 'This program is already registered', async value => {
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
    useEffect(() => {
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
        firestore.collection("programs").doc(id).get().then((program) => {
            var programData = program.data();
            setProgramName(programData.programName)
            setProgramCode(programData.programCode)
            setProgramDescription(programData.programDescription)
            setDepartmentName(programData.departmentName)
            console.log("tamerere" + programCode);

        })
    }, [])

    return (
        <article>
            <AdminNav />
            <Grid>
                <Paper elavation="20" style={paperStyle}>
                    <Grid >
                        <h2>Update Program</h2>
                    </Grid>
                    {programDescription!=""&&<Formik validationSchema={ProgramSchema} initialValues={{ programName: programName, programCode: programCode, programDescription: programDescription,departmentName:departmentName}} onSubmit={async (values, props) => {
                        console.log(values)
                        firestore.collection("programs").doc(id).update({
                            "programName": values.programName,
                            "programCode": values.programCode,
                            "programDescription":values.programDescription,
                            "departmentName":values.departmentName

                        }).then((val) => {
                            alert("success in updating program")
                        }).catch((err) => {
                            console.log("err is" + err);
                        })

                    }} 
                        validateOnChange={false} validateOnBlur={false}>
                        {props => (
                            <form noValidate onSubmit={props.handleSubmit}>
                                <label htmlFor="programName">Program Name</label>
                                <input type="text"
                                    name="programName"
                                    onChange={props.handleChange}
                                    defaultValue={programName}
                                    requir>
                                </input>
                                <br></br>
                                <label htmlFor="programCode">Program Code</label>
                                <TextField type="text"
                                    multiline={true}
                                    name="programCode"
                                    onChange={props.handleChange}
                                    defaultValue={programCode}
                                    helperText={props.errors.programCode}
                                    error={!!props.errors.programCode} />
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
                                    onChange={props.handleChange}
                                    defaultValue={programDescription}
                                    helperText={props.errors.programDescription}
                                    error={!!props.errors.programDescription}
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

export default UpdateProgram;