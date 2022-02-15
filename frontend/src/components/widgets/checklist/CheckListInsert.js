import React, { useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { registerCheckList } from "api/checklist";
import { errorAlert } from "modules/alert";
import { useDispatch } from "react-redux";
import { logout } from "modules/user";

const CheckListInsertContainer = styled.div`
  display: flex;
  width: 100%;
  input {
    outline: none;
    border: 1px solid #dca03a;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.widgetColor};
    &::placeholder {
      color: #dee2e6;
    }
    flex: 1;
  }

  button {
    background: none;
    outline: none;
    border: none;
    background: #fec25c;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #dca03a;
    }
  }
`;

const CheckListInsert = ({ setIsListLoading }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClick = () => {
    registerCheckList({ content: text })
      .then(() => {
        setIsListLoading(true);
        setText("");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else if (e.response.status === 409) {
          errorAlert("체크리스트 작성에 실패하였습니다.");
        }
      });
  };

  return (
    <CheckListInsertContainer>
      <input
        placeholder="내용을 입력하세요"
        value={text}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
      />
      <button onClick={onClick}>
        <MdAdd />
      </button>
    </CheckListInsertContainer>
  );
};

export default CheckListInsert;
