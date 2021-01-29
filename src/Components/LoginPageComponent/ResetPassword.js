import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { resetPassword } from '../../action/user_actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ResetPassword() {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  const [open, setOpen] = useState(false);
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [altemail, setaltemail] = useState(false);

  useEffect(() => {
    if (
      altemail &&
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    )
      setemailError('Invalid Email Address');
    else setemailError('');
  }, [altemail, email]);

  const dispatch = useDispatch();

  const RESETPASSWORD = e => {
    e.preventDefault();
    dispatch(resetPassword({ email: email }));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  useEffect(() => {
    if (user.error || user.successmsg) {
      setOpen(true);
    }
  }, [user]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (user.isLoading)
    return (
      <CircularProgress
        style={{ marginTop: '25vw' }}
        color='secondary'
      ></CircularProgress>
    );
  return (
    <Grid container component='main' className='login-root'>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='login-image' />
      <Grid item xs={12} sm={8} md={5}>
        <div className='login-paper'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Password Reset
          </Typography>
          <form className={classes.form} Validate>
            <TextField
              error={emailError}
              helperText={emailError}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={e => {
                setemail(e.target.value);
                setaltemail(true);
              }}
              InputProps={{ className: 'voting_text' }}
              InputLabelProps={{
                className: 'voting_text',
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={RESETPASSWORD}
            >
              Reset
            </Button>
            {user.error ? (
              <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity='error'>
                  {`${user.error}`}
                </Alert>
              </Snackbar>
            ) : user.successmsg ? (
              <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity='success'>
                  {`${user.successmsg}`}
                </Alert>
              </Snackbar>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
