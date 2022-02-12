import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CourseName from "./CourseName";
import { getNowPeriod } from "./time";

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
    const periodCode = getNowPeriod(period);
    if (periodCode) {
      setNowPeriod(periodCode.slice(2, 3));
    }
  }, []);
  return (
    <ListContainer>
      {data &&
        data.map((course, idx) => (
          <CourseName
            key={idx}
            data={course}
            now={course.periodCode.slice(2, 3) === nowPeriod ? true : false}
          />
        ))}
    </ListContainer>
  );
};

export default TodayClassList;
