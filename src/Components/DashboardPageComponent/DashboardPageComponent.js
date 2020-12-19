import React,{useState,useEffect} from 'react';
import './DashboardStyle.css'
import {useSelector,useDispatch} from 'react-redux';
import {remove_nominate} from '../../action/user_actions';
import {TMDB_API_KEY} from '../../key/key';
import axios from  'axios';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { Link } from 'react-router-dom';
function DashboardPageComponent(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const User=useSelector(state=>state.user.user);
  const [resul,setResul]=useState([]);
  
  let nominations;
  if(user.isLoggedIn){
   nominations = User.Nominations;
  }
  else{
    nominations = [];
  }
  let results = [];
  
  
  
  useEffect(() =>{
    
    getMovieNominations();
   
  },[user.isLoggedIn])
  
  function getMovieNominations(){
   
    
    nominations.forEach(element => {
      axios(`https://api.themoviedb.org/3/movie/${element}?api_key=${TMDB_API_KEY}`)
      .then((res) => {
       
          let x=res.data
          results.push(x);

        
      
    })
    });
    console.log(results)
    
    setResul(results);
  
  }


  function RenderCard({result}){
    const Remove_Nominate = (e) => {
      e.preventDefault();
      
      const dataToSubmit = {
        Email: user.user.Email,
        movieId: result.id
      }
      console.log(dataToSubmit);
      dispatch(remove_nominate(dataToSubmit));
      getMovieNominations();
      
    }
      
      return(
        
          <Link to={`/movie/${result.id}`} className="card"  >
          <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
          <div className="info">
            <h1>{result.title}</h1>
            <Button variant="contained" color="secondary" onClick={(e) => {Remove_Nominate(e)}} endIcon={<LocalMoviesIcon />} className="but1">
              Remove</Button>
          </div>
          </Link>
      
      )}

    function RenderCards () {
      
        return (
            <section className="wrapper1">
              {
                resul.length > 0 ?
                (
                  resul.map((result) => (
                    
                  <RenderCard key={result.id} result={result} />   
                  ))

                )
                :(<p>
                       You have not nominated any movie
                 </p>)
              
              }
            
            </section>
        )
    }
        return (
          <>
          <div style={{marginTop:100}}>
            <h1>Your Nominations</h1>
          </div>
            <main>
              
           <RenderCards />
            </main>
            </>
        );
    
}

export default DashboardPageComponent;