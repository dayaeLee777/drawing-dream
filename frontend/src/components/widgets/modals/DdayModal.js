import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import commonCode from "config/commonCode";
import { getCalendar } from "api/calendar";

const Wrapper = styled(motion.div)`
  width: 800px;
  height: 800px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
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
  const [data, setData] = useState([]);
  const onClick = (event) => {
    event.stopPropagation();
  };
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

  useEffect(() => {
    getCalendar().then((response) => {
      const res = response.data.calendarGetListResponseDtoList;
      res.map((cal) => {
        setData((prev) => [
          ...prev,
          {
            calendarId: cal.calendarId,
            category: "allday",
            isVisible: true,
            isPending: false,
            title: commonCode.J[cal.calendarCode],
            id: cal.calendarId,
            body: "테스트입니다",
            start: cal.startDate,
            end: cal.endDate,
          },
        ]);
      });
    });
  }, []);
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>D-DAY</Title>
      </Header>
      <button
        type="button"
        className="btn btn-default btn-sm move-day"
        data-action="move-next"
      >
        <i
          className="calendar-icon ic-arrow-line-right"
          data-action="move-next"
        ></i>
      </button>
      <Content>
        <Calendar height="400px" view="month" schedules={data} />
      </Content>
    </Wrapper>
  );
};

export default DdayModal;
