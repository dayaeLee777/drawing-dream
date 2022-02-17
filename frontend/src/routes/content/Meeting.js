import Button from "components/commons/button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import board from "assets/img/board.png";
import AttendanceModal from "../../components/attendance/AttendanceModal";
import { motion } from "framer-motion";
import { attend, checkAttend } from "api/attendance";
import { useDispatch, useSelector } from "react-redux";
import { attendance, finish, logout } from "modules/user";
import { getMeeting } from "api/meeting";
import { errorAlert } from "modules/alert";
import { useNavigate } from "react-router-dom";

const Board = styled.div`
  background-image: url(${board});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 85vh;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 6rem;
`;

const Arrow = styled.div`
  font-size: 3rem;
  color: #ffc25c;
  cursor: pointer;
  width: 10rem;
`;

const Desc = styled.div`
  font-size: 2rem;
  color: white;
  text-align: center;
  word-break: break-all;
`;

const DateContainer = styled.div`
  text-align: right;
  width: 10rem;
  font-size: 1.1rem;
  color: white;
`;

const Main = styled.div`
  box-sizing: border-box;
  font-size: 1.5rem;
  color: white;
  padding: 0 5rem;
  width: 100%;
  line-height: 2rem;
  height: 50vh;
  word-break: break-all;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  margin-right: 5rem;
  margin-top: 2rem;
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
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState();
  const [disabled, setDisabled] = useState(false);
  const { userId, isAttend } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const attendToday = () => {
    attend().then((response) => {
      if (response.status === 200) {
        setMessage("출석되었습니다.");
        dispatch(attendance());
        setModalOpen(true);
      }
    });
  };

  const closeToday = () => {
    setMessage("오늘 하루도 수고 많았어요!");
    dispatch(finish());
    setModalOpen(true);
  };
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    setDate(
      `${year}년 ${month >= 10 ? month : "0" + month}월 ${
        date >= 10 ? date : "0" + date
      }일`
    );

    const meetingCode = isAttend ? "K05" : "K04";
    const params = {
      date: `${year}-${month >= 10 ? month : "0" + month}-${
        date >= 10 ? date : "0" + date
      }`,
      meetingCode: meetingCode,
    };
    if (isLoading) {
      getMeeting(params)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "글이 존재하지 않습니다.");
          }
        });

      checkAttend(userId)
        .then((response) => {
          if (response.data.length > 0) {
            setDisabled(true);
          }
        })
        .catch((e) => {
          errorAlert(e.response.status, "출석 정보를 불러올 수 없습니다.");
        });
    }
  }, []);

  return (
    <>
      <Board>
        <ContentContainer>
          {!isLoading && data.noticeId ? (
            <>
              <InnerContainer>
                <Arrow
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  ←
                </Arrow>
                <Desc>{data.title}</Desc>
                <DateContainer>{data.regDate}</DateContainer>
              </InnerContainer>
              <Main dangerouslySetInnerHTML={{ __html: data.content }}></Main>
            </>
          ) : (
            <>
              <InnerContainer>
                <Arrow
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  ←
                </Arrow>
                <Desc></Desc>
                <DateContainer>{date}</DateContainer>
              </InnerContainer>
              <Main>아직 내용이 등록되지 않았습니다!</Main>
            </>
          )}
          <ButtonContainer>
            {isAttend ? (
              <Button
                height="3rem"
                bc="white"
                name="하교하기"
                onClick={closeToday}
              />
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
            {modalOpen && (
              <AttendanceModal
                isAttend={isAttend}
                message={message}
                date={date}
              ></AttendanceModal>
            )}
          </Overlay>
        )}
      </Board>
    </>
  );
};

export default Meeting;
