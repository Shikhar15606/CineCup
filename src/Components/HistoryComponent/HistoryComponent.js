import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './HistoryStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import Img2 from '../../icons/Asset 1@2x.png';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const HistoryComponent = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  const user = useSelector(state => state.user);
  const useStyles = makeStyles({
    root: {
      marginTop: 50,
      minWidth: 275,
      maxWidth: 300,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  if (user.isLoading)
    return (
      <CircularProgress
        style={{ marginTop: '25vw' }}
        color='secondary'
      ></CircularProgress>
    );
  return (
    <div>
      <div class='wrapper_history'>
        <div class='list'>
          <div class='list__header'>
            <h1>Previous Contests</h1>
          </div>
          {user.history && user.history.length ? (
            <div class='list__body'>
              <table class='list__table'>
                <tr class='header_row'>
                  <th class='list__cell'>S.no</th>
                  <th class='list__cell'>Contest</th>
                  <th class='list__cell'>Start date</th>
                  <th class='list__cell'>End date</th>
                  <th class='list__cell'>Link</th>
                </tr>
                {user.history.map((element, index) => {
                  return (
                    <tr class='list__row'>
                      <td class='list__cell'>
                        <span class='list__value'>{index + 1}</span>
                      </td>
                      <td class='list__cell'>
                        <span class='list__value'>{`${element.Name}`}</span>
                      </td>
                      <td class='list__cell'>
                        <span class='list__value'>{`${element.sDay}`}</span>
                        <small class='list__label'>{`${element.sTime}`}</small>
                      </td>
                      <td class='list__cell'>
                        <span class='list__value'>{`${element.eDay}`}</span>
                        <small class='list__label'>{`${element.eTime}`}</small>
                      </td>
                      <td class='list__cell'>
                        <Link
                          to={`/history/${element.contestid}`}
                          className='linky'
                        >
                          <span class='list__value'>
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <div className='results'>
              <img src={Img2} className='noresults' />
              <h2>No past contests</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
