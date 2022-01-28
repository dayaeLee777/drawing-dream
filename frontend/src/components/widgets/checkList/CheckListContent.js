import React from "react";
import styled from "styled-components";
import CheckListItems from "./CheckListItems";

const CheckListContainer = styled.div``;

const CheckListContent = () => {
  return (
    <CheckListContainer>
      <CheckListItems />
    </CheckListContainer>
  );
};

export default CheckListContent;
