import styled from "styled-components";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodayClassModal from "components/widgets/modals/TodayClassModal";
import MemoModal from "components/widgets/modals/MemoModal";
import DdayModal from "components/widgets/modals/DdayModal";
import CheckListModal from "components/widgets/modals/CheckListModal";
import commonCode from "config/commonCode";
import Widget from "components/widgets/Widget";
import ScoreModal from "components/widgets/modals/ScoreModal";
import StudyPlannerModal from "components/widgets/modals/StudyPlannerModal";
import TimeTableModal from "components/widgets/modals/TimeTableModal";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const Desc = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const Wrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
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

const WidgetList = () => {
  const [isShow, setIsShow] = useState(true);
  const [widgetId, setWidgetId] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const widgetList = [
    commonCode.M.M01,
    commonCode.M.M02,
    commonCode.M.M03,
    commonCode.M.M04,
    commonCode.M.M05,
    commonCode.M.M06,
    commonCode.M.M07,
  ];
  return (
    <Container>
      <Desc>모아보기</Desc>
      <>
        <Wrapper>
          {widgetList.map((widget, index) => (
            <Widget
              setWidgetId={setWidgetId}
              key={index}
              id={`M0${index + 1}`}
              name={widget}
              loc="list"
            />
          ))}
        </Wrapper>
        <AnimatePresence>
          {widgetId && (
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setWidgetId(null)}
            >
              {widgetId === "M01" && (
                <TodayClassModal layoutId={widgetId}></TodayClassModal>
              )}
              {widgetId === "M02" && (
                <DdayModal layoutId={widgetId}></DdayModal>
              )}
              {widgetId === "M03" && (
                <CheckListModal
                  layoutId={widgetId}
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
                />
              )}
              {widgetId === "M04" && (
                <MemoModal layoutId={widgetId}></MemoModal>
              )}
              {widgetId === "M05" && (
                <ScoreModal layoutId={widgetId}></ScoreModal>
              )}
              {widgetId === "M06" && (
                <StudyPlannerModal layoutId={widgetId}></StudyPlannerModal>
              )}
              {widgetId === "M07" && (
                <TimeTableModal layoutId={widgetId}></TimeTableModal>
              )}
            </Overlay>
          )}
        </AnimatePresence>
      </>
    </Container>
  );
};

export default WidgetList;
