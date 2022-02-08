import { endRecord, startRecord } from "api/studyrecode";
import Button from "components/commons/button";
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

const ConfirmModal = styled.div`
  width: 30rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.bgColor};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 10px;
  top: 50%;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 2rem;
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
`;

const RecordInsert = ({ setIsRecord }) => {
  const [isStart, setIsStart] = useState(false);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  const start = () => {
    startRecord({
      title,
    }).then((res) => {
      console.log(res);
      setIsStart(true);
      setRecordId(res.data.studyRecordId);
    });
  };

  const end = () => {
    setShowModal(true);
  };

  const realEnd = () => {
    endRecord(recordId).then((res) => {
      console.log(res);
      setIsRecord(false);
    });
  };

  const cancel = () => {
    setShowModal(false);
  };
  return (
    <Container>
      <Input
        placeholder="어떤 공부를 시작할까요?"
        width="60%"
        height="3rem"
        value={title}
        onChange={onChange}
      ></Input>
      {isStart ? (
        <Start onClick={end}>공부 종료</Start>
      ) : (
        <Start onClick={start}>공부 시작</Start>
      )}
      {isStart && (
        <>
          <Desc>영어 공부 중...</Desc>
          <Timer>00:00:00</Timer>
        </>
      )}

      {showModal && (
        <ConfirmModal>
          <Message>공부를 종료할까요?</Message>
          <ButtonContainer>
            <Button onClick={realEnd} name="종료하기"></Button>
            <Button onClick={cancel} name="계속하기" bc="#828282"></Button>
          </ButtonContainer>
        </ConfirmModal>
      )}
    </Container>
  );
};

export default RecordInsert;
