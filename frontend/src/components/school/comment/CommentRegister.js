import { registerComment, registerSubComment } from "api/community";
import Button from "components/commons/button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-top: 1rem;
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

const CommentRegister = ({ communityId, children, commentId }) => {
  const { userName, userId } = useSelector((state) => state.user);
  const [content, setContent] = useState("");

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onRegister = () => {
    if (children) {
      registerComment({ communityId: communityId, content: content }).then(
        () => {
          alert("댓글이 등록되었습니다.");
          setContent("");
        }
      );
    } else {
      registerSubComment({ communityId, content, commentId, userId }).then(
        () => {
          alert("대댓글이 등록되었습니다.");
          setContent("");
        }
      );
    }
  };

  return (
    <InputContainer>
      <div className="userName">{userName}</div>
      <StyledTextArea
        placeholder="댓글을 입력해주세요."
        onChange={onChange}
        value={content}
      />
      <Button name="등록" width="3.5rem" onClick={onRegister} />
    </InputContainer>
  );
};

export default CommentRegister;
