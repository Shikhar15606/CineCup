import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {nominate} from '../../action/user_actions';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
function Result({ result, openPopup }) {

	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const Nominate = (e) => {
		e.preventDefault();
		const dataToSubmit = {
			Email: user.user.Email,
			movieId:result.imdbID
		}
		console.log(dataToSubmit);
		dispatch(nominate(dataToSubmit));
	}

	return (
		
		<Link to={`/movie/${result.id}`} className="card"  >
			<img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
			<div className="info">
				<h1>{result.title}</h1>
				<Button variant="contained" color="secondary" onClick={(e) => {Nominate(e)}} endIcon={<LocalMoviesIcon />} className="but1">
                 Nominate</Button>
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