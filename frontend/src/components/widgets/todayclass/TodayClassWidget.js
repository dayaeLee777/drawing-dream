import commonCode from "config/commonCode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getNowPeriod } from "./time";

const Container = styled.div`
  margin-bottom: 1rem;
`;

const TodayClassList = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 4rem;
`;

const CourseName = styled.div`
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: ${({ theme }) => theme.classColor};

  border-radius: 20px;
  box-shadow: ${(props) =>
    props.now
      ? "0px 0px 4px 4px rgba(231, 56, 113, 1)"
      : "0px 0px 4px 4px rgba(0, 0, 0, 0.1)"};
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  .name {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const TodayClassWidget = (props) => {
  const data = props.data;
  const { period } = useSelector((state) => state.timetable);
  const [nowPeriod, setNowPeriod] = useState(0);

  useEffect(() => {
    const periodCode = getNowPeriod(period);
    if (periodCode) {
      setNowPeriod(periodCode.slice(2, 3));
    }
  }, []);
  // console.log(data);
  return (
    <Container>
      <TodayClassList>
        {data &&
          data.map((course, idx) => (
            <CourseName
              key={idx}
              data={course}
              now={course.periodCode.slice(2, 3) === nowPeriod ? true : false}
            >
              <div className="name">
                {
                  commonCode[course.courseCode.substr(0, 1)][
                    course.courseCode.substr(0, 3)
                  ][course.courseCode]
                }
              </div>
            </CourseName>
          ))}
      </TodayClassList>
    </Container>
  );
};

export default TodayClassWidget;
