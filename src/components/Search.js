import React from "react"
import { useContext, useState, useEffect } from "react"
import { Context } from "../ContextProvider"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Movies from "./Movies";
import Container from 'react-bootstrap/Container';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Fade from "react-bootstrap/Fade";
import { DotLoader } from "react-spinners";
import Pagination from "react-bootstrap/Pagination";

export default function Search(){
    const {form, handleChange, handleSubmit, movies, startSearching, page, getPage} = useContext(Context)
    const [start, setStart] = useState(false)
    function Start(){
        setStart(true)
    }
    const movieImages= movies?.Search?.map(item =>(
        <Movies key ={item.title} 
        movie = {item}
        title ={item.Title} 
        src = {item.Poster}
        id = {item.imdbID}
        type = {item.Type}/>
        ))
    let items =[];
    if(page<5){
        for (let number=1; number<=5; number++){
        number<=Math.round(movies.totalResults/10) &&
        items.push(
            <Pagination.Item key={number} onClick={()=>getPage(number)} active={page===number}>
                {number}
            </Pagination.Item>
        )
    }
    }
    else if(page<Math.round(movies.totalResults/10)){
        for(let number=page-2; number<= page+2;number++ )
        number<=Math.round(movies.totalResults/10) &&
        items.push(
            <Pagination.Item key={number} style={{color: "black"}}  onClick={()=>getPage(number)} active={page===number}>
                {number}
            </Pagination.Item>
        )
    }
    else{
        for(let number=page-5; number<= Math.round(movies.totalResults/10);number++ )
        number<=Math.round(movies.totalResults/10) &&
        items.push(
            <Pagination.Item key={number} onClick={()=>getPage(number)} active={page===number}>
                {number}
            </Pagination.Item>
        )
    }
    

    


    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: movieImages?.length>6 ? 6 : movieImages?.length 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }; 

    return(
        <div >
            <Container fluid>
                <Row>
                    <Form className="form" onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center ">
                        <Form.Group as={Col} xs lg="2">
                            <Form.Select
                                value={form.type}
                                onChange={handleChange}
                                name="type">
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} xs lg="4">
                            <Form.Control
                                className="input"
                                name="title"
                                type="text"
                                placeholder = "search movies or series"
                                onChange={handleChange}
                                value={form.title} >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs lg="1">
                            <Button variant="dark" className="input" onClick={()=>{startSearching();Start()}} type="submit" >Search</Button>  
                        </Form.Group>
                    </Row>                                     
                    </Form> 
                </Row>
                <Row style={{marginTop: "40px"}} >
                    {movies?.totalResults>0?  
                    <Fade in={true} timeout={1000}>
                        <div>
                            <Pagination >
                               <Pagination.First onClick={()=>getPage(1)} />
                               <Pagination.Prev onClick={()=>getPage(page-1)} disabled={page===1}/>
                               {items}
                               <Pagination.Next onClick={()=>getPage(page+1)} disabled={page===Math.round(movies.totalResults/10)}/>
                               <Pagination.Last onClick={()=>getPage(Math.round(movies.totalResults/10))} />
                            </Pagination>
                            <Carousel partialVisible={false} responsive={responsive} showDots={true}
                                infinite={true}
                                centerMode={true}
                                autoPlay={true}
                                keyBoardControl={true}
                                renderDotsOutside = {true}
                                autoPlaySpeed={3000}>
                              {movieImages}
                            </Carousel>
                        </div>                        
                    </Fade>  :
                    start? <div style={{marginLeft : "500px"}}><DotLoader color="blue" size={200}/></div> : <h1></h1>
                    }
                             
                    
                </Row>                                
            </Container>
            
                         
                {movies?.Error === "Movie not found!" && 
                <div className="try-again">
                   <h1 style={{color : "whitesmoke"}}> {movies.Error} </h1>
                   <Button onClick={() =>window.location.reload()} variant="danger">Try Again</Button>
                </div>}
            </div> 
    )
}