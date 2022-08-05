import { AppBar,Button, Toolbar } from "@mui/material";
import logo from "../images/Elgazala.png"
import css from "./navbar.module.css"

export default function Navbar(props){
    return(
        <>
        <AppBar position="static" sx={{height:'75px'}}>
            <Toolbar>
                {props.children}
            </Toolbar>
        </AppBar>
        </>
    )
}