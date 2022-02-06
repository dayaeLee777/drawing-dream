import React from 'react';
import styled from 'styled-components';
import CommentInsert from './CommentInsert';
import CommentList from './CommentList';

const Container = styled.div`
  margin-top: 2rem;

  .desc {
    padding-left: 1remg;
    color: #333333;
    font-size: 1.2rem;
  }
`;

const CommentContainer = () => {
  return (
    <Container>
      <div className="desc">댓글</div>
      <CommentList />
      <CommentInsert />
    </Container>
  );
};

export default CommentContainer;