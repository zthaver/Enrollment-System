import { useState, useEffect } from "react";
import { firestore } from '../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
  }))
 
function ManageProgram() {
    var history = useHistory();
    const [programData, setProgramData] = useState([])
    const classes = useStyles();

    async function deleteProgram(id)
    {
        await firestore.collection("programs").doc(id).delete().then((value)=>{
    //gets all programs and sets state
       firestore.collection("programs").get().then((courses) => {
        setProgramData(courses.docs.map((course => course.data())));
    })
        });
   
    }
    useEffect(() => {
        firestore.collection("programs").get().then((programs) => {
            setProgramData(programs.docs.map((program => program.data())));
        })
    }, [])
    return (
        <div className={classes.root}>
            <AdminNav/>
            <main className={classes.content}>
            <h2>Manage Programs</h2>
            <table>
            <thead>
                <th> Program Name</th>
                <th>Program Id</th>
                <th>Program Department</th>
                <th>Program Description</th>
            </thead>
            <tbody id="programData">
                <Link to="/createProgram"> Create Program </Link>

                {programData.map((program) => {
                    console.log(program);
                    return( 
                    <tr>
                        <td>
                            <h4> {program.programName}</h4>
                        </td>
                        <td>
                            <h4> {program.id}</h4>
                        </td>
                        <td>
                            <h4> {program.departmentName}</h4>
                        </td>
                        <td>
                            <h4> {program.programDescription}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteProgram(program.id)}>Delete Program</button>
                        </td>
                        { <td>
                            <button onClick={()=> history.push("/updateProgram/"+ program.id )}> Update Program Information</button>
                        </td> }
                    </tr>
                    )
                }
                )}
            </tbody>
        </table>
            </main>
        </div>
        
    )
}

export default ManageProgram;