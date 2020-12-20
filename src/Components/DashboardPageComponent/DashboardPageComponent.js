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
  const [result,setresult] = useState([]);  

  //======================================Fetching data from internet ===========================
  const getMovieNominations = () => {
    let arr = [];
    user.user.Nominations.forEach(element => {
      axios(`https://api.themoviedb.org/3/movie/${element}?api_key=${TMDB_API_KEY}`)
      .then((res) => {
          let x=res.data
          arr.push(x);  
      })
    });
    setresult(arr);
  }
  //=========================================== Render Card =========================================

  function RenderCard({r}){
    const Remove_Nominate = (e) => {
      e.preventDefault();
      const dataToSubmit = {
        Email: user.user.Email,
        movieId: r.id
      }
      console.log(dataToSubmit);
      dispatch(remove_nominate(dataToSubmit));
      let array = result;
      let cardIndex = array.indexOf(r);
      if(cardIndex !== -1)
      {
        array.splice(cardIndex, 1);
        setresult(array);
      }
    }      

      return(
          <Link to={`/movie/${r.id}`} className="card"  >
          <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} />
          <div className="info">
            <h1>{r.title}</h1>
            <Button variant="contained" color="secondary" onClick={(e) => {Remove_Nominate(e)}} endIcon={<LocalMoviesIcon />} className="but1">
              Remove</Button>
          </div>
          </Link>
      )
    }
    // ===================================================================================================
  useEffect(() =>{
    if(user.isLoggedIn){
      getMovieNominations();
      console.log("Render Card Chala")
      console.log(result);
     }
  },[user.isLoggedIn])
  // Main Return from this component
        return (
        <React.Fragment>
          <div style={{marginTop:100}}>
            <h1>Your Nominations</h1>
          </div>
          <main>
          <section className="wrapper1">
              {
                console.log(result,result.length)}
              {  
                result.length !== 0 ?
                (
                  result.map((resul) => (              
                  <RenderCard key={resul.id} r={resul} />   
                  ))
                )
                :(<p>
                       You have not nominated any movie
                 </p>)
              }
            </section>
          </main>
        </React.Fragment>
        );
}

export default DashboardPageComponent;