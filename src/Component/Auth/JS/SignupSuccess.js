import React, {useState, useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import Modal from 'react-modal';
import $ from 'jquery';

import '../CSS/SignupSuccess.css';


function SignupSuccess() {

    return (
        <div className="success-container">
            <div className="home-title">
                <h2> 환영합니다. xxx 님</h2>
            </div>
            <hr />
            <div className="button-div">
                <button className="btn btn-primary"> 로그인 하러가기 </button>
                <button className="btn btn-primary"> 홈으로 가기 </button>
            </div>
        </div>
    )
}

export default SignupSuccess;