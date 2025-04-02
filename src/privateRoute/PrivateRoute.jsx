import React from 'react'
import { isAuthenticated } from '../utilityFunction/utilityFunction';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({children , allowedRoles}) => {

    const user= useSelector(state=> state.AuthSlice.user);
    
    if(!user.token){
        return <Navigate to='/login'/>
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to='/unauthorize'/>
    }

return children
}

export default PrivateRoute;
