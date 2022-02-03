import styled from "styled-components";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckList from "components/widgets/CheckList";
import Dday from "components/widgets/Dday";
import Memo from "components/widgets/Memo";
import TodayClass from "components/widgets/TodayClass";
import TodayClassModal from "components/widgets/modals/TodayClassModal";
import MemoModal from "components/widgets/modals/MemoModal";
import DdayModal from "components/widgets/modals/DdayModal";
import CheckListModal from "components/widgets/modals/CheckListModal";

const Container = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 1fr;
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
  return (
    <>
      <Container>
        <TodayClass setWidgetId={setWidgetId} />
        <Dday setWidgetId={setWidgetId}></Dday>
        <CheckList
          setWidgetId={setWidgetId}
          isLoad={isLoad}
          setIsLoad={setIsLoad}
        />
        <Memo setWidgetId={setWidgetId}></Memo>
      </Container>
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
            {widgetId === "M02" && <DdayModal layoutId={widgetId}></DdayModal>}
            {widgetId === "M03" && (
              <CheckListModal
                layoutId={widgetId}
                isLoad={isLoad}
                setIsLoad={setIsLoad}
              />
            )}
            {widgetId === "M04" && <MemoModal layoutId={widgetId}></MemoModal>}
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Widgets;
