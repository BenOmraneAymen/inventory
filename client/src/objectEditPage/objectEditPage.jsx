import * as React from 'react';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import css from './editPage.module.css'
import axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';
import ProtectedRoute from '../protectedRoute/protectedRoute';



export default function EditPage(props){

  const [objetName,setObjetName] = React.useState('')
  const [typeName,setTypeName] = React.useState('')
  const [typeData,setTypeData] = React.useState([])
  const [etat,setEtat] = React.useState('')
  const [number,setNumber] = React.useState('')
  const [type,setTypeArr] = React.useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem("ACCESSTOKEN")
  
  let route = useParams()
  const getObjet = async (id) =>{
    await axios.post("http://localhost:4000/objet/dataById",{
      id
    }).then((res)=>{
      console.log(res.data)
      setObjetName(res.data[0].objetName)
      setTypeName(res.data[0].typeName)
      setEtat(res.data[0].etat)
      setNumber(res.data[0].number)
    }).catch((err)=>{
      console.log(err)
    })
  }
    
  const getType = async () => {
    await axios.post("http://localhost:4000/types/data",{userId:1}).then((res)=>{
      let types = []
      for(let i=0;i<res.data.length;i++){
        types.push(res.data[i].typeName)
      }
      setTypeArr(types)
      setTypeData(res.data)
    })
  }

  const updateObjet = async (id)=>{
    let typeId = 0
    typeData.forEach((t)=>{
      if(t.typeName== typeName){
        typeId = t.typeId
      }
    })
    console.log("typeId",typeId)
    await axios.put(`http://localhost:4000/objet/${id}`,{
      objetName,
      typeId,
      etat,
      number
    },{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
      console.log(res)
    }).then(()=>{navigate('/dashboard/All')})
    .catch((err)=>{
      console.log(err)
    })
  }

  React.useLayoutEffect(()=>{
    getType()
    getObjet(route.id)
  },[])

return(
    <>
    <ProtectedRoute>
    <Box sx={{backgroundColor:"#F5F5F5",width:"100%",height:"100vh"}} className={css['editForm']} >
    <Paper>
      <div className={css['container' ]}>
        <div className={css['layout']}>
            <div className={css['title']} >Edit</div>
            <TextField sx={{width:'300px',}} variant="outlined" label="Name" value={objetName}  onChange={(e)=>setObjetName(e.target.value)}   />
            <Autocomplete
                    disablePortal
                    id="type"
                    options={type}
                    sx={{ width: 300 }}
                    onChange={(event, value) => setTypeName(value)}
                    renderInput={(params) => <TextField {...params} label="Type" />}
                    value={typeName}
                    />  
            <Autocomplete
                    disablePortal
                    id="Etat"
                    options={['bonne','moyenne','mauvaise']}
                    sx={{ width: 300 }}
                    onChange={(event, value) => setEtat(value)}
                    renderInput={(params) => <TextField {...params} label="Etat" />}
                    value={etat}
                    />
            <TextField variant='outlined' label='nombre' sx={{ width: 300 }} value={number} onChange={(e)=>setNumber(e.target.value)} />    
            <Button variant="contained" color="primary" sx={{width:"100px"}} onClick={()=>updateObjet(route.id)}  > Apply </Button>
        </div>
      </div>
    </Paper>
    </Box>
    </ProtectedRoute>
    </>
)
}