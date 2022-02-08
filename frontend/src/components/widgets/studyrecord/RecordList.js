import { getRecordList } from "api/studyrecode";
import React, { useEffect, useState } from "react";
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
  const [records, setRecords] = useState([]);
  const openRecord = () => {
    setIsRecord(true);
    console.log("Hi");
  };

  useEffect(() => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    const studyDate = date.getFullYear() + "-" + month + "-" + day;

    getRecordList(studyDate).then((res) => {
      console.log(res);
      setRecords(res.data.studyRecordResponseDtoList);
    });
  }, []);
  return (
    <Container>
      {records.map(
        (record) =>
          record.endTime !== null && (
            <Record key={record.studyRecordId} data={record} />
          )
      )}
      <RecordStartBox onClick={openRecord}>+</RecordStartBox>
    </Container>
  );
};

export default RecordList;
