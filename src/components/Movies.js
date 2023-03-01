import React from "react"
import { useContext} from "react"
import { Context } from "../ContextProvider"
import { Link } from "react-router-dom"
import noImage from "../no-image.png"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Add from "../add.png"


function Movies(props){
    const {getDetails, addToWatchList, removeFromWatchList, useHover, watch} = useContext(Context)
    const ref = useHover()
    const img = props.src === "N/A" ? noImage : props.src
    function addRemove(){
        const found = watch?.some(el => el.imdbID === props.id)
        if(found){
            return <Button variant="dark" onClick={() =>removeFromWatchList(props.id)} style={{fontSize:"11px" ,width: "130px"}}>Remove from  <img style={{width:"15px"}} src={Add}/></Button>
        }
        else {
            return <Button variant="dark" onClick={() =>addToWatchList(props.movie)} style={{fontSize:"11px" ,width: "130px"}}>Add to <img style={{width:"15px"}} src={Add}/></Button>
        }
    }

    return(
        <div ref={ref}>
            <Card style={{ minHeight:"24rem", width: '10em', backgroundColor: "rgb(20, 18, 18)"}} >
                <Card.Img variant="top" src ={img} style={{maxHeight:"300px"}}/>
                <Card.Body>                    
                    <h6 style={{color: "white", fontSize: "12px"}}>{props.title}</h6>
                    { addRemove() }        
                </Card.Body>
                <Card.Footer>
                    <Link to = "/details">
                       <h6 onClick={() => getDetails(props.id)} style={{fontSize:"12px"}}>Details</h6>
                     </Link>
                </Card.Footer>
            </Card>            
        </div>
               
              
    )
}

export default Movies