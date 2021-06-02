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
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  function signup(email, password) {
    const addAdminRole = functions.httpsCallable("addAdminRole");
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      addAdminRole({ email: email }).then(result => {
        console.log(result)
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  function logout() {
    auth.signOut();
    setCurrentUser(null)
    setIsAdmin(false)
  }



  function login(email, password) {
    let authResult = null;
     auth.signInWithEmailAndPassword(email, password)
     .then((result)=>{
       authResult = result;
     })
  
   return new Promise((resolve,reject)=>{
     if(authResult)
     {
       return authResult
     }
     else
     {
       return {error:"broke"}
     }
   })
  }

/*
Function called when a user signs in or signs out.
*/
  auth.onAuthStateChanged(user => {

    if (user) {
      user.getIdTokenResult().then((val) => {
        //Checks the custom claim of the user (to see if they are admin)
        if (val.claims.admin) {
          setIsAdmin(true);
          history.push("/admin")
        }

      })
    }
  })


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}