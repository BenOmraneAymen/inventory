import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams,Link,useNavigate } from 'react-router-dom';
import css from './table.module.css'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPage from '../objectEditPage/objectEditPage';



export default function BasicTable(props) {

  let route = useParams()
  const [objet,setObjet] = React.useState([])
  const [typeData,setTypeData] = React.useState([])
  const [typeArr,setTypeArr] = React.useState([])
  const [MenuVisbility,setMenuVisbility] = React.useState('hidden')
  const [objetName,setObjetName] = React.useState('')
  const [typeName,setTypeName] = React.useState('')
  const [etat,setEtat] = React.useState('')
  const [number,setNumber] = React.useState('')
  const [search,setSearch] = React.useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("ACCESSTOKEN")



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

function getobjet(type){
  axios.post("http://localhost:4000/objet/data",{
    type
  },{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
    console.log('get',res)
    setObjet(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}

function addObjet(objetName,typeId,etat,number){
  axios.post("http://localhost:4000/objet/",{
    objetName,
    typeId,
    etat,
    number
  },{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
    console.log(res)
    setMenuVisbility('hidden')
  }).catch((err)=>{
    console.log(err)
  })
} 

function searchObjet(name){
  axios.post("http://localhost:4000/objet/search",{
    name
  },{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
    setObjet(res.data)
  })
}

function deleteObjet(objetName){
  axios.post('http://localhost:4000/objet/delete',{objetName},{ headers: {'Authorization': `Bearer ${token}`}}).then((res)=>{
    console.log(res)
  })
}

function showMenu(){
  if(MenuVisbility=='hidden'){
    setMenuVisbility('show')
  }else{
    setMenuVisbility('hidden')
  }
}


React.useLayoutEffect(()=>{
  getType()
  getobjet(props.type)
},[route,MenuVisbility])



  return (
    <>
    <div className={css["tableContainer"]} >
      <div className={css["optionContainer"]} >
          <div className={css["searchContainer"]} >
              <TextField size="small" onChange={(e)=>{setSearch(e.target.value)
                                                      if(e.target.value!=''){
                                                      searchObjet(e.target.value)
                                                    }else{
                                                      getobjet(route.type)
                                                    }
                                                      }} />
              <Button color="primary" variant="contained" sx={{height:"35px",margin:'10px'}} onClick={()=>{searchObjet(search)}}  >
                  search
              </Button>
          </div>
          <Button color="success" variant="contained" onClick={()=>{showMenu()
                                                                    setObjetName('')
                                                                    setTypeName('')
                                                                    setEtat('')
                                                                    setNumber('')              
                                                                              }} >
              Add object
          </Button>
      </div>
      <div className={css[MenuVisbility+'createMenu']} >
      <div className={css['createForm']} >
        <TextField variant='outlined' label='name' size='small' value={objetName} onChange={(e)=>setObjetName(e.target.value)} />
        <Autocomplete
          size='small'
          disablePortal
          id="type"
          options={typeArr}
          sx={{ width: 150 }}
          onChange={(event, value) => setTypeName(value)}
          renderInput={(params) => <TextField {...params} label="Type" />}
          value={typeName}
          />  
        <Autocomplete
          size='small'
          disablePortal
          id="Etat"
          options={['bonne','moyenne','mauvaise']}
          sx={{ width: 150 }}
          onChange={(event, value) => setEtat(value)}
          renderInput={(params) => <TextField {...params} label="Etat" />}
          value={etat}
          />
        <TextField variant='outlined' label='nombre' size='small'  sx={{ width: 100 }} value={number} onChange={(e)=>setNumber(e.target.value)} />    
        </div>
        <Button color="success" variant="contained" sx={{width:'100px'}} onClick={()=>{
          let typeId = 0
          typeData.forEach((t)=>{
            if(t.typeName== typeName){
              typeId = t.typeId
            }
          })
          console.log("typeId",typeId)
          addObjet(objetName,typeId,etat,number)
          setObjetName('')
          setTypeName('')
          setEtat('')
          setNumber('')
        }} >Add</Button>
      </div>        
      <TableContainer component={Paper} sx={{margin:"10px",marginRight:"20px"}} className={css['table']} >
        <Table sx={{ width: "1700px",minWidth:"1400px" }} aria-label="simple table"className={css['table']}  >
          <TableHead sx={{backgroundColor:"#e5e5e5"}} >
            <TableRow >
              <TableCell >id</TableCell>
              <TableCell align="center">Materiel</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center" sx={{paddingRight:"40px"}} >action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objet.map((row) => (
              <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

              >
                <TableCell >{row.objectId}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.objetName}
                </TableCell>
                <TableCell align="center">{row.etat}</TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.typeName}</TableCell>
                <TableCell align="center">
                  <Link to={"/Dashboard/editObjet/"+row.objectId} >
                  <Button variant="contained" sx={{padding:"0px",maxWidth:'30px',minWidth:'30px',margin:"2px"}} color="warning" >
                  <CreateIcon/>
                  </Button>
                  </Link>
                  <Button variant='contained' color='error' sx={{padding:"0px",maxWidth:'30px',minWidth:'30px',margin:'5px' }} onClick={()=>{
                    deleteObjet(row.objetName)
                    getobjet(route.type)
                    }} ><DeleteIcon/>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}