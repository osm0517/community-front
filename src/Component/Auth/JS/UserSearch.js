import React, {useState} from "react";
import {Link, Switch, Route} from 'react-router-dom';
import $ from 'jquery';

import '../CSS/Login.css';
import '../CSS/UserSearch.css';

function UserSearch() {
    //input을 통해 값을 저장할 수 있도록 변수 선언
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    //바뀌지 않는 상수를 설정
    const serverCommonURL = "http://localhost:8080"

    //메소드 선언
    

    //return 선언
    const searchIdRender = () => {
        return (
            <form>
                <input className="login-input" placeholder="name"></input><br />
                <input className="login-input" placeholder="email@example.com"></input><br />
                <div className="signup-button"><button type="submit"> 아이디 찾기 </button></div>
            </form>
        )
    }

    const searchPasswordRender = () => {
        return (
            <form>
                <input className="login-input" placeholder="id"></input><br />
                <input className="login-input" placeholder="email@example.com"></input><br />
                <div className="signup-button"><button type="submit"> 비밀번호 찾기 </button></div>
            </form>
        )
    }

    return (
        <div className="login-div bg-light search-div">
            <div className="search-select-div">
                <Link to="/user/search/id">
                    <button> 아이디 찾기 </button>
                </Link>
                <Link to="/user/search/password">
                    <button> 비밀번호 찾기 </button>
                </Link>
            </div>
            <div>
                <Switch>
                    <Route path="/user/search/id" component={searchIdRender}></Route>
                    <Route path="/user/search/password" component={searchPasswordRender}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default UserSearch;