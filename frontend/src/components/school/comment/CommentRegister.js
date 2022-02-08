import {
  modifyComment,
  modifyReComment,
  registerComment,
  registerSubComment,
} from "api/community";
import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
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

const BtnContainer = styled.div`
  display: flex;
`;

const CommentRegister = ({
  communityId,
  children,
  commentId,
  data,
  modify,
  setCommentModify,
  setCommentListIsLoading,
  setReCommentListIsLoading,
}) => {
  const { userName, userId } = useSelector((state) => state.user);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (modify) {
      setContent(data.content);
    }
  }, []);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onRegister = () => {
    if (modify) {
      if (children) {
        modifyComment({ commentId: data.commentId, content })
          .then(() => {
            setCommentModify({
              commentId: "",
              isCommentModify: false,
            });
          })
          .then(() => {
            alert("댓글이 수정되었습니다.");
            setCommentListIsLoading(true);
          });
      } else {
        modifyReComment({ commentId: data.commentId, content })
          .then(() => {
            setCommentModify({
              commentId: "",
              isCommentModify: false,
            });
          })
          .then(() => {
            alert("대댓글이 수정되었습니다.");
            setReCommentListIsLoading(true);
          });
      }
    } else {
      if (children) {
        registerComment({ communityId: communityId, content: content }).then(
          () => {
            alert("댓글이 등록되었습니다.");
            setContent("");
            setCommentListIsLoading(true);
          }
        );
      } else {
        registerSubComment({ communityId, content, commentId, userId })
          .then(() => {
            alert("대댓글이 등록되었습니다.");
            setContent("");
          })
          .then(() => {
            setReCommentListIsLoading(true);
          });
      }
    }
  };

  const onCancle = () => {
    setCommentModify({
      commentId: "",
      isCommentModify: false,
    });
  };

  return (
    <InputContainer>
      <div className="userName">{userName}</div>
      <StyledTextArea
        placeholder="댓글을 입력해주세요."
        onChange={onChange}
        value={content}
      />
      <BtnContainer>
        <Button
          name={modify ? "수정" : "등록"}
          width="3.5rem"
          onClick={onRegister}
          mr="1rem"
        />
        {modify && (
          <Button
            name="취소"
            width="3.5rem"
            bc="#C4C4C4"
            hoverColor="#a2a2a2"
            onClick={onCancle}
          />
        )}
      </BtnContainer>
    </InputContainer>
  );
};

export default CommentRegister;
