import React, { useContext } from 'react'
import { authContext } from '../components/Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function LoginProtected({children}) {

let{token}=useContext(authContext)

  return (
    <div>
{!token? children:<Navigate to={'/'}/>}

    </div>
  )
}
