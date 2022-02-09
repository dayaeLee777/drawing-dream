import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCommunity, getCommunityDetail } from "api/community";
import { useSelector } from "react-redux";
import { deleteNotice, getNoticeDetail } from "api/notice";
import commonCode from "config/commonCode";

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
const FileContainer = styled.div`
  height: 5rem;
  /* background-color: #facead; */
  margin-top: 2rem;

  .desc {
    font-size: 1.2rem;
    padding-left: 0.5rem;
  }
  .fileList {
    margin-top: 1rem;
    padding: 0.5rem 2.5rem;
    border: 1px solid #dadde6;
    border-radius: 5px;
  }
  .file {
    font-size: 0.8rem;
    color: #828282;
    margin: 0.4rem 0;
    cursor: pointer;
    display: block;
    background-color: white;
    border: none;

    &:hover {
      color: #444444;
    }
  }
`;

const NoticeDetail = () => {
  const params = useParams();
  const Navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    userId: "",
    content: "",
    hit: "",
    noticeCode: "",
    files: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { userId, gradeCode, classCode } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoading) {
      getNoticeDetail(params.noticeId)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          Navigate("../");
          return () => {
            setIsLoading(false);
          };
        });
    }
  }, [isLoading]);

  const onDelete = () => {
    deleteNotice(params.noticeId).then(() => {
      alert("글이 삭제되었습니다.");
      Navigate("../");
    });
  };

  const onModify = () => {
    Navigate(`../modify/${params.noticeId}`);
  };

  const onDownload = (e) => {
    window.open(e.target.value);
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
        <div className="title">
          {data.noticeCode === "K01" ? (
            <>[전체] </>
          ) : data.noticeCode === "K02" ? (
            <>[{commonCode.E[gradeCode]}] </>
          ) : (
            <>
              [{commonCode.E[gradeCode]} {commonCode.F[classCode]}]
            </>
          )}
          {data.title}
        </div>
        <ProfileContainer>
          <span className="userName">{data.userName}</span>
          <span className="regTime">{data.regTime}</span>
        </ProfileContainer>
        <EditContainer>
          {userId === data.userId && (
            <>
              <span className="edit" onClick={onModify}>
                수정하기
              </span>
              <span className="delete" onClick={onDelete}>
                삭제하기
              </span>
            </>
          )}
        </EditContainer>
      </TitleContainer>
      {!isLoading && (
        <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
        </BoardContainer>
      )}
      <FileContainer>
        <div className="desc">첨부파일</div>
        <div className="fileList">
          {data.files &&
            Object.entries(data.files).map((item) => (
              <button className="file" key={item[1]} onClick={onDownload} value={item[1]}>
                {item[0]}
              </button>
            ))}
        </div>
      </FileContainer>
    </DetailContainer>
  );
};

export default NoticeDetail;
