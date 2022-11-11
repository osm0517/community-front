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
                <p>
                    <br/><br />
                    SPA 방식을 사용하여 클라이언트를 구현함.
                    <br/><br />
                    <b>SSR 방식을 사용한 것이 아니기 때문에 겪을 수 
                    있는 각종 오류와 상황을 공부하기 위해서 시작함.</b>
                    <br/><br/>
                    Client = React
                    <br/><br/>
                    Server = Spring boot
                    <br/><br/>
                    반응형으로 여러 기기에서 볼 때에 보기 편하게 구성을
                    해야하나 컴퓨터만을 생각해서 제작

                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => {
                            setTest(e.target.value)
                            console.log(e.target.value)}}></input>
                        <button type="submit"> 전송 </button>
                    </form>
                </p>
            </div>
        </div>
    )
}

export default Main;