import React from 'react'
import { isAuthenticated } from '../utilityFunction/utilityFunction';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({children , }) => {

    const user= useSelector(state=> state.AuthSlice.user);
    console.log({user});

return isAuthenticated() ? children: <Navigate to='/login'/>
}

export default PrivateRoute;
