import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './fontawesome';
import './App.css';
import DashBoardPageComponent from './Components/DashboardPageComponent/DashboardPageComponent';
import ErrorPageComponent from './Components/ErrorPageComponent/ErrorPageComponent';

import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import HomePageComponent from './Components/HomePageComponent/HomePageComponent';
import LoginPageComponent from './Components/LoginPageComponent/LoginPageComponent';
import SearchPageComponent from './Components/SearchPageComponent/SearchPageComponent';
import SignUpPageComponent from './Components/SignUpPageComponent/SignUpPageComponent';
import MoviePageComponent from './Components/MoviePageComponent/MoviePageComponent';
import LeaderboardPageComponent from './Components/LeaderboardPageComponent/LeaderboardPageComponent';
import AdminDashboardComponent from './Components/AdminDashboardComponent/AdminDashboardComponent';
import Auth from './auth';
import ResetPassword from './Components/LoginPageComponent/ResetPassword';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from 'react-redux';
import {fetchBlackListedMovies, fetchHistory, fetchMoviesData,getVotingOnOff} from './action/movie_actions';
import React,{useEffect,useState} from 'react';
import HistoryComponent from './Components/HistoryComponent/HistoryComponent';
import HistoryDetailComponent from './Components/HistoryDetailComponent/HistoryDetailComponent';
import { ThemeProvider } from 'styled-components';

import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
function App() {
  const dispatch = useDispatch();
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  useEffect(()=>{
    dispatch(fetchMoviesData());
    dispatch(fetchBlackListedMovies());
    dispatch(getVotingOnOff());
    dispatch(fetchHistory());
},[])

  return (
    <ThemeProvider theme={themeMode}>
    <>    
    <BrowserRouter>
      <div className="App">
      <GlobalStyles />
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path="/" component={Auth(HomePageComponent,null)}></Route>
          <Route exact path="/leaderboard" component={Auth(LeaderboardPageComponent,null)}></Route>
          <Route exact path="/login" component={Auth(LoginPageComponent,false)}></Route>
          <Route exact path="/resetpassword" component={Auth(ResetPassword,false)}></Route>
          <Route exact path="/signup" component={Auth(SignUpPageComponent,false)}></Route>
          <Route exact path="/dashboard" component={Auth(DashBoardPageComponent,true)}></Route>
          <Route exact path="/history" component={Auth(HistoryComponent,null)}></Route>
          <Route exact path="/history/:contest_id" component={Auth(HistoryDetailComponent,null)}></Route>
          <Route exact path="/admin" component={Auth(AdminDashboardComponent,true,true)}></Route>
          <Route exact path="/search" component={Auth(SearchPageComponent,null)}></Route>
          <Route exact path="/movie/:movie_id" component={Auth(MoviePageComponent,null)}></Route>
          <Route path="*" component={Auth(ErrorPageComponent,null)}></Route>
        </Switch>
       
      </div>
    </BrowserRouter>
    
    
    </>
    </ThemeProvider>
  );
}

export default App;
