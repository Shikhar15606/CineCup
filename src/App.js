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
import Auth from './auth';
import ResetPassword from './Components/LoginPageComponent/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path="/" component={Auth(HomePageComponent,null)}></Route>
          <Route exact path="/login" component={Auth(LoginPageComponent,false)}></Route>
          <Route exact path="/resetpassword" component={Auth(ResetPassword,false)}></Route>
          <Route exact path="/signup" component={Auth(SignUpPageComponent,false)}></Route>
          <Route exact path="/dashboard" component={Auth(DashBoardPageComponent,true)}></Route>
          <Route exact path="/search" component={Auth(SearchPageComponent,null)}></Route>
          <Route path="*" component={Auth(ErrorPageComponent,null)}></Route>
        </Switch>
        <FooterComponent></FooterComponent>
      </div>
    </BrowserRouter>
  );
}

export default App;
