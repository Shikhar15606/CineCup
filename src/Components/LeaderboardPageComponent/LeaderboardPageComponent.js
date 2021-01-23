import React, { useEffect } from 'react';
import './LeaderboardStyles.css';
import { Link } from 'react-router-dom';
import Img2 from '../../icons/Asset 1@2x.png';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import ScrollToTop from '../scrollToTop';
import ShareButton from '../shareButton';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hidden } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    alignSelf: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor: fade(theme.palette.common.black, 0.45),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.55),
    },
    width: '100%',
  },
  inputInput: {
    color: 'white',

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    maxWidth: 600,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 200,

    display: 'flex',
    flexDirection: 'row',
  },
}));
const LeaderboardPageComponent = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  let result = user.movies ? user.movies : [];
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  if (user.isLoading)
    return (
      <CircularProgress
        style={{ marginTop: '25vw' }}
        color='secondary'
      ></CircularProgress>
    );
  return (
    <div className='wrapper2'>
      <div className='wrapper_history'>
        <div className='list'>
          <div className='list__header'>
            <h1>Leaderboard</h1>
            <Hidden mdDown>
              {result.length !== 0 && (
                <InputBase
                  placeholder='Search…'
                  className='searchbox'
                  inputProps={{ 'aria-label': 'search', id: 'sear' }}
                  onChange={() => {
                    var all = document
                      .getElementById('list-table')
                      .getElementsByClassName('list__row');

                    console.log(all);
                    for (var i = 0; i < all.length; i++) {
                      var txtValue = all[i].innerText;
                      console.log(txtValue);
                      if (
                        txtValue
                          .toLowerCase()
                          .includes(document.getElementById('sear').value)
                      ) {
                        all[i].style.display = '';
                      } else {
                        all[i].style.display = 'none';
                      }
                    }
                  }}
                />
              )}
            </Hidden>
          </div>
          {result.length !== 0 ? (
            <div className='list__body'>
              <table className='list__table' id='list-table'>
                <tr className='header_row'>
                  <th className='list__cell'>Rank</th>
                  <th className='list__cell'>Movie</th>
                  {/* <th className="list__cell">Genre</th> */}
                  <th className='list__cell'>Votes</th>
                  <th class='list__cell'>Explore</th>
                </tr>

                {result.map(resul => (
                  <tr className='list__row'>
                    <td className='list__cell'>
                      <span className='list__value'>{resul.rank}</span>
                    </td>
                    <td className='list__cell'>
                      <span className='list__value'>{resul.title}</span>
                    </td>
                    {/* <td className="list__cell">
           {
         resul.genres.slice(0,1).map(genre=>{
          return <span> {genre.name} </span>
        })
        }</td> */}

                    <td className='list__cell'>
                      <span className='list__value'>{resul.votes}</span>
                    </td>
                    <td className='list__cell'>
                      <Link to={`/movie/${resul.id}`}>
                        <span class='list__value'>
                          <FontAwesomeIcon icon={faArrowCircleRight} />
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <div className='results'>
              <img src={Img2} className='noresults' />
              <h3>No Ongoing contest</h3>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default LeaderboardPageComponent;
