import React from "react";
import styled from "styled-components";
import CheckListInsert from "./CheckListInsert";
import CheckListItems from "./CheckListItems";

const CheckListContainer = styled.div`
  height: 25vh;
  width: 40vw;
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
