import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { deleteMemo, getMemo, modifyMemo, registerMemo } from "api/memo";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";
import { useDispatch } from "react-redux";

const MemoInsertContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
`;
const StyledTextArea = styled.textarea`
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #a19f9f;
  resize: none;
  height: 25rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.widgetColor};
`;
const ButtonContainer = styled.div`
  text-align: right;
  color: #a19f9f;
  margin-top: 2rem;
  .complete {
    margin-right: 2rem;
    cursor: pointer;
  }
  .cancle {
    margin-right: 1rem;
    cursor: pointer;
  }
  .delete {
    margin-right: 2rem;
    color: red;
    cursor: pointer;
  }
`;

const MemoInsert = ({ setStatus, setIsListLoading, memoId, setMemoId }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && memoId) {
      getMemo(memoId)
        .then((res) => {
          setContent(res.data.content);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "메모를 불러오지 못했습니다.");
          }
        });
    }
  }, [isLoading]);

  const onChange = useCallback((e) => {
    setContent(e.target.value);
  });

  const onRegister = () => {
    const contentsReplaceNewline = () => {
      return content.replaceAll("<br>", "\r\n");
    };
    setContent(contentsReplaceNewline());
    if (!memoId) {
      registerMemo({ content })
        .then(() => {
          setContent("");
          setIsListLoading(true);
          setStatus("list");
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "메모 등록에 실패했습니다.");
          }
        });
    } else {
      modifyMemo({ content, memoId })
        .then(() => {
          setIsListLoading(true);
          setStatus("list");
          setMemoId("");
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "메모 수정에 실패했습니다.");
          }
        });
    }
  };
  const onCancle = () => {
    if (memoId) {
      setMemoId("");
    }
    setStatus("list");
    setIsListLoading(true);
  };
  const onDelete = () => {
    deleteMemo(memoId)
      .then(() => {
        setIsListLoading(true);
        setStatus("list");
        setMemoId("");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else {
          errorAlert(e.response.status, "메모 삭제에 실패했습니다.");
        }
      });
  };
  return (
    <MemoInsertContainer>
      <StyledTextArea
        placeholder="내용을 입력하세요."
        value={content}
        onChange={onChange}
      />
      <ButtonContainer>
        {memoId && (
          <span className="delete" onClick={onDelete}>
            삭제
          </span>
        )}
        <span className="complete" onClick={onRegister}>
          {memoId ? "수정" : "완료"}
        </span>
        <span className="cancle" onClick={onCancle}>
          취소
        </span>
      </ButtonContainer>
    </MemoInsertContainer>
  );
};

export default MemoInsert;
