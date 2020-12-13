  
import React, { useState } from 'react'
import axios from 'axios'

import Search from './Search'
import Results from './Results'
import Popup from './Popup'
function SearchPageComponent(){
    
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {}
      });
      var apiurl = "https://www.omdbapi.com/?apikey=f84b077c";
    
      const search = (e) => {
         {
          axios(apiurl + "&s=" + state.s).then(({ data }) => {
            let results = data.Search;
    
            setState(prevState => {
              return { ...prevState, results: results }
            })
          });
        }
      }
      
      const handleInput = (e) => {
        let s = e.target.value;
    
        setState(prevState => {
          return { ...prevState, s: s }
        });
      }
    
      const openPopup = id => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
          let result = data;
    
          console.log(result);
    
          setState(prevState => {
            return { ...prevState, selected: result }
          });
        });
      }
    
      const closePopup = () => {
        setState(prevState => {
          return { ...prevState, selected: {} }
        });
      }
    
      return (
        <div >
          <header >
            <h1>Movie Search</h1>
          </header>
          <main>
            <Search handleInput={handleInput} search={search} />
    
            <Results results={state.results} openPopup={openPopup} />
    
            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
          </main>
        </div>
      );
     
}

export default SearchPageComponent;