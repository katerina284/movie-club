import React, {useState, createContext, useEffect, useRef} from "react";

const Context = createContext()

function ContextProvider({children}){
  const [form, setForm] = useState({
      type : "movie",
      title : ""    
    })


  const [movies, setMovies] = useState([])
  const [details, setDetails] = useState([])
  const [searching, setSearching] = useState(false)
  const [imdb, setImdb] = useState(JSON.parse(localStorage.getItem("imdb"))||{})
  const [page, setPage] = useState(1)
  const [seasons, setSeasons] = useState("")
  const [watch, setWatch] = useState(JSON.parse(localStorage.getItem("watch"))||[])
  const [episodes, setEpisodes] = useState([])
  const [episodeDetails, setEpisodeDetails] = useState(JSON.parse(localStorage.getItem("episodeDetails")))
  const [episodeID, setEpisodeID] = useState(JSON.parse(localStorage.getItem("episodeID")))



  function handleChange(event) {
      const {name, value } = event.target
      setForm(prevData => {
          return {
              ...prevData,
              [name]: value
          }
      })
  }

  function startSearching(){
    setSearching(prevS => !prevS)
    setPage(1)
  }

  function handleSubmit(e){
    e?.preventDefault();
    e?.target.reset();
  }

  function getDetails(id){
    setImdb(id)
    return imdb
  }

  function getPage(number){
    setPage(number)
    return page
  }

  function getSeason(number){
    setSeasons(`Season=${number}`)
  }

  function getEpisode(number){
    setEpisodeID(number)
    return episodeID
  }

  function addToWatchList(newMovie){
    setWatch(prevWatch => [...prevWatch, newMovie])
  }

  function removeFromWatchList(id){
    setWatch(prevWatch => prevWatch.filter(el => el.imdbID != id))
  }
  function useHover() {
    const [hover, setHover] = useState(false)
    const ref = useRef(null)

    function enter() {
        setHover(true)
    }

    function leave() {
        setHover(false)
    }
    

    useEffect(() => {
        ref.current?.addEventListener("mouseenter", enter)
        ref.current?.addEventListener("mouseleave", leave)

        return () => {
            ref.current?.removeEventListener("mouseenter", enter)
            ref.current?.removeEventListener("mouseleave", leave)
        }
    }, [])

    return [hover, ref]
}

  useEffect(()=>{
    localStorage.setItem("watch", JSON.stringify(watch))
  },[watch])
  //useEffect(() =>{
  //  localStorage.setItem("details",JSON.stringify(details))
  //},[details])
  useEffect(() =>{
    localStorage.setItem("episodeDetails",JSON.stringify(episodeDetails))
  },[episodeDetails])
  //useEffect(() =>{
  //  localStorage.setItem("episodes",JSON.stringify(episodes))
  //},[episodes])
  useEffect(() =>{
    localStorage.setItem("imdb",JSON.stringify(imdb))
  },[imdb])
  useEffect(() =>{
    localStorage.setItem("episodeID",JSON.stringify(episodeID))
    console.log(episodeID)
  },[episodeID])

  useEffect(() =>{
    let search = "s=".concat(form.title.split(" ").join("+")).concat("&")
    let active = true;
    const fetcData = async () => {
      setTimeout(async () =>{
        const response1 = await fetch(`https://www.omdbapi.com/?apikey=c2d24634&${search}type=${form.type}&page=${page}`);
        const newData1 = await response1.json();
        setMovies(newData1)
      }, Math.round(1000));
    };
    fetcData();
    return () => {
      active = false;
    }
  },[searching,page]);

    useEffect(() => {
        let active =true;
        const fetcData = async () => {
          setTimeout(async () =>{
              const response = await fetch(`https://www.omdbapi.com/?i=${imdb}&plot=full&apikey=c2d24634&`);
              const newData = await response.json();
              setDetails(newData);
        }, 0);
      };
        fetcData();
        return () => {
          active = false;
        }
      },[imdb]);

  useEffect(() => {
    let active =true;
    const fetcData = async () => {
      setTimeout(async () =>{
          const response = await fetch(`https://www.omdbapi.com/?i=${imdb}&plot=full&apikey=c2d24634&${seasons}&Episode=${episodeID}`);
          const newData = await response.json();
          setEpisodeDetails(newData);
    }, 0);
  };
    fetcData();
    return () => {
      active = false;
    }
  },[episodeID]);

  useEffect(() => {
    let active =true;
    const fetcData = async () => {
      setTimeout(async () =>{
          const response = await fetch(`https://www.omdbapi.com/?i=${imdb}&plot=full&apikey=c2d24634&${seasons}`);
          const newData = await response.json();
          setEpisodes(newData);
    }, Math.round(0));
  };
    fetcData();
    return () => {
      active = false;
    }
  },[seasons]);



    return(
        <Context.Provider value={{form, handleChange, movies,handleSubmit, startSearching, getDetails, details,
        addToWatchList, watch, useHover, removeFromWatchList, page, getPage, getSeason, episodes, episodeDetails, getEpisode}}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}