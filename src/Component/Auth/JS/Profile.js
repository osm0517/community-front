import React, {useEffect, useState} from "react";

import '../CSS/Login.css';
import '../CSS/Profile.css';

function Profile(props) {

    const [name, setName] = useState("test");
    const [nickname, setNickname] = useState("test");
    const [auth, setAuth] = useState("test");
    const [email, setEmail] = useState("test");

    useEffect(()=> {
        setName(props.name);
        setNickname(props.nickname);
        setAuth(props.auth);
        setEmail(props.email);
    })
    props.callValue("test");
    return (
        <div className="login-div">
            <div className="profile-text-div">
                <label> Name </label>
                <p> {name} </p>
            </div>
            <div className="profile-text-div">
                <label> Nickname </label>
                <p> {nickname} </p>
            </div>
            <div className="profile-text-div">
                <label> Auth </label>
                <p> {auth} </p>
            </div>
            <div className="profile-text-div">
                <label> Email </label>
                <p> {email} </p>
            </div>
            <div className="profile-button-div">
                <button> 내 글 보기 </button>
                <button> 내 스크랩 보기 </button>
                <button> 내 댓글 보기 </button>
                <button> 계정 탈퇴 </button>
                <button> 계정 수정 </button>
            </div>
        </div>
    )
}

export default Profile;