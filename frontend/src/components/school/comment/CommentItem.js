import { getReCommentList } from "api/community";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommentRegister from "./CommentRegister";

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
`;

const Content = styled.div`
  padding-left: ${(props) => (props.pl ? "1rem" : "3rem")};
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

const CommentItem = ({ data, children, communityId }) => {
  const [reCommentList, setReCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading && data.commentId) {
      getReCommentList(data.commentId).then((res) => {
        setReCommentList(res.data.subCommentGetListResponseDtoList);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  // const sampleData = [
  //   {
  //     id: 1,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  //   {
  //     id: 2,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  //   {
  //     id: 3,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  // ];

  const [reCommentRegister, setReCommentRegister] = useState({
    commentId: "",
    isReComment: false,
  });

  const onReCommentRegister = () => {
    console.log(data.commentId);
    setReCommentRegister({
      commentId: data.commentId,
      isReComment: !reCommentRegister.isReComment,
    });
  };

  return (
    <Container>
      <Content pl={children}>
        <div className="userName">{data.userId}</div>
        <div className="content">{data.content}</div>
        <FeatureContainer>
          <span className="regTime">{data.regTime}</span>
          <span className="reCommentBtn" onClick={onReCommentRegister}>
            답글달기
          </span>
          <span className="reCommentBtn">수정하기</span>
          <span className="reCommentBtn">삭제하기</span>
        </FeatureContainer>
        {reCommentRegister.commentId === data.commentId &&
          reCommentRegister.isReComment && (
            <CommentRegister
              commentId={data.commentId}
              communityId={communityId}
            />
          )}
      </Content>
      {children &&
        reCommentList &&
        reCommentList.map((item) => (
          <CommentItem data={item} key={item.commentId} />
        ))}
    </Container>
  );
};

export default CommentItem;
