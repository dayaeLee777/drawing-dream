import Button from 'components/commons/button';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-top: 3rem;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 1rem 1rem;

  .userName {
    font-weight: 600;
  }
`;

const StyledTextArea = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  height: 5rem;
  border: none;
  resize: none;
`;

const BtnContainer = styled.div`
  justify-content: end;
`;

const CommentInsert = () => {
  const { userName } = useSelector(state=>state.user);

  return (
    <InputContainer>
      <div className='userName'>{userName}</div>
      <StyledTextArea  placeholder='댓글을 입력해주세요.'/>
      <BtnContainer>
        <Button name="등록" width="3.5rem"/>
      </BtnContainer>
    </InputContainer>
  );
};

export default CommentInsert;