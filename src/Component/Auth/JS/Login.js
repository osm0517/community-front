import React, {useState} from "react";
import $ from 'jquery';

import '../CSS/Login.css';


function Login() {

    //input을 통해 값을 저장할 수 있도록 변수 선언
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    //바뀌지 않는 상수를 설정
    const serverCommonURL = "http://localhost:8080"

    //메소드 선언
    const loginSubmitHandle = (event) => {
        event.preventDefault();
        
        console.log("==========");
        console.log("id => "+id);
        console.log("password => "+password);
        console.log("==========");

        const loginData = JSON.stringify({
            "email" : id,
            "password" : password
        })

        //서버와 통신하기 위한 ajax
        $.ajax({
            url : `${serverCommonURL}/user/login`,
            type : "POST",
            data : loginData,
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => console.log(v))
    }

    //return 선언
    return (
        <div className="login-div bg-light">
            <form action={`${serverCommonURL}/user/login`} onSubmit={loginSubmitHandle}>
                <input className="login-input" placeholder="아이디"
                onChange={(e) => setId(e.target.value)}/><br />
                <input className="login-input" placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}/><br />
                <button className="login-button" type="submit"> 로그인 </button>
                <button className="login-button" > 회원가입 </button><br /><br />
                <button className="login-button login-search-button" > 아이디 / 비밀번호찾기 </button>
                <div><p>OAuth2.0 사용하기 카카오<br/> & 구글</p></div>
            </form>
        </div>
    )
}

export default Login;