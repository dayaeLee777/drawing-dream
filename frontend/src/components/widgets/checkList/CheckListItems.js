import React, { useState } from "react";

import styled from "styled-components";
import CheckListItem from "./CheckListItem";

const CheckListItemsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckListItems = () => {
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
  ]);
  //-------------------------
  // items.map((item) => console.log(item));
  return (
    <CheckListItemsContainer>
      {items.map((item) => (
        <CheckListItem item={item} key={item.id} />
      ))}
    </CheckListItemsContainer>
  );
};

export default CheckListItems;
