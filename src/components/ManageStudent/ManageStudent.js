import firebase from '../../firebase';
import React, { useRef, useState, useEffect, Fragment } from "react";
import './ManageStudent.css'

function ManageStudent(){
    let fName = useRef();
    let sEmail = useRef();
    const studentUser = firebase.firestore().collection("student");
    const [loading, setLoading] = useState(false);
    const [students, setStudent] = useState([]);
    const [firstName, setfName] = useState("");
    const [lastName, setlName] = useState("");
    const [studentEmail, setEmail] = useState("");
    const [error,setError] = useState("");

    function getStudents(){
        setLoading(true);
        studentUser.get().then((item)=>{
            const items = item.docs.map((doc)=> doc.data())
            setStudent(items);
            console.log(students)
            setLoading(false);
        });
    }
    useEffect(()=>{
        getStudents();
    }, []);

    function updateStudent(updatedstudent){
        //Update/Edit existing document with student id
        //take in the email, query db by email 
        setLoading();
        studentUser
        .doc(updatedstudent.id)
        .update(updatedstudent)
        // .then(()=>{
        //     setStudent((prev)=>{
        //         prev.map((e)=>{
        //             if(e.id !== student.id){
        //                 return e;
        //             }
        //             return student;
        //         })
        //     });
        // })
        .catch((err)=>{
            console.log(updatedstudent)
            console.error(err);
        });
    }

    function deleteStudent(student){
        //Delete existing document with student id
        studentUser
        .doc(student.id)
        .delete()
        .then(()=>{
            setStudent((prev)=>{
                prev.filter((e)=> e.id !== student.id)
            })
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    return(
        <Fragment>
            <h1>Manage Student</h1>
            <div className="inputBox"> 
            <input 
                ref = {sEmail}
                type="text"
                placeholder="Email"
                value={studentEmail} 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
                ref = {fName}
                type="text"
                placeholder="First Name"
                value={firstName} 
                onChange={(e)=> setfName(e.target.value)}
            />
            </div>
            <hr />
            {loading ? <h1>Loading...</h1> : null}
            {students.map((student)=>(
                <div className="student" key={student.studentId}>
                    <h3>ID: {student.studentId}</h3>
                    <div>
                        <p>Name: {student.firstName} {student.lastName}</p>
                        <p>Email: {student.email}</p>
                        <p>Address: {student.address}</p>
                        <p>Date of Birth: {student.dateofbirth}</p>
                        <p>Course: {student.course}</p>
                        <button onClick={()=>
                            updateStudent({email: student.email, firstName})}>Update</button>
                        <button onClick={()=>deleteStudent(student)}>Delete</button>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}


export default ManageStudent;
