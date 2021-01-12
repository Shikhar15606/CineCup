import React, { useState } from 'react'
import {ACCESS_TOKEN} from '../../key/key'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {nominate} from '../../action/user_actions';
import {blackListMovie} from '../../action/movie_actions';
import {Button, Hidden} from '@material-ui/core'
import ShareButton from '../shareButton'
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

import Rating from '@material-ui/lab/Rating';

import { useAuth0 } from '@auth0/auth0-react';
function Result({ result, openPopup }) {
	const { getAccessTokenSilently } = useAuth0();
	const useStyles = makeStyles({
		
		but:{
			display:"flex",
			flexDirection:"row",
			alignItems:"center",
			justifyItems:"center"
		},
		button1:{
			position:'relative'
		}
	  });
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [btn,setbtn] = useState(false);
	const [blackbtn,setblackbtn] = useState(false);
	const Nominate = (e) => {
		e.preventDefault();
		console.log(result);
		const dataToSubmit = {
			Email: user.user.Email,
			movieId:result.id
		}
		console.log(dataToSubmit);
		dispatch(nominate(dataToSubmit));
	}
	const classes = useStyles();

	function BlacklistMovieAlert(e){
		e.preventDefault();
		swal({
		  title: 'Are you sure ?',
		  text: `${result.title} will be blacklisted and it's votes will be reduced to 0`,
		  icon:"warning",
		  dangerMode: true,
		  buttons: true,
		}).then((isConfirm) => {
		  if (isConfirm) {
			setblackbtn(true); 
			setbtn(true);
			BlacklistMovie(e);
		  }
	  })
	}

	const BlacklistMovie = async (e) => {
		
		e.preventDefault();
		const dataToSubmit = {
			movieId:result.id,
			movieName:result.title,
			token:ACCESS_TOKEN
		}
		console.log(dataToSubmit);
		dispatch(blackListMovie(dataToSubmit));
	}
 
	const isdisabled = (id) => {
		if(user.isLoggedIn && user.isVoting)
		{
			if (user.blacklist && user.blacklist.includes(id.toString()))
				return true;			
			else if(user && user.user && user.user.Nominations.length)
			{
				if(user.user.Nominations.length === 5 || user.user.Nominations.includes(id))
					return true;
			}
			return false;
		}
		return true;
	}
	const isblackdisabled = (id) => {
		if(user.isLoggedIn)
		{
			if(user && user.blacklist && user.blacklist.includes(id.toString()))
					return true;
			return false;
		}
		return true;
	}

	return (
		<div className="card_s">
       <div className="front_s" style={{backgroundImage: "url("+(`https://image.tmdb.org/t/p/w500/${result.poster_path}`)+")"}}>
       
    </div>
    <div className="back_s">
      <div style={{display:"flex",flexDirection:"column "}}>
		  <div>
		  <h2>{result.title}</h2>
		  <h3>{result.release_date}</h3>
		  <Rating precision="0.5" name="read-only" value={(result.vote_average)/2} readOnly />

		  </div>
        
		<div style={{display:"flex",flexDirection:"column",textAlign: "center",
	justifyContent: "center",
	alignItems: "center"
	}}>
		<Link to={`/movie/${result.id}`}   >
		<Button className="button_s" variant="outlined" color="secondary" style={{marginBottom:10}}>Explore</Button>
		</Link>
		<Button className="button_s" disabled={btn || isdisabled(result.id)} style={{marginBottom:10}}
		variant="outlined" color="primary" onClick={(e) => {setbtn(true); Nominate(e)}}>
			Nominate</Button>
		{
					user.user && user.user.IsAdmin ?
					<Button className="button_s"
					variant="outlined"
					color="secondary"
				
					disabled={blackbtn || isblackdisabled(result.id)}
					 onClick={(e) => {BlacklistMovieAlert(e)}}>Blacklist</Button>
					:
					<span>
					</span>
		}
		<div  className="share_but_s">
          <ShareButton 
          url={`https://cinecup-9b0ac.web.app/movie/${result.id}`}
           image={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            title={`${result.title} - ${result.overview} 
            Check out the trailer on this page`}
           />
        </div>
		</div>
		
      </div>
    </div></div>
	)
}

export default Result;


