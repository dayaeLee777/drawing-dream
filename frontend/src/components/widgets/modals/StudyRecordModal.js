import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Chart from "../studyrecord/Chart";
import RecordList from "../studyrecord/RecordList";
import RecordInsert from "../studyrecord/RecordInsert";
import { getRecordList } from "api/studyrecode";

const Wrapper = styled(motion.div)`
  width: 70rem;
  height: 800px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
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
  color: ${({ theme }) => theme.textColor};
  margin-top: 2rem;
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
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState("");
  const [isListLoading, setIsListLoading] = useState(true);

  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  const studyDate = date.getFullYear() + "-" + month + "-" + day;

  const onClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    console.log(isListLoading);
    if (isListLoading) {
      getRecordList(studyDate).then((res) => {
        console.log(res);
        setRecords(res.data.studyRecordResponseDtoList);
        setTotal(res.data.totalStudyRecord);
        setIsListLoading(false);
      });
    }
  }, [isListLoading]);

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
          <RecordInsert
            setIsListLoading={setIsListLoading}
            setIsRecord={setIsRecord}
          />
        </>
      ) : (
        <>
          <Header>
            <Title>오늘의 공부 시간</Title>
          </Header>
          {!isListLoading && (
            <>
              <Content>
                <ChartContainer>
                  <Chart records={records} />
                </ChartContainer>
                <TotalContainer>
                  <Desc>오늘 공부한 시간</Desc>
                  <Total>
                    {total.slice(0, 2)}H {total.slice(3, 5)}M
                  </Total>
                </TotalContainer>
              </Content>
              <RecordList
                setIsListLoading={setIsListLoading}
                records={records}
                setIsRecord={setIsRecord}
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default StudyRecordModal;
