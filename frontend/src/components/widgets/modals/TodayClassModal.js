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

const Wrapper = styled(motion.div)`
  width: 1000px;
  height: 700px;
  padding: 2rem 3rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
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
  }

  button {
    width: 14rem;
    height: 2.5rem;
    margin-top: 2rem;
  }
`;

const TodayClassModal = ({ layoutId }) => {
  /////////////testdata//////////////
  const data = [
    {
      dayCode: "H01",
      periodCode: "I01",
      subjectCode: "G0100",
    },
    {
      dayCode: "H01",
      periodCode: "I02",
      subjectCode: "G0200",
    },
    {
      dayCode: "H01",
      periodCode: "I03",
      subjectCode: "G0300",
    },
    {
      dayCode: "H01",
      periodCode: "I04",
      subjectCode: "G0400",
    },
    {
      dayCode: "H01",
      periodCode: "I05",
      subjectCode: "G0500",
    },
    {
      dayCode: "H01",
      periodCode: "I06",
      subjectCode: "G0600",
    },
    {
      dayCode: "H01",
      periodCode: "I07",
      subjectCode: "G0700",
    },
  ];

  const { userCode } = useSelector((state) => state.user);
  const { todayData } = useSelector((state) => state.timetable);
  const navigate = useNavigate();

  const onClick = (event) => {
    event.stopPropagation();
  };

  const startClass = () => {
    const courseId = "c2964246-c2b5-07c3-934f-c39ac2b24f47";
    createOnlineClass({ courseId }).then((res) => {
      console.log(res);
      navigate(`/onlineclass/${courseId}`);
      window.location.reload();
    });
  };

  const { period } = useSelector((state) => state.timetable);
  const [nowPeriod, setNowPeriod] = useState();
  const [courseInfo, setCourseInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [courseId, setCourseId] = useState("");

  console.log(todayData);
  useEffect(() => {
    if (todayData.length > 0) {
      const today = new Date();
      today.setHours(today.getHours() - 7); // 테스트용
      // today.setMinutes(today.getMinutes() - 30);
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      period.map((per) => {
        // console.log(time);
        // console.log(per.startTime < time, per.startTime);
        // console.log(per.endTime > time, per.endTime);
        if (per.startTime < time && per.endTime > time) {
          setNowPeriod(per.periodCode);
          console.log(per.periodCode);
          setCourseId(todayData[per.periodCode.slice(2, 3) - 1].courseId);
        }
      });
    }
    setIsLoading(false);
    if (!isLoading && nowPeriod) {
      getCouresInfo(courseId)
        .then((res) => {
          setCourseInfo(res.data);
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
