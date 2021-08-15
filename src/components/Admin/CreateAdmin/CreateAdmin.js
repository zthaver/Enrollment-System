import { Container, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import './CreateAdmin.css'
import {useRef, useState} from 'react';
import { firestore } from '../../../firebase';
import { useAuth } from "../../../Contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import emailjs from "emailjs-com";
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginLeft:'240px',
  },
  formLabel:{
    display:'block',
    marginTop:'20px',
},
inputBox2:{
    width:'100%',
    border:"none",
    borderBottom:"1px solid black",
    fontSize:'1.1em',
    padding:"10px 0",
    '&:focus':{
        borderBottom:"1px solid #90CAF9",
        outline:"none"
    },
}
}))

function CreateAdmin()
 {
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState("");
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    const { signupAdmin } = useAuth();
    const classes = useStyles();

    function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true)
        console.log("form submitted");
        if(/\S+@\S+\.\S+/.test(email.current.value))
        {
          let generatedPassword = uuidv4();
          signupAdmin(email.current.value, generatedPassword)
          .then((val)=>{
            firestore.collection("admin").add({
              "email": email.current.value,
              "firstName": firstName.current.value,
              "lastName": lastName.current.value,
              "isDepartmentHead" : false
            }).then((val)=>{
    console.log("Admin Created. Password: " + generatedPassword)
              var adminDetails = {email:email.current.value, password: generatedPassword}
              alert('successful  sign up')
              emailjs.send('service_39awvvo','template_gkw4bkq',adminDetails,"user_oGearzYTZGyhVqlL710SX")
            })
          })
          .catch((error)=>{
            setError(error)
          })
          setLoading(false);
          setError("")
        }
        else
        {
          setError("Error: Please enter a valid email address")
          setLoading(false);
        }
    }
    const paperStyle={padding:20,height:'70vh',width:280, margin:"40px auto"}
    return(
      <div className={classes.root}>
        <AdminNav/>
        <main className={classes.content}>
          <Paper elavation="20" style={paperStyle}>
            <Container>
              <form onSubmit={handleSubmit}>
                <h2>Admin Creation</h2>

                <label className={classes.formLabel} id="label">First Name </label>
    
                <input  className={classes.inputBox2} name="firstName" ref={firstName}>
                </input>

                <br></br><br></br> 
                <label className={classes.formLabel} id="label">
                  Last name   
                </label>

                <input  className={classes.inputBox2} name="lastName" ref={lastName}>
                </input>

                <br></br><br></br> 
                <label className={classes.formLabel} id="label">
                    Email   
                  </label>

                <input className={classes.inputBox2} name="email" ref={email}>
                </input>
                <br></br><br></br>

                <h1> {error}</h1>
                <Button color="primary" variant="outlined" type="submit" disabled={loading}> Create Admin </Button>

              </form>
            </Container>
            
          </Paper>
          
       </main>
       </div>
       
         
     )
 }

 export default CreateAdmin;