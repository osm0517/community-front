import React, {useState, useEffect} from "react";
import $ from 'jquery';

import '../CSS/Login.css';
import '../CSS/Signup.css';

function Signup() {

    //input을 통해 값을 저장할 수 있도록 변수 선언
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    //useEffect 정의
    
    //password와 confirm이 다를 경우 사용자에게 경고
    useEffect(() => {
        if(password != confirm){
            $(".signup-password").css("border-color", "red");
            $(".signup-confirm").css("border-color", "red");
        }
        else{
            $(".signup-password").css("border-color", "black");
            $(".signup-confirm").css("border-color", "black");
        }
    }, [password, confirm]);

    //바뀌지 않는 상수를 설정
    const serverCommonURL = "http://localhost:8080"

    //메소드 선언
    const loginSubmitHandle = (event) => {
        event.preventDefault();
        
        console.log("==========");
        console.log(" signup input data ");
        console.log("id => "+id);
        console.log("password => "+password);
        console.log("name => "+name);
        console.log("nickname => "+nickname);
        console.log("==========");

        const signupData = JSON.stringify({
            "email" : id,
            "password" : password,
            "name" : name,
            "nickname" : nickname
        })

        //서버와 통신하기 위한 ajax
        $.ajax({
            url : `${serverCommonURL}/user/signup`,
            type : "POST",
            data : signupData,
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        })
    }

    //중복확인을 할 때에 url을 결정
    const overlapSelectURL = (type) => {
        switch (type) {
            case 'id':
                return `${serverCommonURL}/user/overlap/id`;
            
            case 'nickname':
                return `${serverCommonURL}/user/overlap/nickname`;

            case 'email':
                return `${serverCommonURL}/user/overlap/email`;
        
            default:
                console.log("==========");
                console.log("overlapSelectURL Type Error => " + type);
                console.log("==========");
                break;
        }
    }

    const overlap = (type, value) => {

        $.ajax({
            url : overlapSelectURL(type),
            type : "POST",
            data : JSON.stringify({"data" : value}),
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
        }).then(v => console.log(v))
        .catch(err => console.log(err));
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
        <div className="login-div bg-light">
            <form>
                <input className='login-input' placeholder="ID"
                onChange={(e) => stateHandler('idChange', e.target.value)}></input>
                <button className="signup-overlap-button"
                onClick={() => overlap("id", id)}> 중복확인 </button><br />

                <input className='login-input signup-password' placeholder="Password"
                onChange={(e) => stateHandler('passwordChange', e.target.value)}></input><br />
                <input className='login-input signup-confirm' placeholder="Password Confirm"
                onChange={(e) => stateHandler('confirmChange', e.target.value)}></input><br />


                <input className='login-input' placeholder="Name"
                onChange={(e) => stateHandler('nameChange', e.target.value)}></input><br />

                <input className='login-input' placeholder="Nickname"
                onChange={(e) => stateHandler('nicknameChange', e.target.value)}></input>
                <button className="signup-overlap-button"
                onClick={() => overlap("nickname", nickname)}> 중복확인 </button><br />

                <input className ="login-input" placeholder="email@example.com"
                onChange={(e) => stateHandler('emailChange', e.target.value)}></input>
                <button className="signup-overlap-button"
                onClick={() => overlap("email", email)}> 중복확인 </button><br />

                <div className='signup-button' ><button type="submit"> 회원가입 </button></div>
            </form>
        </div>
    )
}

export default Signup;