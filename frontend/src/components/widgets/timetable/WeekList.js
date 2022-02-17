import { registerTimeTable } from "api/timetable";
import commonCode from "config/commonCode";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DayList from "./DayList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-weight: bold;
`;

const Period = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  div {
    height: 30px;
  }

  &.Today {
    article {
      color: #fec25c;
    }
    div {
      background-color: #fec25c;
      color: black;
    }
  }
`;

export const Day = styled.article`
  font-size: 20px;
  height: 30px;
`;

export const Class = styled.section`
  height: 30px;
  font-size: 15px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1.3rem;

  div {
    border: 1px solid #f2f2f280;
    box-shadow: 0px 4px 4px 2px rgb(0 0 0 / 10%);
    border-radius: 2px 22px;
    background-color: ${({ theme }) => theme.timetableColor};
  }

  section {
    border: ${({ theme }) => theme.timetableOutBorder};
    border-radius: 2px 22px;
    background-color: ${({ theme }) => theme.timetableOutColor};
  }
`;

const WeekList = ({ widget }) => {
  const { data, today } = useSelector((state) => state.timetable);
  return (
    <Container>
      <Period>
        <Day />
        <Class>
          {Object.entries(commonCode.I).map(
            ([key, value]) =>
              key !== "I00" &&
              (!widget || key !== "I08") &&
              (!widget || key !== "I09") && <section key={key}>{value}</section>
          )}
        </Class>
      </Period>
      {Object.entries(commonCode.H).map(([key, value]) => (
        <Period key={key} className={key === today ? "Today" : ""}>
          <Day>{value.substring(0, 1)}</Day>
          {data && (
            <DayList
              widget={widget}
              data={data.filter((period) => period.dayCode === key)}
            />
          )}
        </Period>
      ))}
    </Container>
  );
};

export default WeekList;
