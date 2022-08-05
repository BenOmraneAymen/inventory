import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import css from './list.module.css'
import axios from 'axios';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useParams } from 'react-router-dom';

export default function BasicList() {
  const [type,setType] = React.useState([])
  let typeParam = useParams()


const getType = async () => {
  await axios.post("http://localhost:4000/types/data",{userId:1}).then((res)=>{
    console.log(res)
    setType(res.data)
  })
}

React.useEffect(()=>{
  getType()
},[])



  return (
      <nav aria-label="main mailbox folders">
        <List sx={{width:200,backgroundColor:'' }} >
        <ListItem disablePadding sx={{backgroundColor:"#1976D2",borderRadius:"3px"}}>
          <ListItemText primary={"Categorie"} sx={{color:"#ffffff"}} />
          <Link to='/Dashboard/editType'>
          <Button variant="contained" sx={{padding:"0px",maxWidth:'30px',minWidth:'30px',margin:"2px"}} color="warning" >
          <CreateIcon/>
          </Button>
          </Link>
        </ListItem>
        <ListItem disablePadding className={(typeParam.type=='all') ? css['highligtedListButton'] : css['normalListButton']}  >
          <Link to='/dashboard/All' className={css['listButton']} >
            <ListItemText primary={'All'} sx={{color:"#2F2C28"}} />
          </Link>
        </ListItem>
        {type.map((t)=>{
          let path = "/dashboard/"+t.typeName
          let cssClass = ''
          if(t.typeName==typeParam.type){
            cssClass = 'highligtedListButton'
          }else{
            cssClass = 'normalListButton'
          }
          return <ListItem disablePadding className={css[cssClass]}>
          <Link to={path} className={css['listButton']} >
            <ListItemText primary={t.typeName} sx={{color:"#2F2C28"}} />
          </Link>
        </ListItem>
        })}
        </List>
      </nav>
  );
}