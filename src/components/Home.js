import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../Authentication/Auth'


function Home(){
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){

        setError('');
    
        try {

            await logout()
            history.push('/signup')
        } catch {
            setError('Failed to logout');
        }
    };


    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={handleLogout}> 
                Log Out
            </button>
        </div>
    )
}

export default Home;