import React from "react";

import '../CSS/Login.css';
import '../CSS/Profile.css';

function Profile() {
    return (
        <div className="login-div">
            <div className="profile-text-div">
                <label> Name </label>
                <p> testName </p>
            </div>
            <div className="profile-text-div">
                <label> Nickname </label>
                <p> testNickname </p>
            </div>
            <div className="profile-text-div">
                <label> Auth </label>
                <p> testAuth </p>
            </div>
            <div className="profile-text-div">
                <label> Email </label>
                <p> testEmail </p>
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