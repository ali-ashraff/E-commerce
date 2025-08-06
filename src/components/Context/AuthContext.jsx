import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";







 export let authContext=createContext(null)




export default function AuthContextProvider({children}) {

 async function verfiyToken(){
  try{
    let{data}= await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token:localStorage.getItem('token'),
      },
    })
    console.log(data)
  }catch(err){
    console.log(err)
    toast.error(err.response.data.message )
    setToken(null)
    localStorage.removeItem('token')
    
  }
}

useEffect(()=>{
  verfiyToken()
},[])





let[token,setToken]=useState(localStorage.getItem('token'))

  return (
    <authContext.Provider value={{token,setToken}}>
{children}
    </authContext.Provider>
  )
}
