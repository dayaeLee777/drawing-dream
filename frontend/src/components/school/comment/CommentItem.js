import React from "react";
import styled from "styled-components";

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

const CommentItem = ({ data, children }) => {
  const sampleData = [
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
  ];
  return (
    <Container>
      <Content pl={children}>
        <div className="userName">{data.userName}</div>
        <div className="content">{data.comment}</div>
        <FeatureContainer>
          <span className="regTime">{data.regTime}</span>
          <span className="reCommentBtn">답글달기</span>
          <span className="reCommentBtn">수정하기</span>
          <span className="reCommentBtn">삭제하기</span>
        </FeatureContainer>
      </Content>
      {children && sampleData.map(
        (item) => <CommentItem data={item} key={item.id} />
      )}
    </Container>
  );
};

export default CommentItem;
