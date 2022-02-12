import { getCouresInfo } from "api/course";
import Widgets from "components/home/Widgets";
import TodayClassModal from "components/widgets/modals/TodayClassModal";
import { motion } from "framer-motion";
import { readTimeTable } from "modules/timetable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

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

const Home = () => {
  const dispatch = useDispatch();
  const { period, todayData } = useSelector((state) => state.timetable);
  const { userCode } = useSelector((state) => state.user);
  const [widgetId, setWidgetId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    let interval;
    if (isLoading) {
      console.log(isShow);
      dispatch(readTimeTable()).then(() => {
        if (userCode === "A04") {
          interval = setInterval(() => {
            if (todayData.length > 0) {
              const today = new Date();
              today.setHours(today.getHours() - 11); // 테스트용
              // today.setMinutes(today.getMinutes - 30);
              const time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              console.log(time);
              period.map((per) => {
                if (per.startTime < time && per.endTime > time) {
                  const courseId =
                    todayData[per.periodCode.slice(2, 3) - 1].courseId;
                  console.log(courseId);
                  getCouresInfo(courseId).then((res) => {
                    console.log(isShow);
                    if (res.data.onlineClassId) {
                      setIsShow(true);
                    }
                  });
                }
              });
            }
          }, 2000);
        }
        setIsLoading(false);
      });
    }
    return () => window.clearInterval(interval);
  }, []);

  const onClick = () => {
    setWidgetId(null);
    setIsShow(false);
  };
  return (
    <>
      <Widgets widgetId={widgetId} setWidgetId={setWidgetId} />
      {isShow && (
        <Overlay
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClick}
        >
          <TodayClassModal layoutId={"M01"} />
        </Overlay>
      )}
    </>
  );
};

export default Home;
