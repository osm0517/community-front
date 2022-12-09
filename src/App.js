import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import $ from "jquery";

// default component
import Nav from './Component/Navigation/JS/Nav';
import Main from './Component/Main/Main';
// user component
import Login from './Component/Auth/JS/Login';
import Signup from './Component/Auth/JS/Signup';
import UserSearch from './Component/Auth/JS/UserSearch';
import Profile from './Component/Auth/JS/Profile';
// board component
import Write from './Component/Board/JS/Write';
import List from './Component/Board/JS/List';

function App() {

  

  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path='/board/list' component={List}></Route>
          <Route path='/board/write' component={Write}></Route>
          <Route path='/user/login' component={Login}></Route>
          <Route path='/user/signup' component={Signup}></Route>
          <Route path='/user/search/:type' component={UserSearch}></Route>
          <Route path='/user/profile' component={Profile}></Route>
          <Route path='/'>
            <div className='app-div'>
              <div></div>
              <Main />
              <div></div>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
