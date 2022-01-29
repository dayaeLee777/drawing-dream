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

const CheckListItems = ({ isLoad, setIsLoad, main }) => {
  const [list, setList] = useState(null);
  useEffect(() => {
    getCheckList().then((res) => {
      setList(res.data);
    });
    setIsLoad(false);
  }, [isLoad]);
  if (main) {
    if (list) {
      return (
        <CheckListItemsContainer>
          {list &&
            list.slice(0,list.length < 8 ? list.length:7).map((item) => (
              <CheckListItem
                item={item}
                key={item.cheklistId}
                setIsLoad={setIsLoad}
                main
              />
            ))}
        </CheckListItemsContainer>
      );
    } else {
      return (
        <>체크리스트를 등록해주세요.</>
      )
    }
  }
  return (
    <CheckListItemsContainer>
      {list &&
        list.map((item) => (
          <CheckListItem
            item={item}
            key={item.cheklistId}
            setIsLoad={setIsLoad}
          />
        ))}
    </CheckListItemsContainer>
  );
};

export default CheckListItems;
