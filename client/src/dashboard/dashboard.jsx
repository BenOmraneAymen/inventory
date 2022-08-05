import { AppBar,Button, TextField, Toolbar } from "@mui/material";
import BasicList from "../list/list";
import Navbar from "../navbar/navbar";
import BasicTable from "../table/table";
import css from "./dashboard.module.css"
import logo from "../images/Elgazala.png"
import Avatar from '@mui/material/Avatar'
import { useParams } from 'react-router-dom';
import ProtectedRoute from "../protectedRoute/protectedRoute";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard(){
    const { type } = useParams()
    const [email,setEmail] = useState('')
    const [userName,setUsername] = useState('')


    const token = localStorage.getItem("ACCESSTOKEN")

    async function getUserName(){
        let id = localStorage.getItem("USERID")
        await axios.post("http://localhost:4000/userInformation",{userId:id},{headers:{'Authorization': `Bearer ${token}`}}).then(
            (res)=>{
                console.log(res)
                setEmail(res.data.email)
                setUsername(res.data.username)
            }
        ).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUserName()
    },[])
    
    return(
        <>
        <ProtectedRoute>
        <Navbar>
        <div className={css['nav']} >
        <div className={css['navbarLeft']} >
        <img src={logo} className={css['logo']} />
        <Button variant="text" sx={{width:'15ch',margin:'2ch',color:'white',fontSize:'18px'}}>Dashboard</Button>
        <Button variant="text" sx={{width:'15ch',margin:'2ch',color:"white",fontSize:'18px'}}>Statiscs</Button>
        </div>
        <div className={css['navbarRight']}>
        <Avatar sx={{margin:"10px"}} >{userName.substring(0,1).toUpperCase()}</Avatar>
        <div className={css['user']} >
            <div>{userName}</div>
            <div>{email}</div>
        </div>
        </div>
        </div>
        </Navbar>
        <div className={css['container']} >
            <BasicList type={type} />
            <BasicTable type={type} />
        </div>
        </ProtectedRoute>
        </>
    );
}