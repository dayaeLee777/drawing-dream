import Button from "components/commons/button";
import React, { useState } from "react";
import styled from "styled-components";
import board from "assets/img/board.png";
import Modal from "../components/modal/Modal";

const Board = styled.article`
  background-image: url(${board});
  background-repeat: no-repeat;
  background-size: 57rem;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  min-width: 57rem;
  height: 37rem;
  padding-top: 2rem;
  padding-left: 3rem;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 50rem;
  height: 3rem;
`;

const Arrow = styled.div`
  font-size: 3rem;
  color: #ffc25c;
`;

const Desc = styled.div`
  font-size: 3rem;
  color: white;
  text-align: center;
`;

const Date = styled.div`
  font-size: 1.3rem;
  color: white;
  text-align: right;
  align-self: end;
`;

const Main = styled.article`
  font-size: 2rem;
  color: white;
  margin-left: 3rem;
  width: 45rem;
  line-height: normal;

  button {
    background-color: white;
    border-radius: 30px;
    font-size: 1.5rem;
    width: 10rem;
    height: 3rem;
    margin-bottom: 5rem;
    margin-left: 35rem;
  }
`;

const LookUp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Board>
        <InnerContainer>
          <Arrow>←</Arrow>
          <Desc>아침 조회</Desc>
          <Date>2020년 11월 21일</Date>
        </InnerContainer>
        <Main>
          2학년 6반 아침조회는 따로 없어요!
          <p>수업 준비 잘하고, 졸지 말고, 수업 듣기!</p>
          종례시간에 선생님 온라인 교실에서 만나요~
        </Main>
        <Main>
          <Button name="출석하기" onClick={modalClose} />
        </Main>
        {modalOpen && <Modal modalClose={modalClose}></Modal>}
      </Board>
    </>
  );
};

export default LookUp;
