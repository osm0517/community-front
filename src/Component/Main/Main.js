import React, {useState} from "react";
import {Link} from "react-router-dom";
import $ from 'jquery';

function Main() {
    const [test, setTest] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const a = test.toString;
        console.log(test);
        let value = JSON.stringify({password : test});
        
        $.ajax({
            url : "http://localhost:8080/count/test",
            type : "POST",
            data : JSON.stringify(value),
            dataType : "JSON",
            contentType : "application/json; charset=utf-8"
    })
    }
    return(
        <div className="main-div">
            <div className="a">
                <p> "오성민"의 커뮤니티입니다.<br />
                환영합니다.</p>
            </div>
        </div>
    )
}

export default Main;