import React from "react";
import styled from "styled-components";
import CourseName from "./CourseName";

const Container = styled.div`
  margin-bottom: 3rem;
  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
`;
const CourseList = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TodayClass = (props) => {
  const data = props.data;
  return (
    <Container>
      <div className="title">오늘의 수업</div>
      <CourseList>
        {data.map((course, idx) => (
          <CourseName key={idx} data={course} now={idx === 0 ? true : false} />
        ))}
      </CourseList>
    </Container>
  );
};

export default TodayClass;
