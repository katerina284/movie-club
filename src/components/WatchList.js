import React from "react"
import { useContext, useState, useEffect } from "react"
import { Context } from "../ContextProvider"
import WatchListItems from "./WatchListItems"
import Collapse from "react-bootstrap/Collapse"

export default function WatchList(){
    const {watch} = useContext(Context)
    const list = watch?.map(el =>(
        <WatchListItems 
        key={el.Title}
        id = {el.imdbID}
        title = {el.Title}
        src = {el.Poster}
        year = {el.Year}
        />
    ))
    return(
        <Collapse in={true} appear={true} timeout={40000}>
            <div>
               { list }  
            </div>            
        </Collapse>
        
    )
}