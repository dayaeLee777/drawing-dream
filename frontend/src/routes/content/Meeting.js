import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import board from "assets/img/board.png";
import AttendanceModal from "../../components/attendance/AttendanceModal";
import { motion } from "framer-motion";
import { attend } from "api/attendance";
import { useDispatch, useSelector } from "react-redux";
import { attendance } from "modules/user";
import { getMeeting } from "api/meeting";

const Board = styled.div`
  background-image: url(${board});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 3rem;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const Arrow = styled.div`
  font-size: 3rem;
  color: #ffc25c;
`;

const Desc = styled.div`
  font-size: 2rem;
  color: white;
  text-align: center;
`;

const DateContainer = styled.div`
  font-size: 1.3rem;
  color: white;
  display: flex;
  justify-content: flex-end;
`;

const Main = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-left: 5rem;
  width: 45rem;
  line-height: 2;
  height: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3rem;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Meeting = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const { isAttend } = useSelector((state) => state.user);
  const attendToday = () => {
    console.log(modalOpen);
    attend().then((response) => {
      if (response.status === 200) {
        dispatch(attendance());
        setModalOpen(true);
        console.log(response);
      }
      // else if (response.status === 401)
      //error
    });
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    setDate(
      `${year}-${month >= 10 ? month : "0" + month}-${
        date >= 10 ? date : "0" + date
      }`
    );
    const params = {
      date: `${year}-${month >= 10 ? month : "0" + month}-${
        date >= 10 ? date : "0" + date
      }`,
      meetingCode: "K04",
    };
    getMeeting(params).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Board>
        <ContentContainer>
          {data ? (
            <>
              <InnerContainer>
                <Arrow>←</Arrow>
                <Desc>{data.title}</Desc>
                <DateContainer>{data.regDate}</DateContainer>
              </InnerContainer>
              <Main dangerouslySetInnerHTML={{ __html: data.content }}></Main>
            </>
          ) : (
            <>
              <InnerContainer>
                <Arrow>←</Arrow>
                <Desc></Desc>
                <DateContainer>{date}</DateContainer>
              </InnerContainer>
              <Main>아직 내용이 등록되지 않았습니다!</Main>
            </>
          )}
          <ButtonContainer>
            {isAttend ? (
              <Button height="3rem" bc="white" name="하교하기" />
            ) : (
              <Button
                height="3rem"
                bc="white"
                name="출석하기"
                onClick={attendToday}
              />
            )}
          </ButtonContainer>
        </ContentContainer>
        {modalOpen && (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setModalOpen(false)}
          >
            {modalOpen && <AttendanceModal date={date}></AttendanceModal>}
          </Overlay>
        )}
      </Board>
    </>
  );
};

export default Meeting;
