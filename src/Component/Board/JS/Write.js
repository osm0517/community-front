import React from "react";
import $ from "jquery";

import '../CSS/Write.css'

function Write() {
    return (
        <div className="login-div write-div">
            <div>
                <label> 제목 </label>
                <input placeholder="제목을 입력해주세요"></input>
            </div>
            <div>
                <label> 분류 </label>
                <input placeholder="분류를 입력해주세요"></input><br />
            </div>
            <div className="write-text-div">
                <label> 내용 </label><br />
                <textarea placeholder="내용을 입력해주세요"></textarea>
            </div>
        </div>
    )
}

export default Write;