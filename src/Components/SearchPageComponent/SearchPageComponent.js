import React, { useState,useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import {TMDB_API_KEY} from '../../key/key';

import Search from './Search'
import Results from './Results'
import Popup from './Popup'

function SearchPageComponent(){
  const [queryString, setqueryString] = useState("");
  const [results,setresults] = useState([]);
  const [selected,setselected] = useState({});
  const [isLoading,setisLoading] = useState(false);
  var apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${queryString}`;  
  
  const search = () => {
      console.log(queryString);
      if(queryString)
      {
      axios(apiurl)
      .then(({ data }) => {
        let results = data.results;
        setresults(results);
        console.log(results);
        setisLoading(false);
      })
      }
      else{
        axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`)
        .then(({ data }) => {
        let results = data.results;
        setresults(results);
        setisLoading(false);
      })
    }
  }
      
  const handleInput = (e) => {
    setisLoading(true);
    setqueryString(e.target.value);
  }

  useEffect(() => {
    search();
  },[queryString]);

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      console.log(result);
      setselected(result);
    });
  }
    
  const closePopup = () => {
    setselected({});
  }
    
    return (
      <div>
        <header>
          <h1>Movie Search</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search} />
          {
            !isLoading ?
            <React.Fragment>
              <Results results={results}/>
              {(typeof selected.Title != "undefined") ? <Popup selected={selected} closePopup={closePopup} /> : false}
            </React.Fragment>
            :
            <CircularProgress style={{marginTop:"20vw"}} />
          }
        </main>
      </div>
    );
     
}

export default SearchPageComponent;