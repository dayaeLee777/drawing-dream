import React from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

const CheckListInsertContainer = styled.form`
  display: flex;
  width: 100%;
  input {
    outline: none;
    border: 1px solid #dca03a;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
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

const CheckListInsert = () => {
  return (
    <CheckListInsertContainer>
      <input placeholder="내용을 입력하세요" />
      <button type="submit">
        <MdAdd />
      </button>
    </CheckListInsertContainer>
  );
};

export default CheckListInsert;
