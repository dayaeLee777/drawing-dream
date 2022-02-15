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

const RecordList = ({ setIsListLoading, setIsRecord, records }) => {
  const openRecord = () => {
    setIsRecord(true);
  };

  return (
    <Container>
      {records.map(
        (record) =>
          record.endTime !== null && (
            <Record
              setIsListLoading={setIsListLoading}
              key={record.studyRecordId}
              data={record}
            />
          )
      )}
      <RecordStartBox onClick={openRecord}>+</RecordStartBox>
    </Container>
  );
};

export default RecordList;
