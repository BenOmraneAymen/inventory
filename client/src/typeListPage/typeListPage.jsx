import * as React from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import css from './typeListPage.module.css'
import axios from 'axios';
import { useParams,useNavigate,Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';  
import ProtectedRoute from '../protectedRoute/protectedRoute';




export default function TypeListPage(){
  
  const [typeName,setTypeName] = React.useState('')
  const [type,setType] = React.useState([])
  const [hidden,setHidden] = React.useState(false)
  const [state,setState] = React.useState(0)
  const token = localStorage.getItem("ACCESSTOKEN")
  
  let route = useParams()

  const getType =  () => {
         axios.post("http://localhost:4000/types/data",{userId:1}).then((res)=>{
        let types = []
        for(let i=0;i<res.data.length;i++){
          types.push(res.data[i].typeName)
          }
        setType(types)
        console.log(types)
      })
  }

  const addType = async ()=> {
    addFormToggle()
    setState(state+1)
    await axios.post("http://localhost:4000/types/",{typeName,userId:1},{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const deleteType = async (typeName)=>{
    console.log(typeName)
    await axios.delete("http://localhost:4000/types/delete",{data:{typeName}}).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const addFormToggle = ()=>{
    if(hidden == true){
      setHidden(false)
    }else{
      setHidden(true)
    }
  }

  React.useEffect(()=>{
    getType()
  },[state])

return(
    <>
    <ProtectedRoute>
    <div className={css['editForm']} >
    <Paper sx={{Width: "300px" }}>
      <div className={css['container' ]}>
        <div className={css['layout']}>
            <div className={css['nav']}  >
            <div className={css['title']} >Edit Types </div>
            <Button variant="contained" color="success" sx={{minWidth:"50px",maxWidth:"50px",minHeight:"50px",maxHeight:"50px"}} onClick={()=>{
              addFormToggle();
              setTypeName('')
            }} >
              <AddIcon sx={{minWidth:"30px",maxWidth:"30px",minHeight:"30px",maxHeight:"30px"}} />
              </Button>
            </div>
            <div className={hidden?css["addForm"]:css['hidden']} >
              <TextField variant="outlined" label="type" sx={{margin:"5px"}} value={typeName} onChange={(e)=>{setTypeName(e.target.value)}}/>
              <Button variant='contained' color="success" sx={{margin:"5px",maxWidth:"100px"}}  onClick={()=>{addType()}} > Add</Button>
            </div>
            <TableContainer component={Paper} sx={{margin:"10px",marginRight:"20px",minWidth: "300px",maxWidth: "600px" ,marginBottom:"50px" }} >
        <Table sx={{ minWidth: "300px",maxWidth: "600px"}} aria-label="simple table">
          <TableHead sx={{backgroundColor:"#e5e5e5"}} >
            <TableRow >
              <TableCell align="center">Type</TableCell>
              <TableCell align="center" sx={{paddingRight:"40px"}} >action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {type.map((row) => (
              <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center">{row}</TableCell>
                <TableCell align="center">
                  <Link to={"/Dashboard/editType/"+row} >
                  <Button variant="contained" sx={{padding:"0px",maxWidth:'30px',minWidth:'30px',margin:"2px"}} color="warning" >
                  <CreateIcon/>
                  </Button>
                  </Link>
                  <Button variant='contained' color='error' sx={{padding:"0px",maxWidth:'30px',minWidth:'30px',margin:'5px' }} onClick={()=>{
                    setState(state+1)
                    console.log(state)
                    deleteType(row)
                  }} ><DeleteIcon/>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
      </div>
    </Paper>
    </div>
    </ProtectedRoute>
    </>
)
}