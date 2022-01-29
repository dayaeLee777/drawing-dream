import { getCheckList } from "api/checklist";
import React, { useEffect, useState } from "react";

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

const CheckListItems = ({ loading, setLoading }) => {
  const [list, setList] = useState(null);
  useEffect(() => {
    getCheckList().then((res) => {
      setList(res.data);
    });
    setLoading(false);
  }, [loading]);
  return (
    <CheckListItemsContainer>
      {list &&
        list.map((item) => (
          <CheckListItem
            item={item}
            key={item.cheklistId}
            setLoading={setLoading}
          />
        ))}
    </CheckListItemsContainer>
  );
};

export default CheckListItems;
