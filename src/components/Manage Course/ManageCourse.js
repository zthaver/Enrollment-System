import { useState, useEffect } from "react";
import { firestore } from '../../firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
 
function ManageCourse() {
    var history = useHistory();
    const [courseData, setCourseData] = useState([])

    async function deleteCourse(id)
    {
        await firestore.collection("courses").doc(id).delete().then((value)=>{
            console.log("delteteted")
                 //gets all courses and sets state
       firestore.collection("courses").get().then((courses) => {
        setCourseData(courses.docs.map((course => course.data())));
    })
        });
   
    }
    useEffect(() => {
        firestore.collection("courses").get().then((courses) => {
            setCourseData(courses.docs.map((course => course.data())));
        })
    }, [])
    return (

        <table>
            <thead>
                <th> Course Name</th>
                <th>Course Id</th>
            </thead>
            <tbody id="departmentData">
                <Link to="/createCourse"> Create Course </Link>

                {courseData.map((course) => {
                    console.log(course);
                    return( 
                    <tr>
                        <td>
                            <h4> {course.courseName}</h4>
                        </td>
                        <td>
                            <h4> {course.id}</h4>
                        </td>

                        <td>
                            <button onClick={()=>deleteCourse(course.id)}>Delete Course</button>
                        </td>
                        <td>
                            <button onClick={()=> history.push("/updateCourse/"+ course.id )}> Update Course Information</button>
                        </td>
                    </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )
}

export default ManageCourse;