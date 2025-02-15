import React from 'react'
import { isAuthenticated } from '../utilityFunction/utilityFunction';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
return isAuthenticated() ? children: <Navigate to='/login'/>
}

export default PrivateRoute;
