import React from 'react'
import './SearchPageStyle.css'
import Result from './Result'

function Results ({ results, openPopup }) {
	if(results){
		return (
			<section className="wrapper">
				{
					results.map(result => (
					<Result key={result.imdbID} result={result} openPopup={openPopup} />
					))
				}
			</section>
		)
	}
	else{
		return(
			<section className="results">
				Nothing Found ...
			</section>
		)
	}
	
}

export default Results;