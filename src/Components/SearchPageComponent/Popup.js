import React from 'react'
import './SearchPageStyle.css'
function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
			    <div className="con">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<br />
				
				</div>
				<div className="plot">
					<img src={selected.Poster} />
					<div className="pa"><p className="rating" ><span>IMDB Rating : </span>{selected.imdbRating} <br /><br/><span>Genre :</span>  {selected.Genre}<br></br><br></br><span>Actors : </span>{selected.Actors}<br></br><br></br>{selected.Plot}</p></div>
			       
				
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup;