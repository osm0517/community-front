import React from "react";
import $ from 'jquery';

function Nav() {

    const serveDivDisplay =() => {
        $(".nav-category-serve-div").css("display", "block");
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
                <p>서브 div로 테스트 중입니다</p>
            </div>
        </div>
    )
}

export default Nav;