import Input from "components/commons/input";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
`;

const Start = styled.div`
  border-radius: 20px;
  background-color: #fec25c;
  width: 7rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin: 2rem;
`;

const Desc = styled.div`
  font-size: 2rem;
  margin: 3rem;
`;

const Timer = styled.div`
  font-size: 4rem;
  font-weight: 600;
  width: 80%;
  margin-bottom: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RecordInsert = () => {
  const [isStart, setIsStart] = useState(true);
  return (
    <Container>
      <Input
        placeholder="어떤 공부를 시작할까요?"
        width="60%"
        height="3rem"
      ></Input>
      <Start>공부 시작</Start>
      {isStart && (
        <>
          <Desc>영어 공부 중...</Desc>
          <Timer>00:00:00</Timer>
        </>
      )}
    </Container>
  );
};

export default RecordInsert;
