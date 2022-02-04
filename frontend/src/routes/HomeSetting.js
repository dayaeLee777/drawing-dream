import styled from "styled-components";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WidgetEdit from "components/widgets/homesetting/WidgetEdit";
import Widget from "components/widgets/Widget";
import commonCode from "config/commonCode";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw;
  height: 80vh;
`;
const Wrapper = styled.div`
  width: 20rem;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.div`
  width: 6rem;
  height: 3rem;
  box-shadow: ${(props) =>
    props.name === "apply"
      ? "rgb(59, 178, 0, 0.16) 0px 1px 4px"
      : "rgb(255, 0, 0, 0.16) 0px 1px 4px"};
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.name === "apply" ? "rgb(59, 178, 0)" : "rgb(255, 0, 0)"};
  border-radius: 10px;
`;
const WidgetContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const HomeSetting = () => {
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
      <Wrapper>
        <Buttons>
          <EditButton name="apply">적용</EditButton>
          <EditButton>취소</EditButton>
        </Buttons>
        <WidgetContainer>
          {widgetList.map((widget, index) => (
            <Widget
              // setWidgetId={setWidgetId}
              key={index}
              id={`M0${index + 1}`}
              name={widget}
              loc="setting"
            />
          ))}
        </WidgetContainer>
      </Wrapper>
      <WidgetEdit />
    </Container>
  );
};

export default HomeSetting;
