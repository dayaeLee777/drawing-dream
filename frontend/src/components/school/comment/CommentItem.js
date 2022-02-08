import {
  deleteComment,
  deleteReComment,
  getReCommentList,
} from "api/community";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentRegister from "./CommentRegister";
import blankProfile from "assets/img/blank-profile.png";

const Container = styled.div`
  font-size: 1rem;
  .userName {
    font-weight: 600;
  }
  .content {
    margin-top: 0.5rem;
  }
  border-top: 1px solid #e2e2e2;
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  box-sizing: border-box;
`;
const ProfileImg = styled.img`
  width: 3rem;
  border-radius: 45px;
  margin-right: 0.7rem;
`;

const Content = styled.div`
  padding-left: ${(props) => (props.pl ? "0rem" : "3rem")};
`;

const FeatureContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #787878;

  .regTime,
  .reCommentBtn {
    margin-right: 1rem;
  }
  .reCommentBtn {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const CommentItem = ({
  data,
  children,
  communityId,
  setCommentListIsLoading,
  setReCommentListIsLoading,
}) => {
  const { userId } = useSelector((state) => state.user);
  // 대댓글 관련
  const [reCommentList, setReCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reCommentRegister, setReCommentRegister] = useState({
    commentId: "",
    isReComment: false,
  });

  // 댓글 수정 관련
  const [commentModify, setCommentModify] = useState({
    commentId: "",
    isCommentModify: false,
  });

  // 대댓글 리스트 불러오기
  useEffect(() => {
    if (isLoading && data.commentId) {
      getReCommentList(data.commentId).then((res) => {
        setReCommentList(res.data.subCommentGetListResponseDtoList);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  /* const sampleData = [
    {
      id: 1,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
    {
      id: 2,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
    {
      id: 3,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
  ]; */

  // Click event
  // 대댓글 등록
  const onReCommentRegister = () => {
    setReCommentRegister({
      commentId: data.commentId,
      isReComment: !reCommentRegister.isReComment,
    });
  };
  // 댓글, 대댓글 삭제
  const onDelete = () => {
    if (children) {
      deleteComment(data.commentId)
        .then(() => {
          alert("댓글이 삭제되었습니다.");
        })
        .then(() => {
          setCommentListIsLoading(true);
        });
    } else {
      deleteReComment(data.commentId)
        .then(() => {
          alert("대댓글이 삭제되었습니다.");
        })
        .then(() => {
          setReCommentListIsLoading(true);
        });
    }
  };
  const onCommentModify = () => {
    setCommentModify({
      commentId: data.commentId,
      isCommentModify: !commentModify.isCommentModify,
    });
  };
  // Click event END

  return (
    <>
      <Content pl={children}>
        {!commentModify.isCommentModify && (
          <Container>
          <div>
            <ProfileImg src={blankProfile} />
          </div>
          <div>
            <div className="userName">{data.userName}</div>
            <div className="content">{data.content}</div>
            <FeatureContainer>
              <span className="regTime">{data.regTime}</span>
              {children && (
                <span className="reCommentBtn" onClick={onReCommentRegister}>
                  답글달기
                </span>
              )}
              {data.userId === userId && (
                <>
                  <span className="reCommentBtn" onClick={onCommentModify}>
                    수정하기
                  </span>
                  <span className="reCommentBtn" onClick={onDelete}>
                    삭제하기
                  </span>
                </>
              )}
            </FeatureContainer>
          </div>
          </Container>
        )}
        {/* 수정하기 누르면 나오는 입력 창 */}
        {commentModify.isCommentModify && (
          <CommentRegister
            data={data}
            modify
            communityId={communityId}
            setCommentModify={setCommentModify}
            setCommentListIsLoading={setCommentListIsLoading}
            setReCommentListIsLoading={setReCommentListIsLoading}
            children={children}
          />
        )}
        {/* 댓글 달기 눌렀을 때 해당 컴포넌트의 commentId와 기존에 props로 넘겨받은 commentId가 일치하고 isReCommend가 true 일 때만 댓글을 입력할 수 있는 register가 랜더링 */}
        {reCommentRegister.commentId === data.commentId &&
          reCommentRegister.isReComment && (
            <CommentRegister
              commentId={data.commentId}
              communityId={communityId}
              setReCommentListIsLoading={setIsLoading}
            />
          )}
      </Content>
      {children &&
        reCommentList &&
        reCommentList.map((item) => (
          <CommentItem
            data={item}
            key={item.commentId}
            setReCommentListIsLoading={setIsLoading}
          />
        ))}
    </>
  );
};

export default CommentItem;
