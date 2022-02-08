import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 9rem;
  height: 10rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const Time = styled.div`
  margin-bottom: 0.5rem;
`;

const Total = styled.div`
  font-weight: 600;
  margin-top: 0.5rem;
`;
const Record = () => {
  return (
    <Container>
      <Title>영어</Title>
      <Time>시작: 19:00</Time>
      <Time>종료: 21:00</Time>
      <Total>2H 00M</Total>
    </Container>
  );
};

export default Record;
