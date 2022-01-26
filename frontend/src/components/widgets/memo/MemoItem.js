import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid #828282;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  /* background-color: ${({ theme }) => theme.widgetColor}; */
`;

const Title = styled.div`
  margin-bottom: 1rem;
`;
const Time = styled.div``;

const MemoItem = () => {
  return (
    <Container>
      <Title>오늘 공부할 것들</Title>
      <Time>2022-01-26 12:33</Time>
    </Container>
  );
};

export default MemoItem;
