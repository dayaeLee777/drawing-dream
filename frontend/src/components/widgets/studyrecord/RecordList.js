import React from "react";
import styled from "styled-components";
import Record from "./Record";

const Container = styled.div`
  width: 80%;
  display: flex;
`;

const RecordStartBox = styled.div`
  width: 9rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  font-size: 2rem;
  color: #fec25c;
`;

const RecordList = ({ setIsRecord }) => {
  const openRecord = () => {
    setIsRecord(true);
    console.log("Hi");
  };
  return (
    <Container>
      <Record />
      <Record />
      <RecordStartBox onClick={openRecord}>+</RecordStartBox>
    </Container>
  );
};

export default RecordList;
