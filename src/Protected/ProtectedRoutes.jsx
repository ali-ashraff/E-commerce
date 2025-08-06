import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../pages/Login/Login';
import { authContext } from '../components/Context/AuthContext';

export default function ProtectedRoutes({children}) {

let{token}=useContext(authContext)



  return (
    <div>{token?children:<Navigate to ={'/Login'}/>}</div>
  )
}
