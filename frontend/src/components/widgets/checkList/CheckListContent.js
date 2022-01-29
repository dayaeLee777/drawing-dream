import React, { useState } from "react";
import styled from "styled-components";
import CheckListInsert from "./CheckListInsert";
import CheckListItems from "./CheckListItems";

const CheckListContainer = styled.div`
  height: 80%;
  width: 80%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CheckListContent = () => {
  const [loading, setLoading] = useState(true);
  return (
    <CheckListContainer>
      <CheckListInsert setLoading={setLoading} />
      <CheckListItems loading={loading} setLoading={setLoading} />
    </CheckListContainer>
  );
};

export default CheckListContent;
