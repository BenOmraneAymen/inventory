import  axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router'



export default function ProtectedRoute({children}){   

    let route = useParams()

    const [auth,setAuth] = useState(true)
    
    let jwt = localStorage.getItem("ACCESSTOKEN")
    
    async function verify(){
        await axios.get("http://localhost:4000/validation",{ headers: {'Authorization': `Bearer ${jwt}`}}).then((res=>{
            setAuth(res.data.validation)
            console.log(res.data.validation)
            return res.data.validation
        }))
    } 

    verify()

    const authCheck = setInterval(()=>{
        if(auth==true)
        {
            jwt = localStorage.getItem("ACCESSTOKEN")
            verify()
        } 
    },5000)

    useEffect(()=>{
        console.log('worked')
        if(auth===false){
            clearInterval(authCheck)
        }
    },[auth])
    
return auth ? children : <Navigate to='/'/>
}