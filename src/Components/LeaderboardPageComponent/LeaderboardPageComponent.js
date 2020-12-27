import React from 'react';
import './LeaderboardStyles.css';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {useSelector} from 'react-redux';

const LeaderboardPageComponent = () => {
    const user = useSelector(state => state.user);
    let result = user.movies ? user.movies : [] ;
    function RenderCard ({r}) {     
          return(  
            <Badge  anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} badgeContent={<b style={{fontSize:"20px"}}># {r.rank}</b>} color="error" overlap="circle">
            <Link to={`/movie/${r.id}`} className="cards cards--two"  >
              <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} alt="Cards Image"/>
              <span class="cards--two__rect"></span>
              <span class="cards--two__tri"></span>
              <p>{r.title}</p>
              <ul className="cards__list">
                <li>{r.votes} Votes</li>
              </ul>
            </Link>
            </Badge> 
          )
        }
    
    return (
        <div className="wrapper2">
            <header>
                <h1>LeaderBoard</h1>
            </header>
            <div className="card__collection clear-fix">
            {  
                result.length !== 0 ?
                (
                  result.map((resul) => (              
                  <RenderCard key={resul.id} r={resul}  />   
                  ))
                )
                :(<p>
                       Loading ....
                 </p>)
              }
            </div>
        </div>
    );
};

export default LeaderboardPageComponent;