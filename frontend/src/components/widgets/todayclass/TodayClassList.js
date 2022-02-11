import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CourseName from "./CourseName";

const ListContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 4rem;
`;

const TodayClassList = (props) => {
  const data = props.data;
  const { period } = useSelector((state) => state.timetable);
  const [nowPeriod, setNowPeriod] = useState(0);
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() - 7); // 테스트용
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    period.map((per) => {
      if (per.startTime < time && per.endTime > time) {
        setNowPeriod(per.periodCode.slice(2, 3));
      }
    });
  }, []);
  return (
    <ListContainer>
      {data &&
        data.map((course, idx) => (
          <CourseName
            key={idx}
            data={course}
            now={idx === nowPeriod - 1 ? true : false}
          />
        ))}
    </ListContainer>
  );
};

export default TodayClassList;
