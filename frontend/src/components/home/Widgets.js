import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookies, useCookies } from "react-cookie";
import CheckList from "components/widgets/CheckList";
import Dday from "components/widgets/Dday";
import Memo from "components/widgets/Memo";
import TodayClass from "components/widgets/TodayClass";
import TodayClassModal from "components/widgets/modals/TodayClassModal";
import MemoModal from "components/widgets/modals/MemoModal";
import DdayModal from "components/widgets/modals/DdayModal";
import CheckListModal from "components/widgets/modals/CheckListModal";
import ScoreModal from "components/widgets/modals/ScoreModal";
import StudyPlannerModal from "components/widgets/modals/StudyPlannerModal";
import TimeTableModal from "components/widgets/modals/TimeTableModal";
import Score from "components/widgets/Score";
import StudyPlanner from "components/widgets/StudyPlanner";
import TimeTable from "components/widgets/TimeTable";

const Container = styled.div`
  display: grid;
  height: 80vh;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr;
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

const Widgets = () => {
  const [widgetId, setWidgetId] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["myWidgets"]);
  const widgets = ["M01", "M02", "M03", "M04", "M05", "M06", "M07"];

  const wid = {
    M01: <TodayClass key={widgets[0]} setWidgetId={setWidgetId} />,
    M02: <Dday key={widgets[1]} setWidgetId={setWidgetId} />,
    M03: (
      <CheckList
        key={widgets[2]}
        setWidgetId={setWidgetId}
        isLoad={isLoad}
        setIsLoad={setIsLoad}
      />
    ),
    M04: <Memo key={widgets[3]} setWidgetId={setWidgetId} />,
    M05: <Score key={widgets[4]} setWidgetId={setWidgetId} />,
    M06: <StudyPlanner key={widgets[5]} setWidgetId={setWidgetId} />,
    M07: <TimeTable key={widgets[6]} setWidgetId={setWidgetId} />,
  };

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
    M06: <StudyPlannerModal layoutId={widgetId} />,
    M07: <TimeTableModal layoutId={widgetId} />,
  };

  useEffect(() => {
    if (cookies.myWidgets) {
      console.log(cookies.myWidgets);
    }
  }, []);

  return (
    <>
      <Container>{cookies.myWidgets.map((widget) => wid[widget])}</Container>
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
  );
};

export default Widgets;
