import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import AdminHomePage from './Admin/AdminHomePage/AdminHomePage';
import { useAuth } from '../Contexts/AuthContext';

/*
A route that checks for authentication (only meant for the admin to view it)
*/


function StudentRoute ({component:Component,...rest})
{
    const { isStudent } =  useAuth();
    return <Route
    {...rest}
    render={(props)=>{
        return isStudent? <Component {...props}/> : <Redirect to="/login"/>
    }}/>
}


export default StudentRoute;