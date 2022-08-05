import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import css from './login.module.css'
import image from "../images/CyberPark.png"
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [email,setEmail] =  useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    /*const handleSubmit = ()=>{
        let data = {"email":email,"password":password}
        console.log(data)
        console.log(JSON.stringify(data))
        fetch("http://localhost:4000/login",
         { method: "POST", 
         body: JSON.stringify(data),
         headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => response.json())
        .then(data => console.log(data));

    }*/
    function handleSubmit(){
        axios.post('http://localhost:4000/login',{
            email,password
        }).then((res)=>{
            console.log(res)
            if(res.data.status==200){
               localStorage.setItem('ACCESSTOKEN',res.data.accessToken)
               localStorage.setItem('REFRESHTOKEN',res.data.refreshToken)
               localStorage.setItem('USERID',res.data.userId)  
               navigate('/dashboard/All')
            }else{
                alert('wrong credential')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    



    return(
        <div className={css['loginPage']}>
        <div className={css['container']}>
        <form className={css['loginForm']} action='/login' method='post' >
        <div className={css['titleContainer']} >
        <div className={css['Title']} >Welcome Back</div>
        <div className='sub-title'>Please enter your details</div>
        </div>
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width:'40ch',margin:'2ch'}} value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <TextField  id="outlined-password-input" label="Password" type="password" sx={{width:'40ch',margin:'2ch'}} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <Button variant="contained" sx={{width:'20ch',height:'5ch',margin:'2ch'}} className="button" onClick={()=>handleSubmit()}>Login</Button>
        </form>
        </div>
        <img src={image} />
        </div>
    )
}