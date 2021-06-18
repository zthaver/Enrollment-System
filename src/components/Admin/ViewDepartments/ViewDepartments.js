import { useState, useEffect } from "react";
import { firestore } from '../../../firebase';
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
 
function ViewDepartments() {
    var history = useHistory();
    const [departmentData, setDepartmentData] = useState([])
    const classes = useStyles();

    function deleteDepartment(id)
    {
        firestore.collection("department").doc(id).delete().then((value)=>{
            console.log("delteteted")
        });
        //gets all department and sets state
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
    }
    useEffect(() => {
        firestore.collection("department").get().then((departments) => {
            setDepartmentData(departments.docs.map((department => department.data())));
        })
    }, [])
    return (
        <div className={classes.root}>
        <AdminNav/>
            <main className={classes.content}>
            <h2>Manage Departments</h2>
            <table>
            <thead>
                <th> Department Name</th>
                <th>Department Id</th>
            </thead>
            <tbody id="departmentData">
                <Link to="/createDepartment"> Create Department </Link>

                {departmentData.map((department) => {
                    console.log(department);
                    return( 
                    <tr>
                        <td>
                            <h4> {department.departmentName}</h4>
                        </td>

                        <td>
                            <h4> {department.id}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteDepartment(department.id)}>Delete Department</button>
                        </td>
                        <td>
                            <button onClick={()=> history.push("/updateDepartment/"+ department.id )}> Update Department Information</button>
                        </td>
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

export default ViewDepartments;