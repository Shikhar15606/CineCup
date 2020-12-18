import React,{useState,useEffect} from 'react';
import './DashboardStyle.css'
import {useSelector} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import axios from  'axios';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
function DashboardPageComponent(){
  const user = useSelector(state => state.user);
 const User=useSelector(state=>state.user.user);
 {
   user.isLoggedIn && console.log(User.Nominations);
 }
 
  const movie_id=577922;
  const [result,setresult] = useState({});
  var apiurl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}`;
  useEffect(() =>{
    axios(apiurl)
    .then((res) => {
       let x=res.data
        console.log(x);
        setresult(x);
    })
  },[apiurl])

    const RenderCards = () => {
        return(
          <div className='card1'>
          <div className='card_left'>
            <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
          </div>
          <div className='card_right'>
            <h1>{result.title}</h1>
            <div className='card_right__details'>
              <ul>
                <li>2003</li>
                <li>111 min</li>
                <li>Action</li>
              </ul>
              <div className='card_right__rating'>
                {/* <div className='card_right__rating__stars'>
                  <fieldset className='rating'>
                    <input id='star10' name='rating' type='radio' value='10' />
                    <label className='full' for='star10' title='10 stars'></label>
                    <input id='star9half' name='rating' type='radio' value='9 and a half' />
                    <label className='half' for='star9half' title='9.5 stars'></label>
                    <input id='star9' name='rating' type='radio' value='9'/>
                    <label className='full' for='star9' title='9 stars'></label>
                    <input id='star8half' name='rating' type='radio' value='8 and a half'/>
                    <label className='half' for='star8half' title='8.5 stars'></label>
                    <input id='star8' name='rating' type='radio' value='8'/>
                    <label className='full' for='star8' title='8 stars'></label>
                    <input id='star7half' name='rating' type='radio' value='7 and a half'/>
                    <label className='half' for='star7half' title='7.5 stars'></label>
                    <input id='star7' name='rating' type='radio' value='7'/>
                    <label className='full' for='star7' title='7 stars'></label>
                    <input id='star6half' name='rating' type='radio' value='6 and a half'/>
                    <label className='half' for='star6half' title='6.5 stars'></label>
                    <input id='star6' name='rating' type='radio' value='6'/>
                    <label className='full' for='star6' title='6 star'></label>
                    <input id='star5half' name='rating' type='radio' value='5 and a half'/>
                    <label className='half' for='star5half' title='5.5 stars'></label>
                    <input id='star5' name='rating' type='radio' value='5'/>
                    <label className='full' for='star5' title='5 stars'></label>
                    <input id='star4half' name='rating' type='radio' value='4 and a half'/>
                    <label className='half' for='star4half' title='4.5 stars'></label>
                    <input id='star4' name='rating' type='radio' value='4'/>
                    <label className='full' for='star4' title='4 stars'></label>
                    <input id='star3half' name='rating' type='radio' value='3 and a half'/>
                    <label className='half' for='star3half' title='3.5 stars'></label>
                    <input id='star3' name='rating' type='radio' value='3'/>
                    <label className='full' for='star3' title='3 stars'></label>
                    <input id='star2half' name='rating' type='radio' value='2 and a half'/>
                    <label className='half' for='star2half' title='2.5 stars'></label>
                    <input id='star2' name='rating' type='radio' value='2'/>
                    <label className='full' for='star2' title='2 stars'></label>
                    <input id='star1half' name='rating' type='radio' value='1 and a half'/>
                    <label className='half' for='star1half' title='1.5 stars'></label>
                    <input id='star1' name='rating' type='radio' value='1'/>
                    <label className='full' for='star1' title='1 star'></label>
                    <input id='starhalf' name='rating' type='radio' value='half'/>
                    <label className='half' for='starhalf' title='0.5 stars'></label>
                  </fieldset>
                </div> */}
              </div>
              <div className='card_right__review'>
                <p>{result.overview}</p>
               
              </div>
              <div className='card_right__button'>
              <Button variant="contained" color="secondary"   endIcon={<LocalMoviesIcon />} className="but1">
                 Remove</Button>
              </div>
            </div>
          </div>
        </div>

        )
    }
        return (
            <div>
              
           <RenderCards />
            </div>
        );
    
}

export default DashboardPageComponent;