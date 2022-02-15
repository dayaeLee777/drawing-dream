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
import StudyRecordModal from "components/widgets/modals/StudyRecordModal";
import TimeTableModal from "components/widgets/modals/TimeTableModal";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.ContainerColor};
  min-height: 85vh;
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const Desc = styled.div`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.menuColor};
`;

const Wrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  .more {
    line-height: 2;
    text-align: center;
    padding-top: 1.5rem;
    color: ${({ theme }) => theme.textColor};
  }
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const WidgetList = () => {
  const [widgetId, setWidgetId] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const widgets = ["M01", "M02", "M03", "M04", "M05", "M06", "M07"];
  const widgetList = commonCode.M;
  const mod = {
    M01: <TodayClassModal layoutId={widgetId} />,
    M02: <DdayModal layoutId={widgetId} />,
    M03: (
      <CheckListModal
        layoutId={widgetId}
        isLoad={isLoad}
        setIsLoad={setIsLoad}
      />
    ),
    M04: <MemoModal layoutId={widgetId} />,
    M05: <ScoreModal layoutId={widgetId} />,
    M06: <StudyRecordModal layoutId={widgetId} />,
    M07: <TimeTableModal layoutId={widgetId} />,
  };

  return (
    <Container>
      <Title>모아보기</Title>
      <Desc>학습에 필요한 다양한 위젯 기능들을 만나 보세요.</Desc>
      <>
        <Wrapper>
          {widgets.map((widget) => (
            <Widget
              setWidgetId={setWidgetId}
              key={widget}
              id={widget}
              name={widgetList[widget]}
              loc="list"
            />
          ))}
          <Desc className="more">
            더 다양한 위젯들이 <br />
            업데이트될 예정입니다!
          </Desc>
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
              {mod[widgetId]}
            </Overlay>
          )}
        </AnimatePresence>
      </>
    </Container>
  );
};

export default WidgetList;
