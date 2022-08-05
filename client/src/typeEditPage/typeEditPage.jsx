import * as React from 'react';
import { TextField,Button } from "@mui/material";
import css from './typeEditPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProtectedRoute from '../protectedRoute/protectedRoute';

export default function TypeEditPage(){
    const { type } = useParams()
    const [typeName,setTypeName] = React.useState(type)
    console.log(typeName)

    const navigate = useNavigate()

    const editType = (type,newtype) => {
        axios.put(`http://localhost:4000/types/${type}`,{
            newtype
        }).then((res)=>{
            console.log(res)
            navigate('/dashboard/All')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
        <ProtectedRoute>
        <div className={css['background']} >
            <div className={css['box']} >
            <div className={css['title']} >Edit Type</div>
            <TextField variant="outlined" label='type' sx={{margin:"20px"}} value={typeName} onChange={(e)=>{setTypeName(e.target.value)}} />
            <Button variant="contained" color='primary' sx={{fontSize:'16px'}} onClick={()=>{
                editType(type,typeName)
            }} >
                    Apply
            </Button>
            </div>
        </div>
        </ProtectedRoute>
        </>
    )
}