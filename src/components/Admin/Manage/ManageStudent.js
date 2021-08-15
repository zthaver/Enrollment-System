import firebase from '../../../firebase';
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext" 
import AdminNav from '../AdminNavbar/AdminNav';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Grid, 
        TextField,
        Button, 
        MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
    gridContainer:{
        border:"1px solid #E3DFFF",
        borderRadius:"5px",
        padding:"10px",
        margin:"25px 0",
    },
    myBtn:{
        marginTop:"13px",
        marginLeft:"4px",
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
                        <h1>Manage Students Information</h1>
                        <hr />

                        {loading ? <h1>Loading...</h1> : null}
                        {students.map((student)=>(

                            <div className="student" key={student.id}>
                                <h3>{student.firstname} {student.lastname}</h3>
                                <p>Student Id:: {student.id}</p>
                                
                                <Grid className={classes.gridContainer} container spacing={1}>                                    
                                    <Grid item md={3} sm={6} xs={12} >                                        
                                        <TextField 
                                            margin="dense"
                                            type="text"
                                            id="outlined-basic"
                                            placeholder={student.lastname}
                                            value={changeLName}
                                            onChange={(e)=> setlName(e.target.value)}
                                            label="Last Name"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updatelname({ lastname: changeLName, id: student.id})}>Update</Button>
                                    </Grid>

                                    <Grid item md={3} sm={6} xs={12}>
                                    <TextField 
                                            margin="dense"
                                            type="text"
                                            id="outlined-basic"
                                            placeholder={student.firstname}
                                            value={changeFName}
                                            onChange={(e)=> setfName(e.target.value)}
                                            label="First Name"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updatefname({ firstname: changeFName, id: student.id})}>Update</Button>
                                    </Grid>

                                    <Grid item md={3} sm={6} xs={12}>
                                    <TextField 
                                            margin="dense"
                                            type="email"
                                            id="outlined-basic"
                                            placeholder={student.email}
                                            value={changeEmail}
                                            onChange={(e)=> setEmail(e.target.value)}
                                            label="Email"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updateemail({ email: changeEmail, id: student.id})}>Update</Button>
                                    </Grid>

                                    <Grid item md={3} sm={6} xs={12}>
                                    <TextField 
                                            margin="dense"
                                            type="text"
                                            id="outlined-basic"
                                            placeholder={student.address}
                                            value={changeAddress}
                                            onChange={(e)=> setAddress(e.target.value)}
                                            label="Address"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updateaddress({ address: changeAddress, id: student.id})}>Update</Button>

                                    </Grid>

                                    <Grid item md={3} sm={6} xs={12}>
                                    <TextField 
                                            margin="dense"
                                            type="date"
                                            id="outlined-basic"
                                            placeholder={student.dateofbirth}
                                            value={changeDate}
                                            onChange={(e)=> setDate(e.target.value)}
                                            label="Date of Birth"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updatedate({ dateofbirth: changeDate, id: student.id})}>Update</Button>

                                    </Grid>

                                    <Grid item md={3} sm={6} xs={12}>
                                        <TextField 
                                            margin="dense"
                                            type="text"
                                            id="outlined-basic"
                                            placeholder={student.phone}
                                            value={changePhone}
                                            onChange={(e)=> setPhone(e.target.value)}
                                            label="Phone Number"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                        /> 
                                        <Button color="primary" className={classes.myBtn} variant="outlined" size="small" onClick={()=> updatephone({ phone: changePhone, id: student.id})}>Update</Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                    
                                    {/* <TextField 
                                            id="outlined-select-currency"
                                            select
                                            placeholder={student.phone}
                                            value={changePhone}
                                            onChange={(value) =>{
                                                console.log("OPTIONS:");
                                                console.log(value.target.options);
                                                let selectedIndex = value.target.options.selectedIndex;
                                                //setProgram(value.target.options[selectedIndex].getAttribute('program-id'));
                                                setProgramName(value.target.options[selectedIndex].getAttribute('program-name'))
                                            }}
                                            helperText="Please select a program"
                                            label="Program"
                                            variant="outlined"
                                            SelectProps={{
                                                native: true,
                                              }}
                                        >
                                            {changeProgram.map((program) =>
                                            <MenuItem key={program.id} program-id={program.id} program-name={program.programName}>{program.programName}</MenuItem>)};
                                        </TextField> 

                                        <Button onClick={()=> updatephone({ phone: changePhone, id: student.id})}>Update</Button> */}
                                        
                                        <p>Program:
                                            <select onChange={(value) =>{
                                                                                                console.log("OPTIONS:");
                                                                                                console.log(value.target.options);
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
                                    </Grid>

                                    <Grid item xs={3}>
                                    <p>Courses:
                                            <select>
                                                {students.map(() =>
                                                <option> {student.coursesTaken} </option>)};
                                            </select> 
                                        </p>
                                    </Grid>
                                    <Button color="secondary" variant="outlined" size="medium" onClick={()=>deleteStudent(student)}>Delete {student.firstname} {student.lastname}</Button>

                                </Grid>
                            </div>                            
                        ))}
                    </Fragment>
            </main>
            
        </div>
        
    )
}


export default ManageStudent;
