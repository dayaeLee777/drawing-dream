import { deleteRecord } from "api/studyrecode";
import React from "react";
import styled from "styled-components";

const Delete = styled.div`
  display: none;
  position: absolute;
  opacity: 40%;
  top: 1rem;
  right: 1rem;
`;
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
  position: relative;
  &:hover ${Delete} {
    display: block;
  }
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
const Record = ({ setIsListLoading, data }) => {
  const del = () => {
    deleteRecord(data.studyRecordId).then((res) => {
      setIsListLoading(true);
      console.log(res);
    });
  };
  return (
    <Container>
      <Title>{data.title}</Title>
      <Delete onClick={del}>X</Delete>
      <Time>시작 {data.startTime.slice(11, 16)}</Time>
      <Time>종료 {data.endTime.slice(11, 16)}</Time>
      <Total>
        {data.durationTime.slice(0, 2)}H {data.durationTime.slice(3, 5)}M
      </Total>
    </Container>
  );
};

export default Record;
