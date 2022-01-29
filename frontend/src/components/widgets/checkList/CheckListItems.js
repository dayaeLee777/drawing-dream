import React, { useState } from "react";

import styled from "styled-components";
import CheckListItem from "./CheckListItem";

const CheckListItemsContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 10px;
  }
`;

const CheckListItems = ({ pIndex }) => {
  //------ test data --------
  const [items, setItems] = useState([
    {
      id: 1,
      text: "영어 문제집 10p 풀기",
      checked: true,
    },
    {
      id: 2,
      text: "수학 오답노트 복습",
      checked: false,
    },
    {
      id: 3,
      text: "당근마켓 택배 보내기",
      checked: false,
    },
    {
      id: 4,
      text: "국어 수행평가 제출",
      checked: false,
    },
    {
      id: 5,
      text: "영어 문제집 10p 풀기",
      checked: true,
    },
    {
      id: 6,
      text: "수학 오답노트 복습",
      checked: false,
    },
    {
      id: 7,
      text: "당근마켓 택배 보내기",
      checked: false,
    },
    {
      id: 8,
      text: "국어 수행평가 제출",
      checked: false,
    },
  ]);
  //-------------------------
  return (
    <CheckListItemsContainer>
      {items.map((item) => (
        <CheckListItem item={item} key={item.id} />
      ))}
    </CheckListItemsContainer>
  );
};

export default CheckListItems;
