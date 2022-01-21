import styled from "styled-components";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckList from "components/widgets/CheckList";
import Dday from "components/widgets/Dday";
import Memo from "components/widgets/Memo";
import TodayClass from "components/widgets/TodayClass";
import TodayClassModal from "components/widgets/modals/TodayClassModal";

const Container = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 1fr;
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
  const [isShowTC, setIsShowTC] = useState(true);
  const [isShowCL, setIsShowCL] = useState(true);
  const [widgetId, setWidgetId] = useState();
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

      {/* 위젯 모달창 띄우는 코드
          widgetId 값으로 열립니다 일단은 1로 설정
      */}
      <AnimatePresence>
        {widgetId ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setWidgetId(null)}
          >
            <TodayClassModal layoutId={widgetId}></TodayClassModal>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Widgets;
