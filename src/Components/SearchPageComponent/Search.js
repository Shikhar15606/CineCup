import React from 'react'
import './SearchPageStyle.css'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import {Button} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux';
function Search ({ handleInput }) {
	const user = useSelector(state => state.user);
	return (
		<section className="searchbox-wrap">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="searchbox" 
				onChange={handleInput}
				value={user.queryString}
			/>
		</section>
	)
}

export default Search;