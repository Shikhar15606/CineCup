import React from 'react'
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
function Result({ result, openPopup }) {
	return (
		// <div className="result" onClick={() => openPopup(result.imdbID)}>
		// 	<img src={result.Poster} />
		// 	<h3>{result.Title}</h3>
        //     <Button variant="contained" color="secondary" endIcon={<LocalMoviesIcon />}>
        //         Nominate</Button>
		// </div>

		<div className="card"  >
			<img src={result.Poster} />
			<div className="info">
				<h1>{result.Title}</h1>
				<Button variant="contained" color="secondary" endIcon={<LocalMoviesIcon />} className="but1">
                 Nominate</Button>
			</div>
		</div>
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