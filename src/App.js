import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Details from "./components/Details";
import Search from './components/Search';
import WatchList from "./components/WatchList"
import Episodes from './components/Episodes';

function App() {
  return (
    
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element = {<Search />} />
        <Route path="/details" element = {<Details />} />
        <Route path="/watchlist" element = {<WatchList />} />
        <Route path="/details/episodes" element={<Episodes/>}/>
      </Routes>
    </div>
  );
}

export default App;
