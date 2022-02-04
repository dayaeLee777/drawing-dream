import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import CommentContainer from "./comment/CommentContainer";

const Register = styled.div`
  padding: 3rem 5rem;
  box-sizing: border-box;
  width: 100%;
`;

const BoardContainer = styled.div`
  border: 1px solid #dadde6;
  box-sizing: border-box;
  width: 100%;
  padding: 0 3rem;
  border-radius: 5px;
  margin-top: 0.5rem;
`;
const TitleContainer = styled.div`
  .title {
    font-size: 2.5rem;
    font-weight: 600;
  }
`;
const ProfileContainer = styled.div`
  padding-left: 0.5rem;
  margin-top: 1rem;
  color: #787878;
  
  .userName {
    font-size: 1rem;
    margin-right: 1rem;
  }
  .regTime {
    font-size: 0.8rem;
    height: 100%;
    justify-content: center;
  }
`;

const EditContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  font-size: 0.8rem;
  text-align: right;
  
  .edit, .delete {
    margin-right: 0.5rem;
    text-decoration: underline;
    color: #787878;
    cursor: pointer;
  }
`;


const CommunityDetail = ({ setCommunityId }) => {
  const onClickHome = () => {
    console.log(">>>");
    setCommunityId("");
  };
  const sampleData = {
    regTime: "2022.02.04",
    userName: "이학생",
    content: `<h1>제목1</h1><h2>제목 2</h2><h3>제목 3</h3><h4>제목 4</h4><h5>제목 5</h5><h6>제목 6</h6><ol><li><p>리스트1</p></li><li><p>리스트2</p></li><li><p>리스트3</p></li><li><p>리스트4</p></li></ol><ul><li><p>점1</p></li><li><p>점2</p></li><li><p>점3</p></li><li><p>점4</p></li></ul><div data-language="java" class="toastui-editor-ww-code-block"><pre><code data-language="java">function(int x) {
      System.out.println("안녕안녕");
    }</code></pre></div><ul><li class="task-list-item" data-task="true"><p>체크리스트1</p></li><li class="task-list-item" data-task="true"><p>체크리스트2</p></li><li class="task-list-item" data-task="true"><p>체크리스트3</p></li><li class="task-list-item" data-task="true"><p>체크리스트4</p></li></ul><blockquote><p>인용</p><p>인용</p><p>인용</p></blockquote><p><strong>굵게</strong></p><p><em>기울게</em></p><p><del>lineThrowgh</del></p>`,
    hit: 23,
    title: "첫번째 글",
  };
  return (
    <Register>
      <Button name="뒤로" width="5rem" onClick={onClickHome} mb="1rem" />
      <TitleContainer>
        <div className="title">{sampleData.title}</div>
        <ProfileContainer>
          <span className="userName">{sampleData.userName}</span>
          <span className="regTime">{sampleData.regTime}</span>
        </ProfileContainer>
        <EditContainer><span className="edit">수정하기</span> <span className="delete">삭제하기</span></EditContainer>
      </TitleContainer>
      <BoardContainer>
        <Viewer initialValue={sampleData.content} />
      </BoardContainer>
      
      <CommentContainer />
    </Register>
  );
};

export default CommunityDetail;
