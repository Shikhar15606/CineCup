import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './fontawesome';
import './App.css';
import DashBoardPageComponent from './Components/DashboardPageComponent/DashboardPageComponent';
import ErrorPageComponent from './Components/ErrorPageComponent/ErrorPageComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
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
import {fetchMoviesData} from './action/movie_actions';
import React,{useEffect,useState} from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchMoviesData());
},[])
  return (
    <>    
    <BrowserRouter>
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path="/" component={Auth(HomePageComponent,null)}></Route>
          <Route exact path="/leaderboard" component={Auth(LeaderboardPageComponent,null)}></Route>
          <Route exact path="/login" component={Auth(LoginPageComponent,false)}></Route>
          <Route exact path="/resetpassword" component={Auth(ResetPassword,false)}></Route>
          <Route exact path="/signup" component={Auth(SignUpPageComponent,false)}></Route>
          <Route exact path="/dashboard" component={Auth(DashBoardPageComponent,true)}></Route>
          <Route exact path="/admin" component={Auth(AdminDashboardComponent,true,true)}></Route>
          <Route exact path="/search" component={Auth(SearchPageComponent,null)}></Route>
          <Route exact path="/movie/:movie_id" component={Auth(MoviePageComponent,null)}></Route>
          <Route path="*" component={Auth(ErrorPageComponent,null)}></Route>
        </Switch>
       
      </div>
    </BrowserRouter>
    
    
    </>
  );
}

export default App;
