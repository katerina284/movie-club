import React from "react"
import { useContext, useState } from "react"
import { Context } from "../ContextProvider"
import { Link } from "react-router-dom"
import noImage from "../no-image.png"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Fade  from "react-bootstrap/Fade"
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';

export default function Details(){
    const {details, getSeason, episodes, getEpisode} = useContext(Context) 
    const [number, setNumber] = useState(0) 
    const [selectEpisode, setSelectEpisode] = useState(0)
    const img = details?.Poster === "N/A" ? noImage : details?.Poster
    let Seasons = []
    let EpisodesDis = []
    for(let i=1;i<=details.totalSeasons;i++){
        Seasons.push(
            <Dropdown.Item key={i} onClick={() => {getSeason(i);setNumber(i)}}>
                Season {i}
            </Dropdown.Item>
        )        
    }
    for(let i=0; i<episodes?.Episodes?.length;i++){
        EpisodesDis.push(
            <Dropdown.Item key={i} onClick={()=>setSelectEpisode(i+1)} >
                {episodes?.Episodes[i]?.Title}
            </Dropdown.Item>
        )
    }


    return(
        <main className="detail--page">
            { details.Response === "False"?
            <h1>{details.Error}</h1>: 
            <Fade in={true} timeout={4000} appear={true} unmountOnExit={true}>
                 <Container style={{color : "white", marginTop: "15px"}}>
                    <Row style={{marginTop:"20px", marginBottom: "10px"}}><h1>{details.Title}</h1></Row>
                    <Row>
                        <Col>
                           <img style={{width:"350px"}} src={img}></img>                
                        </Col>
                        <Col>
                           <Accordion className="accordion-overflow">
                            {details.Actors!="N/A"&&<Accordion.Item eventKey="0">
                                <Accordion.Header >
                                    <div style={{color: "whitesmoke"}}>Actors</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {details.Actors}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Director!="N/A"&&<Accordion.Item eventKey="1">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Director</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {details.Director}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Writer!="N/A"&&<Accordion.Item eventKey="2">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Writer</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {details.Writer}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Released && <Accordion.Item eventKey="3">
                                <Accordion.Header >
                                    <div style={{color: "whitesmoke"}}>Release Day</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {details.Released}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Genre!="N/A"&&<Accordion.Item eventKey="4">
                                <Accordion.Header >
                                    <div style={{color: "whitesmoke"}}>Genre</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {details.Genre}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.imdbRating!="N/A"&&<Accordion.Item eventKey="5">
                                <Accordion.Header >
                                    <div style={{color: "whitesmoke"}}>IMDB Rating</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.imdbRating}⭐ ({details.imdbVotes})
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Awards!="N/A"&&<Accordion.Item eventKey="6">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Awards</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.Awards}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Country!="N/A"&&<Accordion.Item eventKey="7">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Country</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.Country}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Language!="N/A"&&<Accordion.Item eventKey="8">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Language</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.Language}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Runtime!="N/A"&&<Accordion.Item eventKey="9">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Runtime</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.Runtime}
                                </Accordion.Body>
                            </Accordion.Item>}
                            {details.Plot!="N/A"&&<Accordion.Item eventKey="10">
                                <Accordion.Header>
                                <div style={{color: "whitesmoke"}}>Plot</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                {details.Plot}
                                </Accordion.Body>
                            </Accordion.Item>}
                           </Accordion>
                           </Col>
                           {details?.Type==="series" &&  <Row style={{marginTop:"15px"}}>
                            <Col md={2}></Col>
                            <Col md={3}><p>Search for episodes : </p></Col>
                            <Col md={1}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" size="sm">
                                        Season {number>0 ? number : "  "}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark" className="overflow">
                                        {Seasons}
                                    </Dropdown.Menu>
                                 </Dropdown>                                     
                            </Col> 
                            <Col md={1} style={{marginLeft:"10px"}}>
                            <Dropdown>
                                    <Dropdown.Toggle variant="dark" size="sm">
                                        Episode {selectEpisode>0 ? selectEpisode : "  "}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark" className="overflow">
                                        {number>0 ? EpisodesDis : <Dropdown.Item> Select Season</Dropdown.Item>}
                                    </Dropdown.Menu>                                   
                                 </Dropdown>                             
                            </Col> 
                            <Col md={2}>
                            <Link to = {selectEpisode>0 ? '/details/episodes' : '#'}><Button disabled={selectEpisode===0} size="sm" variant="dark" onClick={()=>getEpisode(selectEpisode)}>Search</Button></Link>
                            </Col>
                            <Col md={3}></Col>   
                           </Row>}
                    </Row>                
                </Container>  
            </Fade>                         
            }
            <Link to = '/'>
                <Button variant="dark" style={{marginBottom:"15px", marginTop:"15px"} }>Search More Movies</Button>
            </Link>
        </main>
    )
    
}