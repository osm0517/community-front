import React, {useState} from "react";
import {Link} from "react-router-dom";
import $ from 'jquery';
import '../CSS/Main.css';

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
        <div className="home-container">
            <div className="home-title">
                <h2>
                    게시판 목록
                </h2>
            </div>
            <div className="home-list">
                <ul>
                    <li>test title</li>
                    <li>test title</li>
                    <li>test title</li>
                </ul>
            </div>
        </div>
    )
}

export default Main;