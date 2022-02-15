import {
  modifyComment,
  modifyReComment,
  registerComment,
  registerSubComment,
} from "api/community";
import Button from "components/commons/button";
import { errorAlert, successAlert } from "modules/alert";
import { logout } from "modules/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-top: 2rem;
  /* border: 1px solid #c4c4c4; */
  border-radius: 5px;
  margin-left: ${(props) => (props.ml ? props.ml : "")};
  .userName {
    font-weight: 600;
  }
`;

const StyledTextArea = styled.textarea`
  border-radius: 5px;
  margin-top: 1rem;
  width: 100%;
  height: 5rem;
  border: none;
  resize: none;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.ContainerColor};
  border: 1px solid #dadde6;
  &::placeholder {
    color: ${({ theme }) => theme.textColor};
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  button {
    /* margin-left: auto; */
  }
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
  setReCommentRegister,
  ml,
}) => {
  const { userName, userId } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

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
            successAlert("댓글이 수정되었습니다.");
            setCommentListIsLoading(true);
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "댓글 수정에 실패하였습니다.");
            }
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
            successAlert("대댓글이 수정되었습니다.");
            setReCommentListIsLoading(true);
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "대댓글 수정에 실패하였습니다.");
            }
          });
      }
    } else {
      if (children) {
        registerComment({ communityId: communityId, content: content })
          .then(() => {
            successAlert("댓글이 등록되었습니다.");
            setContent("");
            setCommentListIsLoading(true);
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "댓글 등록에 실패하였습니다.");
            }
          });
      } else {
        registerSubComment({ communityId, content, commentId, userId })
          .then(() => {
            successAlert("대댓글이 등록되었습니다.");
            setContent("");
          })
          .then(() => {
            setReCommentListIsLoading(true);
            setReCommentRegister({
              commentId: "",
              isReComment: false,
            });
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
              dispatch(logout());
            } else {
              errorAlert(e.response.status, "대댓글 등록에 실패하였습니다.");
            }
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
    <InputContainer ml={ml}>
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
