import React, { useState } from "react";
import styled from "styled-components";
import CommuRegister from "components/school/CommuRegister";
import CommuList from "components/school/CommuList";
import CommuView from "components/school/CommuView";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const School = () => {
  const [list, setList] = useState(true);
  const [view, setView] = useState(false);

  return (
    <Container>
      {list ? (
        <CommuList setList={setList} setView={setView} />
      ) : view ? (
        <CommuView setList={setList} setView={setView} />
      ) : (
        <CommuRegister setList={setList} setView={setView} />
      )}
    </Container>
  );
};

export default School;
