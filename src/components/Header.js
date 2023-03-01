import React, { useContext } from "react"
import { Link } from "react-router-dom"
import  Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Logo from "../logo.png"
import Watch from "../watch.png"
import { Context } from "../ContextProvider";


export default function(){
    const {watch} = useContext(Context)
    return(
            <Navbar>
                <Container>
                    <Navbar.Toggle/>
                    <div><Link to ="/"  className="bar-h1"><img src={Logo} style={{width: "140px"}}></img></Link></div>
                    <Navbar.Collapse className="justify-content-end">
                        <div className="ms-auto"><Link to ="/watchlist" className="bar-h2"><img src={Watch} style={{width :"240px"}}></img> <span style={{fontSize:"23px"}}>({watch?.length})</span></Link></div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>        
    )
}