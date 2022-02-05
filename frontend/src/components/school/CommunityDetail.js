import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import CommentContainer from "./comment/CommentContainer";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCommunity, getCommunityDetail } from "api/community";
import { useSelector } from "react-redux";

const DetailContainer = styled.div`
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

  .edit,
  .delete {
    margin-right: 0.5rem;
    text-decoration: underline;
    color: #787878;
    cursor: pointer;
  }
`;

const CommunityDetail = () => {
  const params = useParams();
  const Navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    userId: "",
    content: "",
    hit: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoading) {
      getCommunityDetail(params.communityId).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const onDelete = () => {
    deleteCommunity(params.communityId)
    .then(() => {
      alert("글이 삭제되었습니다.");
      Navigate("../");
    })
  }

  // const sampleData = {
  //   regTime: "2022.02.04",
  //   userName: "이학생",
  //   content: `<h1>제목1</h1><h2>제목 2</h2><h3>제목 3</h3><h4>제목 4</h4><h5>제목 5</h5><h6>제목 6</h6><ol><li><p>리스트1</p></li><li><p>리스트2</p></li><li><p>리스트3</p></li><li><p>리스트4</p></li></ol><ul><li><p>점1</p></li><li><p>점2</p></li><li><p>점3</p></li><li><p>점4</p></li></ul><div data-language="java" class="toastui-editor-ww-code-block"><pre><code data-language="java">function(int x) {
  //     System.out.println("안녕안녕");
  //   }</code></pre></div><ul><li class="task-list-item" data-task="true"><p>체크리스트1</p></li><li class="task-list-item" data-task="true"><p>체크리스트2</p></li><li class="task-list-item" data-task="true"><p>체크리스트3</p></li><li class="task-list-item" data-task="true"><p>체크리스트4</p></li></ul><blockquote><p>인용</p><p>인용</p><p>인용</p></blockquote><p><strong>굵게</strong></p><p><em>기울게</em></p><p><del>lineThrowgh</del></p>`,
  //   hit: 23,
  //   title: "첫번째 글",
  // };

  return (
    <DetailContainer>
      <TitleContainer>
        <div className="title">{data.title}</div>
        <ProfileContainer>
          <span className="userName">{data.userId}</span>
          <span className="regTime">{data.regTime}</span>
        </ProfileContainer>
        <EditContainer>
          {userId === data.userId && (
            <>
              <span className="edit">수정하기</span>
              <span className="delete" onClick={onDelete}>삭제하기</span>
            </>
          )}
        </EditContainer>
      </TitleContainer>
      {!isLoading && (
        <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
        </BoardContainer>
      )}

      <CommentContainer communityId={params.communityId}/>
    </DetailContainer>
  );
};

export default CommunityDetail;
