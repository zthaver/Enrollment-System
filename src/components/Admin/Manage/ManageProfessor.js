import firebase from '../../../firebase';
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
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
            <td>
                <Link to="/admin"> Home </Link>
            </td>
            <hr />
            {loading ? <h1>Loading...</h1> : null}
            {students.map((prof)=>(
                <div className="professor" key={prof.id}>
                    <h3>ID: {prof.id}</h3>
                    <div>
                        <p>First Name:
                            <input 
                                type="text"
                                placeholder={prof.firstname}
                                value={changeFName}
                                onChange={(e)=> setfName(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updatefname({ firstname: changeFName, id: prof.id})}>Update</button>
                        </p> 
                        <p>Last Name:
                            <input 
                                type="text"
                                placeholder={prof.lastname}
                                value={changeLName}
                                onChange={(e)=> setlName(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updatelname({ lastname: changeLName, id: prof.id})}>Update</button>
                        </p> 
                        <p>Email:
                            <input 
                                type="text"
                                placeholder={prof.email}
                                value={changeEmail}
                                onChange={(e)=> setEmail(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updateemail({ email: changeEmail, id: prof.id})}>Update</button>
                        </p>
                        <p>Address:
                            <input 
                                type="text"
                                placeholder={prof.address}
                                value={changeAddress}
                                onChange={(e)=> setAddress(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updateaddress({ address: changeAddress, id: prof.id})}>Update</button>
                        </p>
                        <p>Date of Birth:
                            <input 
                                type="text"
                                placeholder={prof.dateofbirth}
                                value={changeDate}
                                onChange={(e)=> setDate(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updatedate({ dateofbirth: changeDate, id: prof.id})}>Update</button>
                        </p>
                        <p>Phone Number:
                            <input 
                                type="text"
                                placeholder={prof.phone}
                                value={changePhone}
                                onChange={(e)=> setPhone(e.target.value)}
                            /> 
                            <button onClick={()=> 
                                updatephone({ phone: changePhone, id: prof.id})}>Update</button>
                        </p>
                        <p>
                            Department Head: {String(prof.isDepartmentHead)}
                            <input
                                type="checkbox"
                                value={changeDhead}
                                onChange={(e)=> setDhead(e.target.checked)}
                            />
                            <button onClick={()=> 
                                updateDHead({ departmenthead: changeDhead, id: prof.id})}>Update</button>
                        </p>

                        <button onClick={()=>deleteProf(prof)}>Delete {prof.firstname} {prof.lastname}</button>
                    </div>
                </div>
            ))}
        </Fragment>
            </main>
        </div>
        
    )
}


export default ManageProfessor;
