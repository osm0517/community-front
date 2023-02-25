import React from "react";
import $ from 'jquery';
import { Link } from "react-router-dom";

import '../CSS/Nav.css'

function Nav() {


    return(
        <div>
            <nav className="head-container bg-primary bg-opacity-75">
                <div className="head">

                    <div className="head-title">
                        <h1>
                            SEONGMIN
                        </h1>
                    </div>
                    <div className="head-login-div">
                        <p> Login </p>
                    </div>

                    {/* <div className="nav-icons-div">
                        <Link to="/">
                            <i className="bi bi-house"></i>
                        </Link>
                        <Link to="/user/profile">
                            <i className="bi bi-person"></i>
                        </Link>
                        <Link to="/board/write">
                            <i className="bi bi-pencil-square"></i>
                        </Link>
                    </div> */}
                </div>
            </nav>
        </div>
    )
}

export default Nav;