import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
// redux
import { register } from '../../action/user_actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '80px',
    height: '80vh',
    backgroundColor: 'rgb(0, 18, 34)',
  },
  image: {
    backgroundImage:
      'url(https://image.freepik.com/free-vector/account-concept-illustration_114360-399.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useSnackbarStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SignUpPageComponent() {
  const classes = useStyles();

  const user = useSelector(state => state.user);

  const [open, setOpen] = React.useState(false);

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [profilepic, setprofilepic] = useState(null);
  const [password, setpassword] = useState('');
  const [firstnameError, setfirstnameError] = useState('');
  const [lastnameError, setlastnameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [altfirstname, setaltfirstname] = useState(false);
  const [altlastname, setaltlastname] = useState(false);
  const [altemail, setaltemail] = useState(false);
  const [altpassword, setaltpassword] = useState(false);
  const [disabledSubmit, setdisabledSubmit] = useState(true);

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

  useEffect(() => {
    if (altfirstname && firstname.length < 3)
      setfirstnameError('Firstname must be more than 2 characters');
    else setfirstnameError('');
  }, [altfirstname, firstname]);

  useEffect(() => {
    if (altlastname && lastname.length < 3)
      setlastnameError('Lastname must be more than 2 characters');
    else setlastnameError('');
  }, [altlastname, lastname]);

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

  useEffect(() => {
    if (altpassword && password.length < 6)
      setpasswordError('Password must have more than 5 characters');
    else setpasswordError('');
  }, [altpassword, password]);

  useEffect(() => {
    if (
      !firstnameError &&
      !lastnameError &&
      !emailError &&
      !passwordError &&
      firstname &&
      lastname &&
      email &&
      password
    )
      setdisabledSubmit(false);
    else setdisabledSubmit(true);
  }, [
    firstnameError,
    lastnameError,
    passwordError,
    emailError,
    firstname,
    lastname,
    email,
    password,
  ]);

  const handleChange = e => {
    if (e.target.files[0]) {
      setprofilepic(e.target.files[0]);
    }
  };

  // redux
  const dispatch = useDispatch();
  const signUp = e => {
    e.preventDefault();
    const dataToSubmit = {
      firstname,
      lastname,
      email,
      password,
      profilepic,
    };
    console.log(dataToSubmit);
    dispatch(register(dataToSubmit));
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
      <Grid item xs={false} sm={4} md={6} className='signup-image' />
      <Grid item xs={12} sm={8} md={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} Validate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstnameError}
                  helperText={firstnameError}
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  value={firstname}
                  onChange={e => {
                    setfirstname(e.target.value);
                    setaltfirstname(true);
                  }}
                  autoFocus
                  InputProps={{ className: 'voting_text' }}
                  InputLabelProps={{
                    className: 'voting_text',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastnameError}
                  helperText={lastnameError}
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                  value={lastname}
                  onChange={e => {
                    setlastname(e.target.value);
                    setaltlastname(true);
                  }}
                  InputProps={{ className: 'voting_text' }}
                  InputLabelProps={{
                    className: 'voting_text',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  helperText={emailError}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  helperText={passwordError}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={e => {
                    setpassword(e.target.value);
                    setaltpassword(true);
                  }}
                  InputProps={{ className: 'voting_text' }}
                  InputLabelProps={{
                    className: 'voting_text',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type='file'
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={signUp}
              disabled={disabledSubmit}
            >
              Sign Up
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
            <Grid container justify='flex-end'>
              <Grid item xs={12}>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUpPageComponent;
