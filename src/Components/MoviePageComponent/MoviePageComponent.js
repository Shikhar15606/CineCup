import {React,useState,useEffect } from 'react';
import YouTube from 'react-youtube';
import {useParams} from 'react-router-dom';
import {TMDB_API_KEY} from '../../key/key';
import axios from 'axios';
const MoviePageComponent = () => {
    const [result, setresult] = useState({});
    const [trailerurl , settrailerurl] = useState("");
    const { movie_id } = useParams();


    var apiurl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}`;
    useEffect(() =>{
      axios(apiurl)
      .then((data) => {
          console.log(result);
          setresult(data);
      })
    },[apiurl])
    var trailerapi = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${TMDB_API_KEY}`
    useEffect(()=>{
      axios(trailerapi)
      .then(({data} ) => {
        if(data && data.results && data.results.length && data.results[0].key)
        {
          console.log(data.results[0].key);
          settrailerurl(data.results[0].key);
        }
      })
    },[trailerapi])
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        },
      };
    return ( 
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {
              trailerurl ? 
              <YouTube videoId={trailerurl} opts={opts}  />
              :
              <div>
              </div>  
            }
            
        </div>
    );
};

export default MoviePageComponent;