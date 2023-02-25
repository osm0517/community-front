import React, {useState, useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import Modal from 'react-modal';
import $ from 'jquery';

import '../CSS/Signup.css';


function Signup() {

    //input을 통해 값을 저장할 수 있도록 변수 선언
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [randomString, setRandomString] = useState("");

    const [idOverlap, setIdOverlap] = useState(false);
    const [nicknameOverlap, setNicknameOverlap] = useState(false);
    const [auth, setAuth] = useState(false);

        //바뀌지 않는 상수를 설정
    const serverCommonURL = "http://localhost:8080"
    const frontCommonURL = "http://localhost:3000"

    const idMinLength = 5;
    const idMaxLength = 10;
    const passwordMinLength = 8;
    const passwordMaxLength = 13;

    //useEffect 정의
    
    useEffect(() => {
        //password와 confirm이 다를 경우 사용자에게 경고
        if(password != confirm){
            $(".signup-password").css("border-color", "red");
            $(".signup-confirm").css("border-color", "red");
        }
        else{
            $(".signup-password").css("border-color", "black");
            $(".signup-confirm").css("border-color", "black");
        }

        //비밀번호가 설정한 길이 안에 들어오는지 검사
        if((password.length >= passwordMinLength && password.length <= passwordMaxLength) || password.length == 0){
            $(".password-max-length").css("display", "none");
            $(".password-min-length").css("display", "none");
        }
        else if(password.length > passwordMaxLength){
            $(".password-max-length").css("display", "block");
        }
        else if(password.length < passwordMinLength){
            $(".password-min-length").css("display", "block");
        }
    }, [password, confirm]);

    useEffect(() => {
        if((id.length >= idMinLength && id.length <= idMaxLength) || id.length == 0){
            $(".id-max-length").css("display", "none");
            $(".id-min-length").css("display", "none");
        }
        else if(id.length > idMaxLength){
            $(".id-max-length").css("display", "block");
        }
        else if(id.length < idMinLength){
            $(".id-min-length").css("display", "block");
        }
    }, [id])


    //메소드 선언
    const signupSubmitHandle = (event) => {
        event.preventDefault();
        
        console.log("==========");
        console.log(" signup input data ");
        console.log("id => "+id);
        console.log("password => "+password);
        console.log("name => "+name);
        console.log("nickname => "+nickname);
        console.log("email => "+email);
        console.log("==========");

        const signupData = JSON.stringify({
            "email" : email,
            "userId" : id,
            "password" : password,
            "name" : name,
            "nickname" : nickname
        })

        if(password != confirm){
            alert("비밀번호를 동일하게 입력해주세요.");
        }
        else if(idOverlap == false){
            alert("아이디 중복확인을 진행해주세요.");
        }
        else if(nicknameOverlap == false){
            alert("비밀번호 중복확인을 진행해주세요.");
        }
        else if(auth == false){
            alert("이메일 인증을 진행해주세요.");
        }

        //서버와 통신하기 위한 ajax
        $.ajax({
            url : `${serverCommonURL}/user/signup`,
            type : "POST",
            data : signupData,
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => {
            if(v.status == 'OK'){
                alert("환영합니다 :)");
                window.location.replace("/");
            }else{
                console.log(v);
                alert("예상치 못한 에러가 발생했습니다");
            }
        }).catch(err => {
            console.error("signup error => " + err);
            alert("회원가입을 시도하던 중 catch에 걸림");
        })
    }

    //인증메일을 전송
    const authMailSend = () => {
        $.ajax({
            url : `${serverCommonURL}/user/overlap/mail`,
            type : "POST",
            data : JSON.stringify({"email" : email}),
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => {
            console.log(v)
        }).catch(err => console.error(err))
    }

    //메일로 받은 문자를 인증
    const emailAuth = () => {
        $.ajax({
            url : `${serverCommonURL}/user/auth?email=${email}&randomString=${randomString}`,
            type : "GET",
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => {
            setAuth(true);
            $(".auth").css("display", "none");
            alert("메일 인증이 성공적으로 이루어졌습니다");
        }).catch(err => console.error(err))
    }

    //중복확인을 진행하는 메소드
    const overlap = (type, value) => {

        const a= {}
        a[type] = value

        $.ajax({
            url : `${serverCommonURL}/user/overlap/`+type,
            type : "POST",
            data : JSON.stringify(a),
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => {
            if($(`.${type}`).css("display", "flex")){
                $(`.${type}`).css("display", "none");
            }
            alert(`사용이 가능한 ${type}입니다`)
            switch (type) {
                case "email":
                    $(".signup-auth-div").css("display", "block");
                    break;

                case "userId" :
                    setIdOverlap(true);
                    break;

                case "nickname" :
                    setNicknameOverlap(true);
                    break;
            
                default:
                    console.error("잘못된 type이 입력됨");
                    break;
            }
        })
        .catch(err => {
            if(err.status == 409){
                $(`.${type}`).css("display", "flex");

                switch (type) {
                    case "userId" :
                        setIdOverlap(false);
                        break;

                    case "nickname" :
                        setNicknameOverlap(false);
                        break;
                
                    default:
                        console.error("잘못된 type이 입력됨");
                        break;
                }
            }else{
                console.error("overlap method error => " + err)
            }
        })
    }

    //존재하는 정보가 있다면 계정을 찾을 수 있도록 함
    //찾는 화면으로 redirect를 함
    const searchRedirct = () => {
        window.location.replace(`${frontCommonURL}/user/search/id`);
    }

    //input에 값을 변경해주는 메소드
    const stateHandler = (location, e) => {
        switch (location) {
            case 'idChange':
                setId(e);
                break;
            
            case 'passwordChange':
                setPassword(e);
                break;

            case 'confirmChange':
                setConfirm(e);
                break;

            case 'nameChange':
                setName(e);
                break;

            case 'nicknameChange':
                setNickname(e);
                break;

            case 'emailChange':
                setEmail(e);
                break;
        
            default:
                console.log("==========");
                console.log("stateHandler Location Error => " + location);
                console.log("==========");
                break;
        }
    }

    //서버와 통신하기 위한 ajax

    return (
        <div className="login-container signup-container">
            <div className="home-title">
                <h2>
                    회원가입
                </h2>
            </div>
            <hr/>
            <div className="input-div">
                <label>
                    아이디
                </label>
                <input type="text" placeholder="아이디를 입력해주세요."/>
            </div>
            <div className="input-div">
                <label>
                    비밀번호
                </label>
                <input type="text" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div className="input-div">
                <label>
                    비밀번호 확인
                </label>
                <input type="text" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div className="input-div">
                <label>
                    이름
                </label>
                <input type="text" placeholder="이름을 입력해주세요."/>
            </div>
            <div className="input-div">
                <label>
                    Email
                </label>
                <input type="text" placeholder="이메일을 입력해주세요."/>
            </div>
            <div className="terms-div">
                <div>
                    <textarea disabled>
                        약관1
                    </textarea>
                    <div>
                        <label> 약관에 동의합니다. </label>
                        <input type="checkbox" />
                    </div>
                </div>
                <div>
                    <textarea disabled>
                        약관2
                    </textarea>
                    <div>
                        <label> 약관에 동의합니다. </label>
                        <input type="checkbox" />
                    </div>
                </div>
                <div>
                    <textarea disabled>
                        약관3
                    </textarea>
                    <div>
                        <label> 약관에 동의합니다. </label>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
            <div className="button-div">
                <button className="btn btn-primary">
                    회원가입
                </button>
            </div>
            {/* <form onSubmit={signupSubmitHandle}>
                <input className='login-input' placeholder="ID"
                onChange={(e) => stateHandler('idChange', e.target.value)}></input>
                <span className="signup-overlap-button"
                onClick={() => overlap("userId", id)}> 중복확인 </span><br />
                <div className="signup-exist-div userId">
                    <p> 아이디가 존재합니다 </p>
                    <span onClick={searchRedirct}> 찾으러 가기 </span>
                </div>
                <p className="length-warning id-min-length"> 아이디가 너무 짧습니다 </p>
                <p className="length-warning id-max-length"> 아이디가 너무 깁니다 </p>

                <input className='login-input signup-password' placeholder="Password"
                onChange={(e) => stateHandler('passwordChange', e.target.value)}></input><br />
                <p className="length-warning password-min-length"> 비밀번호가 너무 짧습니다 </p>
                <p className="length-warning password-max-length"> 비밀번호가 너무 깁니다 </p>
                <input className='login-input signup-confirm' placeholder="Password Confirm"
                onChange={(e) => stateHandler('confirmChange', e.target.value)}></input><br />
                
                <input className='login-input' placeholder="Name"
                onChange={(e) => stateHandler('nameChange', e.target.value)}></input><br />

                <input className='login-input' placeholder="Nickname"
                onChange={(e) => stateHandler('nicknameChange', e.target.value)}></input>
                <span className="signup-overlap-button"
                onClick={() => overlap("nickname", nickname)}> 중복확인 </span><br />
                <div className="signup-exist-div nickname">
                    <p> 닉네임이 존재합니다 </p>
                </div>

                <input className ="login-input" placeholder="email@example.com"
                onChange={(e) => stateHandler('emailChange', e.target.value)}></input>
                <span className="signup-overlap-button"
                onClick={() => overlap("email", email)}> 중복확인 </span><br />
                <div className="signup-exist-div email" >
                    <p> 이메일이 존재합니다 </p>
                    <span onClick={searchRedirct}> 찾으러 가기 </span>
                </div>
                <div className="signup-auth-div" >
                    <input className="login-input auth" placeholder="인증번호"
                    onChange={(e) => {
                        setRandomString(e.target.value);
                    }}></input>
                    <span className="signup-overlap-button"
                    onClick={authMailSend}> 발송 </span>
                    <span className="signup-overlap-button"
                    onClick={emailAuth}> 인증 </span>
                </div>

                <div className='signup-button' ><button type="submit"> 회원가입 </button></div>
            </form> */}
        </div>
    )
}

export default Signup;