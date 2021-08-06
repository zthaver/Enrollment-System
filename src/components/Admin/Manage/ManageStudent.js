import firebase from '../../../firebase';
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext" 
import AdminNav from '../AdminNavbar/AdminNav';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    }
  }))

function ManageStudent(){ 
    const studentUser = firebase.firestore().collection("student");
    const programStudent = firebase.firestore().collection("programs");
    const courseStudent = firebase.firestore().collection("courses")
    //const courseQuery = courseStudent.where("Progra", "==", courseStudent.programName);
    const [loading, setLoading] = useState(false);
    const [students, setStudent] = useState([]);
    const [changeFName, setfName] = useState("");
    const [changeLName, setlName] = useState("");
    const [changeEmail, setEmail] = useState("");
    const [changeAddress, setAddress] = useState("");
    const [changeDate, setDate] = useState("");
    const [changePhone, setPhone] = useState("");
    const [changeProgram, setProgram] = useState([]);
    const [changeProgramName, setProgramName] = useState("");
    const [courseData, setCourse] = useState([]);
    const [error,setError] = useState("");
    const { deleteUserAuth } = useAuth();
    const classes = useStyles();

    function getStudents(){
        setLoading(true);
        studentUser.get().then((item)=>{
            const items = item.docs.map((doc)=> doc.data())
            setStudent(items);
            setLoading(false);
        });
    }
    function getPrograms(){
        setLoading(true);
        programStudent.get().then((program)=>{
            const items = program.docs.map((program)=> program.data())
            setProgram(items);
            setLoading(false);
        });
    }
    useEffect(()=>{
        getStudents();
        getPrograms();
    }, []);

    function updatefname(student){
        //Update/Edit existing document with student id
        setLoading();
        studentUser
        .doc(student.id)
        .update({firstname: student.firstname})
        .then(()=>{
            window.location.reload();
            console.log("updated name to: " + student.firstname)
        })
        .catch((err)=>{
            console.log(student)
            console.error(err);
        });
    }

    function updatelname(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({lastname: student.lastname})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updateemail(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({email: student.email})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updateaddress(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({address: student.address})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updatedate(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({dateofbirth: student.dateofbirth})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updatephone(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({phone: student.phone})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }
    function updateprogram(student){
        setLoading();
        studentUser
        .doc(student.id)
        .update({programName: student.programName})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function deleteStudent(student){
        //Delete existing document with student id
        //1. Use authcontext here
        // deleteUserAuth(student.id)
        // .then(()=>{
        //     console.log("IT FUCKING WORKS")
        // })
        // .catch((err)=>{
        //     console.error(err);
        // })

        studentUser
        .doc(student.id)
        .delete()
        .then(()=>{
            setStudent((prev)=>
                prev.filter((e)=> e.id !== student.id)
            )
            console.log("it work :)")
        })
        .catch((err)=>{
            console.error(err); 
        })
    }

    return(
        <div className={classes.root}>
            <AdminNav/>
                <main className={classes.content}>
                    <Fragment>
            
                        <h1>Manage Student</h1>
                            <td>
                                <Link to="/admin"> Home </Link>
                            </td>

                            <hr />

                        {loading ? <h1>Loading...</h1> : null}
                        {students.map((student)=>(

                            <div className="student" key={student.id}>
                                <h3>ID: {student.id}</h3>
                                
                                <div>
                                    <p>First Name:
                                        <input 
                                            type="text"
                                            placeholder={student.firstname}
                                            value={changeFName}
                                            onChange={(e)=> setfName(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updatefname({ firstname: changeFName, id: student.id})}>Update</button>
                                    </p> 
                                    <p>Last Name:
                                        <input 
                                            type="text"
                                            placeholder={student.lastname}
                                            value={changeLName}
                                            onChange={(e)=> setlName(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updatelname({ lastname: changeLName, id: student.id})}>Update</button>
                                    </p> 
                                    <p>Email:
                                        <input 
                                            type="text"
                                            placeholder={student.email}
                                            value={changeEmail}
                                            onChange={(e)=> setEmail(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updateemail({ email: changeEmail, id: student.id})}>Update</button>
                                    </p>
                                    <p>Address:
                                        <input 
                                            type="text"
                                            placeholder={student.address}
                                            value={changeAddress}
                                            onChange={(e)=> setAddress(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updateaddress({ address: changeAddress, id: student.id})}>Update</button>
                                    </p>
                                    <p>Date of Birth:
                                        <input 
                                            type="text"
                                            placeholder={student.dateofbirth}
                                            value={changeDate}
                                            onChange={(e)=> setDate(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updatedate({ dateofbirth: changeDate, id: student.id})}>Update</button>
                                    </p>
                                    <p>Phone Number:
                                        <input 
                                            type="text"
                                            placeholder={student.phone}
                                            value={changePhone}
                                            onChange={(e)=> setPhone(e.target.value)}
                                        /> 
                                        <button onClick={()=> 
                                            updatephone({ phone: changePhone, id: student.id})}>Update</button>
                                    </p>
                                    <p>Program:
                                        <select onChange={(value) =>{
                                            let selectedIndex = value.target.options.selectedIndex;
                                            //setProgram(value.target.options[selectedIndex].getAttribute('program-id'));
                                            setProgramName(value.target.options[selectedIndex].getAttribute('program-name'))
                                        }}>
                                            <option> </option>
                                            {changeProgram.map((program) =>
                                            <option key={program.id} program-id={program.id} program-name={program.programName}>{program.programName}</option>)};
                                        </select> 
                                        <button onClick={()=> 
                                            updateprogram({ programName: changeProgramName, id: student.id})}>Update</button>
                                    </p>
                                    <p>Courses:
                                        <select>
                                            {students.map(() =>
                                            <option> {student.coursesTaken} </option>)};
                                        </select> 
                                    </p>
                                    <button onClick={()=>deleteStudent(student)}>Delete {student.firstname} {student.lastname}</button>
                                </div>
                            </div>
                        ))}
                    </Fragment>
            </main>
            
        </div>
        
    )
}


export default ManageStudent;
