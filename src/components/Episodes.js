import { useContext } from "react"
import { Context } from "../ContextProvider"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Fade from "react-bootstrap/Fade"
import noImage from "../no-image.png"
import { Link } from "react-router-dom"

export default function Episodes(){
    const {episodeDetails} = useContext(Context)
    const img = episodeDetails?.Poster === "N/A" ? noImage : episodeDetails?.Poster
    return (
        <main >
            { episodeDetails.Response === "False"?
            <h1>{episodeDetails.Error}</h1>: 
            <Fade in={true} timeout={4000} appear={true} unmountOnExit={true}>
                 <Container style={{color : "white", marginTop: "15px"}}>
                    <Row>
                        <Col>
                           <img style={{width:"300px"}} src={img}></img>                
                        </Col>
                        <Col>
                           <Row style={{marginTop:"20px"}}><h3>{episodeDetails.Title}</h3></Row>
                           <Row><p>Season: {episodeDetails.Season<9 ? "0".concat(episodeDetails.Season) : episodeDetails.Season} Episode: {episodeDetails.Episode<9 ? "0".concat(episodeDetails.Episode) : episodeDetails.Episode}</p></Row>
                           <Row style={{marginTop:"20px"}}><p>{episodeDetails.Released} | {episodeDetails.Runtime}</p></Row>
                           <Row style={{marginTop:"20px"}}><p>Genre : {episodeDetails.Genre}</p></Row>
                           <Row style={{marginTop:"20px"}}><p>IMDB rating : {episodeDetails.imdbRating}⭐</p></Row>
                           <Row style={{marginTop:"20px"}}><p>{episodeDetails.Plot}</p></Row>
                        </Col>
                    </Row>                
                </Container>  
            </Fade>                         
            }
            <Link to = '/'>
                <Button style={{marginBottom:"15px"}}>Search More Movies</Button>
            </Link>
        </main>
    )
}
