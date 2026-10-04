import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Loader from '../components/helpers/Loader'

function SellerRoute() {
    const {user, isLoading} = useContext(AuthContext)
    if(isLoading){
        return <div className="h-screen w-full flex justify-center items-center"><Loader/></div>
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }
    if(user.role !== "seller"){
        return <Navigate to="/" replace/>
    }

    return <Outlet/>
}

export default SellerRoute
