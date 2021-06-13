import React, { useContext, useState, useEffect } from "react"
import { auth, firestore, functions } from "../firebase"
import { useHistory } from "react-router-dom";

/*
The file containing the context to deal with all aspects of authentication.
Including login,signup.
*/


const AuthContext = React.createContext()


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  let [currentUser, setCurrentUser] = useState();
  let [loading, setLoading] = useState(true);
  let [isAdmin, setIsAdmin] = useState();
  let [isProfessor, setIsProfessor] = useState(false); 
  let [isStudent, setIsStudent] = useState(false); 
  

  async function signupAdmin(email, password,) {
    //assigns the role to the user (admin in this case)
    
    let signUpResult = null;
    let signUpError = null;
    const addAdminRole = functions.httpsCallable("addAdminRole");
     await auth.createUserWithEmailAndPassword(email, password).then((user) => {
      signUpResult = user;
      console.log("sucess is "+ signUpResult);
      addAdminRole({ email: email }).then(result => {
        
        
      }).catch((err) => {
      })
    }).catch((err)=>{
      signUpError = err;
      console.log("fail is "+ signUpError);
      console.log(err);
    })

    return new Promise((resolve,reject) =>{
       if(signUpResult)
       {
        console.log(signUpResult)
         resolve(signUpResult)
       }
       else
       {
         console.log(signUpError)
         reject(signUpError)
       }
    })
  }


  async function signupStudent(email, password) {
    //assigns the role to the user (professor in this case)
    let signUpResult = null;
    let signUpError = null;
    const addStudentRole = functions.httpsCallable("addStudentRole");
     await auth.createUserWithEmailAndPassword(email, password).then((user) => {
      signUpResult = user;
      addStudentRole({ email: email }).then(result => {
       
        console.log(result)
      }).catch((err) => {
        signUpError = err;
      })
    })
    return new Promise((resolve,reject) =>{
     if(signUpResult)
     {
       resolve(signUpResult);
     }
     else
     {
       reject(signUpError);
     }

    })
  }

  async function signupProfessor(email, password) {
    //assigns the role to the user (professor in this case)
    let signUpResult = null;
    let signUpError = null;
    const addProfessorRole = functions.httpsCallable("addProfessorRole");
     await auth.createUserWithEmailAndPassword(email, password).then((user) => {
      signUpResult = user;
      addProfessorRole({ email: email }).then(result => {
       
        console.log(result)
      }).catch((err) => {
        signUpError = err;
      })
    })
    return new Promise((resolve,reject) =>{
     if(signUpResult)
     {
       resolve(signUpResult);
     }
     else
     {
       reject(signUpError);
     }

    })
  }
  function logout() {
    auth.signOut();
    setCurrentUser(null)
    setIsAdmin(false)
  }



  async function login(email, password) {
    let authResult = null;
    let tokenClaims;
    let loginError = null;
     await auth.signInWithEmailAndPassword(email, password)
     .then((result)=>{
       result.user.getIdTokenResult().then((tokenResult)=>{
         tokenClaims = tokenResult.claims
         console.log(tokenClaims)
         {
           //sets the type of user according to  the user's custom claims set by firebase
          if(tokenResult && tokenResult.claims.admin)
          {
            console.log("admin is being set"+ tokenClaims.admin)
            setIsAdmin(true);
          }
          if(tokenResult && tokenResult.claims.professor)
          {
            console.log("prof is being set"+ tokenClaims.professor)
            setIsProfessor(true);
          }
          if(tokenResult && tokenResult.claims.student)
          {
            console.log("student is being set")
            setIsStudent(true);
          }
         }
      
       
       })
  
       authResult = result;
       console.log("admin is " + isAdmin)
       
       
       console.log(authResult)
     }).catch((err)=>{
       loginError = err;
     })
  
   return new Promise((resolve,reject)=>{
     if(authResult)
     {
      console.log("rizolve"+tokenClaims)
       resolve( tokenClaims)
     }
     else
     {
      console.log("reject")
       return reject({error:loginError})
     }
   })
  }

/*
Function called when a user signs in or signs out.
*/



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async user => {
      console.log(user);
      if(user)
      
       await user.getIdTokenResult().then((token)=>{
        if(token.claims.admin)
        {
          setIsAdmin(true);
          console.log(" set admin is " + isAdmin)
          setLoading(false)
        }
        if(token.claims.professor)
        {
          setIsProfessor(true);
          setLoading(false)
        }
        if(token.claims.student)
        {

          setIsStudent(true);
          setLoading(false)

        }
      })
      //setCurrentUser(user)
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signupAdmin,
    signupStudent,
    login,
    logout,
    signupProfessor,
    isProfessor,
    isAdmin,
    isStudent
  }


  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}