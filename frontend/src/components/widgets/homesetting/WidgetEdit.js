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
  height: 100%;
  gap: 2rem;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
`;

const WidgetEdit = () => {
  const [isShowTC, setIsShowTC] = useState(true);
  const [isShowCL, setIsShowCL] = useState(true);
  const [isShowDD, setIsShowDD] = useState(true);
  const [isShowMM, setIsShowMM] = useState(true);
  const [widgetId, setWidgetId] = useState();
  const [isLoad, setIsLoad] = useState(false);
  return (
    <Container>
      {isShowTC && (
        <TodayClass setWidgetId={setWidgetId} setIsShow={setIsShowTC} />
      )}
      {isShowDD && (
        <Dday setWidgetId={setWidgetId} setIsShow={setIsShowDD}></Dday>
      )}
      {isShowCL && (
        <CheckList
          setWidgetId={setWidgetId}
          setIsShow={setIsShowCL}
          isLoad={isLoad}
          setIsLoad={setIsLoad}
        />
      )}
      {isShowMM && (
        <Memo setWidgetId={setWidgetId} setIsShow={setIsShowMM}></Memo>
      )}
    </Container>
  );
};

export default WidgetEdit;
