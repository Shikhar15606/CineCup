import {React,useState,useEffect } from 'react';
import YouTube from 'react-youtube';
import {useParams} from 'react-router-dom';
import {TMDB_API_KEY} from '../../key/key';
import axios from 'axios';
import './MoviePageStyle.css'
const MoviePageComponent = () => {
    const [result, setresult] = useState({});
    const [trailerurl , settrailerurl] = useState("");
    const { movie_id } = useParams();


    var apiurl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}`;
    useEffect(() =>{
      axios(apiurl)
      .then((res) => {
          console.log(result);
          setresult(res.data);
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
        
        playerVars: {
          
          autoplay: 0
        },
      };
    return ( 
        <div>
           <div className="main1">
	<div className="image">
		<img src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`} />
		<div className="overlay">
			<h1>{result.title}</h1>
			<h4>{result.runtime} min | {result.release_date}</h4>
      {/* <h4>{result.genres[0].name}</h4> */}
		</div>
	</div>
	<div className="afterImage">
		<div className="left1">
			<h3>Description</h3>
			<p>{result.overview}			</p>
		</div>
		<div className="right1">
    {
              trailerurl ? 
              <YouTube videoId={trailerurl} className="trail" opts={opts}  />
              :
              (
              <div>
              </div>
              )  
            }
     
		</div>
	</div>
	</div>
 </div>
    );
};

export default MoviePageComponent;