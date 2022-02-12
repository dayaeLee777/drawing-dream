import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const School = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default School;
