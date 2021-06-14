import { useState, useEffect } from "react";
import { firestore } from '../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
 
function ViewDepartments() {
    var history = useHistory();
    const [departmentData, setDepartmentData] = useState([])

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
    )
}

export default ViewDepartments;