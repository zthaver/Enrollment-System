import { TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import './CreateProfessor.css'
import {useRef, useState} from 'react';


function CreateProfessor()
 {
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState("");
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true)
        console.log("form submitted");
        if(/\S+@\S+\.\S+/.test(email.current.value))
        {
            setLoading(false);
            console.log("email not broke")
            setError("")
        }
        else
        {
            console.log("email broke ")
            setError("email is not valid")
            setLoading(false);
        }
    }



     return(
         <form onSubmit={handleSubmit}>
             <label id="label">
              First Name 
             </label>
             <br></br><br></br>

           <input  name="firstName" ref={firstName}>
           </input>

           <br></br><br></br> 
           <label id="label">
              Last name   
             </label>
             <br></br><br></br>

           <input  name="lastName" ref={lastName}>
           </input>

           <br></br><br></br> 
           <label id="label">
              Email   
             </label>
             <br></br><br></br>

           <input  name="email" ref={email}>
           </input>
           <br></br><br></br>

           <h1> {error}</h1>
           <Button type="submit" disabled={loading}> Create Professor </Button>

         </form>
     )
 }

 export default CreateProfessor;