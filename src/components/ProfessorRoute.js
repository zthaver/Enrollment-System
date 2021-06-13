import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import AdminHomePage from './AdminHomePage/AdminHomePage';
import { useAuth } from '../Contexts/AuthContext';

/*
A route that checks for authentication (only meant for the professor to view it)
*/


function ProfessorRoute ({component:Component,...rest})
{
    const { isProfessor } =  useAuth();
    return <Route
    {...rest}
    render={(props)=>{
        return isProfessor? <Component {...props}/> : <Redirect to="/login"/>
    }}/>
}


export default ProfessorRoute;