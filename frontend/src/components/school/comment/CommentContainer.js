import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;

  .desc {
    padding-left: 1rem;
    color: #333333;
    font-size: 1.2rem;
  }
`;

const Line = styled.div`
  border-top: 1px solid #e2e2e2;
  height: 0;
  margin: 1rem 0;
`;


const CommentContainer = () => {
  return (
    <Container>
      <div className="desc">댓글</div>
      <Line />
    </Container>
  );
};

export default CommentContainer;