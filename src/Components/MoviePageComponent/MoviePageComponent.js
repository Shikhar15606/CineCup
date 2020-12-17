import {React,useState,useEffect } from 'react';
import YouTube from 'react-youtube';
import {useParams} from 'react-router-dom';
import axios from 'axios';
const MoviePageComponent = () => {
    const [result, setresult] = useState({});
    const [trailerurl , settrailerurl] = useState("");
    const { movie_id } = useParams();


    var apiurl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=d433493a9a93fffdb39baa4775ccc67a`
    useEffect(() =>{
      axios(apiurl)
      .then((data) => {
          console.log(result);
          setresult(data);
      })
      .catch((error) => {
        alert(error);
      })
    },[apiurl])
    var trailerapi = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=d433493a9a93fffdb39baa4775ccc67a`
    useEffect(()=>{
      axios(trailerapi)
      .then(({data} ) => {
        if(data && data.results && data.results.key)
        {console.log(data.results[0].key);
        settrailerurl(data.results[0].key);}
        else{
          alert("No trailer Available");
        }
      })
      .catch((error) => {
        alert(error);
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
            <YouTube videoId={trailerurl} opts={opts}  />
        </div>
    );
};

export default MoviePageComponent;