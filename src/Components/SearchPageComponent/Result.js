import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {nominate} from '../../action/user_actions';
import {blackListMovie} from '../../action/movie_actions';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
function Result({ result, openPopup }) {

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

	const BlacklistMovie = (e) => {
		e.preventDefault();
		const dataToSubmit = {
			movieId:result.id
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
		
		<Link to={`/movie/${result.id}`} className="card"  >
			<img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
			<div className="info">
				<h1>{result.title}</h1>
				<Button variant="contained" color="secondary" disabled={btn || isdisabled(result.id)} onClick={(e) => {setbtn(true); Nominate(e)}} endIcon={<LocalMoviesIcon />} className="but1">
                 Nominate</Button>
				{
					user.user && user.user.IsAdmin ?
					<Button variant="contained" color="primary" disabled={blackbtn || isblackdisabled(result.id)} onClick={(e) => {setblackbtn(true); setbtn(true); BlacklistMovie(e)}} endIcon={<LocalMoviesIcon />} className="but1">
                 	BlackList</Button>
					:
					<span>
					</span>
				}
			</div>
		</Link>
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