import React, {useEffect, useState} from "react";
import $ from "jquery";

import '../CSS/List.css'

function List() {

    const [searchList, setSearchList] = useState([
        {title : "aj;lfkj;lasdfjsdhfjl;asfl;sadjfl;kdasjf;", name : "adfadfasdsad"}
    ]);
    const [pageTotal, setPageTotal] = useState(1);
    const [listTotal, setListTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState("latest");

    const serverCommonURL = "http://localhost:8080"

    const dropdownSelect = (v) => {
        const text = v.target.innerText;

        switch (text) {
            case "최신순":
                setSortType("latest");
                break;
            case "오래된순":
                setSortType("old");
                break;
            case "조회수순":
                setSortType("count");
                break;
            case "스크랩순":
                setSortType("scrap");
                break;
            default:
                console.error("==========");
                console.error("sortType select error");
                console.error(text);
                console.error("==========");
                break;
        }
        $(".btn-sm").text(text);
    }

    //리스트 목록을 렌더링하는 메소드
    const listRender = searchList.map(v => {
        return(
            <div className="list-div">
                <div className="list-text-title">
                    <label> 글 제목 : </label>
                    <p className="aaa"> {v.title} </p>
                </div>
                <div>
                    <label> 작성자 : </label>
                    <p> {v.name} </p>
                </div>
            </div>
        )
    })

    //페이지를 옮겨가는 버튼을 렌더링
    const pagingButton = () => {
        return (
            <>
                <li className="page-item"><p className="page-link"
                onClick={() => {alert(1)}}>1</p></li>
                <li className="page-item"><p className="page-link"
                onClick={() => {alert(1)}}>2</p></li>
                <li className="page-item"><p className="page-link"
                onClick={() => {alert(1)}}>3</p></li>
            </>
        )
    }

    // list 정보를 불러옴
    useEffect(() => {
        //list 총 개수 정보를 가져옴
        $.ajax({
            url : `${serverCommonURL}/board/total`,
            type : "GET",
            contentType : "application/json; charset=utf-8",
            crossDomain : true,
            xhrFields:{
                withCredentials : true
            }
        }).then(v => {
            const value = v.data;
            //리스트의 총 개수를 구함
            setListTotal(value);
            //몇 페이지까지 나오는지를 구함
            setPageTotal(value / 5);
        })
        .catch(err => console.error(err));
        
        //실질적인 list 정보를 가져옴
        $.ajax({
            url : `${serverCommonURL}/board/read?page=${page}&sortType=${sortType}`,
            type : "GET",
            contentType : "application/json; charset=utf-8",
            crossDomain : true,
            xhrFields:{
                withCredentials : true
            }
        }).then(v => setSearchList(v.data))
        .then(v => console.log("list 정보를 불러옴"))
        .catch(err => console.error(err));
    }, [page, sortType])

    return(
        <div className="login-div">
            {/* 정렬방식 토글메뉴 */}
            <div className="dropdown board-list-sort">
                <a onClick={console.log(listTotal)}
                className="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    정렬방식
                </a>
                <ul className="dropdown-menu">
                    <li><p className="dropdown-item"
                    onClick={(v) => {
                        dropdownSelect(v)
                    }}>최신순</p></li>
                    <li><p className="dropdown-item"
                    onClick={(v) => {
                        dropdownSelect(v)
                    }}>오래된순</p></li>
                    <li><p className="dropdown-item"
                    onClick={(v) => {
                        dropdownSelect(v)
                    }}>조회수순</p></li>
                    <li><p className="dropdown-item"
                    onClick={(v) => {
                        dropdownSelect(v)
                    }}>스크랩순</p></li>
                </ul>
            </div>
            {/* 리스트 내용 */}
            <div>
                {listRender}
                <p> 페이징 안됨, 페이징 버튼도 제대로 안됨, 클릭했을 때 세부 내용으로도 못 감</p>
            </div>
            {/* 페이징 버튼 */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><p className="page-link"
                    onClick={() => {alert(1)}}>1</p></li>
                    <li className="page-item"><p className="page-link"
                    onClick={() => {alert(1)}}>2</p></li>
                    <li className="page-item"><p className="page-link"
                    onClick={() => {alert(1)}}>3</p></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default List;