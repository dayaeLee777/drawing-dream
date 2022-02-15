import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import commonCode from "config/commonCode";
import { getCalendar } from "api/calendar";
import { errorAlert } from "modules/alert";
import { useDispatch } from "react-redux";
import { logout } from "modules/user";

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
  color: ${({ theme }) => theme.textColor};
  margin-top: 2rem;
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
  const dispatch = useDispatch();

  useEffect(() => {
    getCalendar()
      .then((response) => {
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
              start: cal.startDate,
              end: cal.endDate,
            },
          ]);
        });
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else {
          errorAlert(e.response.status, "캘린더를 불러오지 못했습니다.");
        }
      });
  }, []);
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>D-DAY</Title>
      </Header>
      <Content>
        <Calendar height="603px" view="month" schedules={data} />
      </Content>
    </Wrapper>
  );
};

export default DdayModal;
