import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {nominate} from '../../action/user_actions';
import {blackListMovie} from '../../action/movie_actions';
import {Button, Hidden} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
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
	const BlacklistMovie = async (e) => {
		// const token = await getAccessTokenSilently({
		// 	audience: 'https://cinecup-backend.herokuapp.com',
		// 	scope: 'read:posts',
		//   });
		e.preventDefault();
		const dataToSubmit = {
			movieId:result.id,
			movieName:result.title,
			token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlIUDdLZ0RYbjNyb1MyNVhtZnN6OSJ9.eyJpc3MiOiJodHRwczovL2Rldi0zeXFuLWdzeC5hdS5hdXRoMC5jb20vIiwic3ViIjoiZlFYT1R5N0RlSlB4Ynp0cVF3QmFzUTYwWEpLRE1mcmVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2luZWN1cC1iYWNrZW5kLmhlcm9rdWFwcC5jb20iLCJpYXQiOjE2MDk0MDQwMzksImV4cCI6MTYwOTQ5MDQzOSwiYXpwIjoiZlFYT1R5N0RlSlB4Ynp0cVF3QmFzUTYwWEpLRE1mcmUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QIxbWsGs1bfgVDgsICs6zqzVTMojjrvHmbnt-nBUK9LXlVe79GPvjY9jblF-qiPw8pCdsy9aTzSFKAuE4fiJbbYj_wjVDk3HgYA7n2eUB85KTOMnbsDkLqQ6GT4j29a3L07LuflVA84sWaIoxOu15aPcRDV0Vbm_ZieGsiDv-NJ6LXAxu3yfsPLziK3olcgY8QxmLft4iuC7unK0vxOURrc3VBB7M_XrU0B7Dz45phr9dA5MMSIiy_FozC-6YmTxb_nhOm9FCNL5bI83KwCPa_UqYDcaO_ArRkKLb4sk-ezRONeSCCVXVfGre7p8uMfUGa_3GqvuXsDelUahUQ70FA"
		}
		console.log(dataToSubmit);
		dispatch(blackListMovie(dataToSubmit));
	}
 
	const isdisabled = (id) => {
		if(user.isLoggedIn)
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
					 onClick={(e) => {setblackbtn(true); setbtn(true); BlacklistMovie(e)}}>Blacklist</Button>
					:
					<span>
					</span>
		}
		</div>
		
      </div>
    </div></div>
	)
}

export default Result;


/*


.wrapper
	.card
		img(src="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&fit=crop&w=667&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")
		.info
			h1 Mountain
			p Lorem Ipsum is simply dummy text from the printing and typeseting industry
			button Read More




*/


{/* <Link to={`/movie/${result.id}`} classNameName="card"  >
			<img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
			<div classNameName="info">
				<h1>{result.title}</h1>
				<Button variant="contained" color="secondary" disabled={btn || isdisabled(result.id)} onClick={(e) => {setbtn(true); Nominate(e)}} endIcon={<LocalMoviesIcon />} classNameName="but1">
                 Nominate</Button>
				{
					user.user && user.user.IsAdmin ?
					<Button variant="contained" color="primary" disabled={blackbtn || isblackdisabled(result.id)} onClick={(e) => {setblackbtn(true); setbtn(true); BlacklistMovie(e)}} endIcon={<LocalMoviesIcon />} classNameName="but1">
                 	BlackList</Button>
					:
					<span>
					</span>
				}
			</div>
		</Link> */}