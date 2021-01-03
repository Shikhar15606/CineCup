import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import './HistoryStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HistoryComponent = () => {
    const user = useSelector(state => state.user);
    const useStyles = makeStyles({
        root: {
          marginTop:50,
          minWidth: 275,
          maxWidth:300,
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
      if(user.isLoading)
      return(
        <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
      )
      return (
        <div>
            <div class="wrapper_history">
  <div class="list">
    <div class="list__header">
      <h1 style={{color:"black"}}>Previous Contests</h1>
      
    </div>
    <div class="list__body">
      <table class="list__table">
      <tr class="header_row">
      <th class="list__cell">S.no</th>
    <th class="list__cell">Contest</th>
    <th class="list__cell">Start date</th>
    <th class="list__cell">End date</th>
    <th class="list__cell">Link</th>
  </tr>
      {
                user.history && user.history.length ?
                (
                    user.history.map((element,index) => {
                        return(
                                       
       <tr class="list__row" >
         
          <td class="list__cell"><span class="list__value">{index+1}</span></td>
          <td class="list__cell"><span class="list__value">{`${element.Name}`}</span></td>
          <td class="list__cell">
            <span class="list__value">{`${element.Start}`}</span>
            {/* <small class="list__label">20:10 hrs</small> */}
            </td>
          
          <td class="list__cell"><span class="list__value">{`${element.End}`}</span>
          {/* <small class="list__label">23:45 hrs</small> */}
          </td>
         <td class="list__cell">
         <Link to={`/history/${element.contestid}`} className="linky"> 
         <span class="list__value"><FontAwesomeIcon icon={faArrowCircleRight} /></span>
         </Link>
         </td>
        </tr>
        
      
  

                        )
                    })
                )
                :
                <h1>
                    No previous contests
                </h1>
            }
       
        
      </table>
    </div>
  </div>
</div>
        </div>
    );
};

export default HistoryComponent;