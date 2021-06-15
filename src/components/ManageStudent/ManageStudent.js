import firebase from '../../firebase';
import React, { useRef, useState, useEffect, Fragment } from "react";
import './ManageStudent.css'

function ManageStudent(){
    let fName = useRef();
    let sEmail = useRef();
    const studentUser = firebase.firestore().collection("student");
    const [loading, setLoading] = useState(false);
    const [students, setStudent] = useState([]);
    const [changeName, setfName] = useState("");
    const [changeLName, setlName] = useState("");
    const [changeEmail, setEmail] = useState("");
    const [error,setError] = useState("");

    function getStudents(){
        setLoading(true);
        studentUser.get().then((item)=>{
            const items = item.docs.map((doc)=> doc.data())
            setStudent(items);
            //console.log(students)
            setLoading(false);
        });
    }
    useEffect(()=>{
        getStudents();
    }, []);

    function updateStudent(student){
        //Update/Edit existing document with student id
        //take in the email, query db by email 
        setLoading();
        console.log(student.id)
        studentUser
        .doc(student.id)
        .update({firstname: student.firstname})
        .then(()=>{
            window.location.reload();
            console.log(student.firstname)
        })
        .catch((err)=>{
            console.log(student)
            console.error(err);
        });
    }

    function deleteStudent(student){
        //Delete existing document with student id
        console.log(student.id)
        studentUser
        .doc(student.id)
        .delete()
        .then(()=>{
            window.location.reload();
            console.log("it work :)")
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    return(
        <Fragment>
            <h1>Manage Student</h1>
            <div className="inputBox"> 
            {/* <input 
                ref = {sEmail}
                type="text"
                placeholder="Email"
                value={studentEmail} 
                onChange={(e)=> setEmail(e.target.value)}
            /> */}
            <input 
                ref = {fName}
                type="text"
                placeholder="First Name"
                value={changeName}
                onChange={(e)=> setfName(e.target.value)}
            />
            </div>
            <hr />
            {loading ? <h1>Loading...</h1> : null}
            {students.map((student)=>(
                <div className="student" key={student.id}>
                    <h3>ID: {student.id}</h3>
                    <div>
                        <p>Name: {student.firstname} {student.lastname}</p>
                        <p>Email: {student.email}</p>
                        <p>Address: {student.address}</p>
                        <p>Date of Birth: {student.dateofbirth}</p>
                        <button onClick={()=>
                            updateStudent({ firstname: changeName, id: student.id})}>Update</button>
                        <button onClick={()=>deleteStudent(student)}>Delete</button>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}


export default ManageStudent;
