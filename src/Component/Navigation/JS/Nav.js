import React from "react";
import $ from 'jquery';
import { Link } from "react-router-dom";

import '../CSS/Nav.css'

function Nav() {

    const serveDivDisplay =() => {
        $(".nav-category-serve-div").css("display", "flex");
    }

    const serveDivNoDisplay =() => {
        $(".nav-category-serve-div").css("display", "none");
    }

    return(
        <div>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="nav-icons-div">
                        <Link to="/">
                            <i className="bi bi-house"></i>
                        </Link>
                        <Link to="/user/profile">
                            <i className="bi bi-person"></i>
                        </Link>
                        <Link to="/board/write">
                            <i className="bi bi-pencil-square"></i>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="bg-light nav-category-div"
            onMouseOver={serveDivDisplay} onMouseOut={serveDivNoDisplay}>
                <div> 반별 </div>
                <div> 나이별 </div>
                <div> 연도별 </div>
                <div> 활동별 </div>
            </div>
            <div className="bg-light nav-category-serve-div"
            onMouseOver={serveDivDisplay} onMouseOut={serveDivNoDisplay}>
                {/* 반별 */}
                <div>
                    <ul>
                        <li><p>햇님반</p></li>
                        <li><p>달님반</p></li>
                        <li><p>해바라기반</p></li>
                        <li><p>장미반</p></li>
                        <li><p>나무반</p></li>
                        <li><p>하늘반</p></li>
                    </ul>
                </div>
                {/* 나이별 */}
                <div className="margin1">
                    <ul>
                        <li><p>5살</p></li>
                        <li><p>6살</p></li>
                        <li><p>7살</p></li>
                    </ul>
                </div>
                {/* 연도별 */}
                <div className="margin2">
                    <ul>
                        <li><p>2021년</p></li>
                        <li><p>2022년</p></li>
                        <li><p>2023년</p></li>
                    </ul>
                </div>
                {/* 활동별 */}
                <div className="margin3">
                    <ul>
                        <li><p>수업</p></li>
                        <li><p>현장체험학습</p></li>
                        <li><p>특별학습</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav;