import React from 'react'
import './SearchPageStyle.css'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import {Button} from '@material-ui/core'
function Search ({ handleInput }) {
	return (
		<section className="searchbox-wrap">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="searchbox" 
				onChange={handleInput}
			/>
		</section>
	)
}

export default Search;