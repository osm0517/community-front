import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import $ from "jquery";
import { useState, useEffect } from 'react';

// default component
import Nav from './Component/Navigation/JS/Nav';
import Main from './Component/Main/JS/Main';
// user component
import Login from './Component/Auth/JS/Login';
import Signup from './Component/Auth/JS/Signup';
import SignupSuccess from './Component/Auth/JS/SignupSuccess';
import UserSearch from './Component/Auth/JS/UserSearch';
import Profile from './Component/Auth/JS/Profile';
// board component
import Write from './Component/Board/JS/Write';
import List from './Component/Board/JS/List';
import Detail from './Component/Board/JS/Detail';

function App() {
  const [name, setName] = useState(1);
  const [nickname, setNickname] = useState("");

  const profileCallFunc = (x)=> {
    $.ajax({
      url : `http://localhost:8080/board/${x}`,
      method : "GET",
      contentType : "application/json; charset=utf-8",
      crossDomain : true,
      xhrFields:{
          withCredentials : true
      }
    }).then(v => {
      console.log(v.name);
      console.log(v.nickname);
      setName(v.name);
      setNickname(v.nickname);
    })
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path='/board/list' component={List}></Route>
          <Route path='/board/write' component={Write}></Route>
          <Route path='/user/login' component={Login}></Route>
          <Route path='/user/signup/success' component={SignupSuccess}></Route>
          <Route path='/user/signup' component={Signup}></Route>
          <Route path='/user/search/:type' component={UserSearch}></Route>
          <Route path='/user/profile'>
            <Profile a={name}
            callValue={profileCallFunc}/>
          </Route>
          <Route path='/test/detail'>
            <Detail/>
          </Route>
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
