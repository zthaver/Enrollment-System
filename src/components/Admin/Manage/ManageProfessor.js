import firebase from '../../../firebase';
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AdminNav from '../AdminNavbar/AdminNav';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Grid, 
    TextField,
    Button, 
    MenuItem,
    Checkbox} from '@material-ui/core';

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

function ManageProfessor(){
    const profUser = firebase.firestore().collection("professors");
    const [loading, setLoading] = useState(false);
    const [students, setStudent] = useState([]);
    const [changeFName, setfName] = useState("");
    const [changeLName, setlName] = useState("");
    const [changeEmail, setEmail] = useState("");
    const [changeAddress, setAddress] = useState("");
    const [changeDate, setDate] = useState("");
    const [changePhone, setPhone] = useState("");
    const [changeDhead, setDhead] = useState(false);
    const [error,setError] = useState("");
    const classes = useStyles();

    function getProfessors(){
        setLoading(true);
        profUser.get().then((item)=>{
            const items = item.docs.map((doc)=> doc.data())
            setStudent(items);
            setLoading(false);
        });
    }
    useEffect(()=>{
        getProfessors();
    }, []);

    function updatefname(prof){
        //Update/Edit existing document with student id
        setLoading();
        profUser
        .doc(prof.id)
        .update({firstname: prof.firstname})
        .then(()=>{
            window.location.reload();
            console.log("updated name to: " + prof.firstname)
        })
        .catch((err)=>{
            console.log(prof)
            console.error(err);
        });
    }

    function updatelname(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({lastname: prof.lastname})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updateemail(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({email: prof.email})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updateaddress(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({address: prof.address})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updatedate(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({dateofbirth: prof.dateofbirth})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updatephone(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({phone: prof.phone})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function updateDHead(prof){
        setLoading();
        profUser
        .doc(prof.id)
        .update({isDepartmentHead: prof.departmenthead})
        .then(()=>{
             window.location.reload();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    function deleteProf(prof){
        //Delete existing document with student id
        console.log(prof.id)
        profUser
        .doc(prof.id)
        .delete()
        .then(()=>{
            setStudent((prev)=>
            prev.filter((e)=> e.id !== prof.id)
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
            <h1>Manage Professor</h1>

            <hr />
            {loading ? <h1>Loading...</h1> : null}
            {students.map((prof)=>(
                <div className="professor" key={prof.id}>
                    <h3>{prof.firstname} {prof.lastname}</h3>
                    <p>ID: {prof.id}</p>
                    <Grid className={classes.gridContainer} container spacing={1}>
                        <Grid md={3} sm={6} xs={12}>
                            <TextField
                                    margin="dense" 
                                    type="text"
                                    id="outlined-basic"
                                    placeholder={prof.firstname}
                                    value={changeFName}
                                    label="First Name"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                    onChange={(e)=> setfName(e.target.value)}
                                /> 
                                <Button variant="outlined" 
                                        size="small"
                                        color="primary"
                                        className={classes.myBtn} 
                                        onClick={()=> 
                                        updatefname({ firstname: changeFName, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid md={3} sm={6} xs={12}>
                            <TextField 
                                margin="dense"
                                type="text"
                                id="outlined-basic"
                                placeholder={prof.lastname}
                                value={changeLName}
                                label="Last Name"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                onChange={(e)=> setlName(e.target.value)}
                            /> 
                            <Button variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updatelname({ lastname: changeLName, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid md={3} sm={6} xs={12}>
                            <TextField 
                                margin="dense"
                                type="text"
                                id="outlined-basic"
                                placeholder={prof.email}
                                value={changeEmail}
                                label="Email"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                onChange={(e)=> setEmail(e.target.value)}
                            /> 
                            <Button variant="outlined" 
                                    size="small"
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updateemail({ email: changeEmail, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid md={3} sm={6} xs={12}>
                            <TextField 
                                margin="dense"
                                type="text"
                                id="outlined-basic"
                                placeholder={prof.address}
                                label="Address"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={changeAddress}
                                onChange={(e)=> setAddress(e.target.value)}
                            /> 
                            <Button variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updateaddress({ address: changeAddress, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid md={3} sm={6} xs={12}>
                            <TextField 
                                margin="dense"
                                type="date"
                                placeholder={prof.dateofbirth}
                                label="Date of Birth"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={changeDate}
                                onChange={(e)=> setDate(e.target.value)}
                            /> 
                            <Button variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updatedate({ dateofbirth: changeDate, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                            <TextField 
                                margin="dense"
                                type="text"
                                placeholder={prof.phone}
                                label="Phone Number"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={changePhone}
                                onChange={(e)=> setPhone(e.target.value)}
                            /> 
                            <Button variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updatephone({ phone: changePhone, id: prof.id})}>Update</Button>
                        </Grid>
                            
                        
                        <Grid item md={3} sm={6} xs={12}>
                            Department Head: {String(prof.isDepartmentHead)}
                            <Checkbox
                                value={changeDhead}
                                onChange={(e)=> setDhead(e.target.checked)}
                            />
                            <Button variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.myBtn}
                                    onClick={()=> 
                                    updateDHead({ departmenthead: changeDhead, id: prof.id})}>Update</Button>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>

                        </Grid>

                        <Button color="secondary" variant="outlined" onClick={()=>deleteProf(prof)}>Delete {prof.firstname} {prof.lastname}</Button>
                    </Grid>
                </div>
            ))}
        </Fragment>
            </main>
        </div>
        
    )
}


export default ManageProfessor;
