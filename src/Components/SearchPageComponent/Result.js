import React from 'react'
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
function Result({ result, openPopup }) {
	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
			<img src={result.Poster} />
			<h3>{result.Title}</h3>
            <Button variant="contained" color="secondary" endIcon={<LocalMoviesIcon />}>
                Nominate</Button>
		</div>
	)
}

export default Result;