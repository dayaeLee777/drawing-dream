import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import commonCode from "config/commonCode";

const Wrapper = styled(motion.div)`
  width: 800px;
  height: 800px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  letter-spacing: -1px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: fit-content;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 80%;
  height: 80%;
`;
const DdayModal = ({ layoutId }) => {
  const onClick = (event) => {
    event.stopPropagation();
  };

  const date1 = new Date("2022-02-02");
  console.log(date1.toString);
  const testData = [
    {
      calendarId: "3bc288c2-b9c3-92c2-b9c3-8d47c2acc2ae",
      category: "time",
      isVisible: true,
      isPending: false,
      title: commonCode.J.J01,
      id: "3bc288c2-b9c3-92c2-b9c3-8d47c2acc2ae",
      body: "테스트입니다",
      start: "2022-02-02",
      end: "2022-02-02",
    },
    {
      calendarId: "c3b5c2a2-c3a4-24c2-84c2-86497fc2b539",
      category: "allday",
      isVisible: true,
      isPending: false,
      title: commonCode.J.J07,
      id: "c3b5c2a2-c3a4-24c2-84c2-86497fc2b539",
      body: "테스트입니다",
      start: "2022-02-23",
      end: "2022-02-25",
    },
  ];

  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>D-DAY</Title>
      </Header>
      <Content>
        <Calendar height="400px" view="month" schedules={testData} />
      </Content>
    </Wrapper>
  );
};

export default DdayModal;
