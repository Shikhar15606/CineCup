import React from 'react';
import './SearchPageStyle.css';
import Result from './Result';
import Img2 from '../../icons/Asset 1@2x.png';
function Results({ results, openPopup }) {
  if (results.length) {
    return (
      <section className='wrapper'>
        {results.map(result => (
          <Result key={result.id} result={result} openPopup={openPopup} />
        ))}
      </section>
    );
  } else {
    return (
      <div className='results'>
        <img src={Img2} className='noresults' />
        <h2>Nothing found</h2>
      </div>
    );
  }
}

export default Results;
