import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { deleteMemo, getMemo, modifyMemo, registerMemo } from "api/memo";

const MemoInsertContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 5rem;
`;
const StyledTextArea = styled.textarea`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  border: none;
  resize: none;
  height: 28rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
`;
const ButtonContainer = styled.div`
  text-align: right;
  color: #A19F9F;
  margin-top: 0.5rem;
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

  useState(() => {
    if (isLoading && memoId) {
      getMemo(memoId).then((res) => {
        setContent(res.data.content);
        setIsLoading(false);
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
      registerMemo({ content }).then(() => {
        setContent("");
        setIsListLoading(true);
        setStatus("list");
      });
    } else {
      modifyMemo({ content, memoId }).then(() => {
        setIsListLoading(true);
        setStatus("list");
        setMemoId("");
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
    deleteMemo(memoId).then(() => {
      setIsListLoading(true);
      setStatus("list");
      setMemoId("");
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
