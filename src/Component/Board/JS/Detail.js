import React from "react";
import "../CSS/Detail.css";

function Detail() {


    const testList = [
        {
            title : "test1",
            writer : "testWriter",
            date : "2022-12-14",
            text : "test1"
        }
    ]

    const reviewRender = testList.map(v => {
        return(
            // 댓글 전체
            <div className="
            review-div">
                <div className="
                review-title-div">
                    <div className="div1">
                        <div>
                            <label>제목</label>
                            <p>{v.title}</p>
                        </div>
                        <div>
                            <label>작성자</label>
                            <p>{v.writer}</p>
                        </div>
                    </div>
                    <div className="div2">
                        <p>{v.date}</p>
                    </div>
                </div>
                <div className="review-text-div">
                    <div><p>{v.text}</p></div>
                </div>
            </div>
        )
    });

    return (
        <div className="login-div bg-light">
            <div className="detail-div">
                <div className="detail-text-div
                detail-row-pos">
                    <label>제목</label>
                    <p> testTitle </p>
                </div>
                <div className="detail-text-div
                detail-row-pos">
                    <label>작성자</label>
                    <p> testWriter </p>
                </div>
                <div className="detail-text-div
                detail-row-pos">
                    <label>날짜</label>
                    <p> testDate </p>
                </div>
                <div className="detail-text-div
                detail-text-review bg-light">
                    <label>내용</label>
                    <p> testText </p>
                </div>
                {/* 댓글 입력 창 */}
                <div className="review-input-div">
                    <input type={"text"} 
                    placeholder="좋은 말 부탁합니다:)"/>
                    <button> 등록 </button>
                </div>
                {reviewRender}
            </div>
        </div>
    )
}

export default Detail;