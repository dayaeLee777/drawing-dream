import { getCheckList } from "api/checklist";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import CheckListInsert from "./CheckListInsert";
import CheckListItem from "./CheckListItem";

const CheckListContainer = styled.div`
  height: 25rem;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CheckListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  ::-webkit-scrollbar {
    width: 10px;
    display: ${(props) => (props.main ? "none" : "")};
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 10px;
  }
`;
const NullList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckListItems = ({ isListLoading, setIsListLoading, main }) => {
  const [list, setList] = useState(null);
  useEffect(() => {
    if (isListLoading) {
      getCheckList().then((res) => {
        setList(res.data);
        setIsListLoading(false);
      });
    }
  }, [isListLoading]);

  return (
    <CheckListContainer main={main}>
      {!main && <CheckListInsert setIsListLoading={setIsListLoading} />}
      <CheckListItemsContainer main={main}>
        {list &&
          list.map((item) => (
            <CheckListItem
              item={item}
              key={item.cheklistId}
              setIsListLoading={setIsListLoading}
              main={main}
            />
          ))}
        {!isListLoading && list.length === 0 && (
          <NullList>등록된 체크리스트가 없습니다.</NullList>
        )}
      </CheckListItemsContainer>
    </CheckListContainer>
  );
};

export default CheckListItems;
