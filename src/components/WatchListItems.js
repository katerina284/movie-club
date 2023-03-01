import React, { useState } from "react"
import { useContext} from "react"
import { Context } from "../ContextProvider"
import { Link } from "react-router-dom"
import noImage from "../no-image.png"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"
import Add from "../add.png"


export default function WatchListItems(props){
    const {getDetails, removeFromWatchList} = useContext(Context)
    const img = props.src === "N/A" ? noImage : props.src
    const [cola, setCola] = useState(true)
    function Remove(){
        setCola(false)
        setTimeout(()=>{
            removeFromWatchList(props.id)
        },[1000])
        
    }
    return(
        <Collapse in={cola}>
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col md={3}>
                    <img className = "watch-img"src={img} style={{width : "150px"}}></img>
                   <Button onClick={() =>Remove()} style={{width:"150px", fontSize:"80" }} variant="dark">Remove from  <img style={{width:"17px"}} src={Add}/></Button>                
                    </Col>
                    <Col md={9} style={{marginTop: "50px"}}>
                    <h5 style={{color : "whitesmoke"}}>{props.title}</h5>  
                    <h5 style={{color : "whitesmoke", fontSize: "15px"}}>Year: {props.year}</h5>          
                   <Link to = "/details" className="watch-link"><h5 onClick={()=>{getDetails(props.id)}}>Show Details</h5></Link>
                    </Col>
                   
                </Row>
            </Container>        
        </Collapse>
        
    )
}