import React from 'react'
import { isAuthenticated } from '../utilityFunction/utilityFunction';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


// const PrivateRoute = ({ children, allowedRoles }) => {

//     const user = useSelector(state => state.AuthSlice.user);

//     if (!user.token) {
//         return <Navigate to='/login' />
//     }

//     if (!allowedRoles?.includes(user?.role)) {
//         return <Navigate to='/unauthorize' />
//     }

//     return children
// }

// export default PrivateRoute;


const PrivateRoute = ({ allowedRoles = [], children }) => {
    const { user } = useSelector((state) => state.AuthSlice);

    // 🔒 Step 1: Not logged in
    if (!user?.token) {
        return <Navigate to="/login" replace />;
    }

    // 🔑 Step 2: Role not allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorize" replace />;
    }

    // ✅ Step 3: Authorized
    // Supports both <PrivateRoute><Component /></PrivateRoute> and nested routes
    return children ? children : <Outlet />;
};

export default PrivateRoute;
