import React, {useState} from "react";
import $ from 'jquery';

import '../CSS/Login.css';
import Cookie from 'js-cookie';


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
            "userId" : id,
            "password" : password,
            "auth" : "user"
        })

        //서버와 통신하기 위한 ajax
        $.ajax({
            url : `${serverCommonURL}/user/login`,
            type : "POST",
            data : loginData,
            dataType : "JSON",
            contentType : "application/json; charset=utf-8",
            crossDomain : true,
            xhrFields:{
                withCredentials : true
            }
        }).then(v => {
            if(v.status == 'OK'){
                console.log(v);
                alert("성공적으로 로그인 되었습니다");
            }else{
                alert("로그인 도중 오류가 생겼습니다" + v);
            }
        }).catch(err => {
            console.log(err);
            alert("로그인에 실패하였습니다");
        })
    }

    //return 선언
    return (
        // <div className="login-div bg-light">
        //     <form action={`${serverCommonURL}/user/login`} onSubmit={loginSubmitHandle}>
        //         <input className="login-input" placeholder="아이디"
        //         onChange={(e) => setId(e.target.value)}/><br />
        //         <input className="login-input" placeholder="비밀번호"
        //         onChange={(e) => setPassword(e.target.value)}/><br />
        //         <button className="login-button" type="submit"> 로그인 </button>
        //         <button className="login-button" > 회원가입 </button><br /><br />
        //         <button className="login-button login-search-button" > 아이디 / 비밀번호찾기 </button>
        //         <div onClick={() => {
        //             $.ajax({
        //                 url : `${serverCommonURL}/user/test`,
        //                 type : "GET",
        //                 crossDomain : true,
        //                 xhrFields:{
        //                     withCredentials : true
        //                 }
        //             }).then(v => console.log(v))
        //             .catch(err => console.error(err))
        //             // alert(Cookie.get("X-AUTH-TOKEN"));
        //         }}><p>OAuth2.0 사용하기 카카오<br/> & 구글</p></div>
        //     </form>
        // </div>
        <div className="login-container">
            <div className="home-title">
                <h2>
                    로그인
                </h2>
            </div>
            <hr/>
            <div className="input-div">
                <label> ID </label>
                <input type="text" placeholder="아이디를 입력해주세요."/>
            </div>
            <div className="input-div">
                <label> Password </label>
                <input type="text" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div className="button-div">
                <button className="btn btn-primary">
                    로그인
                </button>
                <button className="btn btn-primary">
                    회원가입
                </button>
                <button className="btn btn-warning">
                    카카오 로그인
                </button>
            </div>
        </div>
    )
}

export default Login;