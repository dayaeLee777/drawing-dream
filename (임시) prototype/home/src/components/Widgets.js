import styled from "styled-components";
import React, { useEffect, useState } from "react";
import TodayClass from "./widgets/TodayClass";
import Dday from "./widgets/Dday";
import CheckList from "./widgets/CheckList";
import Memo from "./widgets/Memo";
import WidgetModal from "./widgets/WidgetModal";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  margin: 0 2.5rem;
  display: flex;
  width: 100%;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Widgets = () => {
  const [isShowTC, setIsShowTC] = useState(true);
  const [isShowCL, setIsShowCL] = useState(true);

  const [widgetId, setWidgetId] = useState();

  console.log(isShowTC);
  // useEffect(() => {}, [isShow]);
  return (
    <>
      <Container>
        {isShowTC && (
          <TodayClass setWidgetId={setWidgetId} setIsShow={setIsShowTC} />
        )}
        <Dday></Dday>
        {isShowCL && <CheckList setIsShow={setIsShowCL} />}
        <Memo></Memo>
      </Container>
      <AnimatePresence>
        {widgetId ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setWidgetId(null)}
          >
            <WidgetModal layoutId={widgetId}></WidgetModal>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Widgets;
