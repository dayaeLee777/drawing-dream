import React from 'react';
import styled from 'styled-components';
import CommentRegister from './CommentRegister';
import CommentList from './CommentList';

const Container = styled.div`
  margin-top: 2rem;

  .desc {
    padding-left: 1remg;
    color: #333333;
    font-size: 1.2rem;
  }
`;

const CommentContainer = ({communityId}) => {
  return (
    <Container>
      <div className="desc">댓글</div>
      <CommentList communityId={communityId}/>
      <CommentRegister communityId={communityId} children/>
    </Container>
  );
};

export default CommentContainer;