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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path="/" component={HomePageComponent}></Route>
          <Route exact path="/login" component={LoginPageComponent}></Route>
          <Route exact path="/signup" component={SignUpPageComponent}></Route>
          <Route exact path="/dashboard" component={DashBoardPageComponent}></Route>
          <Route exact path="/search" component={SearchPageComponent}></Route>
          <Route path="*" component={ErrorPageComponent}></Route>
        </Switch>
        <FooterComponent></FooterComponent>
      </div>
    </BrowserRouter>
  );
}

export default App;
