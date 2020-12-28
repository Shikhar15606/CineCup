import React from 'react'
import './SearchPageStyle.css'
import Result from './Result'

function Results ({ results, openPopup,}) {
	if(results.length){
		return (
			<section className="wrapper">
				{
					results.map(result => (
					<Result key={result.id} result={result} openPopup={openPopup} />
					))
				}
			</section>
		)
	}
	else{
		return(
			<section className="results">
				<div style={{textAlign:"center",width:"100%",fontSize:"24px",color:"white"}}>
				Nothing Found
				</div>
			</section>
		)
	}
	
}

export default Results;