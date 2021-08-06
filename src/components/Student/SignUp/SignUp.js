
import {useRef, useState} from 'react';
import "./SignUp.css";
import { useAuth } from "../../../Contexts/AuthContext";
import emailjs from 'emailjs-com';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import firebase from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#D92A1D',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    myBtns:{
      background:"#D92A1D",
      color:'#fff',
      '&:hover':{
          color:'#D92A1D',
      }
    },
    error:{
        color:'#D92A1D',
    },
    inputBox:{
        border:"none",
        borderBottom:"1px solid black",
        fontSize:'1.1em',
        padding:"10px 0",
        '&:focus':{
            borderBottom:"1px solid #90CAF9",
            outline:"none"
        }
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
  }));

const paperStyle={padding:20, height:'70vh',width:500, margin:"40px auto"}

function SignUp()
{
    const classes = useStyles();
    // reference variables
    const password = useRef();
    const email = useRef();
    const fName = useRef();   
    const lName = useRef();   
    const history = useHistory();

    //use states
    const [userEmail, setEmail] = useState("");
    const [firstName, setfName] = useState("");
    const [lastName, setlName] = useState("");
    const [error,setError] = useState("");

    const { signupStudent } = useAuth();


    // firebase student collection
    const studentUser = firebase.firestore().collection("student");

    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log("here1")

            await signupStudent(userEmail,password.current.value)
            .then((value)=>{
                //get Current user ID
                const user = (firebase.auth().currentUser).uid;
                //add student info to the firestore database
                studentUser.doc(user).set({
                    firstname: firstName,
                    lastname: lastName,
                    email: userEmail,
                    id: user,
                    semester:1,
                    latestPrerequisite:"",
                    programName: ""
                })
                .then(() => {
                    emailjs.send('service_39awvvo','template_gkw4bkq',e.target,"user_oGearzYTZGyhVqlL710SX")
                    alert('successful  sign up')
                    history.push("/login")
                })
                .catch((err)=>{
                    console.log("success" +err)
                    setError(err)
                
            }).catch((err)=>{
                console.log("success" +err)
                setError(err)
                
            })
        })
}



    return(
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={6} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} square>
                <Paper elavation="20" style={paperStyle} >
                    <Container>
                        
                        <Typography align="left" variant="h6" className={classes.headerSignUp}>
                            <h2>Sign Up</h2>
                            <p>and start enrolling in courses at Seneca College</p>
                        </Typography>

                        <form onSubmit={handleSubmit} >
                            <Grid container spacing={10}>
                                <Grid item md={6}>
                                <label><strong>First Name</strong></label>
                                <br />        
                                <input  name="firstName" 
                                        className={classes.inputBox}
                                        value={firstName} 
                                        type="text" 
                                        onChange={(e)=> setfName(e.target.value) } 
                                        autoComplete="off"
                                        required/>
                                </Grid>

                                <Grid item md={6}>
                                <label><strong>Last Name</strong></label>
                                <br />        
                                <input  name="lastName" 
                                        className={classes.inputBox} 
                                        value={lastName} 
                                        onChange={(e)=> setlName(e.target.value) } 
                                        type="text" 
                                        required autoComplete="off"/>
                                </Grid>
                            </Grid>


                            <br />
                            <br />

                            <label><strong>Email</strong></label>
                            <br />        
                            <input  name="email" 
                                    className={classes.inputBox2} 
                                    value={userEmail} 
                                    onChange={(e)=> setEmail(e.target.value) } 
                                    type="email" autoComplete="off"/>
                            <br />
                            <br />

                            <label><strong>Password</strong></label>
                            <br />
                            <input  ref={password} 
                                    className={classes.inputBox2} 
                                    type="password" 
                                    name="password"/>
                            <br />
                            <br />

                            <br></br>

                            <Button type="submit" className={classes.myBtns} >Sign Up</Button>
                            
                            <br></br>
                            <br></br>
                            {
                                error?<h4 align center className={classes.error}>{error.message}</h4>:<h1></h1>
                            }
                            
                        </form>  
                        <p align="center">Already have an Acoount? <Link href="/login">Log In</Link></p>
                    </Container>                
                </Paper>  
            </Grid>
        </Grid>
    )
}

export default SignUp;
