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
import WidgetEdit from "components/widgets/homesetting/WidgetEdit";

const Container = styled.div`
  /* display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw; */
`;

const HomeSetting = () => {
  return (
    <Container>
      <WidgetEdit />
    </Container>
  );
};

export default HomeSetting;
