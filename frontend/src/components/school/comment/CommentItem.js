import {
  deleteComment,
  deleteReComment,
  getReCommentList,
} from "api/community";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommentRegister from "./CommentRegister";
import blankProfile from "assets/img/profile.png";
import { getProfileImg } from "api/user";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";

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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 45px;
  margin-right: 0.7rem;
`;

const Content = styled.div`
  padding-left: ${(props) => (props.pl ? "0rem" : "3rem")};
`;

const FeatureContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.menuColor};

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
  const [profileUrl, setProfileUrl] = useState("");
  const [isProfile, setIsProfile] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isProfile) {
      getProfileImg(data.userId)
        .then((res) => {
          setProfileUrl(res.data.fileName);
          setIsProfile(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "이미지를 불러오지 못했습니다.");
          }
        });
    }
  }, []);
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
  let time;
  let timeArr;
  if (!isLoading) {
    timeArr = data.regTime.split(" ");
    time = timeArr[0] + " " + timeArr[1].split(".")[0];
  }
  return (
    <>
      <Content pl={children}>
        {!commentModify.isCommentModify && (
          <Container>
            <div>
              <ProfileImg src={profileUrl ? profileUrl : blankProfile} />
            </div>
            <div>
              <div className="userName">{data.userName}</div>
              <div className="content">{data.content}</div>
              <FeatureContainer>
                <span className="regTime">{time}</span>
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
      {/* 댓글 달기 눌렀을 때 해당 컴포넌트의 commentId와 기존에 props로 넘겨받은 commentId가 일치하고 isReCommend가 true 일 때만 댓글을 입력할 수 있는 register가 랜더링 */}
      {reCommentRegister.isReComment && (
        <CommentRegister
          commentId={data.commentId}
          communityId={communityId}
          setReCommentListIsLoading={setIsLoading}
          setReCommentRegister={setReCommentRegister}
          ml="3rem"
        />
      )}
    </>
  );
};

export default CommentItem;
