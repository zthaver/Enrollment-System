import { useState, useEffect } from "react";
import { firestore } from '../../firebase';

function ViewDepartments() {
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
                            <button onClick={()=>deleteDepartment(department.id)}> delete</button>
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