import React from "react";
import styled from "styled-components";
import CheckListInsert from "./CheckListInsert";
import CheckListItems from "./CheckListItems";

const CheckListContainer = styled.div`
  height: 80%;
  width: 60%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CheckListContent = () => {
  return (
    <CheckListContainer>
      <CheckListInsert />
      <CheckListItems />
    </CheckListContainer>
  );
};

export default CheckListContent;
