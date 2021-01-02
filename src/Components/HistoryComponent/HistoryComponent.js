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
            <h1>
                Previous Contests
            </h1>
            {
                user.history && user.history.length ?
                (
                    user.history.map(element => {
                        return(
                            <Card className={classes.root}>
                            <CardContent>
                              <Typography variant="h5" component="h2">
                                {`${element.Name}`}
                              </Typography>
                              <Typography className={classes.pos} color="textSecondary">
                                {`Start : ${element.Start}`}
                              </Typography>
                              <Typography className={classes.pos} color="textSecondary">
                              {`End : ${element.End}`}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"><Link to={`/history/${element.contestid}`}>See Ranking</Link></Button>
                            </CardActions>
                          </Card>
                        )
                    })
                )
                :
                <h1>
                    No previous contests
                </h1>
            }
        </div>
    );
};

export default HistoryComponent;