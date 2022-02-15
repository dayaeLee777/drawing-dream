import { getCommentList } from "api/community";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isLoading) {
      getCommentList(communityId).then((res) => {
        setCommentList(res.data.commentGetListResponseDtoList);
        setIsLoading(false);
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
