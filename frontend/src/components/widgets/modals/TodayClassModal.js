import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import LeftContainer from "../todayclass/LeftContainer";
import RightContainer from "../todayclass/RightContainer";
import { useSelector } from "react-redux";
import Button from "components/commons/button";
import { useNavigate } from "react-router-dom";
import { createOnlineClass } from "api/onlineclass";
import { createChatRoom } from "api/chat";
import teacher2 from "assets/img/teacher2.png";
import { getCouresInfo } from "api/course";
import { getNowPeriod } from "../todayclass/time";

const Wrapper = styled(motion.div)`
  width: 1000px;
  height: 700px;
  padding: 2rem 3rem;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  letter-spacing: -1px;
  box-sizing: border-box;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    margin: 10px 20px -40px;
  }

  button {
    width: 14rem;
    height: 2.5rem;
    margin-top: 2rem;
  }
`;

const TodayClassModal = ({ layoutId }) => {
  const { userCode } = useSelector((state) => state.user);
  const { todayData, period } = useSelector((state) => state.timetable);
  const [nowPeriod, setNowPeriod] = useState();
  const [courseInfo, setCourseInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [files, setFiles] = useState();
  const navigate = useNavigate();

  const onClick = (event) => {
    event.stopPropagation();
  };

  const startClass = () => {
    console.log(courseId);
    let formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("multipartFile", files[i]);
      }
    }
    formData.append(
      "onlineClassRegisterRequestDTO",
      new Blob(
        [
          JSON.stringify({
            courseId,
          }),
        ],
        { type: "application/json" }
      )
    );
    getCouresInfo(courseId).then((res) => {
      if (res.data.onlineClassId) {
        navigate(`/onlineclass/${courseId}`);
      } else {
        createOnlineClass(formData).then((res) => {
          navigate(`/onlineclass/${courseId}`);
        });
      }
    });
  };

  useEffect(() => {
    if (todayData.length > 0) {
      const periodCode = getNowPeriod(period);
      setNowPeriod(periodCode);
      todayData.map((data) => {
        if (data.periodCode === periodCode) setCourseId(data.courseId);
      });
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading && nowPeriod) {
      getCouresInfo(courseId)
        .then((res) => {
          setCourseInfo(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]);

  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      {nowPeriod && courseInfo && (
        <LeftContainer
          courseInfo={courseInfo}
          period={nowPeriod}
          data={todayData}
          setFiles={setFiles}
          files={files}
          setIsLoading={setIsLoading}
          courseId={courseId}
        />
      )}
      {userCode === "A03" && (
        <Right>
          <img src={teacher2} alt="캐릭터" />
          <Button onClick={startClass} name="수업 시작하기"></Button>
        </Right>
      )}
      {userCode === "A04" && courseInfo && (
        <RightContainer courseInfo={courseInfo} />
      )}
    </Wrapper>
  );
};

export default TodayClassModal;
