import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Chart from "../studyrecord/Chart";
import RecordList from "../studyrecord/RecordList";
import RecordInsert from "../studyrecord/RecordInsert";

const Wrapper = styled(motion.div)`
  width: 70rem;
  height: 800px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  /* letter-spacing: -1px; */
`;
const Header = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: fit-content;
  margin: 2rem;
`;

const Back = styled.div`
  font-size: 20px;
  color: #fec25c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartContainer = styled.div`
  width: 30rem;
  margin: 0 2rem;
`;

const TotalContainer = styled.div`
  width: 30rem;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Desc = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;
const Total = styled.div`
  font-weight: 600;
  font-size: 2rem;
  margin-top: 2rem;
`;
const StudyRecordModal = ({ layoutId }) => {
  const [isRecord, setIsRecord] = useState(false);
  const onClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      {isRecord ? (
        <>
          <Header>
            <Back
              onClick={() => {
                setIsRecord(false);
              }}
            >
              ←
            </Back>
            <Title>공부하기</Title>
          </Header>
          <RecordInsert setIsRecord={setIsRecord} />
        </>
      ) : (
        <>
          <Header>
            <Title>오늘의 공부 시간</Title>
          </Header>
          <Content>
            <ChartContainer>
              <Chart />
            </ChartContainer>
            <TotalContainer>
              <Desc>오늘 공부한 시간</Desc>
              <Total>6H 20M</Total>
            </TotalContainer>
          </Content>
          <RecordList setIsRecord={setIsRecord} />
        </>
      )}
    </Wrapper>
  );
};

export default StudyRecordModal;
