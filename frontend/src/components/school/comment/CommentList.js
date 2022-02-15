import { getCommentList } from "api/community";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import CommentRegister from "./CommentRegister";

const Container = styled.div`
  margin-top: 2rem;

  .desc {
    /* padding-left: 1rem; */
    color: ${({ theme }) => theme.textColor};
    font-size: 1.2rem;
  }
`;

const CommentList = ({ communityId }) => {
  const [commentList, setCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      getCommentList(communityId)
        .then((res) => {
          setCommentList(res.data.commentGetListResponseDtoList);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "댓글을 읽어오지 못했습니다.");
          }
        });
    }
  }, [isLoading]);
  return (
    <Container>
      <div className="desc">댓글</div>
      {commentList &&
        commentList.map((item) => (
          <CommentItem
            data={item}
            key={item.commentId}
            setCommentListIsLoading={setIsLoading}
            communityId={communityId}
            children
          />
        ))}
      <CommentRegister
        communityId={communityId}
        setCommentListIsLoading={setIsLoading}
        children
      />
    </Container>
  );
};

export default CommentList;
