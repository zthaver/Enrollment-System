import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import AdminHomePage from './AdminHomePage/AdminHomePage';
import { useAuth } from '../Contexts/AuthContext';


function ProtectedRoute ({component:Component,...rest})
{
    const { currentUser } =  useAuth();
    return <Route
    {...rest}
    render={(props)=>{
        return currentUser? <Component {...props}/> : <Redirect to="/login"/>
    }}/>
}


export default ProtectedRoute;