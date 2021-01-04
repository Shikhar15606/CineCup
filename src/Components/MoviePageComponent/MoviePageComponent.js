import {React,useState,useEffect } from 'react';
import YouTube from 'react-youtube';
import {useParams} from 'react-router-dom';
import {TMDB_API_KEY} from '../../key/key';
import axios from 'axios';
import './MoviePageStyle.css'
import ShareButton from '../shareButton'
const MoviePageComponent = () => {
    const [result, setresult] = useState({});
    const [trailerurl , settrailerurl] = useState("");
    const { movie_id } = useParams();
    const [cast,setCast]=useState([]);
    const [reviews,setReviews]=useState([]);

    var creditsapi = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${TMDB_API_KEY}`
    useEffect(()=>{
      axios(creditsapi)
      .then(({data} ) => {
        if(data && data.cast && data.cast.length )
        {
          console.log(cast)
          setCast(data.cast);
        }
      })
      
    },[])

    var reviewsapi = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${TMDB_API_KEY}`
    useEffect(()=>{
      axios(reviewsapi)
      .then(({data} ) => {
        if(data && data.results && data.results.length )
        {
          
          setReviews(data.results);
          console.log(reviews)
        }
      })
      
    },[])



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
		<img src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
		<div className="overlay">
			<h1>{result.title}</h1>
			<h4>{result.runtime} min | {result.release_date}</h4>
      {/* <h4>{result.genres[0].name}</h4> */}
      <div  className="share_but_m">
          <ShareButton 
          url={`https://cinecup-9b0ac.web.app/movie/${result.id}`}
           image={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            title={`${result.title} - ${result.overview} 
            Check out the trailer on this page`}
           />
        </div>
		</div>
	</div>
  {/* <div className="descrip">
   
       {
        
        cast.slice(0,3).map((x)=>{
          return <span>{x.name}</span>
        })
        
      }
      
    </div> */}
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
    <div className="cast_wrapper">
    <h1 className="reviews_header">
      CAST
      </h1>
      <div className="cast_data">
      {
        
        cast.slice(0,5).map((x)=>{
          return <div className="cast_1">
            <img src={`https://image.tmdb.org/t/p/original/${x.profile_path}`}  className="cast_image"/>
            <span>{x.name}</span>
            </div>
        })
        
      }

      </div>
    
    </div>
    <div className="reviews_wrapper">
      <h1 className="reviews_header">
        REVIEWS
      </h1>
    <div class="container">

<div class="reviews">
   {
     (reviews.length!=0)?
      (
      reviews.slice(0,5).map((x)=>{
        return <div class="column is-4 testimonial-wrapper">
      <div class="testimonial">
      <p class="quote"> {x.content.slice(0,100)}</p>
      <p class="attribution">- {x.author}</p>
    </div>
  </div>
      })
      ):
      <h2 className="text_re">No reviews found</h2>
    }
    </div>
    
		
	

	</div>
</div>
	</div>
	</div>
 </div>
    );
};

export default MoviePageComponent;