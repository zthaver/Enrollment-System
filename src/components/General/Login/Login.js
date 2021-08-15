import {useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../../Contexts/AuthContext" 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


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
      marginTop:'10px',
      color:'#fff',
      '&:hover':{
          color:'#D92A1D',
      }
    },
    error:{
        color:'#D92A1D',
    },
    // formCotainer:{
    //     margin:'0 auto',
    //     textAlign:'center',
    // },
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
  }));

function Login()
{
    let password = useRef();
let email = useRef();
const { login } = useAuth();
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);
const history = useHistory();
const classes = useStyles();

async function handleSubmit(e)
{
    e.preventDefault();

        setError("");
        setLoading(true);
         await login(email.current.value,password.current.value)
         .then((value)=>{
             if(value.admin)
             {
                history.push("/manageProfessor",value.user_id)
             }
             if(value.professor)
             {
                history.push("/professor",value.user_id)
             }

             if(value.student)
             {
                 history.push("/student",value.user_id)
             }
              
         })
         .catch((err)=>{
             console.log(err)
             setError(err)
             setLoading(false)
         })


 
}
const paperStyle={padding:20,height:'70vh',width:280, margin:"40px auto"}
    return(
        
    <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} square>
            <Paper elavation="20" style={paperStyle}>
                <Container>
                    <Grid >
                        <h2 >Login</h2>
                    </Grid>
                    <form className={classes.formCotainer} onSubmit={handleSubmit}>

                        <label className={classes.formLabel}>Email</label>
                        <input className={classes.inputBox2}  ref={email}  />
                        <br></br>

                        <label  className={classes.formLabel}>Password</label>
                        <input  className={classes.inputBox2}  
                                ref={password} 
                                type="password"/>
                        <br></br><br></br>

                        <Button disabled={loading} type="submit" className={classes.myBtns}>Login to your account</Button>
                        <br></br><br></br>

                        {
                        error? <h4 className={classes.error}> {error.error.message}</h4>: <h1></h1>
                        }   
                    </form>

                    <p align="center">Don't have an account <Link href="/signup">Sign Up</Link></p>
                </Container>
            </Paper>  
        </Grid>
   </Grid>
    )
}

export default Login;